"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import withAuth from "@/utils/withAuth";
import Btn from "@/elements/btn";
import useCar from "@/hooks/useCar";
import InputText from "@/elements/inputText";
import FormSkeleton from "@/elements/ui/skeleton/FormSkeleton";

function CreateCars() {
   const { createCar, carregando, erro } = useCar();
   const router = useRouter();

   const [plate, setPlate] = useState("");
   const [model, setModel] = useState("");
   const [year, setYear] = useState("");
   const [color, setColor] = useState("");
   const [odometer, setOdometer] = useState("");

   const handleSubmit = async (e) => {
      e.preventDefault();
      await createCar(plate, model, year, color, odometer);
      console.log({ plate, model, year, color, odometer });
   };

   return (
      <div>
         {carregando && <FormSkeleton />}
         {erro && (
            <div>
               <h1 className="text-bee-alert-300 mb-5"> Erro: {erro} </h1>
               <FormSkeleton />
            </div>
         )}
         {!carregando && !erro && (
            <div className="max-w-3xl mx-auto">
               <h2 className="text-3xl font-bold mb-6 text-dark dark:text-white">
                  Cadastro de Veículo
               </h2>
               <form onSubmit={handleSubmit} className="space-y-6">
                  <div>
                     <label
                        htmlFor="plate"
                        className="block text-sm font-medium text-dark dark:text-white mb-2"
                     >
                        Placa
                     </label>
                     <InputText
                        type="text"
                        id="plate"
                        name="plate"
                        value={plate}
                        onChange={(e) => setPlate(e.target.value)}
                        placeholder="Ex: ABC-1234"
                        required
                     />
                  </div>

                  <div>
                     <label
                        htmlFor="model"
                        className="block text-sm font-medium text-dark dark:text-white mb-2"
                     >
                        Modelo
                     </label>
                     <InputText
                        type="text"
                        id="model"
                        name="model"
                        value={model}
                        onChange={(e) => setModel(e.target.value)}
                        placeholder="Ex: Toyota Corolla"
                        required
                     />
                  </div>

                  <div>
                     <label
                        htmlFor="year"
                        className="block text-sm font-medium text-dark dark:text-white mb-2"
                     >
                        Ano
                     </label>
                     <InputText
                        type="number"
                        id="year"
                        name="year"
                        value={year}
                        onChange={(e) => setYear(e.target.value)}
                        placeholder="Ex: 2023"
                        required
                     />
                  </div>

                  <div>
                     <label
                        htmlFor="color"
                        className="block text-sm font-medium text-dark dark:text-white mb-2"
                     >
                        Cor
                     </label>
                     <InputText
                        type="text"
                        id="color"
                        name="color"
                        value={color}
                        onChange={(e) => setColor(e.target.value)}
                        placeholder="Ex: Preto"
                        required
                     />
                  </div>

                  <div>
                     <label
                        htmlFor="odometer"
                        className="block text-sm font-medium text-dark dark:text-white mb-2"
                     >
                        Odômetro
                     </label>
                     <InputText
                        type="number"
                        id="odometer"
                        name="odometer"
                        value={odometer}
                        onChange={(e) => setOdometer(e.target.value)}
                        placeholder="Ex: 50000"
                        required
                     />
                  </div>

                  <div className="flex gap-4">
                     <div className="w-full flex gap-4">
                        <button
                           type="button"
                           onClick={() => router.back()}
                           className="flex-[1] py-3 px-4 text-lg border border-red-400 bg-red-400 hover:bg-red-500 text-white rounded-lg transition-colors"
                        >
                           Cancelar
                        </button>
                        <Btn
                           type="submit"
                           variant="primary"
                           disabled={carregando}
                           className="flex-[2] py-3 px-4 text-lg"
                        >
                           {carregando ? "Cadastrando..." : "Cadastrar Veículo"}
                        </Btn>
                     </div>
                  </div>
               </form>
            </div>
         )}
      </div>
   );
}

export default withAuth(CreateCars);
