"use client";
import withAuth from "@/utils/withAuth";
import Link from "next/link";
import Btn from "@/elements/btn";
import useCar from "@/hooks/useCar";
function Cars() {
   const { carro, carregando, erro } = useCar();
   return (
      <div>
         <div className="p-2 mb-3">
            <Link href="/cars/create">
               <Btn
                  variant="primary"
                  texto="Adicionar Carro"
                  className="flex flex-row-reverse text-center font-bold text-lg gap-3"
               />
            </Link>
         </div>
         {/* teste pra ve se a rota esta funcionando */}
         {carro.map((car) => (
            <div
               key={car.id}
               className="bg-gray-800 text-white p-4 rounded-lg mb-4 shadow-md"
            >
               <h2 className="text-xl font-bold">{car.model}</h2>
               <p>Placa: {car.plate}</p>
               <p>Ano: {car.year}</p>
               <p>Cor: {car.color}</p>
            </div>
         ))}
      </div>
   );
}
export default withAuth(Cars);
