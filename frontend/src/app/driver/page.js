import Link from "next/link";
import Btn from "@/elements/btn";
import Icon from "@/elements/Icon";
export default function Driver() {
    return (
        <div className="grid grid-cols-12 gap-4 md:gap-6">
        <div className="col-span-12 xl:col-span-5">
            <h1>pagina dos motoristas</h1>
            <Link href="/createDriver" ><Btn type="primary" texto='Adicionar' className="flex flex-row-reverse gap-2"><Icon name="addUser" className="h-6 w-6" /></Btn></Link>
        </div>
     </div>
    );
 }
 