import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import AddCategoryForm from './components/AddCategory';
import Home from './components/Home';
import AddProductForm from './components/addproductForm';
import AdminDashboard from './Pages/AdminDashboard';
import ProductListPage from './Pages/products';
import Sidebar from './components/Sidebar';
import Header from './components/Header';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Category from './Pages/Category';
import SubCategory from './Pages/Subcategory';
import OrderDetails from './components/Orderdetails';

const App = () => {
  return (
    <>
    <BrowserRouter> {/* 👈 Router should wrap EVERYTHING */}
      <div className="flex h-screen bg-gray-100">
        <Sidebar /> {/* 👈 Sidebar appears on all routes */}
        
        <div className="flex-1 flex flex-col overflow-hidden">
          <Header /> {/* 👈 Header appears on all routes */}
          
          <Routes> {/* 👈 Routes container for page content */}
            <Route path="/" element={<AdminDashboard />} />
            <Route path="/addcategory" element={<AddCategoryForm />} />
            <Route path="/category" element={<Category />} />
           
            <Route path="/products/add" element={<AddProductForm />} />
            <Route path="/products/edit/:id" element={<AddProductForm />} />
            <Route path="/products" element={<ProductListPage />} />
            <Route path="/subcategory" element={<SubCategory />} />
            <Route path="/orderdetails" element={<OrderDetails />} />
          </Routes>
        </div>
      </div>
    </BrowserRouter>

     <ToastContainer position="top-right" autoClose={3000} />
    </>
  );
};

export default App;
