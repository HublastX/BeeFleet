"use cliente";
import Icon from "@/elements/Icon";
import InputText from "@/elements/inputText";
import useCar from "@/hooks/useCar";
import useDrivers from "@/hooks/useDrivers";
import { useState } from "react";

export default function Saida() {
   const { motoristas } = useDrivers();
   const { carro } = useCar();

   const [motoristaInput, setMotoristaInput] = useState("");
   const [telefoneInput, setTelefoneInput] = useState("");
   const [selectedMotorista, setSelectedMotorista] = useState(null);

   const [carroInput, setCarroInput] = useState("");

   const motoristasFiltrados = motoristas?.filter(
      (m) =>
         m.name.toLowerCase().includes(motoristaInput.toLowerCase()) ||
         m.phone.includes(motoristaInput)
   );

   const telefonesFiltrados = motoristas?.filter(
      (m) =>
         m.phone.includes(telefoneInput) ||
         m.name.toLowerCase().includes(telefoneInput.toLowerCase())
   );

   const [carroModelInput, setCarroModelInput] = useState("");
   const [carroPlacaInput, setCarroPlacaInput] = useState("");
   const [selectedCarro, setSelectedCarro] = useState(null);

   const carrosFiltradosPorModelo = carro?.filter(
      (c) =>
         c.model.toLowerCase().includes(carroModelInput.toLowerCase()) ||
         c.plate.toLowerCase().includes(carroModelInput.toLowerCase())
   );

   const carrosFiltradosPorPlaca = carro?.filter(
      (c) =>
         c.plate.toLowerCase().includes(carroPlacaInput.toLowerCase()) ||
         c.model.toLowerCase().includes(carroPlacaInput.toLowerCase())
   );

   const selecionarCarro = (c) => {
      setSelectedCarro(c);
      setCarroModelInput(c.model);
      setCarroPlacaInput(c.plate);
   };

   const selecionarMotorista = (m) => {
      setSelectedMotorista(m);
      setMotoristaInput(m.name);
      setTelefoneInput(m.phone);
   };

   return (
      <form className="space-y-8 mt-6">
         <div className="grid md:grid-cols-2 gap-12 relative">
            {/* Motorista */}
            <div className="relative">
               <h2 className="text-2xl font-bold mb-2 flex gap-2">
                  <Icon name="user" className="size-6" /> Motorista
               </h2>
               <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
                  Você pode pesquisar pelo nome ou telefone
               </p>

               <label className="block mb-1 font-medium">Nome</label>
               <InputText
                  type="text"
                  value={motoristaInput}
                  onChange={(e) => {
                     setMotoristaInput(e.target.value);
                     setSelectedMotorista(null);
                  }}
                  placeholder="Digite o nome do motorista"
               />
               {motoristaInput && !selectedMotorista && (
                  <ul className="absolute z-20 bg-bee-dark-100 dark:bg-bee-dark-800 border border-bee-dark-300 dark:border-bee-dark-400 rounded w-full shadow mt-1 max-h-48 overflow-auto">
                     {motoristasFiltrados.map((m) => (
                        <li
                           key={m.id}
                           onClick={() => selecionarMotorista(m)}
                           className="px-4 py-2 cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-700"
                        >
                           {m.name}
                        </li>
                     ))}
                  </ul>
               )}

               <label className="block mt-6 mb-1 font-medium">Telefone</label>
               <InputText
                  type="text"
                  value={telefoneInput}
                  onChange={(e) => {
                     setTelefoneInput(e.target.value);
                     setSelectedMotorista(null);
                  }}
                  placeholder="Digite o telefone do motorista"
               />
               {telefoneInput && !selectedMotorista && (
                  <ul className="absolute z-20 bg-bee-dark-100 dark:bg-bee-dark-800 border border-bee-dark-300 dark:border-bee-dark-400 rounded w-full shadow mt-1 max-h-48 overflow-auto">
                     {telefonesFiltrados.map((m) => (
                        <li
                           key={m.id}
                           onClick={() => selecionarMotorista(m)}
                           className="px-4 py-2 cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-700"
                        >
                           {m.phone}
                        </li>
                     ))}
                  </ul>
               )}
            </div>

            {/* Carro */}
            <div className="relative">
               <h2 className="text-2xl font-bold mb-2 flex gap-2 ">
                  <Icon name="car" className="size-6" /> Carro
               </h2>
               <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
                  Você pode pesquisar pelo modelo ou placa
               </p>

               <label className="block mb-1 font-medium">Modelo</label>
               <InputText
                  type="text"
                  value={carroModelInput}
                  onChange={(e) => {
                     setCarroModelInput(e.target.value);
                     setSelectedCarro(null);
                  }}
                  placeholder="Digite o modelo do carro"
               />
               {carroModelInput && !selectedCarro && (
                  <ul className="absolute z-20 bg-bee-dark-100 dark:bg-bee-dark-800 border border-bee-dark-300 dark:border-bee-dark-400 rounded w-full shadow mt-1 max-h-48 overflow-auto">
                     {carrosFiltradosPorModelo.map((c) => (
                        <li
                           key={c.id}
                           onClick={() => selecionarCarro(c)}
                           className="px-4 py-2 cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-700"
                        >
                           {c.model}
                        </li>
                     ))}
                  </ul>
               )}

               <label className="block mt-6 mb-1 font-medium">Placa</label>
               <InputText
                  type="text"
                  value={carroPlacaInput}
                  onChange={(e) => {
                     setCarroPlacaInput(e.target.value);
                     setSelectedCarro(null);
                  }}
                  placeholder="Digite a placa do carro"
               />
               {carroPlacaInput && !selectedCarro && (
                  <ul className="absolute z-20 bg-bee-dark-100 dark:bg-bee-dark-800 border border-bee-dark-300 dark:border-bee-dark-400 rounded w-full shadow mt-1 max-h-48 overflow-auto">
                     {carrosFiltradosPorPlaca.map((c) => (
                        <li
                           key={c.id}
                           onClick={() => selecionarCarro(c)}
                           className="px-4 py-2 cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-700"
                        >
                           {c.plate}
                        </li>
                     ))}
                  </ul>
               )}
            </div>
         </div>
      </form>
   );
}
