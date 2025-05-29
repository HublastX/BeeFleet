"use client";
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
import { useRouter } from "next/navigation";
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from "recharts";

function Manager() {
   const { gestor, deleteManager } = useAuth();
   const { countDriversByManager, motoristas } = useDrivers();
   const { countCarsByManager, carro } = useCar();
   const { countEventsByManager, events } = useEvents();

   const [modalAberto, setModalAberto] = useState(false);
   const [managerParaDeletar, setManagerParaDeletar] = useState(null);
   const [modalListaAberto, setModalListaAberto] = useState(false);
   const [tipoLista, setTipoLista] = useState(null);
   const router = useRouter();

   if (!gestor) return null;
   const { name, image, email, id } = gestor;

   const myDriversCount = countDriversByManager;
   const myCarsCount = countCarsByManager;
   const myEventsCount = countEventsByManager;

   const countAllDrivers = motoristas.length;
   const countAllCars = carro.length;
   const countAllEvents = events.length;

   // Dados para os gráficos de pizza
   const driversData = [
      { name: "Meus Motoristas", value: myDriversCount },
      { name: "Outros Motoristas", value: countAllDrivers - myDriversCount },
   ];

   const carsData = [
      { name: "Meus Veículos", value: myCarsCount },
      { name: "Outros Veículos", value: countAllCars - myCarsCount },
   ];

   const eventsData = [
      { name: "Meus Eventos", value: myEventsCount },
      { name: "Outros Eventos", value: countAllEvents - myEventsCount },
   ];

   const COLORS = ["#8B5CF6", "#E2E8F0"];

   function abrirModalDeletar(managerId) {
      setManagerParaDeletar(managerId);
      setModalAberto(true);
   }

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
      <main
         className="max-w-6xl mx-auto p-4 md:p-8 space-y-8"
         role="main"
         aria-labelledby="page-title"
      >
         {/* Header */}
         <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-8">
            <div>
               <h1
                  id="page-title"
                  className="text-3xl font-bold text-gray-800 dark:text-white"
               >
                  Painel do Gestor
               </h1>
               <p className="text-gray-500 dark:text-gray-400 mt-1">
                  Gerencie seus recursos e informações pessoais
               </p>
            </div>

            <div
               className="flex gap-3"
               role="toolbar"
               aria-label="Ações do perfil"
            >
               <Link
                  href="/profile/edit"
                  aria-label="Editar informações do perfil"
               >
                  <Btn
                     texto="Editar perfil"
                     className="flex flex-row-reverse items-center gap-2"
                  >
                     <Icon name="lapis" className="size-4" aria-hidden="true" />
                  </Btn>
               </Link>
               <button
                  onClick={() => abrirModalDeletar(id)}
                  className="px-4 py-2.5 text-sm font-medium text-red-600 hover:text-red-800 dark:hover:text-red-400 transition-colors flex items-center gap-2 border border-red-100 dark:border-red-900/30 hover:bg-red-50 dark:hover:bg-red-900/10 rounded-lg"
                  aria-label="Excluir conta"
               >
                  <Icon
                     name="trash"
                     className="size-4"
                     strokeWidth={2}
                     aria-hidden="true"
                  />
                  Excluir conta
               </button>
            </div>
         </div>

         <section
            className="grid grid-cols-1 lg:grid-cols-3 gap-6"
            aria-label="Informações do perfil"
         >
            {/* perfil */}
            <div
               className="card-hover lg:col-span-2 bg-gradient-to-br from-white to-blue-50 dark:from-bee-dark-400 dark:to-bee-dark-800 rounded-2xl p-6 shadow-sm border border-bee-dark-300 dark:border-bee-dark-400"
               role="region"
               aria-label="Detalhes do perfil"
            >
               <div className="flex flex-col md:flex-row items-center gap-6">
                  <div className="relative flex-shrink-0 group">
                     {!image ? (
                        <div
                           className="w-28 h-28 rounded-full bg-white dark:bg-bee-dark-800 flex items-center justify-center border-2 border-gray-200 dark:border-bee-dark-400"
                           role="img"
                           aria-label="Avatar padrão"
                        >
                           <Icon
                              name="UserCircle"
                              className="w-20 h-20 text-gray-400 dark:text-gray-500"
                              aria-hidden="true"
                           />
                        </div>
                     ) : (
                        <div className="w-28 h-28 rounded-full border-2 border-white dark:border-bee-dark-500 shadow-md overflow-hidden">
                           <Image
                              src={image}
                              alt={`Foto de perfil de ${name}`}
                              width={112}
                              height={112}
                              className="object-cover w-full h-full"
                              priority
                           />
                        </div>
                     )}
                  </div>

                  <div className="flex-1 text-center md:text-left space-y-3">
                     <div>
                        <h2 className="text-2xl font-bold capitalize text-gray-800 dark:text-white">
                           {name}
                        </h2>
                        <p className="text-gray-600 dark:text-gray-300">
                           {email}
                        </p>
                     </div>

                     <div
                        className="flex flex-wrap gap-2 justify-center sm:justify-start"
                        role="list"
                        aria-label="Informações adicionais"
                     >
                        <span
                           className="px-3 py-1 bg-white dark:bg-bee-dark-600 text-xs font-medium rounded-full border border-gray-200 dark:border-bee-dark-500"
                           role="listitem"
                        >
                           Gestor
                        </span>
                        <span
                           className="px-3 py-1 bg-white dark:bg-bee-dark-600 text-xs font-medium rounded-full border border-gray-200 dark:border-bee-dark-500"
                           role="listitem"
                        >
                           ID: {id.slice(0, 8)}...
                        </span>
                     </div>
                  </div>
               </div>
            </div>

            {/* resumo*/}
            <div
               className="card-hover bg-white dark:bg-bee-dark-800 rounded-2xl p-6 shadow-sm border border-bee-dark-300 dark:border-bee-dark-400"
               role="region"
               aria-label="Resumo das estatísticas"
            >
               <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-200 mb-4">
                  Resumo
               </h3>
               <div className="space-y-4">
                  <StatItem
                     icon="users"
                     label="Motoristas"
                     value={myDriversCount}
                     onClick={() => {
                        setTipoLista("motoristas");
                        setModalListaAberto(true);
                     }}
                  />
                  <StatItem
                     icon="car"
                     label="Veículos"
                     value={myCarsCount}
                     onClick={() => {
                        setTipoLista("carros");
                        setModalListaAberto(true);
                     }}
                  />
                  <StatItem
                     icon="evento"
                     label="Eventos"
                     value={myEventsCount}
                     onClick={() => {
                        setTipoLista("eventos");
                        setModalListaAberto(true);
                     }}
                  />
               </div>
            </div>
         </section>

         {/* Estatisticas */}
         <section className="mt-8" aria-labelledby="stats-title">
            <div className="flex justify-between items-center mb-6">
               <h2
                  id="stats-title"
                  className="text-xl font-bold text-gray-800 dark:text-white"
               >
                  Estatísticas Detalhadas
               </h2>
               <Link
                  href={`/report?filterType=manager&filterId=${id}`}
                  className="text-sm font-medium text-bee-purple-600 dark:text-bee-purple-400 hover:underline flex items-center gap-1"
                  aria-label="Gerar relatório completo de estatísticas"
               >
                  <Icon name="reports" className="size-4" aria-hidden="true" />
                  Gerar relatório completo
               </Link>
            </div>

            <div
               className="grid grid-cols-1 md:grid-cols-3 gap-6"
               role="list"
               aria-label="Cards de estatísticas"
            >
               <StatCard
                  icon="users"
                  title="Motoristas"
                  count={myDriversCount}
                  total={countAllDrivers}
                  color="purple"
                  data={driversData}
                  onClick={() => {
                     router.push("/drivers");
                  }}
               />

               <StatCard
                  icon="car"
                  title="Veículos"
                  count={myCarsCount}
                  total={countAllCars}
                  color="blue"
                  data={carsData}
                  onClick={() => {
                     router.push("/cars");
                  }}
               />

               <StatCard
                  icon="evento"
                  title="Eventos"
                  count={myEventsCount}
                  total={countAllEvents}
                  color="green"
                  data={eventsData}
                  onClick={() => {
                     router.push("/event");
                  }}
               />
            </div>
         </section>

         {/* Modals */}
         <ProfileListModal
            open={modalListaAberto}
            onClose={() => setModalListaAberto(false)}
            tipo={tipoLista}
         />

         {modalAberto && (
            <DeleteConfirmation
               link={confirmarDelete}
               tipo="perfil"
               onClose={() => setModalAberto(false)}
            />
         )}
      </main>
   );
}

function StatItem({ icon, label, value, onClick }) {
   return (
      <button
         onClick={onClick}
         className="flex items-center justify-between w-full p-3 rounded-lg hover:bg-bee-alert-500 dark:hover:bg-bee-alert-600 transition-colors"
         aria-label={`Ver detalhes de ${label}: ${value}`}
      >
         <div className="flex items-center gap-3">
            <div className="p-2 rounded-lg bg-gray-100 dark:bg-bee-dark-400">
               <Icon
                  name={icon}
                  className="size-5 text-gray-600 dark:text-gray-300"
                  aria-hidden="true"
               />
            </div>
            <span className="font-medium text-gray-700 dark:text-gray-300">
               {label}
            </span>
         </div>
         <span className="font-bold text-gray-800 dark:text-white">
            {value}
         </span>
      </button>
   );
}

function StatCard({ icon, title, count, total, color, data, onClick }) {
   const colorClasses = {
      purple: {
         bg: "bg-purple-50 dark:bg-purple-900/20",
         text: "text-purple-600 dark:text-purple-400",
         iconBg: "bg-purple-100 dark:bg-purple-800/50",
         chartColor: "#8B5CF6",
      },
      blue: {
         bg: "bg-blue-50 dark:bg-blue-900/20",
         text: "text-blue-600 dark:text-blue-400",
         iconBg: "bg-blue-100 dark:bg-blue-800/50",
         chartColor: "#3B82F6",
      },
      green: {
         bg: "bg-green-50 dark:bg-green-900/20",
         text: "text-green-600 dark:text-green-400",
         iconBg: "bg-green-100 dark:bg-green-800/50",
         chartColor: "#10B981",
      },
   };

   const COLORS = [colorClasses[color].chartColor, "#E2E8F0"];

   return (
      <button
         onClick={onClick}
         className={`p-6 rounded-xl ${colorClasses[color].bg} shadow-sm border border-bee-dark-300 dark:border-bee-dark-400 transition-all card-hover group w-full h-full text-left`}
         role="listitem"
         aria-label={`Estatísticas de ${title}: ${count} de ${total}`}
      >
         <div className="flex items-start justify-between">
            <div>
               <h3 className="text-sm font-semibold text-gray-500 dark:text-gray-400 mb-2">
                  {title}
               </h3>
               <p className={`text-3xl font-bold ${colorClasses[color].text}`}>
                  {count}{" "}
                  <span className="text-sm text-gray-500 dark:text-gray-400">
                     de {total}
                  </span>
               </p>
            </div>
            <div className={`p-3 rounded-lg ${colorClasses[color].iconBg}`}>
               <Icon
                  name={icon}
                  className={`size-6 ${colorClasses[color].text}`}
                  aria-hidden="true"
               />
            </div>
         </div>

         {/* grafico de pizza */}
         <div
            className="mt-4 h-45"
            role="img"
            aria-label={`Gráfico de pizza mostrando ${count} de ${total} ${title.toLowerCase()}`}
         >
            <ResponsiveContainer width="100%" height="100%">
               <PieChart>
                  <Pie
                     data={data}
                     cx="50%"
                     cy="50%"
                     innerRadius={60}
                     outerRadius={80}
                     fill="#8884d8"
                     paddingAngle={2}
                     dataKey="value"
                  >
                     {data.map((entry, index) => (
                        <Cell
                           key={`cell-${index}`}
                           fill={COLORS[index % COLORS.length]}
                        />
                     ))}
                  </Pie>
                  <Tooltip
                     formatter={(value) => [
                        `${value} ${title.toLowerCase()}`,
                        "",
                     ]}
                     labelFormatter={(name) => name}
                  />
               </PieChart>
            </ResponsiveContainer>
         </div>

         <div className="mt-3 pt-3 border-t border-gray-100 dark:border-bee-dark-400 flex justify-end">
            <span className="text-xs font-medium text-gray-500 dark:text-gray-400 group-hover:text-gray-700 dark:group-hover:text-gray-300 flex items-center gap-1">
               Ver todos
               <Icon
                  name="chevronRight"
                  className="size-3"
                  strokeWidth={3}
                  aria-hidden="true"
               />
            </span>
         </div>
      </button>
   );
}

export default withAuth(Manager);
