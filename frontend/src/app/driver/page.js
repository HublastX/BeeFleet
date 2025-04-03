"use client";
import withAuth from "@/utils/withAuth";
import useDrivers from "@/hooks/useDrivers";

function DriversPage() {
   const { motoristas, carregando, erro } = useDrivers();

   return (
      <div>
         <h1>Lista de Motoristas</h1>

         {carregando && <p>Carregando motoristas...</p>}
         {erro && <p style={{ color: "red" }}>Erro: {erro}</p>}

         {!carregando && !erro && (
            <ul>
               {motoristas.length > 0 ? (
                  motoristas.map((motorista) => (
                     <li key={motorista.id}>
                        {motorista.name} - {motorista.phone}
                     </li>
                  ))
               ) : (
                  <p>Nenhum motorista encontrado.</p>
               )}
            </ul>
         )}
      </div>
   );
}

export default withAuth(DriversPage);
