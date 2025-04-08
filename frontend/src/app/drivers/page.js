"use client";
import withAuth from "@/utils/withAuth";
import Link from "next/link";
import Btn from "@/elements/btn";
import Table from "../../components/table/userTable";
function Driver() {
   return (
      <div>
         <div className="p-2 mb-3">
            <Link href="drivers/create">
               <Btn
                  variant="primary"
                  texto="Adicionar Motorista"
                  className="flex flex-row-reverse text-center font-bold text-lg gap-3"
               />
            </Link>
         </div>
         <div className="space-y-6 border-t border-bee-dark-300 dark:border-bee-dark-400 py-5 sm:px-3 md:px-5 lg:px-6">
            <Table />
         </div>
      </div>
   );
}
export default withAuth(Driver);
