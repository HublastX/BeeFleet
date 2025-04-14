"use client";
import Btn from "@/elements/btn";
import Link from "next/link";
import useAuth from "@/hooks/useAuth";
import Image from "next/image";

function Home() {
   const { gestor, erro, carregando } = useAuth();
   console.log("Imagem:", gestor?.imagem);

   return (
      <div className="flex items-center justify-center h-[80vh] w-full">
         {!gestor ? (
            <div className="flex flex-col items-center justify-center gap-4">
               <p className="text-xl font-bold text-red-500 flex items-center gap-2">
                  <span>⚠️</span> Acesso Restrito
               </p>
               <p className="text-gray-600 dark:text-gray-100 text-center">
                  Para acessar, realize o login!
               </p>
               <Link href="/login">
                  <Btn>Fazer Login</Btn>
               </Link>
            </div>
         ) : (
            <div>
               <h1>Perfil</h1>

               {carregando && <p>Carregando...</p>}
               {erro && <p>{erro}</p>}

               <div>
                  <p>
                     <strong>Nome:</strong> {gestor.name}
                  </p>
                  <p>
                     <strong>Email:</strong> {gestor.email}
                  </p>
                  <p>
                     <strong>Imagem:</strong> {gestor.image}
                  </p>
               </div>

               {gestor.image && (
                  <Image
                     src={`${process.env.NEXT_PUBLIC_API_URL}${gestor.image}`}
                     alt="Imagem de Perfil"
                     width={100}
                     height={100}
                     className="rounded-full"
                     unoptimized
                  />
               )}
            </div>
         )}
      </div>
   );
}
export default Home;
