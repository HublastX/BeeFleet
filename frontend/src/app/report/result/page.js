"use client";
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import GenericReport from "@/components/reports/GenericReport";

export default function ReportResultPage() {
   const searchParams = useSearchParams();
   const [reportData, setReportData] = useState(null);
   const [filters, setFilters] = useState(null);

   useEffect(() => {
      const dataParam = searchParams.get("data");
      const filtersParam = searchParams.get("filters");

      if (dataParam && filtersParam) {
         try {
            setReportData(JSON.parse(decodeURIComponent(dataParam)));
            setFilters(JSON.parse(decodeURIComponent(filtersParam)));
         } catch (error) {
         }
      }
   }, [searchParams]);

   if (!reportData || !filters) {
      return <div>Carregando relatório...</div>;
   }

   return (
      <div className="max-w-6xl mx-auto p-4 flex justify-center">
         <GenericReport
            isOpen={true}
            onClose={() => window.history.back()}
            reportData={reportData}
            filters={filters}
         />
      </div>
   );
}
