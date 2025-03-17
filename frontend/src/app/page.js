"use client";
import { useState } from "react";
import ModalDriver from "./components/Modal";
import Header from "./components/Header";

export default function Home() {
   const [isModalOpen, setIsModalOpen] = useState(false);

   const handleOpenModal = () => {
      setIsModalOpen(true);
   };

   const handleCloseModal = () => {
      setIsModalOpen(false);
   };

   return (
      <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
         <Header onOpenModal={handleOpenModal} />

         <main className="flex flex-col gap-[32px] row-start-2 items-center sm:items-start">
            <div className="flex gap-4 items-center flex-col sm:flex-row">
               <button
                  className="rounded-full border border-solid border-transparent transition-colors flex items-center justify-center bg-foreground text-background gap-2 hover:bg-[#383838] dark:hover:bg-[#ccc] font-medium text-sm sm:text-base h-10 sm:h-12 px-4 sm:px-5 sm:w-auto"
                  onClick={handleOpenModal}
               >
                  Solicitar Carro
               </button>
            </div>
         </main>

         {isModalOpen && <ModalDriver onClose={handleCloseModal} />}
      </div>
   );
}
