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
import ProductDetails from '../Pages/ProductDetails';
import AllProducts from '../Pages/AllProducts';
import Cart from '../Pages/Cart';
import Checkout from '../Pages/Checkout';


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
      <Route path="/products" element={<AllProducts />} />
      <Route path="/product/:id" element={<ProductDetails />} />
      <Route path="/cart" element={<Cart />} />
      <Route path="/checkout" element={<Checkout />} />
    </Routes>
    </AnimatePresence>
    <Footer/>
    </>
  );
}
