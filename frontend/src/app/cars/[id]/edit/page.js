"use client";
import { useParams, useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import withAuth from "@/utils/withAuth";
import useCar from "@/hooks/useCar";
import Btn from "@/elements/btn";
import InputText from "@/elements/inputText";
import FormSkeleton from "@/elements/ui/skeleton/FormSkeleton";
import { useToast } from "@/utils/ToastContext";
import Icon from "@/elements/Icon";
import { motion } from "framer-motion";

function EditCarsModal() {
   const { id } = useParams();
   const router = useRouter();
   const { carro, carregando, updateCar } = useCar();
   const { showToast } = useToast();
   const [errors, setErrors] = useState({});
   const [show, setShow] = useState(false);
   const [formData, setFormData] = useState({
      plate: "",
      model: "",
      year: "",
      color: "",
      odometer: "",
      renavam: "",
      brand: "",
      image: null,
   });

   const valideImageType = [
      "image/jpeg",
      "image/png",
      "image/gif",
      "image/jpg",
   ];

   useEffect(() => {
      setTimeout(() => setShow(true), 10);
   }, []);

   useEffect(() => {
      const handleKeyDown = (e) => {
         if (e.key === "Escape") {
            setShow(false);
            router.push("/cars");
         }
      };
      window.addEventListener("keydown", handleKeyDown);
      return () => window.removeEventListener("keydown", handleKeyDown);
   }, [router]);

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
            brand: car.brand || "",
            image: null,
         });
      }
   }, [carro, id]);

   const handleSubmit = async (e) => {
      e.preventDefault();
      const newErrors = {};

      if (!formData.plate) newErrors.plate = "Campo obrigatório";
      if (!formData.brand) newErrors.brand = "Campo obrigatório";
      if (!formData.model) newErrors.model = "Campo obrigatório";
      if (!formData.year) newErrors.year = "Campo obrigatório";
      if (!formData.odometer) newErrors.odometer = "Campo obrigatório";
      if (!formData.renavam) newErrors.renavam = "Campo obrigatório";
      if (!formData.color) newErrors.color = "Campo obrigatório";

      if (
         formData.plate &&
         !/^([A-Z]{3}[0-9]{4}|[A-Z]{3}[0-9][A-Z][0-9]{2})$/.test(formData.plate)
      ) {
         newErrors.plate =
            "Placa inválida (formatos aceitos: ABC1234 ou ABC1D23)";
      }

      if (formData.year && Number(formData.year) < 1900) {
         newErrors.year = "Ano inválido, apenas maior que 1900";
      }

      if (formData.renavam && !/^\d{11}$/.test(formData.renavam)) {
         newErrors.renavam = "Renavam deve conter exatamente 11 dígitos";
      }

      if (
         formData.image instanceof File &&
         !valideImageType.includes(formData.image.type)
      ) {
         newErrors.image =
            "Formato da imagem não aceito. Apenas png, jpeg, jpg e gif";
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
         value: formData.plate,
         setValue: (value) =>
            setFormData((prev) => ({ ...prev, plate: value.toUpperCase() })),
         error: errors.plate,
         placeholder: "Ex: ABC1234",
         type: "text",
      },
      {
         label: "Marca",
         id: "brand",
         value: formData.brand,
         setValue: (value) =>
            setFormData((prev) => ({ ...prev, brand: value })),
         error: errors.brand,
         placeholder: "Ex: Toyota",
         type: "text",
      },
      {
         label: "Modelo",
         id: "model",
         value: formData.model,
         setValue: (value) =>
            setFormData((prev) => ({ ...prev, model: value })),
         error: errors.model,
         placeholder: "Ex: Corolla",
         type: "text",
      },
      {
         label: "Ano",
         id: "year",
         value: formData.year,
         setValue: (value) => setFormData((prev) => ({ ...prev, year: value })),
         error: errors.year,
         placeholder: "Ex: 2023",
         type: "number",
      },
      {
         label: "Renavam",
         id: "renavam",
         value: formData.renavam,
         setValue: (value) =>
            setFormData((prev) => ({ ...prev, renavam: value })),
         error: errors.renavam,
         placeholder: "Ex: 82754432011",
         type: "number",
      },
      {
         label: "Cor",
         id: "color",
         value: formData.color,
         setValue: (value) =>
            setFormData((prev) => ({ ...prev, color: value })),
         error: errors.color,
         placeholder: "Ex: Preto",
         type: "text",
      },
      {
         label: "Hodômetro",
         id: "odometer",
         value: formData.odometer,
         setValue: (value) =>
            setFormData((prev) => ({ ...prev, odometer: value })),
         error: errors.odometer,
         placeholder: "Ex: 50000",
         type: "number",
      },
   ];

   return (
      <div className="fixed inset-0 z-50 flex items-center justify-center backdrop-blur-md p-2">
         <div className="bg-white dark:bg-bee-dark-800 p-6 rounded-2xl border border-bee-dark-300 dark:border-bee-dark-400 shadow-lg w-full max-w-2xl max-h-[90vh] flex flex-col">
            <div className="flex items-center gap-3 mb-6 sticky top-0 z-10 bg-white dark:bg-bee-dark-800 pb-4 border-b border-bee-dark-300 dark:border-bee-dark-400">
               <h2 className="text-2xl font-bold">Editar Veículo</h2>
               <motion.button
                  whileHover={{ scale: 1.1, rotate: 90 }}
                  whileTap={{ scale: 0.9 }}
                  onClick={() => router.back()}
                  className="ml-auto text-gray-400 hover:text-gray-700 dark:hover:text-white text-2xl font-bold focus:outline-none"
                  aria-label="Fechar"
                  type="button"
               >
                  <Icon name="xMark" className="size-5" strokeWidth={5} />
               </motion.button>
            </div>

            <div className=" overflow-y-auto flex-1">
               {carregando && <FormSkeleton />}
               {!carregando && (
                  <form onSubmit={handleSubmit} className="space-y-4">
                     <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {formList.map(
                           ({
                              label,
                              id,
                              value,
                              setValue,
                              error,
                              placeholder,
                              type,
                           }) => (
                              <div key={id} className="space-y-1">
                                 <label
                                    htmlFor={id}
                                    className="block text-sm font-medium text-dark dark:text-white"
                                 >
                                    {label}
                                 </label>
                                 <InputText
                                    type={type}
                                    id={id}
                                    name={id}
                                    value={value}
                                    onChange={(e) => setValue(e.target.value)}
                                    placeholder={placeholder}
                                    required
                                    className={`w-full ${error ? "border-red-500 dark:border-red-500 border-2" : ""}`}
                                 />
                                 {error && (
                                    <p className="text-red-500 text-xs">
                                       {error}
                                    </p>
                                 )}
                              </div>
                           )
                        )}
                     </div>

                     <div className="space-y-1">
                        <label className="block text-sm font-medium">
                           Atualizar Foto do Veículo
                        </label>
                        <InputText
                           type="file"
                           variant="file"
                           name="photo"
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
                           className={`file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-medium file:bg-primary file:text-dark hover:file:bg-primary-dark w-full ${errors.image ? "border-red-500 dark:border-red-500 border-2" : ""}`}
                        />
                        {errors.image && (
                           <p className="text-red-500 text-xs">
                              {errors.image}
                           </p>
                        )}
                     </div>

                     <div className="flex justify-end gap-3 pt-4 border-t border-bee-dark-300 dark:border-bee-dark-400">
                        <Btn
                           type="button"
                           onClick={() => router.back()}
                           variant="cancel"
                           texto="Cancelar"
                        />
                        <Btn
                           type="submit"
                           variant="primary"
                           disabled={carregando}
                        >
                           {carregando ? (
                              <div className="flex items-center justify-center gap-2 min-w-34">
                                 <Icon
                                    name="circle"
                                    className="size-5 text-white"
                                 />
                              </div>
                           ) : (
                              "Salvar Alterações"
                           )}
                        </Btn>
                     </div>
                  </form>
               )}
            </div>
         </div>
      </div>
   );
}

export default withAuth(EditCarsModal);
