import useDrivers from "@/hooks/useDrivers";
import useCar from "@/hooks/useCar";
import Icon from "@/elements/Icon";
import useEvents from "@/hooks/useEvent";
import useAuth from "@/hooks/useAuth";

export default function ReportList({ open, onClose, tipo, onSelect }) {
   const { motoristas } = useDrivers();
   const { carro } = useCar();
   const { events } = useEvents();
   const { gestores } = useAuth();

   let lista = [];
   let titulo = "";

   if (tipo === "motoristas") {
      lista = motoristas;
      titulo = "Motoristas disponíveis";
   } else if (tipo === "carros") {
      lista = carro;
      titulo = "Veículos disponíveis";
   } else if (tipo === "gestores") {
      lista = gestores;
      titulo = "Gestores disponíveis";
   } else if (tipo === "eventos") {
      lista = events
         ?.filter((e) => e.eventType === "RETURN")
         .map((event) => {
            const motorista = motoristas.find((m) => m.id === event.driverId);
            const carroInfo = carro.find((c) => c.id === event.carId);
            return {
               ...event,
               motoristaName: motorista?.name || "Motorista não encontrado",
               carroModel: carroInfo
                  ? `${carroInfo.brand} ${carroInfo.model}`
                  : "Veículo não encontrado",
               formattedTime: new Date(event.endedAt).toLocaleTimeString([], {
                  hour: "2-digit",
                  minute: "2-digit",
               }),
            };
         });
      titulo = "Eventos disponíveis";
   }

   if (!open) return null;

   return (
      <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm transition-opacity duration-300">
         <div className="bg-white dark:bg-bee-dark-800 rounded-xl p-6 w-full max-w-lg shadow-2xl relative border border-bee-dark-300 dark:border-bee-dark-400">
            <button
               className="absolute top-4 right-4 p-1 rounded-xl hover:bg-gray-100 dark:hover:bg-bee-dark-400 transition-colors"
               onClick={onClose}
               aria-label="Fechar modal"
            >
               <Icon name="xMark" className="size-6" />
            </button>

            <h2 className="text-2xl font-bold mb-6 text-gray-800 dark:text-gray-100">
               {titulo}
               <span className="ml-2 text-sm font-normal text-gray-500 dark:text-gray-400">
                  ({lista?.length || 0} {lista?.length === 1 ? "item" : "itens"}
                  )
               </span>
            </h2>

            <div className="max-h-[70vh] overflow-hidden">
               <ul className="space-y-2 pr-2 max-h-[65vh] overflow-y-auto custom-scrollbar">
                  {(!lista || lista.length === 0) && (
                     <li className="text-center py-6 text-gray-500 dark:text-gray-400 flex flex-col items-center">
                        <Icon
                           name="inbox"
                           className="size-10 mb-2 opacity-60"
                        />
                        <span>Nenhum item disponível</span>
                     </li>
                  )}

                  {lista?.map((item) => (
                     <li
                        key={item.id}
                        className="border border-bee-dark-300 dark:border-bee-dark-400 p-4 rounded-lg hover:bg-bee-alert-500 dark:hover:bg-bee-alert-600 transition-all cursor-pointer group hover:shadow-sm"
                        onClick={() => {
                           onSelect(item);
                           onClose();
                        }}
                     >
                        {tipo === "motoristas" ? (
                           <div className="flex items-start gap-4">
                              <div className="bg-bee-purple-100 dark:bg-bee-purple-200 p-2 rounded-lg">
                                 <Icon
                                    name="user"
                                    className="size-5 text-bee-purple-500"
                                 />
                              </div>
                              <div className="flex-1 min-w-0">
                                 <div className="flex justify-between items-start">
                                    <span className="font-semibold text-gray-800 dark:text-gray-100 truncate">
                                       {item.name}
                                    </span>
                                 </div>
                                 <div className="mt-1 flex flex-wrap gap-x-4 gap-y-1 text-sm">
                                    <span className="flex items-center text-gray-500 dark:text-gray-400">
                                       <Icon
                                          name="phone"
                                          className="size-3.5 mr-1.5"
                                       />
                                       {item.phone}
                                    </span>
                                    <span className="flex items-center text-gray-500 dark:text-gray-400">
                                       <Icon
                                          name="identidade"
                                          className="size-3.5 mr-1.5"
                                       />
                                       CNH: {item.license}
                                    </span>
                                 </div>
                              </div>
                           </div>
                        ) : tipo === "carros" ? (
                           <div className="flex items-start gap-4">
                              <div className="bg-blue-100 dark:bg-blue-900/30 p-2 rounded-lg">
                                 <Icon
                                    name="car"
                                    className="size-5 text-blue-600 dark:text-blue-400"
                                 />
                              </div>
                              <div className="flex-1 min-w-0">
                                 <div className="flex justify-between items-start">
                                    <span className="font-semibold text-gray-800 dark:text-gray-100">
                                       {item.plate}
                                    </span>
                                 </div>
                                 <div className="mt-1 text-sm font-medium text-gray-700 dark:text-gray-300">
                                    {item.brand} {item.model}
                                 </div>
                                 <div className="mt-1 flex flex-wrap gap-x-4 gap-y-1 text-sm">
                                    <span className="flex items-center text-gray-500 dark:text-gray-400">
                                       <Icon
                                          name="reports"
                                          className="size-3.5 mr-1.5"
                                       />
                                       RENAVAM: {item.renavam}
                                    </span>
                                    {item.year && (
                                       <span className="flex items-center text-gray-500 dark:text-gray-400">
                                          <Icon
                                             name="calendar"
                                             className="size-3.5 mr-1.5"
                                          />
                                          {item.year}
                                       </span>
                                    )}
                                 </div>
                              </div>
                           </div>
                        ) : tipo === "gestores" ? (
                           <div className="flex items-start gap-4">
                              <div className="bg-orange-100 dark:bg-orange-900/30 p-2 rounded-lg">
                                 <Icon
                                    name="gestor"
                                    className="size-5 text-orange-600 dark:text-orange-400"
                                 />
                              </div>
                              <div className="flex-1 min-w-0">
                                 <div className="flex justify-between items-start">
                                    <span className="font-semibold text-gray-800 dark:text-gray-100 truncate">
                                       {item.name}
                                    </span>
                                 </div>
                                 <div className="mt-1 flex flex-wrap gap-x-4 gap-y-1 text-sm">
                                    <span className="flex items-center text-gray-500 dark:text-gray-400">
                                       <Icon
                                          name="email"
                                          className="size-3.5 mr-1.5"
                                       />
                                       {item.email}
                                    </span>
                                 </div>
                              </div>
                           </div>
                        ) : tipo === "eventos" ? (
                           <div className="flex items-start gap-4">
                              <div className="bg-green-100 dark:bg-green-900/30 p-2 rounded-lg">
                                 <Icon
                                    name="evento"
                                    className="size-5 text-green-600 dark:text-green-400"
                                 />
                              </div>
                              <div className="flex-1 min-w-0">
                                 <div className="flex justify-between items-start">
                                    <span className="font-semibold text-gray-800 dark:text-gray-100">
                                       {item.motoristaName} - {item.carroModel}
                                    </span>
                                 </div>
                                 <div className="mt-1 flex flex-wrap gap-x-4 gap-y-1 text-sm">
                                    <span className="flex items-center text-gray-500 dark:text-gray-400">
                                       <Icon
                                          name="calendar"
                                          className="size-3.5 mr-1.5"
                                       />
                                       {new Date(
                                          item.endedAt
                                       ).toLocaleDateString()}
                                    </span>
                                    <span className="flex items-center text-gray-500 dark:text-gray-400">
                                       <Icon
                                          name="clock"
                                          className="size-3.5 mr-1.5"
                                       />
                                       {item.formattedTime}
                                    </span>
                                 </div>
                              </div>
                           </div>
                        ) : null}
                     </li>
                  ))}
               </ul>
            </div>
         </div>
      </div>
   );
}
