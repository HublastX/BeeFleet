"use client";
import Btn from "../../elements/btn";
import Icon from "../../elements/Icon";
import InputText from "../../elements/inputText";
import Link from "next/link";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import useAuth from "@/hooks/useAuth";

function Register() {
   const [show, setShow] = useState(false);
   const { register, carregando, erro } = useAuth();
   const [name, setName] = useState("");
   const [email, setEmail] = useState("");
   const [password, setPassword] = useState("");
   const [confirmPassword, setConfirmPassword] = useState("");
   const [profileImage, setProfileImage] = useState("");
   const [errors, setErrors] = useState({});
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
      setErrors({});
      const newErrors = {};

      if (name.trim().split(" ").length < 2) {
         newErrors.name = "O nome deve conter pelo menos duas palavras.";
      }

      if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
         newErrors.email = "Email inválido.";
      }

      if (password.length < 8) {
         newErrors.password = "A senha deve conter no mínimo 8 caracteres.";
      }

      if (password !== confirmPassword) {
         newErrors.confirmPassword = "As senhas não coincidem.";
      }

      setErrors(newErrors);

      if (Object.keys(newErrors).length > 0) return;

      await register(name, email, password);
   };

   return (
      <div className="fixed top-0 left-0 right-0 bottom-0 flex items-center justify-center z-50 backdrop-blur-sm">
         <div
            className={`relative bg-bee-dark-100 rounded-lg shadow-sm dark:bg-bee-dark-400 text-bee-dark-600 dark:text-white p-8 w-96 md:w-[36rem] lg:w-[38rem] transform transition-all duration-300 ease-out ${
               show ? "opacity-100 scale-100" : "opacity-0 scale-95"
            }`}
         >
            {/* header */}
            <div className="flex items-center justify-between border-b pb-3">
               <h3 className="text-xl font-semibold">Registro</h3>
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

            {erro && <p className="text-sm text-red-500 mt-2">{erro}</p>}

            {/* formulário */}
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
                        className={errors.name ? "border-red-500 dark:border-red-500" : ""}
                        required
                     />
                     {errors.name && (
                        <p className="text-sm text-red-500 mt-1">
                           {errors.name}
                        </p>
                     )}
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
                        placeholder="Ex: exemplo@email.com"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        autoComplete="off"
                        className={errors.email ? "border-red-500 dark:border-red-500" : ""}
                        required
                     />
                     {errors.email && (
                        <p className="text-sm text-red-500 mt-1">
                           {errors.email}
                        </p>
                     )}
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
                        className={errors.password ? "border-red-500 dark:border-red-500" : ""}
                        required
                     />
                     {errors.password && (
                        <p className="text-sm text-red-500 mt-1">
                           {errors.password}
                        </p>
                     )}
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
                        className={
                           errors.confirmPassword ? "border-red-500 dark:border-red-500" : ""
                        }
                        required
                     />
                     {errors.confirmPassword && (
                        <p className="text-sm text-red-500 mt-1">
                           {errors.confirmPassword}
                        </p>
                     )}
                  </div>
                  <div>
                     <label htmlFor="profile-image" className="block mb-2">
                        Foto de Perfil
                     </label>
                     <InputText
                        variant="withIcon"
                        icon="camera"
                        type="file"
                        name="profile-image"
                        id="profile-image"
                        accept="image/*"
                        onChange={(e) => setProfileImage(e.target.files[0])}
                        className="file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm  file:text-bee-dark-600 dark:file:text-white "
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
