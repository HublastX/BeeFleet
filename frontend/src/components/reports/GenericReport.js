"use client";
import Btn from "@/elements/btn";
import Icon from "@/elements/Icon";
import { saveAs } from "file-saver";
import ExcelJS from "exceljs";

const GenericReport = ({ isOpen, reportData, filters }) => {
   const formatDate = (dateString) => {
      if (!dateString) return "Nunca utilizado";
      const date = new Date(dateString);
      return date.toLocaleDateString("pt-BR");
   };

   const formatDateTime = (dateString) => {
      const date = new Date(dateString);
      return date.toLocaleString("pt-BR");
   };

   const hasActivityToday = (manager) => {
      const today = new Date().toLocaleDateString("pt-BR");
      return (
         manager.events?.some(
            (event) => formatDate(event.createdAt) === today
         ) ||
         manager.drivers?.some(
            (driver) => formatDate(driver.createdAt) === today
         ) ||
         manager.cars?.some((car) => formatDate(car.createdAt) === today)
      );
   };

   const getActiveManagers = () => {
      if (filters.period !== "today") return reportData.managers;
      return reportData.managers.filter((manager) => hasActivityToday(manager));
   };

   const getItemInfo = () => {
      if (!filters.selectedItem?.id) return "";
      if (!reportData) return "";
      if (!reportData.managers) return "";

      switch (filters.filterType) {
         case "carro":
            const car = reportData.managers
               .flatMap((m) => m.cars || [])
               .find((c) => c.id === filters.selectedItem.id);
            return car?.plate || "";
         case "motorista":
            const driver = reportData.managers
               .flatMap((m) => m.drivers || [])
               .find((d) => d.id === filters.selectedItem.id);
            return driver?.name || "";
         case "manager":
            const manager = reportData.managers.find(
               (m) => m.id === filters.selectedItem.id
            );
            return manager?.name || "";
         case "event":
            const event = reportData.managers
               .flatMap((m) => m.events || [])
               .find((e) => e.id === filters.selectedItem.id);
            return event ? `${event.carInfo} - ${event.driverName}` : "";
         default:
            return "";
      }
   };

   if (!isOpen) return null;

   // Renderização condicional das tabelas conforme filtro
   const showManagers = filters.filterType === "manager";
   const showDrivers = filters.filterType === "motorista";
   const showCars = filters.filterType === "carro";
   const showEvents = filters.filterType === "event";
   const showAll = filters.filterType === "all";

   const handlePrint = () => {
      window.print();
   };

   const exportExcel = async () => {
      const workbook = new ExcelJS.Workbook();

      // 1. Aba de Gestores
      const managersSheet = workbook.addWorksheet("Gestores");
      managersSheet.columns = [
         { header: "Nome", key: "name", width: 30 },
         { header: "Email", key: "email", width: 30 },
         { header: "Motoristas Ativos", key: "drivers", width: 20 },
         { header: "Motoristas Removidos", key: "driversRemoved", width: 20 },
         { header: "Veículos Ativos", key: "cars", width: 20 },
         { header: "Veículos Removidos", key: "carsRemoved", width: 20 },
         { header: "Eventos", key: "events", width: 15 },
      ];
      getActiveManagers().forEach((manager) => {
         managersSheet.addRow({
            name: manager.name,
            email: manager.email,
            drivers: manager.summary.totalDrivers,
            driversRemoved: manager.summary.totalDeletedDrivers,
            cars: manager.summary.totalCars,
            carsRemoved: manager.summary.totalDeletedCars,
            events: manager.summary.totalEvents,
         });
      });

      // Cor no cabeçalho
      managersSheet.getRow(1).eachCell((cell) => {
         cell.fill = {
            type: "pattern",
            pattern: "solid",
            fgColor: { argb: "FFDEEAF6" },
         };
         cell.font = { bold: true, color: { argb: "FF1F4E78" } };
         cell.alignment = { vertical: "middle", horizontal: "center" };
      });

      // Linhas alternadas
      managersSheet.eachRow((row, rowNumber) => {
         if (rowNumber !== 1 && rowNumber % 2 === 0) {
            row.eachCell((cell) => {
               cell.fill = {
                  type: "pattern",
                  pattern: "solid",
                  fgColor: { argb: "FFF3F6FA" },
               };
            });
         }
      });

      // Motoristas
      const driversSheet = workbook.addWorksheet("Motoristas");
      driversSheet.columns = [
         { header: "Nome", key: "name", width: 30 },
         { header: "Telefone", key: "phone", width: 20 },
         { header: "CNH", key: "license", width: 20 },
         { header: "Status", key: "status", width: 15 },
         { header: "Gestor", key: "manager", width: 30 },
      ];
      getActiveManagers().forEach((manager) => {
         (manager.drivers || []).forEach((driver) => {
            driversSheet.addRow({
               name: driver.name,
               phone: driver.phone,
               license: driver.license,
               status: driver.isAvailable ? "Disponível" : "Indisponível",
               manager: manager.name,
            });
         });
      });
      driversSheet.getRow(1).eachCell((cell) => {
         cell.fill = {
            type: "pattern",
            pattern: "solid",
            fgColor: { argb: "FFDEEAF6" },
         };
         cell.font = { bold: true, color: { argb: "FF1F4E78" } };
         cell.alignment = { vertical: "middle", horizontal: "center" };
      });
      driversSheet.eachRow((row, rowNumber) => {
         if (rowNumber !== 1 && rowNumber % 2 === 0) {
            row.eachCell((cell) => {
               cell.fill = {
                  type: "pattern",
                  pattern: "solid",
                  fgColor: { argb: "FFF3F6FA" },
               };
            });
         }
      });

      // Veículos
      const carsSheet = workbook.addWorksheet("Veículos");
      carsSheet.columns = [
         { header: "Modelo", key: "model", width: 20 },
         { header: "Marca", key: "brand", width: 20 },
         { header: "Placa", key: "plate", width: 15 },
         { header: "Ano", key: "year", width: 10 },
         { header: "Cor", key: "color", width: 15 },
         { header: "Renavam", key: "renavam", width: 20 },
         { header: "Hodômetro", key: "odometer", width: 15 },
         { header: "Status", key: "status", width: 15 },
         { header: "Gestor", key: "manager", width: 30 },
      ];
      getActiveManagers().forEach((manager) => {
         (manager.cars || []).forEach((car) => {
            carsSheet.addRow({
               model: car.model,
               brand: car.brand,
               plate: car.plate,
               year: car.year,
               color: car.color,
               renavam: car.renavam,
               chassis: car.chassis,
               odometer: car.odometer,
               status: car.status === "IN_USE" ? "Em uso" : "Disponível",
               manager: manager.name,
            });
         });
      });
      carsSheet.getRow(1).eachCell((cell) => {
         cell.fill = {
            type: "pattern",
            pattern: "solid",
            fgColor: { argb: "FFDEEAF6" },
         };
         cell.font = { bold: true, color: { argb: "FF1F4E78" } };
         cell.alignment = { vertical: "middle", horizontal: "center" };
      });
      carsSheet.eachRow((row, rowNumber) => {
         if (rowNumber !== 1 && rowNumber % 2 === 0) {
            row.eachCell((cell) => {
               cell.fill = {
                  type: "pattern",
                  pattern: "solid",
                  fgColor: { argb: "FFF3F6FA" },
               };
            });
         }
      });

      // Eventos
      const eventsSheet = workbook.addWorksheet("Eventos");
      eventsSheet.columns = [
         { header: "Tipo", key: "type", width: 15 },
         { header: "Data/Hora", key: "date", width: 25 },
         { header: "Status", key: "status", width: 15 },
         { header: "Motorista", key: "driver", width: 30 },
         { header: "Veículo", key: "car", width: 30 },
         { header: "Odômetro", key: "odometer", width: 15 },
         { header: "Gestor", key: "manager", width: 30 },
      ];
      getActiveManagers().forEach((manager) => {
         (manager.events || []).forEach((event) => {
            eventsSheet.addRow({
               type: event.eventType === "CHECKOUT" ? "Saída" : "Retorno",
               date: formatDateTime(event.createdAt),
               status: event.status === "COMPLETED" ? "Concluído" : "Ativo",
               driver: event.driverName,
               car: event.carInfo,
               odometer: event.odometer,
               manager: manager.name,
            });
         });
      });
      eventsSheet.getRow(1).eachCell((cell) => {
         cell.fill = {
            type: "pattern",
            pattern: "solid",
            fgColor: { argb: "FFDEEAF6" },
         };
         cell.font = { bold: true, color: { argb: "FF1F4E78" } };
         cell.alignment = { vertical: "middle", horizontal: "center" };
      });
      eventsSheet.eachRow((row, rowNumber) => {
         if (rowNumber !== 1 && rowNumber % 2 === 0) {
            row.eachCell((cell) => {
               cell.fill = {
                  type: "pattern",
                  pattern: "solid",
                  fgColor: { argb: "FFF3F6FA" },
               };
            });
         }
      });

      // Estatísticas
      const statsSheet = workbook.addWorksheet("Estatísticas");
      statsSheet.addRow([
         "Total de Gestores",
         reportData.globalStats.totalManagers || 0,
      ]);
      statsSheet.addRow([
         "Total de Motoristas",
         reportData.globalStats.totalDrivers || 0,
      ]);
      statsSheet.addRow([
         "Total de Veículos",
         reportData.globalStats.totalCars || 0,
      ]);
      statsSheet.addRow([
         "Total de Eventos",
         reportData.globalStats.totalEvents || 0,
      ]);
      statsSheet.addRow([
         "Motoristas Excluídos",
         reportData.globalStats.totalDeletedDrivers || 0,
      ]);
      statsSheet.addRow([
         "Veículos Excluídos",
         reportData.globalStats.totalDeletedCars || 0,
      ]);
      statsSheet.addRow([
         "Eventos Excluídos",
         reportData.globalStats.totalDeletedEvents || 0,
      ]);
      statsSheet.getRow(1).eachCell((cell) => {
         cell.fill = {
            type: "pattern",
            pattern: "solid",
            fgColor: { argb: "FFDEEAF6" },
         };
         cell.font = { bold: true, color: { argb: "FF1F4E78" } };
         cell.alignment = { vertical: "middle", horizontal: "center" };
      });

      const buffer = await workbook.xlsx.writeBuffer();
      saveAs(new Blob([buffer]), "relatorio_beefleet.xlsx");
   };

   return (
      <div className="print-area bg-white text-black h-full">
         {/* Cabeçalho */}
         <header className="border-b border-bee-dark-300 pb-4 mb-6">
            <div className="flex justify-between items-start">
               <div>
                  <h1 className="text-3xl font-bold">
                     {filters.filterType === "carro"
                        ? "Relatório de Veículos"
                        : filters.filterType === "motorista"
                          ? "Relatório de Motoristas"
                          : filters.filterType === "manager"
                            ? "Relatório de Gestores"
                            : filters.filterType === "event"
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
                  <Icon
                     name={
                        showCars
                           ? "car"
                           : showDrivers
                             ? "user"
                             : showEvents
                               ? "eventoL"
                               : showManagers
                                 ? "gestor"
                                 : "reports"
                     }
                     className="size-8"
                  />
               </div>
            </div>
            {/* Filtros aplicados */}
            <div className="mt-4">
               <h2 className="text-lg font-semibold mb-2">Filtros Aplicados</h2>
               <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                     <p className="text-sm text-gray-500">Período:</p>
                     <p>
                        {filters.period === "all"
                           ? "Todas as datas"
                           : filters.period === "today"
                             ? `Hoje (${new Date().toLocaleDateString("pt-BR")})`
                             : `${formatDate(filters.dateRange.start)} - ${formatDate(filters.dateRange.end)}`}
                     </p>
                  </div>
                  {filters.selectedItem && (
                     <div>
                        <p className="text-sm text-gray-500">Filtro:</p>
                        <p>
                           {filters.filterType === "carro"
                              ? "Veículo: "
                              : filters.filterType === "motorista"
                                ? "Motorista: "
                                : filters.filterType === "manager"
                                  ? "Gestor: "
                                  : filters.filterType === "event"
                                    ? "Evento: "
                                    : "5 últimas adições"}
                           {getItemInfo()}
                        </p>
                     </div>
                  )}
               </div>
            </div>
         </header>
         {/* Corpo do Relatório */}
         <div className="space-y-8">
            {/* Estatísticas Gerais */}
            {filters.filterType === "all" && (
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
                     <div className="grid grid-cols-3 gap-4">
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
                        {getActiveManagers().length > 0 ? (
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
                                 {getActiveManagers()
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
                                             {manager.summary.totalDrivers}{" "}
                                             ativos
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
                        ) : (
                           <div className="p-4 text-gray-500">
                              Nenhum gestor encontrado.
                           </div>
                        )}
                     </div>
                  </section>
                  {/* Tabela de Motoristas */}
                  <section>
                     <h2 className="flex items-center gap-2 text-xl font-semibold mb-4">
                        <Icon name="users" className="size-5" />
                        Motoristas
                     </h2>
                     <div className="overflow-x-auto">
                        {getActiveManagers().flatMap(
                           (manager) => manager.drivers
                        ).length > 0 ? (
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
                                 {getActiveManagers()
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
                        ) : (
                           <div className="p-4 text-gray-500">
                              Nenhum motorista encontrado.
                           </div>
                        )}
                     </div>
                  </section>
                  {/* Tabela de Veículos */}
                  <section>
                     <h2 className="flex items-center gap-2 text-xl font-semibold mb-4">
                        <Icon name="car" className="size-5" />
                        Veículos
                     </h2>
                     <div className="overflow-x-auto">
                        {getActiveManagers().flatMap((manager) => manager.cars)
                           .length > 0 ? (
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
                                 {getActiveManagers()
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
                        ) : (
                           <div className="p-4 text-gray-500">
                              Nenhum veículo encontrado.
                           </div>
                        )}
                     </div>
                  </section>
                  {/* Tabela de Eventos */}
                  <section>
                     <h2 className="flex items-center gap-2 text-xl font-semibold mb-4">
                        <Icon name="evento" className="size-5" />
                        Eventos Finalizados
                     </h2>
                     <div className="overflow-x-auto">
                        {getActiveManagers()
                           .flatMap((manager) => manager.events || [])
                           .filter((event) => event.eventType === "RETURN")
                           .length > 0 ? (
                           <table className="min-w-full divide-y divide-gray-200">
                              <thead className="bg-gray-50">
                                 <tr>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                       Motorista
                                    </th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                       Veículo
                                    </th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                       Saida
                                    </th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                       Chegada
                                    </th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                       Distancia
                                    </th>
                                 </tr>
                              </thead>
                              <tbody className="divide-y divide-gray-200">
                                 {getActiveManagers()
                                    .flatMap((manager) => manager.events)
                                    .filter(
                                       (event) => event.eventType === "RETURN"
                                    )
                                    .sort(
                                       (a, b) =>
                                          new Date(b.createdAt) -
                                          new Date(a.createdAt)
                                    )
                                    .slice(0, 5)
                                    .map((event) => (
                                       <tr key={event.id}>
                                          <td className="px-6 py-4 whitespace-nowrap">
                                             {event.driverName}
                                          </td>
                                          <td className="px-6 py-4 whitespace-nowrap">
                                             <div className="grid grid-cols-1">
                                                {event.carInfo.split("(")[0]}
                                                <span className="text-sm text-gray-500">
                                                   {event.carInfo.includes("(")
                                                      ? `(${event.carInfo
                                                           .split("(")[1]
                                                           .replace(")", "")})`
                                                      : ""}
                                                </span>
                                             </div>
                                          </td>
                                          <td className="px-6 py-4 whitespace-nowrap">
                                             <div className="grid grid-cols-1">
                                                <span className="text-bold">
                                                   {
                                                      formatDateTime(
                                                         event.createdAt
                                                      ).split(",")[0]
                                                   }
                                                </span>
                                                <span className="text-sm text-gray-500">
                                                   {
                                                      formatDateTime(
                                                         event.createdAt
                                                      ).split(",")[1]
                                                   }
                                                </span>
                                             </div>
                                          </td>
                                          <td className="px-6 py-4 whitespace-nowrap ">
                                             <div className="grid grid-cols-1">
                                                <span className="text-bold">
                                                   {
                                                      formatDateTime(
                                                         event.endedAt
                                                      ).split(",")[0]
                                                   }
                                                </span>
                                                <span className="text-sm text-gray-500">
                                                   {
                                                      formatDateTime(
                                                         event.endedAt
                                                      ).split(",")[1]
                                                   }
                                                </span>
                                             </div>
                                          </td>

                                          <td className="px-6 py-4 whitespace-nowrap">
                                             {event.odometer}km
                                          </td>
                                       </tr>
                                    ))}
                              </tbody>
                           </table>
                        ) : (
                           <div className="p-4 text-gray-500">
                              Nenhum evento de retorno encontrado.
                           </div>
                        )}
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
                           {getActiveManagers()
                              .filter(
                                 (manager) =>
                                    !filters.selectedItem?.id ||
                                    manager.id === filters.selectedItem.id
                              )
                              .map((manager) => (
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
                     {getActiveManagers().flatMap((manager) => manager.drivers)
                        .length > 0 ? (
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
                              {getActiveManagers()
                                 .flatMap((manager) => manager.drivers)
                                 .filter(
                                    (driver) =>
                                       !filters.selectedItem?.id ||
                                       driver.id === filters.selectedItem.id
                                 )
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
                     ) : (
                        <div className="p-4 text-gray-500">
                           Nenhum motorista encontrado.
                        </div>
                     )}
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
                     {getActiveManagers().flatMap((manager) => manager.cars)
                        .length > 0 ? (
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
                              {getActiveManagers()
                                 .flatMap((manager) => manager.cars)
                                 .filter(
                                    (car) =>
                                       !filters.selectedItem?.id ||
                                       car.id === filters.selectedItem.id
                                 )
                                 .sort(
                                    (a, b) =>
                                       new Date(b.createdAt) -
                                       new Date(a.createdAt)
                                 )
                                 .map((car) => (
                                    <tr key={car.id}>
                                       <td className="px-6 py-4 whitespace-nowrap">
                                          <div className="flex flex-col">
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
                     ) : (
                        <div className="p-4 text-gray-500">
                           Nenhum veículo encontrado.
                        </div>
                     )}
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
                     {getActiveManagers().flatMap((manager) => manager.events)
                        .length > 0 ? (
                        <table className="min-w-full divide-y divide-gray-200">
                           <thead className="bg-gray-50">
                              <tr>
                                 <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    Tipo
                                 </th>
                                 <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    Veículo
                                 </th>
                                 <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    Motorista
                                 </th>

                                 <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    Data/Hora
                                 </th>
                                 <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    Status
                                 </th>

                                 <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    Hodômetro
                                 </th>
                              </tr>
                           </thead>
                           <tbody className="divide-y divide-gray-200">
                              {getActiveManagers()
                                 .flatMap((manager) => manager.events)
                                 .filter(
                                    (event) =>
                                       !filters.selectedItem?.id ||
                                       event.id === filters.selectedItem.id
                                 )
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
                                          <div className="grid grid-cols-1">
                                             {event.carInfo.split("(")[0]}
                                             <span className="text-sm text-gray-500">
                                                {event.carInfo.includes("(")
                                                   ? `(${event.carInfo
                                                        .split("(")[1]
                                                        .replace(")", "")})`
                                                   : ""}
                                             </span>
                                          </div>
                                       </td>
                                       <td className="px-6 py-4 whitespace-nowrap">
                                          {event.driverName}
                                       </td>
                                       <td className="px-6 py-4 whitespace-nowrap">
                                          <div className="grid grid-cols-1">
                                             <span className="text-bold">
                                                {
                                                   formatDateTime(
                                                      event.createdAt
                                                   ).split(",")[0]
                                                }
                                             </span>
                                             <span className="text-sm text-gray-500">
                                                {
                                                   formatDateTime(
                                                      event.createdAt
                                                   ).split(",")[1]
                                                }
                                             </span>
                                          </div>
                                       </td>
                                       <td className="px-6 py-4 whitespace-nowrap">
                                          {event.status === "COMPLETED"
                                             ? "Concluído"
                                             : "Ativo"}
                                       </td>

                                       <td className="px-6 py-4 whitespace-nowrap">
                                          {event.odometer}km
                                       </td>
                                    </tr>
                                 ))}
                           </tbody>
                        </table>
                     ) : (
                        <div className="p-4 text-gray-500">
                           Nenhum evento encontrado.
                        </div>
                     )}
                  </div>
               </section>
            )}
         </div>
         {/* Rodapé */}
         <footer className="mt-8 pb-3 pt-6 border-t border-bee-dark-300">
            <div className="flex justify-between items-center">
               <div className="text-xs text-gray-500">
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
};

export default GenericReport;
