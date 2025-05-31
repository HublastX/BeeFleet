"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import useAuth from "@/hooks/useAuth";
import useDrivers from "@/hooks/useDrivers";
import useEvent from "@/hooks/useEvent";
import useCar from "@/hooks/useCar";
import ConfirmDeleteModal from "@/components/ConfirmDeleteModal";
import AdminSkeleton from "@/elements/ui/skeleton/AdminSkeleton";

const SuperDelete = () => {
   const { gestores, superDeleteManager } = useAuth();
   const { motoristas, superDeleteDriver } = useDrivers();
   const { carro, superDeleteCar } = useCar();
   const { events, superDeleteEvent } = useEvent();

   const [selectedType, setSelectedType] = useState("");
   const [items, setItems] = useState([]);
   const [loading, setLoading] = useState(false);
   const [error, setError] = useState("");
   const [itemToDelete, setItemToDelete] = useState(null);
   const router = useRouter();

   const dataTypes = [
      { value: "drivers", label: "Motoristas" },
      { value: "cars", label: "Carros" },
      { value: "events", label: "Eventos" },
      { value: "managers", label: "Gestores" },
   ];

   const handleTypeChange = (type) => {
      setSelectedType(type);
      setError("");

      switch (type) {
         case "drivers":
            setItems(
               motoristas.map((m) => ({
                  id: m.id,
                  name: m.name,
               }))
            );
            break;
         case "cars":
            setItems(
               carro.map((c) => ({
                  id: c.id,
                  name: c.plate,
               }))
            );
            break;
         case "events":
            setItems(
               events.map((e) => {
                  const driver = motoristas.find((m) => m.id === e.driverId);
                  const car = carro.find((c) => c.id === e.carId);
                  return {
                     id: e.id,
                     name: `${driver?.name || "Motorista removido"} - ${car?.plate || "Carro removido"}`,
                  };
               })
            );
            break;
         case "managers":
            setItems(
               gestores.map((g) => ({
                  id: g.id,
                  name: g.name,
               }))
            );
            break;
         default:
            setItems([]);
      }
   };

   const handleDelete = async (itemId) => {
      setItemToDelete(itemId);
   };

   const confirmDelete = async () => {
      setLoading(true);
      setError("");

      try {
         switch (selectedType) {
            case "drivers":
               await superDeleteDriver(itemToDelete);
               break;
            case "cars":
               await superDeleteCar(itemToDelete);
               break;
            case "events":
               await superDeleteEvent(itemToDelete);
               break;
            case "managers":
               await superDeleteManager(itemToDelete);
               break;
            default:
               throw new Error("Tipo inválido");
         }

         setItems(items.filter((item) => item.id !== itemToDelete));
         setItemToDelete(null);
      } catch (err) {
         console.error("Erro na deleção:", err);
         setError(err.message || "Erro ao deletar. Tente novamente.");
      } finally {
         setLoading(false);
      }
   };

   const getTipoLabel = () => {
      switch (selectedType) {
         case "drivers":
            return "motorista";
         case "cars":
            return "carro";
         case "events":
            return "evento";
         case "managers":
            return "gestor";
         default:
            return "item";
      }
   };

   return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-12">
         <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
               <h1 className="text-4xl font-extrabold text-gray-900 dark:text-white mb-2">
                  Super Delete
               </h1>
               <p className="text-lg text-gray-600 dark:text-gray-300">
                  Gerenciamento avançado de exclusão de dados
               </p>
            </div>

            {itemToDelete && (
               <ConfirmDeleteModal
                  tipo={getTipoLabel()}
                  link={confirmDelete}
                  onClose={() => setItemToDelete(null)}
               />
            )}

            <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-8">
               <div className="mb-8">
                  <h2 className="text-2xl font-bold mb-6 text-gray-900 dark:text-white">
                     Selecione o tipo de dado
                  </h2>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                     {dataTypes.map((type) => (
                        <button
                           key={type.value}
                           onClick={() => handleTypeChange(type.value)}
                           className={`p-6 rounded-xl transition-all transform hover:scale-105 flex flex-col items-center justify-center space-y-2 ${
                              selectedType === type.value
                                 ? "bg-gradient-to-r from-yellow-300 to-yellow-500 text-white shadow-lg"
                                 : "bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-white hover:shadow-md"
                           }`}
                        >
                           {type.label}
                        </button>
                     ))}
                  </div>
               </div>

               {error && (
                  <div className="mb-8 p-4 bg-red-50 border-l-4 border-red-500 text-red-700 rounded-lg">
                     <div className="flex items-center">
                        <svg
                           className="w-5 h-5 mr-2"
                           fill="currentColor"
                           viewBox="0 0 20 20"
                        >
                           <path
                              fillRule="evenodd"
                              d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z"
                              clipRule="evenodd"
                           />
                        </svg>
                        {error}
                     </div>
                  </div>
               )}

               {loading ? (
                  <AdminSkeleton />
               ) : (
                  selectedType && (
                     <div className="overflow-hidden rounded-xl border border-gray-200 dark:border-gray-600">
                        <table className="w-full">
                           <thead>
                              <tr className="bg-gray-50 dark:bg-gray-700">
                                 <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900 dark:text-white">
                                    ID
                                 </th>
                                 <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900 dark:text-white">
                                    Nome
                                 </th>
                                 <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900 dark:text-white">
                                    Ações
                                 </th>
                              </tr>
                           </thead>
                           <tbody className="divide-y divide-gray-200 dark:divide-gray-600">
                              {items.length > 0 ? (
                                 items.map((item) => (
                                    <tr
                                       key={item.id}
                                       className="hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
                                    >
                                       <td className="px-6 py-4 text-sm text-gray-900 dark:text-white">
                                          {item.id}
                                       </td>
                                       <td className="px-6 py-4 text-sm text-gray-900 dark:text-white">
                                          {item.name ||
                                             item.nome ||
                                             item.title ||
                                             "N/A"}
                                       </td>
                                       <td className="px-6 py-4">
                                          <button
                                             onClick={() =>
                                                handleDelete(item.id)
                                             }
                                             className="inline-flex items-center px-4 py-2 rounded-lg text-sm font-medium text-white bg-red-500 hover:bg-red-600 transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
                                          >
                                             <svg
                                                className="w-4 h-4 mr-2"
                                                fill="none"
                                                stroke="currentColor"
                                                viewBox="0 0 24 24"
                                             >
                                                <path
                                                   strokeLinecap="round"
                                                   strokeLinejoin="round"
                                                   strokeWidth="2"
                                                   d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                                                />
                                             </svg>
                                             Deletar
                                          </button>
                                       </td>
                                    </tr>
                                 ))
                              ) : (
                                 <tr>
                                    <td
                                       colSpan="3"
                                       className="px-6 py-8 text-center text-sm text-gray-500 dark:text-gray-400"
                                    >
                                       Nenhum item encontrado
                                    </td>
                                 </tr>
                              )}
                           </tbody>
                        </table>
                     </div>
                  )
               )}
            </div>
         </div>
      </div>
   );
};

export default SuperDelete;
