import React, { useEffect, useState } from "react";
import { CgMenuLeftAlt } from "react-icons/cg";
import { FaRegHeart } from "react-icons/fa";
import { FiShoppingCart } from "react-icons/fi";
import { IoSearch } from "react-icons/io5";
import { LuUserRound } from "react-icons/lu";
import { MdKeyboardArrowDown } from "react-icons/md";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import ModelSearch from "./ModelSearch";

const Header = () => {
  const [show, setShow] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isSticky, setIsSticky] = useState(false);

  const categories = useSelector((state) => state.category.list);
  const dispatch = useDispatch();

  useEffect(() => {
    const handleScroll = () => {
      setIsSticky(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleOpenModal = () => setIsModalOpen(true);
  const handleCloseModal = () => setIsModalOpen(false);
  const toggleDropdown = () => {
    setIsOpen((prev) => !prev);
  };
  const cartItems = useSelector((state) => state.cart.cartItems);
  const totalItems = cartItems.length;
  // const user = useSelector((state) => state.auth.user);

  const userId = localStorage.getItem("userId");

  const wishlistCount = useSelector(
    (state) => state.wishlist.wishlistItems.length
  );
  return (
    <>
      <header
        id="header"
        className={`header-default fixed top-0 left-0 w-full z-50 transition-all duration-300 ${
          isSticky ? "bg-white shadow-md" : "bg-transparent"
        }`}
      >
        <div className="container-full ">
          <div className="row wrapper-header px-2 align-items-center">
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
               <a className="nav-search">
                  <span
                    onClick={handleOpenModal}
                    className="nav-icon-item cursor-pointer"
                  >
                    <IoSearch />
                  </span>
                  {isModalOpen && <ModelSearch onClose={handleCloseModal} />}
                </a>
            </div>

            <div className="col-xl-5 d-none d-xl-block">
              <nav className="box-navigation text-center">
                <ul className="box-nav-menu justify-start">
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
                      {categories.map((category) => (
                        <li key={category?.category_id}>
                          <Link
                            to={`/products?category=${category.category_id}`}
                            className="block w-100 text-black text-start px-4 py-2 hover:bg-gray-200 hover:text-orange-300"
                          >
                            {category?.category_title}
                          </Link>
                        </li>
                      ))}
                    </ul>
                  </li>
                </ul>
              </nav>
            </div>
            <div className="col-xl-2 col-md-4 col-6">
              <Link to="/" className="logo-header">
                <img src="/calliwear.png" alt="logo" className="logo" />
              </Link>
            </div>
            <div className="col-xl-5 col-md-4 col-3">
              <ul className="nav-icon d-flex justify-content-end align-items-center">
                <li className="nav-account">
                  {userId ? ( 
                    // ✅ Show My Account or Logout if user is logged in
                    <Link to="/account" className="nav-icon-item">
                      <LuUserRound />
                      {console.log(userId)}
                    </Link>
                  ) : (
                    <Link
                      to="/register"
                      data-bs-toggle="offcanvas"
                      className="nav-icon-item"
                    >
                      <LuUserRound />
                    </Link>
                  )}
                </li>
                <li className="nav-search">
                  <span
                    onClick={handleOpenModal}
                    className="nav-icon-item cursor-pointer"
                  >
                    <IoSearch />
                  </span>
                  {isModalOpen && <ModelSearch onClose={handleCloseModal} />}
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
              <li className="menu-item nav-mb-item relative">
                <span
                  onClick={toggleDropdown}
                  className="item-link cursor-pointer flex items-center justify-between w-full py-3 "
                >
                  Products <span className="plus-icon">+</span>
                </span>

                {isOpen && (
                  <ul className="mt-2 w-full  rounded-lg z-50">
                    {categories.map((category) => (
                      <li key={category?.category_id}>
                        <Link
                          onClick={() => setShow(false)}
                          to={`/products?category=${category.category_id}`}
                          className="block px-4 py-2 border-bottom border-b hover:bg-gray-100"
                        >
                          {category?.category_title}
                        </Link>
                      </li>
                    ))}
                  </ul>
                )}
              </li>
            </ul>

            {/* Icons */}
            <div className="group-icon mt-4 d-flex gap-2">
              <Link
                to="/wishlist"
                onClick={() => setShow(false)}
                className="btn d-flex justify-evenly items-center btn-light w-50"
              >
                <FaRegHeart /> Wishlist
              </Link>
              {userId? <Link
                to="/account"
                onClick={() => setShow(false)}
                className="btn d-flex align-items-center justify-evenly btn-light w-50"
              >
                <LuUserRound/> Account
              </Link>: <Link
                to="/login"
                onClick={() => setShow(false)}
                className="btn d-flex justify-evenly items-center btn-light w-50"
              >
                <LuUserRound/>Login
              </Link>

              }
             
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
