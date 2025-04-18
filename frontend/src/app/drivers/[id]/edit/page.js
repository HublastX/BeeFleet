"use client";
import { useParams, useRouter } from "next/navigation";
import Btn from "@/elements/btn";
import InputText from "@/elements/inputText";
import useDrivers from "@/hooks/useDrivers";
import withAuth from "@/utils/withAuth";
import { useState, useEffect } from "react";
import Image from "next/image";
import Icon from "@/elements/Icon";
import FormSkeleton from "@/elements/ui/skeleton/FormSkeleton ";

function EditDriver() {
   const { motoristas, carregando, erro, updateDriver } = useDrivers();
   const { id } = useParams();
   const router = useRouter();
   const [formData, setFormData] = useState({
      name: "",
      phone: "",
      license: "",
      image: null,
   });
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
   console.log("FormData", formData);

   return (
      <div className="w-full">
         {erro && <div className="text-red-500">{erro}</div>}
         {carregando ? (
            <FormSkeleton />
         ) : (
            <>
               <h2 className="text-3xl font-bold mb-6 text-dark dark:text-white">
                  Editar Motorista
               </h2>
               <div className="flex flex-col-reverse md:flex-row justify-between w-full">
                  <form
                     onSubmit={(e) => {
                        e.preventDefault();
                        if (
                           formData.name &&
                           formData.phone &&
                           formData.license
                        ) {
                           updateDriver(id, formData);
                        } else {
                           console.error("Campos obrigatórios não preenchidos");
                        }
                     }}
                     className="space-y-6 md:w-3/4"
                  >
                     <div>
                        <label className="block text-sm font-medium mb-2">
                           Nome
                        </label>
                        <InputText
                           type="text"
                           name="name"
                           value={formData.name}
                           onChange={(e) =>
                              setFormData((prev) => ({
                                 ...prev,
                                 name: e.target.value,
                              }))
                           }
                           required
                           autoComplete="name"
                        />
                     </div>

                     <div>
                        <label className="block text-sm font-medium mb-2">
                           Número de Telefone
                        </label>
                        <InputText
                           type="tel"
                           name="phone"
                           value={formData.phone}
                           onChange={(e) =>
                              setFormData((prev) => ({
                                 ...prev,
                                 phone: e.target.value,
                              }))
                           }
                           required
                           autoComplete="phone"
                        />
                     </div>

                     <div>
                        <label className="block text-sm font-medium mb-2">
                           Licença de Motorista
                        </label>
                        <InputText
                           type="text"
                           name="license"
                           value={formData.license}
                           onChange={(e) =>
                              setFormData((prev) => ({
                                 ...prev,
                                 license: e.target.value,
                              }))
                           }
                           required
                           autoComplete="license"
                        />
                     </div>

                     <div>
                        <label className="block text-sm font-medium mb-2">
                           Atualizar Foto
                        </label>
                        <InputText
                           type="file"
                           name="image"
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
                           className="file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-medium file:bg-primary file:text-dark hover:file:bg-primary-dark"
                        />
                     </div>

                     <div className="flex gap-4">
                        <Btn
                           type="button"
                           texto="Cancelar"
                           onClick={() => router.back()}
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
                  <div className="hidden md:flex mb-6 md:mb-0 md:flex-col md:w-1/5 h-fit border font-bold bg-bee-dark-100 border-bee-dark-300 dark:bg-gray-800 dark:border-gray-500 p-4 rounded-lg">
                     <div className="flex justify-center items-center md:mb-4 bg-bee-purple-200 rounded-md p-3">
                        {formData.image != "null" ? (
                           typeof formData.image === "string" ? (
                              <Image
                                 src={formData.image}
                                 alt="Imagem do motorista"
                                 width={128}
                                 height={128}
                                 className="w-32 h-32 rounded-full object-cover"
                              />
                           ) : (
                              <Image
                                 src={formData.image}
                                 alt="Nova imagem do motorista"
                                 width={128}
                                 height={128}
                                 className="w-32 h-32 rounded-full object-cover"
                              />
                           )
                        ) : (
                           <Icon name="user" className="size-32 text-white" />
                        )}
                     </div>
                     <div className="pl-3 gap-3 flex flex-col">
                        <h1>Nome: {formData.name}</h1>
                        <p>Telefone: {formData.phone}</p>
                        <p>CNH: {formData.license}</p>
                     </div>
                  </div>
               </div>
            </>
         )}
      </div>
   );
}

export default withAuth(EditDriver);
