import useDrivers from "@/hooks/useDrivers";
import useCar from "@/hooks/useCar";
import Icon from "@/elements/Icon";

export default function EventList({ open, onClose, tipo, onSelect }) {
   const { motoristas } = useDrivers();
   const { carro } = useCar();

   let lista = [];
   let titulo = "";

   if (tipo === "motoristas") {
      lista = motoristas?.filter((m) => m.isAvailable);
      titulo = "Motoristas disponíveis";
   } else if (tipo === "carros") {
      lista = carro?.filter((c) => c.status === "AVAILABLE");
      titulo = "Veículos disponíveis";
   }

   if (!open) return null;

   return (
      <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm transition-opacity duration-300">
         <div className="bg-white dark:bg-bee-dark-800 rounded-xl p-6 w-full max-w-lg shadow-2xl relative border border-gray-200 dark:border-bee-dark-400">
            <button
               className="absolute top-4 right-4 p-1 rounded-xl hover:bg-gray-100 dark:hover:bg-bee-dark-400 transition-colors"
               onClick={onClose}
               aria-label="Fechar modal"
            >
               <Icon name="xMark" className="size-6" />
            </button>

            <h2 className="text-2xl font-bold mb-6 text-gray-800 dark:text-gray-100">
               {titulo}
               <span className="ml-2 text-sm font-normal text-gray-500 dark:text-gray-400">
                  ({lista?.length || 0} {lista?.length === 1 ? "item" : "itens"}
                  )
               </span>
            </h2>

            <div className="max-h-[70vh] overflow-hidden">
               <ul className="space-y-3 flex flex-col pr-2 max-h-[65vh] overflow-y-auto custom-scrollbar">
                  {(!lista || lista.length === 0) && (
                     <li className="text-center py-4 text-gray-500 dark:text-gray-400">
                        Nenhum item disponível
                     </li>
                  )}

                  {lista?.map((item) => (
                     <li
                        key={item.id}
                        className="border-b border-gray-300 dark:border-bee-dark-400 p-3 rounded-lg hover:bg-bee-purple-50 dark:hover:bg-bee-dark-400/50 transition-colors cursor-pointer"
                        onClick={() => {
                           onSelect(item);
                           onClose();
                        }}
                     >
                        {tipo === "motoristas" ? (
                           <div className="flex flex-col">
                              <span className="font-semibold text-gray-800 dark:text-gray-100">
                                 {item.name}
                              </span>
                              <span className="text-sm text-gray-500 dark:text-gray-400">
                                 {item.phone}
                              </span>
                              <span className="text-xs text-gray-400 dark:text-gray-500">
                                 CNH: {item.license}
                              </span>
                           </div>
                        ) : (
                           <div className="flex flex-col">
                              <span className="font-semibold text-gray-800 dark:text-gray-100">
                                 {item.plate}
                              </span>
                              <span className="text-sm text-gray-500 dark:text-gray-400">
                                 {item.brand} {item.model}
                              </span>
                              <span className="text-xs text-gray-400 dark:text-gray-500">
                                 RENAVAM: {item.renavam}
                              </span>
                           </div>
                        )}
                     </li>
                  ))}
               </ul>
            </div>
         </div>
      </div>
   );
}
