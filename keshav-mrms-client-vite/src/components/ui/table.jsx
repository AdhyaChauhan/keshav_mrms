// src/components/ui/table.jsx
import React from "react";

/* CLEAN WHITE UI – NO DARK MODE ANYWHERE */

export const Table = ({ children, className = "" }) => (
  <div className={`w-full overflow-auto ${className}`}>
    <table className="min-w-full bg-white border border-gray-200">
      {children}
    </table>
  </div>
);

export const TableHeader = ({ children, className = "" }) => (
  <thead className={`bg-gray-100 border-b border-gray-200 ${className}`}>
    {children}
  </thead>
);

export const TableBody = ({ children, className = "" }) => (
  <tbody className={`bg-white divide-y divide-gray-200 ${className}`}>
    {children}
  </tbody>
);

export const TableRow = ({ children, className = "" }) => (
  <tr className={`hover:bg-gray-50 transition ${className}`}>{children}</tr>
);

export const TableHead = ({ children, className = "" }) => (
  <th
    scope="col"
    className={`px-4 py-3 text-left text-sm font-semibold text-gray-700 ${className}`}
  >
    {children}
  </th>
);

export const TableCell = ({ children, className = "" }) => (
  <td
    className={`px-4 py-3 text-sm text-gray-800 whitespace-nowrap ${className}`}
  >
    {children}
  </td>
);
