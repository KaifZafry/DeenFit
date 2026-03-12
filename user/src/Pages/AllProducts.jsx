import React, { useEffect, useState } from "react";
import { CiShoppingCart } from "react-icons/ci";
import { FaRegHeart } from "react-icons/fa6";
import { Link, useLocation } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { addToCart } from "../redux/CartSlice";
import { resolveImageUrl } from "../utils/resolveImageUrl";
import { toast } from "react-toastify";
import { apiFetch } from "../utils/api";

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
  setLoading(true);
  try {
    const res = await apiFetch(
      categoryId
        ? `/api/Account/getproductsbycategory/${categoryId}`
        : `/api/Account/getallproducts`
    );
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    const json = await res.json();
    console.log(json?.data)
    setAllProducts(json?.data || []);
  } catch (err) {
    console.error("Error fetching products", err);
    setAllProducts([]);
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
        <div className="container-full">
          <div
            className="box-title w-full text-center"
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
              {/* <a className="breadcrumb-item">
                {products[0].category_title}
              </a> */}
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
            {Array.from({ length: 8 }).map((_, idx) => (
              <div key={idx} className="rounded-2xl overflow-hidden border border-black/5 bg-white">
                <div className="w-full aspect-square skeleton" />
                <div className="p-3">
                  <div className="h-3 w-4/5 skeleton mb-2" />
                  <div className="h-3 w-2/5 skeleton mb-3" />
                  <div className="flex items-center justify-between">
                    <div className="h-3 w-1/3 skeleton" />
                    <div className="h-8 w-8 skeleton" style={{ borderRadius: 9999 }} />
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <>
          <div className="row">
            {products.length === 0 ? (
              <div className="col-12 text-center text-gray-500 py-4">
                No products found.
                {categoryId ? (
                  <div className="mt-3">
                    <Link to="/products" className="tf-btn btn-line-dark fw-normal">
                      View all products
                    </Link>
                  </div>
                ) : null}
              </div>
            ) : null}
            {products.map((item) => {
              const imageArray = item.product_image?.split(",") || [];
              const mainImage = resolveImageUrl(imageArray[0]);
              const hoverImage = resolveImageUrl(imageArray[1] || imageArray[0]);
              const sellingPrice = Number(item?.selling_price ?? 0);
              const originalPrice = Number(item?.price ?? 0);

              return (

                <div
                  key={item.product_id}
                  className="col-md-3 product-padding col-6 mb-4"
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

                    <div className="card-product-info">
                      <a
                        href={`/product/${item.product_id}`}
                        className="name-product text-black link fw-medium text-sm"
                      >
                        {item.product_title}
                      </a>
                      <p className="price-wrap fw-medium mt-1">
                        <span className="price-new text-sm">
                          ₹{Number.isFinite(sellingPrice) ? sellingPrice.toFixed(2) : "0.00"}
                        </span>
                        {Number.isFinite(originalPrice) && originalPrice > 0 && (
                          <span className="price-old text-xs ms-2">
                            ₹{originalPrice.toFixed(2)}
                          </span>
                        )}
                      </p>
                    </div>
                  </div>
                </div>
              );
            })}

          </div>

          {/* {products.length > 0 && categoryId ? (
            <div className="text-center mt-4">
              <Link to="/products" className="tf-btn btn-line-dark fw-normal">
                All products
              </Link>
            </div>
          ) : null} */}
          </>
        )}
      </div>
    </>
  );
};

export default AllProducts;
