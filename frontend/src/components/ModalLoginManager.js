"use client";
import { useState } from "react";
import Btn from "../elements/btn";
import Icon from "../elements/Icon";
import InputText from "../elements/inputText";

function Modal() {
   const [isOpen, setIsOpen] = useState(false);

   return (
      <>
         <Btn
            variant="primary"
            texto="Login"
            type="button"
            onClick={() => setIsOpen(true)}
         />

         {isOpen && (
            <div className="fixed top-0 left-0 right-0 bottom-0 flex items-center justify-center acrilico z-50">
               <div className="relative bg-gray-50 rounded-lg shadow-sm dark:bg-gray-700 p-6 w-96">
                  {/* header */}
                  <div className="flex items-center justify-between border-b pb-3">
                     <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
                        Solicitar Carro
                     </h3>
                     <button
                        onClick={() => setIsOpen(false)}
                        className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white"
                     >
                        <Icon name="xMark" />
                     </button>
                  </div>

                  {/* formulario */}
                  <div className="mt-5">
                     <form className="space-y-4" action="#">
                        <div>
                           <label
                              for="nome"
                              className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                           >
                              Nome Completo
                           </label>
                           <InputText
                              type="text"
                              name="nome"
                              placeholder="ex.: Carlos da Silva"
                           />
                        </div>
                        <div>
                           <label
                              for="telefone"
                              className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                           >
                              Telefone
                           </label>
                           <InputText
                              type="tel"
                              name="telefone"
                              placeholder="ex.: 77998989898"
                           />
                        </div>
                        <div>
                           <label
                              for="cpf"
                              className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                           >
                              CPF
                           </label>
                           <InputText
                              type="number"
                              name="cpf"
                              placeholder="ex.: 99999999999"
                           />
                        </div>
                        <div>
                           <label
                              for="Data"
                              className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                           >
                              Data de Retirada
                           </label>
                           <InputText type="date" name="data" />
                        </div>
                        <Btn
                           variant="primary"
                           type="submit"
                           texto="Solicitar Carro"
                           className="mt-5 w-full"
                        />
                     </form>
                  </div>
               </div>
            </div>
         )}
      </>
   );
}

export default Modal;
