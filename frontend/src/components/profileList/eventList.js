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
         <div className="bg-white dark:bg-bee-dark-800 rounded-xl p-6 w-full max-w-lg shadow-2xl relative border border-bee-dark-300 dark:border-bee-dark-400">
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
                  ({lista?.length || 0} {lista?.length === 1 ? "item" : "itens"})
               </span>
            </h2>

            <div className="max-h-[70vh] overflow-hidden">
               <ul className="space-y-2 pr-2 max-h-[65vh] overflow-y-auto custom-scrollbar">
                  {(!lista || lista.length === 0) && (
                     <li className="text-center py-6 text-gray-500 dark:text-gray-400 flex flex-col items-center">
                        <Icon name="inbox" className="size-10 mb-2 opacity-60" />
                        <span>Nenhum item disponível</span>
                     </li>
                  )}

                  {lista?.map((item) => (
                     <li
                        key={item.id}
                        className="border border-bee-dark-300 dark:border-bee-dark-400 p-4 rounded-lg hover:bg-bee-alert-500 dark:hover:bg-bee-alert-600 transition-all cursor-pointer group hover:shadow-sm "
                        onClick={() => {
                           onSelect(item);
                           onClose();
                        }}
                     >
                        {tipo === "motoristas" ? (
                           <div className="flex items-start gap-4">
                              <div className="bg-bee-purple-100 dark:bg-bee-purple-200 p-2 rounded-lg">
                                 <Icon name="user" className="size-5 text-bee-purple-500" />
                              </div>
                              <div className="flex-1 min-w-0">
                                 <div className="flex justify-between items-start">
                                    <span className="font-semibold text-gray-800 dark:text-gray-100 truncate">
                                       {item.name}
                                    </span>
                                 </div>
                                 <div className="mt-1 flex flex-wrap gap-x-4 gap-y-1 text-sm">
                                    <span className="flex items-center text-gray-500 dark:text-gray-400">
                                       <Icon name="phone" className="size-3.5 mr-1.5" />
                                       {item.phone}
                                    </span>
                                    <span className="flex items-center text-gray-500 dark:text-gray-400">
                                       <Icon name="identidade" className="size-3.5 mr-1.5" />
                                       CNH: {item.license}
                                    </span>
                                 </div>
                              </div>
                           </div>
                        ) : (
                           <div className="flex items-start gap-4">
                              <div className="bg-blue-100 dark:bg-blue-900/30 p-2 rounded-lg">
                                 <Icon name="car" className="size-5 text-blue-600 dark:text-blue-400" />
                              </div>
                              <div className="flex-1 min-w-0">
                                 <div className="flex justify-between items-start">
                                    <span className="font-semibold text-gray-800 dark:text-gray-100">
                                       {item.plate}
                                    </span>
                                 </div>
                                 <div className="mt-1 text-sm font-medium text-gray-700 dark:text-gray-300">
                                    {item.brand} {item.model}
                                 </div>
                                 <div className="mt-1 flex flex-wrap gap-x-4 gap-y-1 text-sm">
                                    <span className="flex items-center text-gray-500 dark:text-gray-400">
                                       <Icon name="reports" className="size-3.5 mr-1.5" />
                                       RENAVAM: {item.renavam}
                                    </span>
                                    {item.year && (
                                       <span className="flex items-center text-gray-500 dark:text-gray-400">
                                          <Icon name="calendar" className="size-3.5 mr-1.5" />
                                          {item.year}
                                       </span>
                                    )}
                                 </div>
                              </div>
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