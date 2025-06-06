"use client";
import { useParams, useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import withAuth from "@/utils/withAuth";
import Btn from "@/elements/btn";
import InputText from "@/elements/inputText";
import useDrivers from "@/hooks/useDrivers";
import FormSkeleton from "@/elements/ui/skeleton/FormSkeleton";
import { useToast } from "@/utils/ToastContext";
import Icon from "@/elements/Icon";
import { motion, AnimatePresence } from "framer-motion";

function EditDriverModal() {
   const { motoristas, carregando, erro, updateDriver } = useDrivers();
   const { id } = useParams();
   const router = useRouter();
   const [errors, setErrors] = useState({});
   const { showToast } = useToast();
   const [show, setShow] = useState(false);
   const [formData, setFormData] = useState({
      name: "",
      phone: "",
      license: "",
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
            router.push("/drivers");
         }
      };
      window.addEventListener("keydown", handleKeyDown);
      return () => window.removeEventListener("keydown", handleKeyDown);
   }, [router]);

   useEffect(() => {
      const driver = motoristas.find((driver) => driver.id === id);
      if (driver) {
         setFormData({
            name: driver.name || "",
            phone: driver.phone || "",
            license: driver.license || "",
            image: driver.image || null,
         });
      }
   }, [motoristas, id]);

   const formatPhoneNumber = (value) => {
      const cleaned = value.replace(/\D/g, "").slice(0, 11);
      const match = cleaned.match(/^(\d{0,2})(\d{0,5})(\d{0,4})$/);

      if (!match) return value;

      const [, ddd, parte1, parte2] = match;

      let formatted = "";
      if (ddd) formatted += `(${ddd}`;
      if (ddd && ddd.length === 2) formatted += ") ";
      if (parte1) formatted += parte1;
      if (parte2) formatted += `-${parte2}`;

      return formatted;
   };

   const handleSubmit = async (e) => {
      e.preventDefault();
      const newErrors = {};

      if (!formData.name) newErrors.name = "Campo obrigatório";
      if (!formData.phone) newErrors.phone = "Campo obrigatório";
      if (!formData.license) newErrors.license = "Campo obrigatório";

      if (formData.name && formData.name.trim().split(" ").length < 2) {
         newErrors.name = "Nome deve conter pelo menos nome e sobrenome";
      }

      if (
         formData.phone &&
         !/^\(?\d{2}\)?[\s-]?\d{4,5}-?\d{4}$/.test(formData.phone)
      ) {
         newErrors.phone = "Telefone inválido (formato: (11) 91234-5678)";
      }

      if (formData.license && !/^\d{11}$/.test(formData.license)) {
         newErrors.license = "CNH deve conter exatamente 11 dígitos";
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

      await updateDriver(id, formData);
   };

   const formList = [
      {
         label: "Nome",
         id: "name",
         value: formData.name,
         setValue: (value) => setFormData((prev) => ({ ...prev, name: value })),
         error: errors.name,
         placeholder: "Ex: Carlos Silva",
         type: "text",
      },
      {
         label: "Telefone",
         id: "phone",
         value: formData.phone,
         setValue: (value) =>
            setFormData((prev) => ({
               ...prev,
               phone: formatPhoneNumber(value),
            })),
         error: errors.phone,
         placeholder: "Ex: (11) 91234-5678",
         type: "text",
      },
      {
         label: "CNH",
         id: "license",
         value: formData.license,
         setValue: (value) =>
            setFormData((prev) => ({ ...prev, license: value })),
         error: errors.license,
         placeholder: "Ex: 12345678901",
         type: "text",
      },
   ];

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
                        <h2 className="text-2xl font-bold">Editar Motorista</h2>
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
                              <div className="grid grid-cols-1 gap-4">
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
                                             onChange={(e) =>
                                                setValue(e.target.value)
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
                                    Atualizar Foto
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
                  </motion.div>
               </motion.div>
            </div>
         )}
      </AnimatePresence>
   );
}

export default withAuth(EditDriverModal);
