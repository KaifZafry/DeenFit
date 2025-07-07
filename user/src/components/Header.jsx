import React, { useState } from "react";
import { CgMenuLeftAlt } from "react-icons/cg";
import { FaRegHeart } from "react-icons/fa";
import { FiShoppingCart } from "react-icons/fi";
import { IoSearch } from "react-icons/io5";
import { LuUserRound } from "react-icons/lu";
import { MdKeyboardArrowDown } from "react-icons/md";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";

const Header = () => {
  const [show, setShow] = useState(false);
  const cartItems = useSelector((state) => state.cart.cartItems);
  const dispatch = useDispatch();
  const totalItems = cartItems.length;
  return (
    <>
      <header id="header" className="header-default">
        <div className="container">
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
                  <li className="menu-item">
                    <Link to="/products" className="item-link">
                      Products
                    </Link>
                  </li>
                  <li className="menu-item position-relative">
                    <a href="#" className="item-link">
                      Pages
                      <MdKeyboardArrowDown />
                    </a>
                  </li>
                  <li className="menu-item position-relative">
                    <a href="#" className="item-link">
                      Product Details
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
                  <a
                    href="#login"
                    data-bs-toggle="offcanvas"
                    className="nav-icon-item"
                  >
                    <LuUserRound />
                  </a>
                </li>
                <li className="nav-wishlist">
                  <a href="wish-list.html" className="nav-icon-item">
                    <FaRegHeart />
                    <span className="count-box">0</span>
                  </a>
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
        className={`offcanvas d-md-none offcanvas-start canvas-mb ${
          show ? "show" : ""
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
              {["Home", "Shop", "Products", "Pages", "Blog", "Buy Theme!"].map(
                (item, idx) => (
                  <li key={idx} className="nav-mb-item">
                    <span>{item}</span>
                    <span className="plus-icon">+</span>
                  </li>
                )
              )}
            </ul>

            {/* Icons */}
            <div className="group-icon mt-4 d-flex gap-2">
              <button className="btn btn-light w-50">
                <i className="bi bi-heart me-1"></i> Wishlist
              </button>
              <button className="btn btn-light w-50">
                <i className="bi bi-person me-1"></i> Login
              </button>
            </div>

            {/* Contact Info */}
            <div className="mt-4">
              <p className="mb-1 fw-bold">Need Help?</p>
              <p className="mb-1 small">
                Address: 123 Yarran st, Punchbowl, NSW 2196, Australia
              </p>
              <p className="mb-1 small">
                Email: <b>clientcare@ecom.com</b>
              </p>
              <p className="small">
                Phone: <b>1.888.838.3022</b>
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Header;
