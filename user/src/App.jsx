import { useEffect, useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import Topbar from './components/Topbar'
import AOS from "aos";
import "aos/dist/aos.css";

import 'bootstrap/dist/css/bootstrap.min.css';
import Header from './components/Header'
import Home from './Pages/Home';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import AppRoutes from './routes/AppRoutes';


function App() {
useEffect(() => {
    AOS.init({ duration: 1000 });
  }, []);

  return (
    <>
     <Router>
      <AppRoutes />
    </Router>
     
    </>
  )
}

export default App
