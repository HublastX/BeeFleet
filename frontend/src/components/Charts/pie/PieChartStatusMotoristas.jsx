import React, { useEffect, useState } from "react";
import {
   PieChart,
   Pie,
   Cell,
   ResponsiveContainer,
   Legend,
   Tooltip,
} from "recharts";
import {
   chartContainerStyle,
   titleStyle,
   loadingStyle,
   noDataStyle,
} from "../styles/chartStyles";
import { colors } from "../styles/colorPalette";
import useDrivers from "@/hooks/useDrivers";

const PieChartStatusMotoristas = () => {
   const { motoristas, carregando } = useDrivers();
   const [data, setData] = useState([]);

   useEffect(() => {
      if (motoristas?.length > 0) {
         const statusCount = motoristas.reduce((acc, { isAvailable }) => {
            const status = isAvailable ? "Disponível" : "Indisponível";
            acc[status] = (acc[status] || 0) + 1;
            return acc;
         }, {});

         const chartData = Object.entries(statusCount).map(([name, value]) => ({
            name,
            value,
            color: name === "Disponível" ? colors.active : colors.danger,
         }));

         setData(chartData);
      }
   }, [motoristas]);

   return (
      <div className={chartContainerStyle}>
         <h3 className={titleStyle}>Status dos Motoristas</h3>

         {carregando ? (
            <div className={loadingStyle}>Carregando dados...</div>
         ) : !data?.length ? (
            <div className={noDataStyle}>Nenhum dado disponível</div>
         ) : (
            <div className="w-full h-[300px]">
               <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                     <Pie
                        data={data}
                        cx="50%"
                        cy="50%"
                        innerRadius={50}
                        outerRadius={100}
                        paddingAngle={0}
                        dataKey="value"
                        label={({ name, percent }) =>
                           `${name}: ${(percent * 100).toFixed(0)}%`
                        }
                     >
                        {data.map(({ color }, index) => (
                           <Cell key={`cell-${index}`} fill={color} />
                        ))}
                     </Pie>
                     <Tooltip
                        formatter={(value) => [
                           `${value} motoristas`,
                           "Quantidade",
                        ]}
                        wrapperClassName="text-sm"
                     />
                     <Legend
                        iconType="circle"
                        layout="horizontal"
                        verticalAlign="bottom"
                        wrapperStyle={{ paddingTop: "20px" }}
                     />
                  </PieChart>
               </ResponsiveContainer>
            </div>
         )}
      </div>
   );
};

export default PieChartStatusMotoristas;
