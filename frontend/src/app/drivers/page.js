import Link from "next/link";
import Btn from "@/elements/btn";
import Icon from "@/elements/Icon";
import Table from "../../components/table/userTable";
export default function Driver() {
   return (
      <div>
         <div className="p-2 mb-3">
            <Link href="/createUser">
               <Btn
                  variant="primary"
                  texto="Adicionar Motorista"
                  className="flex flex-row-reverse text-center font-bold text-lg gap-3"
               />
            </Link>
         </div>
         <div className="space-y-6 border-t border-bee-dark-300 p-5 dark:border-bee-dark-400 sm:p-6">
            <Table />
         </div>
      </div>
   );
}