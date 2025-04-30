import { useEffect, useState } from "react";

const CardSkeleton = () => {
   const [columns, setColumns] = useState(5);

   useEffect(() => {
      const updateColumns = () => {
         setColumns(window.innerWidth < 640 ? 3 : 5);
      };

      updateColumns();
      window.addEventListener("resize", updateColumns);
      return () => window.removeEventListener("resize", updateColumns);
   }, []);

   return (
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 p-4">
         {[...Array(10)].map((_, i) => (
            <div
               key={i}
               className="animate-pulse bg-bee-dark-100 dark:bg-bee-dark-800 p-4 rounded-2xl shadow hover:shadow-xl transition duration-300 flex flex-col gap-4"
            >
               <div className="w-full h-40 bg-gray-300 dark:bg-gray-700 rounded-lg" />
               <div className="h-4 bg-gray-300 dark:bg-gray-700 rounded w-3/4" />
               <div className="h-4 bg-gray-300 dark:bg-gray-700 rounded w-1/2" />
            </div>
         ))}
      </div>
   );
};

export default CardSkeleton;
