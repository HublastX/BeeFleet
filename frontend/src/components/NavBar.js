import Link from "next/link";
import Image from "next/image";

const NavBar = () => {
   return (
      <aside className="mt-16 flex flex-col lg:mt-0 top-0 px-5  bg-white dark:bg-bee-dark-800 dark:border-bee-dark-400 text-bee-dark-600 h-screen transition-all duration-300 ease-in-out z-50 border-r border-bee-dark-100">
         <div className="mx-auto flex justify-between items-center">
            <Link href="/" className="flex items-center gap-0 mt-1 p-2">
               <Image
                  src="/image/logo.svg"
                  alt="Logo"
                  className="w-16"
                  width={60}
                  height={60}
               />
               <h1 className="text-3xl font-bold italic dark:text-white">
                  BeeFleet
               </h1>
            </Link>
         </div>
      </aside>
   );
};

export default NavBar;
