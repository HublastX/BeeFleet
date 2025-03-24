const Btn = ({ texto, onClick, className, type, variant = "primary", children }) => {
   const baseClasses =
      " font-semibold  transition-all duration-300 active:scale-95";

   const variants = {
      primary:
         "px-6 py-3 bg-bee-purple-600 text-white hover:bg-bee-purple-700 rounded-xl shadow-md",
      secondary:
         "bg-white border-2 border-bee-dark-300 hover:bg-bee-dark-100 dark:bg-bee-dark-800 dark:border-bee-dark-400 dark:text-white dark:hover:bg-bee-dark-400 rounded-lg w-14 h-14 flex justify-center items-center",
   };

   return (
      <button
         type={type}
         onClick={onClick}
         className={`${baseClasses} ${variants[variant] || variants.primary} ${className}`}
      >
         {texto}
         {children}
      </button>
   );
};

export default Btn;
