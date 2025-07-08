import React from 'react'
import { BrowserRouter, Route, Router, Routes } from 'react-router-dom'
import AddCategoryForm from './components/AddCategory'
import Home from './components/Home'
import AddProductForm from './components/addproductForm'

const App = () => {
  return (
    <div>
      <BrowserRouter>


        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/addcategory" element={<AddCategoryForm />} />
          <Route path="/addproduct" element={<AddProductForm />} />
        </Routes>
      </BrowserRouter>
      
    </div>
  )
}

export default App