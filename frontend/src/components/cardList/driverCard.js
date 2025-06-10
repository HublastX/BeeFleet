import useDrivers from "@/hooks/useDrivers";
import Image from "next/image";
import Link from "next/link";
import Icon from "@/elements/Icon";
import CardSkeleton from "@/elements/ui/skeleton/CardSkeleton";
import { useNavBar } from "../navbar/navBarContext";
import { motion, AnimatePresence } from "framer-motion";

function formatarTelefone(telefone) {
   if (!telefone) return "";
   const numeros = telefone.replace(/\D/g, "");
   if (numeros.length === 11) {
      return `(${numeros.slice(0, 2)}) ${numeros.slice(2, 7)}-${numeros.slice(7)}`;
   }
   if (numeros.length === 10) {
      return `(${numeros.slice(0, 2)}) ${numeros.slice(2, 6)}-${numeros.slice(6)}`;
   }
   return telefone;
}

export default function DriverCard({ searchTerm }) {
   const { motoristas, erro, carregando } = useDrivers();
   const { isExpanded, isHovered } = useNavBar();
   const isNavOpen = isExpanded || isHovered;

   const motoristasFiltrados = motoristas
      .filter((motoristas) => {
         if (!searchTerm) return true;
         const termo = searchTerm.toLowerCase();
         return (
            motoristas.name.toLowerCase().includes(termo) ||
            motoristas.phone.toLowerCase().includes(termo) ||
            motoristas.license.toLowerCase().includes(termo)
         );
      })
      .sort((a, b) => new Date(b.updatedAt) - new Date(a.updatedAt));

   const gridClass = `grid transition-all duration-300 ease-in-out gap-6 p-4 ${
      isNavOpen
         ? "xl:grid-cols-4 lg:grid-cols-3"
         : "xl:grid-cols-5 lg:grid-cols-4"
   } grid-cols-1 xs:grid-cols-2 sm:grid-cols-2 md:grid-cols-3`;

   if (carregando) return <CardSkeleton />;
   if (erro)
      return (
         <div className="space-y-4">
            <div className="p-6 text-center font-semibold text-xl">
               <p className="text-bee-alert-300">
                  Ocorreu um problema ao carregar os motoristas. <br />
                  <span className="text-sm">Detalhes: {erro}</span>
               </p>
            </div>
            <CardSkeleton />
         </div>
      );

   return (
      <div className="w-full">
         <AnimatePresence mode="wait">
            {motoristasFiltrados.length === 0 && !erro && !carregando && (
               <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  className="flex flex-col items-center justify-center p-12 w-full h-full bg-white dark:bg-bee-dark-800 rounded-xl border border-dashed border-bee-dark-300 dark:border-bee-dark-400"
               >
                  <motion.div
                     initial={{ scale: 0 }}
                     animate={{ scale: 1 }}
                     transition={{ delay: 0.2 }}
                  >
                     <Icon
                        name="user"
                        className="size-16 text-gray-400 dark:text-gray-500 mb-4"
                     />
                  </motion.div>
                  <motion.div
                     initial={{ opacity: 0 }}
                     animate={{ opacity: 1 }}
                     transition={{ delay: 0.3 }}
                     className="text-center"
                  >
                     <h3 className="text-lg font-semibold text-gray-700 dark:text-gray-300">
                        Nenhum motorista encontrado
                     </h3>
                     <p className="text-gray-500 dark:text-gray-400 mt-1">
                        {searchTerm
                           ? "Tente ajustar sua busca"
                           : "Adicione um novo motorista para começar"}
                     </p>
                  </motion.div>
               </motion.div>
            )}
         </AnimatePresence>

         <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className={gridClass}
         >
            <AnimatePresence mode="sync">
               {motoristasFiltrados.map((driver, index) => (
                  <motion.div
                     key={driver.id}
                     layout
                     initial={{ opacity: 0, scale: 0.9, y: 20 }}
                     animate={{ opacity: 1, scale: 1, y: 0 }}
                     exit={{ opacity: 0, scale: 0.9, y: -20 }}
                     transition={{
                        type: "spring",
                        stiffness: 260,
                        damping: 20,
                        delay: searchTerm ? 0 : Math.min(index * 0.1, 0.5),
                     }}
                     whileHover={{
                        scale: 1.02,
                        transition: { duration: 0.2 },
                     }}
                     className="relative"
                  >
                     <Link
                        href={`${driver.id}`}
                        className="group relative bg-white dark:bg-bee-dark-800 rounded-xl shadow-sm card-hover transition-all duration-300 overflow-hidden border border-bee-dark-300 dark:border-bee-dark-400 block"
                     >
                        {/* Status Badge */}
                        <motion.div
                           initial={{ opacity: 0, x: 20 }}
                           animate={{ opacity: 1, x: 0 }}
                           transition={{ delay: index * 0.1 + 0.2 }}
                           className={`absolute top-3 right-3 z-10 px-2 py-1 rounded-full text-xs font-medium ${
                              driver.isAvailable
                                 ? "bg-green-300/80 dark:bg-green-900/70 text-green-800 dark:text-green-500"
                                 : "bg-red-300/80 dark:bg-red-900/70 text-red-800 dark:text-red-500"
                           }`}
                        >
                           {driver.isAvailable ? "Disponível" : "Indisponível"}
                        </motion.div>

                        {/* foto */}
                        <div className="relative w-full h-48 bg-gray-100 dark:bg-bee-dark-400 overflow-hidden">
                           {driver.image ? (
                              <Image
                                 src={driver.image}
                                 alt={`Foto de ${driver.name}`}
                                 fill
                                 className="object-cover transition-transform duration-500 group-hover:scale-105"
                                 sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                              />
                           ) : (
                              <motion.div
                                 whileHover={{ rotate: 10 }}
                                 transition={{
                                    type: "spring",
                                    stiffness: 400,
                                    damping: 10,
                                 }}
                                 className="w-full h-full flex items-center justify-center text-gray-400"
                              >
                                 <Icon name="user" className="size-35" />
                              </motion.div>
                           )}
                        </div>

                        {/* telefone */}
                        <motion.div
                           initial={{ opacity: 0, y: 20 }}
                           animate={{ opacity: 1, y: 0 }}
                           transition={{ delay: index * 0.1 + 0.3 }}
                           className="p-4 space-y-2"
                        >
                           <h3 className="font-semibold text-lg text-gray-800 dark:text-white truncate">
                              {driver.name}
                           </h3>

                           <div className="flex items-center gap-2 text-gray-600 dark:text-gray-400">
                              <motion.div
                                 whileHover={{ rotate: 15 }}
                                 transition={{
                                    type: "spring",
                                    stiffness: 400,
                                    damping: 10,
                                 }}
                              >
                                 <Icon name="phone" className="size-4" />
                              </motion.div>
                              <span className="text-sm">
                                 {formatarTelefone(driver.phone)}
                              </span>
                           </div>

                           <div className="pt-2 mt-2 border-t border-bee-dark-300 dark:border-bee-dark-400 flex justify-between items-center text-xs text-gray-500 dark:text-gray-400">
                              <span>
                                 Atualizado em:{" "}
                                 {new Date(driver.updatedAt).toLocaleDateString(
                                    "pt-BR"
                                 )}
                              </span>
                              <motion.div
                                 whileHover={{ x: 5 }}
                                 transition={{
                                    type: "spring",
                                    stiffness: 400,
                                    damping: 10,
                                 }}
                              >
                                 <Icon
                                    name="chevronRight"
                                    className="size-5"
                                    strokeWidth={2}
                                 />
                              </motion.div>
                           </div>
                        </motion.div>
                     </Link>
                  </motion.div>
               ))}
            </AnimatePresence>
         </motion.div>
      </div>
   );
}
