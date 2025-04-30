import TableSkeleton from "./TableSkeleton";

function HomeSkeleton() {
   return (
      <div className="grid grid-cols-12 gap-4 md:gap-6 animate-pulse">
         <div className="col-span-12 space-y-5 xl:col-span-6">
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:gap-6">
               {[...Array(4)].map((_, idx) => (
                  <div
                     key={idx}
                     className="p-5 rounded-2xl border border-bee-dark-300 bg-bee-dark-100 dark:border-bee-dark-400 dark:bg-bee-dark-800"
                  >
                     <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-gray-200 dark:bg-gray-700 mb-4"></div>
                     <div className="space-y-2">
                        <div className="h-4 w-24 rounded bg-gray-300 dark:bg-gray-600"></div>
                        <div className="h-8 w-36 rounded bg-gray-300 dark:bg-gray-600"></div>
                     </div>
                  </div>
               ))}
            </div>

            <div className="overflow-hidden rounded-2xl p-5 sm:px-6 sm:pt-6 border border-bee-dark-300 bg-bee-dark-100 dark:border-bee-dark-400 dark:bg-bee-dark-800 space-y-4">
               <div className="h-5 w-32 rounded bg-gray-300 dark:bg-gray-600"></div>
               <div className="h-10 w-full rounded bg-gray-200 dark:bg-gray-700"></div>
            </div>
         </div>

         <div className="col-span-12 xl:col-span-6">
            <TableSkeleton />
         </div>
      </div>
   );
}

export default HomeSkeleton;
