"use client";
import withAuth from "@/utils/withAuth";
import Link from "next/link";
import Btn from "@/elements/btn";
import Table from "../../components/table/userTable";
import Cards from "../../components/cardList/driverCard";
import Icon from "@/elements/Icon";
import { useState } from "react";

function Driver() {
    const [view, setView] = useState("cards");

    return (
       <div>
          <div className="p-2 mb-3 flex justify-between">
             <Link href="/driver/create">
                <Btn
                   variant="primary"
                   texto="Adicionar Motorista"
                   className="flex flex-row-reverse text-center font-bold text-lg gap-3"
                />
             </Link>
             <div className="flex gap-2">
                <Btn variant="secondary" onClick={() => setView("table")}>
                   <Icon name="table" className="size-8" />
                </Btn>
                <Btn variant="secondary" onClick={() => setView("cards")}>
                   <Icon name="identidade" className="size-8" />
                </Btn>
             </div>
          </div>

          <div className="space-y-6 border-t border-bee-dark-300 dark:border-bee-dark-400 py-5 sm:px-3 md:px-5 lg:px-6">
             {view === "table" && <Table />}
             {view === "cards" && <Cards />}
          </div>
       </div>
    );
}
export default withAuth(Driver);
