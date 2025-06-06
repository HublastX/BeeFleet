import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import useAuth from "@/hooks/useAuth";

export default function withAuth(Component) {
   return function ProtectedRoute(props) {
      const { gestor, carregando } = useAuth();
      const router = useRouter();
      const [isClient, setIsClient] = useState(false);
      const [showPage, setShowPage] = useState(false);

      useEffect(() => {
         setIsClient(true);
      }, []);

      useEffect(() => {
         if (!carregando && isClient) {
            if (!gestor) {
               router.push("/login");
            } else {
               const timeout = setTimeout(() => {
                  setShowPage(true);
               }, 10);

               return () => clearTimeout(timeout);
            }
         }
      }, [gestor, carregando, isClient, router]);

      if (!isClient || carregando || !showPage) {
         return (
            <div className="mt-[-50px] flex items-center justify-center h-screen">
               <div
                  className="inline-block h-15 w-15 animate-spin rounded-full border-4 border-solid border-current border-e-transparent align-[-0.125em] text-surface motion-reduce:animate-[spin_1.5s_linear_infinite] dark:text-white"
                  role="status"
               >
                  <span className="!absolute !-m-px !h-px !w-px !overflow-hidden !whitespace-nowrap !border-0 !p-0 ![clip:rect(0,0,0,0)]">
                     Loading...
                  </span>
               </div>
            </div>
         );
      }
      

      return <Component {...props} />;
   };
}
