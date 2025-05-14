import { useEffect, useState } from "react";
import useAuth from "./useAuth";
import { useRouter } from "next/navigation";
import { useToast } from "@/utils/ToastContext";
import useDrivers from "./useDrivers";
import useCar from "./useCar";

export default function useEvents() {
   const { gestor } = useAuth();
   const { motoristas } = useDrivers();
   const { carro } = useCar();
   const [events, setEvents] = useState([]);
   const [carregando, setCarregando] = useState(true);
   const [erro, setErro] = useState(null);
   const router = useRouter();
   const { showToast } = useToast();
   const API_URL =
      typeof window !== "undefined"
         ? window.location.origin
         : process.env.NEXT_PUBLIC_API_URL;
   console.log("Using API URL:", API_URL);

   // Função para dados de motorista e carro
   const enrichEvents = (events) => {
      return events.map((event) => {
         const driver = motoristas.find((m) => m.id === event.driverId) || {
            name: "Motorista não encontrado",
            id: event.driverId,
         };

         const car = carro.find((c) => c.id === event.carId) || {
            plate: "Placa não encontrada",
            id: event.carId,
         };

         return {
            ...event,
            driver,
            car,
         };
      });
   };

   // Utilitário para exibir erro
   const handleError = (
      erro,
      fallbackMessage = "Erro inesperado.",
      type = "erro"
   ) => {
      const msg =
         typeof erro === "string" ? erro : erro.message || fallbackMessage;
      setErro(msg);
      showToast("Erro", type, msg, 5000);
   };

   // Utilitário para filtrar eventos por gestor
   const getEventsByManager = () => {
      if (!gestor?.id) return [];
      return events.filter((event) => event?.managerId === gestor.id);
   };

   // Buscar todos os eventos
   useEffect(() => {
      if (!gestor?.token) return;

      async function fetchEvents() {
         try {
            const res = await fetch(`${API_URL}/api/events/checkout`, {
               headers: {
                  "Content-Type": "application/json",
                  Authorization: `Bearer ${gestor.token}`,
               },
            });

            if (!res.ok) throw new Error("Erro ao buscar eventos");

            const data = await res.json();
            const rawEvents = data.data || data;

            const enrichedEvents = enrichEvents(rawEvents);
            setEvents(enrichedEvents);
         } catch (err) {
            console.erro("Erro na requisição:", err);
            setErro(err.message);
         } finally {
            setCarregando(false);
         }
      }

      fetchEvents();
   }, [gestor?.token, motoristas, carro]);

   // Buscar evento individual
   const getEvent = async (id) => {
      if (!gestor?.token) return;

      setCarregando(true);
      setErro(null);

      try {
         const url = `${API_URL}/api/events/checkout/${id}`;

         const res = await fetch(url, {
            method: "GET",
            headers: {
               "Content-Type": "application/json",
               Authorization: `Bearer ${gestor.token}`,
            },
         });

         if (!res.ok) throw new Error("Erro ao buscar evento");

         const data = await res.json();
         const rawEvent = data.data || data;

         // Enriquecer o evento individual
         const enrichedEvent = enrichEvents([rawEvent])[0];
         return enrichedEvent;
      } catch (err) {
         console.erro("Erro na requisição:", err);
         setErro(err.message);
      } finally {
         setCarregando(false);
      }
   };

   // Criar evento
   const createEvent = async (
      carId,
      driverId,
      eventType,
      odometer,
      checkoutEventId = null
   ) => {
      if (!gestor?.id || !gestor?.token) {
         handleError("Gestor não autenticado", "warning");
         return;
      }

      setCarregando(true);
      setErro(null);

      try {
         // if (eventType === "CHECKOUT") {
         //    const hasActiveEvent = events.some(
         //       (event) =>
         //          event.status === "ACTIVE" &&
         //          ((eventType === "CHECKOUT" && event.carId === carId) ||
         //             (eventType === "CHECKOUT" && event.driverId === driverId))
         //    );

         //    if (hasActiveEvent) {
         //       const conflict = events.find(
         //          (e) => e.carId === carId && e.status === "ACTIVE"
         //       )
         //          ? "carro"
         //          : "motorista";
         //       handleError(
         //          `Já existe um checkout ativo para este ${conflict}`,
         //          "warning"
         //       );
         //       setCarregando(false);
         //       return;
         //    }
         // }

         const payload = {
            eventType,
            odometer: parseInt(odometer),
            managerId: gestor.id,
            driverId,
            carId,
            ...(eventType === "RETURN" && { checkoutEventId }),
         };

         const response = await fetch(`${API_URL}/api/events/checkout`, {
            method: "POST",
            headers: {
               "Content-Type": "application/json",
               Authorization: `Bearer ${gestor.token}`,
            },
            body: JSON.stringify(payload),
         });

         const data = await response.json();

         if (!response.ok) {
            throw new Error(data.error || "Erro ao criar evento");
         }

         const enrichedEvent = enrichEvents([data])[0];
         setEvents((prev) => [...prev, enrichedEvent]);

         const successMessage =
            eventType === "CHECKOUT"
               ? "Checkout realizado com sucesso!"
               : "Devolução registrada com sucesso!";

         showToast("Sucesso", "success", successMessage, 5000);

         router.refresh();
      } catch (error) {
         handleError(error, "Erro ao criar evento");
      } finally {
         setCarregando(false);
      }
   };

   // Deletar evento
   const deleteEvent = async (id) => {
      if (!gestor?.token) {
         handleError("Gestor não autenticado", "warning");
         return;
      }

      setCarregando(true);
      setErro(null);

      try {
         const response = await fetch(`${API_URL}/api/events/checkout/${id}`, {
            method: "DELETE",
            headers: {
               "Content-Type": "application/json",
               Authorization: `Bearer ${gestor.token}`,
            },
         });

         if (!response.ok) {
            const data = await response.json();
            throw new Error(data.error || "Erro ao deletar evento");
         }

         setEvents((prev) => prev.filter((event) => event.id !== id));
         showToast("Sucesso", "success", "Evento deletado com sucesso!", 5000);
         router.refresh();
      } catch (error) {
         handleError(error, "Erro ao deletar evento");
      } finally {
         setCarregando(false);
      }
   };

   useEffect(() => {
      const toastMessage = localStorage.getItem("toastMessage");
      const toastType = localStorage.getItem("toastType");

      if (toastMessage && toastType) {
         showToast(
            toastType === "success" ? "Sucesso" : "Aviso",
            toastType,
            toastMessage,
            5000
         );
         localStorage.removeItem("toastMessage");
         localStorage.removeItem("toastType");
      }
   }, [showToast]);

   return {
      events,
      carregando,
      erro,
      createEvent,
      getEvent,
      getEventsByManager,
      countEventsByManager: getEventsByManager().length,
      deleteEvent, // <-- adicionado aqui
   };
}
