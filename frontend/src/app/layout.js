"use client";
import { Karla } from "next/font/google";
import "./globals.css";
import { useNavBar } from "@/components/navbar/navBarContext";
import { NavBarProvider } from "@/components/navbar/navBarContext";
import { metadata } from "./metadata";
import { ToastProvider } from "@/utils/ToastContext";
import GTM from "@/utils/GTM";

// componentes
import Header from "../components/Header";
import NavBar from "../components/NavBar";

const karla = Karla({
   variable: "--font-karla",
   subsets: ["latin"],
   weight: ["200", "300", "400", "500", "600", "700", "800"],
});

export default function RootLayout({ children }) {
   return (
      <ToastProvider>
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
                  <noscript>
                     <iframe
                        src={`https://www.googletagmanager.com/ns.html?id=${process.env.NEXT_PUBLIC_GTM_ID}`}
                        height="0"
                        width="0"
                        style={{ display: "none", visibility: "hidden" }}
                     />
                  </noscript>
                  <GTM />

                  <div className="min-h-screen xl:flex">
                     <NavBar />
                  </div>

                  <MainContent>{children}</MainContent>
               </body>
            </html>
         </NavBarProvider>
      </ToastProvider>
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
