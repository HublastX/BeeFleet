import { useEffect, useState } from "react";
import useAuth from "./useAuth";
import { useRouter } from "next/navigation";
import { useToast } from "@/utils/ToastContext";
import { useCallback } from "react";

export default function useCar() {
   const { gestor } = useAuth();
   const [carro, setCarro] = useState([]);
   const [carregando, setCarregando] = useState(true);
   const [erro, setErro] = useState(null);
   const router = useRouter();
   const { showToast } = useToast();
   const API_URL = "https://hublast.com/bee-fleet-datahub";
   // const API_URL = process.env.NEXT_PUBLIC_API_URL;

   const getImageUrl = useCallback(
      (image) => {
         if (image && API_URL) {
            return `${API_URL}/api${image}`;
         }
         return `/images/${image}`;
      },
      [API_URL]
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

   // Utilitário para fitrar carro por gestor
   const getCarByManager = () => {
      if (!gestor?.id) return [];
      return carro.filter((car) => car?.managerId === gestor.id);
   };

   // Buscar carro
   useEffect(() => {
      if (!gestor?.token) return;

      async function fetchCars() {
         try {
            const res = await fetch(`${API_URL}/api/cars/`, {
               headers: {
                  "Content-Type": "application/json",
                  Authorization: `Bearer ${gestor.token}`,
               },
            });

            if (!res.ok) throw new Error("Erro ao buscar carros");

            const data = await res.json();

            const carroFormatado = data.data.map((carro) => ({
               ...carro,
               managerId: carro.managerId || null,
               image:
                  carro.image && carro.image !== "null" && carro.image !== null
                     ? getImageUrl(carro.image)
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
   }, [gestor?.token, API_URL, getImageUrl]);

   // Buscar carro individual
   const getCar = async (id) => {
      if (!gestor?.token) return;

      setCarregando(true);
      setErro(null);

      try {
         const url = `${API_URL}/api/cars/${id}`;

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
            managerId: carroData.managerId || gestor.id,
            image:
               carroData.image && carroData.image !== "null"
                  ? getImageUrl(carroData.image)
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
   const createCar = async (
      plate,
      model,
      year,
      color,
      odometer,
      image,
      renavam,
      chassis,
      brand
   ) => {
      if (!gestor?.id) {
         setErro("ID do gestor não encontrado.");
         showToast("Erro", "warning", "Gestor não encontrado");
         return;
      }

      setCarregando(true);
      setErro(null);

      const existingCar = carro.find(
         (car) =>
            car.plate === plate ||
            car.chassis === chassis ||
            car.renavam === renavam
      );

      if (existingCar) {
         const duplicatedFields = [];

         if (existingCar.plate === plate) duplicatedFields.push("Placa");
         if (existingCar.chassis === chassis) duplicatedFields.push("Chassi");
         if (existingCar.renavam === renavam) duplicatedFields.push("Renavam");

         const message =
            duplicatedFields.length === 1
               ? `${duplicatedFields[0]} já cadastrada.`
               : `${duplicatedFields.join(", ")} já cadastrados.`;

         setErro("Carro já cadastrado");
         showToast("Erro", "error", message, 5000);
         setCarregando(false);
         return;
      }

      try {
         const formData = new FormData();
         formData.append("plate", plate);
         formData.append("model", model);
         formData.append("year", year);
         formData.append("color", color);
         formData.append("odometer", odometer);
         formData.append("image", image);
         formData.append("renavam", renavam);
         formData.append("chassis", chassis);
         formData.append("brand", brand);
         formData.append("status", "AVAILABLE");
         formData.append("managerId", gestor.id);

         const res = await fetch(`${API_URL}/api/cars/create`, {
            method: "POST",
            headers: {
               Authorization: `Bearer ${gestor.token}`,
            },
            body: formData,
         });

         if (!res.ok) throw new Error("Erro ao criar carro. Tente novamente.");

         const data = await res.json();

         if (res.ok) {
            localStorage.setItem(
               "toastMessage",
               "carro adicionado com sucesso!"
            );
            localStorage.setItem("toastType", "success");
         } else {
            throw new Error(data.error || "Erro inesperado ao criar carro.");
         }

         if (data && !data.error) {
            setCarro((prev) => [...prev, data.car]);
            router.push("/cars");
         } else {
            handleError(
               data.error || "Erro ao criar carro. Tente novamente.",
               "error"
            );
         }
      } catch (error) {
         handleError(error, "Erro ao conectar ao servidor.", "warning");
      } finally {
         setCarregando(false);
      }
   };

   // Atualizar carro
   const updateCar = async (
      id,
      { plate, model, year, color, odometer, image, renavam, chassis, brand }
   ) => {
      if (!gestor?.token) {
         setErro("token do gestor não encontrado.");
         showToast("Erro", "warning", "Gestor não encontrado");
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
         if (renavam !== undefined) formData.append("renavam", renavam);
         if (chassis !== undefined) formData.append("chassis", chassis);
         if (brand !== undefined) formData.append("brand", brand);
         if (image instanceof File) {
            formData.append("image", image);
         }

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

         const data = await res.json();

         if (data.success && data.data) {
            setCarro((prev) =>
               prev.map((car) => (car.id === id ? data.data : car))
            );
            localStorage.setItem(
               "toastMessage",
               "Carro atualizado com sucesso!"
            );
            localStorage.setItem("toastType", "success");
            router.push("/cars");
         } else {
            setErro(data.error || "Erro ao atualizar carro. Tente novamente.");
         }
      } catch (error) {
         handleError(error, "warning", "Erro ao conectar ao servidor.");
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
         const car = carro.find((car) => car.id === id);
         if (car && car.status !== "AVAILABLE") {
            showToast(
               "Não é possível excluir",
               "error",
               "Carro não pode ser deletado, pois não está disponível.",
               5000
            );
            return;
         }
         const res = await fetch(`${API_URL}/api/cars/${id}`, {
            method: "DELETE",
            headers: {
               "Content-Type": "application/json",
               Authorization: `Bearer ${gestor.token}`,
            },
         });
         localStorage.setItem("toastMessage", "Carro deletado com sucesso!");
         localStorage.setItem("toastType", "success");
         router.push("/cars");

         if (!res.ok)
            throw new Error("Erro ao deletar carro. Tente novamente.");

         setCarro((prev) => prev.filter((car) => car.id !== id));
      } catch (error) {
         setErro(error.message || "Erro ao conectar ao servidor.");
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
      carro,
      carregando,
      erro,
      createCar,
      deleteCar,
      getCar,
      updateCar,
      getCarByManager,
      countCarsByManager: getCarByManager().length,
   };
}
