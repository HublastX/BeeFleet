"use client";
import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import withAuth from "@/utils/withAuth";
import useDrivers from "@/hooks/useDrivers";
import Link from "next/link";
import useAuth from "@/hooks/useAuth";
import Badge from "@/elements/ui/badge/Badge";
import Icon from "@/elements/Icon";
import Image from "next/image";
import DetailDriverTable from "@/components/table/detailDriverTable";
import DeleteConfirmation from "@/components/ConfirmDeleteModal";
import useCar from "@/hooks/useCar";
import useEvents from "@/hooks/useEvent";

function formatarData(dataISO) {
   const data = new Date(dataISO);
   return new Intl.DateTimeFormat("pt-BR", {
      dateStyle: "short",
      timeStyle: "short",
   }).format(data);
}

function DriverPage() {
   const { id } = useParams();
   const { getDriver, carregando, erro, deleteDriver } = useDrivers();
   const [motoristaData, setMotoristaData] = useState(null);
   const { gestores } = useAuth();
   const { carro } = useCar();
   const { events } = useEvents();
   const activeEvent = events.find(
      (event) => event.driverId === id && event.isActive
   );
   const carroAtualId = activeEvent ? activeEvent.carId : null;
   const carroAtual = carroAtualId
      ? carro.find((carro) => carro.id === carroAtualId)?.plate
      : null;
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

   const [menuAberto, setMenuAberto] = useState(false);

   const alternarMenu = () => {
      setMenuAberto(!menuAberto);
   };

   const [modalAberto, setModalAberto] = useState(false);
   const [motoristaParaDeletar, setMotoristaParaDeletar] = useState(null);

   function abrirModalDeletar(motoristaId) {
      setMotoristaParaDeletar(motoristaId);
      setModalAberto(true);
   }

   async function confirmarDelete() {
      if (motoristaParaDeletar) {
         try {
            await deleteDriver(motoristaParaDeletar);
            setModalAberto(false);
            setMotoristaParaDeletar(null);
            setMotoristaData(null);
         } catch (error) {
            console.error("Erro ao deletar motorista:", error);
         }
      }
   }

   return (
      <div>
         {carregando && <p>Carregando...</p>}
         {erro && (
            <div className="flex items-start gap-3 bg-white border border-black text-red-500 p-4 rounded-lg shadow max-w-xl mx-auto mt-8">
               <span className="text-2xl">🚫</span>
               <div>
                  <p className="font-semibold text-lg">
                     Não foi possível encontrar o motorista.
                  </p>
                  <p className="text-sm">
                     Tente novamente mais tarde ou verifique a conexão.
                  </p>
                  <p className="text-xs mt-1 text-red-500">
                     Detalhes técnicos: {erro}
                  </p>
               </div>
            </div>
         )}
         {!carregando && !erro && !motoristaData && (
            <p>Nenhum motorista encontrado.</p>
         )}
         {motoristaData && (
            <div className="gap-5 flex flex-col">
               <div className="flex flex-col md:flex-row gap-6">
                  {/* Card 1: Imagem e status */}
                  <div className="flex flex-col px-4 py-5 items-center gap-4 w-full h-fit  md:w-80 bg-bee-dark-100 dark:bg-bee-dark-800 rounded-md border border-bee-dark-300 dark:border-bee-dark-400">
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

                  {/* Card 2: Detalhes do motorista */}
                  <div className="flex flex-col w-full md:px-4 px-0 py-5 gap-6 bg-transparent md:bg-bee-dark-100 md:dark:bg-bee-dark-800 rounded-md md:border border-bee-dark-300 dark:border-bee-dark-400">
                     <div className="flex justify-between items-center gap-4 pb-3 text-center border-b-2 dark:border-bee-dark-400">
                        <h1 className="text-3xl text-left font-extrabold text-gray-800 dark:text-white/90">
                           {motoristaData.name}
                        </h1>
                     </div>
                     <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                        <div className="flex flex-col text-bee-dark-600 dark:text-bee-alert-500">
                           <span className="text-sm">Telefone</span>
                           <h1 className="font-black">{motoristaData.phone}</h1>
                        </div>
                        <div className="flex flex-col text-bee-dark-600 dark:text-bee-alert-500">
                           <span className="text-sm">CNH</span>
                           <h1 className="font-black">
                              {motoristaData.license}
                           </h1>
                        </div>
                        <div className="flex flex-col text-bee-dark-600 dark:text-bee-alert-500">
                           <span className="text-sm">Cadastrado em</span>
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
                        {motoristaData.isAvailable === false && (
                           <div className="flex flex-col text-bee-dark-600 dark:text-bee-alert-500">
                              <span className="text-sm">Placa do carro</span>
                              <h1 className="font-black">
                                 {carroAtual || "Carro não encontrado"}
                              </h1>
                           </div>
                        )}
                     </div>
                  </div>
               </div>
               <div className="fixed bottom-0 right-0 m-4 z-50">
                  <button
                     onClick={alternarMenu}
                     className="p-5 bg-bee-purple-600 hover:bg-bee-purple-700 shadow-xl text-white rounded-full transition-colors duration-300"
                  >
                     <Icon
                        name="menuMobile"
                        className="size-7"
                        strokeWidth={2}
                     />
                  </button>
               </div>
               <DetailDriverTable />

               {menuAberto && (
                  <div className="fixed bottom-23 right-1 shadow-xl rounded-lg p-2 w-56 bg-white dark:bg-bee-dark-800 border border-gray-200 dark:border-bee-dark-600 z-50 animate-fade-in">
                     <ul className="flex flex-col gap-1">
                        <li>
                           <Link href={`/drivers/${id}/edit`} className="block">
                              <span className="flex items-center gap-3 px-3 py-2 rounded-md hover:bg-bee-alert-500 dark:hover:bg-bee-alert-600 transition-colors duration-200">
                                 <Icon
                                    name="lapis"
                                    className="size-4 text-bee-primary"
                                 />
                                 <span className="text-gray-800 dark:text-gray-200">
                                    Editar Motorista
                                 </span>
                              </span>
                           </Link>
                        </li>
                        <li>
                           <Link href="/report" className="block">
                              <span className="flex items-center gap-3 px-3 py-2 rounded-md hover:bg-bee-alert-500 dark:hover:bg-bee-alert-600 transition-colors duration-200">
                                 <Icon
                                    name="reports"
                                    className="size-4 text-bee-primary"
                                 />
                                 <span className="text-gray-800 dark:text-gray-200">
                                    Gerar relatório
                                 </span>
                              </span>
                           </Link>
                        </li>
                        <li>
                           <Link
                              href={`/event?tipo=${motoristaData.isAvailable ? "saida" : "chegada"}&motoristaId=${id}`}
                              className="block"
                           >
                              <span className="flex items-center gap-3 px-3 py-2 rounded-md hover:bg-bee-alert-500 dark:hover:bg-bee-alert-600 transition-colors duration-200">
                                 <Icon
                                    name="evento"
                                    className="size-4 text-bee-primary"
                                 />
                                 <span className="text-gray-800 dark:text-gray-200">
                                    {motoristaData.isAvailable
                                       ? "Marcar Saída"
                                       : "Marcar Chegada"}
                                 </span>
                              </span>
                           </Link>
                        </li>
                        <li className="border-t border-gray-200 dark:border-bee-dark-600 mt-1 pt-1">
                           <button
                              onClick={() => abrirModalDeletar(id)}
                              className="w-full text-left"
                           >
                              <span className="flex items-center gap-3 px-3 py-2 rounded-md hover:bg-red-50 dark:hover:bg-red-900/20 transition-colors duration-200">
                                 <Icon
                                    name="trash"
                                    className="size-4 text-red-500 dark:text-red-400"
                                    strokeWidth={3}
                                 />
                                 <span className="text-red-600 dark:text-red-400">
                                    Deletar Motorista
                                 </span>
                              </span>
                           </button>
                        </li>
                     </ul>
                  </div>
               )}

               {modalAberto && (
                  <DeleteConfirmation
                     link={confirmarDelete}
                     tipo="motorista"
                     onClose={() => setModalAberto(false)}
                  />
               )}
            </div>
         )}
      </div>
   );
}
export default withAuth(DriverPage);
