"use client";
import { useState, useEffect } from "react";
import Icon from "@/elements/Icon";
import Btn from "@/elements/btn";

const GenericReport = ({ isOpen, onClose, reportData, filters }) => {
   const [activeTab, setActiveTab] = useState("summary");
   const [filteredManagers, setFilteredManagers] = useState([]);
   const [globalStats, setGlobalStats] = useState({});

   useEffect(() => {
      if (reportData) {
         let managers = [...reportData.managers];
         let stats = { ...reportData.globalStats };

         if (filters.dateRange === "today") {
            const today = new Date().toISOString().split("T")[0];
            managers = managers.map((manager) => ({
               ...manager,
               events: manager.events.filter(
                  (event) =>
                     new Date(event.createdAt).toISOString().split("T")[0] ===
                     today
               ),
            }));
         }

         setFilteredManagers(managers);
         setGlobalStats(stats);
      }
   }, [reportData, filters]);

   const handlePrint = () => {
      const printWindow = window.open("", "_blank");
      printWindow.document.write(`
      <!DOCTYPE html>
      <html>
      <head>
        <title>Relatório</title>
        <style>
          @page { size: A4; margin: 1cm; }
          body { font-family: Arial, sans-serif; }
          .a4-container { width: 210mm; min-height: 297mm; padding: 20mm; margin: 0 auto; }
          .header { text-align: center; margin-bottom: 20px; border-bottom: 1px solid #ddd; padding-bottom: 10px; }
          .header h1 { margin: 0; font-size: 24px; }
          .header p { margin: 5px 0 0; color: #666; }
          .summary-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 15px; margin-bottom: 20px; }
          .stat-card { border: 1px solid #ddd; border-radius: 5px; padding: 15px; text-align: center; }
          .stat-card h3 { margin: 0 0 5px; font-size: 14px; color: #666; }
          .stat-card p { margin: 0; font-size: 24px; font-weight: bold; }
          .filters { margin-bottom: 20px; padding: 15px; border: 1px solid #eee; border-radius: 5px; }
          .filters h3 { margin-top: 0; }
          .manager-card { border: 1px solid #ddd; border-radius: 5px; padding: 15px; margin-bottom: 15px; }
          .manager-header { display: flex; justify-content: space-between; margin-bottom: 10px; }
          .manager-stats { display: grid; grid-template-columns: repeat(3, 1fr); gap: 10px; font-size: 14px; }
          .event-card { border: 1px solid #ddd; border-radius: 5px; padding: 15px; margin-bottom: 10px; }
          .event-header { display: flex; justify-content: space-between; margin-bottom: 5px; }
          .event-details { display: grid; grid-template-columns: repeat(2, 1fr); gap: 10px; font-size: 14px; }
          .completed { background-color: #e6ffed; color: #22863a; padding: 2px 5px; border-radius: 3px; }
          .page-break { page-break-after: always; }
          @media print {
            body { -webkit-print-color-adjust: exact; }
            .no-print { display: none; }
          }
        </style>
      </head>
      <body>
        <div class="a4-container">
          <div class="header">
            <h1>Relatório Completo</h1>
            <p>${new Date().toLocaleDateString()}</p>
          </div>

          <div class="filters">
            <h3>Filtros Aplicados</h3>
            <p><strong>Período:</strong> ${
               filters.dateRange === "all"
                  ? "Todas as datas"
                  : filters.dateRange === "today"
                    ? "Hoje"
                    : "Intervalo personalizado"
            }</p>
            ${
               filters.selectedItem
                  ? `
              <p><strong>Filtro:</strong> ${
                 filters.searchCriteria === "carro"
                    ? "Veículo: "
                    : filters.searchCriteria === "motorista"
                      ? "Motorista: "
                      : filters.searchCriteria === "manager"
                        ? "Gestor: "
                        : "Evento: "
              }
                 ${filters.selectedItem.name || filters.selectedItem.plate || filters.selectedItem.driverName}
              </p>
            `
                  : ""
            }
          </div>

          <div class="summary-grid">
            <div class="stat-card">
              <h3>Total de Gestores</h3>
              <p>${globalStats.totalManagers || 0}</p>
            </div>
            <div class="stat-card">
              <h3>Total de Motoristas</h3>
              <p>${globalStats.totalDrivers || 0}</p>
            </div>
            <div class="stat-card">
              <h3>Total de Veículos</h3>
              <p>${globalStats.totalCars || 0}</p>
            </div>
          </div>

          <h2>Gestores</h2>
          ${filteredManagers
             .map(
                (manager) => `
            <div class="manager-card">
              <div class="manager-header">
                <h3>${manager.name}</h3>
                <span>${manager.email}</span>
              </div>
              <div class="manager-stats">
                <div>
                  <p><strong>Motoristas:</strong> ${manager.summary.totalDrivers} ativos, ${manager.summary.totalDeletedDrivers} removidos</p>
                </div>
                <div>
                  <p><strong>Veículos:</strong> ${manager.summary.totalCars} ativos, ${manager.summary.totalDeletedCars} removidos</p>
                </div>
                <div>
                  <p><strong>Eventos:</strong> ${manager.summary.totalEvents} registrados</p>
                </div>
              </div>
            </div>
          `
             )
             .join("")}

          <div class="page-break"></div>

          <h2>Eventos</h2>
          ${filteredManagers
             .flatMap((manager) =>
                manager.events.map(
                   (event) => `
              <div class="event-card">
                <div class="event-header">
                  <h3>${event.eventType === "CHECKOUT" ? "Saída" : "Retorno"}</h3>
                  <span class="completed">${event.status}</span>
                </div>
                <p><small>${new Date(event.createdAt).toLocaleString()}</small></p>
                <div class="event-details">
                  <div>
                    <p><strong>Motorista:</strong> ${event.driverName}</p>
                  </div>
                  <div>
                    <p><strong>Veículo:</strong> ${event.carInfo}</p>
                  </div>
                  <div>
                    <p><strong>Odômetro:</strong> ${event.odometer} km</p>
                  </div>
                </div>
              </div>
            `
                )
             )
             .join("")}
        </div>

        <script>
          window.onload = function() {
            setTimeout(function() {
              window.print();
              window.close();
            }, 200);
          };
        </script>
      </body>
      </html>
    `);
      printWindow.document.close();
   };

   if (!isOpen) return null;

   return (
      <div className="fixed inset-0 z-50 overflow-y-auto">
         <div
            className="fixed inset-0 bg-black bg-opacity-50"
            onClick={onClose}
         ></div>

         <div className="flex items-center justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
            <div className="inline-block align-bottom bg-white dark:bg-bee-dark-800 rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-6xl sm:w-full">
               <div className="bg-bee-primary px-4 py-3 sm:px-6 sm:flex sm:items-center sm:justify-between">
                  <h3 className="text-lg leading-6 font-medium text-white">
                     Relatório Gerado
                  </h3>
                  <button
                     onClick={onClose}
                     className="mt-3 w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-white text-base font-medium text-bee-primary hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-bee-primary sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm"
                  >
                     Fechar
                  </button>
               </div>

               <div className="px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                  <div className="flex border-b border-gray-200 dark:border-bee-dark-600 mb-4">
                     <button
                        className={`px-4 py-2 font-medium ${activeTab === "summary" ? "text-bee-primary border-b-2 border-bee-primary" : "text-gray-500"}`}
                        onClick={() => setActiveTab("summary")}
                     >
                        Resumo
                     </button>
                     <button
                        className={`px-4 py-2 font-medium ${activeTab === "managers" ? "text-bee-primary border-b-2 border-bee-primary" : "text-gray-500"}`}
                        onClick={() => setActiveTab("managers")}
                     >
                        Gestores
                     </button>
                     <button
                        className={`px-4 py-2 font-medium ${activeTab === "events" ? "text-bee-primary border-b-2 border-bee-primary" : "text-gray-500"}`}
                        onClick={() => setActiveTab("events")}
                     >
                        Eventos
                     </button>
                  </div>

                  <div className="max-h-[60vh] overflow-y-auto p-1">
                     {activeTab === "summary" && (
                        <div className="space-y-6">
                           <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                              <div className="bg-white dark:bg-bee-dark-800 rounded-lg p-4 shadow flex items-center gap-3">
                                 <div className="bg-bee-primary/10 p-3 rounded-full">
                                    <Icon
                                       name="users"
                                       className="size-5 text-bee-primary"
                                    />
                                 </div>
                                 <div>
                                    <p className="text-sm text-gray-500">
                                       Total de Gestores
                                    </p>
                                    <p className="text-2xl font-bold">
                                       {globalStats.totalManagers || 0}
                                    </p>
                                 </div>
                              </div>
                              <div className="bg-white dark:bg-bee-dark-800 rounded-lg p-4 shadow flex items-center gap-3">
                                 <div className="bg-bee-primary/10 p-3 rounded-full">
                                    <Icon
                                       name="driver"
                                       className="size-5 text-bee-primary"
                                    />
                                 </div>
                                 <div>
                                    <p className="text-sm text-gray-500">
                                       Total de Motoristas
                                    </p>
                                    <p className="text-2xl font-bold">
                                       {globalStats.totalDrivers || 0}
                                    </p>
                                 </div>
                              </div>
                              <div className="bg-white dark:bg-bee-dark-800 rounded-lg p-4 shadow flex items-center gap-3">
                                 <div className="bg-bee-primary/10 p-3 rounded-full">
                                    <Icon
                                       name="car"
                                       className="size-5 text-bee-primary"
                                    />
                                 </div>
                                 <div>
                                    <p className="text-sm text-gray-500">
                                       Total de Veículos
                                    </p>
                                    <p className="text-2xl font-bold">
                                       {globalStats.totalCars || 0}
                                    </p>
                                 </div>
                              </div>
                           </div>

                           <div className="bg-white dark:bg-bee-dark-800 rounded-lg p-4 shadow">
                              <h3 className="font-bold mb-3">
                                 Filtros Aplicados
                              </h3>
                              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                 <div>
                                    <p className="text-sm text-gray-500">
                                       Período:
                                    </p>
                                    <p>
                                       {filters.dateRange === "all"
                                          ? "Todas as datas"
                                          : filters.dateRange === "today"
                                            ? "Hoje"
                                            : "Intervalo personalizado"}
                                    </p>
                                 </div>
                                 {filters.selectedItem && (
                                    <div>
                                       <p className="text-sm text-gray-500">
                                          Filtro:
                                       </p>
                                       <p>
                                          {filters.searchCriteria === "carro"
                                             ? "Veículo: "
                                             : filters.searchCriteria ===
                                                 "motorista"
                                               ? "Motorista: "
                                               : filters.searchCriteria ===
                                                   "manager"
                                                 ? "Gestor: "
                                                 : "Evento: "}
                                          {filters.selectedItem.name ||
                                             filters.selectedItem.plate ||
                                             filters.selectedItem.driverName}
                                       </p>
                                    </div>
                                 )}
                              </div>
                           </div>
                        </div>
                     )}

                     {activeTab === "managers" && (
                        <div className="space-y-4">
                           {filteredManagers.map((manager) => (
                              <div
                                 key={manager.id}
                                 className="bg-white dark:bg-bee-dark-800 rounded-lg p-4 shadow"
                              >
                                 <div className="flex items-center justify-between mb-3">
                                    <h3 className="font-bold">
                                       {manager.name}
                                    </h3>
                                    <span className="text-sm text-gray-500">
                                       {manager.email}
                                    </span>
                                 </div>

                                 <div className="grid grid-cols-2 md:grid-cols-3 gap-3 text-sm">
                                    <div>
                                       <p className="text-gray-500">
                                          Motoristas:
                                       </p>
                                       <p>
                                          {manager.summary.totalDrivers} ativos,{" "}
                                          {manager.summary.totalDeletedDrivers}{" "}
                                          removidos
                                       </p>
                                    </div>
                                    <div>
                                       <p className="text-gray-500">
                                          Veículos:
                                       </p>
                                       <p>
                                          {manager.summary.totalCars} ativos,{" "}
                                          {manager.summary.totalDeletedCars}{" "}
                                          removidos
                                       </p>
                                    </div>
                                    <div>
                                       <p className="text-gray-500">Eventos:</p>
                                       <p>
                                          {manager.summary.totalEvents}{" "}
                                          registrados
                                       </p>
                                    </div>
                                 </div>
                              </div>
                           ))}
                        </div>
                     )}

                     {activeTab === "events" && (
                        <div className="space-y-3">
                           {filteredManagers.flatMap((manager) =>
                              manager.events.map((event) => (
                                 <div
                                    key={event.id}
                                    className="bg-white dark:bg-bee-dark-800 rounded-lg p-4 shadow"
                                 >
                                    <div className="flex justify-between items-start">
                                       <div>
                                          <p className="font-bold">
                                             {event.eventType === "CHECKOUT"
                                                ? "Saída"
                                                : "Retorno"}
                                          </p>
                                          <p className="text-sm">
                                             {new Date(
                                                event.createdAt
                                             ).toLocaleString()}
                                          </p>
                                       </div>
                                       <span
                                          className={`px-2 py-1 rounded text-xs ${
                                             event.status === "COMPLETED"
                                                ? "bg-green-100 text-green-800"
                                                : "bg-yellow-100 text-yellow-800"
                                          }`}
                                       >
                                          {event.status}
                                       </span>
                                    </div>

                                    <div className="mt-2 grid grid-cols-1 md:grid-cols-2 gap-2 text-sm">
                                       <div>
                                          <p className="text-gray-500">
                                             Motorista:
                                          </p>
                                          <p>{event.driverName}</p>
                                       </div>
                                       <div>
                                          <p className="text-gray-500">
                                             Veículo:
                                          </p>
                                          <p>{event.carInfo}</p>
                                       </div>
                                       <div>
                                          <p className="text-gray-500">
                                             Odômetro:
                                          </p>
                                          <p>{event.odometer} km</p>
                                       </div>
                                    </div>
                                 </div>
                              ))
                           )}
                        </div>
                     )}
                  </div>
               </div>

               <div className="bg-gray-50 dark:bg-bee-dark-700 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
                  <Btn
                     variant="primary"
                     texto="Imprimir Relatório"
                     onClick={handlePrint}
                     className="ml-3"
                  />
                  <Btn variant="cancel" texto="Fechar" onClick={onClose} />
               </div>
            </div>
         </div>
      </div>
   );
};

export default GenericReport;
