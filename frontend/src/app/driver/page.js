// PAGINA DE TESTE
"use client";
import useDrivers from "../../hooks/useDrivers";
import withAuth from "@/utils/withAuth";

function DriversPage() {
   const { motoristas, carregando, erro } = useDrivers();

   if (carregando) return <p>Carregando motoristas...</p>;
   if (erro) return <p>Erro: {erro}</p>;

   return (
      <div>
         <h1>Lista de Motoristas</h1>
         <ul>
            {motoristas.map((motorista) => (
               <li key={motorista.id}>
                  {motorista.name} - {motorista.email}
               </li>
            ))}
         </ul>
      </div>
   );
}
export default withAuth(DriversPage);
