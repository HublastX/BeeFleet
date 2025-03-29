"use client";
import Btn from "../../elements/btn";
import Icon from "../../elements/Icon";
import InputText from "../../elements/inputText";
import Link from "next/link";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

function Register() {
   const [show, setShow] = useState(false);
   const [name, setName] = useState("");
   const [email, setEmail] = useState("");
   const [password, setPassword] = useState("");
   const [confirmPassword, setConfirmPassword] = useState("");
   const [erro, setErro] = useState(null);
   const [carregando, setCarregando] = useState(false);
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
      setCarregando(true);
      setErro(null);

      if (password !== confirmPassword) {
         setErro("As senhas não coincidem.");
         setCarregando(false);
         return;
      }

      try {
         const res = await fetch(
            `${process.env.NEXT_PUBLIC_API_URL}/api/managers/create`,
            {
               method: "POST",
               headers: {
                  "Content-Type": "application/json",
               },
               body: JSON.stringify({ name, email, password }),
            }
         );

         const data = await res.json();

         if (res.ok) {
            router.push("/login");
         } else {
            setErro(data.error || "Erro ao registrar. Tente novamente.");
         }
      } catch (error) {
         setErro("Erro ao conectar ao servidor. Tente novamente.");
      } finally {
         setCarregando(false);
      }
   };

   return (
      <div className="fixed top-0 left-0 right-0 bottom-0 flex items-center justify-center z-50 backdrop-blur-sm">
         <div
            className={`relative bg-bee-dark-100 rounded-lg shadow-sm dark:bg-bee-dark-400 text-bee-dark-600 dark:text-white p-6 w-96 transform transition-all duration-300 ease-out
               ${show ? "opacity-100 scale-100" : "opacity-0 scale-95"}
            `}
         >
            {/* header */}
            <div className="flex items-center justify-between border-b pb-3">
               <h3 className="text-xl font-semibold">Registro</h3>
               <Link href="/">
                  <button className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white">
                     <Icon name="xMark" />
                  </button>
               </Link>
            </div>

            {/* formulário */}
            {erro && <p style={{ color: "red" }}>{erro}</p>}
            <div className="mt-5">
               <form
                  className="space-y-4 text-sm font-medium"
                  onSubmit={handleSubmit}
               >
                  <div>
                     <label htmlFor="name" className="block mb-2">
                        Nome
                     </label>
                     <InputText
                        variant="withIcon"
                        icon="user"
                        type="text"
                        name="name"
                        id="name"
                        placeholder="Ex: Carlos Silva"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        autoComplete="off"
                        required
                     />
                  </div>
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
                        placeholder="Ex: exemploemail@email.com"
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
                        autoComplete="new-password"
                        required
                     />
                  </div>
                  <div>
                     <label htmlFor="confirm-password" className="block mb-2">
                        Confirmar Senha
                     </label>
                     <InputText
                        variant="withIcon"
                        icon="key"
                        type="password"
                        name="confirm-password"
                        id="confirm-password"
                        placeholder="********"
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                        autoComplete="new-password"
                        required
                     />
                  </div>
                  <Btn
                     variant="primary"
                     type="submit"
                     disabled={carregando}
                     className="mt-5 w-full text-lg"
                  >
                     {carregando ? "Registrando..." : "Registrar"}
                  </Btn>
               </form>
               <div className="mt-4 text-center">
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                     Já tem uma conta?{" "}
                     <Link
                        href="/login"
                        className="text-blue-600 hover:underline dark:text-blue-400"
                     >
                        Entrar
                     </Link>
                  </p>
               </div>
            </div>
         </div>
      </div>
   );
}

export default Register;
