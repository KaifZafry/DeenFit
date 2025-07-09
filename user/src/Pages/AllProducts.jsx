import React, { useEffect, useState } from "react";
import { CiShoppingCart } from "react-icons/ci";
import { FaRegHeart } from "react-icons/fa6";
import { Link, useLocation } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { addToCart } from "../redux/CartSlice";
import { BASE_IMG_URL } from "../utils/Constants";
import { toast } from "react-toastify";

const AllProducts = () => {
  const [products, setAllProducts] = useState([]);
  const [loading, setLoading] = useState(true)
  const cartItems = useSelector((state) => state.cart.cartItems);
  const dispatch = useDispatch();

 
const location = useLocation();
const query = new URLSearchParams(location.search);
const categoryId = query.get("category");

  const handleAddToCart = (item, e) => {
    e.preventDefault();
    const isExisting = cartItems.some(cartItem => cartItem.product_id === item.product_id);

    dispatch(addToCart(item));
    if (isExisting) {
      toast.info("Quantity increased in cart.");
    } else {
      toast.success("Product added to cart.");
    }
  };
     
  const fetchProducts = async () => {
  try {
    const res = await fetch(
      categoryId
        ? `api/Account/getproductsbycategory/${categoryId}`
        : `/api/Account/getallproducts`
    );
    const json = await res.json();
    console.log(json?.data)
    setAllProducts(json?.data || []);
  } catch (err) {
    console.error("Error fetching products", err);
  } finally {
    setLoading(false); // ✅ Important
  }
};
  

useEffect(() => {
  fetchProducts();
}, [categoryId]); // ✅ re-run when categoryId changes


  return (
    <>
      <section className="tf-page-title">
        <div className="container">
          <div
            className="box-title text-center"
            data-aos="fade-up"
            data-aos-duration="500"
          >
            <h4 className="title">Top Collection</h4>
            <div className="breadcrumb-list">
              <Link className="breadcrumb-item" to="/">
                Home
              </Link>
              <div className="breadcrumb-item dot">
                <span></span>
              </div>
              <Link className="breadcrumb-item" href="/products">
                Collections
              </Link>
              <div className="breadcrumb-item dot">
                <span></span>
              </div>
            </div>
            <p className="desc text-md text-main">
              Our most popular and best selling Products
            </p>
          </div>
        </div>
      </section>

      <div className="container-full my-5">


        {loading ? (
          <div className="grid-cls grid-cls-v6 wow fadeInUp" data-aos="zoom-in" data-aos-duration="500">
            {Array(4).fill(0).map((_, idx) => (
              <div
                key={idx}
                className="h-[300px] bg-gray-200 rounded-2xl animate-pulse"
              ></div>
            ))}
          </div>
        ) : (

          <div className="row">
            {products.map((item) => {
              const imageArray = item.product_image?.split(",") || [];
              const mainImage = BASE_IMG_URL + imageArray[0];
              const hoverImage = BASE_IMG_URL + (imageArray[1] || imageArray[0]);

              return (

                <div
                  key={item.product_id}
                  className="col-md-3 mb-4"
                  data-aos="fade-up"
                  data-aos-duration="500"
                >
                  <div className="card-product">
                    <div className="card-product-wrapper asp-ratio-1">
                      <Link
                        to={`/product/${item.product_id}`}
                        className="product-img d-block"
                      >
                        <img
                          className="img-product"
                          src={mainImage}
                          alt={item.name}
                        />
                        <img
                          className="img-hover"
                          src={hoverImage}
                          alt={item.name}
                        />
                      </Link>

                      <ul className="list-product-btn">
                        <li>
                          <a
                            onClick={(e) => handleAddToCart(item, e)}
                            className="hover-tooltip tooltip-left box-icon"
                          >
                            <CiShoppingCart />
                            <span className="tooltip">Quick Add</span>
                          </a>
                        </li>
                        <li className="wishlist">
                          <a
                            href="#"
                            className="hover-tooltip tooltip-left box-icon"
                          >
                            <FaRegHeart />
                            <span className="tooltip">Add to Wishlist</span>
                          </a>
                        </li>
                      </ul>
                    </div>

                    <div className="card-product-info text-center mt-2">
                      <a
                        href={`/product/${item.id}`}
                        className="name-product link fw-medium text-md"
                      >
                        {item.product_title}
                      </a>
                      <p className="price-wrap fw-medium mt-1">
                        <span className="price-new text-xl text-primary">
                          ${item.selling_price.toFixed(2)}
                        </span>
                        {item.price && (
                          <span className="price-old ms-2">
                            ${item.price.toFixed(2)}
                          </span>
                        )}
                      </p>
                    </div>
                  </div>
                </div>
              );
            })}

          </div>
        )}
      </div>
    </>
  );
};

export default AllProducts;
