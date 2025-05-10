"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import withAuth from "@/utils/withAuth";
import Btn from "../../../elements/btn";
import InputText from "../../../elements/inputText";
import useDrivers from "@/hooks/useDrivers";
import FormSkeleton from "@/elements/ui/skeleton/FormSkeleton";
import { useToast } from "@/utils/ToastContext";

function CreateUser() {
   const { createDriver, carregando, erro } = useDrivers();
   const router = useRouter();
   const [erros, setErros] = useState({});
   const { showToast } = useToast();

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
      const newErros = {};

      if (!name) newErros.name = "Campo obrigatorio";
      if (!phone) newErros.phone = "Campo obrigatorio";
      if (!license) newErros.license = "Campo obrigatorio";

      if (name && name.trim().split(" ").length < 2) {
         newErros.name = "Nome deve conter pelo menos nome e sobrenome";
      }

      if (phone && !/^\(?\d{2}\)?[\s-]?\d{4,5}-?\d{4}$/.test(phone)) {
         newErros.phone = "Telefone inválido";
      }

      if (license && !/^\d{11}$/.test(license)) {
         newErros.license = "CNH deve conter 11 números";
      }

      if (image instanceof File && !valideImageType.includes(image.type)) {
         newErros.image = "Formato da imagem não aceito. Apenas png, jpeg, jpg e gif";
      }

      setErros(newErros);

      if (Object.keys(newErros).length > 0) {
         showToast("Erro!", "error", "Corrija os erros no formulário.", 5000);
         return;
      }
      await createDriver(name, phone, license, image);
      console.log({ name, phone, license, image });
   };

   const formList = [
      {
         label: "Nome",
         id: "name",
         type: "text",
         setValue: setName,
         error: erros.name,
         placeholder: "Ex: Carlos Silva",
      },
      {
         label: "Número de Telefone",
         type: "text",
         id: "phone",
         setValue: setPhone,
         error: erros.phone,
         placeholder: "Ex: (11) 91234-5678",
      },
      {
         label: "Licença de Motorista",
         type: "text",
         id: "license",
         setValue: setLicense,
         error: erros.license,
         placeholder: "Ex: 123456789",
      },
   ];

   return (
      <div>
         {carregando && <FormSkeleton />}
         {!carregando && (
            <div className="max-w-3xl mx-auto">
               <h2 className="text-3xl font-bold mb-6 text-dark dark:text-white">
                  Cadastrar Motorista
               </h2>
               <form onSubmit={handleSubmit} className="space-y-6">
                  {formList.map(
                     ({ label, setValue, type, error, placeholder, id }) => (
                        <div key={label}>
                           <label className="block text-sm font-medium mb-2">
                              {label}
                           </label>
                           <InputText
                              type={type}
                              name={id}
                              value={id === "phone" ? phone : undefined}
                              onChange={(e) =>
                                 id === "phone"
                                    ? setPhone(formatPhoneNumber(e.target.value))
                                    : setValue(e.target.value)
                              }
                              placeholder={placeholder}
                              required
                              className={`${error ? "border-red-500 dark:border-red-500 border-2" : ""}`}
                           />
                           {error && (
                              <p className="text-red-500 text-sm font-bold">
                                 {error}
                              </p>
                           )}
                        </div>
                     )
                  )}
                  <div>
                     <label className="block text-sm font-medium mb-2">
                        Foto
                     </label>
                     <InputText
                        type="file"
                        variant="file"
                        name="photo"
                        accept="image/*"
                        onChange={(e) => setImage(e.target.files[0])}
                        className={`file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-medium file:bg-primary file:text-dark hover:file:bg-primary-dark ${erros.image ? "border-red-500 dark:border-red-500 border-2" : ""}`}
                     />
                     {erros.image && (
                        <p className="text-red-500 text-sm font-bold">
                           {erros.image}
                        </p>
                     )}
                  </div>
                  <div className="flex gap-4">
                     <Btn
                        type="button"
                        onClick={() => router.back()}
                        texto="Cancelar"
                        variant="danger"
                        className="flex-[1] py-3 px-4 text-lg border border-red-400 bg-red-400 hover:bg-red-500 text-white rounded-lg transition-colors"
                     />
                     <Btn
                        type="submit"
                        variant="primary"
                        disabled={carregando}
                        className="flex-[2] py-3 px-4 text-lg"
                     >
                        {carregando ? "cadastrando..." : "Cadastrar"}
                     </Btn>
                  </div>
               </form>
            </div>
         )}
      </div>
   );
}

export default withAuth(CreateUser);
