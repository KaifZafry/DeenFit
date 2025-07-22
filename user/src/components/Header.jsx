import React, { useState } from "react";
import { CgMenuLeftAlt } from "react-icons/cg";
import { FaRegHeart } from "react-icons/fa";
import { FiShoppingCart } from "react-icons/fi";
import { IoSearch } from "react-icons/io5";
import { LuUserRound } from "react-icons/lu";
import { MdKeyboardArrowDown } from "react-icons/md";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import LoginPopup from "./Login";

const Header = () => {
   const [showLogin, setShowLogin] = useState(false);
  const [show, setShow] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
const categories = useSelector((state) => state.category.list);
  const dispatch = useDispatch();
  const toggleDropdown = () => {
    setIsOpen((prev) => !prev);
  };
  const cartItems = useSelector((state) => state.cart.cartItems);
  const totalItems = cartItems.length;
  // const user = useSelector((state) => state.auth.user);
    const user = '';
   
  const wishlistCount = useSelector((state) => state.wishlist.wishlistItems.length);
  return (
    <>
      <header id="header" className="header-default">
        <div className="container-full">
          <div className="row wrapper-header align-items-center">
            <div className="col-md-4 col-3 d-xl-none">
              <a
                href="#mobileMenu"
                onClick={() => setShow(true)}
                className="mobile-menu"
                data-bs-toggle="offcanvas"
                aria-controls="mobileMenu"
              >
                <CgMenuLeftAlt />
              </a>
            </div>
            <div className="col-xl-2 col-md-4 col-6">
              <Link to="/" className="logo-header">
                <img src="/logo.png" alt="logo" className="logo" />
              </Link>
            </div>
            <div className="col-xl-8 d-none d-xl-block">
              <nav className="box-navigation text-center">
                <ul className="box-nav-menu">
                  <li className="menu-item">
                    <Link to="/" className="item-link">
                      Home
                    </Link>
                  </li>
                  <li className="menu-item">
                    <Link to="/about" className="item-link">
                      About
                    </Link>
                  </li>
                  <li className="menu-item relative group">
                    <span className="item-link cursor-pointer flex items-center">
                      Products <MdKeyboardArrowDown className="ml-1" />
                    </span>

                    <ul className="absolute group-hover:block hidden left-0 bg-white top-16 w-[200px] text-start">
                     
                     {categories.map((category)=>(
                       <li key={category?.id}>
                        <Link
                          to={`/products?category=${category.category_id}`}
                          className="block w-100 text-start px-4 py-2 hover:bg-gray-200 hover:text-orange-300"
                        >
                          {category?.category_title}
                        </Link>
                      </li>
                     ))}
                     
                     
                    </ul>
                  </li>
                  <li className="menu-item position-relative">
                    <a href="#" className="item-link">
                      Pages
                    </a>
                  </li>
                </ul>
              </nav>
            </div>
            <div className="col-xl-2 col-md-4 col-3">
              <ul className="nav-icon d-flex justify-content-end align-items-center">
                <li className="nav-search">
                  <a
                    href="#search"
                    data-bs-toggle="modal"
                    className="nav-icon-item"
                  >
                    <IoSearch />
                  </a>
                </li>
                <li className="nav-account">
                  {user ? (
                    // ✅ Show My Account or Logout if user is logged in
                    <Link to="/account" className="nav-icon-item">
                      <LuUserRound />
                      
                    </Link>
                  ) : (
                    // 🚪 Show Login icon if not logged in
                    <a
                      href="#login"
                      onClick={() => setShowLogin(true)}
                     
                      data-bs-toggle="offcanvas"
                      className="nav-icon-item"
                    >
                      <LuUserRound />
                        {showLogin && <LoginPopup onClose={() => setShowLogin(false)} />}
                    </a>
                  )}
                </li>
                <li className="nav-wishlist">
                  <Link to="/wishlist" className="nav-icon-item">
                    <FaRegHeart />
                    <span className="count-box">{wishlistCount}</span>
                  </Link>
                </li>
                <li className="nav-cart">
                  <div id="cart-icon" className="cart-icon-fixed">
                    <Link
                      to="/cart"
                      data-bs-toggle="offcanvas"
                      className="nav-icon-item"
                    >
                      <FiShoppingCart />
                      <span className="count-box">{totalItems}</span>
                    </Link>
                  </div>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </header>

      <div
        className={`offcanvas d-md-none offcanvas-start canvas-mb ${show ? "show" : ""
          }`}
      >
        <button
          className="icon-close icon-close-popup"
          onClick={() => setShow(false)}
        >
          ×
        </button>

        <div className="mb-canvas-content">
          <div className="mb-body">
            {/* Top Menu */}
            <ul className="nav-ul-mb">
              <li className="nav-mb-item">
                <Link
                  to="/"
                  className=" d-flex py-3 text-lg flex w-full justify-between items-center"
                  onClick={() => setShow(false)}
                >
                  <span>Home</span>
                </Link>
              </li>
              <li className="nav-mb-item">
                <Link
                  to="/about"
                  className="d-flex py-3 text-lg flex w-full justify-between items-center"
                  onClick={() => setShow(false)}
                >
                  <span>About</span>
                </Link>
              </li>
              <li className="menu-item relative">
                <span
                  onClick={toggleDropdown}
                  className="item-link cursor-pointer flex items-center justify-between w-full py-3 "
                >
                  Products <span className="plus-icon">+</span>
                </span>

                {isOpen && (
                  <ul className="mt-2 w-full shadow-lg rounded-lg z-50">
                    <li>
                      <Link
                        to="/products?category=2"
                        onClick={() => setIsOpen(false)}
                        className="block px-4 py-2 border-bottom border-b hover:bg-gray-100"
                      >
                        Sunnah Lines
                      </Link>
                    </li>
                    <li>
                      <Link
                        to="/products?category=3"
                        onClick={() => setIsOpen(false)}
                        className="block border-bottom px-4 py-2 hover:bg-gray-100"
                      >
                        Deenfit Original
                      </Link>
                    </li>
                    <li>
                      <Link
                        to="/products?category=4"
                        onClick={() => setIsOpen(false)}
                        className="block border-bottom px-4 py-2 hover:bg-gray-100"
                      >
                        Deenfit Youth
                      </Link>
                    </li>
                  </ul>
                )}
              </li>
              <li className="nav-mb-item">
                <Link
                  to="#"
                  className="d-flex py-3 text-lg flex w-full justify-between items-center"
                  onClick={() => setShow(false)}
                >
                  <span>Pages</span>
                </Link>
              </li>
            </ul>

            {/* Icons */}
            <div className="group-icon mt-4 d-flex gap-2">
              <Link to="/wishlist" onClick={() => setIsOpen(false)} className="btn btn-light w-50">
                <i className="bi bi-heart me-1"></i> Wishlist
              </Link>
              <Link to='/' onClick={() => setIsOpen(false)} className="btn btn-light w-50">
                <i className="bi bi-person me-1"></i> Login
              </Link>
            </div>

            {/* Contact Info */}
            <div className="mt-4">
              <p className="mb-1 fw-bold">Need Help?</p>
              <p className="mb-1 small">
                Address: F-104/3, Shaheen Bagh, Okhla , New Delhi India (110025)
              </p>
              <p className="mb-1 small">
                Email: <b>support.deenfit@gmail.com</b>
              </p>
              <p className="small">
                Phone: <b>+91 960824096</b>
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Header;
