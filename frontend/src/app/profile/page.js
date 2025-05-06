"use client";
import useAuth from "@/hooks/useAuth";
import useDrivers from "@/hooks/useDrivers";
import useCar from "@/hooks/useCar";
import Icon from "@/elements/Icon";
import Image from "next/image";
import Link from "next/link";
import Btn from "@/elements/btn";
import withAuth from "@/utils/withAuth";
import DeleteConfirmation from "@/components/ConfirmDeleteModal";
import { useState } from "react";

function Manager() {
   const { gestor, deleteManager } = useAuth();
   const { countDriversByManager } = useDrivers();
   const { countCarsByManager } = useCar();
   const [modalAberto, setModalAberto] = useState(false);

   if (!gestor) return null;
   const { name, image, email } = gestor;

   const myDriversCount = countDriversByManager;
   const myCarsCount = countCarsByManager;

   function abrirModalDeletar() {
      setModalAberto(true);
   }
   function confirmarDelete() {
      deleteManager(gestor.id);
      setModalAberto(false);
   }

   return (
      <div className="p-4 space-y-6">
         {/* Perfil */}
         <div className="flex items-center gap-6 px-6 rounded-lg shadow-theme-lg">
            <div className="flex-shrink-0">
               {!image ? (
                  <Icon name="UserCircle" className="w-24 h-24 text-gray-400" />
               ) : (
                  <Image
                     src={image}
                     alt={`Foto de perfil de ${name}`}
                     width={100}
                     height={100}
                     className="rounded-full object-cover w-24 h-24"
                  />
               )}
            </div>

            <div className="flex-1">
               <h1 className="text-2xl font-black capitalize">{name}</h1>
               <p className="text-sm text-gray-600 dark:text-gray-300">
                  {email}
               </p>
            </div>

            <div className="flex gap-3">
               <Link href="profile/edit">
                  <Btn texto="Editar perfil" />
               </Link>

               <Btn
                  onClick={() => abrirModalDeletar()}
                  texto="Deletar Perfil"
                  className="bg-red-600 hover:bg-red-700"
               />
            </div>
         </div>

         <hr className="py-4 dark:border-bee-dark-400 border-bee-dark-300" />

         {/* Estatísticas */}
         <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <Link
               href="profile/drivers"
               className="p-6  rounded-lg shadow-theme-lg"
            >
               <h2 className="text-lg font-semibold mb-2">
                  Total de motoristas adicionados
               </h2>
               <p className="text-4xl font-black text-bee-yellow-700">
                  {myDriversCount}
               </p>
            </Link>

            <Link
               href="profile/cars"
               className="p-6 rounded-lg shadow-theme-lg"
            >
               <h2 className="text-lg font-semibold mb-2">
                  Total de carros adicionados
               </h2>
               <p className="text-4xl font-black text-bee-yellow-700">
                  {myCarsCount}
               </p>
            </Link>

            <Link
               href="profile/eventos"
               className="p-6 rounded-lg shadow-theme-lg"
            >
               <h2 className="text-lg font-semibold mb-2">
                  Total de eventos finalizados
               </h2>
               <p className="text-4xl font-black text-bee-yellow-700">60</p>
            </Link>
         </div>

         {modalAberto && (
            <DeleteConfirmation
               link={confirmarDelete}
               tipo="perfil"
               onClose={() => setModalAberto(false)}
            />
         )}
      </div>
   );
}

export default withAuth(Manager);
