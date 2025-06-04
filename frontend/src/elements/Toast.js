import { motion, AnimatePresence } from "framer-motion";
import Icon from "./Icon";

export default function Toast({
   message,
   description,
   type = "success",
   onClose,
}) {
   const colors = {
      success: "border-green-500 text-green-500",
      error: "border-red-500 text-red-500",
      warning: "border-orange-400 text-orange-400",
   };
   const icon = {
      success: "check",
      error: "error",
      warning: "warning",
   };

   return (
      <AnimatePresence>
         <motion.div
            initial={{ opacity: 0, y: -50, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            transition={{ type: "spring", stiffness: 100, damping: 15 }}
            className={"fixed top-5 right-5 z-50 min-w-[300px]"}
         >
            <motion.div
               whileHover={{ scale: 1.02 }}
               className={`px-4 py-3 border-2 rounded-lg shadow-lg bg-bee-dark-100 dark:bg-bee-dark-800 ${colors[type]}`}
            >
               <div className="flex items-center justify-between gap-3">
                  <Icon
                     name={icon[type]}
                     className={`size-7 ${colors[type]}`}
                     strokeWidth={2}
                  />
                  <div className="flex flex-col flex-1">
                     <span className="font-black text-2xl">{message}</span>
                     {description && (
                        <span className="font-semibold">{description}</span>
                     )}
                  </div>
                  <motion.button
                     whileHover={{ scale: 1.1 }}
                     whileTap={{ scale: 0.9 }}
                     onClick={onClose}
                     className="p-1 hover:bg-bee-dark-200 dark:hover:bg-bee-dark-700 rounded-full"
                  >
                     <Icon name="xMark" className="size-6" strokeWidth={2} />
                  </motion.button>
               </div>
            </motion.div>
         </motion.div>
      </AnimatePresence>
   );
}
