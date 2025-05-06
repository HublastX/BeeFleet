"use client";
import Btn from "@/elements/btn";
import Link from "next/link";
import Card from "@/elements/card";
import useAuth from "@/hooks/useAuth";
import useCar from "@/hooks/useCar";
import useDrivers from "@/hooks/useDrivers";
import RecentEvent from "@/components/table/homeTable";
import HomeSkeleton from "@/elements/ui/skeleton/HomeSkeleton";

function Home() {
   const { gestor, erro, carregando, gestores } = useAuth();
   const { carro } = useCar();
   const { motoristas } = useDrivers();

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
                     <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:gap-6">
                        <Link href="/drivers">
                           <Card
                              titulo="Motoristas"
                              icone="users"
                              estado="baixa"
                              quantidade={motoristas.length}
                           />
                        </Link>
                        <Link href="/cars">
                           <Card
                              titulo="Carros"
                              icone="car"
                              estado="aumento"
                              quantidade={carro.length}
                           />
                        </Link>

                        <Link href="/managers">
                           <Card
                              titulo="Gestores"
                              icone="suport"
                              estado="aumento"
                              quantidade={gestores.length}
                           />
                        </Link>

                        <Card
                           titulo="Eventos"
                           icone="evento"
                           estado="baixa"
                           quantidade="0"
                        />
                     </div>
                     <div className="overflow-hidden rounded-2xl border border-bee-dark-300 bg-bee-dark-100 dark:border-bee-dark-400 dark:bg-bee-dark-800 p-6">
                        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                           <div className="text-sm sm:text-base max-w-lg">
                              <p>
                                 Para registrar a <strong>chegada</strong> ou{" "}
                                 <strong>saída</strong> de um carro, acesse a
                                 página de{" "}
                                 <strong>gerenciamento de eventos</strong>.
                              </p>
                           </div>
                           <Btn
                              texto="Gerenciar evento"
                              className="self-start sm:self-auto"
                           />
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
