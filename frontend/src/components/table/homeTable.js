import {
   Table,
   TableBody,
   TableCell,
   TableHeader,
   TableRow,
} from "@/elements/ui/table";
import Badge from "@/elements/ui/badge/Badge";
import { format } from "date-fns";
import { ptBR } from "date-fns/locale";
import useEvents from "@/hooks/useEvent";

export default function RecentEvent() {
   const { events, carregando, erro } = useEvents();

   const formatDate = (dateString) => {
      if (!dateString) return "-";
      const date = new Date(dateString);
      return format(date, "dd/MM", { locale: ptBR });
   };

   return (
      <div className="px-6 max-w-full overflow-hidden rounded-xl border border-bee-dark-300 bg-bee-dark-100 dark:border-bee-dark-400 dark:bg-bee-dark-800">
         <h1 className="mt-3 text-xl font-semibold text-gray-800 dark:text-white/90">
            Últimos eventos
         </h1>

         {carregando ? (
            <div className="py-4 text-center">Carregando eventos...</div>
         ) : erro ? (
            <div className="py-4 text-center text-red-500">{erro}</div>
         ) : (
            <div className="relative overflow-x-auto w-full no-scrollbar">
               <Table>
                  <TableHeader className="border-b border-bee-dark-300 dark:border-bee-dark-400 text-bee-dark-600 dark:text-bee-alert-500">
                     <TableRow>
                        <TableCell
                           isHeader
                           className="py-3 font-medium text-gray-500 text-start dark:text-gray-400 min-w-[100px]"
                        >
                           Motorista
                        </TableCell>
                        <TableCell
                           isHeader
                           className="py-3 font-medium text-gray-500 text-start dark:text-gray-400 min-w-[100px]"
                        >
                           Carro
                        </TableCell>
                        <TableCell
                           isHeader
                           className="table-cell py-3 font-medium text-gray-500 text-start dark:text-gray-400 min-w-[80px]"
                        >
                           Data
                        </TableCell>
                        <TableCell
                           isHeader
                           className="sticky right-0 bg-bee-dark-100 dark:bg-bee-dark-800 py-3 px-2 text-center font-medium  text-gray-500 dark:text-gray-400 shadow-lg lg:shadow-none"
                        >
                           Status
                        </TableCell>
                     </TableRow>
                  </TableHeader>

                  <TableBody className="divide-y divide-bee-dark-300 dark:divide-bee-dark-400 text-bee-dark-600 dark:text-bee-alert-500">
                     {events.length > 0 ? (
                        events
                           .sort(
                              (a, b) =>
                                 new Date(b.createdAt) - new Date(a.createdAt)
                           )
                           .slice(0, 7)
                           .map((event) => {
                              return (
                                 <TableRow
                                    key={event.id}
                                 >
                                    <TableCell className="table-cell py-3 pl-1 max-w-[80px] truncate">
                                       {event.driver?.name ||
                                          "Motorista não informado"}
                                    </TableCell>
                                    <TableCell className="table-cell py-3 max-w-[80px] truncate">
                                       {event.car?.plate ||
                                          "Carro não informado"}
                                    </TableCell>
                                    <TableCell className="table-cell py-3 max-w-[80px] truncate">
                                       {formatDate(event.createdAt)}
                                    </TableCell>
                                    <TableCell className="sticky right-0 px-2 bg-bee-dark-100 dark:bg-bee-dark-800 py-3 text-center border-l border-bee-dark-300 dark:border-bee-dark-400 shadow-lg lg:shadow-none">
                                       <Badge
                                          size="sm"
                                          color={
                                             event.eventType !== "CHECKOUT"
                                                ? "success"
                                                : "error"
                                          }
                                          className="text-nowrap"
                                       >
                                          {event.eventType === "CHECKOUT"
                                             ? "Em uso"
                                             : "Finalizado"}
                                       </Badge>
                                    </TableCell>
                                 </TableRow>
                              );
                           })
                     ) : (
                        <TableRow>
                           <TableCell colSpan={4} className="py-4 text-center">
                              Nenhum evento recente encontrado
                           </TableCell>
                        </TableRow>
                     )}
                  </TableBody>
               </Table>
            </div>
         )}
      </div>
   );
}
