import React, { useEffect, useState } from "react";
import {
   LineChart,
   Line,
   XAxis,
   YAxis,
   CartesianGrid,
   Tooltip,
   Legend,
   ResponsiveContainer,
} from "recharts";
import { chartContainerStyle, titleStyle } from "./styles/chartStyles";
import { colors } from "./styles/colorPalette";
import useTrips from "@/hooks/useTrips"; // Hook para viagens/quilometragem

const LineChartQuilometragemPorMes = () => {
   const { viagens, carregando } = useTrips();
   const [data, setData] = useState([]);

   useEffect(() => {
      if (viagens && viagens.length > 0) {
         // Agrupar quilometragem por mês
         const kmPorMes = viagens.reduce((acc, viagem) => {
            const date = new Date(viagem.data);
            const mesAno = `${date.getMonth() + 1}/${date.getFullYear()}`;

            if (!acc[mesAno]) {
               acc[mesAno] = 0;
            }
            acc[mesAno] += viagem.quilometragem || 0;
            return acc;
         }, {});

         // Converter para array e ordenar
         const chartData = Object.keys(kmPorMes)
            .map((mesAno) => ({
               mesAno,
               quilometragem: kmPorMes[mesAno],
            }))
            .sort((a, b) => {
               const [mesA, anoA] = a.mesAno.split("/").map(Number);
               const [mesB, anoB] = b.mesAno.split("/").map(Number);
               return new Date(anoA, mesA - 1) - new Date(anoB, mesB - 1);
            });

         setData(chartData);
      }
   }, [viagens]);

   if (carregando)
      return (
         <div style={chartContainerStyle}>
            <h3 style={titleStyle}>Quilometragem Mensal</h3>
            <div>Carregando...</div>
         </div>
      );
   if (!data.length)
      return (
         <div style={chartContainerStyle}>
            <h3 style={titleStyle}>Quilometragem Mensal</h3>
            <div>Sem dados</div>
         </div>
      );

   return (
      <div style={chartContainerStyle}>
         <h3 style={titleStyle}>Quilometragem Mensal</h3>
         <ResponsiveContainer width="100%" height={400}>
            <LineChart data={data}>
               <CartesianGrid strokeDasharray="3 3" />
               <XAxis dataKey="mesAno" />
               <YAxis
                  label={{ value: "Km", angle: -90, position: "insideLeft" }}
               />
               <Tooltip formatter={(value) => [`${value} km`, "Total"]} />
               <Legend />
               <Line
                  type="monotone"
                  dataKey="quilometragem"
                  stroke={colors.secondary}
                  strokeWidth={2}
                  activeDot={{ r: 6 }}
                  name="Quilometragem"
               />
            </LineChart>
         </ResponsiveContainer>
      </div>
   );
};

export default LineChartQuilometragemPorMes;
