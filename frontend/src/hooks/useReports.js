import { useState } from "react";
import useAuth from "./useAuth";
import { useToast } from "@/utils/ToastContext";

export default function useReports() {
   const { gestor } = useAuth();
   const [relatorio, setRelatorio] = useState(null);
   const [carregando, setCarregando] = useState(false);
   const [erro, setErro] = useState(null);
   const { showToast } = useToast();
   const API_URL =
      typeof window !== "undefined"
         ? process.env.NEXT_PUBLIC_CLIENT_API_URL || window.location.origin
         : process.env.NEXT_PUBLIC_API_URL;

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

   // Gerar relatório de uso de carro
   const getCarUsageReport = async ({ startDate, endDate, carId }) => {
      if (!gestor?.token) {
         handleError("Usuário não autenticado");
         return null;
      }

      if (!startDate || !endDate) {
         handleError("Datas de início e fim são obrigatórias");
         return null;
      }

      setCarregando(true);
      setErro(null);

      try {
         const params = new URLSearchParams({
            startDate,
            endDate,
            managerId: gestor.id,
         });

         if (carId) params.append("carId", carId);

         const url = `${API_URL}/api/reports/car-usage?${params.toString()}`;

         const res = await fetch(url, {
            headers: {
               "Content-Type": "application/json",
               Authorization: `Bearer ${gestor.token}`,
            },
         });

         if (!res.ok) {
            const errorData = await res.json();
            throw new Error(errorData.error || "Falha ao gerar relatório");
         }

         const data = await res.json();
         setRelatorio(data);
         return data;
      } catch (err) {
         handleError(err);
         return null;
      } finally {
         setCarregando(false);
      }
   };

   return {
      relatorio, 
      carregando, 
      erro, 
      getCarUsageReport,
   };
}
