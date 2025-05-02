"use client";
import React from "react";
import withAuth from "@/utils/withAuth";
import ManagersTable from "@/components/table/managersTable";

function Managers() {
   return (
      <div>
            <ManagersTable />
      </div>
   );
}

export default withAuth(Managers);
