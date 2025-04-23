import { useEffect, useState } from "react";

export default function Toast({
   message,
   description,
   type = "success",
   autoClose = true,
   timeout = 3000,
}) {
   const [visible, setVisible] = useState(false);

   const borderColors = {
      success: "border-[#512DA8]",
      error: "border-[#512DA8]",
      warning: "border-[#512DA8]",
   };

   useEffect(() => {
      const handleClick = (e) => {
         const isLogin = e.target.closest("#login-btn");
         const isRegister = e.target.closest("#register-btn");

         if (!isLogin && !isRegister) {
            setVisible(true);
         }
      };

      document.addEventListener("click", handleClick);
      return () => document.removeEventListener("click", handleClick);
   }, []);

   useEffect(() => {
      if (visible && autoClose) {
         const timer = setTimeout(() => {
            setVisible(false);
         }, timeout);
         return () => clearTimeout(timer);
      }
   }, [visible, autoClose, timeout]);

   if (!visible) return null;

   return (
      <div className="fixed top-5 right-5 z-50">
         <div
            className={`px-4 py-3 rounded-md bg-white border ${borderColors[type]} text-black shadow-lg transition-all duration-300`}
         >
            <div className="flex items-start justify-between gap-3">
               <div className="flex flex-col">
                  <span className="font-semibold text-sm">{message}</span>
                  {description && (
                     <span className="text-xs text-gray-600">{description}</span>
                  )}
               </div>
               <button
                  onClick={() => setVisible(false)}
                  className="text-lg font-bold ml-2 leading-none"
               >
                  ×
               </button>
            </div>
         </div>
      </div>
   );
}
