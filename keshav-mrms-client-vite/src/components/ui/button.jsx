// src/components/ui/button.jsx
import React from "react";
import clsx from "clsx";

/**
 * Simple Button with variants:
 * variant: 'default' | 'secondary' | 'destructive' | 'icon'
 * size: 'sm' | 'md' | 'lg' or 'icon'
 */

export const Button = ({ children, variant = "default", size = "md", className = "", ...props }) => {
  const base = "inline-flex items-center justify-center rounded-md font-medium focus:outline-none";
  const sizes = {
    sm: "px-3 py-1.5 text-sm",
    md: "px-4 py-2 text-sm",
    lg: "px-5 py-2.5 text-base",
    icon: "p-2",
  };
  const variants = {
    default: "bg-indigo-600 text-white hover:bg-indigo-700",
    secondary: "bg-slate-100 text-slate-800 hover:bg-slate-200 dark:bg-slate-700 dark:text-slate-100",
    destructive: "bg-red-600 text-white hover:bg-red-700",
    outline: "border border-slate-200 text-slate-800 hover:bg-slate-50",
  };

  return (
    <button
      className={clsx(base, sizes[size] || sizes.md, variants[variant] || variants.default, className)}
      {...props}
    >
      {children}
    </button>
  );
};
