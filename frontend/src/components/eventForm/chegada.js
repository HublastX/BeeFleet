"use client";
import Btn from "@/elements/btn";
import Icon from "@/elements/Icon";
import InputText from "@/elements/inputText";
import useCar from "@/hooks/useCar";
import useDrivers from "@/hooks/useDrivers";
import useEvents from "@/hooks/useEvent";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import { useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function Chegada() {
   const { motoristas } = useDrivers();
   const { carro, updateCar } = useCar();
   const { createEvent, carregando, events } = useEvents();
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

   // Odometro state
   const [odometro, setOdometro] = useState("");
   const [odometroError, setOdometroError] = useState(false);
   const [showInfo, setShowInfo] = useState(false);

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

   const selecionarMotorista = useCallback(
      (m) => {
         if (m.isAvailable !== false) {
            setMotoristaStatusError(
               "Este motorista não está com um carro no momento"
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
         if (c.status !== "IN_USE") {
            setCarroStatusError(
               "Este carro não está com um motorista no momento"
            );
            setSelectedCarro(null);
            setCarroInput("");
         } else {
            setSelectedCarro(c);
            setCarroInput(c[criterioCarro]);
            setCarroError(false);
            setCarroStatusError("");
            setOdometro(c.odometer);
         }
      },
      [criterioCarro]
   );

   useEffect(() => {
      if (!motoristasFiltrados?.length && motoristaInput) {
         setMotoristaError(true);
      } else {
         setMotoristaError(false);
      }
   }, [motoristaInput, motoristasFiltrados]);

   useEffect(() => {
      if (!carrosFiltrados?.length && carroInput) {
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

   useEffect(() => {
      if (selectedCarro || selectedMotorista) {
         const eventoAtivo = events.find(
            (e) =>
               (selectedCarro &&
                  e.carId === selectedCarro.id &&
                  e.eventType === "CHECKOUT" &&
                  e.status === "ACTIVE") ||
               (selectedMotorista &&
                  e.driverId === selectedMotorista.id &&
                  e.eventType === "CHECKOUT" &&
                  e.status === "ACTIVE")
         );

         if (eventoAtivo) {
            if (selectedCarro && !selectedMotorista) {
               const motorista = motoristas.find(
                  (m) => m.id === eventoAtivo.driverId
               );
               if (motorista) selecionarMotorista(motorista);
            }

            if (selectedMotorista && !selectedCarro) {
               const carroEncontrado = carro.find(
                  (c) => c.id === eventoAtivo.carId
               );
               if (carroEncontrado) selecionarCarro(carroEncontrado);
            }
         }
      }
   }, [
      selectedCarro,
      selectedMotorista,
      events,
      motoristas,
      carro,
      selecionarCarro,
      selecionarMotorista,
   ]);

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

      if (Number(odometro) <= Number(selectedCarro.odometer)) {
         setOdometroError(true);
         return;
      }

      const checkoutEvent = events.find(
         (e) =>
            e.carId === selectedCarro.id &&
            e.driverId === selectedMotorista.id &&
            e.eventType === "CHECKOUT" &&
            e.status === "ACTIVE"
      );

      if (!checkoutEvent) {
         return;
      }

      try {
         await createEvent(
            selectedCarro.id,
            selectedMotorista.id,
            "RETURN",
            odometro,
            checkoutEvent.id
         );
      } catch (error) {
         console.error("Erro ao registrar chegada:", error);
      }
   };

   return (
      <motion.div
         initial={{ opacity: 0 }}
         animate={{ opacity: 1 }}
         className="max-w-4xl mx-auto p-4 overflow-y-auto max-h-[80vh]"
      >
         <form onSubmit={handleSubmit} className="space-y-6">
            {/* Seção Motorista */}
            <motion.div
               initial={{ opacity: 0, y: 20 }}
               animate={{ opacity: 1, y: 0 }}
               transition={{ delay: 0.1 }}
               className="p-6"
            >
               <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.2 }}
                  className="flex items-center gap-3 mb-4"
               >
                  <Icon name="user" className="size-6" />
                  <h2 className="text-xl font-bold">Motorista</h2>
               </motion.div>

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
                                          m.isAvailable !== false
                                             ? "text-gray-400"
                                             : ""
                                       }`}
                                    >
                                       {criterioMotorista === "name"
                                          ? m.name
                                          : criterioMotorista === "phone"
                                            ? m.phone
                                            : m.license}
                                       {m.isAvailable !== false &&
                                          " (Indisponível)"}
                                    </li>
                                 ))}
                              </ul>
                           )}
                     </div>
                  </div>

                  {motoristaError && (
                     <p className="text-red-600 dark:text-red-300">
                        Motorista não encontrado.{" "}
                        <Link
                           href="drivers/create"
                           className="text-bee-purple-500 font-medium"
                        >
                           Cadastrar novo motorista
                        </Link>
                     </p>
                  )}

                  {motoristaStatusError && (
                     <p className="text-red-600 dark:text-red-300">
                        {motoristaStatusError}
                     </p>
                  )}
               </div>
            </motion.div>

            {/* Seção Veículo */}
            <motion.div
               initial={{ opacity: 0, y: 20 }}
               animate={{ opacity: 1, y: 0 }}
               transition={{ delay: 0.3 }}
               className="p-6"
            >
               <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.4 }}
                  className="flex items-center gap-3 mb-4"
               >
                  <Icon name="car" className="size-6" />
                  <h2 className="text-xl font-bold">Veículo</h2>
               </motion.div>

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
                                          c.status !== "IN_USE"
                                             ? "text-gray-400"
                                             : ""
                                       }`}
                                    >
                                       {criterioCarro === "plate"
                                          ? c.plate
                                          : criterioCarro === "renavam"
                                            ? c.renavam
                                            : c.chassis}
                                       {c.status !== "IN_USE" &&
                                          " (Indisponível)"}
                                    </li>
                                 ))}
                              </ul>
                           )}
                     </div>
                  </div>

                  {carroError && (
                     <p className="text-red-600 dark:text-red-300">
                        Veículo não encontrado.{" "}
                        <Link
                           href="cars/create"
                           className="text-bee-purple-500 font-medium"
                        >
                           Cadastrar novo veículo
                        </Link>
                     </p>
                  )}

                  {carroStatusError && (
                     <p className="text-red-600 dark:text-red-300">
                        {carroStatusError}
                     </p>
                  )}

                  {/* Campo de oometro */}
                  <div className="flex flex-col md:flex-row gap-4 items-start md:items-center">
                     <label className="font-medium min-w-[100px]">
                        Hodômetro atualizado:
                     </label>
                     <div className="w-full">
                        <InputText
                           type="number"
                           value={odometro}
                           onChange={(e) => {
                              setOdometro(e.target.value);
                              setOdometroError(false);
                           }}
                           placeholder="Digite o valor atual do hodômetro"
                           required
                           className={`${odometroError ? "border-red-500" : ""} w-full`}
                        />
                        {odometroError && (
                           <p className="text-red-500 text-sm mt-2">
                              O hodômetro deve ser maior que o valor atual (
                              {selectedCarro?.odometer || 0})
                           </p>
                        )}
                        {selectedCarro && (
                           <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                              Valor anterior: {selectedCarro.odometer}
                           </p>
                        )}
                     </div>
                  </div>
               </div>
            </motion.div>

            {/* resumo */}
            <motion.div
               initial={{ opacity: 0, y: 20 }}
               animate={{ opacity: 1, y: 0 }}
               transition={{ delay: 0.5 }}
               className="bg-bee-dark-100 dark:bg-bee-dark-800 rounded-lg p-6 shadow"
            >
               <div
                  className="flex items-center justify-between cursor-pointer"
                  onClick={toggleInfoSection}
               >
                  <motion.div
                     initial={{ opacity: 0, x: -20 }}
                     animate={{ opacity: 1, x: 0 }}
                     transition={{ delay: 0.6 }}
                     className="flex items-center gap-3"
                  >
                     <Icon name="evento" className="size-6" />
                     <h2 className="text-xl font-bold">Resumo da Chegada</h2>
                  </motion.div>
                  <Icon
                     name={!showInfo ? "prabaixo" : "pracima"}
                     className="size-6"
                     strokeWidth={2}
                  />
               </div>

               <AnimatePresence>
                  {showInfo && (
                     <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: "auto" }}
                        exit={{ opacity: 0, height: 0 }}
                        className="mt-2"
                     >
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
                                          {selectedCarro.model}
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
                     </motion.div>
                  )}
               </AnimatePresence>
            </motion.div>

            {/* botao */}
            <div className="mt-6 pt-6 border-t-2 border-bee-dark-300 dark:border-bee-dark-400 flex justify-end gap-3">
               <Btn
                  type="button"
                  texto="Cancelar"
                  variant="cancel"
                  onClick={() => router.back()}
               />
               <Btn
                  type="submit"
                  texto={
                     carregando ? (
                        <div className="flex items-center justify-center gap-2 min-w-34">
                           <Icon name="circle" className="size-5 text-white" />
                        </div>
                     ) : (
                        "Confirmar Chegada"
                     )
                  }
                  disabled={
                     !selectedCarro ||
                     !selectedMotorista ||
                     !odometro ||
                     carregando ||
                     odometroError
                  }
               />
            </div>
         </form>
      </motion.div>
   );
}
