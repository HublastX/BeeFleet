import { useState, useCallback } from "react";
import useAuth from "./useAuth";
import { useToast } from "@/utils/ToastContext";

export default function useReports() {
   const { gestor } = useAuth();
   const [relatorio, setRelatorio] = useState(null);
   const [carregando, setCarregando] = useState(false);
   const [erro, setErro] = useState(null);
   const { showToast } = useToast();
   const API_URL = process.env.NEXT_PUBLIC_API_URL;

   const getFullReport = useCallback(
      async (startDate, endDate) => {
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
               typeof error === "string"
                  ? error
                  : error.message || fallbackMessage;
            setErro(msg);
            showToast("Erro", type, msg, 5000);
         };

         if (!gestor?.token) return;

         setCarregando(true);
         setErro(null);
         setRelatorio(null);

         try {
            const params = new URLSearchParams();
            if (startDate) params.append("startDate", startDate);
            if (endDate) params.append("endDate", endDate);

            const res = await fetch(
               `${API_URL}/api/report/complete-report?${params.toString()}`,
               {
                  method: "GET",
                  headers: {
                     "Content-Type": "application/json",
                     Authorization: `Bearer ${gestor.token}`,
                  },
               }
            );

            if (!res.ok) {
               const errorData = await res.json();
               throw new Error(errorData.error || "Erro ao buscar relatório.");
            }

            const data = await res.json();
            setRelatorio(data);

            showToast(
               "Relatório carregado!",
               "success",
               "Relatório carregado com sucesso.",
               4000
            );

            setCarregando(false);
            return data;
         } catch (error) {
            handleError(error, "Erro ao gerar relatório.");
            setCarregando(false);
            return null;
         }
      },
      [gestor?.token, API_URL, showToast]
   );

   return {
      relatorio,
      carregando,
      erro,
      getFullReport,
   };
}
