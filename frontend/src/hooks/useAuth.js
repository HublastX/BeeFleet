import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useToast } from "@/utils/ToastContext";
import { useCallback } from "react";

export default function useAuth() {
   const [gestor, setGestor] = useState(null);
   const [carregando, setCarregando] = useState(false);
   const [erro, setErro] = useState(null);
   const [gestores, setGestores] = useState([]);
   const router = useRouter();
   const { showToast } = useToast();
   const API_URL =
      typeof window !== "undefined"
         ? window.location.origin
         : process.env.NEXT_PUBLIC_API_URL;


   const getImageUrl = useCallback(
      (image) => {
         if (image && API_URL) {
            return `${API_URL}/api${image}`;
         }
         return `/images/${image}`;
      },
      [API_URL]
   );

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

   // Login
   const login = async (email, password) => {
      setCarregando(true);
      setErro(null);

      try {
         const res = await fetch(`${API_URL}/api/managers/login`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ email, password }),
         });

         if (!res.ok)
            throw new Error(
               "Credenciais inválidas. Verifique e tente novamente."
            );

         const data = await res.json();

         if (data.token) {
            localStorage.setItem("token", data.token);
            localStorage.setItem("id", data.manager.id);
            localStorage.setItem("name", data.manager.name);
            localStorage.setItem("email", data.manager.email);
            localStorage.setItem("image", data.manager.image);

            setGestor({
               id: data.manager.id,
               name: data.manager.name,
               email: data.manager.email,
               token: data.token,
               image: getImageUrl(data.manager.image),
            });

            localStorage.setItem(
               "toastMessage",
               "Login realizado com sucesso!"
            );
            localStorage.setItem("toastType", "success");
            window.location.href = "/";
         } else {
            throw new Error("Erro inesperado ao fazer login.");
         }
      } catch (error) {
         handleError(error, "Erro ao fazer login.");
      } finally {
         setCarregando(false);
      }
   };

   // Registro
   const register = async (name, email, password, image) => {
      setCarregando(true);
      setErro(null);

      const existingManager = gestores.find(
         (manager) => manager.email === email
      );
      if (existingManager) {
         setErro("Email já cadastrado.");
         showToast("Erro", "error", "Email já cadastrado.", 5000);
         setCarregando(false);
         return;
      }

      try {
         const formData = new FormData();
         formData.append("name", name);
         formData.append("email", email);
         formData.append("password", password);
         formData.append("image", image);

         const res = await fetch(`${API_URL}/api/managers/create`, {
            method: "POST",
            body: formData,
         });

         if (!res.ok)
            throw new Error(
               "Erro ao registrar. Verifique os dados e tente novamente."
            );

         const data = await res.json();
         if (res.ok) {
            localStorage.setItem(
               "toastMessage",
               "Gestor registrado com sucesso!"
            );
            localStorage.setItem("toastType", "success");
            router.push("/login");
         } else {
            throw new Error(data.error || "Erro inesperado ao registrar.");
         }
      } catch (error) {
         handleError(error, "Erro ao conectar ao servidor.", "warning");
      } finally {
         setCarregando(false);
      }
   };

   // Atualizar gestor
   const putManager = async (id, { name, email, image }) => {
      setCarregando(true);
      setErro(null);

      try {
         const token = localStorage.getItem("token");

         const formData = new FormData();
         if (name !== undefined) formData.append("name", name);
         if (email !== undefined) formData.append("email", email);
         if (image !== undefined) formData.append("image", image);

         const res = await fetch(`${API_URL}/api/managers/${id}`, {
            method: "PUT",
            headers: { Authorization: `Bearer ${token}` },
            body: formData,
         });

         if (!res.ok) throw new Error("Erro ao atualizar dados do perfil.");

         const data = await res.json();

         localStorage.setItem("name", data.data.name);
         localStorage.setItem("email", data.data.email);
         localStorage.setItem("image", data.data.image);

         setGestor((prev) => ({
            ...prev,
            name: data.data.name,
            email: data.data.email,
            image: getImageUrl(data.data.image),
         }));

         showToast(
            "Sucesso",
            "success",
            "Perfil atualizado com sucesso!",
            5000
         );

         window.location.href = "/profile";

         return data;
      } catch (error) {
         handleError(error, "Erro ao atualizar o gestor.", "error");
      } finally {
         setCarregando(false);
      }
   };

   // Pegar gestor do localStorage
   useEffect(() => {
      const getGestorFromStorage = () => {
         const token = localStorage.getItem("token");
         const id = localStorage.getItem("id");
         const name = localStorage.getItem("name");
         const email = localStorage.getItem("email");
         let image = localStorage.getItem("image");
         if (image === "null" || image === "") image = null;
         else image = `${API_URL}/api${image}`;

         if (token && id && name && email) {
            return { id, name, email, token, image };
         }

         return null;
      };

      const gestorData = getGestorFromStorage();
      if (gestorData) setGestor(gestorData);
   }, [API_URL]);

   // Logout
   const logout = () => {
      localStorage.removeItem("token");
      localStorage.removeItem("id");
      localStorage.removeItem("name");
      localStorage.removeItem("email");
      localStorage.removeItem("image");

      setGestor(null);
      window.location.href = "/";
   };

   // Listar gestores
   useEffect(() => {
      if (!gestor?.token) return;

      async function fetchAllManagers() {
         try {
            const res = await fetch(`${API_URL}/api/managers/`, {
               headers: {
                  "Content-Type": "application/json",
                  Authorization: `Bearer ${gestor.token}`,
               },
            });

            if (!res.ok) throw new Error("Erro ao buscar lista de gestores.");

            const data = await res.json();

            const gestorFormatado = data.data.map((gestor) => ({
               ...gestor,
               image:
                  gestor.image &&
                  gestor.image !== "null" &&
                  gestor.image !== null
                     ? getImageUrl(gestor.image)
                     : null,
            }));

            setGestores(gestorFormatado);
         } catch (err) {
            showToast("Erro!", "warning", "Erro no servidor");
         } finally {
            setCarregando(false);
         }
      }

      fetchAllManagers();
   }, [gestor?.token, API_URL, getImageUrl, showToast]);

   // Deletar gestor
   const deleteManager = async (id) => {
      if (!gestor?.token) {
         setErro("Token do gestor não encontrado.");
         return;
      }

      setCarregando(true);
      setErro(null);

      try {
         const res = await fetch(`${API_URL}/api/managers/${id}`, {
            method: "DELETE",
            headers: {
               "Content-Type": "application/json",
               Authorization: `Bearer ${gestor.token}`,
            },
         });

         if (!res.ok)
            throw new Error("Erro ao deletar gestor. Tente novamente.");

         showToast("Sucesso", "success", "Conta deletada com sucesso!", 5000);
         setTimeout(() => {
            logout();
         }, 1000);
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
      gestor,
      carregando,
      erro,
      gestores,
      login,
      register,
      logout,
      putManager,
      deleteManager,
   };
}
