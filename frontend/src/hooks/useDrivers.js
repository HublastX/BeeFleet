import { useEffect, useState } from "react";
import useAuth from "./useAuth";
import { useRouter } from "next/navigation";

export default function useDrivers() {
   const { gestor } = useAuth();
   const [motoristas, setMotoristas] = useState([]);
   const [carregando, setCarregando] = useState(true);
   const [erro, setErro] = useState(null);
   const [erro500, setErro500] = useState(false);
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

            if (!res.ok) {
               if (res.status === 500) setErro500(true);
               throw new Error("Erro ao buscar motoristas");
            }            

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

   // Buscar Motorista individual
   const getDriver = async (id) => {
      if (!gestor?.token) return;

      setCarregando(true);
      setErro(null);

      try {
         const url = `${process.env.NEXT_PUBLIC_API_URL}/api/drivers/${id}`;
         const res = await fetch(url, {
            method: "GET",
            headers: {
               "Content-Type": "application/json",
               Authorization: `Bearer ${gestor.token}`,
            },
         });

         if (!res.ok) throw new Error("Erro ao buscar motorista");

         const data = await res.json();

         return data;
      } catch (err) {
         console.error("Erro na requisição:", err);
         setErro(err.message);
      } finally {
         setCarregando(false);
      }
   };

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

         if (!res.ok)
            throw new Error("Erro ao criar motorista. Tente novamente.");
         if (res.status === 409) {
            alert("Motorista já existe!");
            return;
         }

         const data = await res.json();
         if (data && !data.err){
            setMotoristas((prev) => [...prev, data.driver]);
            router.push("/drivers");
         } else {
            setErro(data.error || "Erro ao criar motorista. Tente novamente.");
         }
      } catch (error) {
         setErro(error.message || "Erro ao conectar ao servidor.");
      } finally {
         setCarregando(false);
      }
   };

   // Atualizar Motorista
   const updateDriver = async (id, { name, phone, license, image }) => {
      if (!gestor?.token) {
         setErro("Token do gestor não encontrado.");
         return;
      }

      setCarregando(true);
      setErro(null);

      try {
         const formData = new FormData();
         if (name !== undefined) formData.append("name", name);
         if (phone !== undefined) formData.append("phone", phone);
         if (license !== undefined) formData.append("license", license);
         if (image !== undefined) formData.append("image", image);

         const res = await fetch(
            `${process.env.NEXT_PUBLIC_API_URL}/api/drivers/${id}`,
            {
               method: "PUT",
               headers: {
                  Authorization: `Bearer ${gestor.token}`,
               },
               body: formData,
            }
         );

         if (!res.ok) throw new Error("Erro ao atualizar motorista. Tente novamente.");

         const data = await res.json();
         if (data.success && data.data) {
            setMotoristas((prev) =>
               prev.map((driver) => (driver.id === id ? data.data : driver))
            );
            router.push("/drivers");
         } else {
            setErro(data.error || "Erro ao atualizar motorista. Tente novamente.");
         }
      } catch (error) {
         setErro(error.message || "Erro ao conectar ao servidor.");
      } finally {
         setCarregando(false);
      }
   };

   // Deletar motorista
   const deleteDriver = async (id) => {
      if (!gestor?.token) {
         setErro("token do gestor não encontrado.");
         return;
      }

      setCarregando(true);
      setErro(null);

      try {
         const res = await fetch(
            `${process.env.NEXT_PUBLIC_API_URL}/api/drivers/${id}`,
            {
               method: "DELETE",
               headers: {
                  "Content-Type": "application/json",
                  Authorization: `Bearer ${gestor.token}`,
               },
            }
         );

         if (!res.ok)
            throw new Error("Erro ao deletar motorista. Tente novamente.");

         setMotoristas((prev) => prev.filter((driver) => driver.id !== id));
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
      deleteDriver,
      getDriver,
      updateDriver,
   };
}
