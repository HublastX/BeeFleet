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
import { DropdownItem } from "@/elements/ui/dropdown/DropdownItem";
import { Dropdown } from "@/elements/ui/dropdown/Dropdown";

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
   const { getCar, carregando, erro, deleteCar } = useCar();
   const [carroData, setCarroData] = useState(null);
   const { gestores } = useAuth();
   const { motoristas } = useDrivers();
   const { events } = useEvents();
   const [isOpen, setIsOpen] = useState(false);

   function toggleDropdown(e) {
      e.stopPropagation();
      setIsOpen((prev) => !prev);
   }

   function closeDropdown() {
      setIsOpen(false);
   }

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
                  variant="cancel"
                  texto="Opções"
                  onClick={toggleDropdown}
                  className="hidden md:flex"
               />
               <Btn
                  texto="Opções"
                  variant="cancel"
                  onClick={() => setShowMenu(!showMenu)}
                  className="flex md:hidden"
               />

               <Dropdown
                  isOpen={isOpen}
                  onClose={closeDropdown}
                  className="absolute px-5 mt-12 mr-3 flex flex-col rounded-b-2xl border border-bee-dark-300 bg-bee-dark-100 py-3 shadow-theme-lg dark:border-bee-dark-400 dark:bg-bee-dark-800"
               >
                  <ul className="flex flex-col gap-1 pb-3 border-b border-bee-dark-300 dark:border-bee-dark-400">
                     <li>
                        <DropdownItem
                           onItemClick={closeDropdown}
                           tag="a"
                           href={`/cars/${id}/edit`}
                           className="flex items-center gap-3 px-3 py-2 font-medium text-bee-dark-600 rounded-lg group text-theme-sm hover:bg-bee-alert-500 dark:text-bee-alert-500 dark:hover:bg-bee-alert-600"
                        >
                           <Icon name="lapis" className="size-4" />
                           Editar Carro
                        </DropdownItem>
                        <DropdownItem
                           onItemClick={closeDropdown}
                           tag="a"
                           href={`/event?tipo=${carroData.isAvailable ? "saida" : "chegada"}&carroId=${id}`}
                           className="flex items-center gap-3 px-3 py-2 font-medium text-bee-dark-600 rounded-lg group text-theme-sm hover:bg-bee-alert-500 dark:text-bee-alert-500 dark:hover:bg-bee-alert-600"
                        >
                           <Icon name="evento" className="size-4" />
                           {carroData.isAvailable
                              ? "Registrar Saída"
                              : "Registrar Chegada"}
                        </DropdownItem>
                        <DropdownItem
                           onItemClick={closeDropdown}
                           tag="a"
                           href="/report"
                           className="flex items-center gap-3 px-3 py-2 font-medium text-bee-dark-600 rounded-lg group text-theme-sm hover:bg-bee-alert-500 dark:text-bee-alert-500 dark:hover:bg-bee-alert-600"
                        >
                           <Icon name="reports" className="size-4" />
                           Gerar Relatório
                        </DropdownItem>
                     </li>
                  </ul>
                  <button
                     onClick={() => {
                        abrirModalDeletar(id);
                        setShowMenu(false);
                     }}
                     className="w-full mt-2 flex items-center gap-3 p-3 text-red-500 rounded-lg hover:bg-red-50 dark:hover:bg-red-900/10"
                  >
                     <Icon name="trash" className="size-5" strokeWidth={2} />
                     Excluir Carro
                  </button>
               </Dropdown>
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

                        {!carroData.isAvailable && motoristaAtual && (
                           <div>
                              <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-1">
                                 Motorista Atual
                              </h3>
                              <p className="text-lg font-medium">
                                 {motoristaAtual.name}
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
                           Cor
                        </h3>
                        <p className="text-lg">{carroData.color}</p>
                     </div>

                     <div>
                        <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-1">
                           Hodômetro
                        </h3>
                        <p className="text-lg">{carroData.odometer}</p>
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
                  <Link href="/report">
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
               <div className="absolute bottom-0 left-0 right-0 bg-white dark:bg-gray-800 rounded-t-xl shadow-xl border-t border-gray-200 dark:border-gray-700 p-4">
                  <div className="space-y-2">
                     <Link
                        href={`/cars/${id}/edit`}
                        className="flex items-center gap-3 p-3 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700"
                        onClick={() => setShowMenu(false)}
                     >
                        <Icon name="lapis" className="size-5" />
                        <span>Editar Veículo</span>
                     </Link>

                     <Link
                        href={`/event?tipo=${carroData.isAvailable ? "saida" : "chegada"}&carroId=${id}`}
                        className="flex items-center gap-3 p-3 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700"
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
                        href="/report"
                        className="flex items-center gap-3 p-3 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700"
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
                        <span>Excluir Veículo</span>
                     </button>
                  </div>
               </div>
            </div>
         )}

         {/* Delete Modal */}
         {showDeleteModal && (
            <DeleteConfirmation
               onConfirm={confirmarDelete}
               onClose={() => setShowDeleteModal(false)}
               tipo="veículo"
            />
         )}
      </div>
   );
}

export default withAuth(CarPage);
