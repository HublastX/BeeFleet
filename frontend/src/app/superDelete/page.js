"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import useAuth from "@/hooks/useAuth";
import useDrivers from "@/hooks/useDrivers";
import useEvent from "@/hooks/useEvent";
import useCar from "@/hooks/useCar";
import ConfirmDeleteModal from "@/components/ConfirmDeleteModal";
import AdminSkeleton from "@/elements/ui/skeleton/AdminSkeleton";

const SuperDelete = () => {
  const { gestores, superDeleteManager, gestor } = useAuth();
  const { motoristas, superDeleteDriver } = useDrivers();
  const { carro, superDeleteCar } = useCar();
  const { events, superDeleteEvent } = useEvent();

  const [selectedType, setSelectedType] = useState("");
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [itemToDelete, setItemToDelete] = useState(null);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
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
    setIsDropdownOpen(false);

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

  if (gestor?.isAdmin === false) {
    return router.push("404");
  }

  return (
    <div >
      {gestor?.isAdmin === true && (
        <div className="max-w-7xl mx-auto">
          <header className="mb-12 text-center">
            <motion.h1 
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-4xl md:text-5xl font-bold text-gray-800 dark:text-white mb-3"
            >
              Super Delete
            </motion.h1>
            <p className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
              Área administrativa para exclusão definitiva de registros do sistema
            </p>
          </header>

          <AnimatePresence>
            {itemToDelete && (
              <ConfirmDeleteModal
                tipo={getTipoLabel()}
                link={confirmDelete}
                onClose={() => setItemToDelete(null)}
              />
            )}
          </AnimatePresence>

          <div className="bg-bee-dark-100 dark:bg-gray-800 rounded-2xl shadow-lg overflow-hidden">
            <div className="p-6 md:p-8">
              <div className="mb-8">
                <h2 className="text-xl font-semibold text-gray-800 dark:text-white mb-4">
                  Selecione o tipo de dado
                </h2>
                
                {/* Mobile Dropdown */}
                <div className="md:hidden relative mb-6">
                  <button
                    onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                    className="w-full flex items-center justify-between px-4 py-3 bg-gray-100 dark:bg-gray-700 rounded-lg text-gray-800 dark:text-white"
                  >
                    <span>
                      {selectedType 
                        ? dataTypes.find(t => t.value === selectedType)?.label 
                        : "Selecione um tipo"}
                    </span>
                    <span className={`transition-transform ${isDropdownOpen ? "rotate-180" : ""}`}>
                      ▼
                    </span>
                  </button>
                  
                  <AnimatePresence>
                    {isDropdownOpen && (
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: "auto" }}
                        exit={{ opacity: 0, height: 0 }}
                        className="absolute z-10 w-full mt-2 bg-white dark:bg-gray-700 rounded-lg shadow-lg overflow-hidden"
                      >
                        {dataTypes.map((type) => (
                          <button
                            key={type.value}
                            onClick={() => handleTypeChange(type.value)}
                            className={`w-full text-left px-4 py-3 hover:bg-gray-100 dark:hover:bg-gray-600 ${
                              selectedType === type.value ? "bg-gray-200 dark:bg-gray-600" : ""
                            }`}
                          >
                            {type.label}
                          </button>
                        ))}
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
                
                {/* Desktop Tabs */}
                <div className="hidden md:grid grid-cols-4 gap-4">
                  {dataTypes.map((type) => (
                    <motion.button
                      key={type.value}
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      onClick={() => handleTypeChange(type.value)}
                      className={`p-5 rounded-xl transition-all ${
                        selectedType === type.value
                          ? "bg-gradient-to-br from-red-500 to-yellow-500 text-white shadow-lg"
                          : "bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-white hover:shadow-md"
                      }`}
                    >
                      <span className="font-medium block text-center">{type.label}</span>
                    </motion.button>
                  ))}
                </div>
              </div>

              {error && (
                <motion.div 
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="mb-6 p-4 bg-red-100 dark:bg-red-900/30 border-l-4 border-red-500 text-red-700 dark:text-red-300 rounded-lg"
                >
                  <p className="font-medium">Erro ao processar</p>
                  <p>{error}</p>
                </motion.div>
              )}

              {loading ? (
                <AdminSkeleton />
              ) : (
                selectedType && (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="overflow-hidden rounded-xl border border-gray-200 dark:border-gray-700"
                  >
                    <div className="overflow-x-auto">
                      <table className="w-full">
                        <thead className="bg-gray-50 dark:bg-gray-700">
                          <tr>
                            <th className="px-6 py-4 text-left text-sm font-medium text-gray-700 dark:text-gray-300 uppercase tracking-wider">
                              ID
                            </th>
                            <th className="px-6 py-4 text-left text-sm font-medium text-gray-700 dark:text-gray-300 uppercase tracking-wider">
                              Nome
                            </th>
                            <th className="px-6 py-4 text-right text-sm font-medium text-gray-700 dark:text-gray-300 uppercase tracking-wider">
                              Ações
                            </th>
                          </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
                          {items.length > 0 ? (
                            items.map((item) => (
                              <tr
                                key={item.id}
                                className="hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors"
                              >
                                <td className="px-6 py-4 whitespace-nowrap text-sm font-mono text-gray-600 dark:text-gray-300">
                                  {item.id}
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 dark:text-white">
                                  {item.name || item.nome || item.title || "N/A"}
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap text-right text-sm">
                                  <motion.button
                                    whileHover={{ scale: 1.05 }}
                                    whileTap={{ scale: 0.95 }}
                                    onClick={() => handleDelete(item.id)}
                                    className="px-4 py-2 rounded-lg text-sm font-medium text-white bg-red-500 hover:bg-red-600 transition-colors focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2"
                                    disabled={loading}
                                  >
                                    {loading ? "Processando..." : "Deletar"}
                                  </motion.button>
                                </td>
                              </tr>
                            ))
                          ) : (
                            <tr>
                              <td
                                colSpan="3"
                                className="px-6 py-12 text-center text-sm text-gray-500 dark:text-gray-400"
                              >
                                Nenhum item encontrado
                              </td>
                            </tr>
                          )}
                        </tbody>
                      </table>
                    </div>
                  </motion.div>
                )
              )}
            </div>
          </div>

          <div className="mt-8 text-center text-sm text-gray-500 dark:text-gray-400">
            <p>Use com cuidado. Esta ação é irreversível.</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default SuperDelete;