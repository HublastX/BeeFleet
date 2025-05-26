import { useEffect, useState } from "react";
import useAuth from "./useAuth";
import { useRouter } from "next/navigation";
import { useToast } from "@/utils/ToastContext";
import useDrivers from "./useDrivers";
import useCar from "./useCar";
import { useCallback } from "react";

export default function useEvents() {
   const { gestor } = useAuth();
   const { motoristas } = useDrivers();
   const { carro } = useCar();
   const [events, setEvents] = useState([]);
   const [carregando, setCarregando] = useState(true);
   const [erro, setErro] = useState(null);
   const router = useRouter();
   const { showToast } = useToast();
   // const API_URL = "https://hublast.com/bee-fleet-datahub/api";
   const API_URL = process.env.NEXT_PUBLIC_API_URL;

   // Função para dados de motorista e carro
   const enrichEvents = useCallback(
      (events) => {
         return events.map((event) => {
            const driver = motoristas.find((m) => m.id === event.driverId) || {
               name: "Excluido",
               id: event.driverId,
            };

            const car = carro.find((c) => c.id === event.carId) || {
               plate: "Excluido",
               id: event.carId,
            };

            return {
               ...event,
               driver,
               car,
            };
         });
      },
      [motoristas, carro]
   );

   // Utilitário para exibir erro
   const handleError = (
      error,
      fallbackMessage = "Erro inesperado.",
      type = "error"
   ) => {
      if (["error", "warning", "success", "info"].includes(fallbackMessage)) {
         type = fallbackMessage;
         fallbackMessage = "Erro inesperado.";
      }

      const msg =
         typeof error === "string" ? error : error.message || fallbackMessage;
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

            const eventosAtivos = data.data.filter(
               (events) => events.deletedAt === null
            );

            const rawEvents = eventosAtivos || data;

            const enrichedEvents = enrichEvents(rawEvents);
            setEvents(enrichedEvents);
         } catch (err) {
            console.error("Erro na requisição:", err);
            setErro(err.message);
         } finally {
            setCarregando(false);
         }
      }

      fetchEvents();
   }, [gestor?.token, motoristas, carro, API_URL, enrichEvents]);

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

         const eventosAtivos = data.data.filter(
            (events) => events.deletedAt === null
         );

         const rawEvent = eventosAtivos || data;

         const enrichedEvent = enrichEvents([rawEvent])[0];
         return enrichedEvent;
      } catch (err) {
         console.error("Erro na requisição:", err);
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

         router.push("/");
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
         const eventToDelete = events.find((event) => event.id === id);

         const response = await fetch(
            `${API_URL}/api/event/${id}/soft-delete`,
            {
               method: "PATCH",
               headers: {
                  "Content-Type": "application/json",
                  Authorization: `Bearer ${gestor.token}`,
               },
               body: JSON.stringify({
                  managerId: gestor.id,
                  reason: "Evento deletado pelo gestor",
               }),
            }
         );

         if (!response.ok) {
            const data = await response.json();
            throw new Error(data.error || "Erro ao deletar evento");
         }

         if (eventToDelete?.checkoutEventId) {
            try {
               const relatedResponse = await fetch(
                  `${API_URL}/api/events/checkout/${eventToDelete.checkoutEventId}`,
                  {
                     method: "DELETE",
                     headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${gestor.token}`,
                     },
                  }
               );
               if (!relatedResponse.ok) {
                  const relatedData = await relatedResponse.json();
                  console.warn(
                     "Falha ao deletar evento relacionado:",
                     relatedData.error || relatedResponse.statusText
                  );
               }
            } catch (err) {
               console.warn("Erro ao deletar evento relacionado:", err);
            }
         }

         setEvents((prev) =>
            prev.filter(
               (event) =>
                  event.id !== id && event.id !== eventToDelete?.checkoutEventId
            )
         );
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
      deleteEvent,
   };
}
