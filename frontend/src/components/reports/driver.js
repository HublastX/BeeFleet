"use client";
import Icon from "@/elements/Icon";
import Btn from "@/elements/btn";

export default function GenericReportPreview() {
   // Dados genéricos para visualização
   const reportData = {
      reportType: "all",
      totalDrivers: 42,
      activeDrivers: 38,
      inactiveDrivers: 4,
      driversList: [
         {
            id: "1",
            name: "João da Silva",
            cnh: "12345678901",
            phone: "(11) 98765-4321",
            status: "active",
            registrationDate: "2023-03-15",
         },
         {
            id: "2",
            name: "Maria Oliveira",
            cnh: "98765432109",
            phone: "(11) 91234-5678",
            status: "active",
            registrationDate: "2023-04-20",
         },
         {
            id: "3",
            name: "Carlos Souza",
            cnh: "45678912345",
            phone: "(11) 92345-6789",
            status: "inactive",
            registrationDate: "2023-01-10",
         },
         {
            id: "4",
            name: "Ana Santos",
            cnh: "78912345678",
            phone: "(11) 93456-7890",
            status: "active",
            registrationDate: "2023-05-05",
         },
      ],
      filters: {
         timePeriod: {
            start: "2023-01-01",
            end: "2023-12-31",
         },
      },
      generatedAt: new Date().toISOString(),
   };

   const formatDate = (dateString) => {
      if (!dateString) return "";
      const date = new Date(dateString);
      return date.toLocaleDateString("pt-BR");
   };

   return (
      <div className="bg-white dark:bg-bee-dark-900 p-6 md:p-8 rounded-lg shadow-lg max-w-6xl mx-auto">
         {/* Cabeçalho */}
         <header className="border-b border-bee-dark-200 dark:border-bee-dark-700 pb-4 mb-6">
            <div className="flex justify-between items-start">
               <div>
                  <h1 className="text-2xl md:text-3xl font-bold text-bee-primary dark:text-bee-primary-light">
                     Relatório de Motoristas
                  </h1>
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                     Gerado em: {formatDate(reportData.generatedAt)} às{" "}
                     {new Date(reportData.generatedAt).toLocaleTimeString(
                        "pt-BR",
                        { hour: "2-digit", minute: "2-digit" }
                     )}
                  </p>
               </div>
               <div className="bg-bee-primary/10 dark:bg-bee-primary-light/10 p-2 rounded-lg">
                  <Icon
                     name="report"
                     className="size-8 text-bee-primary dark:text-bee-primary-light"
                  />
               </div>
            </div>

            {/* Filtros aplicados */}
            <div className="mt-4 flex flex-wrap gap-2">
               <span className="bg-bee-yellow/20 text-bee-yellow-dark dark:text-bee-yellow px-3 py-1 rounded-full text-xs font-medium">
                  {reportData.reportType === "single"
                     ? "Motorista específico"
                     : "Todos os motoristas"}
               </span>
               {reportData.filters.timePeriod && (
                  <span className="bg-bee-blue/20 text-bee-blue-dark dark:text-bee-blue px-3 py-1 rounded-full text-xs font-medium">
                     Período: {formatDate(reportData.filters.timePeriod.start)}{" "}
                     → {formatDate(reportData.filters.timePeriod.end)}
                  </span>
               )}
            </div>
         </header>

         {/* Corpo do Relatório */}
         <div className="space-y-8">
            {/* Seção de Dados Gerais */}
            <section>
               <h2 className="flex items-center gap-2 text-xl font-semibold mb-4 text-bee-dark-800 dark:text-bee-dark-100">
                  <Icon name="analytics" className="size-5" />
                  Dados Gerais
               </h2>
               <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="bg-bee-yellow/5 dark:bg-bee-yellow/10 p-4 rounded-lg border border-bee-yellow/20">
                     <p className="text-sm text-gray-500 dark:text-gray-400">
                        Total de Motoristas
                     </p>
                     <p className="text-2xl font-bold">
                        {reportData.totalDrivers}
                     </p>
                  </div>
                  <div className="bg-bee-blue/5 dark:bg-bee-blue/10 p-4 rounded-lg border border-bee-blue/20">
                     <p className="text-sm text-gray-500 dark:text-gray-400">
                        Ativos
                     </p>
                     <p className="text-2xl font-bold">
                        {reportData.activeDrivers}
                     </p>
                  </div>
                  <div className="bg-bee-red/5 dark:bg-bee-red/10 p-4 rounded-lg border border-bee-red/20">
                     <p className="text-sm text-gray-500 dark:text-gray-400">
                        Inativos
                     </p>
                     <p className="text-2xl font-bold">
                        {reportData.inactiveDrivers}
                     </p>
                  </div>
               </div>
            </section>

            {/* Tabela de Resultados */}
            <section>
               <h2 className="flex items-center gap-2 text-xl font-semibold mb-4 text-bee-dark-800 dark:text-bee-dark-100">
                  <Icon name="list" className="size-5" />
                  Lista de Motoristas
               </h2>
               <div className="overflow-x-auto">
                  <table className="min-w-full divide-y divide-gray-200 dark:divide-bee-dark-700">
                     <thead className="bg-gray-50 dark:bg-bee-dark-800">
                        <tr>
                           <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                              Nome
                           </th>
                           <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                              CNH
                           </th>
                           <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                              Telefone
                           </th>
                           <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                              Status
                           </th>
                           <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                              Cadastro
                           </th>
                        </tr>
                     </thead>
                     <tbody className="bg-white dark:bg-bee-dark-900 divide-y divide-gray-200 dark:divide-bee-dark-700">
                        {reportData.driversList.map((driver) => (
                           <tr key={driver.id}>
                              <td className="px-6 py-4 whitespace-nowrap font-medium">
                                 {driver.name}
                              </td>
                              <td className="px-6 py-4 whitespace-nowrap">
                                 {driver.cnh}
                              </td>
                              <td className="px-6 py-4 whitespace-nowrap">
                                 {driver.phone}
                              </td>
                              <td className="px-6 py-4 whitespace-nowrap">
                                 <span
                                    className={`px-2 py-1 text-xs rounded-full ${
                                       driver.status === "active"
                                          ? "bg-bee-green/20 text-bee-green-dark dark:text-bee-green"
                                          : "bg-bee-red/20 text-bee-red-dark dark:text-bee-red"
                                    }`}
                                 >
                                    {driver.status === "active"
                                       ? "Ativo"
                                       : "Inativo"}
                                 </span>
                              </td>
                              <td className="px-6 py-4 whitespace-nowrap">
                                 {formatDate(driver.registrationDate)}
                              </td>
                           </tr>
                        ))}
                     </tbody>
                  </table>
               </div>
            </section>

            {/* Gráficos (placeholders) */}
            <section>
               <h2 className="flex items-center gap-2 text-xl font-semibold mb-4 text-bee-dark-800 dark:text-bee-dark-100">
                  <Icon name="chart" className="size-5" />
                  Estatísticas
               </h2>
               <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="bg-gray-50 dark:bg-bee-dark-800 p-4 rounded-lg">
                     <p className="text-sm font-medium mb-2">
                        Status dos Motoristas
                     </p>
                     <div className="h-64 flex items-center justify-center bg-gray-100 dark:bg-bee-dark-700 rounded">
                        <p className="text-gray-500">
                           Gráfico de Pizza - Status
                        </p>
                     </div>
                  </div>
                  <div className="bg-gray-50 dark:bg-bee-dark-800 p-4 rounded-lg">
                     <p className="text-sm font-medium mb-2">
                        Cadastros por Mês
                     </p>
                     <div className="h-64 flex items-center justify-center bg-gray-100 dark:bg-bee-dark-700 rounded">
                        <p className="text-gray-500">
                           Gráfico de Barras - Cadastros
                        </p>
                     </div>
                  </div>
               </div>
            </section>
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
                  <Btn
                     texto="Exportar PDF"
                     icon="download"
                     className="bg-bee-primary hover:bg-bee-primary-dark"
                  />
                  <Btn
                     texto="Enviar por Email"
                     icon="email"
                     variant="outline"
                  />
               </div>
            </div>
         </footer>
      </div>
   );
}
