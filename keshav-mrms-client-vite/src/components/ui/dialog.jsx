import * as React from "react";

export function Dialog({ open, children }) {
  if (!open) return null;
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black/40 z-50">
      {children}
    </div>
  );
}

export function DialogContent({ className = "", children }) {
  return (
    <div
      className={
        "bg-white w-full max-w-lg rounded-lg shadow-lg p-6 " + className
      }
    >
      {children}
    </div>
  );
}

export function DialogHeader({ children }) {
  return <div className="mb-4">{children}</div>;
}

export function DialogTitle({ children }) {
  return <h2 className="text-xl font-semibold">{children}</h2>;
}

export function DialogFooter({ children }) {
  return <div className="mt-6 flex justify-end gap-2">{children}</div>;
}
