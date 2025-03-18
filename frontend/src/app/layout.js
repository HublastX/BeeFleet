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
import Header from "./components/Header";

export default function RootLayout({ children }) {
   return (
      <html lang="pt-br">
         <body className={`${poppins.variable} antialiased`}>
            <Header />
            {children}
         </body>
      </html>
   );
}
