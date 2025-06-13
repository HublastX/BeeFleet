import React from "react";

export default function DetailSkeleton() {
   return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 animate-pulse">
         <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8">
            <div>
               <div className="flex items-center gap-4">
                  <div className="h-8 bg-gray-200 dark:bg-gray-700 rounded w-48" />
                  <div className="h-6 bg-gray-200 dark:bg-gray-700 rounded w-24" />
               </div>
               <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-40 mt-1" />
            </div>
            <div className="h-10 bg-gray-200 dark:bg-gray-700 rounded w-24" />
         </div>

         <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-3 grid grid-cols-1 lg:grid-cols-3 gap-8">
               <div className="bg-white dark:bg-gray-800 h-fit rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 overflow-hidden">
                  <div className="h-48 bg-gray-200 dark:bg-gray-700" />
                  <div className="p-6">
                     <div className="space-y-6">
                        {Array.from({ length: 3 }).map((_, i) => (
                           <div key={i}>
                              <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-20 mb-1" />
                              <div className="h-6 bg-gray-200 dark:bg-gray-700 rounded w-32" />
                           </div>
                        ))}
                     </div>
                  </div>
               </div>

               <div className="lg:col-span-2 bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-6">
                  <div className="h-6 bg-gray-200 dark:bg-gray-700 rounded w-32 mb-6" />
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                     {Array.from({ length: 7 }).map((_, i) => (
                        <div key={i} className={i === 6 ? "md:col-span-2" : ""}>
                           <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-24 mb-1" />
                           <div className="h-6 bg-gray-200 dark:bg-gray-700 rounded w-40" />
                        </div>
                     ))}
                  </div>
               </div>
            </div>

            <div className="lg:col-span-3 bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-6">
               <div className="flex justify-between items-center mb-6">
                  <div className="h-6 bg-gray-200 dark:bg-gray-700 rounded w-48" />
                  <div className="h-6 bg-gray-200 dark:bg-gray-700 rounded w-32" />
               </div>
               <div className="h-64 bg-gray-200 dark:bg-gray-700 rounded" />
            </div>
         </div>
      </div>
   );
}
