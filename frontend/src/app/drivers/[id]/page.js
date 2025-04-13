"use client";
import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import withAuth from "@/utils/withAuth";
import useDrivers from "@/hooks/useDrivers";

function DiverPage() {
   const { id } = useParams();
   const { getDriver, carregando, erro } = useDrivers();
   const [motoristaData, setMotoristaData] = useState(null);

   useEffect(() => {
      console.log("ID do motorista:", id);
      if (!id || motoristaData) return;

      async function fetchDriver() {
         console.log("Buscando motorista com ID:", id);
         try {
            const data = await getDriver(id);
            console.log("Motorista encontrado:", data);
            setMotoristaData(data);
         } catch (error) {
            console.error("Erro ao buscar motorista:", error);
         }
      }

      fetchDriver();
   }, [id, getDriver, motoristaData]);

   return (
      <div>
         {carregando && <p>Carregando...</p>}
         {erro && <p>Erro: {erro}</p>}
         {!carregando && !erro && !motoristaData && <p>Nenhum motorista encontrado.</p>}
         {motoristaData && (
            <>
               <h1>{motoristaData.name}</h1>
               <p>telefone: {motoristaData.phone}</p>
            </>
         )}
      </div>
   );
}
export default withAuth(DiverPage);
