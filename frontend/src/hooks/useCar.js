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

            const carroFormatado = data.data.map((carro) => ({
               ...carro,
               image:
                  carro.image && carro.image !== "null"
                     ? `${process.env.NEXT_PUBLIC_API_URL}/api${carro.image}`
                     : null,
            }));

            setCarro(carroFormatado);
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

         const res = await fetch(url, {
            method: "GET",
            headers: {
               "Content-Type": "application/json",
               Authorization: `Bearer ${gestor.token}`,
            },
         });

         if (!res.ok) throw new Error("Erro ao buscar carro");

         const data = await res.json();

         const carroData = data.data || data;

         const carroFormatado = {
            ...carroData,
            image:
               carroData.image && carroData.image !== "null"
                  ? `${process.env.NEXT_PUBLIC_API_URL}/api${carroData.image}`
                  : null,
         };

         return carroFormatado;
      } catch (err) {
         console.error("Erro na requisição:", err);
         setErro(err.message);
      } finally {
         setCarregando(false);
      }
   };

   // Criar carro
   const createCar = async (plate, model, year, color, odometer, image) => {
      if (!gestor?.id) {
         setErro("ID do gestor não encontrado.");
         return;
      }

      setCarregando(true);
      setErro(null);

      try {
         const formData = new FormData();
         formData.append("plate", plate);
         formData.append("model", model);
         formData.append("year", year);
         formData.append("color", color);
         formData.append("odometer", odometer);
         formData.append("image", image);
         formData.append("status", "AVAILABLE");
         formData.append("managerId", gestor.id);
         const res = await fetch(
            `${process.env.NEXT_PUBLIC_API_URL}/api/cars/create`,
            {
               method: "POST",
               headers: {
                  Authorization: `Bearer ${gestor.token}`,
               },
               body: formData,
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

   // Atualizar carro
   const updateCar = async (
      id,
      { plate, model, year, color, odometer, image }
   ) => {
      if (!gestor?.token) {
         setErro("token do gestor não encontrado.");
         return;
      }

      setCarregando(true);
      setErro(null);

      try {
         const formData = new FormData();
         if (plate !== undefined) formData.append("plate", plate);
         if (model !== undefined) formData.append("model", model);
         if (year !== undefined) formData.append("year", year);
         if (color !== undefined) formData.append("color", color);
         if (odometer !== undefined) formData.append("odometer", odometer);
         if (image !== undefined) formData.append("image", image);

         const res = await fetch(
            `${process.env.NEXT_PUBLIC_API_URL}/api/cars/${id}`,
            {
               method: "PUT",
               headers: {
                  Authorization: `Bearer ${gestor.token}`,
               },
               body: formData,
            }
         );

         if (!res.ok)
            throw new Error("Erro ao atualizar carro. Tente novamente.");

         const data = await res.json();
         if (data.success && data.data) {
            setCarro((prev) =>
               prev.map((car) => (car.id === id ? data.data : car))
            );
            router.push("/cars");
         } else {
            setErro(data.error || "Erro ao atualizar carro. Tente novamente.");
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
      updateCar,
   };
}
