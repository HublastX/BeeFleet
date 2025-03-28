"use client";
import Btn from "@/elements/btn";
import Link from "next/link";
export default function Home() {
   return (
      <div className="grid grid-cols-12 gap-4 md:gap-6">
         <div className="col-span-12 xl:col-span-5">
            <Link href="/login">
               <Btn variant="secondary" texto="teste" />
            </Link>
         </div>
      </div>
   );
}
