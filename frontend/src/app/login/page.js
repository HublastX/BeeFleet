"use client";
import Btn from "../../elements/btn";
import Icon from "../../elements/Icon";
import InputText from "../../elements/inputText";
import Link from "next/link";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import useAuth from "@/hooks/useAuth";

function Login() {
   const [show, setShow] = useState(false);
   const { login, carregando, erro } = useAuth();
   const [email, setEmail] = useState("");
   const [password, setPassword] = useState("");
   const [erroLogin, setErroLogin] = useState(null);
   const router = useRouter();

   useEffect(() => {
      setTimeout(() => setShow(true), 10);
   }, []);

   useEffect(() => {
      const handleKeyDown = (e) => {
         if (e.key === "Escape") {
            setShow(false);
            router.push("/");
         }
      };
      window.addEventListener("keydown", handleKeyDown);
      return () => window.removeEventListener("keydown", handleKeyDown);
   }, [router]);

   const handleSubmit = async (e) => {
      e.preventDefault();
      setErroLogin(null);
      await login(email, password);
   };

   return (
      <div className="fixed top-0 left-0 right-0 bottom-0 flex items-center justify-center z-50 backdrop-blur-sm p-4">
         <div
            className={`relative bg-bee-dark-100 rounded-lg shadow-sm dark:bg-bee-dark-400 text-bee-dark-600 dark:text-white p-6 w-full max-w-md transform transition-all duration-300 ease-out ${
               show ? "opacity-100 scale-100" : "opacity-0 scale-95"
            }`}
         >
            {/* Header */}
            <div className="flex items-center justify-between border-b pb-3">
               <h3 className="text-xl font-semibold">Login</h3>
               <button
                  onClick={() => {
                     setShow(false);
                     router.push("/");
                  }}
                  className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white"
               >
                  <Icon name="xMark" />
               </button>
            </div>

            {erro && (
               <div className="flex items-start gap-2 p-2 mt-2 text-sm text-center text-red-600 bg-red-50 rounded-lg dark:bg-red-900/30 dark:text-red-400">
                  <Icon name="gestor" className="size-6 mt-0.5 flex-shrink-0" />
                  <span className="h-full self-center text-center">{erro}</span>
               </div>
            )}
            <div className="mt-4 max-h-[60vh] overflow-y-auto pr-2">
               <form
                  className="space-y-4 text-sm font-medium"
                  onSubmit={handleSubmit}
               >
                  <div>
                     <label htmlFor="email" className="block mb-2">
                        Email
                     </label>
                     <InputText
                        variant="withIcon"
                        icon="email"
                        type="email"
                        name="email"
                        id="email"
                        placeholder="Ex: exemplo@email.com"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        autoComplete="off"
                        required
                     />
                  </div>
                  <div>
                     <label htmlFor="password" className="block mb-2">
                        Senha
                     </label>
                     <InputText
                        variant="withIcon"
                        icon="key"
                        type="password"
                        name="password"
                        id="password"
                        placeholder="********"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        autoComplete="current-password"
                        required
                     />
                  </div>
               </form>
            </div>

            <div className="mt-4">
               <Btn
                  variant="primary"
                  type="submit"
                  disabled={carregando}
                  className="w-full text-lg"
                  onClick={handleSubmit}
               >
                  {carregando ? (
                     <div className="flex items-center justify-center gap-2 min-w-34">
                        <Icon name="circle" className="size-5 text-white" />
                     </div>
                  ) : (
                     "Entrar"
                  )}
               </Btn>
               <div className="mt-3 text-center">
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                     Não tem uma conta?{" "}
                     <Link
                        href="/register"
                        className="text-blue-600 hover:underline dark:text-blue-400"
                     >
                        Registre-se
                     </Link>
                  </p>
               </div>
            </div>
         </div>
      </div>
   );
}

export default Login;
