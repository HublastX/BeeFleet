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
import useEvents from "@/hooks/useEvent";
import useDrivers from "@/hooks/useDrivers";

const BarChartMotoristasMaisEventos = () => {
   const { events } = useEvents();
   const { motoristas } = useDrivers();
   const [data, setData] = useState([]);
   const [carregando, setCarregando] = useState(true);

   useEffect(() => {
      if (events && motoristas && events.length > 0 && motoristas.length > 0) {
         const eventosPorMotorista = events.reduce((acc, evento) => {
            const motoristaId = evento.driverId;
            if (!motoristaId) return acc;
            if (!acc[motoristaId]) {
               acc[motoristaId] = 0;
            }
            acc[motoristaId]++;
            return acc;
         }, {});

         const motoristasComEventos = Object.keys(eventosPorMotorista).map(
            (id) => {
               const motorista = motoristas.find(
                  (m) => String(m.id) === String(id)
               );
               return {
                  nome: motorista ? motorista.name : `Motorista ${id}`,
                  eventos: eventosPorMotorista[id],
                  id: id,
               };
            }
         );

         const topMotoristas = motoristasComEventos
            .sort((a, b) => b.eventos - a.eventos)
            .slice(0, 10);

         setData(topMotoristas);
         setCarregando(false);
      }
   }, [events, motoristas]);

   if (carregando) {
      return (
         <div className={chartContainerStyle}>
            <h3 className={titleStyle}>Motoristas com Mais Eventos</h3>
            <div style={{ textAlign: "center", padding: "20px" }}>
               Carregando dados...
            </div>
         </div>
      );
   }

   if (!data || data.length === 0) {
      return (
         <div className={chartContainerStyle}>
            <h3 className={titleStyle}>Motoristas com Mais Eventos</h3>
            <div style={{ textAlign: "center", padding: "20px" }}>
               Nenhum dado disponível
            </div>
         </div>
      );
   }

   return (
      <div className={chartContainerStyle}>
         <h3 className={titleStyle}>Motoristas com Mais Eventos</h3>
         <ResponsiveContainer width="100%" height={400}>
            <BarChart
               data={data}
               margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
            >
               <CartesianGrid strokeDasharray="3 3" />
               <XAxis dataKey="nome" />
               <YAxis />
               <Tooltip
                  formatter={(value) => [`${value} eventos`, "Total"]}
                  labelFormatter={(label) => `Motorista: ${label}`}
               />
               <Legend />
               <Bar
                  dataKey="eventos"
                  name="Eventos"
                  fill={colors.secondary}
                  radius={[4, 4, 0, 0]}
               />
            </BarChart>
         </ResponsiveContainer>
      </div>
   );
};

export default BarChartMotoristasMaisEventos;
