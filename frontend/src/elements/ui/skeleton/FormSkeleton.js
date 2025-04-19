const FormSkeleton = () => {
   return (
      <div className="max-w-3xl mx-auto">
         <div className="space-y-6">
            {[...Array(4)].map((_, i) => (
               <div key={i} className="space-y-2">
                  <div className="h-4 bg-gray-300 dark:bg-gray-700 rounded w-1/6 animate-pulse"></div>
                  <div className="h-10 bg-gray-200 dark:bg-gray-800 rounded w-full animate-pulse"></div>
               </div>
            ))}
            <div className="h-10 w-2/5 bg-gray-300 dark:bg-gray-800 rounded animate-pulse"></div>
         </div>
      </div>
   );
};

export default FormSkeleton;
