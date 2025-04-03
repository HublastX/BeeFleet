import { useEffect, useState } from "react";
import useAuth from "./useAuth";

export default function useDrivers() {
   const { gestor } = useAuth();
   const [motoristas, setMotoristas] = useState([]);
   const [carregando, setCarregando] = useState(true);
   const [erro, setErro] = useState(null);

   useEffect(() => {
      if (!gestor?.token) return;
   
      async function fetchDrivers() {
         console.log("Token usado na requisição:", gestor.token);
   
         try {
            const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/drivers/`, {
               headers: {
                  "Content-Type": "application/json",
                  Authorization: `Bearer ${gestor.token}`,
               },
            });
   
            if (!res.ok) throw new Error("Erro ao buscar motoristas");
            
            const data = await res.json();
            console.log("Motoristas extraídos:", data.data);
            setMotoristas(data.data);
         } catch (err) {
            console.error("Erro na requisição:", err);
            setErro(err.message);
         } finally {
            setCarregando(false);
         }
      }
   
      fetchDrivers();
   }, [gestor?.token]);
   

   return {
      motoristas,
      carregando,
      erro,
   };
}
