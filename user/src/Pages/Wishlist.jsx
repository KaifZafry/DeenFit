import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { toggleWishlistItem } from "../redux/wishlistSlice";
import { addToCart } from "../redux/CartSlice"; // If you want move to cart
import { FaTrashAlt, FaShoppingCart } from "react-icons/fa";
import { Link } from "react-router-dom";
import { BASE_IMG_URL } from "../utils/Constants";

const WishlistPage = () => {
  const dispatch = useDispatch();
  const wishlistItems = useSelector((state) => state.wishlist.wishlistItems);

  const handleRemove = (item) => {
    dispatch(toggleWishlistItem(item));
  };

  const handleMoveToCart = (item) => {
    dispatch(addToCart(item));
    dispatch(toggleWishlistItem(item)); // Remove from wishlist
  };

  return (
    <div className="container mx-auto p-4">
      <h1
        data-aos="fade-up"
        data-aos-duration="600"
        className="text-lg md:text-xl font-bold mb-4"
      >
        Your Wishlist
      </h1>

      {wishlistItems.length === 0 ? (
        <div className="flex flex-col items-center justify-center text-center py-12">
          <img
            src="https://cdn-icons-png.flaticon.com/512/4076/4076549.png"
            alt="Empty Wishlist"
            className="w-48 h-48 mb-6 opacity-80"
            data-aos="fade-up"
            data-aos-duration="600"
          />
          <h2
            className="text-xl font-semibold mb-2"
            data-aos="fade-up"
            data-aos-duration="600"
          >
            Your wishlist is empty
          </h2>
          <p
            className="text-gray-500"
            data-aos="fade-up"
            data-aos-duration="600"
          >
            Start adding items you love!
          </p>
          <Link
            tp="/products"
            className="mt-4 inline-block bg-black text-white px-4 py-2 hover:bg-gray-800 transition"
          >
            Continue Shopping
          </Link>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {wishlistItems.map((item) => {
            const mainImage = item.product_image.split(",")[0];
            console.log(item.product_image);
            return (
              <div
                key={item.product_id}
                className="border p-4 rounded-lg shadow hover:shadow-md transition"
              >
                <div className="flex justify-center">
                  <img
                    src={BASE_IMG_URL + mainImage} // Adjust based on your product image key
                    alt={item.product_title}
                    className="w-1/2 h-40 object-cover rounded mb-2"
                  />
                </div>

                <h2 className="text-md font-semibold">{item.product_title}</h2>
                <p className="text-gray-600 mb-2">₹{item.selling_price}</p>

                <div className="flex justify-between mt-2">
                  <button
                    onClick={() => handleMoveToCart(item)}
                    className="flex items-center gap-1 px-3 py-1 bg-white text-black border border-black hover:bg-green-600 text-sm"
                  >
                    <FaShoppingCart /> Move to Cart
                  </button>
                  <button
                    onClick={() => handleRemove(item)}
                    className="flex items-center gap-1 px-3 py-2 bg-black text-white  hover:bg-red-600 text-sm"
                  >
                    <FaTrashAlt /> Remove
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default WishlistPage;
