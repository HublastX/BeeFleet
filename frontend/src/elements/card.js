import Icon from "./Icon";
import Badge from "./ui/badge/Badge";
const Card = ({ icone, titulo, quantidade, estado, porcentagem, color }) => {
   const colorClasses = {
      purple: {
         border: "border-purple-300 dark:border-purple-400/30",
         text: "text-purple-600 dark:text-purple-400",
         iconBg: "bg-purple-100 dark:bg-purple-800/50",
      },
      blue: {
         border: "border-blue-300 dark:border-blue-400/30",
         text: "text-blue-600 dark:text-blue-400",
         iconBg: "bg-blue-100 dark:bg-blue-800/50",
      },
      green: {
         border: "border-green-300 dark:border-green-400/30",
         text: "text-green-600 dark:text-green-400",
         iconBg: "bg-green-100 dark:bg-green-800/50",
      },
      orange: {
         border: "border-orange-300 dark:border-orange-400/30",
         text: "text-orange-600 dark:text-orange-400",
         iconBg: "bg-orange-100 dark:bg-orange-800/50",
      },
   };
   const colors = colorClasses[color] || colorClasses.purple;

   return (
      <div
         className={`p-5 min-w-60 flex md:min-w-auto justify-between rounded-2xl border ${colorClasses[color].border} bg-bee-dark-100 dark:bg-bee-dark-800 card-hover`}
      >
         <div className=" gap-5 flex items-center">
            <div
               className={`flex h-12 w-12 items-center justify-center rounded-xl ${colorClasses[color].iconBg}`}
            >
               <Icon
                  className={`size-6 ${colorClasses[color].text}`}
                  name={icone}
               />
            </div>
            <div className="mt-2 flex items-end justify-between">
               <div>
                  <span className="text-sm font-semibold text-gray-500 dark:text-gray-400">
                     {titulo}
                  </span>
                  <h4
                     className={`mt-2 text-3xl font-bold ${colorClasses[color].text}`}
                  >
                     {quantidade}
                  </h4>
               </div>
            </div>
         </div>
         {estado === "aumento" && (
            <Badge
               color="success"
               size="md"
               className="flex flex-row text-nowrap h-fit p-2 self-end"
            >
               <Icon name="sCima" className="size-3" strokeWidth={3} />
               {porcentagem}%
            </Badge>
         )}
         {estado === "baixa" && (
            <Badge
               color="error"
               size="md"
               className="flex flex-row text-nowrap h-fit p-2"
            >
               <Icon name="sBaixo" className="size-3" strokeWidth={3} />
               {porcentagem}%
            </Badge>
         )}
         {estado === "estavel" && (
            <p className="text-xl font-black text-gray-400 italic">-</p>
         )}
      </div>
   );
};
export default Card;
