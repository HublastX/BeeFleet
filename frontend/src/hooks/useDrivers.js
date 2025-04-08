import { useEffect, useState } from "react";
import useAuth from "./useAuth";
import { useRouter } from "next/navigation";

export default function useDrivers() {
   const { gestor } = useAuth();
   const [motoristas, setMotoristas] = useState([]);
   const [carregando, setCarregando] = useState(true);
   const [erro, setErro] = useState(null);
   const router = useRouter();

   // Buscar motoristas
   useEffect(() => {
      if (!gestor?.token) return;

      async function fetchDrivers() {
         try {
            const res = await fetch(
               `${process.env.NEXT_PUBLIC_API_URL}/api/drivers/`,
               {
                  headers: {
                     "Content-Type": "application/json",
                     Authorization: `Bearer ${gestor.token}`,
                  },
               }
            );

            if (!res.ok) throw new Error("Erro ao buscar motoristas");

            const data = await res.json();
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

   // Criar motorista
   const createDriver = async (name, phone, license) => {
      if (!gestor?.id) {
         setErro("ID do gestor não encontrado.");
         return;
      }

      setCarregando(true);
      setErro(null);

      try {
         const res = await fetch(
            `${process.env.NEXT_PUBLIC_API_URL}/api/drivers/create`,
            {
               method: "POST",
               headers: {
                  "Content-Type": "application/json",
                  Authorization: `Bearer ${gestor.token}`,
               },
               body: JSON.stringify({
                  name,
                  phone,
                  license,
                  managerId: gestor.id,
               }),
            }
         );

         if (!res.ok) throw new Error("Erro ao criar motorista. Tente novamente.");

         const data = await res.json();
         if (data.driver) {
            setMotoristas(prev => [...prev, data.driver]);
            router.push("/driverPage");
         } else {
            setErro(data.error || "Erro ao criar motorista. Tente novamente.");
         }
      } catch (error) {
         setErro(error.message || "Erro ao conectar ao servidor.");
      } finally {
         setCarregando(false);
      }
   };

   return {
      motoristas,
      carregando,
      erro,
      createDriver,
   };
}
