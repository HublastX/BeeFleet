import { useState } from "react";

const LoginOverlay = () => {
  const [isVisible, setIsVisible] = useState(true);

  const handleLogin = () => {
    setIsVisible(false);
  };

  if (!isVisible) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-white">
      <div className="text-center">
        <p className="text-lg font-semibold">⚠️ Acesso Restrito</p>
         <p>  Para acessar faça o login!</p>
        <button
          onClick={handleLogin}
          className="mt-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-700 transition"
        >
          Fazer Login
        </button>
      </div>
    </div>
  );
};  

export default LoginOverlay;
