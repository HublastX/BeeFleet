"use client";
import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import withAuth from "@/utils/withAuth";
import useDrivers from "@/hooks/useDrivers";
import Link from "next/link";

function DiverPage() {
   const { id } = useParams();
   const { getDriver, carregando, erro } = useDrivers();
   const [motoristaData, setMotoristaData] = useState(null);

   useEffect(() => {
      if (!id || motoristaData) return;

      async function fetchDriver() {
         try {
            const data = await getDriver(id);
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
         {!carregando && !erro && !motoristaData && (
            <p>Nenhum motorista encontrado.</p>
         )}
         {motoristaData && (
            <>
               <h1>{motoristaData.name}</h1>
               <p>telefone: {motoristaData.phone}</p>
               <Link
                  href={`/drivers/${id}/edit`}
                  className="inline-block text-bee-yellow-500 hover:text-bee-yellow-700"
               >
                  editar motorista
               </Link>
            </>
         )}
      </div>
   );
}
export default withAuth(DiverPage);
