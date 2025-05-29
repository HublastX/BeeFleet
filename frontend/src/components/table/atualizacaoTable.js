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
import useCar from "@/hooks/useCar";
import useDrivers from "@/hooks/useDrivers";
import useAuth from "@/hooks/useAuth";

export default function RecentAtualizacao() {
   const { events, carregando: carregandoEventos } = useEvents();
   const { carro, carregando: carregandoCarro } = useCar();
   const { motoristas, carregando: carregandoMotoristas } = useDrivers();
   const { gestores, carregando: carregandoGestores } = useAuth();

   const carregando =
      carregandoEventos ||
      carregandoCarro ||
      carregandoMotoristas ||
      carregandoGestores;

   const formatDate = (dateString) => {
      if (!dateString) return "-";
      const date = new Date(dateString);
      return format(date, "dd/MM HH:mm", { locale: ptBR });
   };

   // Preparar os dados combinados
   const prepareData = () => {
      const allUpdates = [];

      // Eventos
      events.forEach((event) => {
         allUpdates.push({
            categoria: "Evento",
            detalhes: (
               <div className="grid grid-cols-1">
                  {event.driver?.name || ""}
                  <span className="text-sm text-gray-500">
                     {event.car?.plate || ""}
                  </span>
               </div>
            ),

            data: event.updatedAt || event.createdAt,
            subtipo: event.eventType === "RETURN" ? "Chegada" : "Saída",
            rawDate: new Date(event.updatedAt || event.createdAt),
         });
      });

      // Carro
      carro.forEach((carro) => {
         allUpdates.push({
            categoria: "Carro",
            detalhes: (
               <div className="grid grid-cols-1">
                  {carro.brand}
                  <span className="text-sm text-gray-500">{carro.model}</span>
               </div>
            ),
            data: carro.updatedAt || carro.createdAt,
            subtipo: carro.createdAt === carro.updatedAt ? "Criado" : "Editado",
            rawDate: new Date(carro.updatedAt || carro.createdAt),
         });
      });

      // Motoristas
      motoristas.forEach((motorista) => {
         allUpdates.push({
            categoria: "Motorista",
            detalhes: motorista.name,
            data: motorista.updatedAt || motorista.createdAt,
            subtipo:
               motorista.createdAt === motorista.updatedAt
                  ? "Criado"
                  : "Editado",
            rawDate: new Date(motorista.updatedAt || motorista.createdAt),
         });
      });

      // Gestores
      gestores.forEach((gestor) => {
         allUpdates.push({
            categoria: "Gestor",
            detalhes: gestor.name,
            data: gestor.updatedAt || gestor.createdAt,
            subtipo:
               gestor.createdAt === gestor.updatedAt ? "Criado" : "Editado",
            rawDate: new Date(gestor.updatedAt || gestor.createdAt),
         });
      });

      return allUpdates.sort((a, b) => b.rawDate - a.rawDate).slice(0, 8);
   };

   const ultimasAtualizacoes = prepareData();

   return (
      <div className="px-6 max-w-full overflow-hidden rounded-xl border border-bee-dark-300 bg-bee-dark-100 dark:border-bee-dark-400 dark:bg-bee-dark-800">
         <h1 className="mt-3 text-xl font-semibold text-gray-800 dark:text-white/90">
            Últimas Atualizações
         </h1>

         {carregando ? (
            <div className="py-4 text-center">Carregando dados...</div>
         ) : (
            <div className="relative overflow-x-auto w-full no-scrollbar">
               <Table>
                  <TableHeader className="border-b border-bee-dark-300 dark:border-bee-dark-400 text-bee-dark-600 dark:text-bee-alert-500">
                     <TableRow>
                        <TableCell
                           isHeader
                           className="py-3 font-medium text-gray-500 text-start dark:text-gray-400 min-w-[90px]"
                        >
                           Categoria
                        </TableCell>
                        <TableCell
                           isHeader
                           className="table-cell py-3 font-medium text-gray-500 text-start dark:text-gray-400 min-w-[100px]"
                        >
                           Detalhes
                        </TableCell>
                        <TableCell
                           isHeader
                           className="table-cell py-3 font-medium text-gray-500 text-start dark:text-gray-400 min-w-[70px]"
                        >
                           Data/Hora
                        </TableCell>
                        <TableCell
                           isHeader
                           className="sticky right-0 bg-bee-dark-100 dark:bg-bee-dark-800 py-3 px-2 text-center font-medium text-gray-500 dark:text-gray-400 shadow-lg lg:shadow-none"
                        >
                           Status
                        </TableCell>
                     </TableRow>
                  </TableHeader>

                  <TableBody className="divide-y divide-bee-dark-300 dark:divide-bee-dark-400 text-bee-dark-600 dark:text-bee-alert-500">
                     {ultimasAtualizacoes.length > 0 ? (
                        ultimasAtualizacoes.map((atualizacao, index) => {
                           let badgeColor = "gray";
                           if (atualizacao.subtipo === "Chegada")
                              badgeColor = "success";
                           if (atualizacao.subtipo === "Saída")
                              badgeColor = "error";
                           if (atualizacao.subtipo === "Criado")
                              badgeColor = "info";
                           if (atualizacao.subtipo === "Editado")
                              badgeColor = "warning";

                           return (
                              <TableRow key={index}>
                                 <TableCell className="py-3 pl-1 max-w-[90px] truncate">
                                    {atualizacao.categoria}
                                 </TableCell>
                                 <TableCell className="py-3 max-w-[100px] truncate">
                                    {atualizacao.detalhes}
                                 </TableCell>
                                 <TableCell className="py-3 max-w-[70px] truncate">
                                    <div className="grid grid-cols-1">
                                       {formatDate(atualizacao.data).slice(
                                          0,
                                          6
                                       )}
                                       <span className="text-sm text-gray-500">
                                          {formatDate(atualizacao.data).slice(
                                             6
                                          )}
                                       </span>
                                    </div>
                                 </TableCell>
                                 <TableCell className="sticky right-0 px-2 bg-bee-dark-100 dark:bg-bee-dark-800 py-3 text-center border-l border-bee-dark-300 dark:border-bee-dark-400 shadow-lg lg:shadow-none">
                                    <Badge color={badgeColor}>
                                       {atualizacao.subtipo}
                                    </Badge>
                                 </TableCell>
                              </TableRow>
                           );
                        })
                     ) : (
                        <TableRow>
                           <TableCell colSpan={4} className="py-4 text-center">
                              Nenhuma atualização recente encontrada
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
