import React, { useEffect, useState } from "react";
import {
   AreaChart,
   Area,
   XAxis,
   YAxis,
   CartesianGrid,
   Tooltip,
   Legend,
   ResponsiveContainer,
} from "recharts";
import { chartContainerStyle, titleStyle } from "../styles/chartStyles";
import { colors } from "../styles/colorPalette";
import useCar from "@/hooks/useCar";
import useDrivers from "@/hooks/useDrivers";

const AreaChartCrescimentoCadastros = () => {
   const { motoristas } = useDrivers();
   const { carro } = useCar();
   const [data, setData] = useState([]);
   const [carregando, setCarregando] = useState(true);

   useEffect(() => {
      if (motoristas && carro) {
         const todosCadastros = [
            ...motoristas.map((m) => ({ ...m, tipo: "motorista" })),
            ...carro.map((c) => ({ ...c, tipo: "carro" })),
         ];

         const cadastrosPorMes = todosCadastros.reduce((acc, item) => {
            const date = new Date(item.createdAt || new Date());
            const mesAno = `${date.getMonth() + 1}/${date.getFullYear()}`;

            if (!acc[mesAno]) {
               acc[mesAno] = { motoristas: 0, carro: 0 };
            }

            if (item.tipo === "motorista") {
               acc[mesAno].motoristas++;
            } else {
               acc[mesAno].carro++;
            }

            return acc;
         }, {});

         // Converter para array e calcular acumulado
         let acumuladoMotoristas = 0;
         let acumuladoCarros = 0;

         const chartData = Object.keys(cadastrosPorMes)
            .map((mesAno) => {
               acumuladoMotoristas += cadastrosPorMes[mesAno].motoristas;
               acumuladoCarros += cadastrosPorMes[mesAno].carro;

               return {
                  mesAno,
                  motoristas: acumuladoMotoristas,
                  carro: acumuladoCarros,
               };
            })
            .sort((a, b) => {
               const [mesA, anoA] = a.mesAno.split("/").map(Number);
               const [mesB, anoB] = b.mesAno.split("/").map(Number);
               return new Date(anoA, mesA - 1) - new Date(anoB, mesB - 1);
            });

         setData(chartData);
         setCarregando(false);
      }
   }, [motoristas, carro]);

   if (carregando)
      return (
         <div style={chartContainerStyle}>
            <h3 style={titleStyle}>Crescimento de Cadastros</h3>
            <div>Carregando...</div>
         </div>
      );
   if (!data.length)
      return (
         <div style={chartContainerStyle}>
            <h3 style={titleStyle}>Crescimento de Cadastros</h3>
            <div>Sem dados</div>
         </div>
      );

   return (
      <div style={chartContainerStyle}>
         <h3 style={titleStyle}>Crescimento de Cadastros</h3>
         <ResponsiveContainer width="100%" height={400}>
            <AreaChart data={data}>
               <CartesianGrid strokeDasharray="3 3" />
               <XAxis dataKey="mesAno" />
               <YAxis />
               <Tooltip
                  formatter={(value, name) => [`${value} ${name}`, "Total"]}
               />
               <Legend />
               <Area
                  type="monotone"
                  dataKey="motoristas"
                  stackId="1"
                  stroke={colors.primary}
                  fill={colors.primary}
                  fillOpacity={0.4}
                  name="Motoristas"
               />
               <Area
                  type="monotone"
                  dataKey="carro"
                  stackId="2"
                  stroke={colors.secondary}
                  fill={colors.secondary}
                  fillOpacity={0.4}
                  name="Carros"
               />
            </AreaChart>
         </ResponsiveContainer>
      </div>
   );
};

export default AreaChartCrescimentoCadastros;
