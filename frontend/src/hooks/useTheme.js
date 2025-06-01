"use client";
import { useState, useEffect, useCallback } from "react";

export default function useTheme() {
   const [theme, setTheme] = useState(() => {
      if (typeof window !== "undefined") {
         const savedTheme = localStorage.getItem("theme");
         return savedTheme || "system";
      }
      return "system";
   });

   const getSystemTheme = useCallback(() => {
      return window.matchMedia("(prefers-color-scheme: dark)").matches
         ? "dark"
         : "light";
   }, []);

   const updateThemeClass = useCallback(
      (newTheme) => {
         const isDark =
            newTheme === "dark" ||
            (newTheme === "system" && getSystemTheme() === "dark");
         if (isDark) {
            document.documentElement.classList.add("dark");
         } else {
            document.documentElement.classList.remove("dark");
         }
      },
      [getSystemTheme]
   );

   useEffect(() => {
      updateThemeClass(theme);

      const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)");
      const handleChange = () => {
         if (theme === "system") {
            updateThemeClass("system");
         }
      };

      mediaQuery.addEventListener("change", handleChange);
      return () => mediaQuery.removeEventListener("change", handleChange);
   }, [theme, updateThemeClass]);

   const toggleTheme = () => {
      const themeOrder = ["light", "dark", "system"];
      const currentIndex = themeOrder.indexOf(theme);
      const newTheme = themeOrder[(currentIndex + 1) % themeOrder.length];

      setTheme(newTheme);
      if (newTheme === "system") {
         localStorage.removeItem("theme");
      } else {
         localStorage.setItem("theme", newTheme);
      }
      updateThemeClass(newTheme);
   };

   return {
      theme,
      toggleTheme,
      isSystemDark: getSystemTheme() === "dark",
   };
}
