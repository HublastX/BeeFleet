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
import useEvent from "@/hooks/useEvent";

const StackedBarEventosPorMes = () => {
   const { events, carregando } = useEvent();
   const [data, setData] = useState([]);

   useEffect(() => {
      if (events && events.length > 0) {
         // Agrupar events por mês e tipo
         const eventosPorMesTipo = events.reduce((acc, evento) => {
            const date = new Date(evento.data);
            const mesAno = `${date.getMonth() + 1}/${date.getFullYear()}`;
            const tipo = evento.tipo || "Outros";

            if (!acc[mesAno]) {
               acc[mesAno] = {};
            }

            if (!acc[mesAno][tipo]) {
               acc[mesAno][tipo] = 0;
            }

            acc[mesAno][tipo]++;
            return acc;
         }, {});

         // Converter para formato do gráfico
         const tipos = [...new Set(events.map((e) => e.tipo || "Outros"))];

         const chartData = Object.keys(eventosPorMesTipo)
            .map((mesAno) => {
               const item = { mesAno };
               tipos.forEach((tipo) => {
                  item[tipo] = eventosPorMesTipo[mesAno][tipo] || 0;
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
   }, [events]);

   if (carregando)
      return (
         <div style={chartContainerStyle}>
            <h3 style={titleStyle}>Eventos por Mês e Tipo</h3>
            <div>Carregando...</div>
         </div>
      );
   if (!data.length)
      return (
         <div style={chartContainerStyle}>
            <h3 style={titleStyle}>Eventos por Mês e Tipo</h3>
            <div>Sem dados</div>
         </div>
      );

   // Cores para cada tipo de evento
   const tipoColors = {
      Manutenção: colors.danger,
      Viagem: colors.secondary,
      Entrega: colors.accent,
      Outros: colors.gray,
   };

   return (
      <div style={chartContainerStyle}>
         <h3 style={titleStyle}>Eventos por Mês e Tipo</h3>
         <ResponsiveContainer width="100%" height={400}>
            <BarChart data={data}>
               <CartesianGrid strokeDasharray="3 3" />
               <XAxis dataKey="mesAno" />
               <YAxis />
               <Tooltip />
               <Legend />
               {Object.keys(tipoColors).map(
                  (tipo) =>
                     data[0]?.[tipo] !== undefined && (
                        <Bar
                           key={tipo}
                           dataKey={tipo}
                           stackId="a"
                           fill={tipoColors[tipo]}
                           name={tipo}
                        />
                     )
               )}
            </BarChart>
         </ResponsiveContainer>
      </div>
   );
};

export default StackedBarEventosPorMes;
