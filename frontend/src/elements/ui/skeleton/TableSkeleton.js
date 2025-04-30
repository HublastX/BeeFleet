import { useEffect, useState } from "react";

const TableSkeleton = () => {
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
      <table className="min-w-full divide-y divide-bee-dark-300 dark:divide-bee-dark-400">
         <thead className="bg-bee-dark-100 dark:bg-bee-dark-800">
            <tr>
               {[...Array(columns)].map((_, i) => (
                  <th key={i} className="px-5 py-3 text-left text-gray-400">
                     <div className="h-4 bg-gray-300 dark:bg-gray-600 rounded w-2/4 animate-pulse" />
                  </th>
               ))}
            </tr>
         </thead>
         <tbody className="divide-y divide-bee-dark-300 dark:divide-bee-dark-400">
            {[...Array(4)].map((_, rowIdx) => (
               <tr key={rowIdx}>
                  {[...Array(columns)].map((_, colIdx) => (
                     <td key={colIdx} className="px-5 py-4">
                        <div
                           className={`h-4 rounded animate-pulse ${
                              (colIdx + rowIdx) % 3 === 0
                                 ? "bg-gray-200 dark:bg-gray-500 w-1/2"
                                 : (colIdx + rowIdx) % 3 === 1
                                 ? "bg-gray-300 dark:bg-gray-600 w-3/4"
                                 : "bg-gray-200 dark:bg-gray-500 w-full"
                           }`}
                        />
                     </td>
                  ))}
               </tr>
            ))}
         </tbody>
      </table>
   );
};

export default TableSkeleton;