import React from "react";
import Link from "next/link";

export const DropdownItem = ({
   tag = "button",
   href = "",
   className = "",
   onClick,
   onItemClick,
   children,
}) => {
   const baseClassName = "dropdown-item";
   const combinedClasses = `${baseClassName} ${className}`.trim();

   const handleClick = (event) => {
      if (tag === "button") {
         event.preventDefault();
      }
      if (onClick) onClick();
      if (onItemClick) onItemClick();
   };

   if (tag === "a" && href) {
      return (
         <Link href={href} className={combinedClasses} onClick={handleClick}>
            {children}
         </Link>
      );
   }

   return (
      <button onClick={handleClick} className={combinedClasses}>
         {children}
      </button>
   );
};
