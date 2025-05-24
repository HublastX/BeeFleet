"use client";
import withAuth from "@/utils/withAuth";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import useAuth from "@/hooks/useAuth";
import Btn from "../../../elements/btn";
import InputText from "../../../elements/inputText";
import Icon from "@/elements/Icon";
import { useToast } from "@/utils/ToastContext";

function EditProfile() {
   const router = useRouter();
   const { gestor, erro, carregando, putManager } = useAuth();
   const [erros, setErros] = useState({});
   const { showToast } = useToast();
   const [previewImage, setPreviewImage] = useState(null);
   const [formData, setFormData] = useState({
      name: gestor?.name || "",
      email: gestor?.email || "",
      image: gestor?.image || null,
   });

   useEffect(() => {
      if (gestor && formData.name === "" && formData.email === "") {
         setFormData({
            name: gestor.name || "",
            email: gestor.email || "",
            image: gestor.image || null,
         });
      }
   }, [gestor, formData]);

   const valideImageType = [
      "image/jpeg",
      "image/png",
      "image/gif",
      "image/jpg",
   ];

   const handleSubmit = async (e) => {
      e.preventDefault();
      const newErros = {};

      if (!formData.name) newErros.name = "Campo obrigatório";
      if (!formData.email) newErros.email = "Campo obrigatório";

      if (formData.name && formData.name.trim().split(/\s+/).length < 2) {
         newErros.name = "Nome deve conter pelo menos nome e sobrenome";
      }

      if (
         formData.image instanceof File &&
         !valideImageType.includes(formData.image.type)
      ) {
         newErros.image = "Formato da imagem não aceito";
      }

      if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
         newErros.email = "Email inválido.";
      }

      setErros(newErros);

      if (Object.keys(newErros).length > 0) {
         showToast("Erro!", "error", "Corrija os erros no formulário.", 5000);
         return;
      }

      if (gestor?.id) {
         putManager(gestor.id, formData);
      }
   };

   return (
      <div className="min-h-screenpy-8">
         <div className="max-w-2xl mx-auto">
            <h1 className="text-3xl font-bold text-dark dark:text-white mb-8">
               Editar Perfil
            </h1>
            <form onSubmit={handleSubmit} className="space-y-6">
               <div className="flex justify-center mb-8 flex-col items-center">
                  <div className="relative rounded-full w-32 h-32 ">
                     {" "}
                     {previewImage || gestor?.image ? (
                        <Image
                           src={previewImage || gestor?.image}
                           alt="Preview"
                           fill
                           className="rounded-full object-cover"
                        />
                     ) : (
                        <div className="w-full h-full rounded-full bg-gray-200 flex items-center justify-center">
                           <span className="text-gray-500 text-4xl">👤</span>
                        </div>
                     )}
                     <label className=" absolute bottom-0 right-0 bg-bee-purple-600 rounded-full p-2 cursor-pointer hover:bg-bee-purple-700 transition-colors">
                        <Icon name="camera" className="size-5 text-white" />

                        <input
                           type="file"
                           className="hidden"
                           accept="image/*"
                           onChange={(e) => {
                              const file = e.target.files[0];
                              if (file) {
                                 if (!valideImageType.includes(file.type)) {
                                    showToast(
                                       "Erro!",
                                       "error",
                                       "Formato de imagem inválido. Use JPEG, PNG ou GIF.",
                                       5000
                                    );
                                    return;
                                 }

                                 setPreviewImage(URL.createObjectURL(file));
                                 setFormData((prev) => ({
                                    ...prev,
                                    image: file,
                                 }));
                              }
                           }}
                        />
                     </label>
                  </div>
               </div>

               <div>
                  <label className="block text-sm font-medium text-dark dark:text-white mb-2">
                     Nome
                  </label>
                  <InputText
                     type="text"
                     value={formData.name}
                     onChange={(e) =>
                        setFormData((prev) => ({
                           ...prev,
                           name: e.target.value,
                        }))
                     }
                     required
                     autoComplete="name"
                     className={
                        erros.name
                           ? "border-red-500 dark:border-red-500 border-2"
                           : ""
                     }
                  />
                  {erros.name && (
                     <p className="text-red-500 text-sm font-bold">
                        {erros.name}
                     </p>
                  )}
               </div>

               <div>
                  <label className="block text-sm font-medium text-dark dark:text-white mb-2">
                     Email
                  </label>
                  <InputText
                     type="email"
                     value={formData.email}
                     onChange={(e) =>
                        setFormData((prev) => ({
                           ...prev,
                           email: e.target.value,
                        }))
                     }
                     required
                     autoComplete="email"
                     className={
                        erros.email
                           ? "border-red-500 dark:border-red-500 border-2"
                           : ""
                     }
                  />
                  {erros.email && (
                     <p className="text-red-500 text-sm font-bold">
                        {erros.email}
                     </p>
                  )}
               </div>

               <div className="flex gap-4">
                  <div className="w-full flex gap-4 justify-end">
                     <Btn
                        type="button"
                        onClick={() => router.back()}
                        texto="Cancelar"
                        variant="cancel"
                     />
                     <Btn type="submit" disabled={carregando}>
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
               </div>
            </form>
         </div>
      </div>
   );
}

export default withAuth(EditProfile);
