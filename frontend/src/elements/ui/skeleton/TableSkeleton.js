const TableSkeleton = () => {
   return (
      <table className="min-w-full divide-y divide-gray-100 dark:divide-white/[0.05]">
         <thead className="bg-white dark:bg-bee-dark-800">
            <tr>
               {[...Array(5)].map((_, i) => (
                  <th
                     key={i}
                     className="px-5 py-3 text-left text-theme-xs text-gray-400"
                  >
                     <div className="h-4 bg-gray-300 dark:bg-bee-dark-500 rounded w-3/4 animate-pulse"></div>
                  </th>
               ))}
            </tr>
         </thead>
         <tbody className="divide-y divide-gray-100 dark:divide-white/[0.05]">
            {[...Array(4)].map((_, rowIdx) => (
               <tr key={rowIdx} className="animate-pulse">
                  {[...Array(5)].map((_, colIdx) => (
                     <td key={colIdx} className="px-5 py-4">
                        <div className="h-4 bg-gray-200 dark:bg-bee-dark-500 rounded w-full"></div>
                     </td>
                  ))}
               </tr>
            ))}
         </tbody>
      </table>
   );
};

export default TableSkeleton;
