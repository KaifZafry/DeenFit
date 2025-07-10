import React, { useEffect, useState } from "react";
import { CiShoppingCart } from "react-icons/ci";
import { FaRegHeart } from "react-icons/fa";
import { Link } from "react-router-dom";
import { BASE_IMG_URL } from "../utils/Constants";
import { useDispatch, useSelector } from "react-redux";
import { addToCart } from "../redux/CartSlice";
import { toast } from "react-toastify";

const Products = () => {
  const [products, setAllProducts] = useState([]);
  const [loading,setLoading]= useState(true)

   const cartItems = useSelector((state) => state.cart.cartItems);
  const dispatch = useDispatch();
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

   useEffect(() => {
     const FetchAllProduct = async () => {
       const res = await fetch("/api/Account/getallproducts");
       const data = await res.json();
       setAllProducts(data?.data);
       console.log(data);
       setLoading(false)
     };
     FetchAllProduct();
   }, []);
 
  return (
    <div className="container-full">
      <div
        data-aos="fade-up"
        data-aos-duration="500"
        className="flat-title wow fadeInUp"
      >
        <h4 className="title font-7">Today’s Picks</h4>
        <p className="desc text-main font-13 fs-16">
          Explore our most popular pieces that customers can't get enough of
        </p>
        <Link to='/products'>View All</Link>
      </div>

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
        {products.slice(0, 4).map((item) => {
          const imageArray = item.product_image?.split(",") || [];
          const mainImage = BASE_IMG_URL + imageArray[0];
          const hoverImage = BASE_IMG_URL + (imageArray[1] || imageArray[0]); // fallback to main image

          return (
            <div
              key={item.product_id}
              className="col-md-3 col-6 mb-4"
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
                      alt={item.product_title}
                    />
                    <img
                      className="img-hover"
                      src={hoverImage}
                      alt={item.product_title}
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
                    href={`/product/${item.product_id}`}
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
  );
};

export default Products;
