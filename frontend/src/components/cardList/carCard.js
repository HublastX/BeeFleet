import useCar from "@/hooks/useCar";
import Image from "next/image";
import Link from "next/link";
import Icon from "@/elements/Icon";
export default function CarCard() {
   const { carro, erro, carregando } = useCar();

   if (carregando) return <p className="p-4">Carregando...</p>;
   if (erro)
      return <p className="p-4 text-red-500">Erro ao carregar os carros</p>;

   return (
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 p-4">
         {carro.map((car) => (
            <Link
               href={`cars/${car.id}`}
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
                        className="rounded-lg"
                     />
                  ) : (
                     <Icon name="car" className="w-full h-full bg-bee-purple-300 text-bee-alert-500" />
                  )}

                  <h1 className="absolute top-1 right-1 w-5 h-5 rounded-full border-2 border-white dark:border-gray-800 bg-bee-alert-100"></h1>
               </div>
               <div className="flex flex-col gap-1">
                  <h2 className="text-lg font-semibold">{car.plate}</h2>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                     {car.model}
                  </p>
                  <p className="text-sm font-medium text-bee-primary-500">
                     {car.odometer}km
                  </p>
               </div>
            </Link>
         ))}
      </div>
   );
}
