import React from "react";

export default function DetailSkeleton() {
   return (
      <div className="gap-5 flex flex-col animate-pulse">
         <div className="flex flex-col md:flex-row gap-6">
            {/* Card 1: Imagem e placa */}
            <div className="flex flex-col px-4 py-5 items-center gap-4 w-full h-fit md:w-80 bg-gray-100 dark:bg-gray-800 rounded-md border border-gray-300 dark:border-gray-700">
               <div className="relative w-full h-40 rounded-md overflow-hidden bg-gray-200 dark:bg-gray-700" />
               {/* <div className="bg-gray-100 w-full p-3 rounded-md shadow-sm border-t-8 border-blue-700">
                  <div className="h-8 bg-gray-200 rounded w-3/4 mx-auto" />
               </div> */}
            </div>
            {/* Card 2: Detalhes do carro */}
            <div className="flex flex-col w-full md:px-4 px-0 py-5 gap-6 bg-transparent md:bg-gray-100 md:dark:bg-gray-800 rounded-md md:border border-gray-300 dark:border-gray-700">
               <div className="flex justify-between items-center pb-3 text-center border-b-2 dark:border-gray-700">
                  <div className="h-8 bg-gray-200 rounded w-1/2" />
                  <div className="h-6 bg-gray-200 rounded w-20" />
               </div>
               <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {Array.from({ length: 8 }).map((_, i) => (
                     <div key={i} className="flex flex-col gap-2">
                        <div className="h-4 bg-gray-200 rounded w-1/3" />
                        <div className="h-6 bg-gray-200 rounded w-2/3" />
                     </div>
                  ))}
               </div>
            </div>
         </div>
         <div className="h-40 bg-gray-200 dark:bg-gray-700 rounded-md" />
      </div>
   );
}
