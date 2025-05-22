"use client";
import Icon from "@/elements/Icon";
import Btn from "@/elements/btn";
import ExcelJS from "exceljs";
import { saveAs } from "file-saver";

export default function CarReportPreview({ reportData }) {
   const formatDate = (dateString) => {
      if (!dateString) return "Nunca utilizado";
      const date = new Date(dateString);
      return date.toLocaleDateString("pt-BR");
   };

   const translateStatus = (status) => {
      const statusMap = {
         AVAILABLE: "Disponível",
         IN_USE: "Em uso",
         MAINTENANCE: "Manutenção",
      };
      return statusMap[status] || status;
   };

   const exportExcel = async () => {
      const workbook = new ExcelJS.Workbook();
      const worksheet = workbook.addWorksheet("Veículos");

      const headerRow = worksheet.addRow([
         "Modelo",
         "Ano",
         "Cor",
         "Placa",
         "Renavam",
         "Chassi",
         "Status",
         "Utilizações",
         "Motoristas únicos",
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

      reportData.cars.forEach((car) => {
         worksheet.addRow([
            `${car.brand} ${car.model}`,
            car.year,
            car.color,
            car.plate,
            car.renavam,
            car.chassis,
            translateStatus(car.status),
            car.totalUsageTimes,
            car.uniqueDriversUsed,
            `${car.totalOdometerChange} km`,
            car.lastUsed ? formatDate(car.lastUsed) : "Nunca utilizado",
         ]);
      });

      worksheet.columns = [
         { width: 22 },
         { width: 8 },
         { width: 10 },
         { width: 12 },
         { width: 14 },
         { width: 20 },
         { width: 14 },
         { width: 12 },
         { width: 16 },
         { width: 20 },
         { width: 16 },
      ];

      const buffer = await workbook.xlsx.writeBuffer();
      saveAs(new Blob([buffer]), "relatorio-veiculos.xlsx");
   };
   const handlePrint = () => {
      window.print();
   };

   return (
      <div id="car-report-preview" className="print:p-0 p-10">
         {/* Cabeçalho */}
         <header className="border-b border-bee-dark-300 pb-4 mb-6">
            <div className="flex justify-between items-start">
               <div>
                  <h1 className="text-3xl font-bold ">
                     Relatório de Veículos
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
                  <Icon name="car" className="size-8 " />
               </div>
            </div>

            {/* Filtros aplicados */}
            <div className="mt-4 flex flex-wrap gap-2">
               <span className=" px-3 py-1 rounded-full text-xs font-medium">
                  {reportData.cars.length === 1
                     ? "Veículo específico"
                     : "Todos os veículos"}
               </span>
               <span className="px-3 py-1 rounded-full text-xs font-medium">
                  Total de veículos: {reportData.totalCars}
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
                        Veículos disponíveis
                     </p>
                     <p className="text-2xl font-bold">
                        {
                           reportData.cars.filter(
                              (c) => c.status === "AVAILABLE"
                           ).length
                        }
                     </p>
                  </div>
                  <div className="p-4 rounded-lg border">
                     <p className="text-sm text-gray-500 ">
                        Total de utilizações
                     </p>
                     <p className="text-2xl font-bold">
                        {reportData.cars.reduce(
                           (sum, car) => sum + car.totalUsageTimes,
                           0
                        )}
                     </p>
                  </div>
                  <div className="p-4 rounded-lg border">
                     <p className="text-sm text-gray-500 ">Motoristas únicos</p>
                     <p className="text-2xl font-bold">
                        {reportData.cars.reduce(
                           (sum, car) => sum + car.uniqueDriversUsed,
                           0
                        )}
                     </p>
                  </div>
                  <div className="p-4 rounded-lg border">
                     <p className="text-sm text-gray-500">
                        Quilometragem total
                     </p>
                     <p className="text-2xl font-bold">
                        {reportData.cars.reduce(
                           (sum, car) => sum + car.totalOdometerChange,
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
                  <Icon name="eventoL" className="size-5" />
                  Lista de Veículos
               </h2>
               <div className="overflow-x-auto">
                  <table className="min-w-full divide-y divide-gray-200  text-black">
                     <thead className="bg-gray-50">
                        <tr>
                           <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                              Modelo
                           </th>
                           <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                              Placa
                           </th>
                           <th className="px-6 py-3 text-left text-xs font-medium text-gray-500  uppercase tracking-wider">
                              Status
                           </th>
                           <th className="px-6 py-3 text-left text-xs font-medium text-gray-500  uppercase tracking-wider">
                              Utilizações
                           </th>
                           <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                              Último uso
                           </th>
                        </tr>
                     </thead>
                     <tbody className="divide-y divide-gray-200 ">
                        {reportData.cars.map((car) => (
                           <tr key={car.id}>
                              <td className="px-6 py-4 whitespace-nowrap">
                                 <div className="font-medium">
                                    {car.brand} {car.model}
                                 </div>
                                 <div className="text-sm text-gray-500">
                                    {car.year} • {car.color}
                                 </div>
                              </td>
                              <td className="px-6 py-4 whitespace-nowrap font-mono">
                                 {car.plate}
                              </td>
                              <td className="px-6 py-4 whitespace-nowrap">
                                 {translateStatus(car.status)}
                              </td>
                              <td className="px-6 py-4 whitespace-nowrap">
                                 <div className="font-medium">
                                    {car.totalUsageTimes}
                                 </div>
                                 <div className="text-sm text-gray-500 ">
                                    {car.uniqueDriversUsed} motoristas
                                 </div>
                              </td>
                              <td className="px-6 py-4 whitespace-nowrap">
                                 {formatDate(car.lastUsed)}
                              </td>
                           </tr>
                        ))}
                     </tbody>
                  </table>
               </div>
            </section>

            {/* Seção de Detalhes de Uso */}
            {reportData.cars.length === 1 && (
               <section>
                  <h2 className="flex items-center gap-2 text-xl font-semibold mb-4 text-bee-dark-800 ">
                     <Icon name="calendar" className="size-5" />
                     Histórico de Utilizações
                  </h2>
                  {reportData.cars[0].driverUsageDetails.length > 0 ? (
                     <div className="overflow-x-auto">
                        <table className="min-w-full divide-y divide-gray-200 text-black">
                           <thead className="bg-gray-50">
                              <tr>
                                 <th className="px-6 py-3 text-left text-xs font-medium text-gray-500  uppercase tracking-wider">
                                    Motorista
                                 </th>
                                 <th className="px-6 py-3 text-left text-xs font-medium text-gray-500  uppercase tracking-wider">
                                    Telefone
                                 </th>
                                 <th className="px-6 py-3 text-left text-xs font-medium text-gray-500  uppercase tracking-wider">
                                    Quilometragem
                                 </th>
                              </tr>
                           </thead>
                           <tbody className="divide-y divide-gray-200 ">
                              {reportData.cars[0].driverUsageDetails.map(
                                 (usage, index) => (
                                    <tr key={index}>
                                       <td className="px-6 py-4 whitespace-nowrap">
                                          {usage.name}
                                       </td>
                                       <td className="px-6 py-4 whitespace-nowrap">
                                          {usage.phone}
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
                           veículo
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
