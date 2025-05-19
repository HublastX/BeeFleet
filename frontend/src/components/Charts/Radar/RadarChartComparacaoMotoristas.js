import React, { useEffect, useState } from "react";
import {
   RadarChart,
   PolarGrid,
   PolarAngleAxis,
   PolarRadiusAxis,
   Radar,
   Legend,
   ResponsiveContainer,
   Tooltip,
} from "recharts";
import { chartContainerStyle, titleStyle } from "../styles/chartStyles";
import { colors } from "../styles/colorPalette";
import useDrivers from "@/hooks/useDrivers";
import useEvent from "@/hooks/useEvent";

const RadarChartComparacaoMotoristas = () => {
   const { motoristas } = useDrivers();
   const { events } = useEvent();
   const [data, setData] = useState([]);
   const [selectedDrivers, setSelectedDrivers] = useState([]);
   const [carregando, setCarregando] = useState(true);

   useEffect(() => {
      if (motoristas && events) {
         // Calcular métricas para cada motorista
         const motoristasComMetricas = motoristas.map((motorista) => {
            const eventosMotorista = events.filter(
               (e) => e.motoristaId === motorista.id
            );

            return {
               ...motorista,
               totalEventos: eventosMotorista.length,
               eventosPorMes:
                  eventosMotorista.length /
                  Math.max(
                     1,
                     new Date().getMonth() -
                        new Date(motorista.createdAt).getMonth() +
                        1
                  ),
               quilometragemTotal: eventosMotorista.reduce(
                  (sum, e) => sum + (e.quilometragem || 0),
                  0
               ),
               avaliacaoMedia: motorista.rating || 0,
            };
         });

         // Selecionar top 3 motoristas por total de events
         const topMotoristas = [...motoristasComMetricas]
            .sort((a, b) => b.totalEventos - a.totalEventos)
            .slice(0, 3);

         setSelectedDrivers(topMotoristas);
         setCarregando(false);
      }
   }, [motoristas, events]);

   // Preparar dados para o radar chart
   useEffect(() => {
      if (selectedDrivers.length > 0) {
         const radarData = [
            {
               subject: "Total de Eventos",
               A: selectedDrivers[0]?.totalEventos || 0,
               B: selectedDrivers[1]?.totalEventos || 0,
               C: selectedDrivers[2]?.totalEventos || 0,
            },
            {
               subject: "Eventos/Mês",
               A: selectedDrivers[0]?.eventosPorMes || 0,
               B: selectedDrivers[1]?.eventosPorMes || 0,
               C: selectedDrivers[2]?.eventosPorMes || 0,
            },
            {
               subject: "Quilometragem",
               A: selectedDrivers[0]?.quilometragemTotal || 0,
               B: selectedDrivers[1]?.quilometragemTotal || 0,
               C: selectedDrivers[2]?.quilometragemTotal || 0,
            },
            {
               subject: "Avaliação",
               A: selectedDrivers[0]?.avaliacaoMedia || 0,
               B: selectedDrivers[1]?.avaliacaoMedia || 0,
               C: selectedDrivers[2]?.avaliacaoMedia || 0,
            },
         ];

         setData(radarData);
      }
   }, [selectedDrivers]);

   if (carregando)
      return (
         <div style={chartContainerStyle}>
            <h3 style={titleStyle}>Comparação de Motoristas</h3>
            <div>Carregando...</div>
         </div>
      );
   if (!data.length)
      return (
         <div style={chartContainerStyle}>
            <h3 style={titleStyle}>Comparação de Motoristas</h3>
            <div>Sem dados suficientes</div>
         </div>
      );

   return (
      <div style={chartContainerStyle}>
         <h3 style={titleStyle}>Comparação de Motoristas</h3>
         <div style={{ marginBottom: "16px", textAlign: "center" }}>
            Top 3 motoristas com mais events
         </div>
         <ResponsiveContainer width="100%" height={400}>
            <RadarChart cx="50%" cy="50%" outerRadius="80%" data={data}>
               <PolarGrid />
               <PolarAngleAxis dataKey="subject" />
               <PolarRadiusAxis angle={30} domain={[0, "auto"]} />
               <Tooltip />
               <Legend />
               <Radar
                  name={selectedDrivers[0]?.name || "Motorista 1"}
                  dataKey="A"
                  stroke={colors.primary}
                  fill={colors.primary}
                  fillOpacity={0.6}
               />
               <Radar
                  name={selectedDrivers[1]?.name || "Motorista 2"}
                  dataKey="B"
                  stroke={colors.secondary}
                  fill={colors.secondary}
                  fillOpacity={0.6}
               />
               <Radar
                  name={selectedDrivers[2]?.name || "Motorista 3"}
                  dataKey="C"
                  stroke={colors.accent}
                  fill={colors.accent}
                  fillOpacity={0.6}
               />
            </RadarChart>
         </ResponsiveContainer>
      </div>
   );
};

export default RadarChartComparacaoMotoristas;
