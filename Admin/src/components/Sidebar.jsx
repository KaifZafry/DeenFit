// src/components/admin/Sidebar.jsx
import React from "react";
import {
  FiHome,
  FiUsers,
  FiSettings,
  FiPieChart,
  FiShoppingCart,
  FiMail,
  FiCalendar,
  FiLogOut,
} from "react-icons/fi";
import SidebarItem from "./SidebarItem";

const Sidebar = () => {
  return (
    <div className="hidden md:flex flex-col w-64 bg-white shadow-lg">
      <div className="flex items-center justify-center h-16 bg-blue-600">
        <h1 className="text-white font-bold text-xl">AdminPanel</h1>
      </div>
      
      <div className="flex flex-col flex-grow p-4 overflow-auto">
        <nav className="flex-1 space-y-2">
          <SidebarItem icon={<FiHome />} text="Dashboard" route="/" active />
          <SidebarItem icon={<FiUsers />} text="Users" />
          <SidebarItem icon={<FiShoppingCart />} text="Add Products" route="/addproduct" />
          <SidebarItem icon={<FiPieChart />} text="Analytics" />
          <SidebarItem icon={<FiMail />} text="Messages" />
          <SidebarItem icon={<FiCalendar />} text="Calendar" />
          <SidebarItem icon={<FiSettings />} text="Settings" />
        </nav>
        
        <div className="mt-auto">
          <button className="flex items-center space-x-2 w-full p-2 rounded-lg text-red-500 hover:bg-red-50">
            <FiLogOut />
            <span>Logout</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;