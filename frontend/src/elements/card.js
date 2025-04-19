import Icon from "./Icon";
import Badge from "./ui/badge/Badge";
const Card = ({ icone, titulo, quantidade, estado }) => {
   return (
      <div className="p-5 rounded-2xl border border-bee-dark-300 bg-bee-dark-100 dark:border-bee-dark-400 dark:bg-bee-dark-800">
         <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-gray-100 dark:bg-gray-800">
            <Icon
               className="text-bee-dark-600 size-6 dark:text-bee-alert-500"
               name={icone}
            />
         </div>

         <div className="mt-5 flex items-end justify-between">
            <div>
               <span className="text-sm font-semibold text-bee-dark-600 dark:text-gray-400">
                  {titulo}
               </span>
               <h4 className="mt-2 text-3xl font-bold text-bee-dark-600 dark:text-bee-alert-500">
                  {quantidade}
               </h4>
            </div>
            {estado === "aumento" && (
               <Badge color="success" size="md">
                  <Icon name="sCima" className="size-3" strokeWidth={3} />
                  9.05%
               </Badge>
            )}
            {estado === "baixa" && (
               <Badge color="error" size="md"  >
                  <Icon name="sBaixo" className="size-3" strokeWidth={3} />
                  9.05%
               </Badge>
            )}
         </div>
      </div>
   );
};
export default Card;
