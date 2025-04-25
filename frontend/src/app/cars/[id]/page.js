"use client";
import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import withAuth from "@/utils/withAuth";
import useCar from "@/hooks/useCar";
import Icon from "@/elements/Icon";
import Badge from "@/elements/ui/badge/Badge";
import Image from "next/image";

function CarPage() {
   const { id } = useParams();
   const { getCar, carregando, erro } = useCar();
   const [carroData, setCarroData] = useState(null);

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

   return (
      <div>
         {carregando && <p>Carregando...</p>}
         {erro && <p>Erro: {erro}</p>}
         {!carregando && !erro && !carroData && <p>Nenhum carro encontrado.</p>}
         {carroData && (
            <div className="flex flex-col md:flex-row gap-4">
               {/* card 1 com foto e placa */}
               <div className="flex flex-col px-4 py-5 items-center  gap-4 w-1/3 bg-bee-dark-100 dark:bg-bee-dark-800 rounded-md border border-bee-dark-300 dark:border-bee-dark-400">
                  <div className="relative w-full h-40 rounded-md overflow-hidden">
                     {carroData.image ? (
                        <Image
                           src={carroData.image}
                           alt={`Imagem do carro ${carroData.model}`}
                           layout="fill"
                           objectFit="cover"
                           className="rounded"
                        />
                     ) : (
                     <Icon name="car" className="w-full h-full bg-bee-purple-300 text-bee-alert-500" />
                     )}
                  </div>
                  <div className="bg-gray-100 w-full p-4 rounded-md shadow-sm border-t-8 border-blue-700">
                     <p className="text-center text-bee-dark-600 font-extrabold text-3xl">
                        {carroData.plate}
                     </p>
                  </div>
               </div>
               {/* card 2 com dados do carro */}
               <div className="flex flex-col px-4 py-5 gap-3 w-2/3 bg-bee-dark-100 dark:bg-bee-dark-800 rounded-md border border-bee-dark-300 dark:border-bee-dark-400">
                  <h1 className="text-3xl font-extrabold text-gray-800 dark:text-white/90">
                     {carroData.model}
                  </h1>
                  <div className="flex row gap-2">
                     <p className="text-bee-dak-600 dark:text-bee-alert-500">
                        <span className="font-black">Ano:</span>{" "}
                        {carroData.year}
                     </p>
                     <p className="text-bee-dak-600 dark:text-bee-alert-500">
                        <span className="font-black">Cor:</span>{" "}
                        {carroData.color}
                     </p>
                     <p className="text-bee-dak-600 dark:text-bee-alert-500">
                        <span className="font-black">Quilometragem:</span>{" "}
                        {carroData.odometer}km
                     </p>
                  </div>

                  <p className="text-bee-dak-600 dark:text-bee-alert-500">
                     Status:{" "}
                     <Badge
                        size="sm"
                        color={
                           carroData.status === "AVAILABLE"
                              ? "success"
                              : "error"
                        }
                     >
                        {carroData.status === "AVAILABLE"
                           ? "Disponível"
                           : "Indisponível"}
                     </Badge>
                  </p>
               </div>
            </div>
         )}
      </div>
   );
}
export default withAuth(CarPage);
