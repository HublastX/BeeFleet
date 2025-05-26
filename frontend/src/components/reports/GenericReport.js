"use client";
import Icon from "@/elements/Icon";
import Btn from "@/elements/btn";

const GenericReport = ({ isOpen, onClose, reportData, filters }) => {
   const formatDate = (dateString) => {
      if (!dateString) return "Nunca utilizado";
      const date = new Date(dateString);
      return date.toLocaleDateString("pt-BR");
   };

   const formatDateTime = (dateString) => {
      const date = new Date(dateString);
      return date.toLocaleString("pt-BR");
   };

   if (!isOpen) return null;

   // Renderização condicional das tabelas conforme filtro
   const showManagers =
      filters.searchCriteria === "manager" || filters.searchCriteria === "none";
   const showDrivers = filters.searchCriteria === "motorista";
   const showCars = filters.searchCriteria === "carro";
   const showEvents = filters.searchCriteria === "event";

   return (
      <div
         id="generic-report-preview"
         className="print:p-0 p-10 text-black fixed top-0 left-0 w-full h-full bg-white overflow-y-auto"
      >
         {/* Cabeçalho */}
         <header className="border-b border-bee-dark-300 pb-4 mb-6">
            <div className="flex justify-between items-start">
               <div>
                  <h1 className="text-3xl font-bold">
                     {filters.searchCriteria === "carro"
                        ? "Relatório de Veículos"
                        : filters.searchCriteria === "motorista"
                          ? "Relatório de Motoristas"
                          : filters.searchCriteria === "manager"
                            ? "Relatório de Gestores"
                            : filters.searchCriteria === "event"
                              ? "Relatório de Eventos"
                              : "Relatório Completo"}
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
                  <Icon name={showCars?"car":showDrivers?"user":showEvents?"eventoL":showManagers?"gestor":"report"} className="size-8" />
               </div>
            </div>

            {/* Filtros aplicados */}
            <div className="mt-4">
               <h2 className="text-lg font-semibold mb-2">Filtros Aplicados</h2>
               <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                     <p className="text-sm text-gray-500">Período:</p>
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
                        <p className="text-sm text-gray-500">Filtro:</p>
                        <p>
                           {filters.searchCriteria === "carro"
                              ? "Veículo: "
                              : filters.searchCriteria === "motorista"
                                ? "Motorista: "
                                : filters.searchCriteria === "manager"
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
         </header>

         {/* Corpo do Relatório */}
         <div className="space-y-8">
            {/* Estatísticas Gerais */}
            {filters.searchCriteria === "none" && (
               <>
                  <section>
                     <h2 className="flex items-center gap-2 text-xl font-semibold mb-4">
                        <Icon name="analytics" className="size-5" />
                        Estatísticas Gerais
                     </h2>
                     <div className="grid grid-cols-3 gap-4">
                        <div className="p-4 rounded-lg border">
                           <p className="text-sm text-gray-500">
                              Total de Gestores
                           </p>
                           <p className="text-2xl font-bold">
                              {reportData.globalStats.totalManagers || 0}
                           </p>
                        </div>
                        <div className="p-4 rounded-lg border">
                           <p className="text-sm text-gray-500">
                              Total de Motoristas
                           </p>
                           <p className="text-2xl font-bold">
                              {reportData.globalStats.totalDrivers || 0}
                           </p>
                        </div>
                        <div className="p-4 rounded-lg border">
                           <p className="text-sm text-gray-500">
                              Total de Veículos
                           </p>
                           <p className="text-2xl font-bold">
                              {reportData.globalStats.totalCars || 0}
                           </p>
                        </div>
                     </div>
                  </section>

                  {/* Quantidade de Itens Excluídos */}
                  <section>
                     <h2 className="flex items-center gap-2 text-lg font-semibold mt-6 mb-2">
                        <Icon name="trash" className="size-5" strokeWidth={2} />
                        Itens Excluídos
                     </h2>
                     <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <div className="p-4 rounded-lg border bg-red-50">
                           <p className="text-sm text-red-700">
                              Motoristas excluídos
                           </p>
                           <p className="text-xl font-bold text-red-700">
                              {reportData.globalStats.totalDeletedDrivers || 0}
                           </p>
                        </div>
                        <div className="p-4 rounded-lg border bg-red-50">
                           <p className="text-sm text-red-700">
                              Veículos excluídos
                           </p>
                           <p className="text-xl font-bold text-red-700">
                              {reportData.globalStats.totalDeletedCars || 0}
                           </p>
                        </div>
                        <div className="p-4 rounded-lg border bg-red-50">
                           <p className="text-sm text-red-700">
                              Eventos excluídos
                           </p>
                           <p className="text-xl font-bold text-red-700">
                              {reportData.globalStats.totalDeletedEvents || 0}
                           </p>
                        </div>
                     </div>
                  </section>

                  {/* Tabela de Gestores */}
                  <section>
                     <h2 className="flex items-center gap-2 text-xl font-semibold mb-4">
                        <Icon name="gestor" className="size-5" />
                        Gestores
                     </h2>
                     <div className="overflow-x-auto">
                        <table className="min-w-full divide-y divide-gray-200">
                           <thead className="bg-gray-50">
                              <tr>
                                 <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    Nome
                                 </th>
                                 <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    Email
                                 </th>
                                 <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    Motoristas
                                 </th>
                                 <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    Veículos
                                 </th>
                                 <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    Eventos
                                 </th>
                              </tr>
                           </thead>
                           <tbody className="divide-y divide-gray-200">
                              {reportData.managers
                                 .slice()
                                 .sort(
                                    (a, b) =>
                                       new Date(b.createdAt) -
                                       new Date(a.createdAt)
                                 )
                                 .slice(0, 5)
                                 .map((manager) => (
                                    <tr key={manager.id}>
                                       <td className="px-6 py-4 whitespace-nowrap">
                                          {manager.name}
                                       </td>
                                       <td className="px-6 py-4 whitespace-nowrap">
                                          {manager.email}
                                       </td>
                                       <td className="px-6 py-4 whitespace-nowrap">
                                          {manager.summary.totalDrivers} ativos
                                       </td>
                                       <td className="px-6 py-4 whitespace-nowrap">
                                          {manager.summary.totalCars} ativos
                                       </td>
                                       <td className="px-6 py-4 whitespace-nowrap">
                                          {manager.summary.totalEvents}
                                       </td>
                                    </tr>
                                 ))}
                           </tbody>
                        </table>
                     </div>
                  </section>

                  {/* Tabela de Motoristas */}
                  <section>
                     <h2 className="flex items-center gap-2 text-xl font-semibold mb-4">
                        <Icon name="users" className="size-5" />
                        Motoristas
                     </h2>
                     <div className="overflow-x-auto">
                        <table className="min-w-full divide-y divide-gray-200">
                           <thead className="bg-gray-50">
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
                                 <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    Status
                                 </th>
                              </tr>
                           </thead>
                           <tbody className="divide-y divide-gray-200">
                              {reportData.managers
                                 .flatMap((manager) => manager.drivers)
                                 .sort(
                                    (a, b) =>
                                       new Date(b.createdAt) -
                                       new Date(a.createdAt)
                                 )
                                 .slice(0, 5)
                                 .map((driver) => (
                                    <tr key={driver.id}>
                                       <td className="px-6 py-4 whitespace-nowrap">
                                          {driver.name}
                                       </td>
                                       <td className="px-6 py-4 whitespace-nowrap">
                                          {driver.phone}
                                       </td>
                                       <td className="px-6 py-4 whitespace-nowrap">
                                          {driver.license}
                                       </td>
                                       <td className="px-6 py-4 whitespace-nowrap">
                                          {driver.isAvailable
                                             ? "Disponivel"
                                             : "Indisponível"}
                                       </td>
                                    </tr>
                                 ))}
                           </tbody>
                        </table>
                     </div>
                  </section>

                  {/* Tabela de Veículos */}
                  <section>
                     <h2 className="flex items-center gap-2 text-xl font-semibold mb-4">
                        <Icon name="car" className="size-5" />
                        Veículos
                     </h2>
                     <div className="overflow-x-auto">
                        <table className="min-w-full divide-y divide-gray-200">
                           <thead className="bg-gray-50">
                              <tr>
                                 <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    Placa
                                 </th>
                                 <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    Marca
                                 </th>
                                 <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    Modelo
                                 </th>
                                 <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    Ano
                                 </th>
                                 <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    Status
                                 </th>
                              </tr>
                           </thead>
                           <tbody className="divide-y divide-gray-200">
                              {reportData.managers
                                 .flatMap((manager) => manager.cars)
                                 .sort(
                                    (a, b) =>
                                       new Date(b.createdAt) -
                                       new Date(a.createdAt)
                                 )
                                 .slice(0, 5)
                                 .map((car) => (
                                    <tr key={car.id}>
                                       <td className="px-6 py-4 whitespace-nowrap">
                                          {car.plate}
                                       </td>
                                       <td className="px-6 py-4 whitespace-nowrap">
                                          {car.brand}
                                       </td>
                                       <td className="px-6 py-4 whitespace-nowrap">
                                          {car.model}
                                       </td>
                                       <td className="px-6 py-4 whitespace-nowrap">
                                          {car.year}
                                       </td>
                                       <td className="px-6 py-4 whitespace-nowrap">
                                          {car.status === "IN_USE"
                                             ? "Em uso"
                                             : "Disponível"}
                                       </td>
                                    </tr>
                                 ))}
                           </tbody>
                        </table>
                     </div>
                  </section>

                  {/* Tabela de Eventos */}
                  <section>
                     <h2 className="flex items-center gap-2 text-xl font-semibold mb-4">
                        <Icon name="eventoL" className="size-5" />
                        Eventos
                     </h2>
                     <div className="overflow-x-auto">
                        <table className="min-w-full divide-y divide-gray-200">
                           <thead className="bg-gray-50">
                              <tr>
                                 <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    Tipo
                                 </th>
                                 <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    Data/Hora
                                 </th>
                                 <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    Status
                                 </th>
                                 <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    Motorista
                                 </th>
                                 <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    Veículo
                                 </th>
                                 <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    Odômetro
                                 </th>
                              </tr>
                           </thead>
                           <tbody className="divide-y divide-gray-200">
                              {reportData.managers
                                 .flatMap((manager) => manager.events)
                                 .sort(
                                    (a, b) =>
                                       new Date(b.createdAt) -
                                       new Date(a.createdAt)
                                 )
                                 .slice(0, 5)
                                 .map((event) => (
                                    <tr key={event.id}>
                                       <td className="px-6 py-4 whitespace-nowrap">
                                          {event.eventType === "CHECKOUT"
                                             ? "Saída"
                                             : "Retorno"}
                                       </td>
                                       <td className="px-6 py-4 whitespace-nowrap">
                                          {formatDateTime(event.createdAt)}
                                       </td>
                                       <td className="px-6 py-4 whitespace-nowrap">
                                          <span
                                             className={`px-2 py-1 rounded text-xs ${
                                                event.status === "COMPLETED"
                                                   ? "bg-green-100 text-green-800"
                                                   : "bg-yellow-100 text-yellow-800"
                                             }`}
                                          >
                                             {event.status === "COMPLETED"
                                                ? "Concluído"
                                                : "Ativo"}
                                          </span>
                                       </td>
                                       <td className="px-6 py-4 whitespace-nowrap">
                                          {event.driverName}
                                       </td>
                                       <td className="px-6 py-4 whitespace-nowrap">
                                          {event.carInfo}
                                       </td>
                                       <td className="px-6 py-4 whitespace-nowrap">
                                          {event.odometer}km
                                       </td>
                                    </tr>
                                 ))}
                           </tbody>
                        </table>
                     </div>
                  </section>
               </>
            )}

            {/* Lista de Gestores */}
            {showManagers && (
               <section>
                  <h2 className="flex items-center gap-2 text-xl font-semibold mb-4">
                     <Icon name="gestor" className="size-5" />
                     Gestores
                  </h2>
                  <div className="overflow-x-auto">
                     <table className="min-w-full divide-y divide-gray-200">
                        <thead className="bg-gray-50">
                           <tr>
                              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                 Nome
                              </th>
                              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                 Email
                              </th>
                              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                 Motoristas
                              </th>
                              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                 Veículos
                              </th>
                              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                 Eventos
                              </th>
                           </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-200">
                           {reportData.managers.map((manager) => (
                              <tr key={manager.id}>
                                 <td className="px-6 py-4 whitespace-nowrap">
                                    <div className="font-medium">
                                       {manager.name}
                                    </div>
                                 </td>
                                 <td className="px-6 py-4 whitespace-nowrap">
                                    <div className="text-sm text-gray-500">
                                       {manager.email}
                                    </div>
                                 </td>
                                 <td className="px-6 py-4 whitespace-nowrap">
                                    <div className="font-medium">
                                       {manager.summary.totalDrivers} ativos
                                    </div>
                                    <div className="text-sm text-gray-500">
                                       {manager.summary.totalDeletedDrivers}{" "}
                                       removidos
                                    </div>
                                 </td>
                                 <td className="px-6 py-4 whitespace-nowrap">
                                    <div className="font-medium">
                                       {manager.summary.totalCars} ativos
                                    </div>
                                    <div className="text-sm text-gray-500">
                                       {manager.summary.totalDeletedCars}{" "}
                                       removidos
                                    </div>
                                 </td>
                                 <td className="px-6 py-4 whitespace-nowrap">
                                    <div className="font-medium">
                                       {manager.summary.totalEvents}
                                    </div>
                                 </td>
                              </tr>
                           ))}
                        </tbody>
                     </table>
                  </div>
               </section>
            )}

            {/* Lista de Motoristas */}
            {showDrivers && (
               <section>
                  <h2 className="flex items-center gap-2 text-xl font-semibold mb-4">
                     <Icon name="users" className="size-5" />
                     Motoristas
                  </h2>
                  <div className="overflow-x-auto">
                     <table className="min-w-full divide-y divide-gray-200">
                        <thead className="bg-gray-50">
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
                              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                 Status
                              </th>
                           </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-200">
                           {reportData.managers
                              .flatMap((manager) => manager.drivers)
                              .sort(
                                 (a, b) =>
                                    new Date(b.createdAt) -
                                    new Date(a.createdAt)
                              )
                              .map((driver) => (
                                 <tr key={driver.id}>
                                    <td className="px-6 py-4 whitespace-nowrap">
                                       {driver.name}
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap">
                                       {driver.phone}
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap">
                                       {driver.license}
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap">
                                       {driver.isAvailable
                                          ? "Disponível"
                                          : "Indisponível"}
                                    </td>
                                 </tr>
                              ))}
                        </tbody>
                     </table>
                  </div>
               </section>
            )}

            {/* Lista de Veículos */}
            {showCars && (
               <section>
                  <h2 className="flex items-center gap-2 text-xl font-semibold mb-4">
                     <Icon name="car" className="size-5" />
                     Veículos
                  </h2>
                  <div className="overflow-x-auto">
                     <table className="min-w-full divide-y divide-gray-200">
                        <thead className="bg-gray-50">
                           <tr>
                              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                 Carro
                              </th>
                              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                 Renavam
                              </th>
                              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                 Placa
                              </th>
                              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                 Ano
                              </th>
                              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                 Cor
                              </th>
                              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                 Hodometro
                              </th>
                              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                 Status
                              </th>
                           </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-200">
                           {reportData.managers
                              .flatMap((manager) => manager.cars)
                              .sort(
                                 (a, b) =>
                                    new Date(b.createdAt) -
                                    new Date(a.createdAt)
                              )
                              .map((car) => (
                                 <tr key={car.id}>
                                    <td className="px-6 py-4 whitespace-nowrap">
                                       <div  className="flex flex-col">
                                          <span className="font-bold">
                                             {car.model}
                                          </span>
                                          {car.brand}
                                       </div>
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap">
                                       {car.renavam}
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap">
                                       {car.plate}
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap">
                                       {car.year}
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap">
                                       {car.color}
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap">
                                       {car.odometer}km
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap">
                                       {car.status === "IN_USE"
                                          ? "Em uso"
                                          : "Disponível"}
                                    </td>
                                 </tr>
                              ))}
                        </tbody>
                     </table>
                  </div>
               </section>
            )}

            {/* Lista de Eventos */}
            {showEvents && (
               <section>
                  <h2 className="flex items-center gap-2 text-xl font-semibold mb-4">
                     <Icon name="eventoL" className="size-5" />
                     Eventos
                  </h2>
                  <div className="overflow-x-auto">
                     <table className="min-w-full divide-y divide-gray-200">
                        <thead className="bg-gray-50">
                           <tr>
                              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                 Tipo
                              </th>
                              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                 Data/Hora
                              </th>
                              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                 Status
                              </th>
                              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                 Motorista
                              </th>
                              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                 Veículo
                              </th>
                              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                 Odômetro
                              </th>
                           </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-200">
                           {reportData.managers
                              .flatMap((manager) => manager.events)
                              .sort(
                                 (a, b) =>
                                    new Date(b.createdAt) -
                                    new Date(a.createdAt)
                              )
                              .map((event) => (
                                 <tr key={event.id}>
                                    <td className="px-6 py-4 whitespace-nowrap">
                                       {event.eventType === "CHECKOUT"
                                          ? "Saída"
                                          : "Retorno"}
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap">
                                       {formatDateTime(event.createdAt)}
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap">
                                       <span
                                          className={`px-2 py-1 rounded text-xs ${
                                             event.status === "COMPLETED"
                                                ? "bg-green-100 text-green-800"
                                                : "bg-yellow-100 text-yellow-800"
                                          }`}
                                       >
                                          {event.status === "COMPLETED"
                                             ? "Concluído"
                                             : "Ativo"}
                                       </span>
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap">
                                       {event.driverName}
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap">
                                       {event.carInfo}
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap">
                                       {event.odometer} km
                                    </td>
                                 </tr>
                              ))}
                        </tbody>
                     </table>
                  </div>
               </section>
            )}
         </div>

         {/* Rodapé */}
         <footer className="mt-8 pt-6 border-t border-bee-dark-300">
            <div className="flex justify-between items-center">
               <div className="text-xs text-gray-500">
                  <p>Relatório gerado automaticamente pelo sistema Bee Fleet</p>
                  <p className="mt-1">
                     © {new Date().getFullYear()} - Todos os direitos
                     reservados
                  </p>
               </div>
            </div>
         </footer>
      </div>
   );
};

export default GenericReport;
