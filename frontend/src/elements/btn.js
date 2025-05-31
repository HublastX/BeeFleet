const Btn = ({ texto, onClick, className, type, variant = "primary", children }) => {
   const baseClasses =
      " transition-all duration-300 active:scale-95";

   const variants = {
      primary:
         "py-3 px-5 bg-bee-purple-600 text-white font-bold text-md hover:bg-bee-purple-700 rounded-lg shadow-md",
      secondary:
         "bg-white border-1 border-bee-dark-300 hover:bg-bee-dark-100 dark:bg-bee-dark-800 dark:border-bee-dark-400 dark:text-white dark:hover:bg-bee-dark-400 rounded-lg w-12 h-12 flex justify-center items-center",
      cancel:
      "bg-transparent px-4 py-2 border border-bee-dark-300 dark:border-bee-dark-400 rounded-lg hover:bg-bee-alert-500 dark:hover:bg-bee-alert-600"
   
      };

   return (
      <button
         type={type}
         onClick={onClick}
         className={`${baseClasses} ${variants[variant] || variants.primary} ${className} `}
      >
         {texto}
         {children}
      </button>
   );
};

export default Btn;
