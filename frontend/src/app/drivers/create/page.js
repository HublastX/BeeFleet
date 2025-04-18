"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import withAuth from "@/utils/withAuth";
import Btn from "../../../elements/btn";
import InputText from "../../../elements/inputText";
import useDrivers from "@/hooks/useDrivers";

function CreateUser() {
   const [name, setName] = useState("");
   const [phone, setPhone] = useState("");
   const [license, setLicense] = useState("");
   const [image, setImage] = useState(null);
   const { createDriver, carregando, erro } = useDrivers();
   const router = useRouter();

   const handleSubmit = async (e) => {
      e.preventDefault();
      await createDriver(name, phone, license, image);
      console.log({ name, phone, license, image });
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
                     onChange={(e) => setLicense(e.target.value)}
                     placeholder="Ex: 123456789"

                  />
               </div>
               <div>
                  <label className="block text-sm font-medium mb-2">
                     Foto
                  </label>
                  <InputText
                     type="file"
                     name="photo"
                     accept="image/*"
                     onChange={(e) => setImage(e.target.files[0])}
                     className="file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-medium file:bg-primary file:text-dark hover:file:bg-primary-dark"
                  />
               </div>
               <div className="flex gap-4">
                  <button
                     type="button"
                     onClick={() => router.back()}
                     className="flex-[1] py-3 px-4 text-lg border border-red-400 bg-red-400 hover:bg-red-500 text-white rounded-lg transition-colors"
                  >
                     Cancelar
                  </button>
                  <Btn
                     type="submit"
                     texto=""
                     variant="primary"
                     disabled={carregando}
                     className="flex-[2] py-3 px-4 text-lg"
                  >
                     {carregando ? "criando..." : "Cadastrar"}
                  </Btn>
               </div>
            </form>
         </div>
      </div>
   );
}

export default withAuth(CreateUser);
