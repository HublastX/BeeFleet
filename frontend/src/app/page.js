"use client"
import Btn from "@/elements/btn";
import Link from "next/link";
import useAuth from "@/hooks/useAuth";

export default function Home() {
   const { gestor } = useAuth();

   return (
      <div className="flex items-center justify-center h-[80vh] w-full">
         {!gestor ? (
            <div className="flex flex-col items-center justify-center gap-4">
               <p className="text-xl font-bold text-red-500 flex items-center gap-2">
                  <span>⚠️</span> Acesso Restrito
               </p>
               <p className="text-gray-600 dark:text-gray-100 text-center">Para acessar, realize o login!</p>
               <Link href="/login">
                  <Btn>Fazer Login</Btn>
               </Link>
            </div>
         ) : (
            <div>
               <p>Bem-vindo, {gestor.name}!</p>
            </div>
         )}
      </div>
   );
}
