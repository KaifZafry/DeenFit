import { Routes, Route } from 'react-router-dom';


import Topbar from '../components/Topbar';
import Header from '../components/Header';
import Footer from '../components/Footer';

import ScrollToTop from '../components/Scrolltop';
import { AnimatePresence } from 'framer-motion';
import Home from '../Pages/Home';
import Login from '../Pages/Login';
import SignUp from '../Pages/SignUp';
import About from '../Pages/About';
import Contact from '../Pages/Contact';


export default function AppRoutes() {
  
  return (
    <>
    <Topbar/>
    <Header/>
     <ScrollToTop />

     <AnimatePresence mode="wait">
    <Routes>
      
      <Route path="/" element={<Home />} />
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<SignUp />} />
      <Route path="/about" element={<About />} />
      <Route path="/contact" element={<Contact />} />
    </Routes>
    </AnimatePresence>
    <Footer/>
    </>
  );
}
