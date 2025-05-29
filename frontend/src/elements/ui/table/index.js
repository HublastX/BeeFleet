import React from "react";

// Table Component
const Table = ({
   children,
   className,
   role = "table",
   "aria-label": ariaLabel,
   ...props
}) => {
   return (
      <table
         className={`min-w-full ${className}`}
         role={role}
         aria-label={ariaLabel}
         {...props}
      >
         {children}
      </table>
   );
};

// TableHeader Component
const TableHeader = ({ children, className, role = "rowgroup", ...props }) => {
   return (
      <thead className={className} role={role} {...props}>
         {children}
      </thead>
   );
};

// TableBody Component
const TableBody = ({ children, className, role = "rowgroup", ...props }) => {
   return (
      <tbody className={className} role={role} {...props}>
         {children}
      </tbody>
   );
};

// TableRow Component
const TableRow = ({
   children,
   className,
   role = "row",
   "aria-rowindex": ariaRowIndex,
   ...props
}) => {
   return (
      <tr
         className={className}
         role={role}
         aria-rowindex={ariaRowIndex}
         {...props}
      >
         {children}
      </tr>
   );
};

// TableCell Component
const TableCell = ({
   children,
   isHeader = false,
   className,
   role,
   scope,
   "aria-sort": ariaSort,
   colSpan,
   "aria-label": ariaLabel,
   ...props
}) => {
   const CellTag = isHeader ? "th" : "td";
   return (
      <CellTag
         className={`${className}`}
         role={role || (isHeader ? "columnheader" : "cell")}
         scope={scope || (isHeader ? "col" : undefined)}
         aria-sort={ariaSort}
         colSpan={colSpan}
         aria-label={ariaLabel}
         {...props}
      >
         {children}
      </CellTag>
   );
};

export { Table, TableHeader, TableBody, TableRow, TableCell };
