"use client";
import Btn from "../../elements/btn";
import Icon from "../../elements/Icon";
import InputText from "../../elements/inputText";
import Link from "next/link";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

function Login() {
   const [show, setShow] = useState(false);
   const [email, setEmail] = useState("");
   const [password, setPassword] = useState("");
   const [erro, setErro] = useState(null);
   const [carregando, setCarregando] = useState(false);
   const router = useRouter();

   useEffect(() => {
      if (localStorage.getItem("token")) {
         router.push("/").then(() => {
            window.location.reload();
         });
      }

      setTimeout(() => setShow(true), 10);
   }, [router]);

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
      setCarregando(true);
      setErro(null);

      try {
         const res = await fetch(
            `${process.env.NEXT_PUBLIC_API_URL}/api/managers/login`,
            {
               method: "POST",
               headers: {
                  "Content-Type": "application/json",
               },
               body: JSON.stringify({ email, password }),
            }
         );

         if (!res.ok) {
            throw new Error("Credenciais inválidas ou erro no servidor.");
         }

         const data = await res.json();

         if (data.token) {
            localStorage.setItem("token", data.token);
            localStorage.setItem("name", data.manager.name);
            localStorage.setItem("email", data.manager.email);

            router.push("/").then(() => {
               window.location.reload();
            });
         } else {
            setErro(data?.error || "Credenciais inválidas.");
         }
      } catch (error) {
         setErro(error.message || "Erro ao fazer login. Tente novamente.");
      } finally {
         setCarregando(false);
      }
   };

   return (
      <div className="fixed top-0 left-0 right-0 bottom-0 flex items-center justify-center z-50 backdrop-blur-sm">
         <div
            className={`relative bg-bee-dark-100 rounded-lg shadow-sm dark:bg-bee-dark-400 text-bee-dark-600 dark:text-white p-6 w-96 transform transition-all duration-300 ease-out
               ${show ? "opacity-100 scale-100" : "opacity-0 scale-95"}`}
         >
            {/* header */}
            <div className="flex items-center justify-between border-b pb-3">
               <h3 className="text-xl font-semibold">Login</h3>
               <Link href="/">
                  <button className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white">
                     <Icon name="xMark" />
                  </button>
               </Link>
            </div>

            {/* formulário */}
            {erro && <p className="text-red-500 mt-3">{erro}</p>}
            <div className="mt-5">
               <form
                  className={`space-y-4 text-sm font-medium ${carregando && "opacity-50 pointer-events-none"}`}
                  onSubmit={handleSubmit}
               >
                  <div>
                     <label htmlFor="email" className="block mb-2">
                        Email
                     </label>
                     <InputText
                        variant="withIcon"
                        icon="email"
                        value={email}
                        type="email"
                        name="email"
                        id="email"
                        placeholder="Ex: exemploemail@email.com"
                        autoComplete="off"
                        onChange={(e) => setEmail(e.target.value)}
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
                        value={password}
                        type="password"
                        name="password"
                        id="password"
                        placeholder="********"
                        autoComplete="new-password"
                        onChange={(e) => setPassword(e.target.value)}
                        required
                     />
                  </div>
                  <Btn
                     type="submit"
                     disabled={carregando}
                     variant="primary"
                     className="mt-5 w-full text-lg"
                  >
                     {carregando ? "Carregando..." : "Entrar"}
                  </Btn>
               </form>
               <div className="mt-4 text-center">
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
