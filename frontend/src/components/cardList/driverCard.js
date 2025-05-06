import useDrivers from "@/hooks/useDrivers";
import Image from "next/image";
import Link from "next/link";
import Icon from "@/elements/Icon";
import CardSkeleton from "@/elements/ui/skeleton/CardSkeleton";

function formatarTelefone(telefone) {
   if (!telefone) return "";
   const numeros = telefone.replace(/\D/g, "");
   if (numeros.length === 11) {
      return `(${numeros.slice(0, 2)}) ${numeros.slice(2, 7)}-${numeros.slice(7)}`;
   }
   if (numeros.length === 10) {
      return `(${numeros.slice(0, 2)}) ${numeros.slice(2, 6)}-${numeros.slice(6)}`;
   }

   return telefone;
}

export default function DriverCard({ searchTerm }) {
   const { motoristas, erro, carregando } = useDrivers();
   const motoristasFiltrados = motoristas.filter((motoristas) => {
      if (!searchTerm) return true;
      const termo = searchTerm.toLowerCase();
      return (
         motoristas.name.toLowerCase().includes(termo) ||
         motoristas.phone.toLowerCase().includes(termo) ||
         motoristas.license.toLowerCase().includes(termo)
      );
   });

   if (carregando) return <CardSkeleton />;
   if (erro)
      return (
         <div>
            <div className="p-6 text-center font-semibold text-xl">
               <p className="text-bee-alert-300">
                  Ocorreu um problema ao carregar os motoristas. <br />
                  <span className="text-sm">Detalhes: {erro}</span>
               </p>
            </div>
            <CardSkeleton />
         </div>
      );

   return (
      <>
         {motoristasFiltrados.length === 0 && !erro && !carregando && (
            <div className="flex items-center justify-center p-6 w-full h-full">
               <div className="text-center font-semibold text-xl">
                  Nenhum motorista foi encontrado
               </div>
            </div>
         )}
         <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6 p-4">
         {!carregando && !erro && (
               <>
                  {motoristasFiltrados.map((driver) => (
                     <Link
                        href={`drivers/${driver.id}`}
                        key={driver.id}
                        className="relative bg-bee-dark-100 dark:bg-bee-dark-800 p-4 rounded-2xl shadow hover:shadow-xl transition duration-300 flex flex-col gap-4"
                     >
                        <div className="relative w-full h-40 rounded-lg overflow-hidden">
                           {driver.image ? (
                              <Image
                                 src={driver.image}
                                 alt={`Imagem do motorista ${driver.name}`}
                                 layout="fill"
                                 objectFit="cover"
                                 className="rounded-lg"
                              />
                           ) : (
                              <div className="w-full h-full bg-bee-purple-300 text-bee-alert-500 text-center flex justify-center">
                                 <Icon name="user" />
                              </div>
                           )}

                           <h1 className="absolute top-1 right-1 w-5 h-5 rounded-full border-2 border-white dark:border-gray-800 bg-bee-alert-100"></h1>
                        </div>
                        <div className="flex flex-col gap-1">
                           <h2 className="text-lg font-semibold">
                              {driver.name}
                           </h2>
                           <p className="text-sm text-gray-600 dark:text-gray-400">
                              {formatarTelefone(driver.phone)}
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
