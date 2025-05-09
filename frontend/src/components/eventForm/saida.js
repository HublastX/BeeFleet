"use client";
import Btn from "@/elements/btn";
import Icon from "@/elements/Icon";
import InputText from "@/elements/inputText";
import useCar from "@/hooks/useCar";
import useDrivers from "@/hooks/useDrivers";
import Link from "next/link";
import { useState, useEffect } from "react";

export default function Saida() {
   const { motoristas } = useDrivers();
   const { carro } = useCar();

   const [motoristaInput, setMotoristaInput] = useState("");
   const [selectedMotorista, setSelectedMotorista] = useState(null);
   const [criterioMotorista, setCriterioMotorista] = useState("name");
   const [motoristaError, setMotoristaError] = useState(false);
   const [motoristaStatusError, setMotoristaStatusError] = useState("");

   const [criterioCarro, setCriterioCarro] = useState("plate");
   const [carroInput, setCarroInput] = useState("");
   const [selectedCarro, setSelectedCarro] = useState(null);
   const [carroError, setCarroError] = useState(false);
   const [carroStatusError, setCarroStatusError] = useState("");

   const [showInfo, setShowInfo] = useState(false);

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

   const selecionarMotorista = (m) => {
      if (m.isAvailable != true) {
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
   };

   const selecionarCarro = (c) => {
      if (c.status !== "AVAILABLE") {
         setCarroStatusError("Este carro não está disponível no momento");
         setSelectedCarro(null);
         setCarroInput("");
      } else {
         setSelectedCarro(c);
         setCarroInput(c[criterioCarro]);
         setCarroError(false);
         setCarroStatusError("");
      }
   };

   const toggleInfoSection = () => {
      setShowInfo(!showInfo);
   };

   return (
      <form className="space-y-8 mt-6">
         <div className="flex flex-col gap-10">
            {/* Motorista */}
            <div className="w-full relative">
               <h2 className="text-2xl font-bold flex gap-2">
                  <Icon name="user" className="size-6" /> Motorista
               </h2>
               <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
                  Você pode pesquisar pelo nome, telefone ou CNH
               </p>
               <div className="flex gap-3 w-full flex-wrap">
                  <label className="font-medium flex items-center">
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
                     className="border border-bee-dark-300 dark:border-bee-dark-400 rounded px-3 py-2 bg-white dark:bg-bee-dark-800 w-full md:w-fit"
                  >
                     <option value="name">Nome</option>
                     <option value="phone">Telefone</option>
                     <option value="license">CNH</option>
                  </select>
                  <div className="relative flex-1">
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
                        } do motorista`}
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
                                       m.status !== "AVAILABLE"
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
                  <p className="text-red-500 text-sm font-bold mt-2">
                     Esse motorista ainda não foi cadastrado. Deseja adicionar?{" "}
                     <Link
                        href="drivers/create"
                        className="text-bee-purple-500"
                     >
                        Adicione agora
                     </Link>
                  </p>
               )}
               {motoristaStatusError && (
                  <p className="text-red-500 text-sm font-bold mt-2">
                     {motoristaStatusError}
                  </p>
               )}
            </div>

            <hr className="border-bee-dark-300 dark:border-bee-dark-400" />

            {/* Carro */}
            <div className="w-full relative">
               <h2 className="text-2xl font-bold flex gap-2">
                  <Icon name="car" className="size-6" /> Carro
               </h2>
               <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
                  Você pode pesquisar por placa, RENAVAM ou chassi
               </p>
               <div className="flex gap-3 w-full flex-wrap">
                  <label className="font-medium flex items-center">
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
                     className="border border-bee-dark-300 dark:border-bee-dark-400 rounded px-3 py-2 bg-white dark:bg-bee-dark-800 w-full md:w-fit"
                  >
                     <option value="plate">Placa</option>
                     <option value="renavam">RENAVAM</option>
                     <option value="chassi">Chassi</option>
                  </select>
                  <div className="relative flex-1">
                     <InputText
                        type="text"
                        value={carroInput}
                        onChange={(e) => {
                           setCarroInput(e.target.value);
                           setSelectedCarro(null);
                           setCarroError(false);
                           setCarroStatusError("");
                        }}
                        placeholder={`Digite a ${
                           criterioCarro === "plate"
                              ? "placa"
                              : criterioCarro === "renavam"
                                ? "RENAVAM"
                                : "chassi"
                        } do carro`}
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
                  <p className="text-red-500 text-sm font-bold mt-2">
                     Esse carro ainda não foi cadastrado. Deseja adicionar?{" "}
                     <Link href="cars/create" className="text-bee-purple-500">
                        Adicione agora
                     </Link>
                  </p>
               )}
               {carroStatusError && (
                  <p className="text-red-500 text-sm font-bold mt-2">
                     {carroStatusError}
                  </p>
               )}
            </div>
         </div>

         <hr className="border-bee-dark-300 dark:border-bee-dark-400" />

         <div className="border border-bee-dark-300 dark:border-bee-dark-400 rounded-lg p-4">
            <div
               className="flex items-center justify-between cursor-pointer"
               onClick={toggleInfoSection}
            >
               <h1 className="text-xl font-bold">Conferir informações</h1>
               <Icon
                  name={!showInfo ? "prabaixo" : "pracima"}
                  className="size-6"
                  strokeWidth={2}
               />
            </div>

            {showInfo && (
               <div className="mt-4 space-y-4">
                  <div className="bg-bee-dark-100 dark:bg-bee-dark-800 p-4 rounded-lg">
                     <h2 className="text-lg font-semibold mb-2">Motorista</h2>
                     {selectedMotorista ? (
                        <>
                           <p>
                              <strong>Nome:</strong> {selectedMotorista.name}
                           </p>
                           <p>
                              <strong>Telefone:</strong>{" "}
                              {selectedMotorista.phone}
                           </p>
                           <p>
                              <strong>CNH:</strong> {selectedMotorista.license}
                           </p>
                        </>
                     ) : (
                        <p className="text-gray-500">
                           Nenhum motorista selecionado
                        </p>
                     )}
                  </div>

                  <div className="bg-bee-dark-100 dark:bg-bee-dark-800 p-4 rounded-lg">
                     <h2 className="text-lg font-semibold mb-2">Carro</h2>
                     {selectedCarro ? (
                        <>
                           <p>
                              <strong>Placa:</strong> {selectedCarro.plate}
                           </p>
                           <p>
                              <strong>RENAVAM:</strong>{" "}
                              {selectedCarro.renavam || "Não informado"}
                           </p>
                           <p>
                              <strong>Chassi:</strong>{" "}
                              {selectedCarro.chassis || "Não informado"}
                           </p>
                           <p>
                              <strong>Modelo:</strong>{" "}
                              {selectedCarro.model || "Não informado"}
                           </p>
                           <p>
                              <strong>Marca:</strong>{" "}
                              {selectedCarro.brand || "Não informado"}
                           </p>
                           <p>
                              <strong>Cor:</strong>{" "}
                              {selectedCarro.color || "Não informado"}
                           </p>
                        </>
                     ) : (
                        <p className="text-gray-500">
                           Nenhum carro selecionado
                        </p>
                     )}
                  </div>
               </div>
            )}
         </div>

         <hr className="border-bee-dark-300 dark:border-bee-dark-400" />

         <div className="flex gap-4">
            <Btn
               type="button"
               texto="Cancelar"
               onClick={() => router.back()}
               className="flex-[1] border border-red-400 bg-red-400 hover:bg-red-500"
            />
            <Btn texto="Aprovar Saida" className="flex-[2] py-3 px-4 text-lg" />
         </div>
      </form>
   );
}
