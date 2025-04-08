"use client";
import { useState } from "react";
import Btn from "../../../elements/btn";
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
      <div className="min-h-screen py-10 px-4">
         <div className="max-w-3xl mx-auto p-8 rounded-lg shadow-md">
            <h2 className="text-3xl font-bold mb-6 text-white">
               Cadastrar Motorista
            </h2>
            {erro && <p style={{ color: "red" }}>{erro}</p>}
            <form onSubmit={handleSubmit} className="space-y-6">
               <div>
                  <label
                     htmlFor="name"
                     className="block text-sm font-medium text-white"
                  >
                     Nome
                  </label>
                  <input
                     type="text"
                     id="name"
                     name="name"
                     value={name}
                     onChange={(e) => setName(e.target.value)}
                     placeholder="Ex: Carlos Silva"
                     required
                     className="mt-1 block w-full p-3 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm text-white"
                  />
               </div>
               <div>
                  <label
                     htmlFor="phone"
                     className="block text-sm font-medium text-white"
                  >
                     Número de Telefone
                  </label>
                  <input
                     type="tel"
                     id="phone"
                     name="phone"
                     value={phone}
                     onChange={(e) => setPhone(e.target.value)}
                     placeholder="Ex: (11) 91234-5678"
                     required
                     className="mt-1 block w-full p-3 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm text-white"
                  />
               </div>
               <div>
                  <label
                     htmlFor="license"
                     className="block text-sm font-medium text-white"
                  >
                     Licença de Motorista
                  </label>
                  <input
                     type="text"
                     id="license"
                     name="license"
                     value={license}
                     onChange={(e) => setLicense(e.target.value)}
                     placeholder="Ex: 123456789"
                     required
                     className="mt-1 block w-full p-3 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm text-white"
                  />
               </div>
               <Btn
                  type="submit"
                  texto="Cadastrar"
                  variant="primary"
                  disabled={carregando}
                  className="w-full py-3 px-4 text-lg"
               >
                  {carregando ? "criando..." : "Criar"}
               </Btn>
            </form>
         </div>
      </div>
   );
}

export default CreateUser;
