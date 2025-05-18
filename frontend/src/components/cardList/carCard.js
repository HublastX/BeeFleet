import useCar from "@/hooks/useCar";
import Image from "next/image";
import Link from "next/link";
import Icon from "@/elements/Icon";
import CardSkeleton from "@/elements/ui/skeleton/CardSkeleton";
import { useNavBar } from "../navbar/navBarContext";
export default function CarCard({ searchTerm }) {
   const { carro, erro, carregando } = useCar();
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

   const { isExpanded, isHovered } = useNavBar();
   const isNavOpen = isExpanded || isHovered;

   const gridClass = `grid transition-all duration-300 ease-in-out grid-cols-1 md:grid-cols-3 ${
      isNavOpen ? "lg:grid-cols-4" : "lg:grid-cols-5"
   }`;

   if (carregando) return <CardSkeleton />;
   if (erro)
      return (
         <div>
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
      <>
         {carrosFiltrados.length === 0 && !erro && !carregando && (
            <div className="flex items-center justify-center p-6 w-full h-full">
               <div className="text-center font-semibold text-xl">
                  Nenhum carro foi encontrado
               </div>
            </div>
         )}
         <div className={`${gridClass} gap-6 p-4`}>
            {!carregando && !erro && (
               <>
                  {carrosFiltrados.map((car) => (
                     <Link
                        href={`${car.id}`}
                        key={car.id}
                        className="relative bg-bee-dark-100 dark:bg-bee-dark-800 p-4 rounded-2xl shadow hover:shadow-xl transition duration-300 flex flex-col gap-4"
                     >
                        <div className="relative w-full h-40 rounded-lg overflow-hidden">
                           {car.image ? (
                              <Image
                                 src={car.image}
                                 alt={`Imagem do carro ${car.model}`}
                                 layout="fill"
                                 objectFit="cover"
                                 unoptimized 
                                 className="rounded-lg"
                              />
                           ) : (
                              <div className="w-full h-full bg-bee-purple-300 text-bee-alert-500 text-center flex justify-center">
                                 <Icon name="car" />
                              </div>
                           )}

                           <h1
                              className={`absolute top-1 right-1 w-5 h-5 rounded-full border-2 border-white dark:border-gray-800 ${
                                 car.status === "IN_USE"
                                    ? "bg-bee-alert-300"
                                    : car.status === "AVAILABLE"
                                      ? "bg-bee-alert-100"
                                      : "bg-bee-alert-700"
                              }`}
                           ></h1>
                        </div>
                        <div className="flex flex-col gap-1">
                           <h2 className="text-lg font-semibold">
                              {car.plate}
                           </h2>
                           <p className="text-sm text-gray-600 dark:text-gray-400">
                              {car.brand} {car.model}
                           </p>
                           <p className="text-sm font-medium text-bee-primary-500">
                              {car.odometer}km
                           </p>
                        </div>
                     </Link>
                  ))}
               </>
            )}
         </div>
      </>
   );
}
