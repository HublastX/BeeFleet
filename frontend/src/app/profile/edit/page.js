"use client";
import withAuth from "@/utils/withAuth";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import useAuth from "@/hooks/useAuth";
import Btn from "../../../elements/btn";
import InputText from "../../../elements/inputText";
import Icon from "@/elements/Icon";

function EditProfile() {
   const router = useRouter();
   const { gestor, erro, carregando, putManager } = useAuth();
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

   return (
      <div className="min-h-screenpy-8">
         <div className="max-w-2xl mx-auto">
            <h1 className="text-3xl font-bold text-dark dark:text-white mb-8">
               Editar Perfil
            </h1>

            {carregando && <div>Carregando...</div>}
            {erro && <div>{erro}</div>}

            <form
               onSubmit={(e) => {
                  e.preventDefault();
                  if (gestor?.id) {
                     putManager(gestor.id, formData);
                  }
               }}
               className="space-y-6"
            >
               <div className="flex justify-center mb-8">
                  <div className="relative w-32 h-32">
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
                  />
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
                  />
               </div>

               <div className="flex gap-4">
                  <div className="w-full flex gap-4">
                     <Btn
                        type="button"
                        onClick={() => router.back()}
                        texto="Cancelar"
                        variant="danger"
                        className="flex-[1] px-4 py-2 border border-red-400 bg-red-400 hover:bg-red-500 text-white rounded-lg transition-colors"
                     />
                     <Btn
                        type="submit"
                        disabled={carregando}
                        className="flex-[2]"
                     >
                        {carregando ? "Salvando..." : "Salvar Alterações"}
                     </Btn>
                  </div>
               </div>
            </form>
         </div>
      </div>
   );
}

export default withAuth(EditProfile);
