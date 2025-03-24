import { Poppins } from "next/font/google";
import "./globals.css";

const poppins = Poppins({
   variable: "--font-poppins",
   subsets: ["latin"],
   weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
});

export const metadata = {
   title: "BeeFleet",
   description: "Frota De Carros",
};

// componentes
import Header from "../components/Header";
import NavBar from "../components/NavBar";

export default function RootLayout({ children }) {
   return (
      <html lang="pt-br">
         <body className={`${poppins.variable} antialiased flex row justify-between`}>
            <head>
               <meta name="apple-mobile-web-app-title" content="BeeFleet" />
            </head>
            <NavBar />

            <div className="flex-1 transition-all  duration-300 ease-in-out">
               <Header />
               <div className="p-4 mx-auto max-w-(--breakpoint-2xl) md:p-6">
                  {children}
               </div>
            </div>
         </body>
      </html>
   );
}
