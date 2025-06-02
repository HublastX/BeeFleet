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
      lista = getDriversByManager().sort(
         (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
      );
      titulo = "Motoristas adicionados";
   } else if (tipo === "carros") {
      lista = getCarByManager().sort(
         (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
      );
      titulo = "Veículos adicionados";
   } else if (tipo === "eventos") {
      lista = getEventsByManager().sort(
         (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
      );
      titulo = "Eventos criados";
   }

   if (!open) return null;

   return (
      <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm transition-opacity duration-300">
         <div className="bg-white dark:bg-bee-dark-800 rounded-xl p-6 w-full max-w-lg shadow-2xl relative border border-gray-200 dark:border-bee-dark-400 transform transition-all duration-300 scale-95 hover:scale-100">
            <button
               className="absolute top-4 right-4 p-1 rounded-xl hover:bg-bee-alert-500 dark:hover:bg-bee-dark-400 transition-colors"
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
               <ul className="space-y-2 flex flex-col pr-2 max-h-[65vh] overflow-y-auto custom-scrollbar">
                  {lista.length === 0 && (
                     <li className="text-center py-6 text-gray-500 dark:text-gray-400 flex flex-col items-center">
                        <Icon
                           name="inbox"
                           className="size-10 mb-2 opacity-60"
                        />
                        <span>Nenhum item encontrado</span>
                     </li>
                  )}

                  {lista.map((item) => {
                     let href = "";
                     let iconName = "";
                     let iconColor = "";

                     if (tipo === "motoristas") {
                        href = `/drivers/${item.id}`;
                        iconName = "user";
                        iconColor =
                           "bg-bee-purple-100 dark:bg-bee-purple-200 text-bee-purple-500";
                     } else if (tipo === "carros") {
                        href = `/cars/${item.id}`;
                        iconName = "car";
                        iconColor =
                           "bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400";
                     } else if (tipo === "eventos") {
                        iconName =
                           item.eventType === "CHECKOUT" ? "eventoL" : "evento";
                        iconColor =
                           item.eventType === "CHECKOUT"
                              ? "bg-red-100 dark:bg-red-900/30 text-red-600 dark:text-red-400"
                              : "bg-green-100 dark:bg-green-900/30 text-green-600 dark:text-green-400";
                     }

                     const content = (
                        <div className="flex items-start gap-4">
                           <div className={`${iconColor} p-2 rounded-lg`}>
                              <Icon name={iconName} className="size-5" />
                           </div>
                           <div className="flex-1 min-w-0">
                              {tipo === "motoristas" && (
                                 <>
                                    <div className="flex justify-between items-start">
                                       <span className="font-semibold text-gray-800 dark:text-gray-100 truncate">
                                          {item.name}
                                       </span>
                                    </div>
                                    <div className="mt-1 flex flex-wrap gap-x-4 gap-y-1 text-sm">
                                       <span className="flex items-center text-gray-500 dark:text-gray-400">
                                          <Icon
                                             name="phone"
                                             className="size-3.5 mr-1.5"
                                          />
                                          {item.phone}
                                       </span>
                                    </div>
                                 </>
                              )}

                              {tipo === "carros" && (
                                 <>
                                    <div className="flex justify-between items-start">
                                       <span className="font-semibold text-gray-800 dark:text-gray-100">
                                          {item.plate}
                                       </span>
                                    </div>
                                    <div className="mt-1 text-sm font-medium text-gray-700 dark:text-gray-300">
                                       {item.brand} {item.model}
                                    </div>
                                 </>
                              )}

                              {tipo === "eventos" && (
                                 <div className="flex-1 min-w-0">
                                    <div className="flex justify-between items-start">
                                       <span className="font-semibold text-gray-800 dark:text-gray-100">
                                          {item.driver.name} - {item.car.model}{" "}
                                          {item.car.brand}
                                       </span>
                                    </div>
                                    <div className="mt-1 flex flex-wrap gap-x-4 gap-y-1 text-sm">
                                       <span className="flex items-center text-gray-500 dark:text-gray-400">
                                          <Icon
                                             name="calendar"
                                             className="size-3.5 mr-1.5"
                                          />
                                          {new Date(
                                             item.createdAt
                                          ).toLocaleDateString()}
                                       </span>
                                       <span className="flex items-center text-gray-500 dark:text-gray-400">
                                          <Icon
                                             name="clock"
                                             className="size-3.5 mr-1.5"
                                          />
                                          {new Date(
                                             item.createdAt
                                          ).toLocaleTimeString([], {
                                             hour: "2-digit",
                                             minute: "2-digit",
                                          })}
                                       </span>
                                    </div>
                                 </div>
                              )}
                           </div>
                        </div>
                     );

                     if (!href) {
                        return (
                           <li
                              key={item.id}
                              className="border border-bee-dark-300 dark:border-bee-dark-400 p-4 rounded-lg hover:bg-bee-alert-500 dark:hover:bg-bee-alert-600 transition-all group hover:shadow-sm "
                           >
                              {content}
                           </li>
                        );
                     }

                     return (
                        <Link href={href} key={item.id} passHref>
                           <li className="border border-bee-dark-300 dark:border-bee-dark-400 p-4 rounded-lg hover:bg-bee-alert-500 dark:hover:bg-bee-alert-600 transition-all cursor-pointer group hover:shadow-sm ">
                              {content}
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
