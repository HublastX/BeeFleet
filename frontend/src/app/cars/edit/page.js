"use client";
import { useState, useEffect } from "react";
import Btn from "@/elements/btn";
import useCar from "@/hooks/useCar";
import InputText from "@/elements/inputText";
import { useRouter } from "next/navigation";

function EditCars({ params }) {
   const { updateCar, getCar, carregando, erro } = useCar();
   const router = useRouter();

   const [plate, setPlate] = useState("");
   const [model, setModel] = useState("");
   const [year, setYear] = useState("");
   const [color, setColor] = useState("");
   const [odometer, setOdometer] = useState("");

   useEffect(() => {
      const loadCar = async () => {
         const car = await getCar(params.id);
         if (car) {
            setPlate(car.plate);
            setModel(car.model);
            setYear(car.year);
            setColor(car.color);
            setOdometer(car.odometer);
         }
      };
      loadCar();
   }, [params.id]);

   const handleSubmit = async (e) => {
      e.preventDefault();
      await updateCar(params.id, { plate, model, year, color, odometer });
      router.back();
   };

   return (
      <div>
         <div className="max-w-3xl mx-auto">
            <h2 className="text-3xl font-bold mb-6 text-dark dark:text-white">
               Editar Veículo
            </h2>
            <form onSubmit={handleSubmit} className="space-y-6">
               {erro && (
                  <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative">
                     {erro}
                  </div>
               )}

               <div>
                  <label htmlFor="plate" className="block text-sm font-medium text-dark dark:text-white mb-2">
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
                  <label htmlFor="model" className="block text-sm font-medium text-dark dark:text-white mb-2">
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
                  <label htmlFor="year" className="block text-sm font-medium text-dark dark:text-white mb-2">
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
                  <label htmlFor="color" className="block text-sm font-medium text-dark dark:text-white mb-2">
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
                  <label htmlFor="odometer" className="block text-sm font-medium text-dark dark:text-white mb-2">
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

               <div>
                  <label htmlFor="images" className="block text-sm font-medium text-dark dark:text-white mb-2">
                     Fotos
                  </label>
                  <InputText
                     type="file"
                     id="images"
                     name="images"
                     accept="image/*"
                     multiple
                     className="file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-medium file:bg-primary file:text-dark hover:file:bg-primary-dark"
                  />
               </div>

               <div className="flex gap-4">
                  <div className="w-full flex gap-4">
                     <Btn
                        type="button"
                        onClick={() => router.back()}
                        texto="Cancelar"
                        className="flex-[1] border border-red-400 bg-red-400 hover:bg-red-500"
                     >
                    </Btn>
                     <Btn
                        type="submit"
                        variant="primary"
                        disabled={carregando}
                        className="flex-[2] py-3 px-4 text-lg"
                     >
                        {carregando ? "Salvando..." : "Salvar Alterações"}
                     </Btn>
                  </div>
               </div>
            </form>
         </div>
      </div>
   );
}

export default EditCars;
