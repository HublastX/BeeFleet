"use client";
import { useState } from "react";
import Btn from "../../../elements/btn";
import InputText from "../../../elements/inputText";
import { useRouter } from "next/navigation";
import useDrivers from "@/hooks/useDrivers";

function CreateUser() {
   const [name, setName] = useState("");
   const [phone, setPhone] = useState("");
   const [license, setLicense] = useState("");
   const { createDriver, carregando, erro } = useDrivers();
   const router = useRouter();

   const handleSubmit = async (e) => {
      e.preventDefault();
      await createDriver(name, phone, license);
      console.log({ name, phone, license });
   };

   return (
      <div>
         <div className="max-w-3xl mx-auto">
            <h2 className="text-3xl font-bold mb-6 text-dark dark:text-white">
               Cadastrar Motorista
            </h2>
            {erro && <p style={{ color: "red" }}>{erro}</p>}
            <form onSubmit={handleSubmit} className="space-y-6">
               <div>
                  <label className="block text-sm font-medium mb-2">
                     Nome
                  </label>
                  <InputText
                     type="text"
                     name="name"
                     value={name}
                     onChange={(e) => setName(e.target.value)}
                     placeholder="Ex: Carlos Silva"

                  />
               </div>
               <div>
                  <label className="block text-sm font-medium mb-2">
                     Número de Telefone
                  </label>
                  <InputText
                     type="tel"
                     name="phone"
                     value={phone}
                     onChange={(e) => setPhone(e.target.value)}
                     placeholder="Ex: (11) 91234-5678"

                  />
               </div>
               <div>
                  <label className="block text-sm font-medium  mb-2">
                     Licença de Motorista
                  </label>
                  <InputText
                     type="text"
                     name="license"
                     value={license}
                     onChange={(e) => setLicense(e.target.value)}
                     placeholder="Ex: 123456789"

                  />
               </div>
               <div className="flex gap-4">
                  <button
                     type="button"
                     onClick={() => router.back()}
                     className="flex-1 py-3 px-4 text-lg border border-red-600 bg-red-600 hover:bg-red-700 text-white rounded-lg transition-colors"
                  >
                     Cancelar
                  </button>
                  <Btn
                     type="submit"
                     texto="Cadastrar"
                     variant="primary"
                     disabled={carregando}
                     className="flex-1 py-3 px-4 text-lg"
                  >
                     {carregando ? "criando..." : ""}
                  </Btn>
               </div>
            </form>
         </div>
      </div>
   );
}

export default CreateUser;
