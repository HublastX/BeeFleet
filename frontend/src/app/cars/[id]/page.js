"use client";
import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import withAuth from "@/utils/withAuth";
import useCar from "@/hooks/useCar";

function CarPage() {
   const { id } = useParams();
   const { getCar, carregando, erro } = useCar();
   const [carroData, setCarroData] = useState(null);

   useEffect(() => {
      console.log("ID do carro:", id);
      if (!id || carroData) return;

      async function fetchCar() {
         console.log("Buscando carro com ID:", id);
         try {
            const data = await getCar(id);
            console.log("Carro encontrado:", data);
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
            <>
               <h1>{carroData.model}</h1>
               <p>Placa: {carroData.plate}</p>
               <p>Ano: {carroData.year}</p>
               <p>Cor: {carroData.color}</p>
            </>
         )}
      </div>
   );
}
export default withAuth(CarPage);
