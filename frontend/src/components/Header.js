import Modal from "./Modal";

const Header = () => {
   return (
      <header className="flex w-full bg-white border-bee-dark-100 z-99999 dark:border-bee-dark-400 dark:bg-bee-dark-800 lg:border-b">
         <div className="flex flex-col items-center justify-between grow lg:flex-row lg:px-6">
            <div className="flex items-center justify-between w-full gap-2 px-3 py-3 border-b border-bee-dark-100 dark:border-bee-dark-400 sm:gap-4 lg:justify-normal lg:border-b-0 lg:px-0 lg:py-4">
               <Modal />
            </div>
         </div>
      </header>
   );
};

export default Header;
