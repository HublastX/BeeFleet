"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import useAuth from "@/hooks/useAuth";
import useDrivers from "@/hooks/useDrivers";
import useEvent from "@/hooks/useEvent";
import useCar from "@/hooks/useCar";
import ConfirmRestoreModal from "@/components/ConfirmRestoreModal";
import AdminSkeleton from "@/elements/ui/skeleton/AdminSkeleton";

const Restore = () => {
   const { gestores } = useAuth();
   const { motoristas, restoreDriver } = useDrivers();
   const { carro, restoreCar } = useCar();
   const { events, restoreEvent } = useEvent();

   const [selectedType, setSelectedType] = useState("");
   const [items, setItems] = useState([]);
   const [loading, setLoading] = useState(false);
   const [error, setError] = useState("");
   const [itemToRestore, setItemToRestore] = useState(null);
   const router = useRouter();

   const dataTypes = [
      { value: "drivers", label: "Motoristas" },
      { value: "cars", label: "Carros" },
      { value: "events", label: "Eventos" },
   ];

   const handleTypeChange = (type) => {
      setSelectedType(type);
      setError("");

      switch (type) {
         case "drivers":
            setItems(
               motoristas
                  .filter((m) => m.deletedAt)
                  .map((m) => ({
                     id: m.id,
                     name: m.name,
                  }))
            );
            break;
         case "cars":
            setItems(
               carro
                  .filter((c) => c.deletedAt)
                  .map((c) => ({
                     id: c.id,
                     name: c.plate,
                  }))
            );
            break;
         case "events":
            setItems(
               events
                  .filter((e) => e.deletedAt)
                  .map((e) => {
                     const driver = motoristas.find((m) => m.id === e.driverId);
                     const car = carro.find((c) => c.id === e.carId);
                     return {
                        id: e.id,
                        name: `${driver?.name || "Motorista removido"} - ${car?.plate || "Carro removido"}`,
                     };
                  })
            );
            break;
         default:
            setItems([]);
      }
   };

   const handleRestore = (itemId) => {
      setItemToRestore(itemId);
   };

   const confirmRestore = async () => {
      setLoading(true);
      setError("");

      try {
         switch (selectedType) {
            case "drivers":
               await restoreDriver(itemToRestore);
               break;
            case "cars":
               await restoreCar(itemToRestore);
               break;
            case "events":
               await restoreEvent(itemToRestore);
               break;
            default:
               throw new Error("Tipo inválido");
         }

         setItems(items.filter((item) => item.id !== itemToRestore));
         setItemToRestore(null);
      } catch (err) {
         console.error("Erro na restauração:", err);
         setError(err.message || "Erro ao restaurar. Tente novamente.");
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
         default:
            return "item";
      }
   };

   return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-12">
         <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
               <h1 className="text-4xl font-extrabold text-gray-900 dark:text-white mb-2">
                  Restore
               </h1>
               <p className="text-lg text-gray-600 dark:text-gray-300">
                  Restauração de itens excluídos
               </p>
            </div>

            {itemToRestore && (
               <ConfirmRestoreModal
                  tipo={getTipoLabel()}
                  link={confirmRestore}
                  onClose={() => setItemToRestore(null)}
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
                                          {item.name}
                                       </td>
                                       <td className="px-6 py-4">
                                          <button
                                             onClick={() =>
                                                handleRestore(item.id)
                                             }
                                             className="inline-flex items-center px-4 py-2 rounded-lg text-sm font-medium text-white bg-emerald-500 hover:bg-emerald-600 transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-emerald-500"
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
                                                   d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"
                                                />
                                             </svg>
                                             Restaurar
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

export default Restore;
