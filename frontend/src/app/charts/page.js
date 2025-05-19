"use client";

import AreaChartCrescimentoCadastros from "@/components/Charts/area/AreaChartCrescimentoCadastros";
import BarChartCarrosMaisUtilizados from "@/components/Charts/bar/BarChartCarrosMaisUtilizados";
import BarChartEventosPorTipo from "@/components/Charts/bar/BarChartEventosPorTipo";
import BarChartMotoristasMaisEventos from "@/components/Charts/bar/BarChartMotoristasMaisEventos";
import PieChartStatusCarros from "@/components/Charts/pie/PieChartStatusCarros";
import PieChartStatusMotoristas from "@/components/Charts/pie/PieChartStatusMotoristas";
import RadarChartComparacaoMotoristas from "@/components/Charts/Radar/RadarChartComparacaoMotoristas";
import ScatterQuilometragemVsEventos from "@/components/Charts/Scatter/ScatterQuilometragemVsEventos";
import StackedBarEventosPorMes from "@/components/Charts/StackedBar/StackedBarEventosPorMes";
import StackedBarMotoristasPorStatusMes from "@/components/Charts/StackedBar/StackedBarMotoristasPorStatusMes";

export default function ChartsPage() {
   return (
      <div >
         {/* Grid de Gráficos */}
         <div className="mx-auto grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4 max-w-[1600px]">
            <div className="rounded-lg hover:shadow transition-shadow duration-200">
               <PieChartStatusMotoristas />
            </div>
            <div className="rounded-lg hover:shadow transition-shadow duration-200">
               <PieChartStatusCarros />
            </div>
            <div className="rounded-lg hover:shadow transition-shadow duration-200">
               <BarChartEventosPorTipo />
            </div>
            <div className="rounded-lg hover:shadow transition-shadow duration-200">
               <BarChartMotoristasMaisEventos />
            </div>
            <div className="rounded-lg hover:shadow transition-shadow duration-200">
               <BarChartCarrosMaisUtilizados />
            </div>
            <div className="rounded-lg hover:shadow transition-shadow duration-200 md:col-span-2 xl:col-span-2">
               <AreaChartCrescimentoCadastros />
            </div>
            <div className="rounded-lg hover:shadow transition-shadow duration-200">
               <StackedBarEventosPorMes />
            </div>
            <div className="rounded-lg hover:shadow transition-shadow duration-200">
               <StackedBarMotoristasPorStatusMes />
            </div>
            <div className="rounded-lg hover:shadow transition-shadow duration-200">
               <RadarChartComparacaoMotoristas />
            </div>
            <div className="rounded-lg hover:shadow transition-shadow duration-200 xl:col-span-2">
               <ScatterQuilometragemVsEventos />
            </div>
         </div>
      </div>
   );
}
