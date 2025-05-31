import React from "react";

const AdminSkeleton = () => {
   return (
      <div className="animate-pulse">
         {/* Botões de tipo */}
         <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-8">
            {[1, 2, 3, 4].map((item) => (
               <div
                  key={item}
                  className="h-24 bg-gray-200 dark:bg-gray-700 rounded-xl"
               />
            ))}
         </div>

         {/* Tabela */}
         <div className="overflow-hidden rounded-xl border border-gray-200 dark:border-gray-600">
            <div className="bg-white dark:bg-gray-800">
               {/* Cabeçalho da tabela */}
               <div className="bg-gray-50 dark:bg-gray-700 px-6 py-4 grid grid-cols-12 gap-4">
                  <div className="col-span-2">
                     <div className="h-4 bg-gray-200 dark:bg-gray-600 rounded" />
                  </div>
                  <div className="col-span-7">
                     <div className="h-4 bg-gray-200 dark:bg-gray-600 rounded" />
                  </div>
                  <div className="col-span-3">
                     <div className="h-4 bg-gray-200 dark:bg-gray-600 rounded" />
                  </div>
               </div>

               {/* Linhas da tabela */}
               {[1, 2, 3, 4, 5].map((item) => (
                  <div
                     key={item}
                     className="px-6 py-4 border-t border-gray-200 dark:border-gray-600 grid grid-cols-12 gap-4"
                  >
                     <div className="col-span-2">
                        <div className="h-4 bg-gray-100 dark:bg-gray-700 rounded" />
                     </div>
                     <div className="col-span-7">
                        <div className="h-4 bg-gray-100 dark:bg-gray-700 rounded" />
                     </div>
                     <div className="col-span-3">
                        <div className="h-8 w-24 bg-gray-100 dark:bg-gray-700 rounded-lg" />
                     </div>
                  </div>
               ))}
            </div>
         </div>
      </div>
   );
};

export default AdminSkeleton;
