import useCar from "@/hooks/useCar";
import Image from "next/image";
import Link from "next/link";
import Icon from "@/elements/Icon";
import CardSkeleton from "@/elements/ui/skeleton/CardSkeleton";
import { useNavBar } from "../navbar/navBarContext";

export default function CarCard({ searchTerm }) {
   const { carro, erro, carregando } = useCar();
   const { isExpanded, isHovered } = useNavBar();
   const isNavOpen = isExpanded || isHovered;

   const carrosFiltrados = carro
      .filter((carro) => {
         if (!searchTerm) return true;
         const termo = searchTerm.toLowerCase();
         return (
            carro.model.toLowerCase().includes(termo) ||
            carro.plate.toLowerCase().includes(termo)
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
                  Ocorreu um problema ao carregar os carros. <br />
                  <span className="text-sm">Detalhes: {erro}</span>
               </p>
            </div>
            <CardSkeleton />
         </div>
      );

   return (
      <div className="w-full">
         {carrosFiltrados.length === 0 && !erro && !carregando && (
            <div className="flex flex-col items-center justify-center p-12 w-full h-full bg-white dark:bg-bee-dark-800 rounded-xl border border-dashed border-bee-dark-300 dark:border-bee-dark-400">
               <Icon
                  name="car"
                  className="size-16 text-gray-400 dark:text-gray-500 mb-4"
               />
               <div className="text-center">
                  <h3 className="text-lg font-semibold text-gray-700 dark:text-gray-300">
                     Nenhum veículo encontrado
                  </h3>
                  <p className="text-gray-500 dark:text-gray-400 mt-1">
                     {searchTerm
                        ? "Tente ajustar sua busca"
                        : "Adicione um novo veículo para começar"}
                  </p>
               </div>
            </div>
         )}

         <div className={gridClass}>
            {carrosFiltrados.map((car) => (
               <Link
                  href={`${car.id}`}
                  key={car.id}
                  className="group relative bg-white dark:bg-bee-dark-800 rounded-xl shadow-sm card-hover transition-all duration-300 overflow-hidden border border-bee-dark-300 dark:border-bee-dark-400"
               >
                  {/* Status Badge */}
                  <div
                     className={`absolute top-3 right-3 z-10 px-2 py-1 rounded-full text-xs font-medium ${
                        car.status === "AVAILABLE"
                           ? "bg-green-300/80 dark:bg-green-900/70 text-green-800 dark:text-green-500"
                           : car.status === "IN_USE"
                             ? "bg-red-300/80 dark:bg-red-900/70 text-red-800 dark:text-red-500"
                             : "bg-yellow-100 dark:bg-yellow-900/30 text-yellow-800 dark:text-yellow-400"
                     }`}
                  >
                     {car.status === "AVAILABLE"
                        ? "Disponível"
                        : car.status === "IN_USE"
                          ? "Em uso"
                          : "Indisponível"}
                  </div>

                  {/* foto */}
                  <div className="relative w-full h-48 bg-gray-100 dark:bg-bee-dark-400 overflow-hidden">
                     {car.image ? (
                        <Image
                           src={car.image}
                           alt={`Foto do veículo ${car.model}`}
                           fill
                           className="object-cover transition-transform duration-500 group-hover:scale-105"
                           sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                        />
                     ) : (
                        <div className="w-full h-full flex items-center justify-center text-gray-400">
                           <Icon name="car" className="size-35" />
                        </div>
                     )}
                  </div>

                  {/* detalhes */}
                  <div className="p-4 space-y-2">
                     <h3 className="font-semibold text-lg text-gray-800 dark:text-white truncate">
                        {car.brand} {car.model}
                     </h3>

                     {/* <div className="flex items-center gap-2 text-gray-600 dark:text-gray-400">
                        <Icon name="plate" className="size-4" />
                        <span className="text-sm">{car.plate}</span>
                     </div> */}

                     <div className="flex items-center gap-2 text-gray-600 dark:text-gray-400">
                        {/* <Icon name="clock" className="size-4" /> */}
                        <span className="text-sm">{car.odometer} km</span>
                     </div>

                     <div className="pt-2 mt-2 border-t border-bee-dark-300 dark:border-bee-dark-400 flex justify-between items-center text-xs text-gray-500 dark:text-gray-400">
                        <span>
                           Atualizado em:{" "}
                           {new Date(car.updatedAt).toLocaleDateString("pt-BR")}
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
