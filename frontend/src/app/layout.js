"use client";
import { Karla } from "next/font/google";
import "./globals.css";
import { useNavBar } from "@/context/navBarContext";
import { NavBarProvider } from "@/context/navBarContext";
import { metadata } from "./metadata";

// componentes
import Header from "../components/Header";
import NavBar from "../components/NavBar";

const karla = Karla({
   variable: "--font-karla",
   subsets: ["latin"],
   weight: ["200", "300", "400", "500", "600", "700", "800",],
});

export default function RootLayout({ children }) {
   return (
      <NavBarProvider>
         <html lang="pt-br">
            <head>
                <title>{metadata.title}</title>
                <meta name="description" content={metadata.description} />
               <meta name="apple-mobile-web-app-title" content="BeeFleet" />
            </head>
            <body
               className={`${karla.variable} antialiased flex row justify-between`}
            >
               <div className="min-h-screen xl:flex">
                  <NavBar />
               </div>

               <MainContent>{children}</MainContent>
            </body>
         </html>
      </NavBarProvider>
   );
}

function MainContent({ children }) {
   const { isExpanded, isHovered, isMobileOpen } = useNavBar();
   const mainContentMargin = isMobileOpen
      ? "ml-0"
      : isExpanded || isHovered
        ? "lg:ml-[290px]"
        : "lg:ml-[90px]";

   return (
      <div
         className={`flex-1 transition-all  duration-300 ease-in-out ${mainContentMargin}`}
      >
         <Header />
         <div className="p-4 mx-auto max-w-(--breakpoint-2xl) md:p-6">
            {children}
         </div>
      </div>
   );
}
