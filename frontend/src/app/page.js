"use client";
import Btn from "@/elements/btn";
import Link from "next/link";
import Card from "@/elements/card";
import useAuth from "@/hooks/useAuth";
import useCar from "@/hooks/useCar";
import useDrivers from "@/hooks/useDrivers";
import RecentEvent from "@/components/table/homeTable";
import HomeSkeleton from "@/elements/ui/skeleton/HomeSkeleton";
import Icon from "@/elements/Icon";
import useEvents from "@/hooks/useEvent";

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

   return (
      <>
         {carregando || erro ? (
            <HomeSkeleton />
         ) : (
            <>
               <div
                  className={`fixed overflow-hidden top-0 left-0 right-0 bottom-0  items-center justify-center z-5 backdrop-blur-sm ${show}`}
               >
                  <div className="flex flex-col items-center justify-center gap-4">
                     <p className="text-3xl font-extrabold text-bee-alert-300 flex items-center gap-2">
                        <span>⚠️</span> Acesso Restrito
                     </p>
                     <p className="font-medium text-lg text-bee-dark-600 dark:text-white text-center">
                        Para acessar, realize o login!
                     </p>
                     <Link href="/login">
                        <Btn>Fazer Login</Btn>
                     </Link>
                  </div>
               </div>
               <div className="grid grid-cols-12 gap-4 md:gap-6">
                  <div className="col-span-12 space-y-5 xl:col-span-6">
                     <div className="flex row gap-5 overflow-x-scroll md:grid grid-cols-1 sm:grid-cols-2 md:gap-6 no-scrollbar">
                        <Link href="/drivers">
                           <Card
                              titulo="Motoristas"
                              icone="users"
                              estado={resultadoMotoristas.estado}
                              porcentagem={resultadoMotoristas.porcentagem}
                              quantidade={motoristas.length}
                              color="purple"
                           />
                        </Link>
                        <Link href="/cars">
                           <Card
                              titulo="Carros"
                              icone="car"
                              estado={resultadoCarros.estado}
                              porcentagem={resultadoCarros.porcentagem}
                              quantidade={carro.length}
                              color="blue"
                           />
                        </Link>

                        <Link href="/managers">
                           <Card
                              titulo="Gestores"
                              icone="gestor"
                              estado={resultadoGestores.estado}
                              porcentagem={resultadoGestores.porcentagem}
                              quantidade={gestores.length}
                              color="orange"
                           />
                        </Link>
                        <Link href="/event">
                           <Card
                              titulo="Eventos"
                              icone="evento"
                              estado={resultadoEventos.estado}
                              porcentagem={resultadoEventos.porcentagem}
                              quantidade={events.length}
                              color="green"
                           />
                        </Link>
                     </div>
                     <div className="overflow-hidden rounded-xl border border-bee-dark-300 bg-bee-dark-100 dark:border-bee-dark-400 dark:bg-bee-dark-800 p-6 card-hover transition-all duration-300 hover:shadow-lg">
                        <div className="flex flex-col gap-5">
                           <div className="flex items-center gap-3 text-bee-primary-500 dark:text-white">
                              <div className="p-2 bg-bee-alert-500 dark:bg-bee-alert-600 rounded-lg">
                                 <Icon name="evento" className="size-6" />
                              </div>
                              <h2 className="text-xl font-semibold tracking-tight">
                                 Gerenciar Eventos
                              </h2>
                           </div>

                           <div className="space-y-2">
                              <p className="text-sm sm:text-base text-bee-dark-700 dark:text-bee-dark-100 leading-relaxed">
                                 Para registrar a{" "}
                                 <strong className="font-medium">
                                    chegada
                                 </strong>{" "}
                                 ou{" "}
                                 <strong className="font-medium">saída</strong>{" "}
                                 de um carro, acesse a página de{" "}
                                 <strong className="font-medium">
                                    gerenciamento de eventos
                                 </strong>
                                 .
                              </p>
                           </div>

                           <div className="mt-2">
                              <Link href="/event">
                                 <Btn
                                    texto="Acessar gerenciamento"
                                    className="w-fit px-5 py-2.5 bg-bee-primary-500 hover:bg-bee-primary-600 text-white rounded-lg transition-all hover:scale-[1.02] font-medium text-sm"
                                 />
                              </Link>
                           </div>
                        </div>
                     </div>
                  </div>
                  <div className="col-span-12 xl:col-span-6">
                     <RecentEvent />
                  </div>
               </div>
            </>
         )}
      </>
   );
}
export default Home;
