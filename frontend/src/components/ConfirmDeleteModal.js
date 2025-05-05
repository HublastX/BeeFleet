import Btn from "@/elements/btn";
import Icon from "@/elements/Icon";
export default function DeleteConfirmation({ link, tipo, onClose }) {
   return (
      <div className="fixed inset-0 flex items-center justify-center backdrop-blur-sm z-50">
         <div className="bg-white max-w-1/3 dark:bg-bee-dark-800 dark:border-bee-dark-400 dark:border-1 py-5 px-15 rounded shadow-lg text-center">
            <div className="text-5xl text-red-500 mb-4 text-center flex justify-center">
               <Icon
                  name="xMark"
                  className="size-25 text-red-500"
                  strokeWidth={3}
               />
            </div>
            <h2 className="text-xl font-bold mb-2">
               Você tem certeza?
            </h2>
            <p className="text-gray-600 dark:text-gray-300 mb-6">
               Você realmente deseja excluir este {tipo}? Este processo não pode
               ser desfeito
            </p>
            <div className="flex justify-center gap-4 mt-10">
               <Btn
                  texto="Cancelar"
                  onClick={onClose}
                  className="dark:bg-gray-600 dark:hover:bg-gray-500 bg-gray-400 hover:bg-gray-500 flex-[1]"
              />
               <Btn
               texto="Deletar"
                  onClick={link}
                  className="bg-red-600 hover:bg-red-500 flex-[2]"
               />
            </div>
         </div>
      </div>
   );
}
