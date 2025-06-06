"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import withAuth from "@/utils/withAuth";
import Btn from "@/elements/btn";
import useCar from "@/hooks/useCar";
import InputText from "@/elements/inputText";
import FormSkeleton from "@/elements/ui/skeleton/FormSkeleton";
import { useToast } from "@/utils/ToastContext";
import Icon from "@/elements/Icon";
import { motion, AnimatePresence } from "framer-motion";

function CreateCarsModal() {
   const { createCar, carregando, erro } = useCar();
   const router = useRouter();
   const [errors, setErrors] = useState({});
   const { showToast } = useToast();
   const [show, setShow] = useState(false);

   const [plate, setPlate] = useState("");
   const [model, setModel] = useState("");
   const [year, setYear] = useState("");
   const [color, setColor] = useState("");
   const [odometer, setOdometer] = useState("");
   const [renavam, setRenavam] = useState("");
   const [chassis, setChassis] = useState("");
   const [brand, setBrand] = useState("");
   const [image, setImage] = useState(null);

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
            router.back();
         }
      };
      window.addEventListener("keydown", handleKeyDown);
      return () => window.removeEventListener("keydown", handleKeyDown);
   }, [router]);

   const formList = [
      {
         label: "Placa",
         id: "plate",
         value: plate,
         setValue: setPlate,
         error: errors.plate,
         placeholder: "Ex: ABC1234",
         type: "text",
         transform: (v) => v.toUpperCase(),
      },
      {
         label: "Marca",
         id: "brand",
         value: brand,
         setValue: setBrand,
         error: errors.brand,
         placeholder: "Ex: Toyota",
         type: "text",
      },
      {
         label: "Modelo",
         id: "model",
         value: model,
         setValue: setModel,
         error: errors.model,
         placeholder: "Ex: Corolla",
         type: "text",
      },
      {
         label: "Ano",
         id: "year",
         value: year,
         setValue: setYear,
         error: errors.year,
         placeholder: "Ex: 2023",
         type: "number",
      },
      {
         label: "Renavam",
         id: "renavam",
         value: renavam,
         setValue: setRenavam,
         error: errors.renavam,
         placeholder: "Ex: 82754432011",
         type: "number",
      },
      {
         label: "Chassi",
         id: "chassis",
         value: chassis,
         setValue: setChassis,
         error: errors.chassis,
         placeholder: "Ex: 9XbZ3DvWVvNSU1551",
         type: "text",
         transform: (v) => v.toUpperCase(),
      },
      {
         label: "Cor",
         id: "color",
         value: color,
         setValue: setColor,
         error: errors.color,
         placeholder: "Ex: Preto",
         type: "text",
      },
      {
         label: "Hodômetro",
         id: "odometer",
         value: odometer,
         setValue: setOdometer,
         error: errors.odometer,
         placeholder: "Ex: 50000",
         type: "number",
      },
   ];

   const handleSubmit = async (e) => {
      e.preventDefault();
      const newErrors = {};

      if (!plate) newErrors.plate = "Campo obrigatório";
      if (!brand) newErrors.brand = "Campo obrigatório";
      if (!model) newErrors.model = "Campo obrigatório";
      if (!year) newErrors.year = "Campo obrigatório";
      if (!chassis) newErrors.chassis = "Campo obrigatório";
      if (!odometer) newErrors.odometer = "Campo obrigatório";
      if (!renavam) newErrors.renavam = "Campo obrigatório";
      if (!color) newErrors.color = "Campo obrigatório";

      if (
         plate &&
         !/^([A-Z]{3}[0-9]{4}|[A-Z]{3}[0-9][A-Z][0-9]{2})$/.test(plate)
      ) {
         newErrors.plate =
            "Placa inválida (formatos aceitos: ABC1234 ou ABC1D23)";
      }

      if (year && Number(year) < 1900) {
         newErrors.year = "Ano inválido, apenas maior que 1900";
      }

      if (renavam && !/^\d{11}$/.test(renavam)) {
         newErrors.renavam =
            "Renavam deve conter exatamente 11 dígitos (ex: 12345678901)";
      }

      if (chassis && !/^[A-HJ-NPR-Z0-9]{17}$/.test(chassis)) {
         newErrors.chassis =
            "Chassi deve conter exatamente 17 caracteres alfanuméricos (exceto I, O e Q)";
      }

      if (odometer && Number(odometer) < 0)
         newErrors.odometer = "Hodômetro não pode ser negativo";

      if (image instanceof File && !valideImageType.includes(image.type)) {
         newErrors.image =
            "Formato da imagem não aceito. Apenas png, jpeg, jpg e gif";
      }

      setErrors(newErrors);

      if (Object.keys(newErrors).length > 0) {
         showToast("Erro!", "error", "Corrija os erros no formulário.", 5000);
         return;
      }

      await createCar(
         plate,
         model,
         year,
         color,
         odometer,
         image,
         renavam,
         chassis,
         brand
      );
   };

   return (
      <AnimatePresence>
         {show && (
            <div className="fixed inset-0 z-50">
               <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="absolute inset-0 bg-black/30"
                  onClick={() => {
                     setShow(false);
                     setTimeout(() => router.back(), 300);
                  }}
               />

               <motion.div
                  initial={{ y: "100%" }}
                  animate={{ y: 0 }}
                  exit={{ y: "100%" }}
                  transition={{
                     type: "spring",
                     damping: 25,
                     stiffness: 300,
                  }}
                  className="absolute bottom-0 left-0 right-0 md:bottom-auto md:right-auto md:top-1/2 md:left-1/2 md:-translate-x-1/2 md:-translate-y-1/2"
               >
                  <motion.div
                     initial={{ opacity: 0, scale: 0.95 }}
                     animate={{ opacity: 1, scale: 1 }}
                     exit={{ opacity: 0, scale: 0.95 }}
                     transition={{ delay: 0.1 }}
                     className="bg-white dark:bg-gray-800 rounded-t-xl md:rounded-xl shadow-xl border-t md:border border-gray-200 dark:border-gray-700 p-4 md:p-6 w-full md:max-w-2xl"
                  >
                     <div className="flex items-center gap-3 mb-6">
                        <h2 className="text-2xl font-bold">
                           Cadastrar Novo Veículo
                        </h2>
                        <motion.button
                           whileHover={{ scale: 1.1, rotate: 90 }}
                           whileTap={{ scale: 0.9 }}
                           onClick={() => {
                              setShow(false);
                              setTimeout(() => router.back(), 300);
                           }}
                           className="ml-auto text-gray-400 hover:text-gray-700 dark:hover:text-white text-2xl font-bold focus:outline-none"
                           aria-label="Fechar"
                           type="button"
                        >
                           <Icon
                              name="xMark"
                              className="size-5"
                              strokeWidth={5}
                           />
                        </motion.button>
                     </div>

                     <div className="overflow-y-auto max-h-[calc(100vh-12rem)] md:max-h-[80vh]">
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
                                       transform,
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
                                             onChange={(e) =>
                                                setValue(
                                                   transform
                                                      ? transform(
                                                           e.target.value
                                                        )
                                                      : e.target.value
                                                )
                                             }
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
                                    Imagem do Veículo
                                 </label>
                                 <InputText
                                    type="file"
                                    variant="file"
                                    name="photo"
                                    accept="image/*"
                                    onChange={(e) =>
                                       setImage(e.target.files[0])
                                    }
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
                                    onClick={() => router.push("/cars")}
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
                                       "Cadastrar Veículo"
                                    )}
                                 </Btn>
                              </div>
                           </form>
                        )}
                     </div>
                  </motion.div>
               </motion.div>
            </div>
         )}
      </AnimatePresence>
   );
}

export default withAuth(CreateCarsModal);
