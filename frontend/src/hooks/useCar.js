import { useEffect, useState } from "react";
import useAuth from "./useAuth";
import { useRouter } from "next/navigation";

export default function useCar() {
   const { gestor } = useAuth();
   const [carro, setCarro] = useState([]);
   const [carregando, setCarregando] = useState(true);
   const [erro, setErro] = useState(null);
   const router = useRouter();

   // Buscar carro
   useEffect(() => {
      if (!gestor?.token) return;

      async function fetchCars() {
         try {
            const res = await fetch(
               `${process.env.NEXT_PUBLIC_API_URL}/api/cars/`,
               {
                  headers: {
                     "Content-Type": "application/json",
                     Authorization: `Bearer ${gestor.token}`,
                  },
               }
            );

            if (!res.ok) throw new Error("Erro ao buscar carros");

            const data = await res.json();
            setCarro(data.data);
         } catch (err) {
            console.error("Erro na requisição:", err);
            setErro(err.message);
         } finally {
            setCarregando(false);
         }
      }

      fetchCars();
   }, [gestor?.token]);

   // Buscar carro individual
   const getCar = async (id) => {
      if (!gestor?.token) return;

      setCarregando(true);
      setErro(null);

      try {
         const url = `${process.env.NEXT_PUBLIC_API_URL}/api/cars/${id}`;
         console.log("URL da requisição:", url);

         const res = await fetch(url, {
            method: "GET",
            headers: {
               "Content-Type": "application/json",
               Authorization: `Bearer ${gestor.token}`,
            },
         });

         if (!res.ok) throw new Error("Erro ao buscar carro");

         const data = await res.json();
         console.log("Resposta da API:", data);

         return data;
      } catch (err) {
         console.error("Erro na requisição:", err);
         setErro(err.message);
      } finally {
         setCarregando(false);
      }
   };

   // Criar carro
   const createCar = async (plate, model, year, color) => {
      if (!gestor?.id) {
         setErro("ID do gestor não encontrado.");
         return;
      }

      setCarregando(true);
      setErro(null);

      try {
         const res = await fetch(
            `${process.env.NEXT_PUBLIC_API_URL}/api/cars/create`,
            {
               method: "POST",
               headers: {
                  "Content-Type": "application/json",
                  Authorization: `Bearer ${gestor.token}`,
               },
               body: JSON.stringify({
                  plate,
                  model,
                  year: parseInt(year),
                  color,
                  status: "AVAILABLE",
                  managerId: gestor.id,
               }),
            }
         );

         if (!res.ok) throw new Error("Erro ao criar carro. Tente novamente.");

         const data = await res.json();
         if (data && !data.error) {
            setCarro((prev) => [...prev, data.car]);
            router.push("/cars");
         } else {
            setErro(data.error || "Erro ao criar carro. Tente novamente.");
         }
      } catch (error) {
         setErro(error.message || "Erro ao conectar ao servidor.");
      } finally {
         setCarregando(false);
      }
   };

   // Deletar carro
   const deleteCar = async (id) => {
      if (!gestor?.token) {
         setErro("token do gestor não encontrado.");
         return;
      }

      setCarregando(true);
      setErro(null);

      try {
         const res = await fetch(
            `${process.env.NEXT_PUBLIC_API_URL}/api/cars/${id}`,
            {
               method: "DELETE",
               headers: {
                  "Content-Type": "application/json",
                  Authorization: `Bearer ${gestor.token}`,
               },
            }
         );

         if (!res.ok)
            throw new Error("Erro ao deletar carro. Tente novamente.");

         setCarro((prev) => prev.filter((car) => car.id !== id));
      } catch (error) {
         setErro(error.message || "Erro ao conectar ao servidor.");
      } finally {
         setCarregando(false);
      }
   };

   return {
      carro,
      carregando,
      erro,
      createCar,
      deleteCar,
      getCar,
   };
}
