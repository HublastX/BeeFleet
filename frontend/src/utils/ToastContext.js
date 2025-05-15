"use client";

import { createContext, useContext, useState, useCallback } from "react";
import Toast from "@/elements/Toast";
import { v4 as uuidv4 } from "uuid";

const ToastContext = createContext();

export function ToastProvider({ children }) {
   const [toasts, setToasts] = useState([]);

   const showToast = useCallback(
      (message, type = "success", description = "", duration = null) => {
         const id = uuidv4();
         const newToast = { id, message, type, description };

         setToasts((prev) => [...prev, newToast]);

         if (duration) {
            setTimeout(() => {
               setToasts((prev) => prev.filter((t) => t.id !== id));
            }, duration);
         }
      },
      []
   );

   const handleClose = (id) => {
      setToasts((prev) => prev.filter((t) => t.id !== id));
   };

   return (
      <ToastContext.Provider value={{ showToast }}>
         {children}
         {toasts.length > 0 && (
            <div className="fixed top-4 right-4 z-50 flex flex-col space-y-2">
               {toasts.map((toast) => (
                  <Toast
                     key={toast.id}
                     message={toast.message}
                     type={toast.type}
                     description={toast.description}
                     onClose={() => handleClose(toast.id)}
                  />
               ))}
            </div>
         )}
      </ToastContext.Provider>
   );
}

export const useToast = () => useContext(ToastContext);
