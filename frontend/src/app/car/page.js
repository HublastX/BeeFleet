import Link from "next/link";
import Btn from "@/elements/btn";
import Icon from "@/elements/Icon";
export default function Car() {
    return (
        <div className="grid grid-cols-12 gap-4 md:gap-6">
        <div className="col-span-12 xl:col-span-5">
            <h1>pagina dos carros</h1>
            <Link href="/createCar" ><Btn type="primary" texto='Adicionar' className="flex flex-row-reverse gap-2"><Icon name="plus" className="h-6 w-6" strokeWidth={3} /></Btn></Link>
        </div>
     </div>
    );
 }
 