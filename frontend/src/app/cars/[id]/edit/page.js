"use client";
import { useParams, useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import withAuth from "@/utils/withAuth";
import useCar from "@/hooks/useCar";
import Btn from "@/elements/btn";
import InputText from "@/elements/inputText";
import FormSkeleton from "@/elements/ui/skeleton/FormSkeleton";
import { useToast } from "@/utils/ToastContext";

function EditCars() {
   const { id } = useParams();
   const router = useRouter();
   const { carro, carregando, updateCar } = useCar();
   const { showToast } = useToast();
   const [errors, setErrors] = useState({});

   const [formData, setFormData] = useState({
      plate: "",
      model: "",
      year: "",
      color: "",
      odometer: "",
      renavam: "",
      // chassis: "",
      brand: "",
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
            renavam: car.renavam || "",
            // chassis: car.chassis || "",
            brand: car.brand || "",
            image: null,
         });
      }
   }, [carro, id]);

   const handleSubmit = async (e) => {
      e.preventDefault();
      const newErrors = {};

      // Validações
      if (!formData.plate) newErrors.plate = "Campo obrigatório";
      if (!formData.brand) newErrors.brand = "Campo obrigatório";
      if (!formData.model) newErrors.model = "Campo obrigatório";
      if (!formData.year) newErrors.year = "Campo obrigatório";
      // if (!formData.chassis) newErrors.chassis = "Campo obrigatório";
      if (!formData.odometer) newErrors.odometer = "Campo obrigatório";
      if (!formData.renavam) newErrors.renavam = "Campo obrigatório";
      if (!formData.color) newErrors.color = "Campo obrigatório";
      if (formData.plate && !/^([A-Z]{3}[0-9]{4}|[A-Z]{3}[0-9][A-Z][0-9]{2})$/.test(formData.plate)) {
         newErrors.plate = "Placa inválida (formatos aceitos: ABC1234 ou ABC1D23)";
      }

      if (formData.year < 1900) {
         newErrors.year = "Ano inválido";
      }

      setErrors(newErrors);

      if (Object.keys(newErrors).length > 0) {
         showToast("Erro!", "error", "Corrija os erros no formulário.", 5000);
         return;
      }

      await updateCar(id, formData);
   };

   const formList = [
      {
         label: "Placa",
         id: "plate",
         placeholder: "Ex: ABC1234",
         type: "text",
         transform: (v) => v.toUpperCase(),
      },
      {
         label: "Marca",
         id: "brand",
         placeholder: "Ex: Toyota",
         type: "text",
      },
      {
         label: "Modelo",
         id: "model",
         placeholder: "Ex: Corolla",
         type: "text",
      },
      {
         label: "Ano",
         id: "year",
         placeholder: "Ex: 2023",
         type: "number",
      },
      {
         label: "Renavam",
         id: "renavam",
         placeholder: "Ex: 82754432011",
         type: "number",
      },
      // {
      //    label: "Chassi",
      //    id: "chassis",
      //    placeholder: "Ex: 9XbZ3DvWVvNSU1551",
      //    type: "text",
      // },
      {
         label: "Cor",
         id: "color",
         placeholder: "Ex: Preto",
         type: "text",
      },
      {
         label: "Odômetro",
         id: "odometer",
         placeholder: "Ex: 50000",
         type: "number",
      },
   ];

   return (
      <div className="w-full">
         {carregando && <FormSkeleton />}
         {!carregando && (
            <>
               <h2 className="text-3xl font-bold mb-6 text-dark dark:text-white">
                  Editar Veículo
               </h2>
               <div className="flex flex-col-reverse md:flex-row justify-between gap-10 w-full">
                  <form onSubmit={handleSubmit} className="space-y-6 w-full">
                     {formList.map(
                        ({
                           label,
                           id,
                           placeholder,
                           type,
                           transform,
                        }) => (
                           <div key={id}>
                              <label
                                 htmlFor={id}
                                 className="block text-sm font-medium text-dark dark:text-white mb-2"
                              >
                                 {label}
                              </label>
                              <InputText
                                 type={type}
                                 id={id}
                                 name={id}
                                 value={formData[id]}
                                 onChange={(e) =>
                                    setFormData((prev) => ({
                                       ...prev,
                                       [id]: transform
                                          ? transform(e.target.value)
                                          : e.target.value,
                                    }))
                                 }
                                 placeholder={placeholder}
                                 required
                                 className={
                                    errors[id]
                                       ? "border-red-500 dark:border-red-500 border-2"
                                       : ""
                                 }
                              />
                              {errors[id] && (
                                 <p className="text-red-500 text-sm font-bold">
                                    {errors[id]}
                                 </p>
                              )}
                           </div>
                        )
                     )}

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
                           variant="file"
                           onChange={(e) => {
                              const file = e.target.files[0];
                              if (file) {
                                 setFormData((prev) => ({
                                    ...prev,
                                    image: file,
                                 }));
                              }
                           }}
                        />
                     </div>

                     <div className="flex gap-4">
                        <Btn
                           type="button"
                           onClick={() => router.back()}
                           texto="Cancelar"
                           className="flex-[1] border border-red-400 bg-red-400 hover:bg-red-500"
                        />
                        <Btn
                           type="submit"
                           variant="primary"
                           disabled={carregando}
                           className="flex-[2] py-3 px-4 text-lg"
                        >
                           {carregando ? "Salvando..." : "Salvar Alterações"}
                        </Btn>
                     </div>
                  </form>

                  {/* <div className="hidden sticky md:flex md:flex-col min-w-65 h-fit border font-bold bg-bee-dark-100 border-bee-dark-300 dark:bg-gray-800 dark:border-gray-500 p-4 rounded-lg">
                     <div className="flex justify-center items-center md:mb-4 bg-bee-purple-200 rounded-md p-3">
                        {formData.image ? (
                           typeof formData.image === "string" ? (
                              <Image
                                 src={formData.image}
                                 alt="Imagem do carro"
                                 width={128}
                                 height={128}
                                 unoptimized
                                 className="w-32 h-32 rounded-full object-cover"
                              />
                           ) : (
                              <Image
                                 src={URL.createObjectURL(formData.image)}
                                 alt="Imagem do carro"
                                 width={128}
                                 height={128}
                                 unoptimized
                                 className="w-32 h-32 rounded-full object-cover"
                              />
                           )
                        ) : (
                           <Icon name="car" className="size-32 text-white" />
                        )}
                     </div>
                     <div className="pl-3 gap-3 flex flex-col">
                        <h1>Modelo: {formData.model}</h1>
                        <p>Placa: {formData.plate}</p>
                        <p>Cor: {formData.color}</p>
                        <p>Ano: {formData.year}</p>
                        <p>Odômetro: {formData.odometer}</p>
                     </div>
                  </div> */}
               </div>
            </>
         )}
      </div>
   );
}

export default withAuth(EditCars);