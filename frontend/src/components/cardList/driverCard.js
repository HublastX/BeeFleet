import useDrivers from "@/hooks/useDrivers";
import Image from "next/image";
import Link from "next/link";
import Icon from "@/elements/Icon";
import CardSkeleton from "@/elements/ui/skeleton/CardSkeleton";
import { useNavBar } from "../navbar/navBarContext";

function formatarTelefone(telefone) {
   if (!telefone) return "";
   const numeros = telefone.replace(/\D/g, "");
   if (numeros.length === 11) {
      return `(${numeros.slice(0, 2)}) ${numeros.slice(2, 7)}-${numeros.slice(7)}`;
   }
   if (numeros.length === 10) {
      return `(${numeros.slice(0, 2)}) ${numeros.slice(2, 6)}-${numeros.slice(6)}`;
   }
   return telefone;
}

export default function DriverCard({ searchTerm }) {
   const { motoristas, erro, carregando } = useDrivers();
   const { isExpanded, isHovered } = useNavBar();
   const isNavOpen = isExpanded || isHovered;

   const motoristasFiltrados = motoristas
      .filter((motoristas) => {
         if (!searchTerm) return true;
         const termo = searchTerm.toLowerCase();
         return (
            motoristas.name.toLowerCase().includes(termo) ||
            motoristas.phone.toLowerCase().includes(termo) ||
            motoristas.license.toLowerCase().includes(termo)
         );
      })
      .sort((a, b) => new Date(b.updatedAt) - new Date(a.updatedAt));

   const gridClass = `grid transition-all duration-300 ease-in-out gap-6 p-4 ${
      isNavOpen
         ? "xl:grid-cols-4 lg:grid-cols-3"
         : "xl:grid-cols-5 lg:grid-cols-4"
   } grid-cols-1 xs:grid-cols-2 sm:grid-cols-2 md:grid-cols-3`;

   if (carregando) return <CardSkeleton />;
   if (erro)
      return (
         <div className="space-y-4">
            <div className="p-6 text-center font-semibold text-xl">
               <p className="text-bee-alert-300">
                  Ocorreu um problema ao carregar os motoristas. <br />
                  <span className="text-sm">Detalhes: {erro}</span>
               </p>
            </div>
            <CardSkeleton />
         </div>
      );

   return (
      <div className="w-full">
         {motoristasFiltrados.length === 0 && !erro && !carregando && (
            <div className="flex flex-col items-center justify-center p-12 w-full h-full bg-white dark:bg-bee-dark-800 rounded-xl border border-dashed border-bee-dark-300 dark:border-bee-dark-400">
               <Icon
                  name="userCircle"
                  className="size-16 text-gray-400 dark:text-gray-500 mb-4"
               />
               <div className="text-center">
                  <h3 className="text-lg font-semibold text-gray-700 dark:text-gray-300">
                     Nenhum motorista encontrado
                  </h3>
                  <p className="text-gray-500 dark:text-gray-400 mt-1">
                     {searchTerm
                        ? "Tente ajustar sua busca"
                        : "Adicione um novo motorista para começar"}
                  </p>
               </div>
            </div>
         )}

         <div className={gridClass}>
            {motoristasFiltrados.map((driver) => (
               <Link
                  href={`${driver.id}`}
                  key={driver.id}
                  className="group relative bg-white dark:bg-bee-dark-800 rounded-xl shadow-sm card-hover transition-all duration-300 overflow-hidden border border-bee-dark-300 dark:border-bee-dark-400"
               >
                  {/* Status Badge */}
                  <div
                     className={`absolute top-3 right-3 z-10 px-2 py-1 rounded-full text-xs font-medium ${
                        driver.isAvailable
                           ? "bg-green-300/80 dark:bg-green-900/70 text-green-800 dark:text-green-500"
                           : "bg-red-300/80 dark:bg-red-900/70 text-red-800 dark:text-red-500"
                     }`}
                  >
                     {driver.isAvailable ? "Disponível" : "Indisponível"}
                  </div>

                  {/* foto */}
                  <div className="relative w-full h-48 bg-gray-100 dark:bg-bee-dark-400 overflow-hidden">
                     {driver.image ? (
                        <Image
                           src={driver.image}
                           alt={`Foto de ${driver.name}`}
                           fill
                           className="object-cover transition-transform duration-500 group-hover:scale-105"
                           sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                        />
                     ) : (
                        <div className="w-full h-full flex items-center justify-center text-gray-400">
                           <Icon name="user" className="size-35" />
                        </div>
                     )}
                  </div>

                  {/* telefione */}
                  <div className="p-4 space-y-2">
                     <h3 className="font-semibold text-lg text-gray-800 dark:text-white truncate">
                        {driver.name}
                     </h3>

                     <div className="flex items-center gap-2 text-gray-600 dark:text-gray-400">
                        <Icon name="phone" className="size-4" />
                        <span className="text-sm">
                           {formatarTelefone(driver.phone)}
                        </span>
                     </div>

                     {/* <div className="flex items-center gap-2 text-gray-600 dark:text-gray-400">
                        <Icon name="reports" className="size-4" />
                        <span className="text-sm">CNH: {driver.license}</span>
                     </div> */}

                     <div className="pt-2 mt-2 border-t border-bee-dark-300 dark:border-bee-dark-400 flex justify-between items-center text-xs text-gray-500 dark:text-gray-400">
                        <span>
                           Atualizado em:{" "}
                           {new Date(driver.updatedAt).toLocaleDateString(
                              "pt-BR"
                           )}
                        </span>
                        <div>
                           <Icon
                              name="chevronRight"
                              className="size-5"
                              strokeWidth={2}
                           />
                        </div>
                     </div>
                  </div>
               </Link>
            ))}
         </div>
      </div>
   );
}
