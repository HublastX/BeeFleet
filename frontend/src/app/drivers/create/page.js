"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import withAuth from "@/utils/withAuth";
import Btn from "@/elements/btn";
import InputText from "@/elements/inputText";
import useDrivers from "@/hooks/useDrivers";
import FormSkeleton from "@/elements/ui/skeleton/FormSkeleton";
import { useToast } from "@/utils/ToastContext";
import Icon from "@/elements/Icon";

function DriverCreate() {
   const { createDriver, carregando, erro } = useDrivers();
   const router = useRouter();
   const [errors, setErrors] = useState({});
   const { showToast } = useToast();
   const [show, setShow] = useState(false);

   const [name, setName] = useState("");
   const [phone, setPhone] = useState("");
   const [license, setLicense] = useState("");
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

   const formList = [
      {
         label: "Nome",
         id: "name",
         value: name,
         setValue: setName,
         error: errors.name,
         placeholder: "Ex: Carlos Silva",
         type: "text",
      },
      {
         label: "Telefone",
         id: "phone",
         value: phone,
         setValue: (value) => setPhone(formatPhoneNumber(value)),
         error: errors.phone,
         placeholder: "Ex: (11) 91234-5678",
         type: "text",
      },
      {
         label: "CNH",
         id: "license",
         value: license,
         setValue: setLicense,
         error: errors.license,
         placeholder: "Ex: 12345678901",
         type: "text",
      },
   ];

   const handleSubmit = async (e) => {
      e.preventDefault();
      const newErrors = {};

      if (!name) newErrors.name = "Campo obrigatório";
      if (!phone) newErrors.phone = "Campo obrigatório";
      if (!license) newErrors.license = "Campo obrigatório";

      if (name && name.trim().split(" ").length < 2) {
         newErrors.name = "Nome deve conter pelo menos nome e sobrenome";
      }

      if (phone && !/^\(?\d{2}\)?[\s-]?\d{4,5}-?\d{4}$/.test(phone)) {
         newErrors.phone = "Telefone inválido (formato: (11) 91234-5678)";
      }

      if (license && !/^\d{11}$/.test(license)) {
         newErrors.license = "CNH deve conter exatamente 11 dígitos";
      }

      if (image instanceof File && !valideImageType.includes(image.type)) {
         newErrors.image =
            "Formato da imagem não aceito. Apenas png, jpeg, jpg e gif";
      }

      setErrors(newErrors);

      if (Object.keys(newErrors).length > 0) {
         showToast("Erro!", "error", "Corrija os erros no formulário.", 5000);
         return;
      }

      await createDriver(name, phone, license, image);
   };

   return (
      <div className="fixed inset-0 z-50 flex items-center justify-center backdrop-blur-md">
         <div className="bg-white dark:bg-bee-dark-800 p-6 rounded-2xl border border-bee-dark-300 dark:border-bee-dark-400 shadow-lg w-full max-w-2xl max-h-[90vh] overflow-y-auto">
            <div className="flex items-center gap-3 mb-6 sticky top-0 bg-white dark:bg-bee-dark-800 pb-4 border-b border-bee-dark-300 dark:border-bee-dark-400">
               <h2 className="text-2xl font-bold">Cadastrar Novo Motorista</h2>
               <button
                  onClick={() => router.back()}
                  className="ml-auto text-gray-400 hover:text-gray-700 dark:hover:text-white text-2xl font-bold focus:outline-none"
                  aria-label="Fechar"
                  type="button"
               >
                  <Icon name="xMark" className="size-5" strokeWidth={5} />
               </button>
            </div>

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
                                 onChange={(e) => setValue(e.target.value)}
                                 placeholder={placeholder}
                                 required
                                 className={`w-full ${error ? "border-red-500 dark:border-red-500 border-2" : ""}`}
                              />
                              {error && (
                                 <p className="text-red-500 text-xs">{error}</p>
                              )}
                           </div>
                        )
                     )}
                  </div>

                  <div className="space-y-1">
                     <label className="block text-sm font-medium">
                        Foto do Motorista
                     </label>
                     <InputText
                        type="file"
                        variant="file"
                        name="photo"
                        accept="image/*"
                        onChange={(e) => setImage(e.target.files[0])}
                        className={`file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-medium file:bg-primary file:text-dark hover:file:bg-primary-dark w-full ${errors.image ? "border-red-500 dark:border-red-500 border-2" : ""}`}
                     />
                     {errors.image && (
                        <p className="text-red-500 text-xs">{errors.image}</p>
                     )}
                  </div>

                  <div className="flex justify-end gap-3 pt-4 border-t border-bee-dark-300 dark:border-bee-dark-400">
                     <Btn
                        type="button"
                        onClick={() => router.push("/drivers")}
                        variant="cancel"
                        texto="Cancelar"
                     />
                     <Btn type="submit" variant="primary" disabled={carregando}>
                        {carregando ? "Cadastrando..." : "Cadastrar Motorista"}
                     </Btn>
                  </div>
               </form>
            )}
         </div>
      </div>
   );
}

export default withAuth(DriverCreate);
