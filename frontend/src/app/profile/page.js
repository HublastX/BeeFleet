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
import useEvents from "@/hooks/useEvent";
import ProfileListModal from "@/components/profileList/profileList";

function Manager() {
   const { gestor, deleteManager } = useAuth();
   const { countDriversByManager } = useDrivers();
   const { countCarsByManager } = useCar();
   const { countEventsByManager } = useEvents();

   const [modalAberto, setModalAberto] = useState(false);
   const [managerParaDeletar, setManagerParaDeletar] = useState(null);
   const [modalListaAberto, setModalListaAberto] = useState(false);
   const [tipoLista, setTipoLista] = useState(null);
   const [menuAberto, setMenuAberto] = useState(false);

   if (!gestor) return null;
   const { name, image, email, id } = gestor;

   const myDriversCount = countDriversByManager;
   const myCarsCount = countCarsByManager;
   const myEventsCount = countEventsByManager;

   function abrirModalDeletar(managerId) {
      setManagerParaDeletar(managerId);
      setModalAberto(true);
   }

   const alternarMenu = () => {
      setMenuAberto(!menuAberto);
   };

   async function confirmarDelete() {
      if (managerParaDeletar) {
         try {
            await deleteManager(managerParaDeletar);
            setModalAberto(false);
            setManagerParaDeletar(null);
         } catch (error) {
            console.error("Erro ao deletar perfil:", error);
         }
      }
   }

   return (
      <div className="max-w-6xl mx-auto p-4 md:p-8 space-y-8">
         {/* Header */}
         <div className="flex justify-between items-center mb-6">
            <h1 className="text-3xl font-bold text-gray-800 dark:text-white">
               Meu Perfil
            </h1>
            <div className="flex gap-2 hidden lg:flex">
               <Link href="/profile/edit">
                  <Btn
                     texto="Editar perfil"
                     className="px-4 py-2 text-sm font-medium flex flex-row-reverse items-center gap-2"
                  >
                     <Icon name="lapis" className="w-4 h-4" />
                  </Btn>
               </Link>
               <button
                  onClick={() => abrirModalDeletar(id)}
                  className="px-4 py-2 text-sm font-medium text-red-600 hover:text-red-800 dark:hover:text-red-400 transition-colors flex items-center gap-2"
               >
                  <Icon name="trash" className="size-5" strokeWidth={2} />
                  Excluir conta
               </button>
            </div>
         </div>

         {/* Profile Card */}
         <div className="flex flex-col sm:flex-row items-center gap-6 p-6 rounded-xl bg-white dark:bg-gray-800 shadow-lg border border-gray-200 dark:border-gray-700 lg:bg-transparent lg:border-transparent transition-all">
            <div className="relative flex-shrink-0 group">
               {!image ? (
                  <Icon
                     name="UserCircle"
                     className="w-32 h-32 text-gray-400 dark:text-gray-500"
                  />
               ) : (
                  <>
                     <Image
                        src={image}
                        alt={`Foto de perfil de ${name}`}
                        width={128}
                        height={128}
                        className="rounded-full object-cover w-32 h-32 transition-all"
                        priority
                     />
                  </>
               )}
            </div>

            <div className="flex-1 text-center sm:text-left space-y-2">
               <h1 className="text-3xl font-bold capitalize text-gray-800 dark:text-white">
                  {name}
               </h1>
               <p className="text-lg text-gray-600 dark:text-gray-300">
                  {email}
               </p>
            </div>
         </div>

         {/* Statistics Section */}
         <section className="mt-12">
            <h2 className="text-2xl font-bold text-gray-800 dark:text-white mb-6 pb-2 border-b border-gray-200 dark:border-gray-700">
               Minhas Estatísticas
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
               <StatCard
                  icon="users"
                  title="Motoristas"
                  count={myDriversCount}
                  onClick={() => {
                     setTipoLista("motoristas");
                     setModalListaAberto(true);
                  }}
               />

               <StatCard
                  icon="car"
                  title="Carros"
                  count={myCarsCount}
                  onClick={() => {
                     setTipoLista("carros");
                     setModalListaAberto(true);
                  }}
               />

               <StatCard
                  icon="eventoL"
                  title="Eventos"
                  count={myEventsCount}
                  onClick={() => {
                     setTipoLista("eventos");
                     setModalListaAberto(true);
                  }}
               />
            </div>
         </section>

         <div className="fixed block lg:hidden bottom-0 right-0 m-4 z-50">
            <button
               onClick={alternarMenu}
               className="p-5 bg-bee-purple-600 hover:bg-bee-purple-700 shadow-xl text-white rounded-full transition-colors duration-300"
            >
               <Icon name="menuMobile" className="size-7" strokeWidth={2} />
            </button>
         </div>

         <ProfileListModal
            open={modalListaAberto}
            onClose={() => setModalListaAberto(false)}
            tipo={tipoLista}
         />

         {menuAberto && (
            <div className="fixed bottom-23 right-1 shadow-xl rounded-lg p-2 w-56 bg-white dark:bg-bee-dark-800 border border-gray-200 dark:border-bee-dark-600 z-50 animate-fade-in">
               <ul className="flex flex-col gap-1">
                  <li>
                     <Link href="/edit" className="block">
                        <span className="flex items-center gap-3 px-3 py-2 rounded-md hover:bg-bee-alert-500 dark:hover:bg-bee-alert-600 transition-colors duration-200">
                           <Icon
                              name="lapis"
                              className="size-4 text-bee-primary"
                           />
                           <span className="text-gray-800 dark:text-gray-200">
                              Editar
                           </span>
                        </span>
                     </Link>
                  </li>
                  <li>
                     <Link href="/report" className="block">
                        <span className="flex items-center gap-3 px-3 py-2 rounded-md hover:bg-bee-alert-500 dark:hover:bg-bee-alert-600 transition-colors duration-200">
                           <Icon
                              name="reports"
                              className="size-4 text-bee-primary"
                           />
                           <span className="text-gray-800 dark:text-gray-200">
                              Gerar relatorio
                           </span>
                        </span>
                     </Link>
                  </li>
                  <li className="border-t border-gray-200 dark:border-bee-dark-600 mt-1 pt-1">
                     <button
                        onClick={() => abrirModalDeletar(id)}
                        className="w-full text-left"
                     >
                        <span className="flex items-center gap-3 px-3 py-2 rounded-md hover:bg-red-50 dark:hover:bg-red-900/20 transition-colors duration-200">
                           <Icon
                              name="trash"
                              className="size-4 text-red-500 dark:text-red-400"
                              strokeWidth={3}
                           />
                           <span className="text-red-600 dark:text-red-400">
                              Deletar Conta
                           </span>
                        </span>
                     </button>
                  </li>
               </ul>
            </div>
         )}
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

function StatCard({ icon, title, count, onClick }) {
   return (
      <button
         onClick={onClick}
         className="p-6 rounded-xl bg-neutral-50 dark:bg-bee-dark-800 shadow-none border border-bee-dark-300 dark:border-bee-dark-400 transition-all hover:shadow-lg hover:-translate-y-1 group"
      >
         <div className="flex items-center gap-4">
            <div className="p-3 rounded-lg bg-gray-100 dark:bg-gray-800 transition-colors">
               <Icon
                  name={icon}
                  className="text-bee-dark-600 size-6 dark:text-bee-alert-500"
               />
            </div>
            <div className="text-left">
               <h3 className="text-sm font-semibold text-bee-dark-600 dark:text-gray-400">
                  {title}
               </h3>
               <p className="mt-2 text-3xl font-bold text-bee-dark-600 dark:text-bee-alert-500">
                  {count}
               </p>
            </div>
         </div>
      </button>
   );
}

export default withAuth(Manager);
