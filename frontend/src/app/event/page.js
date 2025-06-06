"use client";
import React, { useEffect, useState } from "react";
import Saida from "@/components/eventForm/saida";
import Chegada from "@/components/eventForm/chegada";
import { useSearchParams } from "next/navigation";
import EventTable from "@/components/table/eventTable";
import withAuth from "@/utils/withAuth";
import Icon from "@/elements/Icon";
import useEvents from "@/hooks/useEvent";
import {
   PieChart,
   Pie,
   Cell,
   Legend,
   ResponsiveContainer,
   Tooltip,
} from "recharts";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";

function Events() {
   const [tipoEvento, setTipoEvento] = useState("");
   const searchParams = useSearchParams();
   const { events } = useEvents();

   const eventosAtivos = events.filter((event) => event.status === "ACTIVE");
   const eventosFinalizados = events.filter(
      (event) => event.status === "COMPLETED" && event.eventType === "RETURN"
   );
   const eventosSaida = events.filter(
      (event) => event.eventType === "CHECKOUT"
   );
   const eventosChegada = events.filter(
      (event) => event.eventType === "RETURN"
   );

   // Dados para o gráfico de pizza
   const eventTypeData = [
      { name: "Ativos", value: eventosAtivos.length },
      { name: "Finalizados", value: eventosFinalizados.length },
   ];

   const COLORS = ["#8B5CF6", "#10B981", "#E2E8F0"];

   useEffect(() => {
      const tipo = searchParams.get("tipo");
      if (["saida", "chegada"].includes(tipo)) {
         setTipoEvento(tipo);
      } else {
         setTipoEvento("");
      }
   }, [searchParams]);

   return (
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
         {/* header */}
         <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="md:flex justify-between border-b items-center border-bee-dark-300 dark:border-bee-dark-400 pb-3"
         >
            <motion.h2
               initial={{ opacity: 0, x: -20 }}
               animate={{ opacity: 1, x: 0 }}
               className="text-3xl font-bold md:mb-0 mb-3"
            >
               Gerenciar Evento
            </motion.h2>

            <motion.div
               initial={{ opacity: 0, x: 20 }}
               animate={{ opacity: 1, x: 0 }}
               className="flex items-start gap-2"
            >
               <h1 className="text-base font-medium self-center">
                  Tipo de evento:
               </h1>

               <div className="inline-flex rounded-md shadow-sm" role="group">
                  <button
                     type="button"
                     onClick={() => setTipoEvento("chegada")}
                     className={`px-4 py-2 text-sm font-medium rounded-l-lg border border-bee-dark-300 dark:border-bee-dark-400 ${
                        tipoEvento === "chegada"
                           ? "bg-gray-100 dark:bg-gray-800"
                           : "bg-white dark:bg-bee-dark-800 hover:bg-bee-alert-500 dark:hover:bg-bee-alert-600"
                     }`}
                  >
                     <div className="flex items-center gap-2">
                        <Icon name="car-in" className="size-4" />
                        Chegada
                     </div>
                  </button>
                  <button
                     type="button"
                     onClick={() => setTipoEvento("saida")}
                     className={`px-4 py-2 text-sm font-medium rounded-r-lg border-t border-b border-r border-bee-dark-300 dark:border-bee-dark-400 ${
                        tipoEvento === "saida"
                           ? "bg-gray-100 dark:bg-gray-800"
                           : "bg-white dark:bg-bee-dark-800 hover:bg-bee-alert-500 dark:hover:bg-bee-alert-600"
                     }`}
                  >
                     <div className="flex items-center gap-2">
                        <Icon name="car-out" className="size-4" />
                        Saída
                     </div>
                  </button>
               </div>
            </motion.div>
         </motion.div>

         {/* conteudo */}
         <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-6">
            {/* estatistica */}
            <motion.div
               initial={{ opacity: 0, y: 20 }}
               animate={{ opacity: 1, y: 0 }}
               transition={{ delay: 0.1 }}
               whileHover={{ scale: 1.02 }}
               className="bg-bee-dark-100 dark:bg-bee-dark-800 p-6 rounded-2xl border border-bee-dark-300 dark:border-bee-dark-400 shadow-sm card-hover"
            >
               <h3 className="text-xl font-bold mb-4 text-bee-dark-800 dark:text-white">
                  Visão Geral
               </h3>
               <div className="h-40">
                  <ResponsiveContainer width="100%" height="100%">
                     <PieChart>
                        <Pie
                           data={eventTypeData}
                           cx="50%"
                           cy="50%"
                           innerRadius={40}
                           outerRadius={63}
                           fill="#8884d8"
                           paddingAngle={2}
                           dataKey="value"
                        >
                           {eventTypeData.map((entry, index) => (
                              <Cell
                                 key={`cell-${index}`}
                                 fill={COLORS[index % COLORS.length]}
                              />
                           ))}
                        </Pie>
                        <Tooltip
                           formatter={(value) => [`${value} eventos`, ""]}
                        />
                        <Legend
                           iconSize={10}
                           iconType="circle"
                           layout="vertical"
                           verticalAlign="center"
                           align="right"
                           wrapperStyle={{
                              paddingLeft: "20px",
                              fontSize: "12px",
                           }}
                           formatter={(value) => (
                              <span className="text-sm text-bee-dark-500 dark:text-bee-dark-300">
                                 {value}
                              </span>
                           )}
                        />
                     </PieChart>
                  </ResponsiveContainer>
               </div>
               <div className="grid grid-cols-2 gap-4 mb-4 border-t border-bee-dark-300 dark:border-bee-dark-400 mt-4">
                  <div className=" p-3 rounded-lg">
                     <p className="text-sm text-bee-dark-500 dark:text-bee-dark-300">
                        Ativos
                     </p>
                     <p className="text-2xl font-bold">
                        {eventosAtivos.length || (
                           <span className="italic text-bee-dark-400">-</span>
                        )}
                     </p>
                  </div>
                  <div className=" p-3 rounded-lg">
                     <p className="text-sm text-bee-dark-500 dark:text-bee-dark-300">
                        Finalizados
                     </p>
                     <p className="text-2xl font-bold">
                        {eventosFinalizados.length || (
                           <span className="italic text-bee-dark-400">-</span>
                        )}
                     </p>
                  </div>
               </div>
            </motion.div>

            <motion.div
               initial={{ opacity: 0, y: 20 }}
               animate={{ opacity: 1, y: 0 }}
               transition={{ delay: 0.2 }}
               className="flex flex-col gap-4"
            >
               {/* semana */}
               <motion.div
                  whileHover={{ scale: 1.02 }}
                  className="bg-bee-dark-100 dark:bg-bee-dark-800 p-6 rounded-2xl border border-bee-dark-300 dark:border-bee-dark-400 shadow-sm card-hover"
               >
                  <h3 className="text-xl font-bold mb-4 text-bee-dark-800 dark:text-white">
                     Últimos 7 dias
                  </h3>
                  <div className="space-y-4">
                     <div className="flex justify-between items-center">
                        <div className="flex items-center gap-2">
                           <Icon
                              name="eventoL"
                              className="size-5 text-purple-500"
                           />
                           <span className="text-sm">Saídas</span>
                        </div>
                        <span className="font-bold">
                           {
                              eventosSaida.filter(
                                 (e) =>
                                    new Date(e.createdAt) >
                                    new Date(
                                       Date.now() - 7 * 24 * 60 * 60 * 1000
                                    )
                              ).length
                           }
                        </span>
                     </div>
                     <div className="flex justify-between items-center">
                        <div className="flex items-center gap-2">
                           <Icon
                              name="evento"
                              className="size-5 text-green-500"
                           />
                           <span className="text-sm">Chegadas</span>
                        </div>
                        <span className="font-bold">
                           {
                              eventosChegada.filter(
                                 (e) =>
                                    new Date(e.createdAt) >
                                    new Date(
                                       Date.now() - 7 * 24 * 60 * 60 * 1000
                                    )
                              ).length
                           }
                        </span>
                     </div>
                  </div>
               </motion.div>

               {/* tipos de evento */}
               <motion.div
                  whileHover={{ scale: 1.02 }}
                  className="bg-bee-dark-100 dark:bg-bee-dark-800 p-6 rounded-2xl border border-bee-dark-300 dark:border-bee-dark-400 shadow-sm card-hover"
               >
                  <h3 className="text-xl font-bold mb-4">Tipos de Evento</h3>
                  <div className="space-y-3">
                     <div>
                        <div className="flex justify-between text-sm mb-1">
                           <span>Saídas</span>
                           <span>
                              {eventosSaida.length} (
                              {Math.round(
                                 (eventosSaida.length / events.length) * 100
                              )}
                              %)
                           </span>
                        </div>
                        <div className="w-full bg-gray-200 dark:bg-bee-dark-600 rounded-full h-2">
                           <div
                              className="bg-purple-500 h-2 rounded-full"
                              style={{
                                 width: `${(eventosSaida.length / events.length) * 100}%`,
                              }}
                           ></div>
                        </div>
                     </div>
                     <div>
                        <div className="flex justify-between text-sm mb-1">
                           <span>Chegadas</span>
                           <span>
                              {eventosChegada.length} (
                              {Math.round(
                                 (eventosChegada.length / events.length) * 100
                              )}
                              %)
                           </span>
                        </div>
                        <div className="w-full bg-gray-200 dark:bg-bee-dark-600 rounded-full h-2">
                           <div
                              className="bg-green-500 h-2 rounded-full"
                              style={{
                                 width: `${(eventosChegada.length / events.length) * 100}%`,
                              }}
                           ></div>
                        </div>
                     </div>
                  </div>
                  <div className="mt-4 pt-3 border-t border-bee-dark-300 dark:border-bee-dark-600">
                     <p className="text-xs text-bee-dark-500 dark:text-bee-dark-400">
                        Total: {events.length} eventos registrados
                     </p>
                  </div>
               </motion.div>
            </motion.div>

            {/*  acoes rapidas */}
            <motion.div
               initial={{ opacity: 0, y: 20 }}
               animate={{ opacity: 1, y: 0 }}
               transition={{ delay: 0.3 }}
               whileHover={{ scale: 1.02 }}
               className="bg-bee-dark-100 dark:bg-bee-dark-800 p-6 rounded-2xl border border-bee-dark-300 dark:border-bee-dark-400 shadow-sm card-hover"
            >
               <h3 className="text-xl font-bold mb-4 text-bee-dark-800 dark:text-white">
                  Ações Rápidas
               </h3>
               <div className="space-y-3">
                  <motion.button
                     whileHover={{
                        scale: 1.05,
                        backgroundColor: "rgba(152, 16, 250, 0.1)",
                     }}
                     whileTap={{ scale: 0.95 }}
                     onClick={() => setTipoEvento("saida")}
                     className="w-full flex items-center gap-2 p-3 rounded-lg transition-colors"
                  >
                     <Icon name="eventoL" className="size-5 text-purple-500" />
                     <span>Registrar Saída</span>
                  </motion.button>
                  <motion.button
                     whileHover={{
                        scale: 1.05,
                        backgroundColor: "rgba(0, 166, 62, 0.1)",
                     }}
                     whileTap={{ scale: 0.95 }}
                     onClick={() => setTipoEvento("chegada")}
                     className="w-full flex items-center gap-2 p-3 rounded-lg transition-colors"
                  >
                     <Icon name="evento" className="size-5 text-green-500" />
                     <span>Registrar Chegada</span>
                  </motion.button>
                  <motion.div
                     whileHover={{
                        scale: 1.05,
                        backgroundColor: "rgba(21, 93, 252, 0.1)",
                     }}
                     whileTap={{ scale: 0.95 }}
                     className="rounded-lg"
                  >
                     <Link
                        href="/report?filterType=event"
                        className="w-full flex items-center gap-2 p-3 rounded-lg transition-colors"
                     >
                        <Icon name="reports" className="size-5 text-blue-500" />
                        <span>Gerar Relatório</span>
                     </Link>
                  </motion.div>
               </div>
            </motion.div>

            {/* Tabela */}
            <motion.div
               initial={{ opacity: 0, y: 20 }}
               animate={{ opacity: 1, y: 0 }}
               transition={{ delay: 0.4 }}
               className="p-0 shadow-sm rounded-md col-span-1 md:col-span-2 lg:col-span-4"
            >
               <EventTable />
            </motion.div>
         </div>

         {/* Modal de evento */}
         <AnimatePresence>
            {tipoEvento && (
               <div className="fixed inset-0 z-50">
                  <motion.div
                     initial={{ opacity: 0 }}
                     animate={{ opacity: 1 }}
                     exit={{ opacity: 0 }}
                     className="absolute inset-0 bg-black/30"
                     onClick={() => setTipoEvento("")}
                  />

                  <motion.div
                     initial={{ y: "100%" }}
                     animate={{ y: 0 }}
                     exit={{ y: "100%" }}
                     transition={{
                        type: "spring",
                        damping: 25,
                        stiffness: 300,
                     }}
                     className="absolute bottom-0 left-0 right-0 md:bottom-auto md:right-auto md:top-1/2 md:left-1/2 md:-translate-x-1/2 md:-translate-y-1/2"
                  >
                     <motion.div
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.95 }}
                        transition={{ delay: 0.1 }}
                        className="bg-white dark:bg-gray-800 rounded-t-xl md:rounded-xl shadow-xl border-t md:border border-gray-200 dark:border-gray-700 p-4 md:p-6 w-full md:max-w-2xl"
                     >
                        <div className="flex items-center gap-3 mb-6">
                           <h2 className="text-2xl font-bold">
                              {tipoEvento === "saida"
                                 ? "Registrar Saída"
                                 : "Registrar Chegada"}
                           </h2>
                           <motion.button
                              whileHover={{ scale: 1.1, rotate: 90 }}
                              whileTap={{ scale: 0.9 }}
                              onClick={() => setTipoEvento("")}
                              className="ml-auto text-gray-400 hover:text-gray-700 dark:hover:text-white text-2xl font-bold focus:outline-none"
                              aria-label="Fechar"
                              type="button"
                           >
                              <Icon
                                 name="xMark"
                                 className="size-5"
                                 strokeWidth={5}
                              />
                           </motion.button>
                        </div>

                        <div className="overflow-y-auto max-h-[calc(100vh-12rem)] md:max-h-[80vh]">
                           {tipoEvento === "saida" ? <Saida /> : <Chegada />}
                        </div>
                     </motion.div>
                  </motion.div>
               </div>
            )}
         </AnimatePresence>
      </motion.div>
   );
}

export default withAuth(Events);
