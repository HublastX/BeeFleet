"use client";
import ReportForm from "@/components/reportsForm/mainReport";
import Icon from "@/elements/Icon";
import { useRouter } from "next/navigation";
export default function Relatorios() {
   const router = useRouter();
   return (
      <div className="fixed inset-0 z-50 flex items-center justify-center backdrop-blur-md">
         <div className="bg-white dark:bg-bee-dark-800 p-6 rounded-2xl border border-bee-dark-300 dark:border-bee-dark-400 shadow-lg self-center min-w-[350px] max-w-full">
            <div className="flex items-center gap-3 mb-6">
               <h2 className="text-2xl font-bold">Gerar Relatorio</h2>
               <button
                  className="ml-auto text-gray-400 hover:text-gray-700 dark:hover:text-white text-2xl font-bold focus:outline-none"
                  aria-label="Fechar"
                  onClick={() => router.back()}
                  type="button"
               >
                  <Icon name="xMark" className="size-5" strokeWidth={5} />
               </button>
            </div>
            <ReportForm />
         </div>
      </div>
   );
}
