import React from 'react'
import { BrowserRouter, Route, Router, Routes } from 'react-router-dom'
import AddCategoryForm from './components/AddCategory'
import Home from './components/Home'
import AddProductForm from './components/addproductForm'
import AdminDashboard from './Pages/AdminDashboard'

const App = () => {
  return (
    <div>
      <BrowserRouter>


        <Routes>
          <Route path="/" element={<AdminDashboard />} />
          <Route path="/addcategory" element={<AddCategoryForm />} />
          <Route path="/addproduct" element={<AddProductForm />} />
        </Routes>
      </BrowserRouter>
      
    </div>
  )
}

export default App