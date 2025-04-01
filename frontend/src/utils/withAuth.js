import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import useAuth from "@/hooks/useAuth";

export default function withAuth(Component) {
   return function ProtectedRoute(props) {
      const { gestor, carregando } = useAuth();
      const router = useRouter();
      const [isClient, setIsClient] = useState(false);

      useEffect(() => {
         setIsClient(true);
      }, []);

      useEffect(() => {
         if (!carregando && isClient && !gestor) {
            router.push("/login");
         }
      }, [gestor, carregando, isClient, router]);

      if (!isClient || carregando) {
         return <p>Carregando</p>;
      }

      return <Component {...props} />;
   };
}
