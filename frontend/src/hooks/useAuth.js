import { useEffect, useState } from "react";
import useAuth from "./useAuth";

export default function useDrivers() {
   const { gestor } = useAuth();
   const [motoristas, setMotoristas] = useState([]);
   const [carregando, setCarregando] = useState(true);
   const [erro, setErro] = useState(null);

   useEffect(() => {
      async function fetchDrivers() {
         if (!gestor?.token) {
            setErro("Usuário não autenticado");
            setCarregando(false);
            return;
         }

         try {
            const res = await fetch("http://localhost:3001/api/drivers/", {
               headers: {
                  Authorization: `Bearer ${gestor.token}`,
               },
            });

            if (!res.ok) throw new Error("Erro ao buscar motoristas");
            
            const data = await res.json();
            setMotoristas(data);
         } catch (err) {
            setErro(err.message);
         } finally {
            setCarregando(false);
         }
      }

      fetchDrivers();
   }, [gestor]);

   return {
      motoristas,
      carregando,
      erro,
   };
}
