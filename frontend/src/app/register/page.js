"use client";
import Btn from "../../elements/btn";
import Icon from "../../elements/Icon";
import InputText from "../../elements/inputText";
import Link from "next/link";
import { useState, useEffect } from "react";

function Modal() {
   const [show, setShow] = useState(false);

   useEffect(() => {
      setTimeout(() => setShow(true), 10);
   }, []);

   return (
      <div className="fixed top-0 left-0 right-0 bottom-0 flex items-center justify-center z-50 backdrop-blur-sm">
         <div
            className={`relative bg-gray-50 rounded-lg shadow-sm dark:bg-gray-700 p-6 w-96 transform transition-all duration-300 ease-out
               ${show ? "opacity-100 scale-100" : "opacity-0 scale-95"}
            `}
         >
            {/* header */}
            <div className="flex items-center justify-between border-b pb-3">
               <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
                  Registro
               </h3>
               <Link href="/">
                  <button className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white">
                     <Icon name="xMark" />
                  </button>
               </Link>
            </div>

            {/* formulário */}
            <div className="mt-5">
               <form className="space-y-4" action="#">
                  <div>
                     <label
                        htmlFor="name"
                        className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                     >
                        Nome
                     </label>
                     <div className="relative">
                        <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                           <Icon name="user" className="w-4 h-4 text-gray-900 dark:text-white" />
                        </div>
                        <InputText
                           type="text"
                           name="name"
                           id="name"
                           className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full pl-10 p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                           placeholder="Ex: Carlos Silva"
                        />
                     </div>
                  </div>
                  <div>
                     <label
                        htmlFor="email"
                        className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                     >
                        Email
                     </label>
                     <div className="relative">
                        <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                           <Icon name="email" className="w-4 h-4 text-gray-900 dark:text-white" />
                        </div>
                        <InputText
                           type="email"
                           name="email"
                           id="email"
                           className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full pl-10 p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                           placeholder="Ex: exemploemail@email.com"
                        />
                     </div>
                  </div>
                  <div>
                     <label
                        htmlFor="password"
                        className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                     >
                        Senha
                     </label>
                     <div className="relative">
                        <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                           <Icon name="key" className="w-4 h-4 text-gray-900 dark:text-white" />
                        </div>
                        <InputText
                           type="password"
                           name="password"
                           id="password"
                           className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full pl-10 p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                           placeholder="********"
                        />
                     </div>
                  </div>
                  <div>
                     <label
                        htmlFor="confirm-password"
                        className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                     >
                        Confirmar Senha
                     </label>
                     <div className="relative">
                        <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                           <Icon name="key" className="w-4 h-4 text-gray-900 dark:text-white" />
                        </div>
                        <InputText
                           type="password"
                           name="confirm-password"
                           id="confirm-password"
                           className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full pl-10 p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                           placeholder="********"
                        />
                     </div>
                  </div>
                  <Btn
                     variant="primary"
                     type="submit"
                     texto="Registrar"
                     className="mt-5 w-full"
                  />
               </form>
            </div>
         </div>
      </div>
   );
}

export default Modal;
