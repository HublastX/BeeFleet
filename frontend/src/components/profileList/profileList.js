import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
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
      <AnimatePresence>
         <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm"
            onClick={onClose}
         >
            <motion.div
               initial={{ scale: 0.95, opacity: 0 }}
               animate={{ scale: 1, opacity: 1 }}
               exit={{ scale: 0.95, opacity: 0 }}
               transition={{ type: "spring", damping: 20 }}
               className="bg-white dark:bg-bee-dark-800 rounded-xl p-6 w-full max-w-lg shadow-2xl relative border border-gray-200 dark:border-bee-dark-400"
               onClick={(e) => e.stopPropagation()}
            >
               <motion.button
                  whileHover={{ backgroundColor: "rgba(239, 68, 68, 0.1)" }}
                  className="absolute top-4 right-4 p-1 rounded-xl hover:bg-bee-alert-500 dark:hover:bg-bee-dark-400 transition-colors"
                  onClick={onClose}
                  aria-label="Fechar modal"
               >
                  <Icon name="xMark" className="size-6" />
               </motion.button>

               <motion.div
                  initial={{ y: -20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 0.1 }}
               >
                  <h2 className="text-2xl font-bold mb-6 text-gray-800 dark:text-gray-100">
                     {titulo}
                     <span className="ml-2 text-sm font-normal text-gray-500 dark:text-gray-400">
                        ({lista.length} {lista.length === 1 ? "item" : "itens"})
                     </span>
                  </h2>
               </motion.div>

               <div className="max-h-[70vh] overflow-hidden">
                  <motion.ul
                     initial={{ opacity: 0 }}
                     animate={{ opacity: 1 }}
                     transition={{ delay: 0.2 }}
                     className="space-y-2 flex flex-col pr-2 max-h-[65vh] overflow-y-auto custom-scrollbar"
                  >
                     <AnimatePresence>
                        {lista.length === 0 && (
                           <motion.li
                              initial={{ opacity: 0, y: 20 }}
                              animate={{ opacity: 1, y: 0 }}
                              exit={{ opacity: 0, y: -20 }}
                              className="text-center py-6 text-gray-500 dark:text-gray-400 flex flex-col items-center"
                           >
                              <motion.div
                                 initial={{ scale: 0 }}
                                 animate={{ scale: 1 }}
                                 transition={{ delay: 0.3 }}
                              >
                                 <Icon
                                    name="inbox"
                                    className="size-10 mb-2 opacity-60"
                                 />
                              </motion.div>
                              <span>Nenhum item encontrado</span>
                           </motion.li>
                        )}

                        {lista.map((item, index) => {
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
                                 item.eventType === "CHECKOUT"
                                    ? "eventoL"
                                    : "evento";
                              iconColor =
                                 item.eventType === "CHECKOUT"
                                    ? "bg-red-100 dark:bg-red-900/30 text-red-600 dark:text-red-400"
                                    : "bg-green-100 dark:bg-green-900/30 text-green-600 dark:text-green-400";
                           }

                           const content = (
                              <div className="flex items-start gap-4">
                                 <motion.div
                                    whileHover={{ rotate: 10 }}
                                    transition={{
                                       type: "spring",
                                       stiffness: 400,
                                       damping: 10,
                                    }}
                                    className={`${iconColor} p-2 rounded-lg`}
                                 >
                                    <Icon name={iconName} className="size-5" />
                                 </motion.div>
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
                                                {item.driver.name} -{" "}
                                                {item.car.model}{" "}
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
                                 <motion.li
                                    key={item.id}
                                    initial={{ opacity: 0, x: -20 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    transition={{ delay: index * 0.1 }}
                                    whileHover={{ x: 5 }}
                                    className="border border-bee-dark-300 dark:border-bee-dark-400 p-4 rounded-lg hover:bg-bee-alert-500 dark:hover:bg-bee-alert-600 transition-all group hover:shadow-sm"
                                 >
                                    {content}
                                 </motion.li>
                              );
                           }

                           return (
                              <Link href={href} key={item.id} passHref>
                                 <motion.li
                                    initial={{ opacity: 0, x: -20 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    transition={{ delay: index * 0.1 }}
                                    whileHover={{ x: 5 }}
                                    className="border border-bee-dark-300 dark:border-bee-dark-400 p-4 rounded-lg hover:bg-bee-alert-500 dark:hover:bg-bee-alert-600 transition-all cursor-pointer group hover:shadow-sm"
                                 >
                                    {content}
                                 </motion.li>
                              </Link>
                           );
                        })}
                     </AnimatePresence>
                  </motion.ul>
               </div>
            </motion.div>
         </motion.div>
      </AnimatePresence>
   );
}
