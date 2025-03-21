import Link from "next/link";
import Image from "next/image";
import Modal from "./Modal";

const Header = () => {
   return (
      <header className="bg-bee-yellow-600 text-bee-dark-600 py-2 sticky top-0 left-0 w-full z-50 shadow-lg">
         <div className="mx-auto px-6 flex justify-between items-center">
            <Link href="/" className="flex items-center gap-0">
               <Image
                  src="/image/logo.svg"
                  alt="Logo"
                  className="w-16"
                  width={60}
                  height={60}
               />
               <h1 className="sm:text-5xl font-black italic hidden sm:block">
                  BeeFleet
               </h1>
            </Link>
            <Modal />
         </div>
      </header>
   );
};

export default Header;
