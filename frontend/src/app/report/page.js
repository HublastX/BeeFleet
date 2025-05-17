import { Suspense } from "react";
import ReportContent from "./ReportContent";

export default function RelatoriosPage() {
   return (
      <Suspense fallback={<div>Carregando relatórios...</div>}>
         <ReportContent />
      </Suspense>
   );
}
