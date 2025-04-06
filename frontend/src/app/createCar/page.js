"use client";
import { useState } from "react";
import Btn from "@/elements/btn";

function CreateCar() {
   const [plate, setPlate] = useState("");
   const [model, setModel] = useState("");
   const [year, setYear] = useState("");
   const [color, setColor] = useState("");
   const [odometer, setOdometer] = useState("");
   const [status, setStatus] = useState("AVAILABLE");

   const handleSubmit = (e) => {
      e.preventDefault();
      console.log({ plate, model, year, color, odometer, status });

   };

   return (
      <div className="min-h-screen py-10 px-4 ">
         <div className="max-w-3xl mx-auto p-8 rounded-lg shadow-md ">
            <h2 className="text-3xl font-bold mb-6 text-white">Cadastro de Veículo</h2>
            <form onSubmit={handleSubmit} className="space-y-6">
               <div>
                  <label
                     htmlFor="plate"
                     className="block text-sm font-medium text-white"
                  >
                     Placa
                  </label>
                  <input
                     type="text"
                     id="plate"
                     name="plate"
                     value={plate}
                     onChange={(e) => setPlate(e.target.value)}
                     placeholder="Ex: ABC-1234"
                     required
                     className="mt-1 block w-full p-3 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                  />
               </div>
               <div>
                  <label
                     htmlFor="model"
                     className="block text-sm font-medium text-white"
                  >
                     Modelo
                  </label>
                  <input
                     type="text"
                     id="model"
                     name="model"
                     value={model}
                     onChange={(e) => setModel(e.target.value)}
                     placeholder="Ex: Toyota Corolla"
                     required
                     className="mt-1 block w-full p-3 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                  />
               </div>
               <div>
                  <label
                     htmlFor="year"
                     className="block text-sm font-medium text-white"
                  >
                     Ano
                  </label>
                  <input
                     type="number"
                     id="year"
                     name="year"
                     value={year}
                     onChange={(e) => setYear(e.target.value)}
                     placeholder="Ex: 2023"
                     required
                     className="mt-1 block w-full p-3 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                  />
               </div>
               <div>
                  <label
                     htmlFor="color"
                     className="block text-sm font-medium text-white"
                  >
                     Cor
                  </label>
                  <input
                     type="text"
                     id="color"
                     name="color"
                     value={color}
                     onChange={(e) => setColor(e.target.value)}
                     placeholder="Ex: Preto"
                     required
                     className="mt-1 block w-full p-3 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                  />
               </div>
               <div>
                  <label
                     htmlFor="odometer"
                     className="block text-sm font-medium text-white"
                  >
                     Odômetro
                  </label>
                  <input
                     type="number"
                     id="odometer"
                     name="odometer"
                     value={odometer}
                     onChange={(e) => setOdometer(e.target.value)}
                     placeholder="Ex: 50000"
                     required
                     className="mt-1 block w-full p-3 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                  />
               </div>
               <Btn
                  type="submit"
                  texto="Cadastrar Veículo"
                  variant="primary"
                  className="w-full py-3 px-4 text-lg"
               />
            </form>
         </div>
      </div>
   );
}

export default CreateCar;
