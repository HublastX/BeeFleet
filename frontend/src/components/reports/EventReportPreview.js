"use client";
import Icon from "@/elements/Icon";
import Btn from "@/elements/btn";
import ExcelJS from "exceljs";
import { saveAs } from "file-saver";

export default function EventReportPreview({ reportData }) {
   const formatDate = (dateString) => {
      if (!dateString) return "Nunca utilizado";
      const date = new Date(dateString);
      return date.toLocaleDateString("pt-BR");
   };

   const totalEventos = reportData.totalEvents || reportData.events.length;
   const totalUtilizacoes = reportData.events.length;
   const carrosUnicos = [
      ...new Set(
         reportData.events.map((e) => e.carDetails?.id).filter(Boolean)
      ),
   ].length;
   const motoristasUnicos = [
      ...new Set(
         reportData.events.map((e) => e.driverDetails?.id).filter(Boolean)
      ),
   ].length;

   const exportExcel = async () => {
      const workbook = new ExcelJS.Workbook();
      const worksheet = workbook.addWorksheet("Eventos");

      const headerRow = worksheet.addRow([
         "Tipo do Evento",
         "Data de Criação",
         "Data de Finalização",
         "Status",
         "Motorista",
         "Carro",
         "Placa",
         "Odômetro",
      ]);

      headerRow.eachCell((cell) => {
         cell.fill = {
            type: "pattern",
            pattern: "solid",
            fgColor: { argb: "4472C4" },
         };
         cell.font = {
            bold: true,
            color: { argb: "FFFFFF" },
         };
         cell.alignment = { vertical: "middle", horizontal: "center" };
      });

      reportData.events.forEach((event) => {
         worksheet.addRow([
            event.eventType === "CHECKOUT" ? "Saída" : "Retorno",
            formatDate(event.createdAt),
            event.endedAt ? formatDate(event.endedAt) : "-",
            event.status === "COMPLETED" ? "Concluído" : "Ativo",
            event.driverDetails?.name || "-",
            event.carDetails
               ? `${event.carDetails.brand} ${event.carDetails.model}`
               : "-",
            event.carDetails?.plate || "-",
            event.odometer ?? "-",
         ]);
      });

      worksheet.columns = [
         { width: 16 },
         { width: 16 },
         { width: 16 },
         { width: 14 },
         { width: 22 },
         { width: 22 },
         { width: 12 },
         { width: 12 },
      ];

      const buffer = await workbook.xlsx.writeBuffer();
      saveAs(new Blob([buffer]), "relatorio-eventos.xlsx");
   };

   const handlePrint = () => {
      window.print();
   };

   return (
      <div id="event-report-preview" className="print:p-0 p-10">
         {/* Cabeçalho */}
         <header className="border-b border-bee-dark-300 pb-4 mb-6">
            <div className="flex justify-between items-start">
               <div>
                  <h1 className="text-3xl font-bold ">
                     Relatório de Eventos
                  </h1>
                  <p className="text-sm text-gray-500">
                     Gerado em: {formatDate(new Date().toISOString())} às{" "}
                     {new Date().toLocaleTimeString("pt-BR", {
                        hour: "2-digit",
                        minute: "2-digit",
                     })}
                  </p>
               </div>
               <div className="p-2 rounded-lg">
                  <Icon name="calendar" className="size-8  " />
               </div>
            </div>

            {/* Filtros aplicados */}
            <div className="mt-4 flex flex-wrap gap-2">
               <span className="px-3 py-1 rounded-full text-xs font-medium">
                  {reportData.events.length === 1
                     ? "Evento específico"
                     : "Todos os eventos"}
               </span>
               <span className="px-3 py-1 rounded-full text-xs font-medium">
                  Total de eventos: {totalEventos}
               </span>
            </div>
         </header>

         {/* Corpo do Relatório */}
         <div className="space-y-8">
            {/* Seção de Dados Gerais */}
            <section>
               <h2 className="flex items-center gap-2 text-xl font-semibold mb-4">
                  <Icon name="analytics" className="size-5" />
                  Estatísticas de Uso
               </h2>
               <div className="grid grid-cols-4 gap-4">
                  <div className="p-4 rounded-lg border">
                     <p className="text-sm text-gray-500">
                        Eventos cadastrados
                     </p>
                     <p className="text-2xl font-bold">{totalEventos}</p>
                  </div>
                  <div className="p-4 rounded-lg border">
                     <p className="text-sm text-gray-500 ">
                        Total de utilizações
                     </p>
                     <p className="text-2xl font-bold">{totalUtilizacoes}</p>
                  </div>
                  <div className="p-4 rounded-lg border">
                     <p className="text-sm text-gray-500 ">
                        Carros únicos envolvidos
                     </p>
                     <p className="text-2xl font-bold">{carrosUnicos}</p>
                  </div>
                  <div className="p-4 rounded-lg border">
                     <p className="text-sm text-gray-500 ">
                        Motoristas únicos envolvidos
                     </p>
                     <p className="text-2xl font-bold">{motoristasUnicos}</p>
                  </div>
               </div>
            </section>

            {/* Tabela de Resultados */}
            <section>
               <h2 className="flex items-center gap-2 text-xl font-semibold mb-4">
                  <Icon name="calendar" className="size-5" />
                  Lista de Eventos
               </h2>
               <div className="overflow-x-auto">
                  <table className="min-w-full divide-y divide-gray-200 ">
                     <thead className="bg-gray-50 print:bg-gray-50">
                        <tr>
                           <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                              Tipo
                           </th>
                           <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                              Data de Criação
                           </th>
                           <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                             Finalização
                           </th>
                           <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                              Status
                           </th>
                           <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                              Motorista
                           </th>
                           <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                              Placa
                           </th>
                           <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                              Odômetro
                           </th>
                        </tr>
                     </thead>
                     <tbody className="divide-y divide-gray-200 ">
                        {reportData.events.map((event) => (
                           <tr key={event.id}>
                              <td className="px-6 py-4 whitespace-nowrap">
                                 {event.eventType === "CHECKOUT"
                                    ? "Saída"
                                    : "Retorno"}
                              </td>
                              <td className="px-6 py-4 whitespace-nowrap">
                                 {formatDate(event.createdAt)}
                              </td>
                              <td className="px-6 py-4 whitespace-nowrap">
                                 {event.endedAt
                                    ? formatDate(event.endedAt)
                                    : "-"}
                              </td>
                              <td className="px-6 py-4 whitespace-nowrap">
                                 {event.status === "COMPLETED"
                                    ? "Concluído"
                                    : event.status === "ACTIVE"
                                      ? "Ativo"
                                      : event.status}
                              </td>
                              <td className="px-6 py-4 whitespace-nowrap">
                                 {event.driverDetails?.name || "-"}
                              </td>
                              <td className="px-6 py-4 whitespace-nowrap">
                                 {event.carDetails?.plate || "-"}
                              </td>
                              <td className="px-6 py-4 whitespace-nowrap">
                                 {event.odometer ?? "-"}
                              </td>
                           </tr>
                        ))}
                     </tbody>
                  </table>
               </div>
            </section>
         </div>

         {/* Rodapé */}
         <footer className="mt-8 pt-6 border-t border-bee-dark-300 ">
            <div className="flex justify-between items-center">
               <div className="text-xs text-gray-500 ">
                  <p>Relatório gerado automaticamente pelo sistema Bee Fleet</p>
                  <p className="mt-1">
                     © {new Date().getFullYear()} - Todos os direitos
                     reservados
                  </p>
               </div>
               <div className="flex gap-3 print:hidden">
                  <Btn texto="Exportar Excel" onClick={exportExcel} />
                  <Btn texto="Imprimir Relatório" onClick={handlePrint} />
               </div>
            </div>
         </footer>
      </div>
   );
}
