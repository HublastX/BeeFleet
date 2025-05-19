import React, { useEffect, useState } from "react";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from "recharts";
import { chartContainerStyle, titleStyle } from "../styles/chartStyles";
import { colors } from "../styles/colorPalette";
import useEvent from "@/hooks/useEvent"; // Assumindo que você tem um hook para eventos

const BarChartEventosPorTipo = () => {
  const { events, carregando } = useEvent();
  const [data, setData] = useState([]);

  useEffect(() => {
    if (events && events.length > 0) {
      // Agrupar eventos por tipo
      const eventosPorTipo = events.reduce((acc, evento) => {
        const tipo = evento.eventType === "CHECKOUT"? "Saida" : evento.eventType === "RETURN" ? "Chegada" : "Manutencao";
        if (!acc[tipo]) {
          acc[tipo] = 0;
        }
        acc[tipo]++;
        return acc;
      }, {});

      // Converter para formato do gráfico
      const chartData = Object.keys(eventosPorTipo).map(tipo => ({
        tipo,
        quantidade: eventosPorTipo[tipo],
        color: colors[tipo.toLowerCase()] || colors.info 
      }));

      setData(chartData);
    }
  }, [events]);

  if (carregando) {
    return (
      <div style={chartContainerStyle}>
        <h3 style={titleStyle}>Eventos por Tipo</h3>
        <div style={{ textAlign: "center", padding: "20px" }}>Carregando dados...</div>
      </div>
    );
  }

  if (!data || data.length === 0) {
    return (
      <div style={chartContainerStyle}>
        <h3 style={titleStyle}>Eventos por Tipo</h3>
        <div style={{ textAlign: "center", padding: "20px" }}>Nenhum dado disponível</div>
      </div>
    );
  }

  return (
    <div style={chartContainerStyle}>
      <h3 style={titleStyle}>Eventos por Tipo</h3>
      <ResponsiveContainer width="100%" height={400}>
        <BarChart
          data={data}
          layout="vertical"
          margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis type="number" />
          <YAxis dataKey="tipo" type="category" width={100} />
          <Tooltip 
            formatter={(value) => [`${value} eventos`, "Quantidade"]}
            labelFormatter={(label) => `Tipo: ${label}`}
          />
          <Legend />
          <Bar 
            dataKey="quantidade" 
            name="Eventos" 
            fill={colors.primary}
            radius={[0, 4, 4, 0]}
          />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default BarChartEventosPorTipo;