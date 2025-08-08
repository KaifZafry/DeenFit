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
  FiUserPlus,
} from "react-icons/fi";
import SidebarItem from "./SidebarItem";
import { useLocation } from "react-router-dom";

const Sidebar = () => {
   const location = useLocation();
  const currentPath = location.pathname;

  return (
    <div className="hidden md:flex flex-col w-64 bg-white shadow-lg">
      <div className="flex items-center justify-center h-16 bg-blue-600">
        <h1 className="text-white font-bold text-xl">AdminPanel</h1>
      </div>
      
      <div className="flex flex-col flex-grow p-4 overflow-auto">
        <nav className="flex-1 space-y-2">
          <SidebarItem icon={<FiHome />} text="Dashboard" route="/" active={currentPath === '/'} />
      <SidebarItem icon={<FiShoppingCart />} text="Manage Products" route="/products" active={currentPath === '/products'} />
      <SidebarItem icon={<FiUserPlus />} text="Manage Category" route="/category" active={currentPath === '/category'} />
      <SidebarItem icon={<FiPieChart />} text="Manage Subcategory" route="/subcategory" active={currentPath === '/subcategory'} />
      <SidebarItem icon={<FiMail />} text="orderDetails" route="/orderdetails" active={currentPath === '/orderdetails'} />
      <SidebarItem icon={<FiCalendar />} text="Calendar" route="/calendar" active={currentPath === '/calendar'} />
      <SidebarItem icon={<FiSettings />} text="Settings" route="/settings" active={currentPath === '/settings'} />

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