"use client";
import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import withAuth from "@/utils/withAuth";
import useDrivers from "@/hooks/useDrivers";
import Link from "next/link";
import useAuth from "@/hooks/useAuth";
import Badge from "@/elements/ui/badge/Badge";
import Icon from "@/elements/Icon";
import Btn from "@/elements/btn";
import Image from "next/image";

function formatarData(dataISO) {
   const data = new Date(dataISO);
   return new Intl.DateTimeFormat("pt-BR", {
      dateStyle: "short",
      timeStyle: "short",
   }).format(data);
}

function DiverPage() {
   const { id } = useParams();
   const { getDriver, carregando, erro } = useDrivers();
   const [motoristaData, setMotoristaData] = useState(null);
   const { gestores } = useAuth();

   useEffect(() => {
      if (!id || motoristaData) return;

      async function fetchDriver() {
         try {
            const data = await getDriver(id);
            setMotoristaData(data);
         } catch (error) {
            console.error("Erro ao buscar motorista:", error);
         }
      }

      fetchDriver();
   }, [id, getDriver, motoristaData]);

   const gestorDoMotorista = motoristaData
      ? gestores.find((g) => g.id === motoristaData.managerId)
      : null;

   return (
      <div>
         {carregando && <p>Carregando...</p>}
         {erro && <p>Erro: {erro}</p>}
         {!carregando && !erro && !motoristaData && (
            <p>Nenhum motorista encontrado.</p>
         )}
         {motoristaData && (
            <div className="gap-5 flex flex-col">
               <div className="flex flex-col md:flex-row gap-6">
                  {/* Card 1: Imagem e placa */}
                  <div className="flex flex-col px-4 py-5 items-center gap-4 w-full  md:w-80 bg-bee-dark-100 dark:bg-bee-dark-800 rounded-md border border-bee-dark-300 dark:border-bee-dark-400">
                     <div className="relative w-full h-40 rounded-md overflow-hidden">
                        {motoristaData.image ? (
                           <Image
                              src={motoristaData.image}
                              alt={`Imagem do motorista ${motoristaData.name}`}
                              layout="fill"
                              objectFit="cover"
                              className="rounded"
                           />
                        ) : (
                           <Icon
                              name="user"
                              className="w-full h-full border-b-2 border-bee-dark-300 dark:border-bee-dark-400 pb-3"
                           />
                        )}
                     </div>
                     <Badge
                        className="w-full text-center"
                        size="sm"
                        color={motoristaData.isAvailable ? "success" : "error"}
                     >
                        {motoristaData.isAvailable
                           ? "Disponível"
                           : "Indisponível"}
                     </Badge>
                  </div>

                  {/* Card 2: Detalhes do carro */}
                  <div className="flex flex-col w-full md:px-4 px-0 py-5 gap-6 bg-transparent md:bg-bee-dark-100 md:dark:bg-bee-dark-800 rounded-md md:border border-bee-dark-300 dark:border-bee-dark-400">
                     <div className="flex justify-between items-center gap-4 pb-3 text-center border-b-2 dark:border-bee-dark-400">
                        <h1 className="text-3xl text-left font-extrabold text-gray-800 dark:text-white/90">
                           {motoristaData.name}
                        </h1>
                        <Link href={`/drivers/${id}/edit`}>
                           <Btn
                              texto="Editar motorista"
                              className="flex text-nowrap flex-row-reverse gap-2 items-center"
                           >
                              <Icon name="lapis" className="size-5" />
                           </Btn>
                        </Link>
                     </div>
                     <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                        <div className="flex flex-col text-bee-dark-600 dark:text-bee-alert-500">
                           <span className="text-sm">Numero</span>
                           <h1 className="font-black">{motoristaData.phone}</h1>
                        </div>
                        <div className="flex flex-col text-bee-dark-600 dark:text-bee-alert-500">
                           <span className="text-sm">CNH</span>
                           <h1 className="font-black">
                              {motoristaData.license}
                           </h1>
                        </div>
                        <div className="flex flex-col text-bee-dark-600 dark:text-bee-alert-500">
                           <span className="text-sm">Criado em</span>
                           <h1 className="font-black">
                              {formatarData(motoristaData.createdAt)}
                           </h1>
                        </div>
                        <div className="flex flex-col text-bee-dark-600 dark:text-bee-alert-500">
                           <span className="text-sm">Última edição</span>
                           <h1 className="font-black">
                              {formatarData(motoristaData.updatedAt)}
                           </h1>
                        </div>
                        <div className="flex flex-col text-bee-dark-600 dark:text-bee-alert-500">
                           <span className="text-sm">Criado por</span>
                           <h1 className="font-black">
                              {gestorDoMotorista?.name ||
                                 "Gestor não encontrado"}
                           </h1>
                        </div>
                     </div>
                  </div>
               </div>
            </div>
         )}
      </div>
   );
}
export default withAuth(DiverPage);
