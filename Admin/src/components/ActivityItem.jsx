// src/components/admin/ActivityItem.jsx
import React from "react";

const ActivityItem = ({ time, text, color }) => {
  const colors = {
    blue: "bg-blue-100 text-blue-800",
    green: "bg-green-100 text-green-800",
    purple: "bg-purple-100 text-purple-800",
    yellow: "bg-yellow-100 text-yellow-800",
  };
  
  return (
    <div className="flex items-start space-x-3">
      <div className={`w-2 h-2 mt-2 rounded-full ${colors[color]}`}></div>
      <div>
        <p className="text-sm text-gray-600">{text}</p>
        <p className="text-xs text-gray-400">{time}</p>
      </div>
    </div>
  );
};

export default ActivityItem;