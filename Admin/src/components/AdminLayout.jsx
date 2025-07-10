// src/components/admin/AdminLayout.jsx
import React from "react";
import Sidebar from "./Sidebar";
import Header from "./Header";

const AdminLayout = ({ children }) => {
  return (
   
        
        <main className="flex-1 overflow-y-auto p-4 bg-gray-50">
          {children}
        </main>
    
  );
};

export default AdminLayout;