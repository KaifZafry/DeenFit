import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import AddCategoryForm from './components/AddCategory';
import Home from './components/Home';
import AddProductForm from './components/addproductForm';
import AdminDashboard from './Pages/AdminDashboard';
import ProductListPage from './Pages/products';
import Sidebar from './components/Sidebar';
import Header from './components/Header';

const App = () => {
  return (
    <BrowserRouter> {/* 👈 Router should wrap EVERYTHING */}
      <div className="flex h-screen bg-gray-100">
        <Sidebar /> {/* 👈 Sidebar appears on all routes */}
        
        <div className="flex-1 flex flex-col overflow-hidden">
          <Header /> {/* 👈 Header appears on all routes */}
          
          <Routes> {/* 👈 Routes container for page content */}
            <Route path="/" element={<AdminDashboard />} />
            <Route path="/addcategory" element={<AddCategoryForm />} />
            <Route path="/addproduct" element={<AddProductForm />} />
            <Route path="/products" element={<ProductListPage />} />
          </Routes>
        </div>
      </div>
    </BrowserRouter>
  );
};

export default App;