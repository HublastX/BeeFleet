"use client";
import Btn from "@/elements/btn";
import Link from "next/link";
import useAuth from "@/hooks/useAuth";
import { useState } from "react";
import LoginOverlay from "@/components/blockdamain";

export default function Home() {
   const { gestor } = useAuth();
   const [isLoggedIn, setIsLoggedIn] = useState(!!gestor);

   return (
      <div className="grid grid-cols-12 gap-4 md:gap-6">
         {!isLoggedIn && <LoginOverlay onLogin={() => setIsLoggedIn(true)} />}

         <div className="col-span-12 xl:col-span-5">
            {!gestor ? (
               <Link href="/login">
                  <Btn variant="secondary" texto="Login" />
               </Link>
            ) : (
               <div>
                  <p>Bem-vindo, {gestor.name}!</p>
               </div>
            )}
         </div>
      </div>
   );
}
