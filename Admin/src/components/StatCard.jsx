// src/components/admin/StatCard.jsx
import React from "react";

const StatCard = ({ title, value, change, icon }) => {
  const isPositive = change.startsWith("+");
  
  return (
    <div className="bg-white p-4 rounded-lg shadow-sm">
      <div className="flex justify-between">
        <div>
          <p className="text-sm text-gray-500">{title}</p>
          <p className="text-2xl font-semibold text-gray-800">{value}</p>
        </div>
        <div className="p-3 rounded-full bg-gray-100">{icon}</div>
      </div>
      <p
        className={`text-sm mt-2 ${
          isPositive ? "text-green-500" : "text-red-500"
        }`}
      >
        {change} from last month
      </p>
    </div>
  );
};

export default StatCard;