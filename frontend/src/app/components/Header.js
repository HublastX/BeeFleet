const Header = ({ onOpenModal }) => {
   return (
      <header className="bg-bee-yellow-500 text-bee-dark-600 py-2 fixed top-0 left-0 w-full z-50 shadow-lg">
         <div className="mx-auto px-6 flex justify-between items-center">
            <a href="/" className="flex items-center gap-0">
               <img src="/image/logo.svg" alt="Logo" className="w-16" />
               <h1 className="text-3xl sm:text-5xl font-black italic hidden sm:block">
                  BeeFleet
               </h1>
            </a>

            <button
               onClick={onOpenModal}
               className="rounded bg-bee-purple-600 text-white px-6 py-3 font-semibold shadow-md hover:bg-bee-purple-700 transition-all duration-300 active:scale-95"
            >
               Pedir Carro
            </button>
         </div>
      </header>
   );
};

export default Header;
