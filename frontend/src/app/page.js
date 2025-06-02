"use client";
import Btn from "@/elements/btn";
import Link from "next/link";
import Card from "@/elements/card";
import useAuth from "@/hooks/useAuth";
import useCar from "@/hooks/useCar";
import useDrivers from "@/hooks/useDrivers";
import HomeSkeleton from "@/elements/ui/skeleton/HomeSkeleton";
import useEvents from "@/hooks/useEvent";
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
import RecentAtualizacao from "@/components/table/atualizacaoTable";

function Home() {
   const { gestor, erro, carregando, gestores } = useAuth();
   const { carro } = useCar();
   const { motoristas } = useDrivers();
   const { events } = useEvents();

   let show = "hidden";
   if (!gestor) {
      show = "flex";
   }

   function calcularEstadoComPorcentagem(quantidadeAtual, quantidadeAnterior) {
      if (quantidadeAnterior === 0) {
         return {
            estado: quantidadeAtual > 0 ? "aumento" : "estavel",
            porcentagem: quantidadeAtual > 0 ? 100 : 0,
         };
      }

      const diferenca = quantidadeAtual - quantidadeAnterior;
      const porcentagem = (diferenca / quantidadeAnterior) * 100;

      return {
         estado:
            porcentagem > 0 ? "aumento" : porcentagem < 0 ? "baixa" : "estavel",
         porcentagem: Math.round(Math.abs(porcentagem)),
      };
   }

   function filtrarPeriodo(dados, diasInicio, diasFim) {
      const dataFim = new Date();
      dataFim.setDate(dataFim.getDate() - diasInicio);

      const dataInicio = new Date();
      dataInicio.setDate(dataInicio.getDate() - diasFim);

      return dados.filter((item) => {
         const dataCriacao = new Date(item.createdAt);
         return dataCriacao >= dataInicio && dataCriacao < dataFim;
      });
   }

   function agruparPorDiaDaSemana(dados) {
      const diasDaSemana = ["Dom", "Seg", "Ter", "Qua", "Qui", "Sex", "Sab"];
      const resultado = diasDaSemana.map((dia) => ({ dia, count: 0 }));

      dados.forEach((item) => {
         const data = new Date(item.createdAt);
         const diaSemana = data.getDay();
         resultado[diaSemana].count++;
      });

      return resultado;
   }

   function obterUltimos7Dias() {
      const hoje = new Date();
      const seteDiasAtras = new Date();
      seteDiasAtras.setDate(hoje.getDate() - 6);

      return { inicio: seteDiasAtras, fim: hoje };
   }

   function filtrarUltimos7Dias(dados) {
      const { inicio, fim } = obterUltimos7Dias();

      return dados.filter((item) => {
         const dataCriacao = new Date(item.createdAt);
         return dataCriacao >= inicio && dataCriacao <= fim;
      });
   }

   const motoristas7Dias = filtrarPeriodo(motoristas, 0, 7);
   const motoristas7DiasAnteriores = filtrarPeriodo(motoristas, 7, 14);
   const resultadoMotoristas = calcularEstadoComPorcentagem(
      motoristas7Dias.length,
      motoristas7DiasAnteriores.length
   );

   const carros7Dias = filtrarPeriodo(carro, 0, 7);
   const carros7DiasAnteriores = filtrarPeriodo(carro, 7, 14);
   const resultadoCarros = calcularEstadoComPorcentagem(
      carros7Dias.length,
      carros7DiasAnteriores.length
   );

   const gestores7Dias = filtrarPeriodo(gestores, 0, 7);
   const gestores7DiasAnteriores = filtrarPeriodo(gestores, 7, 14);
   const resultadoGestores = calcularEstadoComPorcentagem(
      gestores7Dias.length,
      gestores7DiasAnteriores.length
   );

   const eventos7Dias = filtrarPeriodo(events, 0, 7);
   const eventos7DiasAnteriores = filtrarPeriodo(events, 7, 14);
   const resultadoEventos = calcularEstadoComPorcentagem(
      eventos7Dias.length,
      eventos7DiasAnteriores.length
   );

   const eventosUltimos7Dias = filtrarUltimos7Dias(events);
   const motoristasUltimos7Dias = filtrarUltimos7Dias(motoristas);
   const carrosUltimos7Dias = filtrarUltimos7Dias(carro);
   const gestoresUltimos7Dias = filtrarUltimos7Dias(gestores);

   const eventosPorDia = agruparPorDiaDaSemana(eventosUltimos7Dias);
   const motoristasPorDia = agruparPorDiaDaSemana(motoristasUltimos7Dias);
   const carrosPorDia = agruparPorDiaDaSemana(carrosUltimos7Dias);
   const gestoresPorDia = agruparPorDiaDaSemana(gestoresUltimos7Dias);

   const data = [
      {
         week: "Dom",
         evento: eventosPorDia[0].count,
         motorista: motoristasPorDia[0].count,
         carro: carrosPorDia[0].count,
         gestor: gestoresPorDia[0].count,
      },
      {
         week: "Seg",
         evento: eventosPorDia[1].count,
         motorista: motoristasPorDia[1].count,
         carro: carrosPorDia[1].count,
         gestor: gestoresPorDia[1].count,
      },
      {
         week: "Ter",
         evento: eventosPorDia[2].count,
         motorista: motoristasPorDia[2].count,
         carro: carrosPorDia[2].count,
         gestor: gestoresPorDia[2].count,
      },
      {
         week: "Qua",
         evento: eventosPorDia[3].count,
         motorista: motoristasPorDia[3].count,
         carro: carrosPorDia[3].count,
         gestor: gestoresPorDia[3].count,
      },
      {
         week: "Qui",
         evento: eventosPorDia[4].count,
         motorista: motoristasPorDia[4].count,
         carro: carrosPorDia[4].count,
         gestor: gestoresPorDia[4].count,
      },
      {
         week: "Sex",
         evento: eventosPorDia[5].count,
         motorista: motoristasPorDia[5].count,
         carro: carrosPorDia[5].count,
         gestor: gestoresPorDia[5].count,
      },
      {
         week: "Sab",
         evento: eventosPorDia[6].count,
         motorista: motoristasPorDia[6].count,
         carro: carrosPorDia[6].count,
         gestor: gestoresPorDia[6].count,
      },
   ];

   return (
      <>
         {carregando || erro ? (
            <HomeSkeleton />
         ) : (
            <>
               <div
                  className={`fixed overflow-hidden top-0 left-0 right-0 bottom-0  items-center justify-center z-5 backdrop-blur-sm ${show}`}
                  role="dialog"
                  aria-label="Aviso de acesso restrito"
               >
                  <div className="flex flex-col items-center justify-center gap-4">
                     <p
                        className="text-3xl font-extrabold text-bee-alert-300 flex items-center gap-2"
                        role="alert"
                     >
                        <span aria-hidden="true">⚠️</span> Acesso Restrito
                     </p>
                     <p className="font-medium text-lg text-bee-dark-600 dark:text-white text-center">
                        Para acessar, realize o login!
                     </p>
                     <Link href="/login" aria-label="Ir para página de login">
                        <Btn>Fazer Login</Btn>
                     </Link>
                  </div>
               </div>
               <main role="main" className="grid grid-cols-12 gap-4 md:gap-6">
                  <div className="col-span-12 space-y-5 xl:col-span-6">
                     <nav
                        className="flex row gap-5 overflow-x-scroll md:grid grid-cols-1 sm:grid-cols-2 md:gap-6 no-scrollbar"
                        aria-label="Cards de navegação"
                     >
                        <Link
                           href="/drivers"
                           aria-label={`Ver todos os ${motoristas.length} motoristas`}
                        >
                           <Card
                              titulo="Motoristas"
                              icone="users"
                              estado={resultadoMotoristas.estado}
                              porcentagem={resultadoMotoristas.porcentagem}
                              quantidade={motoristas.length}
                              color="purple"
                           />
                        </Link>
                        <Link
                           href="/cars"
                           aria-label={`Ver todos os ${carro.length} veículos`}
                        >
                           <Card
                              titulo="Veículos"
                              icone="car"
                              estado={resultadoCarros.estado}
                              porcentagem={resultadoCarros.porcentagem}
                              quantidade={carro.length}
                              color="blue"
                           />
                        </Link>

                        <Link
                           href="/managers"
                           aria-label={`Ver todos os ${gestores.length} gestores`}
                        >
                           <Card
                              titulo="Gestores"
                              icone="gestor"
                              estado={resultadoGestores.estado}
                              porcentagem={resultadoGestores.porcentagem}
                              quantidade={gestores.length}
                              color="orange"
                           />
                        </Link>
                        <Link
                           href="/event"
                           aria-label={`Ver todos os ${events.length} eventos`}
                        >
                           <Card
                              titulo="Eventos"
                              icone="evento"
                              estado={resultadoEventos.estado}
                              porcentagem={resultadoEventos.porcentagem}
                              quantidade={events.length}
                              color="green"
                           />
                        </Link>
                     </nav>
                     <section
                        aria-label="Gráfico de criações dos últimos 7 dias"
                        className="overflow-hidden rounded-xl border border-bee-dark-300 bg-bee-dark-100 dark:border-bee-dark-400 dark:bg-bee-dark-800 p-6 transition-all duration-300 hover:shadow-lg"
                     >
                        <h1 className="text-xl mb-5 font-semibold">
                           Criações dos últimos 7 dias
                        </h1>
                        <div>
                           <div
                              style={{ width: "100%", height: 264 }}
                              role="img"
                              aria-label="Gráfico de barras mostrando criações dos últimos 7 dias"
                           >
                              <ResponsiveContainer>
                                 <BarChart data={data} barSize={30}>
                                    <CartesianGrid strokeDasharray="1" />
                                    <XAxis dataKey="week" stroke="#ccc" />
                                    <YAxis stroke="#ccc" />
                                    <Tooltip
                                       contentStyle={{
                                          borderRadius: "8px",
                                          border: "none",
                                          boxShadow:
                                             "0 2px 10px rgba(0,0,0,0.1)",
                                       }}
                                    />
                                    <Legend
                                       iconType="circle"
                                       iconSize={10}
                                       layout="horizontal"
                                       width={"100%"}
                                    />
                                    <Bar
                                       stackId="a"
                                       dataKey="gestor"
                                       fill="rgba(245, 73, 0, 0.9)"
                                       name="Gestores"
                                       animationDuration={800}
                                    />
                                    <Bar
                                       stackId="a"
                                       dataKey="motorista"
                                       fill="rgba(152, 16, 250, 0.9)"
                                       name="Motoristas"
                                       animationDuration={800}
                                    />
                                    <Bar
                                       stackId="a"
                                       dataKey="carro"
                                       fill="rgba(21, 93, 252, 0.9)"
                                       name="Veículos"
                                       animationDuration={800}
                                    />
                                    <Bar
                                       stackId="a"
                                       dataKey="evento"
                                       fill="rgba(0, 166, 62, 0.9)"
                                       name="Eventos"
                                       animationDuration={800}
                                       radius={[10, 10, 0, 0]}
                                    />
                                 </BarChart>
                              </ResponsiveContainer>
                           </div>
                        </div>
                     </section>
                  </div>
                  <aside
                     className="col-span-12 xl:col-span-6"
                     aria-label="Atualizações recentes"
                  >
                     <RecentAtualizacao />
                  </aside>
               </main>
            </>
         )}
      </>
   );
}
export default Home;
