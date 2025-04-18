"use client";
import { useParams, useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import withAuth from "@/utils/withAuth";
import useCar from "@/hooks/useCar";
import Image from "next/image";
import Icon from "@/elements/Icon";
import Btn from "@/elements/btn";
import InputText from "@/elements/inputText";
import FormSkeleton from "@/elements/ui/skeleton/FormSkeleton ";

function EditCars() {
   const { id } = useParams();
   const router = useRouter();
   const { carro, carregando, erro, updateCar } = useCar();
   const [formData, setFormData] = useState({
      plate: "",
      model: "",
      year: "",
      color: "",
      odometer: "",
      image: null,
   });
   useEffect(() => {
      const car = carro.find((car) => car.id === id);
      if (car) {
         setFormData({
            plate: car.plate || "",
            model: car.model || "",
            year: car.year || "",
            color: car.color || "",
            odometer: car.odometer || "",
            image: car.image || null,
         });
      }
   }, [carro, id]);
   console.log("FormData", formData);

   return (
      <div className="w-full">
         {erro && <div className="text-red-500">{erro}</div>}
         {carregando ? (
            <FormSkeleton />
         ) : (
            <>
         <h2 className="text-3xl font-bold mb-6 text-dark dark:text-white">
            Editar Veículo
         </h2>
         <div className="flex flex-col-reverse md:flex-row justify-between w-full">
            <form
               onSubmit={(e) => {
                  e.preventDefault();
                  if (
                     formData.model &&
                     formData.plate &&
                     formData.color &&
                     formData.year &&
                     formData.odometer
                  ) {
                     updateCar(id, formData);
                  } else {
                     console.error("Campos obrigatórios não preenchidos");
                  }
               }}
               className="space-y-6 md:w-3/4"
            >
               <div>
                  <label
                     htmlFor="plate"
                     className="block text-sm font-medium mb-2"
                  >
                     Placa
                  </label>
                  <InputText
                     name="plate"
                     type="text"
                     value={formData.plate}
                     onChange={(e) =>
                        setFormData((prev) => ({
                           ...prev,
                           plate: e.target.value,
                        }))
                     }
                     autoComplete="plate"
                     required
                  />
               </div>

               <div>
                  <label
                     htmlFor="model"
                     className="block text-sm font-medium mb-2"
                  >
                     Modelo
                  </label>
                  <InputText
                     name="model"
                     type="text"
                     autoComplete="model"
                     value={formData.model}
                     onChange={(e) =>
                        setFormData((prev) => ({
                           ...prev,
                           model: e.target.value,
                        }))
                     }
                     required
                  />
               </div>

               <div>
                  <label
                     htmlFor="year"
                     className="block text-sm font-medium mb-2"
                  >
                     Ano
                  </label>
                  <InputText
                     name="year"
                     type="number"
                     value={formData.year}
                     onChange={(e) =>
                        setFormData((prev) => ({
                           ...prev,
                           year: e.target.value,
                        }))
                     }
                     required
                  />
               </div>

               <div>
                  <label
                     htmlFor="color"
                     className="block text-sm font-medium mb-2"
                  >
                     Cor
                  </label>
                  <InputText
                     name="color"
                     type="text"
                     value={formData.color}
                     onChange={(e) =>
                        setFormData((prev) => ({
                           ...prev,
                           color: e.target.value,
                        }))
                     }
                     required
                  />
               </div>

               <div>
                  <label
                     htmlFor="odometer"
                     className="block text-sm font-medium mb-2"
                  >
                     Odômetro
                  </label>
                  <InputText
                     name="odometer"
                     type="number"
                     value={formData.odometer}
                     onChange={(e) =>
                        setFormData((prev) => ({
                           ...prev,
                           odometer: e.target.value,
                        }))
                     }
                     required
                     autoComplete="odometer"
                  />
               </div>

               <div>
                  <label
                     htmlFor="image"
                     className="block text-sm font-medium mb-2"
                  >
                     Atualizar Foto
                  </label>
                  <InputText
                     type="file"
                     name="image"
                     accept="image/*"
                     onChange={(e) => {
                        const file = e.target.files[0];
                        if (file) {
                           setFormData((prev) => ({
                              ...prev,
                              image: file,
                           }));
                        }
                     }}
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
                     ></Btn>
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
            <div className="hidden md:flex sticky mb-6 md:mb-0 md:flex-col md:w-1/5 h-fit border font-bold bg-bee-dark-100 border-bee-dark-300 dark:bg-gray-800 dark:border-gray-500 p-4 rounded-lg">
               <div className="flex justify-center items-center md:mb-4 bg-bee-purple-200 rounded-md p-3">
                  {formData.image != "null" ? (
                     typeof formData.image === "string" ? (
                        <Image
                           src={formData.image}
                           alt="Imagem do carro"
                           width={128}
                           height={128}
                           className="w-32 h-32 rounded-full object-cover"
                        />
                     ) : (
                        <Image
                           src={formData.image}
                           alt="Nova imagem do carro"
                           width={128}
                           height={128}
                           className="w-32 h-32 rounded-full object-cover"
                        />
                     )
                  ) : (
                     <Icon name="truck" className="size-32 text-white" />
                  )}
               </div>
               <div className="pl-3 gap-3 flex flex-col">
                  <h1>Modelo: {formData.model}</h1>
                  <p>Placa: {formData.plate}</p>
                  <p>Cor: {formData.color}</p>
                  <p>Ano: {formData.year}</p>
                  <p>Odômetro: {formData.odometer}</p>
               </div>
            </div>
         </div>
         </>
         )}
      </div>
   );
}

export default withAuth(EditCars);
