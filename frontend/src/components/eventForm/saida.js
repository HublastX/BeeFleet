"use client";
import Btn from "@/elements/btn";
import Icon from "@/elements/Icon";
import InputText from "@/elements/inputText";
import Badge from "@/elements/ui/badge/Badge";
import useCar from "@/hooks/useCar";
import useDrivers from "@/hooks/useDrivers";
import useEvents from "@/hooks/useEvent";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import { useCallback } from "react";
import EventList from "../profileList/eventList";

export default function Saida() {
   const { motoristas } = useDrivers();
   const { createEvent, carregando } = useEvents();
   const { carro } = useCar();
   const [odometro, setOdometro] = useState("");
   const searchParams = useSearchParams();
   const router = useRouter();

   // Motorista state
   const [motoristaInput, setMotoristaInput] = useState("");
   const [selectedMotorista, setSelectedMotorista] = useState(null);
   const [criterioMotorista, setCriterioMotorista] = useState("name");
   const [motoristaError, setMotoristaError] = useState(false);
   const [motoristaStatusError, setMotoristaStatusError] = useState("");

   // Carro state
   const [criterioCarro, setCriterioCarro] = useState("plate");
   const [carroInput, setCarroInput] = useState("");
   const [selectedCarro, setSelectedCarro] = useState(null);
   const [carroError, setCarroError] = useState(false);
   const [carroStatusError, setCarroStatusError] = useState("");

   const [showInfo, setShowInfo] = useState(false);

   // Estados para abrir os modais
   const [openMotoristaList, setOpenMotoristaList] = useState(false);
   const [openCarroList, setOpenCarroList] = useState(false);

   // Filtros
   const motoristasFiltrados = motoristas?.filter((m) => {
      const valor = motoristaInput.toLowerCase();
      if (criterioMotorista === "name")
         return m.name.toLowerCase().includes(valor);
      if (criterioMotorista === "phone") return m.phone.includes(valor);
      if (criterioMotorista === "license")
         return m.license?.toLowerCase().includes(valor);
      return false;
   });

   const carrosFiltrados = carro?.filter((c) => {
      const valor = carroInput.toLowerCase();
      if (criterioCarro === "plate")
         return c.plate.toLowerCase().includes(valor);
      if (criterioCarro === "renavam")
         return c.renavam?.toLowerCase().includes(valor);
      if (criterioCarro === "chassi")
         return c.chassis?.toLowerCase().includes(valor);
      return false;
   });

   const motoristasDisponiveis = motoristas?.filter(
      (m) => m.isAvailable === true
   );
   const carrosDisponiveis = carro?.filter((c) => c.status === "AVAILABLE");

   const selecionarMotorista = useCallback(
      (m) => {
         if (m.isAvailable !== true) {
            setMotoristaStatusError(
               "Este motorista não está disponível no momento"
            );
            setSelectedMotorista(null);
            setMotoristaInput("");
         } else {
            setSelectedMotorista(m);
            setMotoristaInput(m[criterioMotorista]);
            setMotoristaError(false);
            setMotoristaStatusError("");
         }
      },
      [criterioMotorista]
   );

   const selecionarCarro = useCallback(
      (c) => {
         if (c.status !== "AVAILABLE") {
            setCarroStatusError("Este carro não está disponível no momento");
            setSelectedCarro(null);
            setCarroInput("");
         } else {
            setSelectedCarro(c);
            setCarroInput(c[criterioCarro]);
            setOdometro(c.odometer);
            setCarroError(false);
            setCarroStatusError("");
         }
      },
      [criterioCarro]
   );

   // Efeitos
   useEffect(() => {
      if (!motoristasFiltrados.length && motoristaInput) {
         setMotoristaError(true);
      } else {
         setMotoristaError(false);
      }
   }, [motoristaInput, motoristasFiltrados]);

   useEffect(() => {
      if (!carrosFiltrados.length && carroInput) {
         setCarroError(true);
      } else {
         setCarroError(false);
      }
   }, [carroInput, carrosFiltrados]);

   useEffect(() => {
      const motoristaId = searchParams.get("motoristaId");
      if (motoristaId && motoristas) {
         const motorista = motoristas.find((m) => m.id === motoristaId);
         if (motorista) selecionarMotorista(motorista);
      }
   }, [motoristas, searchParams, selecionarMotorista]);

   useEffect(() => {
      const carroId = searchParams.get("carroId");
      if (carroId && carro) {
         const carroSelecionado = carro.find((c) => c.id === carroId);
         if (carroSelecionado) {
            selecionarCarro(carroSelecionado);
         }
      }
   }, [carro, searchParams, selecionarCarro]);

   // Handlers

   const toggleInfoSection = () => {
      setShowInfo(!showInfo);
   };

   const handleSubmit = async (e) => {
      e.preventDefault();

      if (!selectedCarro?.id || !selectedMotorista?.id) {
         setCarroError(!selectedCarro?.id);
         setMotoristaError(!selectedMotorista?.id);
         return;
      }

      if (selectedCarro.status !== "AVAILABLE") {
         setCarroStatusError("O carro selecionado não está disponível");
         return;
      }

      if (selectedMotorista.isAvailable !== true) {
         setMotoristaStatusError("O motorista selecionado não está disponível");
         return;
      }

      try {
         await createEvent(
            selectedCarro.id,
            selectedMotorista.id,
            "CHECKOUT",
            odometro,
            null
         );
      } catch (error) {
         console.error("Erro no handleSubmit:", error);
      }
   };

   return (
      <div className="max-w-4xl mx-auto p-4">
         <form onSubmit={handleSubmit} className="space-y-6">
            <div className="p-6">
               <div className="flex items-center flex-row justify-between w-full mb-4">
                  <div className="flex items-center gap-3">
                     <Icon name="user" className="size-6 " />
                     <h2 className="text-xl font-bold">Motorista</h2>
                  </div>
                  <button
                     type="button"
                     onClick={() => setOpenMotoristaList(true)}
                     className="flex items- cursor-pointer"
                  >
                     <Badge
                        size="sm"
                        color={
                           motoristasDisponiveis?.length > 0
                              ? "success"
                              : "error"
                        }
                     >
                        <span className="hidden sm:inline">
                           {motoristasDisponiveis?.length > 0
                              ? `${motoristasDisponiveis?.length} disponível${motoristasDisponiveis?.length > 1 ? "s" : ""}`
                              : "0 disponível"}
                        </span>
                        <span className="sm:hidden">
                           {motoristasDisponiveis?.length}
                        </span>
                     </Badge>
                  </button>
               </div>

               <div className="space-y-4">
                  <div className="flex flex-col md:flex-row gap-4 items-start md:items-center">
                     <label className="font-medium min-w-[120px]">
                        Buscar por:
                     </label>
                     <select
                        value={criterioMotorista}
                        onChange={(e) => {
                           setCriterioMotorista(e.target.value);
                           setMotoristaInput("");
                           setSelectedMotorista(null);
                           setMotoristaError(false);
                           setMotoristaStatusError("");
                        }}
                        className="border border-bee-dark-300 dark:border-bee-dark-400 rounded px-3 py-2 bg-white dark:bg-bee-dark-800 w-full md:w-40"
                     >
                        <option value="name">Nome</option>
                        <option value="phone">Telefone</option>
                        <option value="license">CNH</option>
                     </select>

                     <div className="relative w-full">
                        <InputText
                           type="text"
                           value={motoristaInput}
                           onChange={(e) => {
                              setMotoristaInput(e.target.value);
                              setSelectedMotorista(null);
                              setMotoristaError(false);
                              setMotoristaStatusError("");
                           }}
                           placeholder={`Digite o ${
                              criterioMotorista === "name"
                                 ? "nome"
                                 : criterioMotorista === "phone"
                                   ? "telefone"
                                   : "CNH"
                           }`}
                           className={`${motoristaError || motoristaStatusError ? "border-red-500" : ""} w-full`}
                        />
                        {motoristaInput &&
                           !selectedMotorista &&
                           motoristasFiltrados?.length > 0 && (
                              <ul className="absolute z-20 top-full left-0 right-0 bg-bee-dark-100 dark:bg-bee-dark-800 border border-bee-dark-300 dark:border-bee-dark-400 rounded shadow mt-1 max-h-48 overflow-auto">
                                 {motoristasFiltrados.map((m) => (
                                    <li
                                       key={m.id}
                                       onClick={() => selecionarMotorista(m)}
                                       className={`px-4 py-2 cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-700 ${
                                          m.isAvailable !== true
                                             ? "text-gray-400"
                                             : ""
                                       }`}
                                    >
                                       {criterioMotorista === "name"
                                          ? m.name
                                          : criterioMotorista === "phone"
                                            ? m.phone
                                            : m.license}
                                       {m.isAvailable !== true &&
                                          " (Indisponível)"}
                                    </li>
                                 ))}
                              </ul>
                           )}
                     </div>
                  </div>

                  {motoristaError && (
                     <div className="bg-red-100 dark:bg-red-900/30 border border-red-200 dark:border-red-800 rounded p-3">
                        <p className="text-red-600 dark:text-red-300">
                           Motorista não encontrado.{" "}
                           <Link
                              href="drivers/create"
                              className="text-bee-purple-500 font-medium"
                           >
                              Cadastrar novo motorista
                           </Link>
                        </p>
                     </div>
                  )}

                  {motoristaStatusError && (
                     <div className="bg-red-100 dark:bg-red-900/30 border border-red-200 dark:border-red-800 rounded p-3">
                        <p className="text-red-600 dark:text-red-300">
                           {motoristaStatusError}
                        </p>
                     </div>
                  )}
               </div>
            </div>

            {/* Seção Veículo */}
            <div className="p-6">
               <div className="flex items-center gap-3 mb-4">
                  <Icon name="car" className="size-6 " />
                  <h2 className="text-xl font-bold">Veículo</h2>
                  <button
                     type="button"
                     onClick={() => setOpenCarroList(true)}
                     className="ml-auto cursor-pointer"
                  >
                     <Badge
                        size="sm"
                        color={
                           carrosDisponiveis?.length > 0 ? "success" : "error"
                        }
                     >
                        <span className="hidden sm:inline">
                           {carrosDisponiveis?.length > 0
                              ? `${carrosDisponiveis?.length} disponível${carrosDisponiveis?.length > 1 ? "s" : ""}`
                              : "0 disponível"}
                        </span>
                        <span className="sm:hidden">
                           {carrosDisponiveis?.length}
                        </span>
                     </Badge>
                  </button>
               </div>

               <div className="space-y-4">
                  <div className="flex flex-col md:flex-row gap-4 items-start md:items-center">
                     <label className="font-medium min-w-[120px]">
                        Buscar por:
                     </label>
                     <select
                        value={criterioCarro}
                        onChange={(e) => {
                           setCriterioCarro(e.target.value);
                           setCarroInput("");
                           setSelectedCarro(null);
                           setCarroError(false);
                           setCarroStatusError("");
                        }}
                        className="border border-bee-dark-300 dark:border-bee-dark-400 rounded px-3 py-2 bg-white dark:bg-bee-dark-800 w-full md:w-40"
                     >
                        <option value="plate">Placa</option>
                        <option value="renavam">RENAVAM</option>
                        <option value="chassi">Chassi</option>
                     </select>

                     <div className="relative w-full">
                        <InputText
                           type="text"
                           value={carroInput}
                           onChange={(e) => {
                              setCarroInput(e.target.value);
                              setSelectedCarro(null);
                              setCarroError(false);
                              setCarroStatusError("");
                           }}
                           placeholder={`Digite ${
                              criterioCarro === "plate"
                                 ? "a placa"
                                 : criterioCarro === "renavam"
                                   ? "o RENAVAM"
                                   : "o chassi"
                           }`}
                           className={`${carroError || carroStatusError ? "border-red-500" : ""} w-full`}
                        />
                        {carroInput &&
                           !selectedCarro &&
                           carrosFiltrados?.length > 0 && (
                              <ul className="absolute z-20 top-full left-0 right-0 bg-bee-dark-100 dark:bg-bee-dark-800 border border-bee-dark-300 dark:border-bee-dark-400 rounded shadow mt-1 max-h-48 overflow-auto">
                                 {carrosFiltrados.map((c) => (
                                    <li
                                       key={c.id}
                                       onClick={() => selecionarCarro(c)}
                                       className={`px-4 py-2 cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-700 ${
                                          c.status !== "AVAILABLE"
                                             ? "text-gray-400"
                                             : ""
                                       }`}
                                    >
                                       {criterioCarro === "plate"
                                          ? c.plate
                                          : criterioCarro === "renavam"
                                            ? c.renavam
                                            : c.chassis}
                                       {c.status !== "AVAILABLE" &&
                                          " (Indisponível)"}
                                    </li>
                                 ))}
                              </ul>
                           )}
                     </div>
                  </div>

                  {carroError && (
                     <div className="bg-red-100 dark:bg-red-900/30 border border-red-200 dark:border-red-800 rounded p-3">
                        <p className="text-red-600 dark:text-red-300">
                           Veículo não encontrado.{" "}
                           <Link
                              href="cars/create"
                              className="text-bee-purple-500 font-medium"
                           >
                              Cadastrar novo veículo
                           </Link>
                        </p>
                     </div>
                  )}

                  {carroStatusError && (
                     <div className="bg-red-100 dark:bg-red-900/30 border border-red-200 dark:border-red-800 rounded p-3">
                        <p className="text-red-600 dark:text-red-300">
                           {carroStatusError}
                        </p>
                     </div>
                  )}
               </div>
            </div>

            {/* Seção Confirmação */}
            <div className="bg-bee-dark-100 dark:bg-gray-800 rounded-lg p-6">
               <div
                  className="flex items-center justify-between cursor-pointer"
                  onClick={toggleInfoSection}
               >
                  <div className="flex items-center gap-3">
                     <Icon name="evento" className="size-6 " />
                     <h2 className="text-xl font-bold">Resumo da Saída</h2>
                  </div>
                  <Icon
                     name={!showInfo ? "prabaixo" : "pracima"}
                     className="size-6"
                     strokeWidth={2}
                  />
               </div>

               {showInfo && (
                  <div className="mt-2">
                     <div className="p-4 rounded-lg">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                           <div>
                              <h4 className="font-medium mb-2">Motorista</h4>
                              {selectedMotorista ? (
                                 <div className="space-y-1">
                                    <p>{selectedMotorista.name}</p>
                                    <p className="text-sm text-gray-600 dark:text-gray-400">
                                       {selectedMotorista.phone}
                                    </p>
                                    <p className="text-sm text-gray-600 dark:text-gray-400">
                                       CNH: {selectedMotorista.license}
                                    </p>
                                 </div>
                              ) : (
                                 <p className="text-gray-500">
                                    Nenhum motorista selecionado
                                 </p>
                              )}
                           </div>

                           <div>
                              <h4 className="font-medium mb-2">Veículo</h4>
                              {selectedCarro ? (
                                 <div className="space-y-1">
                                    <p>{selectedCarro.plate}</p>
                                    <p className="text-sm text-gray-600 dark:text-gray-400">
                                       {selectedCarro.brand}{" "}
                                       {selectedCarro.model}{" "}
                                    </p>
                                    <p className="text-sm text-gray-600 dark:text-gray-400">
                                       RENAVAN: {selectedCarro.renavam}
                                    </p>
                                 </div>
                              ) : (
                                 <p className="text-gray-500">
                                    Nenhum veículo selecionado
                                 </p>
                              )}
                           </div>
                        </div>
                     </div>
                  </div>
               )}
            </div>

            {/* Botões */}
            <div className="mt-6 pt-6 border-t-2 border-bee-dark-300 dark:border-bee-dark-400 flex justify-end gap-3">
               <Btn
                  type="button"
                  texto="Cancelar"
                  variant="cancel"
                  onClick={() => router.back()}
               />
               <Btn
                  type="submit"
                  texto={carregando ? "Processando..." : "Confirmar Saída"}
                  disabled={!selectedCarro || !selectedMotorista || carregando}
               />
            </div>

            {/* Modais de seleção */}
            <EventList
               open={openMotoristaList}
               onClose={() => setOpenMotoristaList(false)}
               tipo="motoristas"
               onSelect={selecionarMotorista}
            />
            <EventList
               open={openCarroList}
               onClose={() => setOpenCarroList(false)}
               tipo="carros"
               onSelect={selecionarCarro}
            />
         </form>
      </div>
   );
}
