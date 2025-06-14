import { useEffect, useState } from "react";
import useAuth from "./useAuth";
import { useRouter } from "next/navigation";
import { useToast } from "@/utils/ToastContext";
import { useCallback } from "react";

export default function useDrivers() {
   const { gestor } = useAuth();
   const [motoristas, setMotoristas] = useState([]);
   const [motoristasDeletados, setMotoristaDeletados] = useState([]);
   const [carregando, setCarregando] = useState(true);
   const [erro, setErro] = useState(null);
   const router = useRouter();
   const { showToast } = useToast();
   const API_URL = process.env.NEXT_PUBLIC_API_URL;

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

   // Utilitário para fitrar motorista por gestor
   const getDriversByManager = () => {
      if (!gestor?.id) return [];
      return motoristas.filter((driver) => driver?.managerId === gestor.id);
   };

   // Buscar motoristas
   useEffect(() => {
      if (!gestor?.token) return;

      async function fetchDrivers() {
         try {
            const res = await fetch(`${API_URL}/api/drivers/`, {
               headers: {
                  "Content-Type": "application/json",
                  Authorization: `Bearer ${gestor.token}`,
               },
            });

            if (!res.ok) {
               throw new Error("Erro ao buscar motoristas");
            }

            const data = await res.json();

            const motoristasAtivos = data.data.filter(
               (motorista) => motorista.deletedAt === null
            );

            const motoristasDeletados = data.data.filter(
               (motorista) => motorista.deletedAt !== null
            );

            const motoristasFormatados = motoristasAtivos.map((motorista) => ({
               ...motorista,
               managerId: motorista.managerId || gestor.id,
               image:
                  motorista.image &&
                  motorista.image !== "null" &&
                  motorista.image !== null
                     ? getImageUrl(motorista.image)
                     : null,
            }));

            setMotoristas(motoristasFormatados);
            setMotoristaDeletados(motoristasDeletados);
         } catch (err) {
            console.error("Erro na requisição:", err);
            setErro(err.message);
         } finally {
            setCarregando(false);
         }
      }

      fetchDrivers();
   }, [gestor?.token, API_URL, gestor?.id, getImageUrl]);

   // Buscar Motorista individual
   const getDriver = async (id) => {
      if (!gestor?.token) return;

      setCarregando(true);
      setErro(null);

      try {
         const url = `${API_URL}/api/drivers/${id}`;
         const res = await fetch(url, {
            method: "GET",
            headers: {
               "Content-Type": "application/json",
               Authorization: `Bearer ${gestor.token}`,
            },
         });

         if (!res.ok) throw new Error("Erro ao buscar motorista");

         const data = await res.json();

         const motoristaData = data.data || data;

         const motoristasFormatados = {
            ...motoristaData,
            managerId: motoristaData.managerId || gestor.id,
            image:
               motoristaData.image && motoristaData.image !== "null"
                  ? getImageUrl(motoristaData.image)
                  : null,
         };

         return motoristasFormatados;
      } catch (err) {
         console.error("Erro na requisição:", err);
         setErro(err.message);
      } finally {
         setCarregando(false);
      }
   };

   // Criar motorista
   const createDriver = async (name, phone, license, image) => {
      if (!gestor?.id) {
         setErro("ID do gestor não encontrado.");
         showToast("Erro", "warning", "Gestor não encontrado");
         return;
      }

      setCarregando(true);
      setErro(null);

      const existingDriver = motoristas.find(
         (driver) =>
            driver && (driver.license === license || driver.phone === phone)
      );

      if (existingDriver) {
         const duplicatedFields = [];

         if (existingDriver.phone === phone) duplicatedFields.push("Telefone");
         if (existingDriver.license === license) duplicatedFields.push("CNH");

         const message =
            duplicatedFields.length === 1
               ? `${duplicatedFields[0]} já cadastrada.`
               : `${duplicatedFields.join(", ")} já cadastrados.`;

         setErro("Motorista já cadastrado");
         showToast("Erro", "error", message, 5000);
         setCarregando(false);
         return;
      }

      try {
         const formData = new FormData();
         formData.append("name", name);
         formData.append("phone", phone);
         formData.append("license", license);
         formData.append("image", image);
         formData.append("managerId", gestor.id);

         const res = await fetch(`${API_URL}/api/drivers/create`, {
            method: "POST",
            headers: {
               Authorization: `Bearer ${gestor.token}`,
            },
            body: formData,
         });

         if (!res.ok) throw new Error("Erro ao criar motorista");

         const data = await res.json();

         if (res.ok) {
            localStorage.setItem(
               "toastMessage",
               "Motorista adicionado com sucesso!"
            );
            localStorage.setItem("toastType", "success");
         } else {
            throw new Error(
               data.error || "Erro inesperado ao criar motorista."
            );
         }

         if (data && !data.err) {
            setMotoristas((prev) => [...prev, data.driver]);
            router.push("/drivers");
         } else {
            setErro(data.error || "Erro ao criar motorista. Tente novamente.");
         }
      } catch (error) {
         setErro(error.message || "Erro ao conectar ao servidor.");
         handleError(error, "warning", "Erro ao conectar ao servidor");
      } finally {
         setCarregando(false);
      }
   };

   // Atualizar Motorista
   const updateDriver = async (id, { name, phone, license, image }) => {
      if (!gestor?.token) {
         setErro("Token do gestor não encontrado.");
         showToast("Erro", "warning", "Gestor não encontrado");
         return;
      }

      setCarregando(true);
      setErro(null);

      try {
         const formData = new FormData();
         if (name !== undefined) formData.append("name", name);
         if (phone !== undefined) formData.append("phone", phone);
         if (license !== undefined) formData.append("license", license);
         if (image instanceof File) {
            formData.append("image", image);
         }

         const res = await fetch(`${API_URL}/api/drivers/${id}`, {
            method: "PUT",
            headers: {
               Authorization: `Bearer ${gestor.token}`,
            },
            body: formData,
         });

         const data = await res.json();

         if (data.success && data.data) {
            const motoristaAtualizado = {
               ...data.data,
               image:
                  data.data.image && data.data.image !== "null"
                     ? getImageUrl(data.data.image)
                     : null,
            };

            setMotoristas((prev) =>
               prev.map((driver) =>
                  driver.id === id ? motoristaAtualizado : driver
               )
            );

            localStorage.setItem(
               "toastMessage",
               "Motorista atualizado com sucesso!"
            );
            localStorage.setItem("toastType", "success");
            router.push("/drivers");
         } else {
            setErro(
               data.error || "Erro ao atualizar motorista. Tente novamente."
            );
         }
      } catch (error) {
         handleError(error, "warning", "Erro ao conectar ao servidor.");
      } finally {
         setCarregando(false);
      }
   };

   // Deletar motorista
   const deleteDriver = async (id, reason) => {
      if (!gestor?.token) {
         setErro("Token do gestor não encontrado.");
         return;
      }

      setCarregando(true);
      setErro(null);

      try {
         const driver = motoristas.find((driver) => driver.id === id);

         if (driver && !driver.isAvailable) {
            showToast(
               "Não é possível excluir",
               "error",
               "Este motorista está com um veículo no momento. Libere o veículo antes de excluir.",
               5000
            );
            return;
         }

         const res = await fetch(`${API_URL}/api/driver/${id}/soft-delete`, {
            method: "PATCH",
            headers: {
               "Content-Type": "application/json",
               Authorization: `Bearer ${gestor.token}`,
            },
            body: JSON.stringify({
               managerId: gestor.id,
               reason,
            }),
         });

         if (!res.ok) {
            throw new Error("Erro ao deletar motorista. Tente novamente.");
         }

         setMotoristas((prev) => prev.filter((driver) => driver.id !== id));

         showToast(
            "Sucesso",
            "success",
            "Motorista deletado com sucesso!",
            5000
         );
         router.push("/drivers");
      } catch (error) {
         setErro(error.message || "Erro ao conectar ao servidor.");
         showToast(
            "Erro",
            "error",
            error.message || "Falha ao deletar motorista",
            5000
         );
      } finally {
         setCarregando(false);
      }
   };

   // super delete
   const superDeleteDriver = async (id) => {
      if (!gestor?.token) {
         setErro("Token do gestor não encontrado.");
         return;
      }

      try {
         const res = await fetch(`${API_URL}/api/drivers/${id}`, {
            method: "DELETE",
            headers: {
               "Content-Type": "application/json",
               Authorization: `Bearer ${gestor.token}`,
            },
         });

         if (!res.ok) {
            const data = await res.json();
            throw new Error(data.error || "Erro ao deletar motorista");
         }

         showToast(
            "Sucesso",
            "success",
            "Motorista deletado com sucesso!",
            5000
         );
         setMotoristas((prev) => prev.filter((driver) => driver.id !== id));
      } catch (error) {
         handleError(error, "Erro ao deletar motorista");
         throw error;
      } finally {
         setCarregando(false);
      }
   };

   const restoreDriver = async (id) => {
      if (!gestor?.token) {
         handleError("Gestor não autenticado", "warning");
         return;
      }

      try {
         const res = await fetch(`${API_URL}/api/restore/driver/${id}`, {
            method: "PATCH",
            headers: {
               "Content-Type": "application/json",
               Authorization: `Bearer ${gestor.token}`,
            },
            body: JSON.stringify({
               managerId: gestor.id,
            }),
         });

         if (!res.ok) {
            const data = await res.json();
            throw new Error(data.error || "Erro ao restaurar motorista");
         }

         showToast(
            "Sucesso",
            "success",
            "Motorista restaurado com sucesso!",
            5000
         );

         const updatedDriver = await getDriver(id);
         if (updatedDriver) {
            setMotoristas((prev) => [...prev, updatedDriver]);
         }
      } catch (error) {
         handleError("Erro ao restaurar motorista");
         throw error;
      }
   };

   //motoristas deletados
   const getDeletedDrivers = useCallback(() => {
      return motoristasDeletados.filter((d) => d.deletedAt !== null);
   }, [motoristasDeletados]);

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
      motoristas,
      carregando,
      erro,
      createDriver,
      deleteDriver,
      superDeleteDriver,
      restoreDriver,
      getDriver,
      updateDriver,
      getDeletedDrivers,
      getDriversByManager,
      countDriversByManager: getDriversByManager().length,
   };
}
