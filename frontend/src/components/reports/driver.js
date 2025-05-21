"use client";
import Icon from "@/elements/Icon";
import Btn from "@/elements/btn";
import * as XLSX from "xlsx";
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

   const exportExcel = () => {
      const wsData = [
         ["Modelo", "Placa", "Status", "Utilizações", "Último uso"],
         ...reportData.cars.map((car) => [
            `${car.brand} ${car.model}`,
            car.plate,
            translateStatus(car.status),
            car.totalUsageTimes,
            car.lastUsed ? formatDate(car.lastUsed) : "Nunca utilizado",
         ]),
      ];
      const ws = XLSX.utils.aoa_to_sheet(wsData);
      const wb = XLSX.utils.book_new();
      XLSX.utils.book_append_sheet(wb, ws, "Veículos");
      const wbout = XLSX.write(wb, { bookType: "xlsx", type: "array" });
      saveAs(
         new Blob([wbout], { type: "application/octet-stream" }),
         "relatorio-veiculos.xlsx"
      );
   };

   return (
      <div
         id="car-report-preview"
         className="bg-white dark:bg-bee-dark-900 p-6 md:p-8 rounded-lg shadow-lg max-w-6xl mx-auto"
      >
         {/* Cabeçalho */}
         <header className="border-b border-bee-dark-200 dark:border-bee-dark-700 pb-4 mb-6">
            <div className="flex justify-between items-start">
               <div>
                  <h1 className="text-2xl md:text-3xl font-bold text-bee-primary dark:text-bee-primary-light">
                     Relatório de Veículos
                  </h1>
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                     Gerado em: {formatDate(new Date().toISOString())} às{" "}
                     {new Date().toLocaleTimeString("pt-BR", {
                        hour: "2-digit",
                        minute: "2-digit",
                     })}
                  </p>
               </div>
               <div className="bg-bee-primary/10 dark:bg-bee-primary-light/10 p-2 rounded-lg">
                  <Icon
                     name="car"
                     className="size-8 text-bee-primary dark:text-bee-primary-light"
                  />
               </div>
            </div>

            {/* Filtros aplicados */}
            <div className="mt-4 flex flex-wrap gap-2">
               <span className="bg-bee-yellow/20 text-bee-yellow-dark dark:text-bee-yellow px-3 py-1 rounded-full text-xs font-medium">
                  {reportData.cars.length === 1
                     ? "Veículo específico"
                     : "Todos os veículos"}
               </span>
               <span className="bg-bee-blue/20 text-bee-blue-dark dark:text-bee-blue px-3 py-1 rounded-full text-xs font-medium">
                  Total de veículos: {reportData.totalCars}
               </span>
            </div>
         </header>

         {/* Corpo do Relatório */}
         <div className="space-y-8">
            {/* Seção de Dados Gerais */}
            <section>
               <h2 className="flex items-center gap-2 text-xl font-semibold mb-4 text-bee-dark-800 dark:text-bee-dark-100">
                  <Icon name="analytics" className="size-5" />
                  Estatísticas de Uso
               </h2>
               <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                  <div className="bg-bee-yellow/5 dark:bg-bee-yellow/10 p-4 rounded-lg border border-bee-yellow/20">
                     <p className="text-sm text-gray-500 dark:text-gray-400">
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
                  <div className="bg-bee-blue/5 dark:bg-bee-blue/10 p-4 rounded-lg border border-bee-blue/20">
                     <p className="text-sm text-gray-500 dark:text-gray-400">
                        Total de utilizações
                     </p>
                     <p className="text-2xl font-bold">
                        {reportData.cars.reduce(
                           (sum, car) => sum + car.totalUsageTimes,
                           0
                        )}
                     </p>
                  </div>
                  <div className="bg-bee-green/5 dark:bg-bee-green/10 p-4 rounded-lg border border-bee-green/20">
                     <p className="text-sm text-gray-500 dark:text-gray-400">
                        Motoristas únicos
                     </p>
                     <p className="text-2xl font-bold">
                        {reportData.cars.reduce(
                           (sum, car) => sum + car.uniqueDriversUsed,
                           0
                        )}
                     </p>
                  </div>
                  <div className="bg-bee-purple/5 dark:bg-bee-purple/10 p-4 rounded-lg border border-bee-purple/20">
                     <p className="text-sm text-gray-500 dark:text-gray-400">
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
               <h2 className="flex items-center gap-2 text-xl font-semibold mb-4 text-bee-dark-800 dark:text-bee-dark-100">
                  <Icon name="eventoL" className="size-5" />
                  Lista de Veículos
               </h2>
               <div className="overflow-x-auto">
                  <table className="min-w-full divide-y divide-gray-200 dark:divide-bee-dark-700">
                     <thead className="bg-gray-50 dark:bg-bee-dark-800">
                        <tr>
                           <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                              Modelo
                           </th>
                           <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                              Placa
                           </th>
                           <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                              Status
                           </th>
                           <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                              Utilizações
                           </th>
                           <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                              Último uso
                           </th>
                        </tr>
                     </thead>
                     <tbody className="bg-white dark:bg-bee-dark-900 divide-y divide-gray-200 dark:divide-bee-dark-700">
                        {reportData.cars.map((car) => (
                           <tr key={car.id}>
                              <td className="px-6 py-4 whitespace-nowrap">
                                 <div className="font-medium">
                                    {car.brand} {car.model}
                                 </div>
                                 <div className="text-sm text-gray-500 dark:text-gray-400">
                                    {car.year} • {car.color}
                                 </div>
                              </td>
                              <td className="px-6 py-4 whitespace-nowrap font-mono">
                                 {car.plate}
                              </td>
                              <td className="px-6 py-4 whitespace-nowrap">
                                 <span
                                    className={`px-2 py-1 text-xs rounded-full ${
                                       car.status === "AVAILABLE"
                                          ? "bg-bee-green/20 text-bee-green-dark dark:text-bee-green"
                                          : car.status === "IN_USE"
                                            ? "bg-bee-blue/20 text-bee-blue-dark dark:text-bee-blue"
                                            : "bg-bee-red/20 text-bee-red-dark dark:text-bee-red"
                                    }`}
                                 >
                                    {translateStatus(car.status)}
                                 </span>
                              </td>
                              <td className="px-6 py-4 whitespace-nowrap">
                                 <div className="font-medium">
                                    {car.totalUsageTimes}
                                 </div>
                                 <div className="text-sm text-gray-500 dark:text-gray-400">
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
                  <h2 className="flex items-center gap-2 text-xl font-semibold mb-4 text-bee-dark-800 dark:text-bee-dark-100">
                     <Icon name="calendar" className="size-5" />
                     Histórico de Utilizações
                  </h2>
                  {reportData.cars[0].driverUsageDetails.length > 0 ? (
                     <div className="overflow-x-auto">
                        <table className="min-w-full divide-y divide-gray-200 dark:divide-bee-dark-700">
                           <thead className="bg-gray-50 dark:bg-bee-dark-800">
                              <tr>
                                 <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                                    Motorista
                                 </th>
                                 <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                                    Período
                                 </th>
                                 <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                                    Quilometragem
                                 </th>
                                 <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                                    Finalidade
                                 </th>
                              </tr>
                           </thead>
                           <tbody className="bg-white dark:bg-bee-dark-900 divide-y divide-gray-200 dark:divide-bee-dark-700">
                              {reportData.cars[0].driverUsageDetails.map(
                                 (usage, index) => (
                                    <tr key={index}>
                                       <td className="px-6 py-4 whitespace-nowrap">
                                          {usage.driverName}
                                       </td>
                                       <td className="px-6 py-4 whitespace-nowrap">
                                          {formatDate(usage.startDate)} →{" "}
                                          {formatDate(usage.endDate)}
                                       </td>
                                       <td className="px-6 py-4 whitespace-nowrap">
                                          +{usage.odometerChange} km
                                       </td>
                                       <td className="px-6 py-4 whitespace-nowrap">
                                          {usage.purpose}
                                       </td>
                                    </tr>
                                 )
                              )}
                           </tbody>
                        </table>
                     </div>
                  ) : (
                     <div className="bg-gray-50 dark:bg-bee-dark-800 p-8 text-center rounded-lg">
                        <p className="text-gray-500 dark:text-gray-400">
                           Nenhum registro de utilização encontrado para este
                           veículo
                        </p>
                     </div>
                  )}
               </section>
            )}
         </div>

         {/* Rodapé */}
         <footer className="mt-8 pt-6 border-t border-bee-dark-200 dark:border-bee-dark-700">
            <div className="flex justify-between items-center">
               <div className="text-xs text-gray-500 dark:text-gray-400">
                  <p>Relatório gerado automaticamente pelo sistema Bee Fleet</p>
                  <p className="mt-1">
                     © {new Date().getFullYear()} - Todos os direitos
                     reservados
                  </p>
               </div>
               <div className="flex gap-3">
                  <Btn texto="Exportar PDF" />

                  <Btn texto="Exportar Excel" onClick={exportExcel} />
               </div>
            </div>
         </footer>
      </div>
   );
}
