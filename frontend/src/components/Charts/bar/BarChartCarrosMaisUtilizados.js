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
import useCar from "@/hooks/useCar";

const BarChartCarrosMaisUtilizados = () => {
   const { events } = useEvents();
   const { carro } = useCar();
   const [data, setData] = useState([]);
   const [carregando, setCarregando] = useState(true);

   useEffect(() => {
      if (events && carro && events.length > 0 && carro.length > 0) {
         // Agrupar eventos por carId
         const eventosPorCarro = events.reduce((acc, evento) => {
            const carId = evento.carId || evento.carroId; // cobre ambos os possíveis nomes
            if (!carId) return acc;
            if (!acc[carId]) {
               acc[carId] = 0;
            }
            acc[carId]++;
            return acc;
         }, {});

         // Criar array com modelo/placa e quantidades
         const carrosComEventos = Object.keys(eventosPorCarro).map((id) => {
            const car = carro.find((c) => String(c.id) === String(id));
            return {
               modelo: car
                  ? `${car.model || car.modelo} (${car.plate || car.placa})`
                  : `Veículo ${id}`,
               utilizacoes: eventosPorCarro[id],
               id: id,
            };
         });

         // Ordenar e pegar top 10
         const topCarros = carrosComEventos
            .sort((a, b) => b.utilizacoes - a.utilizacoes)
            .slice(0, 10);

         setData(topCarros);
         setCarregando(false);
      } else {
         setData([]);
         setCarregando(false);
      }
   }, [events, carro]);

   if (carregando) {
      return (
         <div style={chartContainerStyle}>
            <h3 style={titleStyle}>Carros Mais Utilizados</h3>
            <div style={{ textAlign: "center", padding: "20px" }}>
               Carregando dados...
            </div>
         </div>
      );
   }

   if (!data || data.length === 0) {
      return (
         <div style={chartContainerStyle}>
            <h3 style={titleStyle}>Carros Mais Utilizados</h3>
            <div style={{ textAlign: "center", padding: "20px" }}>
               Nenhum dado disponível
            </div>
         </div>
      );
   }

   return (
      <div style={chartContainerStyle}>
         <h3 style={titleStyle}>Carros Mais Utilizados</h3>
         <ResponsiveContainer width="100%" height={400}>
            <BarChart
               data={data}
               margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
            >
               <CartesianGrid strokeDasharray="3 3" />
               <XAxis dataKey="modelo" />
               <YAxis />
               <Tooltip
                  formatter={(value) => [`${value} utilizações`, "Total"]}
                  labelFormatter={(label) => `Veículo: ${label}`}
               />
               <Legend />
               <Bar
                  dataKey="utilizacoes"
                  name="Utilizações"
                  fill={colors.accent}
                  radius={[4, 4, 0, 0]}
               />
            </BarChart>
         </ResponsiveContainer>
      </div>
   );
};

export default BarChartCarrosMaisUtilizados;
