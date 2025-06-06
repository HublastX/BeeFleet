"use client";

import Script from "next/script";
import { usePathname } from "next/navigation";
import { useEffect } from "react";

const GTM_ID = process.env.NEXT_PUBLIC_GTM_ID;

// Função auxiliar para enviar eventos
export const sendGTMEvent = (eventName, eventParams = {}) => {
   if (!GTM_ID || typeof window === "undefined" || !window.dataLayer) return;

   window.dataLayer.push({
      event: eventName,
      ...eventParams,
   });
};

export default function GTM() {
   const pathname = usePathname();

   useEffect(() => {
      if (!GTM_ID) return;
      window.dataLayer = window.dataLayer || [];

      // Evento de pageview
      window.dataLayer.push({
         event: "pageview",
         page: pathname,
         page_title: document.title,
         page_location: window.location.href,
      });
   }, [pathname]);

   if (!GTM_ID) return null;

   return (
      <>
         <Script
            id="gtm-script"
            strategy="afterInteractive"
            dangerouslySetInnerHTML={{
               __html: `
                  (function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
                  new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
                  j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
                  'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
                  })(window,document,'script','dataLayer','${GTM_ID}');
               `,
            }}
         />
      </>
   );
}
