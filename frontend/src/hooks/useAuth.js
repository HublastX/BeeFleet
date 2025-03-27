"use client";
import { useEffect, useState } from "react";

export default function useAuth() {
   const [gestor, setGestor] = useState(null);
   const [carregando, setCarregando] = useState(true);
   const [erro, setErro] = useState(null);

   useEffect(() => {
      const token = localStorage.getItem("token");
      if (!token) {
         setCarregando(false);
         return;
      }

      fetch(`${process.env.NEXT_PUBLIC_API_URL}/api`, {
         headers: {
            Autorization: `Bearer ${token}`,
         },
      })
         .then((res) => res.json())
         .then((data) => {
            if (data.autenticado) {
               setGestor(data.gestor);
            } else {
               setErro("token invalido ou expirado");
            }
            setCarregando(false);
         })
         .catch((err) => {
            setErro("erro ao verificar o login");
            setCarregando(false);
         });
   }, []);
   return { gestor, carregando, erro };
}
