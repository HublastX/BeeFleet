import React, { useEffect, useState } from "react";
import {
   PieChart,
   Pie,
   Cell,
   ResponsiveContainer,
   Legend,
   Tooltip,
} from "recharts";
import { chartContainerStyle, titleStyle } from "../styles/chartStyles";
import { colors } from "../styles/colorPalette";
import useCar from "@/hooks/useCar";

const PieChartStatusCarros = () => {
   const { carro, carregando } = useCar();
   const [data, setData] = useState([]);

   useEffect(() => {
      if (carro && carro.length > 0) {
         const statusCount = carro.reduce((acc, carro) => {
            const status =
               carro.status === "AVAILABLE"
                  ? "Disponível"
                  : carro.status === "IN_USE"
                    ? "Em Uso"
                    : "Manutenção";

            if (!acc[status]) {
               acc[status] = 0;
            }
            acc[status]++;
            return acc;
         }, {});

         const chartData = Object.keys(statusCount).map((status) => {
            let color;
            switch (status.toLowerCase()) {
               case "disponível":
                  color = colors.active;
                  break;
               case "em uso":
                  color = colors.danger;
                  break;
               case "manutenção":
                  color = colors.maintenance;
                  break;
               default:
                  color = colors.inactive;
            }

            return {
               name: status,
               value: statusCount[status],
               color: color,
            };
         });

         setData(chartData);
      }
   }, [carro]);

   if (carregando) {
      return (
         <div style={chartContainerStyle}>
            <h3 style={titleStyle}>Status dos Veículos</h3>
            <div>Carregando dados...</div>
         </div>
      );
   }

   if (!data || data.length === 0) {
      return (
         <div style={chartContainerStyle}>
            <h3 style={titleStyle}>Status dos Veículos</h3>
            <div>Nenhum dado disponível</div>
         </div>
      );
   }

   return (
      <div style={chartContainerStyle}>
         <h3 style={titleStyle}>Status dos Veículos</h3>
         <ResponsiveContainer width="100%" height={300}>
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
                  {data.map((entry, index) => (
                     <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
               </Pie>
               <Tooltip
                  formatter={(value) => [`${value} veículos`, "Quantidade"]}
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
   );
};

export default PieChartStatusCarros;
