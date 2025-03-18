import Link from "next/link";
import Image from "next/image";
import Btn from "../elements/btn";

const Header = ({ onOpenModal }) => {
   return (
      <header className="bg-bee-yellow-500 text-bee-dark-600 py-2 fixed top-0 left-0 w-full z-50 shadow-lg">
         <div className="mx-auto px-6 flex justify-between items-center">
            <Link href="/" className="flex items-center gap-0">
               <Image
                  src="/image/logo.svg"
                  alt="Logo"
                  className="w-16"
                  width={64}
                  height={64}
               />
               <h1 className="text-3xl sm:text-5xl font-black italic hidden sm:block">
                  BeeFleet
               </h1>
            </Link>
            <Btn texto="Solicitar Carro" onClick={onOpenModal}/>
         </div>
      </header>
   );
};

export default Header;
