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
            url += `?${encodeURIComponent(carId)}`;
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

         const data = await res.json();
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

   return {
      relatorio,
      carregando,
      erro,
      getAllCarUsageReport,
   };
}
