"use client";
import { useRouter } from "next/navigation";
import useAuth from "@/hooks/useAuth"; 
import { useEffect } from "react";

export default function withAuth(Component) {
   return function ProtectedRoute(props) {
      const { gestor, carregando } = useAuth();
      const router = useRouter();

      useEffect(() => {
         if (!carregando && !gestor) {
            router.push("/login");
         }
      }, [gestor, carregando, router]);
      
      if (carregando) {
         return <p>Carregando...</p>;
      }
      
      if (!gestor) {
         return null;
      }
      
      return <Component {...props} />;
   };
}
