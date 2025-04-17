"use client";
import { useState, useEffect } from "react";
import Btn from "../../../elements/btn";
import InputText from "../../../elements/inputText";
import { useRouter } from "next/navigation";
import useDrivers from "@/hooks/useDrivers";

function EditDriver({ params }) {
   const [name, setName] = useState("");
   const [phone, setPhone] = useState("");
   const [license, setLicense] = useState("");
   const [photo, setPhoto] = useState(null);
   const { updateDriver, getDriver, carregando, erro } = useDrivers();
   const router = useRouter();

   useEffect(() => {
      const loadDriver = async () => {
         const driver = await getDriver(params.id);
         if (driver) {
            setName(driver.name);
            setPhone(driver.phone);
            setLicense(driver.license);
         }
      };
      loadDriver();
   }, [params.id]);

   const handleSubmit = async (e) => {
      e.preventDefault();
      await updateDriver(params.id, { name, phone, license, photo });
      router.push("/drivers");
   };

   return (
      <div>
         <div className="max-w-3xl mx-auto">
            <h2 className="text-3xl font-bold mb-6 text-dark dark:text-white">
               Editar Motorista
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
                  <label className="block text-sm font-medium mb-2">
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

               <div>
                  <label className="block text-sm font-medium mb-2">
                     Atualizar Foto
                  </label>
                  <InputText
                     type="file"
                     name="photo"
                     accept="image/*"
                     onChange={(e) => setPhoto(e.target.files[0])}
                     className="file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-medium file:bg-primary file:text-dark hover:file:bg-primary-dark"
                  />
               </div>

               <div className="flex gap-4">
                  <Btn
                    type="button" onClick={() => router.back()}
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
         </div>
      </div>
   );
}

export default EditDriver;
