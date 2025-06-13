import React from "react";

const Badge = ({
   variant = "light",
   color = "primary",
   size = "md",
   startIcon,
   endIcon,
   children,
   className,
   "aria-label": ariaLabel,
   role = "status",
   ...props
}) => {
   const baseStyles =
      " items-center px-2.5 py-0.5 justify-center gap-1 rounded-full font-medium";

   const sizeStyles = {
      sm: "text-theme-xs",
      md: "text-sm",
   };

   const variants = {
      light: {
         success: "bg-bee-alert-200 text-bee-alert-100",
         error: "bg-bee-alert-400 text-bee-alert-300",
         warning: "bg-bee-alert-700 text-orange-400",
         info: "bg-blue-500/30 text-blue-600",
      },
      solid: {
         success: "bg-bee-alert-200 text-white ",
         error: "bg-bee-alert-400 text-white",
         warning: "bg-bee-alert-700 text-white ",
      },
   };

   const sizeClass = sizeStyles[size];
   const colorStyles = variants[variant][color];

   return (
      <span
         className={`${baseStyles} ${sizeClass} ${colorStyles} ${className}`}
         role={role}
         aria-label={ariaLabel}
         {...props}
      >
         {startIcon && (
            <span className="mr-1" aria-hidden="true">
               {startIcon}
            </span>
         )}
         {children}
         {endIcon && (
            <span className="ml-1" aria-hidden="true">
               {endIcon}
            </span>
         )}
      </span>
   );
};

export default Badge;
