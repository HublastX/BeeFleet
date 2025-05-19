"use client";

import AreaChartCrescimentoCadastros from "@/components/Charts/area/AreaChartCrescimentoCadastros";
import BarChartMotoristasMaisEventos from "@/components/Charts/bar/BarChartMotoristasMaisEventos";
import PieChartStatusMotoristas from "@/components/Charts/pie/PieChartStatusMotoristas";
import RadarChartComparacaoMotoristas from "@/components/Charts/Radar/RadarChartComparacaoMotoristas";
import StackedBarEventosPorMes from "@/components/Charts/StackedBar/StackedBarEventosPorMes";
import StackedBarMotoristasPorStatusMes from "@/components/Charts/StackedBar/StackedBarMotoristasPorStatusMes";

export default function ChartsPageDrivers() {
   return (
      <div className="p-4 md:p-6">
         <div className="mx-auto grid grid-cols-1 md:grid-cols-6 lg:grid-cols-7 gap-4 max-w-[1800px]">
            <div className="md:col-span-2 lg:col-span-2">
               <PieChartStatusMotoristas />
            </div>
            <div className="md:col-span-2 lg:col-span-2">
               <BarChartMotoristasMaisEventos />
            </div>
{/* 

            <div className="md:col-span-6 lg:col-span-3">
               <AreaChartCrescimentoCadastros />
            </div>

            <div className="md:col-span-3 lg:col-span-2">
               <StackedBarEventosPorMes />
            </div>

            <div className="md:col-span-3 lg:col-span-2">
               <StackedBarMotoristasPorStatusMes />
            </div>

            <div className="md:col-span-6 lg:col-span-3">
               <RadarChartComparacaoMotoristas />
            </div> */}
         </div>
      </div>
   );
}