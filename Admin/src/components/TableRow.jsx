// src/components/admin/TableRow.jsx
import React from "react";

const TableRow = ({ orderId, customer, date, amount, status, statusColor }) => {
  const colors = {
    green: "bg-green-100 text-green-800",
    blue: "bg-blue-100 text-blue-800",
    purple: "bg-purple-100 text-purple-800",
    yellow: "bg-yellow-100 text-yellow-800",
  };
  
  return (
    <tr>
      <td className="px-4 py-3 whitespace-nowrap text-sm font-medium text-gray-900">
        {orderId}
      </td>
      <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-500">
        {customer}
      </td>
      <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-500">
        {date}
      </td>
      <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-500">
        {amount}
      </td>
      <td className="px-4 py-3 whitespace-nowrap">
        <span
          className={`px-2 py-1 text-xs font-medium rounded-full ${colors[statusColor]}`}
        >
          {status}
        </span>
      </td>
    </tr>
  );
};

export default TableRow;