import Icon from "./Icon";
import Badge from "./ui/badge/Badge";
import { motion } from "framer-motion";

const Card = ({
   icone,
   titulo,
   quantidade,
   estado,
   porcentagem,
   color,
   index = 0,
}) => {
   const colorClasses = {
      purple: {
         border: "border-purple-300 dark:border-purple-400/30",
         text: "text-purple-600 dark:text-purple-400",
         iconBg: "bg-purple-100 dark:bg-purple-800/50",
      },
      blue: {
         border: "border-blue-300 dark:border-blue-400/30",
         text: "text-blue-600 dark:text-blue-400",
         iconBg: "bg-blue-100 dark:bg-blue-800/50",
      },
      green: {
         border: "border-green-300 dark:border-green-400/30",
         text: "text-green-600 dark:text-green-400",
         iconBg: "bg-green-100 dark:bg-green-800/50",
      },
      orange: {
         border: "border-orange-300 dark:border-orange-400/30",
         text: "text-orange-600 dark:text-orange-400",
         iconBg: "bg-orange-100 dark:bg-orange-800/50",
      },
   };
   const colors = colorClasses[color] || colorClasses.purple;

   return (
      <motion.div
         initial={{ opacity: 0, y: 20 }}
         animate={{ opacity: 1, y: 0 }}
         transition={{
            type: "spring",
            stiffness: 260,
            damping: 20,
            delay: index * 0.1,
         }}
         whileHover={{
            transition: { duration: 0.2 },
         }}
         className="p-5 min-w-60 flex md:min-w-auto justify-between rounded-2xl border bg-bee-dark-100 dark:bg-bee-dark-800 border-bee-dark-300 dark:border-bee-dark-400 hover:shadow-lg"
      >
         <div className="gap-5 flex items-center">
            <motion.div
               whileHover={{ rotate: 10 }}
               transition={{ type: "spring", stiffness: 400, damping: 10 }}
               className={`flex h-12 w-12 items-center justify-center rounded-xl ${colorClasses[color].iconBg}`}
            >
               <Icon
                  className={`size-6 ${colorClasses[color].text}`}
                  name={icone}
               />
            </motion.div>
            <motion.div
               initial={{ opacity: 0, x: -20 }}
               animate={{ opacity: 1, x: 0 }}
               transition={{ delay: index * 0.1 + 0.2 }}
               className="mt-2 flex items-end justify-between"
            >
               <div>
                  <span className="text-sm font-semibold text-gray-500 dark:text-gray-400">
                     {titulo}
                  </span>
                  <motion.h4
                     initial={{ scale: 0.5 }}
                     animate={{ scale: 1 }}
                     transition={{
                        delay: index * 0.1 + 0.3,
                        type: "spring",
                        stiffness: 300,
                        damping: 15,
                     }}
                     className={`mt-2 text-3xl font-bold ${colorClasses[color].text}`}
                  >
                     {quantidade}
                  </motion.h4>
               </div>
            </motion.div>
         </div>
         {estado === "aumento" && (
            <motion.div
               initial={{ opacity: 0, scale: 0.5 }}
               animate={{ opacity: 1, scale: 1 }}
               transition={{ delay: index * 0.1 + 0.4 }}
               className="self-end"
            >
               <Badge
                  color="success"
                  size="md"
                  className="flex flex-row text-nowrap h-fit p-2 self-end"
               >
                  <Icon name="sCima" className="size-3" strokeWidth={3} />
                  {porcentagem}%
               </Badge>
            </motion.div>
         )}
         {estado === "baixa" && (
            <motion.div
               initial={{ opacity: 0, scale: 0.5 }}
               animate={{ opacity: 1, scale: 1 }}
               transition={{ delay: index * 0.1 + 0.4 }}
               className="self-end"
            >
               <Badge
                  color="error"
                  size="md"
                  className="flex flex-row text-nowrap h-fit p-2 self-end"
               >
                  <Icon name="sBaixo" className="size-3" strokeWidth={3} />
                  {porcentagem}%
               </Badge>
            </motion.div>
         )}
         {estado === "estavel" && (
            <motion.p
               initial={{ opacity: 0 }}
               animate={{ opacity: 1 }}
               transition={{ delay: index * 0.1 + 0.4 }}
               className="text-xl font-black text-gray-400 italic self-end"
            >
               -
            </motion.p>
         )}
      </motion.div>
   );
};
export default Card;
