import React from "react";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { incrementQty, decrementQty, removeFromCart, clearCart } from "../redux/CartSlice";
import { MdDeleteOutline } from "react-icons/md";
import { BASE_IMG_URL } from "../utils/Constants";

const Cart = () => {
  const cartItems = useSelector((state) => state?.cart?.cartItems);
  const dispatch = useDispatch();
  const totalPrice = cartItems.reduce((acc, item) => acc + item.price * item.quantity, 0);

  return (
    <>
      <section className="tf-page-title">
        <div className="container-full">
          <div className="box-title text-center" data-aos="fade-up" data-aos-duration="500">
            <h4 className="title">Shopping Cart</h4>
            <div className="breadcrumb-list">
              <Link className="breadcrumb-item" to="/">
                Home
              </Link>
              <div className="breadcrumb-item dot">
                <span></span>
              </div>
              <div className="breadcrumb-item current">Cart</div>
            </div>
          </div>
        </div>
      </section>

      <div className="container-full">
        <div className="row">
          <div className="col-md-8">
            <div className="cart-page py-3">

              {cartItems.length === 0 ? (
                <div className="flex flex-col items-center justify-center text-center py-12" data-aos="fade-up"
                  data-aos-duration="600">
                  <img
                    src="https://cdn-icons-png.flaticon.com/512/2038/2038854.png"
                    alt="Empty Cart"
                    className="w-32 mb-6 opacity-80"
                  />
                  <h2 className="text-xl font-semibold mb-2">Your cart is empty</h2>
                  <p className="text-gray-500">Looks like you haven't added anything yet.</p>
                  <Link
                    to="/products"
                    className="mt-4  inline-block bg-[#2b1e1a] animate-btn text-white px-4 py-2 animate-btn transition"
                  >
                    Continue Shopping
                  </Link>
                </div>
              ) : (
                <div className="cart-items-container">
                  <div className="d-flex justify-end">
                    <button
                      className=" mt-4 d-flex align-items-center text-lg font-bold animate-btn inline-block bg-[#2b1e1a] text-white px-4 py-2   transition"
                      style={{ fontSize: '14px' }}
                      onClick={() => dispatch(clearCart())}
                    >
                      ClearCart   <MdDeleteOutline />
                    </button>
                  </div>
                  {cartItems.map((item) => {
                    const imageArray = item.product_image?.split(",") || [];
                    const mainImage = BASE_IMG_URL + imageArray[0];

                    return (

                      <div
                        className="cart-item-card gap-3 position-relative flex-md-row flex-col d-flex"
                        data-aos="zoom-in" data-aos-delay='100' data-aos-duration="300" key={item.product_id}
                      >
                        <div className="cart-item-left  d-flex gap-3">
                          <div>
                            <Link to={`/product/${item.product_id}`}>
                              <img
                                src={mainImage}
                                alt={item.name}
                                width={70}
                                className="cart-item-image"
                              />
                            </Link>
                          </div>

                          <div className="cart-item-header">
                            <Link to={`/product/${item.product_id}`}>
                              <h4 className="cart-item-name">{item.product_title}</h4>
                            </Link>
                            <p className="cart-item-variant">{item?.color}/{item?.size}</p>

                          </div>


                        </div>

                        <div className="cart-item-right d-flex justify-content-md-around">

                          <div>
                            <div className="qty-control">
                              <button
                                onClick={() => dispatch(decrementQty(item.product_id))}
                              >
                                -
                              </button>
                              <span>{item.quantity}</span>
                              <button
                                onClick={() => dispatch(incrementQty(item.product_id))}
                              >
                                +
                              </button>
                            </div>
                          </div>
                          <div className="cart-item-controls ">
                            <div className="cart-item-pricing">
                              <p className="price">₹{item.price.toFixed(2)}</p>
                              <p className="total">
                                Total: ₹{(item.price * item.quantity).toFixed(2)}
                              </p>
                            </div>

                          </div>
                          <button
                            className="remove-btn"
                            onClick={() => dispatch(removeFromCart({ product_id: item.product_id, size: item.size }))}
                          >
                            <MdDeleteOutline />
                          </button>

                        </div>
                      </div>
                    )

                  })}
                </div>
              )}

            </div>
          </div>
          <div className="col-md-4" data-aos="fade-up" data-aos-duration="500">
            <div className="tf-page-cart-sidebar my-3">
              <form action="" className="cart-box checkout-cart-box">
                <div className="cart-head">
                  <div id="totalprice" className="total-discount text-xl fw-medium">
                    <span>Total:</span>
                    <span className="total">Rs {totalPrice.toFixed(2)}</span>
                  </div>
                  <p className="text-sm text-dark-4">
                    Taxes and shipping calculated at checkout
                  </p>
                </div>
                <div className="check-agree my-2">
                  <input type="checkbox" className="tf-check" id="check-agree" />
                  <label htmlFor="check-agree" className="label text-dark-4">
                    I agree with{" "}
                    <a
                      href="term-and-condition.html"
                      className="text-dark-4 fw-medium text-underline link"
                    >
                      term and conditions
                    </a>
                  </label>
                </div>
                <Link to='/checkout' className="checkout-btn my-2">
                  <button
                    type="submit"
                    disabled={cartItems.length === 0}
                    className="tf-btn disabled btn-dark2 animate-btn w-100"

                  >
                    Checkout
                  </button>
                </Link>
                <div className="cart-imgtrust">
                  <p className="text-center text-sm text-dark-1">We accept</p>
                  <div className="cart-list-social">
                    <div className="payment-card">
                      <img src="/card/Visa.png" alt="" />
                    </div>
                    <div className="payment-card">
                      <img src="/card/GooglePay.png" alt="" />
                    </div>
                    <div className="payment-card">
                      <img src="/card/Mastercard.png" alt="" />
                    </div>
                    <div className="payment-card">
                      <img src="/card/PayPal.png" alt="" />
                    </div>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Cart;
