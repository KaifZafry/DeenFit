import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import Topbar from './components/Topbar'

import 'bootstrap/dist/css/bootstrap.min.css';
import Header from './components/Header'
import Home from './Pages/Home';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import AppRoutes from './routes/AppRoutes';


function App() {


  return (
    <>
     <Router>
      <AppRoutes />
    </Router>
     
    </>
  )
}

export default App
