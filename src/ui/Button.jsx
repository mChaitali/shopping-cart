import React from "react";
import clsx from "clsx";

const Button = ({
  children,
  variant = "primary",
  size = "md",
  className,
  ...props
}) => {
  const baseStyles =
    "inline-flex items-center justify-center font-medium rounded-lg transition-colors focus:outline-none cursor-pointer";

  const variants = {
    primary: "bg-[#185574] text-white hover:bg-[#012233] focus:bg-[#012233]",
    outline: "border border-gray-300 text-gray-700 hover:bg-gray-100 focus:bg-gray-100",
    textButton: "underline border-none text-[#185574] hover:text-[#012233] focus:text-[#012233]"
  };

  const sizes = {
    sm: "px-3 py-1.5 text-sm",
    md: "px-4 py-2 text-base",
    lg: "px-6 py-3 text-lg",
  };

  return (
    <button
      className={clsx(baseStyles, variants[variant], sizes[size], className)}
      {...props}
    >
      {children}
    </button>
  );
};

export default Button;
