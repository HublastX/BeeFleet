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
                     {/* <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:gap-6"> */}
                     <div className="flex row gap-5 overflow-x-scroll md:grid grid-cols-1 sm:grid-cols-2 md:gap-6 no-scrollbar">
                        <Link href="/drivers">
                           <Card
                              titulo="Motoristas"
                              icone="users"
                              // estado="baixa"
                              quantidade={motoristas.length}
                           />
                        </Link>
                        <Link href="/cars">
                           <Card
                              titulo="Carros"
                              icone="car"
                              // estado="aumento"
                              quantidade={carro.length}
                           />
                        </Link>

                        <Link href="/managers">
                           <Card
                              titulo="Gestores"
                              icone="gestor"
                              // estado="aumento"
                              quantidade={gestores.length}
                           />
                        </Link>

                        <Card
                           titulo="Eventos"
                           icone="evento"
                           // estado="baixa"
                           quantidade={events.length}
                        />
                     </div>
                     <div className="overflow-hidden rounded-2xl border border-bee-dark-300 bg-bee-dark-100 dark:border-bee-dark-400 dark:bg-bee-dark-800 p-6">
                        <div className="flex flex-col gap-4">
                           <div className="flex items-center gap-3 text-bee-primary-500 dark:text-white">
                              <Icon name="eventoL" className="size-7" />
                              <h2 className="text-xl font-bold">
                                 Gerenciar Eventos
                              </h2>
                           </div>
                           <p className="text-sm sm:text-base text-bee-dark-700 dark:text-bee-dark-100">
                              Para registrar a <strong>chegada</strong> ou{" "}
                              <strong>saída</strong> de um carro, acesse a
                              página de{" "}
                              <strong>gerenciamento de eventos</strong>.
                           </p>
                           <Link href="/event">
                              <Btn
                                 texto="Acessar gerenciamento"
                                 className="w-fit px-6 py-2 bg-bee-primary-500 hover:bg-bee-primary-600 text-white rounded-lg transition"
                              />
                           </Link>
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
