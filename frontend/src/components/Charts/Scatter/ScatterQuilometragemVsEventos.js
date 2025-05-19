import React, { useEffect, useState } from "react";
import {
   ScatterChart,
   Scatter,
   XAxis,
   YAxis,
   ZAxis,
   CartesianGrid,
   Tooltip,
   Legend,
   ResponsiveContainer,
   Cell,
} from "recharts";
import { chartContainerStyle, titleStyle } from "../styles/chartStyles";
import { colors } from "../styles/colorPalette";
import useDrivers from "@/hooks/useDrivers";
import useEvent from "@/hooks/useEvent";

const ScatterQuilometragemVsEventos = () => {
   const { motoristas } = useDrivers();
   const { events } = useEvent();
   const [data, setData] = useState([]);
   const [carregando, setCarregando] = useState(true);

   useEffect(() => {
      if (motoristas && events) {
         // Calcular quilometragem e events por motorista
         const motoristasComMetricas = motoristas.map((motorista) => {
            const eventosMotorista = events.filter(
               (e) => e.motoristaId === motorista.id
            );
            const quilometragemTotal = eventosMotorista.reduce(
               (sum, e) => sum + (e.quilometragem || 0),
               0
            );

            return {
               name: motorista.name,
               events: eventosMotorista.length,
               quilometragem: quilometragemTotal,
               rating: motorista.rating || 0,
            };
         });

         setData(motoristasComMetricas);
         setCarregando(false);
      }
   }, [motoristas, events]);

   if (carregando)
      return (
         <div style={chartContainerStyle}>
            <h3 style={titleStyle}>Quilometragem vs Eventos</h3>
            <div>Carregando...</div>
         </div>
      );
   if (!data.length)
      return (
         <div style={chartContainerStyle}>
            <h3 style={titleStyle}>Quilometragem vs Eventos</h3>
            <div>Sem dados</div>
         </div>
      );

   // Cores baseadas no rating
   const getColor = (rating) => {
      if (rating >= 4) return colors.active;
      if (rating >= 2) return colors.secondary;
      return colors.danger;
   };

   return (
      <div style={chartContainerStyle}>
         <h3 style={titleStyle}>Quilometragem vs Eventos</h3>
         <div
            style={{
               marginBottom: "16px",
               textAlign: "center",
               fontSize: "14px",
            }}
         >
            Cada ponto representa um motorista (tamanho pelo rating)
         </div>
         <ResponsiveContainer width="100%" height={400}>
            <ScatterChart margin={{ top: 20, right: 20, bottom: 20, left: 20 }}>
               <CartesianGrid strokeDasharray="3 3" />
               <XAxis
                  type="number"
                  dataKey="events"
                  name="Eventos"
                  label={{
                     value: "Nº de Eventos",
                     position: "insideBottomRight",
                     offset: -10,
                  }}
               />
               <YAxis
                  type="number"
                  dataKey="quilometragem"
                  name="Quilometragem"
                  label={{
                     value: "Quilometragem (km)",
                     angle: -90,
                     position: "insideLeft",
                  }}
               />
               <ZAxis
                  type="number"
                  dataKey="rating"
                  range={[60, 400]}
                  name="Rating"
               />
               <Tooltip
                  cursor={{ strokeDasharray: "3 3" }}
                  formatter={(value, name) => {
                     if (name === "Rating")
                        return [value.toFixed(1), "Avaliação"];
                     return [value, name];
                  }}
               />
               <Legend />
               <Scatter name="Motoristas" data={data} fill="#8884d8">
                  {data.map((entry, index) => (
                     <Cell
                        key={`cell-${index}`}
                        fill={getColor(entry.rating)}
                     />
                  ))}
               </Scatter>
            </ScatterChart>
         </ResponsiveContainer>
         <div
            style={{
               display: "flex",
               justifyContent: "center",
               marginTop: "10px",
               gap: "20px",
            }}
         >
            <div>
               <span style={{ color: colors.active }}>●</span> Rating alto (4-5)
            </div>
            <div>
               <span style={{ color: colors.secondary }}>●</span> Rating médio
               (2-4)
            </div>
            <div>
               <span style={{ color: colors.danger }}>●</span> Rating baixo
               (0-2)
            </div>
         </div>
      </div>
   );
};

export default ScatterQuilometragemVsEventos;
