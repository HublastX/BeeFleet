import React, { useEffect, useState } from "react";
import {
   BarChart,
   Bar,
   XAxis,
   YAxis,
   CartesianGrid,
   Tooltip,
   Legend,
   ResponsiveContainer,
} from "recharts";
import { chartContainerStyle, titleStyle } from "../styles/chartStyles";
import { colors } from "../styles/colorPalette";
import useDrivers from "@/hooks/useDrivers";

const StackedBarMotoristasPorStatusMes = () => {
   const { motoristas, carregando } = useDrivers();
   const [data, setData] = useState([]);

   useEffect(() => {
      if (motoristas && motoristas.length > 0) {
         // Agrupar motoristas por mês de cadastro e status
         const motoristasPorMesStatus = motoristas.reduce((acc, motorista) => {
            const date = new Date(motorista.createdAt || new Date());
            const mesAno = `${date.getMonth() + 1}/${date.getFullYear()}`;
            const status = motorista.status || "Ativo";

            if (!acc[mesAno]) {
               acc[mesAno] = {};
            }

            if (!acc[mesAno][status]) {
               acc[mesAno][status] = 0;
            }

            acc[mesAno][status]++;
            return acc;
         }, {});

         // Converter para formato do gráfico
         const statusList = [
            ...new Set(motoristas.map((m) => m.status || "Ativo")),
         ];

         const chartData = Object.keys(motoristasPorMesStatus)
            .map((mesAno) => {
               const item = { mesAno };
               statusList.forEach((status) => {
                  item[status] = motoristasPorMesStatus[mesAno][status] || 0;
               });
               return item;
            })
            .sort((a, b) => {
               const [mesA, anoA] = a.mesAno.split("/").map(Number);
               const [mesB, anoB] = b.mesAno.split("/").map(Number);
               return new Date(anoA, mesA - 1) - new Date(anoB, mesB - 1);
            });

         setData(chartData);
      }
   }, [motoristas]);

   if (carregando)
      return (
         <div style={chartContainerStyle}>
            <h3 style={titleStyle}>Motoristas por Status e Mês</h3>
            <div>Carregando...</div>
         </div>
      );
   if (!data.length)
      return (
         <div style={chartContainerStyle}>
            <h3 style={titleStyle}>Motoristas por Status e Mês</h3>
            <div>Sem dados</div>
         </div>
      );

   // Cores para cada status
   const statusColors = {
      Ativo: colors.active,
      Inativo: colors.inactive,
      Férias: colors.accent,
      Treinamento: colors.info,
   };

   return (
      <div style={chartContainerStyle}>
         <h3 style={titleStyle}>Motoristas por Status e Mês</h3>
         <ResponsiveContainer width="100%" height={400}>
            <BarChart data={data}>
               <CartesianGrid strokeDasharray="3 3" />
               <XAxis dataKey="mesAno" />
               <YAxis />
               <Tooltip />
               <Legend />
               {Object.keys(statusColors).map(
                  (status) =>
                     data[0]?.[status] !== undefined && (
                        <Bar
                           key={status}
                           dataKey={status}
                           stackId="a"
                           fill={statusColors[status]}
                           name={status}
                        />
                     )
               )}
            </BarChart>
         </ResponsiveContainer>
      </div>
   );
};

export default StackedBarMotoristasPorStatusMes;
