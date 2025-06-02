"use client";
import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import withAuth from "@/utils/withAuth";
import useCar from "@/hooks/useCar";
import useAuth from "@/hooks/useAuth";
import Badge from "@/elements/ui/badge/Badge";
import Icon from "@/elements/Icon";
import Image from "next/image";
import Link from "next/link";
import DetailCarTable from "@/components/table/detailCarTable";
import DeleteConfirmation from "@/components/ConfirmDeleteModal";
import useEvents from "@/hooks/useEvent";
import useDrivers from "@/hooks/useDrivers";
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

function CarPage() {
   const { id } = useParams();
   const { getCar, carregando, erro, deleteCar, getDeletedCars } = useCar();
   const [carroData, setCarroData] = useState(null);
   const { gestores } = useAuth();
   const { motoristas } = useDrivers();
   const { events } = useEvents();

   const activeEvent = events.find(
      (event) => event.carId === id && event.isActive
   );
   const motoristaAtualId = activeEvent ? activeEvent.driverId : null;
   const motoristaAtual = motoristaAtualId
      ? motoristas.find((motorista) => motorista.id === motoristaAtualId)
      : null;

   useEffect(() => {
      if (!id || carroData) return;

      async function fetchCar() {
         try {
            const data = await getCar(id);
            setCarroData(data);
         } catch (error) {
            console.error("Erro ao buscar carro:", error);
         }
      }
      fetchCar();
   }, [id, getCar, carroData]);

   const gestorDoCarro = carroData
      ? gestores.find((g) => g.id === carroData.managerId)
      : null;

   const [showMenu, setShowMenu] = useState(false);
   const [showDeleteModal, setShowDeleteModal] = useState(false);
   const [carroParaDeletar, setCarroParaDeletar] = useState(null);

   function abrirModalDeletar(carroId) {
      setShowDeleteModal(true);
      setCarroParaDeletar(carroId);
   }

   async function confirmarDelete() {
      if (carroParaDeletar) {
         try {
            await deleteCar(carroParaDeletar);
            setShowDeleteModal(false);
            setCarroParaDeletar(null);
            setCarroData(null);
         } catch (error) {
            console.error("Erro ao deletar carro:", error);
         }
      }
   }

   const deletedCars = getDeletedCars();
   const carroDeletado = deletedCars.find((c) => c.id === id);

   if (carroDeletado) {
      return (
         <div className=" flex items-center justify-center p-4">
            <div className="w-full max-w-md bg-white rounded-lg overflow-hidden shadow-sm border border-gray-100">
               <div className="p-6 space-y-5">
                  <div className="text-center space-y-2">
                     <h2 className="text-2xl font-light text-gray-800">
                        Veículo <span className="font-medium">Excluido</span>
                     </h2>
                     {carroDeletado.manager && (
                        <p className="text-gray-500 text-sm">
                           Ação realizada por: {carroDeletado.manager.name}
                        </p>
                     )}
                  </div>

                  <div className="bg-gray-50/50 p-4 rounded-lg">
                     <p className="text-gray-600 text-center">
                        Para restaurar este cadastro, solicite ao time
                        administrativo.
                     </p>
                  </div>
               </div>

               <div className="px-6 py-4 bg-gray-50 border-t border-gray-100 flex justify-between items-center">
                  <span className="text-xs text-gray-400 font-mono">
                     ID: {id}
                  </span>
                  <button
                     className="text-sm text-blue-500 hover:text-blue-700 transition-colors"
                     onClick={() => window.history.back()}
                  >
                     Voltar
                  </button>
               </div>
            </div>
         </div>
      );
   }

   if (carregando) return <DetailSkeleton />;

   if (erro)
      return (
         <div className="max-w-4xl mx-auto p-6">
            <div className="flex items-center gap-4 p-4 bg-red-50 dark:bg-red-900/10 border border-red-200 dark:border-red-800 rounded-lg">
               <Icon name="warning" className="size-6 text-red-500" />
               <div>
                  <h3 className="font-medium text-red-600 dark:text-red-400">
                     Erro ao carregar veículo
                  </h3>
                  <p className="text-sm text-red-500 dark:text-red-400/80">
                     {erro.message || "Tente novamente mais tarde."}
                  </p>
               </div>
            </div>
         </div>
      );

   if (!carroData)
      return (
         <div className="max-w-4xl mx-auto p-6 text-center">
            <p className="text-gray-500 dark:text-gray-400">
               Veículo não encontrado
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
                     {carroData.model}
                  </h1>
                  <Badge
                     color={carroData.isAvailable ? "success" : "error"}
                     size="lg"
                  >
                     {carroData.isAvailable ? "Disponível" : "Em uso"}
                  </Badge>
               </div>
               <p className="text-gray-500 dark:text-gray-400 mt-1">
                  Cadastrado em {formatDate(carroData.createdAt)}
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

         {/* principal */}
         <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-3 grid grid-cols-1 lg:grid-cols-3 gap-8">
               {/* foto */}
               <div className="bg-white dark:bg-gray-800 h-fit rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 overflow-hidden">
                  <div className="relative h-48 bg-gray-100 dark:bg-gray-700">
                     {carroData.image ? (
                        <Image
                           src={carroData.image}
                           alt={`Foto de ${carroData.model}`}
                           fill
                           className="object-cover"
                           priority
                        />
                     ) : (
                        <div className="flex items-center justify-center h-full">
                           <Icon name="car" className="size-20 text-gray-400" />
                        </div>
                     )}
                  </div>
                  <div className="p-6">
                     <div className="space-y-6">
                        <div>
                           <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-1">
                              Placa
                           </h3>
                           <p className="text-lg font-medium">
                              {carroData.plate}
                           </p>
                        </div>

                        <div>
                           <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-1">
                              Marca
                           </h3>
                           <p className="text-lg font-medium">
                              {carroData.brand}
                           </p>
                        </div>

                        <div>
                           <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-1">
                              Ano
                           </h3>
                           <p className="text-lg font-medium">
                              {carroData.year}
                           </p>
                        </div>
                     </div>
                  </div>
               </div>
               {/* informacoes */}
               <div className="lg:col-span-2 bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-6">
                  <h2 className="text-xl font-semibold mb-6">Informações</h2>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                     <div>
                        <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-1">
                           Cor
                        </h3>
                        <p className="text-lg">{carroData.color}</p>
                     </div>

                     <div>
                        <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-1">
                           Hodômetro
                        </h3>
                        <p className="text-lg">{carroData.odometer}km</p>
                     </div>

                     <div>
                        <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-1">
                           Chassi
                        </h3>
                        <p className="text-lg">{carroData.chassis}</p>
                     </div>

                     <div>
                        <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-1">
                           Renavam
                        </h3>
                        <p className="text-lg">{carroData.renavam}</p>
                     </div>

                     <div>
                        <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-1">
                           Última atualização
                        </h3>
                        <p className="text-lg">
                           {formatDate(carroData.updatedAt)}
                        </p>
                     </div>

                     <div>
                        <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-1">
                           Cadastrado por
                        </h3>
                        <p className="text-lg">
                           {gestorDoCarro?.name || "Não especificado"}
                        </p>
                     </div>

                     <div className="md:col-span-2">
                        <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-1">
                           Status
                        </h3>
                        <p className="text-lg">
                           {carroData.isAvailable
                              ? "Disponível para uso"
                              : `Em uso por ${motoristaAtual?.name || "motorista não identificado"}`}
                        </p>
                     </div>
                  </div>
               </div>
            </div>
            {/* historico */}
            <div className="lg:col-span-3 bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-6">
               <div className="flex justify-between items-center mb-6">
                  <h2 className="text-xl font-semibold">
                     Histórico de Utilização
                  </h2>
                  <Link href={`/report?filterType=carro&filterId=${id}`}>
                     <button
                        variant="link"
                        icon="report"
                        text="Gerar Relatório"
                     />
                  </Link>
               </div>
               <DetailCarTable />
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
                           Opções do Veículo
                        </h3>

                        <Link
                           href={`/cars/${id}/edit`}
                           className="flex items-center gap-3 p-3 rounded-lg hover:bg-bee-alert-500 dark:hover:bg-bee-alert-600 md:transition-colors"
                           onClick={() => setShowMenu(false)}
                        >
                           <Icon name="lapis" className="size-5" />
                           <span>Editar Veículo</span>
                        </Link>

                        <Link
                           href={`/event?tipo=${carroData.isAvailable ? "saida" : "chegada"}&carroId=${id}`}
                           className="flex items-center gap-3 p-3 rounded-lg hover:bg-bee-alert-500 dark:hover:bg-bee-alert-600 md:transition-colors"
                           onClick={() => setShowMenu(false)}
                        >
                           <Icon name="evento" className="size-5" />
                           <span>
                              {carroData.isAvailable
                                 ? "Registrar Saída"
                                 : "Registrar Chegada"}
                           </span>
                        </Link>

                        <Link
                           href={`/report?filterType=carro&filterId=${id}`}
                           className="flex items-center gap-3 p-3 rounded-lg hover:bg-bee-alert-500 dark:hover:bg-bee-alert-600 md:transition-colors"
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
                           className="w-full flex items-center gap-3 p-3 text-red-500 rounded-lg hover:bg-red-50 dark:hover:bg-red-900/10 md:transition-colors"
                        >
                           <Icon name="trash" className="size-5" />
                           <span>Excluir Veículo</span>
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
               tipo="veículo"
            />
         )}
      </div>
   );
}

export default withAuth(CarPage);
