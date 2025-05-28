"use client";
import GenericReport from "@/components/reports/GenericReport";
import useReports from "@/hooks/useReports";
import { useSearchParams } from "next/navigation";
import { useEffect } from "react";
import withAuth from "@/utils/withAuth";

function ReportResultPage() {
   const searchParams = useSearchParams();
   const { carregando, erro, relatorio, getFullReport } = useReports();

   // Extrai os parâmetros da URL
   const period = searchParams.get("period") || "all";
   const filterType = searchParams.get("filterType") || "all";
   const filterId = searchParams.get("filterId");
   const startDate = searchParams.get("startDate");
   const endDate = searchParams.get("endDate");

   // Busca os dados quando os parâmetros mudam
   useEffect(() => {
      let actualStartDate = startDate;
      let actualEndDate = endDate;

      if (period === "today") {
         const today = new Date().toISOString().split("T")[0];
         actualStartDate = today;
         actualEndDate = today;
      }

      getFullReport(actualStartDate, actualEndDate);
   }, [period, startDate, endDate, getFullReport]);

   const filterData = (data) => {
      if (!data || !data.managers) return null;

      if (filterType === "all" || !filterId) return data;

      const filteredManagers = data.managers.filter((manager) => {
         switch (filterType) {
            case "manager":
               return manager.id === filterId;

            case "carro":
               return (
                  manager.cars?.some((car) => car.id === filterId) ||
                  manager.deletedCars?.some((car) => car.id === filterId)
               );

            case "motorista":
               return (
                  manager.drivers?.some((driver) => driver.id === filterId) ||
                  manager.deletedDrivers?.some(
                     (driver) => driver.id === filterId
                  )
               );

            case "event":
               return (
                  manager.events?.some((event) => event.id === filterId) ||
                  manager.deletedEvents?.some((event) => event.id === filterId)
               );

            default:
               return true;
         }
      });

      // Recalcula as estatísticas globais
      const newGlobalStats = {
         totalManagers: filteredManagers.length,
         totalDrivers: filteredManagers.reduce(
            (sum, m) => sum + (m.drivers?.length || 0),
            0
         ),
         totalDeletedDrivers: filteredManagers.reduce(
            (sum, m) => sum + (m.deletedDrivers?.length || 0),
            0
         ),
         totalCars: filteredManagers.reduce(
            (sum, m) => sum + (m.cars?.length || 0),
            0
         ),
         totalDeletedCars: filteredManagers.reduce(
            (sum, m) => sum + (m.deletedCars?.length || 0),
            0
         ),
         totalEvents: filteredManagers.reduce(
            (sum, m) => sum + (m.events?.length || 0),
            0
         ),
         totalDeletedEvents: filteredManagers.reduce(
            (sum, m) => sum + (m.deletedEvents?.length || 0),
            0
         ),
      };

      return {
         ...data,
         managers: filteredManagers,
         globalStats: newGlobalStats,
      };
   };

   // Prepara os filtros para exibição
   const displayFilters = {
      period,
      filterType,
      selectedItem: {
         id: filterId,
      },
      dateRange: {
         start: startDate,
         end: endDate,
      },
   };

   const filteredData = filterData(relatorio);

   return (
      <div className="max-w-6xl mx-auto p-4 flex justify-center">
         <GenericReport
            isOpen={true}
            onClose={() => window.history.back()}
            reportData={
               filteredData || {
                  managers: [],
                  globalStats: {
                     totalManagers: 0,
                     totalDrivers: 0,
                     totalCars: 0,
                     totalEvents: 0,
                     totalDeletedDrivers: 0,
                     totalDeletedCars: 0,
                     totalDeletedEvents: 0,
                  },
               }
            }
            filters={displayFilters}
            loading={carregando}
            error={erro}
         />
      </div>
   );
}
export default withAuth(ReportResultPage);
