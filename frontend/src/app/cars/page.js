"use client";
import withAuth from "@/utils/withAuth";
import Link from "next/link";
import Btn from "@/elements/btn";
function Cars() {
   return (
      <div>
         <div className="p-2 mb-3">
            <Link href="/createCar">
               <Btn
                  variant="primary"
                  texto="Adicionar Carro"
                  className="flex flex-row-reverse text-center font-bold text-lg gap-3"
               />
            </Link>
         </div>
      </div>
   );
}
export default withAuth(Cars);
