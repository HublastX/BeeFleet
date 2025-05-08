"use client";
import { useParams, useRouter } from "next/navigation";
import Btn from "@/elements/btn";
import InputText from "@/elements/inputText";
import useDrivers from "@/hooks/useDrivers";
import withAuth from "@/utils/withAuth";
import { useState, useEffect } from "react";
import FormSkeleton from "@/elements/ui/skeleton/FormSkeleton";
import { useToast } from "@/utils/ToastContext";

function EditDriver() {
   const { motoristas, carregando, erro, updateDriver } = useDrivers();
   const { id } = useParams();
   const router = useRouter();
   const [erros, setErros] = useState({});
   const { showToast } = useToast();
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

   const handleSubmit = async (e) => {
      e.preventDefault();
      const newErros = {};

      if (!formData.name) newErros.name = "Campo obrigatório";
      if (!formData.phone) newErros.phone = "Campo obrigatório";
      if (!formData.license) newErros.license = "Campo obrigatório";

      if (formData.name && formData.name.trim().split(" ").length < 2) {
         newErros.name = "Nome deve conter pelo menos nome e sobrenome";
      }

      if (
         formData.phone &&
         !/^\(?\d{2}\)?[\s-]?\d{4,5}-?\d{4}$/.test(formData.phone)
      ) {
         newErros.phone = "Telefone inválido";
      }

      if (formData.license && !/^\d{11}$/.test(formData.license)) {
         newErros.license = "CNH deve conter 11 números";
      }

      if (
         formData.image instanceof File &&
         !valideImageType.includes(formData.type)
      ) {
         newErros.image =
            "Formato da imagem não aceito. Apenas png, jpeg, jpg e gif";
      }

      setErros(newErros);

      if (Object.keys(newErros).length > 0) {
         showToast("Erro!", "error", "Corrija os erros no formulário.", 5000);
         return;
      }

      await updateDriver(id, formData);
   };

   const formList = [
      { label: "Nome", id: "name", type: "text" },
      { label: "Número de Telefone", id: "phone", type: "text" },
      { label: "Licença de Motorista", id: "license", type: "text" },
   ];

   return (
      <div className="w-full">
         {carregando && <FormSkeleton />}
         {!carregando && (
            <>
               <h2 className="text-3xl font-bold mb-6 text-dark dark:text-white">
                  Editar Motorista
               </h2>
               <div className="flex flex-col-reverse md:flex-row justify-between gap-10 w-full">
                  <form onSubmit={handleSubmit} className="space-y-6 w-full">
                     {formList.map(({ label, id, type }) => (
                        <div key={id}>
                           <label
                              htmlFor={id}
                              className="block text-sm font-medium mb-2"
                           >
                              {label}
                           </label>
                           <InputText
                              type={type}
                              name={id}
                              value={formData[id]}
                              onChange={(e) =>
                                 setFormData((prev) => ({
                                    ...prev,
                                    [id]: e.target.value,
                                 }))
                              }
                              required
                              className={
                                 erros[id]
                                    ? "border-red-500 dark:border-red-500 border-2"
                                    : ""
                              }
                           />
                           {erros[id] && (
                              <p className="text-red-500 text-sm font-bold">
                                 {erros[id]}
                              </p>
                           )}
                        </div>
                     ))}

                     <div>
                        <label className="block text-sm font-medium mb-2">
                           Atualizar Foto
                        </label>
                        <InputText
                           name="image"
                           variant="file"
                           type="file"
                           accept="image/*"
                           className={`file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-medium file:bg-primary file:text-dark hover:file:bg-primary-dark ${erros.image ? "border-red-500 dark:border-red-500 border-2" : ""}`}
                           onChange={(e) => {
                              const file = e.target.files[0];
                              if (file) {
                                 setFormData((prev) => ({
                                    ...prev,
                                    image: file,
                                 }));
                              }
                           }}
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
                  {/* <div className="hidden sticky md:flex md:flex-col min-w-65 h-fit border font-bold bg-bee-dark-100 border-bee-dark-300 dark:bg-gray-800 dark:border-gray-500 p-4 rounded-lg">
                     <div className="flex justify-center items-center rounded-md p-3">
                        {formData.image ? (
                           typeof formData.image === "string" ? (
                              <Image
                                 src={formData.image}
                                 alt="Imagem do motorista"
                                 width={128}
                                 height={128}
                                 unoptimized
                                 className="w-32 h-32 rounded object-cover"
                              />
                           ) : (
                              <Image
                                 src={URL.createObjectURL(formData.image)}
                                 alt="Imagem do motorista"
                                 width={128}
                                 height={128}
                                 unoptimized
                                 className="w-32 h-32 rounded object-cover"
                              />
                           )
                        ) : (
                           <Icon name="user" className="size-32" />
                        )}
                     </div>
                     <div className="pl-2 pt-5 gap-3 flex flex-col border-t-2 border-bee-dark-300 dark:border-bee-dark-400">
                        <p>Nome: {formData.name}</p>
                        <p>Telefone: {formData.phone}</p>
                        <p>CNH: {formData.license}</p>
                     </div>
                  </div> */}
               </div>
            </>
         )}
      </div>
   );
}

export default withAuth(EditDriver);
