"use client";
import Btn from "@/elements/btn";
import Link from "next/link";
import { useState, useEffect } from "react";
export default function Home() {
   const [isAuthenticated, setIsAuthenticated] = useState(false);

   useEffect(() => {
      const token = localStorage.getItem("token");
      if (token) {
         setIsAuthenticated(true);
      }
   }, []);
   return (
      <div className="grid grid-cols-12 gap-4 md:gap-6">
         <div className="col-span-12 xl:col-span-5">
            {!isAuthenticated && (
               <Link href="/login">
                  <Btn variant="secondary" texto="teste" />
               </Link>
            )}
         </div>
      </div>
   );
}
