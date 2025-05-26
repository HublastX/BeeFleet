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
import DetailSkeleton from "@/elements/ui/skeleton/DetailSkeleton";
import Btn from "@/elements/btn";

function formatDate(dateISO) {
   const options = {
      day: "2-digit",
      month: "long",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
   };
   return new Date(dateISO).toLocaleDateString("pt-BR", options);
}

function DriverPage() {
   const { id } = useParams();
   const { getDriver, carregando, erro, deleteDriver } = useDrivers();
   const [driver, setDriver] = useState(null);
   const { gestores } = useAuth();
   const { carro } = useCar();
   const { events } = useEvents();

   const activeEvent = events.find(
      (event) => event.driverId === id && event.isActive
   );
   const currentCar = activeEvent
      ? carro.find((car) => car.id === activeEvent.carId)
      : null;

   useEffect(() => {
      if (!id || driver) return;

      const fetchDriver = async () => {
         try {
            const data = await getDriver(id);
            setDriver(data);
         } catch (err) {
            console.erro("Failed to load driver:", err);
         }
      };

      fetchDriver();
   }, [id, getDriver, driver]);

   const driverManager = driver
      ? gestores.find((m) => m.id === driver.managerId)
      : null;
   const [showMenu, setShowMenu] = useState(false);
   const [showDeleteModal, setShowDeleteModal] = useState(false);

   const [motoristaParaDeletar, setMotoristaParaDeletar] = useState(null);

   function abrirModalDeletar(driverId) {
      setShowDeleteModal(true);
      setMotoristaParaDeletar(driverId);
   }

   async function confirmarDelete() {
      if (motoristaParaDeletar) {
         try {
            await deleteDriver(motoristaParaDeletar);
            setShowDeleteModal(false);
            setMotoristaParaDeletar(null);
            setDriver(null);
         } catch (error) {
            console.error("Erro ao deletar motorista:", error);
         }
      }
   }

   if (carregando) return <DetailSkeleton />;

   if (erro)
      return (
         <div className="max-w-4xl mx-auto p-6">
            <div className="flex items-center gap-4 p-4 bg-red-50 dark:bg-red-900/10 border border-red-200 dark:border-red-800 rounded-lg">
               <Icon name="warning" className="size-6 text-red-500" />
               <div>
                  <h3 className="font-medium text-red-600 dark:text-red-400">
                     Erro ao carregar motorista
                  </h3>
                  <p className="text-sm text-red-500 dark:text-red-400/80">
                     {erro.message || "Tente novamente mais tarde."}
                  </p>
               </div>
            </div>
         </div>
      );

   if (!driver)
      return (
         <div className="max-w-4xl mx-auto p-6 text-center">
            <p className="text-gray-500 dark:text-gray-400">
               Motorista não encontrado
            </p>
         </div>
      );

   return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
         {/* Header */}
         <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8">
            <div>
               <div className="flex items-center gap-4">
                  <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
                     {driver.name}
                  </h1>
                  <Badge
                     color={driver.isAvailable ? "success" : "error"}
                     size="lg"
                     className="text-nowrap"
                  >
                     {driver.isAvailable ? "Disponível" : "Em viagem"}
                  </Badge>
               </div>
               <p className="text-gray-500 dark:text-gray-400 mt-1">
                  Cadastrado em {formatDate(driver.createdAt)}
               </p>
            </div>

            <div className="flex gap-3">
               <Btn
                  texto="Opções"
                  variant="cancel"
                  onClick={() => setShowMenu(!showMenu)}
               />
            </div>
         </div>

         {/* parte principal */}
         <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-3 grid grid-cols-1 lg:grid-cols-3 gap-8">
               {/* foto */}
               <div className="bg-white dark:bg-gray-800 h-fit rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 overflow-hidden">
                  <div className="relative h-48 bg-gray-100 dark:bg-gray-700">
                     {driver.image ? (
                        <Image
                           src={driver.image}
                           alt={`Foto de ${driver.name}`}
                           fill
                           className="object-cover"
                           priority
                        />
                     ) : (
                        <div className="flex items-center justify-center h-full">
                           <Icon
                              name="user"
                              className="size-20 text-gray-400"
                           />
                        </div>
                     )}
                  </div>

                  <div className="p-6">
                     <div className="space-y-6">
                        <div>
                           <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-1">
                              Telefone
                           </h3>
                           <p className="text-lg font-medium">{driver.phone}</p>
                        </div>

                        <div>
                           <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-1">
                              CNH
                           </h3>
                           <p className="text-lg font-medium">
                              {driver.license}
                           </p>
                        </div>

                        {!driver.isAvailable && currentCar && (
                           <div>
                              <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-1">
                                 Veículo Atual
                              </h3>
                              <p className="text-lg font-medium">
                                 {currentCar.plate} - {currentCar.model}
                              </p>
                           </div>
                        )}
                     </div>
                  </div>
               </div>
               {/* informacoes */}
               <div className="lg:col-span-2 bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-6">
                  <h2 className="text-xl font-semibold mb-6">Informações</h2>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                     <div>
                        <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-1">
                           Última atualização
                        </h3>
                        <p className="text-lg">
                           {formatDate(driver.updatedAt)}
                        </p>
                     </div>

                     <div>
                        <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-1">
                           Cadastrado por
                        </h3>
                        <p className="text-lg">
                           {driverManager?.name || "Não especificado"}
                        </p>
                     </div>

                     <div className="md:col-span-2">
                        <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-1">
                           Status
                        </h3>
                        <p className="text-lg">
                           {driver.isAvailable
                              ? "Disponível para novas viagens"
                              : `Em viagem com o veículo ${currentCar?.plate || "não identificado"}`}
                        </p>
                     </div>
                  </div>
               </div>
            </div>

            {/* historico */}
            <div className="lg:col-span-3 bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-6">
               <div className="flex justify-between items-center mb-6">
                  <h2 className="text-xl font-semibold">
                     Histórico de Viagens
                  </h2>
                  <Link href="/report">
                     <button
                        variant="link"
                        icon="report"
                        text="Gerar Relatório"
                     />
                  </Link>
               </div>
               <DetailDriverTable />
            </div>
         </div>

         {/* Mobile Menu */}
         {showMenu && (
            <div className="fixed inset-0 z-50">
               <div
                  className="absolute inset-0 bg-black/30"
                  onClick={() => setShowMenu(false)}
               />

               <div className="absolute bottom-0 left-0 right-0 md:bottom-auto md:right-auto md:top-1/2 md:left-1/2 md:-translate-x-1/2 md:-translate-y-1/2 md:min-w-1/3">
                  <div className="bg-white dark:bg-gray-800 rounded-t-xl md:rounded-xl shadow-xl border-t md:border border-gray-200 dark:border-gray-700 p-4 md:p-6 w-full md:max-w-md">
                     <div className="space-y-2 md:space-y-3">
                        <h3 className="hidden md:block text-lg font-medium mb-4">
                           Opções do Motorista
                        </h3>
                        <Link
                           href={`/drivers/${id}/edit`}
                           className="flex items-center gap-3 p-3 rounded-lg hover:bg-bee-alert-500 dark:hover:bg-bee-alert-600"
                           onClick={() => setShowMenu(false)}
                        >
                           <Icon name="lapis" className="size-5" />
                           <span>Editar Motorista</span>
                        </Link>
                        <Link
                           href={`/event?tipo=${driver.isAvailable ? "saida" : "chegada"}&motoristaId=${id}`}
                           className="flex items-center gap-3 p-3 rounded-lg hover:bg-bee-alert-500 dark:hover:bg-bee-alert-600"
                           onClick={() => setShowMenu(false)}
                        >
                           <Icon name="evento" className="size-5" />
                           <span>
                              {driver.isAvailable
                                 ? "Registrar Saída"
                                 : "Registrar Chegada"}
                           </span>
                        </Link>
                        <Link
                           href="/report"
                           className="flex items-center gap-3 p-3 rounded-lg hover:bg-bee-alert-500 dark:hover:bg-bee-alert-600"
                           onClick={() => setShowMenu(false)}
                        >
                           <Icon name="reports" className="size-5" />
                           <span>Gerar Relatório</span>
                        </Link>
                        <button
                           onClick={() => {
                              abrirModalDeletar(id);
                              setShowMenu(false);
                           }}
                           className="w-full flex items-center gap-3 p-3 text-red-500 rounded-lg hover:bg-red-50 dark:hover:bg-red-900/10"
                        >
                           <Icon name="trash" className="size-5" />
                           <span>Excluir Motorista</span>
                        </button>
                     </div>
                  </div>
               </div>
            </div>
         )}

         {/* Delete Modal */}
         {showDeleteModal && (
            <DeleteConfirmation
               link={confirmarDelete}
               onClose={() => setShowDeleteModal(false)}
               tipo="motorista"
            />
         )}
      </div>
   );
}

export default withAuth(DriverPage);
