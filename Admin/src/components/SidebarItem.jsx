// src/components/admin/SidebarItem.jsx
import React from "react";
import {Link} from "react-router-dom"

const SidebarItem = ({ icon, text, active = false,route }) => {
  return (
    <Link to={route}
      className={`flex items-center space-x-2 w-full p-2 rounded-lg ${
        active
          ? "bg-blue-100 text-blue-600"
          : "text-gray-600 hover:bg-gray-100"
      }`}
    >
      <span>{icon}</span>
      <span>{text}</span>
    </Link>
  );
};

export default SidebarItem;