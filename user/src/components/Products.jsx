import React, { useEffect, useState } from "react";
import { CiShoppingCart } from "react-icons/ci";
import { FaHeart, FaRegHeart } from "react-icons/fa";
import { Link } from "react-router-dom";
import { toggleWishlistItem } from '../redux/WishListSlice';
import { resolveImageUrl } from "../utils/resolveImageUrl";
import { useDispatch, useSelector } from "react-redux";
import { addToCart } from "../redux/CartSlice";
import { toast } from "react-toastify";
import { apiFetch } from "../utils/api";

const Products = ({categoryId,title}) => {
  const [products, setAllProducts] = useState([]);
  const [loading, setLoading] = useState(true)

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

  const wishlistItems = useSelector((state) => state.wishlist.wishlistItems);



  useEffect(() => {
    setLoading(true);
    const FetchAllProduct = async () => {
      try {
        const res = await apiFetch(
          categoryId
            ? `/api/Account/getproductsbycategory/${categoryId}`
            : `/api/Account/getallproducts`
        );
        if (!res.ok) throw new Error(`HTTP ${res.status}`);
        const data = await res.json();
        setAllProducts(data?.data || []);
      } catch (err) {
        console.error("Error fetching products:", err);
        setAllProducts([]);
      } finally {
        setLoading(false);
      }
    };
    FetchAllProduct();
  }, [categoryId]);

  // Hide section entirely when there are no products (prevents empty blocks on Home)
  if (!loading && products.length === 0) return null;

  return (
    <div className="container-full">
      <div
        data-aos="fade-up"
        data-aos-duration="500"
        className="flat-title my-4 wow fadeInUp"
      >
        <h4 className="title font-7">{title}</h4>
        <p className="desc text-main font-13 fs-16">
          Explore our most popular pieces that customers can't get enough of
        </p>
       
      </div>

      {loading ? (
        <div className="grid-cls grid-cls-v6 wow fadeInUp" data-aos="zoom-in" data-aos-duration="500">
          {Array.from({ length: 4 }).map((_, idx) => (
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

        <div className="row">
          {products.map((item) => {
            const imageArray = item.product_image?.split(",") || [];
            const mainImage = resolveImageUrl(imageArray[0]);
            const hoverImage = resolveImageUrl(imageArray[1] || imageArray[0]); // fallback to main image
            const sellingPrice = Number(item?.selling_price ?? 0);
            const originalPrice = Number(item?.price ?? 0);

            const isInWishlist = wishlistItems.some(
              (wishlistItem) => wishlistItem.product_id === item.product_id
            );

            const handleWishlistClick = (e) => {
              e.preventDefault();
              dispatch(toggleWishlistItem(item));
            };

            return (
              <div
                key={item.product_id}
                className="col-md-3 col-6 mb-4 product-padding"
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
                          onClick={handleWishlistClick}
                          className="hover-tooltip tooltip-left box-icon"
                        >
                          {isInWishlist ? (
                            <FaHeart className="text-red-500 transition duration-200" />
                          ) : (
                            <FaRegHeart className="text-gray-500 hover:text-red-500 transition duration-200" />
                          )}
                          <span className="tooltip">
                            {isInWishlist ? 'Remove from Wishlist' : 'Add to Wishlist'}
                          </span>
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
                    <p className="price-wrap fw-large mt-1">
                      <span className="text-md text-black font-bold">
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
      )}
    </div>
  );
};
export default Products;
