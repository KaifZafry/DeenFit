import React from "react";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { incrementQty, decrementQty, removeFromCart } from "../redux/CartSlice";
import { MdDeleteOutline } from "react-icons/md";

const Cart = () => {
  const cartItems = useSelector((state) => state.cart.cartItems);
  const dispatch = useDispatch();
  const totalPrice = cartItems.reduce((acc, item) => acc + item.price * item.quantity, 0);

  return (
    <>
      <section className="tf-page-title">
        <div className="container">
          <div className="box-title text-center">
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
                <p>Your cart is empty</p>
              ) : (
                <div className="cart-items-container">
                  {cartItems.map((item) => (
                    <div
                      className="cart-item-card gap-3 position-relative flex-md-row flex-col d-flex"
                      key={item.id}
                    >
                      <div className="cart-item-left d-flex gap-3">
                       <div>
 <img
                          src={item.image}
                          alt={item.name}
                          width={70}
                          className="cart-item-image"
                        />
                       </div>
                       
                        <div className="cart-item-header">
                          <h4 className="cart-item-name">{item.name}</h4>
                          <p className="cart-item-variant">White / L</p>
                        </div>
                      </div>

                      <div className="cart-item-right d-flex">
                        
                    <div>
                        <div className="qty-control">
                          <button
                            onClick={() => dispatch(decrementQty(item.id))}
                          >
                            -
                          </button>
                          <span>{item.quantity}</span>
                          <button
                            onClick={() => dispatch(incrementQty(item.id))}
                          >
                            +
                          </button>
                        </div>
</div>
                        <div className="cart-item-controls">
                          <div className="cart-item-pricing">
                            <p className="price">₹{item.price.toFixed(2)}</p>
                            <p className="total">
                              Total: ₹{(item.price * item.quantity).toFixed(2)}
                            </p>
                          </div>
                            <button
                          className="remove-btn"
                          onClick={() => dispatch(removeFromCart(item.id))}
                        >
                          <MdDeleteOutline />
                        </button>
                        </div>

                      
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
          <div className="col-md-4">
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
                <div className="check-agree">
                  <input type="checkbox" className="tf-check" id="check-agree" />
                  <label for="check-agree" className="label text-dark-4">
                    I agree with{" "}
                    <a
                      href="term-and-condition.html"
                      className="text-dark-4 fw-medium text-underline link"
                    >
                      term and conditions
                    </a>
                  </label>
                </div>
                <Link to='/checkout' className="checkout-btn">
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
