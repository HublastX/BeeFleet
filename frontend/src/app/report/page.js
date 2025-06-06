"use client";
import { Suspense } from "react";
import ReportForm from "@/components/reportsForm/mainReport";
import Icon from "@/elements/Icon";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";

export const dynamic = "force-dynamic";

export default function Relatorios() {
   const router = useRouter();
   return (
      <Suspense
         fallback={
            <div>
               <Icon name="circle" className="animate-spin" />
            </div>
         }
      >
         <div className="fixed inset-0 z-50">
            <motion.div
               initial={{ opacity: 0 }}
               animate={{ opacity: 1 }}
               exit={{ opacity: 0 }}
               className="absolute inset-0 bg-black/30"
               onClick={() => router.back()}
            />

            <motion.div
               initial={{ y: "100%" }}
               animate={{ y: 0 }}
               exit={{ y: "100%" }}
               transition={{
                  type: "spring",
                  damping: 25,
                  stiffness: 300,
               }}
               className="absolute bottom-0 left-0 right-0 md:bottom-auto md:right-auto md:top-1/2 md:left-1/2 md:-translate-x-1/2 md:-translate-y-1/2"
            >
               <motion.div
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ delay: 0.1 }}
                  className="bg-white dark:bg-gray-800 rounded-t-xl md:rounded-xl shadow-xl border-t md:border border-gray-200 dark:border-gray-700 p-4 md:p-6 w-full md:max-w-2xl"
               >
                  <div className="flex items-center gap-3 mb-6">
                     <h2 className="text-2xl font-bold">Gerar Relatório</h2>
                     <motion.button
                        whileHover={{ scale: 1.1, rotate: 90 }}
                        whileTap={{ scale: 0.9 }}
                        onClick={() => router.back()}
                        className="ml-auto text-gray-400 hover:text-gray-700 dark:hover:text-white text-2xl font-bold focus:outline-none"
                        aria-label="Fechar"
                        type="button"
                     >
                        <Icon name="xMark" className="size-5" strokeWidth={5} />
                     </motion.button>
                  </div>
                  <ReportForm />
               </motion.div>
            </motion.div>
         </div>
      </Suspense>
   );
}
