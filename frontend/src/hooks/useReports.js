import { useState } from "react";
import useAuth from "./useAuth";
import { useToast } from "@/utils/ToastContext";

export default function useReports() {
   const { gestor } = useAuth();
   const [relatorio, setRelatorio] = useState(null);
   const [carregando, setCarregando] = useState(false);
   const [erro, setErro] = useState(null);
   const { showToast } = useToast();
   const API_URL = process.env.NEXT_PUBLIC_API_URL;

   // Utilitário para exibir erro
   const handleError = (
      error,
      fallbackMessage = "Erro inesperado.",
      type = "error"
   ) => {
      if (["error", "warning", "success"].includes(fallbackMessage)) {
         type = fallbackMessage;
         fallbackMessage = "Erro inesperado.";
      }

      const msg =
         typeof error === "string" ? error : error.message || fallbackMessage;
      setErro(msg);
      showToast("Erro", type, msg, 5000);
   };

   // Gerar relatório de uso de carro
   const getAllCarUsageReport = async (carId = null) => {
      setCarregando(true);
      setErro(null);
      try {
         let url = `${API_URL}/api/report/all-cars`;
         if (carId) {
            url += `?carId=${carId}`;
         }
         const res = await fetch(url, {
            method: "GET",
            headers: {
               "Content-Type": "application/json",
               Authorization: `Bearer ${gestor.token}`,
            },
         });

         if (!res.ok) {
            const errorData = await res.json();
            throw new Error(errorData.error || "Erro ao buscar relatório.");
         }

         let data = await res.json();

         if (carId && data.cars) {
            data = {
               ...data,
               cars: data.cars.filter((c) => c.id === carId),
               totalCars: 1,
            };
         }

         setRelatorio(data);
         showToast(
            "Relatório carregado!",
            "success",
            "Relatório de uso de carros carregado com sucesso.",
            4000
         );
         console.log("Relatório de uso de carros:", data);
      } catch (error) {
         handleError(error, "Erro ao buscar relatório de uso de carros.");
      } finally {
         setCarregando(false);
      }
   };

   // Gerar relatório de uso de motoristas
   const getAllDriversUsageReport = async (driverId = null) => {
      setCarregando(true);
      setErro(null);
      try {
         let url = `${API_URL}/api/report/all-drivers`;
         if (driverId) {
            url += `?driverId=${driverId}`;
         }
         const res = await fetch(url, {
            method: "GET",
            headers: {
               "Content-Type": "application/json",
               Authorization: `Bearer ${gestor.token}`,
            },
         });

         if (!res.ok) {
            const errorData = await res.json();
            throw new Error(errorData.error || "Erro ao buscar relatório.");
         }

         let data = await res.json();

         if (driverId && data.drivers) {
            data = {
               ...data,
               drivers: data.drivers.filter((c) => c.id === driverId),
               drivers: 1,
            };
         }

         setRelatorio(data);
         showToast(
            "Relatório carregado!",
            "success",
            "Relatório de uso de motoristas carregado com sucesso.",
            4000
         );
         console.log("Relatório de uso de motoristas:", data);
      } catch (error) {
         handleError(error, "Erro ao buscar relatório de uso de motoristas.");
      } finally {
         setCarregando(false);
      }
   };

   const getAllEventsUsageReport = async (eventId = null) => {
      setCarregando(true);
      setErro(null);
      try {
         let url = `${API_URL}/api/report/all-events`;
         if (eventId) {
            url += `?eventId=${eventId}`;
         }
         const res = await fetch(url, {
            method: "GET",
            headers: {
               "Content-Type": "application/json",
               Authorization: `Bearer ${gestor.token}`,
            },
         });

         if (!res.ok) {
            const errorData = await res.json();
            throw new Error(errorData.error || "Erro ao buscar relatório.");
         }

         let data = await res.json();

         if (eventId && data.events) {
            data = {
               ...data,
               events: data.events.filter((c) => c.id === eventId),
               events: 1,
            };
         }

         setRelatorio(data);
         showToast(
            "Relatório carregado!",
            "success",
            "Relatório de uso de eventos carregado com sucesso.",
            4000
         );
         console.log("Relatório de uso de eventos:", data);
      } catch (error) {
         handleError(error, "Erro ao buscar relatório de uso de eventos.");
      } finally {
         setCarregando(false);
      }
   };

   return {
      relatorio,
      carregando,
      erro,
      getAllCarUsageReport,
      getAllDriversUsageReport,
      getAllEventsUsageReport,
   };
}
