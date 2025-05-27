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
      <div>
         {/* header */}
         <div className="md:flex justify-between border-b items-center border-bee-dark-300 dark:border-bee-dark-400 pb-3">
            <h2 className="text-3xl font-bold md:mb-0 mb-3">
               Gerenciar Evento
            </h2>

            <div className="flex items-start gap-2">
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
            </div>
         </div>

         {/* conteudo */}
         <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-6">
            {/* estatistica */}
            <div className="bg-bee-dark-100 dark:bg-bee-dark-800 p-6 rounded-2xl border border-bee-dark-300 dark:border-bee-dark-400 shadow-sm card-hover">
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
                           innerRadius={60}
                           outerRadius={80}
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
            </div>

            <div className="flex flex-col gap-4">
               {/* semana */}
               <div className="bg-bee-dark-100 dark:bg-bee-dark-800 p-6 rounded-2xl border border-bee-dark-300 dark:border-bee-dark-400 shadow-sm card-hover">
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
               </div>

               {/* tipos de evento */}
               <div className="bg-bee-dark-100 dark:bg-bee-dark-800 p-6 rounded-2xl border border-bee-dark-300 dark:border-bee-dark-400 shadow-sm card-hover">
                  <h3 className="text-xl font-bold mb-4">
                     Tipos de Evento
                  </h3>
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
               </div>
            </div>

            {/*  acoes rapidas */}
            <div className="bg-bee-dark-100 dark:bg-bee-dark-800 p-6 rounded-2xl border border-bee-dark-300 dark:border-bee-dark-400 shadow-sm card-hover">
               <h3 className="text-xl font-bold mb-4 text-bee-dark-800 dark:text-white">
                  Ações Rápidas
               </h3>
               <div className="space-y-3">
                  <button
                     onClick={() => setTipoEvento("saida")}
                     className="w-full flex items-center gap-2 p-3 rounded-lg transition-colors hover:bg-purple-500/10 "
                  >
                     <Icon name="eventoL" className="size-5 text-purple-500" />
                     <span>Registrar Saída</span>
                  </button>
                  <button
                     onClick={() => setTipoEvento("chegada")}
                     className="w-full flex items-center gap-2 p-3 rounded-lg transition-colors hover:bg-green-500/10"
                  >
                     <Icon name="evento" className="size-5 text-green-500" />
                     <span>Registrar Chegada</span>
                  </button>
                  <button className="w-full flex items-center gap-2 p-3 rounded-lg transition-colors hover:bg-blue-500/10">
                     <Icon name="reports" className="size-5 text-blue-500" />
                     <span>Gerar Relatório</span>
                  </button>
               </div>
            </div>

            {/* Tabela */}
            <div className="p-0 shadow-sm rounded-md col-span-1 md:col-span-2 lg:col-span-4 ">
               <EventTable />
            </div>
         </div>

         {/* Modal de evento */}
         {tipoEvento && (
            <div className="fixed inset-0 z-50 flex items-center justify-center backdrop-blur-md">
               <div className="bg-white dark:bg-bee-dark-800 p-6 rounded-2xl border border-bee-dark-300 dark:border-bee-dark-400 shadow-lg self-center min-w-[350px] max-w-full">
                  <div className="flex items-center gap-3 mb-6">
                     <h2 className="text-2xl font-bold">
                        {tipoEvento === "saida"
                           ? "Registrar Saída"
                           : "Registrar Chegada"}
                     </h2>
                     <button
                        onClick={() => setTipoEvento("")}
                        className="ml-auto text-gray-400 hover:text-gray-700 dark:hover:text-white text-2xl font-bold focus:outline-none"
                        aria-label="Fechar"
                        type="button"
                     >
                        <Icon name="xMark" className="size-5" strokeWidth={5} />
                     </button>
                  </div>

                  {tipoEvento === "saida" ? <Saida /> : <Chegada />}
               </div>
            </div>
         )}
      </div>
   );
}

export default withAuth(Events);
