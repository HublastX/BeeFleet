import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

export default function useAuth() {
   const [gestor, setGestor] = useState(null);
   const [carregando, setCarregando] = useState(false);
   const [erro, setErro] = useState(null);
   const router = useRouter();

   // Função para login
   const login = async (email, password) => {
      setCarregando(true);
      setErro(null);

      try {
         const res = await fetch(
            `${process.env.NEXT_PUBLIC_API_URL}/api/managers/login`,
            {
               method: "POST",
               headers: {
                  "Content-Type": "application/json",
               },
               body: JSON.stringify({ email, password }),
            }
         );

         if (!res.ok) throw new Error("Credenciais inválidas.");

         const data = await res.json();
         if (data.token) {
            localStorage.setItem("token", data.token);
            localStorage.setItem("id", data.manager.id);
            localStorage.setItem("name", data.manager.name);
            localStorage.setItem("email", data.manager.email);

            setGestor({
               id: data.manager.id,
               name: data.manager.name,
               email: data.manager.email,
               token: data.token,
            });

            window.location.href = "/";
         } else {
            setErro("Erro no login. Tente novamente.");
         }
      } catch (error) {
         setErro(error.message);
      } finally {
         setCarregando(false);
      }
   };

   // Função para registro
   const register = async (name, email, password) => {
      setCarregando(true);
      setErro(null);

      try {
         const res = await fetch(
            `${process.env.NEXT_PUBLIC_API_URL}/api/managers/create`,
            {
               method: "POST",
               headers: {
                  "Content-Type": "application/json",
               },
               body: JSON.stringify({ name, email, password }),
            }
         );

         if (!res.ok) throw new Error("Erro ao registrar. Tente novamente.");

         const data = await res.json();
         if (data.manager) {
            localStorage.setItem("id", data.manager.id);
            localStorage.setItem("name", data.manager.name);
            localStorage.setItem("email", data.manager.email);

            setGestor({
               id: data.manager.id,
               name: data.manager.name,
               email: data.manager.email,
            });

            router.push("/login");
         } else {
            setErro(data.error || "Erro ao registrar. Tente novamente.");
         }
      } catch (error) {
         setErro(error.message || "Erro ao conectar ao servidor.");
      } finally {
         setCarregando(false);
      }
   };

   // Pegar dados do gestor
   useEffect(() => {
      const token = localStorage.getItem("token");
      const id = localStorage.getItem("id");
      const name = localStorage.getItem("name");
      const email = localStorage.getItem("email");

      if (token && id && name && email) {
         setGestor({ id, name, email, token });
      }
   }, []);

   // Função para logout
   const logout = () => {
      localStorage.removeItem("token");
      localStorage.removeItem("id");
      localStorage.removeItem("name");
      localStorage.removeItem("email");

      setGestor(null);
      window.location.href = "/";
   };

   return {
      gestor,
      carregando,
      erro,
      login,
      register,
      logout,
   };
}
