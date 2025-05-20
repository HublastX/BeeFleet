import Link from "next/link";
import useDrivers from "@/hooks/useDrivers";
import useCar from "@/hooks/useCar";
import useEvents from "@/hooks/useEvent";
import Icon from "@/elements/Icon";

export default function ProfileListModal({ open, onClose, tipo }) {
   const { getDriversByManager } = useDrivers();
   const { getCarByManager } = useCar();
   const { getEventsByManager } = useEvents();

   let lista = [];
   let titulo = "";

   if (tipo === "motoristas") {
      lista = getDriversByManager();
      titulo = "Motoristas adicionados";
   } else if (tipo === "carros") {
      lista = getCarByManager();
      titulo = "Carros adicionados";
   } else if (tipo === "eventos") {
      lista = getEventsByManager();
      titulo = "Eventos criados";
   }

   if (!open) return null;

   return (
      <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm transition-opacity duration-300">
         <div className="bg-white dark:bg-bee-dark-800 rounded-xl p-6 w-full max-w-lg shadow-2xl relative border border-gray-200 dark:border-bee-dark-400 transform transition-all duration-300 scale-95 hover:scale-100">
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
                  ({lista.length} {lista.length === 1 ? "item" : "itens"})
               </span>
            </h2>

            <div className="max-h-[70vh] overflow-hidden">
               <ul className="space-y-3 flex flex-col pr-2 max-h-[65vh] overflow-y-auto custom-scrollbar">
                  {lista.length === 0 && (
                     <li className="text-center py-4 text-gray-500 dark:text-gray-400">
                        Nenhum item encontrado
                     </li>
                  )}

                  {lista.map((item) => {
                     let href = "";
                     if (tipo === "motoristas") href = `/drivers/${item.id}`;
                     else if (tipo === "carros") href = `/cars/${item.id}`;

                     if (!href) {
                        return (
                           <li
                              key={item.id}
                              className="border-b border-gray-100 dark:border-bee-dark-400 p-3 rounded-lg hover:bg-gray-50 dark:hover:bg-bee-dark-400/50 transition-colors"
                           >
                              {tipo === "motoristas" && (
                                 <div className="flex flex-col">
                                    <span className="font-semibold text-gray-800 dark:text-gray-100">
                                       {item.name}
                                    </span>
                                    <span className="text-sm text-gray-500 dark:text-gray-400">
                                       {item.phone}
                                    </span>
                                 </div>
                              )}

                              {tipo === "carros" && (
                                 <div className="flex flex-col">
                                    <span className="font-semibold text-gray-800 dark:text-gray-100">
                                       {item.plate}
                                    </span>
                                    <span className="text-sm text-gray-500 dark:text-gray-400">
                                       {item.model}
                                    </span>
                                 </div>
                              )}

                              {tipo === "eventos" && (
                                 <div className="flex flex-col">
                                    <span className="font-semibold text-gray-800 dark:text-gray-100 capitalize">
                                       {item.eventType === "CHECKOUT" ? "Saída" : "Chegada"}
                                    </span>
                                    <span className="text-sm text-gray-500 dark:text-gray-400">
                                       {new Date(item.createdAt).toLocaleString(
                                          "pt-BR"
                                       )}
                                    </span>
                                 </div>
                              )}
                           </li>
                        );
                     }

                     return (
                        <Link href={href} key={item.id} passHref>
                           <li className="border-b border-gray-300 dark:border-bee-dark-400 p-3 rounded-lg hover:bg-gray-50 dark:hover:bg-bee-dark-400/50 transition-colors cursor-pointer">
                              {tipo === "motoristas" && (
                                 <div className="flex flex-col">
                                    <span className="font-semibold text-gray-800 dark:text-gray-100">
                                       {item.name}
                                    </span>
                                    <span className="text-sm text-gray-500 dark:text-gray-400">
                                       {item.phone}
                                    </span>
                                 </div>
                              )}

                              {tipo === "carros" && (
                                 <div className="flex flex-col">
                                    <span className="font-semibold text-gray-800 dark:text-gray-100">
                                       {item.plate}
                                    </span>
                                    <span className="text-sm text-gray-500 dark:text-gray-400">
                                       {item.model}
                                    </span>
                                 </div>
                              )}
                           </li>
                        </Link>
                     );
                  })}
               </ul>
            </div>
         </div>
      </div>
   );
}
