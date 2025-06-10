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

   const calculateDuration = (startDate, endDate) => {
      const start = new Date(startDate);
      const end = new Date(endDate);
      const diff = end - start;

      const days = Math.floor(diff / (1000 * 60 * 60 * 24));
      const hours = Math.floor(
         (diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
      );
      const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((diff % (1000 * 60)) / 1000);

      let duration = "";
      if (days > 0) duration += `${days}d `;
      if (hours > 0) duration += `${hours}h `;
      if (minutes > 0) duration += `${minutes}min `;
      duration += `${seconds}s`;

      return duration;
   };

   const getEventDuration = (event) => {
      if (event.eventType === "RETURN" && event.checkoutEventId) {
         const checkoutEvent = reportData.managers
            .flatMap((m) => m.events)
            .find((e) => e.id === event.checkoutEventId);
         if (checkoutEvent) {
            return calculateDuration(checkoutEvent.createdAt, event.endedAt);
         }
      }
      return "N/A";
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

   const hasActivityInRange = (manager) => {
      const startDate = new Date(filters.dateRange.start).toLocaleDateString(
         "pt-BR"
      );
      const endDate = new Date(filters.dateRange.end).toLocaleDateString(
         "pt-BR"
      );

      return (
         manager.events?.some((event) => {
            const eventDate = formatDate(event.createdAt);
            return eventDate >= startDate && eventDate <= endDate;
         }) ||
         manager.drivers?.some((driver) => {
            const driverDate = formatDate(driver.createdAt);
            return driverDate >= startDate && driverDate <= endDate;
         }) ||
         manager.cars?.some((car) => {
            const carDate = formatDate(car.createdAt);
            return carDate >= startDate && carDate <= endDate;
         })
      );
   };

   const getActiveManagers = () => {
      if (filters.period === "today") {
         return reportData.managers.filter((manager) =>
            hasActivityToday(manager)
         );
      }
      if (filters.period === "range" && filters.dateRange) {
         return reportData.managers.filter((manager) =>
            hasActivityInRange(manager)
         );
      }
      return reportData.managers;
   };

   const getFilteredGlobalStats = () => {
      const activeManagers = getActiveManagers();

      return {
         totalManagers: activeManagers.length,
         totalDrivers: activeManagers.reduce(
            (total, manager) => total + (manager.summary?.totalDrivers || 0),
            0
         ),
         totalDeletedDrivers: activeManagers.reduce(
            (total, manager) =>
               total + (manager.summary?.totalDeletedDrivers || 0),
            0
         ),
         totalCars: activeManagers.reduce(
            (total, manager) => total + (manager.summary?.totalCars || 0),
            0
         ),
         totalDeletedCars: activeManagers.reduce(
            (total, manager) =>
               total + (manager.summary?.totalDeletedCars || 0),
            0
         ),
         totalEvents: activeManagers.reduce(
            (total, manager) => total + (manager.summary?.totalEvents || 0),
            0
         ),
         totalDeletedEvents: activeManagers.reduce(
            (total, manager) =>
               total + (manager.summary?.totalDeletedEvents || 0),
            0
         ),
      };
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
            return event
               ? `${event.carInfo.split("(")[0].trim()} - ${event.driverName}`
               : "";
         default:
            return "";
      }
   };

   const getSelectedItemDetails = () => {
      if (!filters.selectedItem?.id) return null;

      const DetailCard = ({ title, children }) => (
         <div className="bg-white p-4 rounded-lg border border-gray-300 dark:bg-gray-800 dark:border-gray-700">
            <h3 className="text-lg font-semibold mb-3 text-bee-dark-600">
               {title}
            </h3>
            <div className="space-y-2">{children}</div>
         </div>
      );

      const InfoItem = ({ label, value }) => (
         <div className="flex justify-between items-center py-1 border-b border-gray-300 dark:border-gray-700 last:border-0">
            <span className="text-gray-600">{label}</span>
            <span className="font-medium">{value}</span>
         </div>
      );

      const StatCard = ({ label, value, icon }) => (
         <div className="bg-white p-4 rounded-lg border border-gray-300 dark:bg-gray-800 dark:border-gray-700">
            <div className="flex items-center gap-2 mb-2">
               <Icon name={icon} className="size-5 text-bee-dark-600" />
               <p className="text-sm text-gray-600">{label}</p>
            </div>
            <p className="text-2xl font-bold text-bee-dark-600">{value}</p>
         </div>
      );

      const EventCard = ({ event }) => {
         const findCheckoutEvent = (checkoutEventId) => {
            return reportData.managers
               .flatMap((m) => m.events)
               .find((e) => e.id === checkoutEventId);
         };

         const getEventDuration = (event) => {
            if (event.eventType === "RETURN" && event.checkoutEventId) {
               const checkoutEvent = findCheckoutEvent(event.checkoutEventId);
               if (checkoutEvent) {
                  return calculateDuration(
                     checkoutEvent.createdAt,
                     event.endedAt
                  );
               }
            }
            return "N/A";
         };

         return (
            <div className="bg-white p-4 rounded-lg border border-gray-300 dark:bg-gray-800 dark:border-gray-700 hover:border-bee-dark-300 dark:border-bee-dark-400 transition-colors">
               <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-2">
                     <div>
                        <h4 className="font-medium">
                           {event.eventType === "CHECKOUT"
                              ? "Saída de Veículo"
                              : "Retorno de Veículo"}
                        </h4>
                        <p className="text-sm text-gray-500">
                           {event.status === "COMPLETED"
                              ? "Concluído"
                              : "Em andamento"}
                        </p>
                     </div>
                  </div>
                  <div className="text-right">
                     <p className="font-medium">
                        {formatDateTime(event.createdAt).split(",")[0]}
                     </p>
                     <p className="text-sm text-gray-500">
                        {formatDateTime(event.createdAt).split(",")[1]}
                     </p>
                  </div>
               </div>

               <div className="space-y-3">
                  <div className="flex items-start gap-2">
                     <Icon name="car" className="size-4 text-gray-400 mt-1" />
                     <div>
                        <p className="text-sm text-gray-600">Veículo</p>
                        <p className="font-medium">
                           {event.carInfo.split("(")[0]}
                        </p>
                        {event.carInfo.includes("(") && (
                           <p className="text-sm text-gray-500">
                              ({event.carInfo.split("(")[1].replace(")", "")})
                           </p>
                        )}
                     </div>
                  </div>

                  <div className="flex items-start gap-2">
                     <Icon name="user" className="size-4 text-gray-400 mt-1" />
                     <div>
                        <p className="text-sm text-gray-600">Motorista</p>
                        <p className="font-medium">{event.driverName}</p>
                        <p className="text-sm text-gray-500">
                           {event.driverPhone}
                        </p>
                     </div>
                  </div>

                  {event.eventType === "RETURN" && (
                     <div className="flex items-start gap-2">
                        <Icon
                           name="clock"
                           className="size-4 text-gray-400 mt-1"
                        />
                        <div>
                           <p className="text-sm text-gray-600">Duração</p>
                           <p className="font-medium">
                              {getEventDuration(event)}
                           </p>
                        </div>
                     </div>
                  )}
               </div>
            </div>
         );
      };

      switch (filters.filterType) {
         case "manager":
            const manager = reportData.managers.find(
               (m) => m.id === filters.selectedItem.id
            );
            if (!manager) return null;
            return (
               <div className="mb-8">
                  <div className="flex items-center gap-3 mb-6 pb-4 border-b border-gray-200 dark:border-gray-700">
                     <div className="p-2 bg-bee-dark-100 rounded-lg">
                        <Icon
                           name="gestor"
                           className="size-8 text-bee-dark-600"
                        />
                     </div>
                     <div>
                        <h2 className="text-2xl font-bold text-bee-dark-600">
                           {manager.name}
                        </h2>
                        <p className="text-gray-500">Gestor</p>
                     </div>
                  </div>

                  <div className="grid grid-cols-1 gap-6">
                     <div>
                        <DetailCard title="Informações Gerais">
                           <InfoItem label="Email" value={manager.email} />
                           <InfoItem
                              label="Data de Cadastro"
                              value={formatDate(manager.createdAt)}
                           />
                        </DetailCard>
                     </div>

                     <div>
                        <div className="grid grid-cols-2 gap-4">
                           <StatCard
                              label="Motoristas Ativos"
                              value={manager.summary.totalDrivers}
                              icon="users"
                           />
                           <StatCard
                              label="Veículos Ativos"
                              value={manager.summary.totalCars}
                              icon="car"
                           />
                           <StatCard
                              label="Total de Eventos"
                              value={manager.summary.totalEvents}
                              icon="eventoL"
                           />
                           <StatCard
                              label="Itens Removidos"
                              value={
                                 manager.summary.totalDeletedDrivers +
                                 manager.summary.totalDeletedCars
                              }
                              icon="trash"
                           />
                        </div>
                     </div>
                  </div>
               </div>
            );

         case "motorista":
            const driver = reportData.managers
               .flatMap((m) => m.drivers || [])
               .find((d) => d.id === filters.selectedItem.id);
            const driverManager = reportData.managers.find((m) =>
               m.drivers?.some((d) => d.id === filters.selectedItem.id)
            );
            if (!driver) return null;

            const driverEvents =
               driverManager?.events
                  ?.filter((e) => e.driverName === driver.name)
                  .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
                  .slice(0, 5) || [];

            return (
               <div className="mb-8">
                  <div className="flex items-center gap-3 mb-6 pb-4 border-b border-bee-dark-300 dark:border-bee-dark-400">
                     <div className="p-2 bg-bee-dark-100 rounded-lg">
                        <Icon
                           name="user"
                           className="size-8 text-bee-dark-600"
                        />
                     </div>
                     <div>
                        <h2 className="text-2xl font-bold text-bee-dark-600">
                           {driver.name}
                        </h2>
                        <p className="text-gray-500">Motorista</p>
                     </div>
                  </div>

                  <div className="grid grid-cols-1 gap-6">
                     <DetailCard title="Informações do Motorista">
                        <InfoItem label="Telefone" value={driver.phone} />
                        <InfoItem label="CNH" value={driver.license} />
                        <InfoItem
                           label="Status"
                           value={
                              driver.isAvailable ? "Disponível" : "Indisponível"
                           }
                        />
                        <InfoItem
                           label="Data de Cadastro"
                           value={formatDate(driver.createdAt)}
                        />
                        <InfoItem
                           label="Gestor Responsável"
                           value={driverManager?.name}
                        />
                     </DetailCard>

                     <div className="space-y-4">
                        <h3 className="text-lg font-semibold text-bee-dark-600">
                           Últimos Eventos
                        </h3>
                        {driverEvents.length > 0 ? (
                           <div className="space-y-3">
                              {driverEvents.map((event) => (
                                 <EventCard key={event.id} event={event} />
                              ))}
                           </div>
                        ) : (
                           <p className="text-gray-500">
                              Nenhum evento registrado
                           </p>
                        )}
                     </div>
                  </div>
               </div>
            );

         case "carro":
            const car = reportData.managers
               .flatMap((m) => m.cars || [])
               .find((c) => c.id === filters.selectedItem.id);
            const carManager = reportData.managers.find((m) =>
               m.cars?.some((c) => c.id === filters.selectedItem.id)
            );
            if (!car) return null;

            const carEvents =
               carManager?.events
                  ?.filter((e) => e.carInfo.includes(car.plate))
                  .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
                  .slice(0, 5) || [];

            return (
               <div className="mb-8">
                  <div className="flex items-center gap-3 mb-6 pb-4 border-b border-bee-dark-300 dark:border-bee-dark-400">
                     <div className="p-2 bg-bee-dark-100 rounded-lg">
                        <Icon name="car" className="size-8 text-bee-dark-600" />
                     </div>
                     <div>
                        <h2 className="text-2xl font-bold text-bee-dark-600">
                           {car.model}
                        </h2>
                        <p className="text-gray-500">{car.brand}</p>
                     </div>
                  </div>

                  <div className="grid grid-cols-1 gap-6">
                     <DetailCard title="Informações do Veículo">
                        <InfoItem label="Placa" value={car.plate} />
                        <InfoItem label="Ano" value={car.year} />
                        <InfoItem label="Cor" value={car.color} />
                        <InfoItem label="Renavam" value={car.renavam} />
                        <InfoItem label="Chassi" value={car.chassis} />
                        <InfoItem
                           label="Hodômetro"
                           value={`${car.odometer}km`}
                        />
                        <InfoItem
                           label="Status"
                           value={
                              car.status === "IN_USE" ? "Em uso" : "Disponível"
                           }
                        />
                        <InfoItem
                           label="Data de Cadastro"
                           value={formatDate(car.createdAt)}
                        />
                        <InfoItem
                           label="Gestor Responsável"
                           value={carManager?.name}
                        />
                     </DetailCard>

                     <div className="space-y-4">
                        <h3 className="text-lg font-semibold text-bee-dark-600">
                           Últimos Eventos
                        </h3>
                        {carEvents.length > 0 ? (
                           <div className="space-y-3">
                              {carEvents.map((event) => (
                                 <EventCard key={event.id} event={event} />
                              ))}
                           </div>
                        ) : (
                           <p className="text-gray-500">
                              Nenhum evento registrado
                           </p>
                        )}
                     </div>
                  </div>
               </div>
            );

         case "event":
            const event = reportData.managers
               .flatMap((m) => m.events || [])
               .find((e) => e.id === filters.selectedItem.id);
            const eventManager = reportData.managers.find((m) =>
               m.events?.some((e) => e.id === filters.selectedItem.id)
            );
            if (!event) return null;

            return (
               <div className="mb-8">
                  <div className="flex items-center gap-3 mb-6 pb-4 border-b border-bee-dark-300 dark:border-bee-dark-400">
                     <div className="p-2 bg-bee-dark-100 rounded-lg">
                        <Icon
                           name="eventoL"
                           className="size-8 text-bee-dark-600"
                        />
                     </div>
                     <div>
                        <h2 className="text-2xl font-bold text-bee-dark-600">
                           {`${event.carInfo.split("(")[0].trim()} - ${event.driverName}`}
                        </h2>
                        <p className="text-gray-500">
                           {event.eventType === "CHECKOUT"
                              ? "Saída de Veículo"
                              : "Retorno de Veículo"}{" "}
                           • {formatDateTime(event.createdAt)}
                        </p>
                     </div>
                  </div>

                  <div className="grid grid-cols-1 gap-6">
                     <DetailCard title="Detalhes do Evento">
                        <InfoItem
                           label="Status"
                           value={
                              event.status === "COMPLETED"
                                 ? "Concluído"
                                 : "Ativo"
                           }
                        />
                        <InfoItem
                           label="Iniciado em"
                           value={formatDateTime(event.checkoutCreate)}
                        />
                        {event.endedAt && (
                           <InfoItem
                              label="Finalizado em"
                              value={formatDateTime(event.endedAt)}
                           />
                        )}
                        <InfoItem
                           label="Gestor Responsável"
                           value={eventManager?.name}
                        />
                     </DetailCard>

                     <DetailCard title="Informações da Viagem">
                        <InfoItem
                           label="Motorista"
                           value={`${event.driverName} - ${event.driverPhone}`}
                        />
                        <InfoItem label="Veículo" value={event.carInfo} />
                        <InfoItem
                           label="Distância"
                           value={`${event.distanceTraveled}km`}
                        />
                     </DetailCard>
                  </div>
               </div>
            );

         default:
            return null;
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

      const styleHeader = (sheet) => {
         sheet.getRow(1).eachCell((cell) => {
            cell.fill = {
               type: "pattern",
               pattern: "solid",
               fgColor: { argb: "FFDEEAF6" },
            };
            cell.font = { bold: true, color: { argb: "FF1F4E78" } };
            cell.alignment = { vertical: "middle", horizontal: "center" };
         });
      };

      const styleAlternateRows = (sheet) => {
         sheet.eachRow((row, rowNumber) => {
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
      };

      if (filters.filterType === "all" || filters.filterType === "manager") {
         const managersSheet = workbook.addWorksheet("Gestores");
         managersSheet.columns = [
            { header: "Nome", key: "name", width: 30 },
            { header: "Email", key: "email", width: 30 },
            { header: "Motoristas Ativos", key: "drivers", width: 20 },
            {
               header: "Motoristas Removidos",
               key: "driversRemoved",
               width: 20,
            },
            { header: "Veículos Ativos", key: "cars", width: 20 },
            { header: "Veículos Removidos", key: "carsRemoved", width: 20 },
            { header: "Eventos", key: "events", width: 15 },
         ];

         const managersToShow = filters.selectedItem?.id
            ? getActiveManagers().filter(
                 (m) => m.id === filters.selectedItem.id
              )
            : getActiveManagers();

         managersToShow.forEach((manager) => {
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

         styleHeader(managersSheet);
         styleAlternateRows(managersSheet);
      }

      if (filters.filterType === "all" || filters.filterType === "motorista") {
         const driversSheet = workbook.addWorksheet("Motoristas");
         driversSheet.columns = [
            { header: "Nome", key: "name", width: 30 },
            { header: "Telefone", key: "phone", width: 20 },
            { header: "CNH", key: "license", width: 20 },
            { header: "Status", key: "status", width: 15 },
            { header: "Gestor", key: "manager", width: 30 },
         ];

         getActiveManagers().forEach((manager) => {
            const driversToShow = filters.selectedItem?.id
               ? (manager.drivers || []).filter(
                    (d) => d.id === filters.selectedItem.id
                 )
               : manager.drivers || [];

            driversToShow.forEach((driver) => {
               driversSheet.addRow({
                  name: driver.name,
                  phone: driver.phone,
                  license: driver.license,
                  status: driver.isAvailable ? "Disponível" : "Indisponível",
                  manager: manager.name,
               });
            });
         });

         styleHeader(driversSheet);
         styleAlternateRows(driversSheet);
      }

      if (filters.filterType === "all" || filters.filterType === "carro") {
         const carsSheet = workbook.addWorksheet("Veículos");
         carsSheet.columns = [
            { header: "Modelo", key: "model", width: 20 },
            { header: "Marca", key: "brand", width: 20 },
            { header: "Placa", key: "plate", width: 15 },
            { header: "Ano", key: "year", width: 10 },
            { header: "Cor", key: "color", width: 15 },
            { header: "Renavam", key: "renavam", width: 20 },
            { header: "Chassi", key: "chassis", width: 20 },
            { header: "Hodômetro", key: "odometer", width: 15 },
            { header: "Status", key: "status", width: 15 },
            { header: "Gestor", key: "manager", width: 30 },
         ];

         getActiveManagers().forEach((manager) => {
            const carsToShow = filters.selectedItem?.id
               ? (manager.cars || []).filter(
                    (c) => c.id === filters.selectedItem.id
                 )
               : manager.cars || [];

            carsToShow.forEach((car) => {
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

         styleHeader(carsSheet);
         styleAlternateRows(carsSheet);
      }

      if (filters.filterType === "all" || filters.filterType === "event") {
         const eventsSheet = workbook.addWorksheet("Eventos");
         eventsSheet.columns = [
            { header: "Tipo", key: "type", width: 15 },
            { header: "Data/Hora", key: "date", width: 25 },
            { header: "Status", key: "status", width: 15 },
            { header: "Motorista", key: "driver", width: 30 },
            { header: "Veículo", key: "car", width: 30 },
            { header: "Distancia", key: "distanceTraveled", width: 15 },
            { header: "Gestor", key: "manager", width: 30 },
         ];

         getActiveManagers().forEach((manager) => {
            const eventsToShow = (manager.events || [])
               .filter((event) => {
                  // Filtro de retorno
                  if (event.eventType === "RETURN") return true;
                  if (event.eventType === "CHECKOUT") {
                     const hasReturn = getActiveManagers()
                        .flatMap((m) => m.events)
                        .some((e) => e.checkoutEventId === event.id);
                     return !hasReturn;
                  }
                  return true;
               })
               .filter(
                  (event) =>
                     !filters.selectedItem?.id ||
                     event.id === filters.selectedItem.id
               )
               .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));

            eventsToShow.forEach((event) => {
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

         styleHeader(eventsSheet);
         styleAlternateRows(eventsSheet);
      }

      if (!filters.selectedItem?.id) {
         const statsSheet = workbook.addWorksheet("Estatísticas");
         statsSheet.addRow([
            "Total de Gestores",
            getFilteredGlobalStats().totalManagers || 0,
         ]);
         statsSheet.addRow([
            "Total de Motoristas",
            getFilteredGlobalStats().totalDrivers || 0,
         ]);
         statsSheet.addRow([
            "Total de Veículos",
            getFilteredGlobalStats().totalCars || 0,
         ]);
         statsSheet.addRow([
            "Total de Eventos",
            getFilteredGlobalStats().totalEvents || 0,
         ]);
         statsSheet.addRow([
            "Motoristas Excluídos",
            getFilteredGlobalStats().totalDeletedDrivers || 0,
         ]);
         statsSheet.addRow([
            "Veículos Excluídos",
            getFilteredGlobalStats().totalDeletedCars || 0,
         ]);
         statsSheet.addRow([
            "Eventos Excluídos",
            getFilteredGlobalStats().totalDeletedEvents || 0,
         ]);
         styleHeader(statsSheet);
      }

      // Gera o nome do arquivo com base no filtro
      const fileName = filters.selectedItem?.id
         ? `relatorio_${filters.filterType}_${getItemInfo().replace(/[^a-zA-Z0-9]/g, "_")}.xlsx`
         : "relatorio_beefleet.xlsx";

      const buffer = await workbook.xlsx.writeBuffer();
      saveAs(new Blob([buffer]), fileName);
   };

   return (
      <div className="print-area h-full w-full print:text-black">
         <div className="flex gap-3 print:hidden mb-10 w-full justify-end">
            <button
               onClick={exportExcel}
               className="flex items-center gap-2 px-4 py-2 bg-green-600 hover:bg-green-700 text-white rounded-lg transition-colors"
            >
               <Icon name="download" className="size-5" />
               <span>Exportar Excel</span>
            </button>
            <button
               onClick={handlePrint}
               className="flex items-center gap-2 px-4 py-2 bg-bee-dark-600 hover:bg-bee-dark-700 text-white dark:bg-bee-dark-100 dark:text-bee-dark-600 dark:hover:bg-bee-alert-500 rounded-lg transition-colors"
            >
               <Icon name="reports" className="size-5" />
               <span>Imprimir Relatório</span>
            </button>
         </div>
         {/* Cabeçalho */}
         <header className="border-b border-gray-300 dark:border-gray-700 pb-4 mb-6">
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
               <div className="grid grid-cols-2 gap-4">
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
                                    : "Tudo"}
                           {getItemInfo()}
                        </p>
                     </div>
                  )}
               </div>
            </div>
         </header>

         {getSelectedItemDetails()}

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
                              {getFilteredGlobalStats().totalManagers || 0}
                           </p>
                        </div>
                        <div className="p-4 rounded-lg border">
                           <p className="text-sm text-gray-500">
                              Total de Motoristas
                           </p>
                           <p className="text-2xl font-bold">
                              {getFilteredGlobalStats().totalDrivers || 0}
                           </p>
                        </div>
                        <div className="p-4 rounded-lg border">
                           <p className="text-sm text-gray-500">
                              Total de Veículos
                           </p>
                           <p className="text-2xl font-bold">
                              {getFilteredGlobalStats().totalCars || 0}
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
                        <div className="p-4 rounded-lg border ">
                           <p className="text-sm text-red-700">
                              Motoristas excluídos
                           </p>
                           <p className="text-xl font-bold text-red-700">
                              {getFilteredGlobalStats().totalDeletedDrivers ||
                                 0}
                           </p>
                        </div>
                        <div className="p-4 rounded-lg border">
                           <p className="text-sm text-red-700">
                              Veículos excluídos
                           </p>
                           <p className="text-xl font-bold text-red-700">
                              {getFilteredGlobalStats().totalDeletedCars || 0}
                           </p>
                        </div>
                        <div className="p-4 rounded-lg border">
                           <p className="text-sm text-red-700">
                              Eventos excluídos
                           </p>
                           <p className="text-xl font-bold text-red-700">
                              {getFilteredGlobalStats().totalDeletedEvents || 0}
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
                           <table className="min-w-full divide-y  divide-gray-200 dark:divide-gray-700">
                              <thead className=" bg-gray-50 dark:bg-gray-800">
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
                              <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
                                 {getActiveManagers()
                                    .slice()
                                    .sort(
                                       (a, b) =>
                                          new Date(b.createdAt) -
                                          new Date(a.createdAt)
                                    )
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
                           <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
                              <thead className="bg-gray-50 dark:bg-gray-800">
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
                              <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
                                 {getActiveManagers()
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
                           <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
                              <thead className=" bg-gray-50 dark:bg-gray-800">
                                 <tr>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                       Placa
                                    </th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                       Veículos
                                    </th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                       Renavam
                                    </th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                       Ano
                                    </th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                       Status
                                    </th>
                                 </tr>
                              </thead>
                              <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
                                 {getActiveManagers()
                                    .flatMap((manager) => manager.cars)
                                    .sort(
                                       (a, b) =>
                                          new Date(b.createdAt) -
                                          new Date(a.createdAt)
                                    )
                                    .map((car) => (
                                       <tr key={car.id}>
                                          <td className="px-6 py-4 whitespace-nowrap">
                                             {car.plate}
                                          </td>
                                          <td className="px-6 py-4 ">
                                             <div className="grid grid-cols-1 grid-rows-2">
                                                {car.brand}
                                                {car.model}
                                             </div>
                                          </td>
                                          <td className="px-6 py-4 whitespace-nowrap">
                                             {car.renavam}
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
                           <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
                              <thead className="bg-gray-50 dark:bg-gray-800">
                                 <tr>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                       Motorista
                                    </th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                       Veículo
                                    </th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                       Saída
                                    </th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                       Chegada
                                    </th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                       Distância
                                    </th>
                                 </tr>
                              </thead>
                              <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
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
                                                         event.checkoutCreate
                                                      ).split(",")[0]
                                                   }
                                                </span>
                                                <span className="text-sm text-gray-500">
                                                   {
                                                      formatDateTime(
                                                         event.checkoutCreate
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
                                             {event.distanceTraveled}km
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
            {showManagers && !filters.selectedItem?.id && (
               <section>
                  <h2 className="flex items-center gap-2 text-xl font-semibold mb-4">
                     <Icon name="gestor" className="size-5" />
                     Gestores
                  </h2>
                  <div className="overflow-x-auto">
                     <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
                        <thead className="bg-gray-50 dark:bg-gray-800">
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
                        <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
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
            {showDrivers && !filters.selectedItem?.id && (
               <section>
                  <h2 className="flex items-center gap-2 text-xl font-semibold mb-4">
                     <Icon name="users" className="size-5" />
                     Motoristas
                  </h2>
                  <div className="overflow-x-auto">
                     {getActiveManagers().flatMap((manager) => manager.drivers)
                        .length > 0 ? (
                        <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
                           <thead className="bg-gray-50 dark:bg-gray-800">
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
                           <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
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
            {showCars && !filters.selectedItem?.id && (
               <section>
                  <h2 className="flex items-center gap-2 text-xl font-semibold mb-4">
                     <Icon name="car" className="size-5" />
                     Veículos
                  </h2>
                  <div className="overflow-x-auto">
                     {getActiveManagers().flatMap((manager) => manager.cars)
                        .length > 0 ? (
                        <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
                           <thead className="bg-gray-50 dark:bg-gray-800">
                              <tr>
                                 <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    Veículo
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
                                    Hodômetro
                                 </th>
                              </tr>
                           </thead>
                           <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
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
                                          <div className="grid grid-cols-1 grid-rows-2">
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
            {showEvents && !filters.selectedItem?.id && (
               <section>
                  <h2 className="flex items-center gap-2 text-xl font-semibold mb-4">
                     <Icon name="eventoL" className="size-5" />
                     Eventos
                  </h2>
                  <div className="overflow-x-auto">
                     {getActiveManagers().flatMap((manager) => manager.events)
                        .length > 0 ? (
                        <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
                           <thead className="bg-gray-50 dark:bg-gray-800">
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
                           <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
                              {getActiveManagers()
                                 .flatMap((manager) => manager.events)
                                 .filter((event) => {
                                    if (event.eventType === "RETURN")
                                       return true;
                                    if (event.eventType === "CHECKOUT") {
                                       const hasReturn = getActiveManagers()
                                          .flatMap((m) => m.events)
                                          .some(
                                             (e) =>
                                                e.checkoutEventId === event.id
                                          );
                                       return !hasReturn;
                                    }
                                    return true;
                                 })
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
         <footer className="mt-8 pb-3 pt-6 border-t border-gray-300 dark:border-gray-700">
            <div className="text-xs text-gray-500">
               <p>Relatório gerado automaticamente pelo sistema Bee Fleet</p>
               <p className="mt-1">
                  © {new Date().getFullYear()} - Todos os direitos reservados
               </p>
            </div>
         </footer>
      </div>
   );
};

export default GenericReport;
