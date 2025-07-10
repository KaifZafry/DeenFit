// src/components/admin/Header.jsx
import React from "react";
import { FiBell } from "react-icons/fi";

const Header = () => {
  return (
    <header className="flex items-center justify-between p-4 bg-white shadow-sm">
      <div className="flex items-center md:hidden">
        <button className="p-2 rounded-md text-gray-600 hover:bg-gray-100">
          <svg
            className="w-6 h-6"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M4 6h16M4 12h16M4 18h16"
            />
          </svg>
        </button>
      </div>
      
      <div className="flex items-center space-x-4">
        <div className="relative">
          <button className="p-1 rounded-full text-gray-600 hover:bg-gray-100">
            <FiBell className="w-6 h-6" />
          </button>
          <span className="absolute top-0 right-0 w-2 h-2 bg-red-500 rounded-full"></span>
        </div>
        
        <div className="flex items-center space-x-2">
          <div className="w-8 h-8 rounded-full bg-blue-500 flex items-center justify-center text-white">
            ZK
          </div>
          <span className="hidden md:inline">Zafry Kaif</span>
        </div>
      </div>
    </header>
  );
};

export default Header;