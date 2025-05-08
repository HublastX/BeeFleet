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
      <div className="fixed top-0 left-0 right-0 bottom-0 flex items-center justify-center z-50 backdrop-blur-sm">
         <div
            className={`relative bg-bee-dark-100 rounded-lg shadow-sm dark:bg-bee-dark-400 text-bee-dark-600 dark:text-white p-8 w-96 md:w-[36rem] lg:w-[38rem] transform transition-all duration-300 ease-out ${show ? "opacity-100 scale-100" : "opacity-0 scale-95"}`}
         >
            {/* Header */}
            <div className="flex items-center justify-between border-b pb-4">
               <h3 className="text-2xl font-semibold">Login</h3>
               <Link href="/">
                  <button className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white">
                     <Icon name="xMark" />
                  </button>
               </Link>
            </div>

            {/* Formulário */}
            {/* {erroLogin && <p style={{ color: "red" }}>{erroLogin}</p>}
            {erro && <p style={{ color: "red" }}>{erro}</p>} */}
            <div className="mt-6">
               <form
                  className="space-y-6 text-base font-medium"
                  onSubmit={handleSubmit}
               >
                  <div>
                     <label htmlFor="email" className="block mb-2 text-lg">
                        Email
                     </label>
                     <InputText
                        variant="withIcon"
                        icon="email"
                        type="email"
                        name="email"
                        id="email"
                        placeholder="Ex: exemploemail@email.com"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        autoComplete="off"
                        required
                        className="h-12 text-lg"
                     />
                  </div>
                  <div>
                     <label htmlFor="password" className="block mb-2 text-lg">
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
                        className="h-12 text-lg"
                     />
                  </div>
                  <Btn
                     variant="primary"
                     type="submit"
                     disabled={carregando}
                     className="mt-5 w-full text-xl h-12"
                  >
                     {carregando ? "Entrando..." : "Entrar"}
                  </Btn>
               </form>
               <div className="mt-6 text-center">
                  <p className="text-base text-gray-500 dark:text-gray-400">
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
