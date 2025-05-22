"use client";
import Icon from "@/elements/Icon";
import Btn from "@/elements/btn";
import ExcelJS from "exceljs";
import { saveAs } from "file-saver";

export default function DriverReportPreview({ reportData }) {
   const formatDate = (dateString) => {
      if (!dateString) return "Nunca utilizou";
      const date = new Date(dateString);
      return date.toLocaleDateString("pt-BR");
   };

   const exportExcel = async () => {
      const workbook = new ExcelJS.Workbook();
      const worksheet = workbook.addWorksheet("Motoristas");

      const headerRow = worksheet.addRow([
         "Nome",
         "Telefone",
         "CNH",
         "Utilizações",
         "Carros únicos",
         "Quilometragem total",
         "Último uso",
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

      reportData.drivers.forEach((driver) => {
         worksheet.addRow([
            driver.name,
            driver.phone,
            driver.license,
            driver.totalUsageTimes,
            driver.uniqueCarsUsed,
            `${driver.totalOdometerChange} km`,
            driver.lastUsed ? formatDate(driver.lastUsed) : "Nunca utilizou",
         ]);
      });

      worksheet.columns = [
         { width: 22 },
         { width: 14 },
         { width: 14 },
         { width: 12 },
         { width: 16 },
         { width: 20 },
         { width: 16 },
      ];

      const buffer = await workbook.xlsx.writeBuffer();
      saveAs(new Blob([buffer]), "relatorio-motoristas.xlsx");
   };

   const handlePrint = () => {
      window.print();
   };

   return (
      <div id="driver-report-preview" className="print:p-0 p-10 text-black">
         {/* Cabeçalho */}
         <header className="border-b border-bee-dark-300 pb-4 mb-6">
            <div className="flex justify-between items-start">
               <div>
                  <h1 className="text-3xl font-bold text-bee-primary">
                     Relatório de Motoristas
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
                  <Icon name="user" className="size-8 text-bee-primary " />
               </div>
            </div>

            {/* Filtros aplicados */}
            <div className="mt-4 flex flex-wrap gap-2">
               <span className="px-3 py-1 rounded-full text-xs font-medium">
                  {reportData.drivers.length === 1
                     ? "Motorista específico"
                     : "Todos os motoristas"}
               </span>
               <span className="px-3 py-1 rounded-full text-xs font-medium">
                  Total de motoristas: {reportData.totalDrivers}
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
                        Motoristas cadastrados
                     </p>
                     <p className="text-2xl font-bold">
                        {reportData.totalDrivers}
                     </p>
                  </div>
                  <div className="p-4 rounded-lg border">
                     <p className="text-sm text-gray-500 ">
                        Total de utilizações
                     </p>
                     <p className="text-2xl font-bold">
                        {reportData.drivers.reduce(
                           (sum, d) => sum + d.totalUsageTimes,
                           0
                        )}
                     </p>
                  </div>
                  <div className="p-4 rounded-lg border">
                     <p className="text-sm text-gray-500 ">Carros únicos</p>
                     <p className="text-2xl font-bold">
                        {reportData.drivers.reduce(
                           (sum, d) => sum + d.uniqueCarsUsed,
                           0
                        )}
                     </p>
                  </div>
                  <div className="p-4 rounded-lg border">
                     <p className="text-sm text-gray-500">
                        Quilometragem total
                     </p>
                     <p className="text-2xl font-bold">
                        {reportData.drivers.reduce(
                           (sum, d) => sum + d.totalOdometerChange,
                           0
                        )}{" "}
                        km
                     </p>
                  </div>
               </div>
            </section>

            {/* Tabela de Resultados */}
            <section>
               <h2 className="flex items-center gap-2 text-xl font-semibold mb-4">
                  <Icon name="user" className="size-5" />
                  Lista de Motoristas
               </h2>
               <div className="overflow-x-auto">
                  <table className="min-w-full divide-y divide-gray-200 text-black">
                     <thead className="bg-gray-50 print:bg-gray-50">
                        <tr>
                           <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                              Nome
                           </th>
                           <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                              Telefone
                           </th>
                           <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                              CNH
                           </th>
                           <th className="px-6 py-3 text-left text-xs font-medium text-gray-500  uppercase tracking-wider">
                              Saidas
                           </th>
                           <th className="px-6 py-3 text-left text-xs font-medium text-gray-500  uppercase tracking-wider">
                              Carros únicos
                           </th>
                           <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                              Último uso
                           </th>
                        </tr>
                     </thead>
                     <tbody className="divide-y divide-gray-200 ">
                        {reportData.drivers.map((driver) => (
                           <tr key={driver.id}>
                              <td className="px-6 py-4 whitespace-pre-wrap">
                                 {driver.name}
                              </td>
                              <td className="px-6 py-4 whitespace-nowrap">
                                 {`${driver.phone.slice(4,8)}***`}
                              </td>
                              <td className="px-6 py-4 whitespace-nowrap">
                                 {`${driver.license.slice(0, 3)}***`}
                              </td>
                              <td className="px-6 py-4 whitespace-nowrap">
                                 {driver.totalUsageTimes}
                              </td>
                              <td className="px-6 py-4 whitespace-nowrap">
                                 {driver.uniqueCarsUsed}
                              </td>
                              <td className="px-6 py-4 whitespace-nowrap">
                                 {formatDate(driver.lastUsed)}
                              </td>
                           </tr>
                        ))}
                     </tbody>
                  </table>
               </div>
            </section>

            {/* Seção de Detalhes de Uso */}
            {reportData.drivers.length === 1 && (
               <section>
                  <h2 className="flex items-center gap-2 text-xl font-semibold mb-4 text-bee-dark-800 ">
                     <Icon name="calendar" className="size-5" />
                     Histórico de Utilizações
                  </h2>
                  {reportData.drivers[0].carUsageDetails &&
                  reportData.drivers[0].carUsageDetails.length > 0 ? (
                     <div className="overflow-x-auto">
                        <table className="min-w-full divide-y divide-gray-200">
                           <thead className="bg-gray-50">
                              <tr>
                                 <th className="px-6 py-3 text-left text-xs font-medium text-gray-500  uppercase tracking-wider">
                                    Carro
                                 </th>
                                 <th className="px-6 py-3 text-left text-xs font-medium text-gray-500  uppercase tracking-wider">
                                    Placa
                                 </th>
                                 <th className="px-6 py-3 text-left text-xs font-medium text-gray-500  uppercase tracking-wider">
                                    Quilometragem
                                 </th>
                                 <th className="px-6 py-3 text-left text-xs font-medium text-gray-500  uppercase tracking-wider">
                                    Data
                                 </th>
                              </tr>
                           </thead>
                           <tbody className="divide-y divide-gray-200 ">
                              {reportData.drivers[0].carUsageDetails.map(
                                 (usage, index) => (
                                    <tr key={index}>
                                       <td className="px-6 py-4 whitespace-nowrap">
                                          {usage.brand} {usage.model}
                                       </td>
                                       <td className="px-6 py-4 whitespace-nowrap">
                                          {usage.plate}
                                       </td>
                                       <td className="px-6 py-4 whitespace-nowrap">
                                          +{usage.totalOdometerChange} km
                                       </td>
                                    </tr>
                                 )
                              )}
                           </tbody>
                        </table>
                     </div>
                  ) : (
                     <div className="p-8 text-center rounded-lg">
                        <p className="text-gray-500 ">
                           Nenhum registro de utilização encontrado para este
                           motorista
                        </p>
                     </div>
                  )}
               </section>
            )}
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
