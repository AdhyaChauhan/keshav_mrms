// src/components/ui/badge.jsx
import React from "react";

export const Badge = ({ children, variant = "default", className = "" }) => {
  const base = "inline-flex items-center px-2 py-0.5 rounded-full text-xs font-semibold";
  const variants = {
    default: "bg-slate-100 text-slate-800 dark:bg-slate-700 dark:text-slate-100",
    success: "bg-green-100 text-green-800",
    warning: "bg-yellow-100 text-yellow-800",
    outline: "bg-transparent border border-slate-200 text-slate-800",
  };

  return <span className={`${base} ${variants[variant] || variants.default} ${className}`}>{children}</span>;
};
