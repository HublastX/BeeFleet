import Icon from "@/elements/Icon";
const Pagination = ({
   currentPage,
   totalPages,
   onPageChange,
   totalItems,
}) => {
   const getPages = (currentPage, totalPages) => {
      if (totalPages <= 3) {
         return Array.from({ length: totalPages }, (_, i) => i + 1);
      }

      if (currentPage === 1) return [1, 2, 3];
      if (currentPage === totalPages)
         return [totalPages - 2, totalPages - 1, totalPages];

      return [currentPage - 1, currentPage, currentPage + 1];
   };

   const pagesAroundCurrent = getPages(currentPage, totalPages);

   return (
      <div className="flex items-center justify-center w-full md:justify-between">
         <span className="text-sm text-gray-500 dark:text-gray-400 ml-4 hidden md:block">
            Total de itens: {totalItems}
         </span>
         <div className="flex items-center">
            <button
               onClick={() => onPageChange(currentPage - 1)}
               disabled={currentPage === 1}
               className="mr-2.5 flex items-center h-10 justify-center rounded-lg border border-gray-300 bg-white px-3.5 sm:px-3 py-2.5 text-gray-700 shadow-theme-xs hover:bg-gray-50 disabled:opacity-50 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:hover:bg-white/[0.03] text-sm"
            >
               <Icon name="sEsquerda" strokeWidth={2} className="w-5 h-5" />
            </button>

            <div className="flex items-center gap-2">
               {pagesAroundCurrent[0] > 1 && (
                  <>
                     <button
                        onClick={() => onPageChange(1)}
                        className="text-bee-dark-600 dark:text-bee-alert-500 hover:text-brand-500 text-sm"
                     >
                        1
                     </button>
                     {pagesAroundCurrent[0] > 2 && (
                        <span className="px-2">...</span>
                     )}
                  </>
               )}

               {pagesAroundCurrent.map((page) => (
                  <button
                     key={page}
                     onClick={() => onPageChange(page)}
                     className={`px-4 py-2 rounded ${
                        currentPage === page
                           ? "bg-brand-500 text-gray-500 "
                           : "text-bee-dark-600 dark:text-bee-alert-500"
                     } flex w-10 items-center justify-center h-10 rounded-lg text-sm font-medium hover:bg-blue-500/[0.08] hover:text-brand-500 dark:hover:text-brand-500`}
                  >
                     {page}
                  </button>
               ))}

               {pagesAroundCurrent[2] < totalPages && (
                  <>
                     {pagesAroundCurrent[2] < totalPages - 1 && (
                        <span className="px-2">...</span>
                     )}
                     <button
                        onClick={() => onPageChange(totalPages)}
                        className="text-bee-dark-600 dark:text-bee-alert-500 hover:text-brand-500 text-sm"
                     >
                        {totalPages}
                     </button>
                  </>
               )}
            </div>

            <button
               onClick={() => onPageChange(currentPage + 1)}
               disabled={currentPage === totalPages}
               className="ml-2.5 flex items-center justify-center rounded-lg border border-gray-300 bg-white px-3.5 sm:px-3 py-2.5 text-gray-700 shadow-theme-xs text-sm hover:bg-gray-50 h-10 disabled:opacity-50 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:hover:bg-white/[0.03]"
            >
               <Icon name="sDireita" strokeWidth={2} className="w-5 h-5" />
            </button>
         </div>
      </div>
   );
};
export default Pagination;
