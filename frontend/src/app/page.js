"use client";
import Toast from '@/elements/toast/ Toast';
import Btn from "@/elements/btn";
import Link from "next/link";
import Card from "@/elements/card";
import useAuth from "@/hooks/useAuth";
import useCar from "@/hooks/useCar";
import useDrivers from "@/hooks/useDrivers";
import RecentEvent from "@/components/table/homeTable";

function Home() {
   const { gestor, erro, carregando, gestores } = useAuth();
   const { carro } = useCar();
   const { motoristas } = useDrivers();

   return (
      <>
         <Toast
            message="⚠️ Área restrita"
            description="Faça login para acessar outras funcionalidades."
            type="warning"
         />

         {!gestor ? (
            <div className="flex flex-col items-center justify-center gap-4">
               <p className="text-xl font-bold text-red-500 flex items-center gap-2">
                  <span>⚠️</span> Acesso Restrito
               </p>
               <p className="text-gray-600 dark:text-gray-100 text-center">
                  Para acessar, realize o login!
               </p>
               <Link href="/login" id="login-btn">
                <Btn>Fazer Login</Btn>
                </Link>

            </div>
         ) : (
            <div className="grid grid-cols-12 gap-4 md:gap-6">
               <div className="col-span-12 space-y-5 xl:col-span-6">
                  {carregando && <p>Carregando...</p>}
                  {erro && <p>{erro}</p>}
                  <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:gap-6">
                     <Card
                        titulo="Motoristas"
                        icone="user"
                        estado="baixa"
                        quantidade={motoristas.length}
                     />
                     <Card
                        titulo="Carros"
                        icone="truck"
                        estado="aumento"
                        quantidade={carro.length}
                     />
                     <Card
                        titulo="Gestores"
                        icone="suport"
                        estado="aumento"
                        quantidade={gestores.length}
                     />
                     <Card
                        titulo="Eventos"
                        icone="evento"
                        estado="baixa"
                        quantidade="0"
                     />
                  </div>
                  <div className="overflow-hidden rounded-2xl px-5 pt-5 sm:px-6 sm:pt-6 border border-bee-dark-300 bg-bee-dark-100 dark:border-bee-dark-400 dark:bg-bee-dark-800">
                     <div>
                        <h1 className="text-lg font-semibold text-bee-dark-600 dark:text-bee-alert-500">Gerar Relatorio</h1>
                     </div>
                     <div>Nao Lembro oq vai em relatorio</div>
                  </div>
               </div>
               <div className="col-span-12 xl:col-span-6">
                  <RecentEvent />
               </div>
            </div>
         )}
      </>
   );
}
export default Home;
