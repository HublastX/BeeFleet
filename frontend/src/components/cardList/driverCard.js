import useDrivers from "@/hooks/useDrivers";
import Image from "next/image";
import Link from "next/link";
import Icon from "@/elements/Icon";
import CardSkeleton from "@/elements/ui/skeleton/CardSkeleton";

export default function CarCard({ searchTerm }) {
   const { motoristas, erro, carregando } = useDrivers();
   const motoristassFiltrados = motoristas.filter((motoristas) => {
      if (!searchTerm) return true;
      const termo = searchTerm.toLowerCase();
      return (
         motoristas.model.toLowerCase().includes(termo) ||
         motoristas.plate.toLowerCase().includes(termo)
      );
   });


   if (carregando) return <CardSkeleton />;
   return (
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 p-4">
         {motoristassFiltrados.map((driver) => (
            <Link
               href={`drivers/${driver.id}`}
               key={driver.id}
               className="relative bg-bee-dark-100 dark:bg-bee-dark-800 p-4 rounded-2xl shadow hover:shadow-xl transition duration-300 flex flex-col gap-4"
            >
               <div className="relative w-full h-40 rounded-lg overflow-hidden">
                  {driver.image ? (
                     <Image
                        src={driver.image}
                        alt={`Imagem do motoristas ${car.model}`}
                        layout="fill"
                        objectFit="cover"
                        className="rounded-lg"
                     />
                  ) : (
                     <div className="w-full h-full bg-bee-purple-300 text-bee-alert-500 text-center flex justify-center">
                        <Icon name="car" />
                     </div>
                  )}

                  <h1 className="absolute top-1 right-1 w-5 h-5 rounded-full border-2 border-white dark:border-gray-800 bg-bee-alert-100"></h1>
               </div>
               <div className="flex flex-col gap-1">
                  <h2 className="text-lg font-semibold">{driver.name}</h2>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                     {driver.phone}
                  </p>
                  <p className="text-sm font-medium text-bee-primary-500">
                     {driver.license}
                  </p>
               </div>
            </Link>
         ))}
      </div>
   );
}
