"use client";
import { motion, AnimatePresence } from "framer-motion";
import Btn from "@/elements/btn";
import Icon from "@/elements/Icon";

export default function DeleteConfirmation({ link, tipo, onClose }) {
   return (
      <AnimatePresence>
         <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 backdrop-blur-sm bg-black/30"
            onClick={onClose}
         >
            <motion.div
               initial={{ scale: 0.9, opacity: 0 }}
               animate={{ scale: 1, opacity: 1 }}
               exit={{ scale: 0.9, opacity: 0 }}
               transition={{ type: "spring", damping: 20 }}
               className="bg-white dark:bg-bee-dark-800 w-full max-w-md rounded-xl shadow-xl border border-bee-dark-300 dark:border-bee-dark-400 overflow-hidden"
               onClick={(e) => e.stopPropagation()}
            >
               <motion.div
                  initial={{ y: -20 }}
                  animate={{ y: 0 }}
                  className="bg-red-50 dark:bg-red-900/30 p-5 flex flex-col items-center"
               >
                  <motion.div
                     initial={{ scale: 0 }}
                     animate={{ scale: 1 }}
                     transition={{ delay: 0.2 }}
                     className="bg-red-100 dark:bg-red-900/30 rounded-full p-4 mb-3"
                  >
                     <Icon
                        name="trash"
                        className="size-8 text-red-600 dark:text-red-400"
                        strokeWidth={2}
                     />
                  </motion.div>
                  <motion.h2
                     initial={{ opacity: 0 }}
                     animate={{ opacity: 1 }}
                     transition={{ delay: 0.3 }}
                     className="text-xl font-bold text-gray-900 dark:text-white"
                  >
                     Confirmar Exclusão
                  </motion.h2>
               </motion.div>

               <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.4 }}
                  className="p-6 text-center"
               >
                  <p className="text-gray-600 dark:text-gray-300 mb-2">
                     Tem certeza que deseja excluir este {tipo} permanentemente?
                  </p>
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                     Esta ação não poderá ser desfeita e todos os dados
                     relacionados serão perdidos.
                  </p>
               </motion.div>

               <motion.div
                  initial={{ y: 20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 0.5 }}
                  className="bg-gray-50 dark:bg-bee-dark-700/50 px-6 py-4 flex flex-col sm:flex-row-reverse gap-3"
               >
                  <motion.div
                     whileHover={{ scale: 1.02 }}
                     whileTap={{ scale: 0.98 }}
                  >
                     <Btn
                        onClick={link}
                        className="w-full sm:w-auto bg-red-600 hover:bg-red-700 dark:bg-red-600 dark:hover:bg-red-700 text-white"
                     >
                        <div className="flex items-center justify-center gap-2">
                           <Icon
                              name="trash"
                              className="size-4"
                              strokeWidth="2"
                           />
                           Confirmar Exclusão
                        </div>
                     </Btn>
                  </motion.div>
                  <motion.div
                     whileHover={{ scale: 1.02 }}
                     whileTap={{ scale: 0.98 }}
                  >
                     <Btn
                        onClick={onClose}
                        variant="cancel"
                        className="w-full sm:w-auto"
                     >
                        Cancelar
                     </Btn>
                  </motion.div>
               </motion.div>
            </motion.div>
         </motion.div>
      </AnimatePresence>
   );
}
