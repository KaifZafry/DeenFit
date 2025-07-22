import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { BASE_IMG_URL } from "../utils/Constants";
import { useLocation } from "react-router-dom";

const Checkout = () => {
  const location = useLocation();
  const buyNowProduct = location.state?.buyNow ? location.state.product : null;

  const cartItems = useSelector((state) => state.cart.cartItems);
  const userID = useSelector((state) => state.auth?.userID); // assuming userID is stored here

  const itemsToShow = buyNowProduct
    ? [{ ...buyNowProduct, quantity: 1 }]
    : cartItems;

  const totalPrice = itemsToShow.reduce(
    (acc, item) => acc + item.selling_price * item.quantity,
    0
  );

  const [address, setAddress] = useState({
    street: "",
    apartment: "",
    city: "",
    state: "",
    pin: "",
    country: "India",
  });

  const handleAddressChange = (e) => {
    setAddress({ ...address, [e.target.name]: e.target.value });
  };

  const openRazorpayCheckout = async (e) => {
    e.preventDefault();

    const form = document.getElementById("checkout-form");

    const customerName = form.customerName.value;
    const phone = form.phone.value;
    const paymentMethod = form.paymentMethod.value;

    const shippingAddress = `${address.street}, ${address.apartment ? address.apartment + ", " : ""}${address.city}, ${address.state} - ${address.pin}, ${address.country}`;

    const orderPayload = {
      userID: userID || 4, // make sure this is not missing
      customerName,
      phone,
      shippingAddress,
      paymentMethod,
      orderItems: itemsToShow.map((item) => ({
        productID: item.product_id,
        productName: item.product_title,
        quantity: item.quantity,
        price: item.selling_price,
      })),
    };

    try {
      const res = await fetch("/api/Account/placeorder", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(orderPayload),
      });

      if (res.ok) {
        const data = await res.json();
        console.log(data);
        alert("✅ Order Placed Successfully!");
      } else {
        alert("❌ Failed to place order.");
      }
    } catch (err) {
      console.error(err);
      alert("⚠️ Something went wrong.");
    }
  };

  return (
    <>
      <section className="tf-page-title">
        <div className="container-full">
          <div className="box-title text-center">
            <h4 className="title">Checkout</h4>
            <div className="breadcrumb-list">
              <a className="breadcrumb-item" href="/">
                Home
              </a>
              <div className="breadcrumb-item dot">
                <span></span>
              </div>
              <div className="breadcrumb-item current">Checkout</div>
            </div>
          </div>
        </div>
      </section>

      <div className="flat-spacing-13">
        <div className="container-full">
          <div className="row">
            {/* Left Side: Form */}
            <div className="col-xl-8">
              <div className="checkout-form border border-gray-100 bg-white p-3 rounded shadow-sm">
                <h4 className="mb-4 font-semibold">Customer Information</h4>
                <form id="checkout-form">
                  <div className="mb-4">
                    <label className="block mb-1 font-medium">Name</label>
                    <input
                      type="text"
                      name="customerName"
                      required
                      placeholder="Enter your name"
                      className="w-full border border-gray-300 p-2 rounded"
                    />
                  </div>

                  <div className="mb-4">
                    <label className="block mb-1 font-medium">Phone</label>
                    <input
                      type="tel"
                      name="phone"
                      required
                      placeholder="Enter phone number"
                      className="w-full border border-gray-300 p-2 rounded"
                    />
                  </div>

                  <div className="mb-4">
                    <label className="block mb-1 font-medium">Shipping Address</label>
                    <input
                      type="text"
                      name="street"
                      placeholder="House number and street name"
                      className="w-full p-2 border rounded"
                      onChange={handleAddressChange}
                      required
                    />
                    <input
                      type="text"
                      name="apartment"
                      placeholder="Apartment, suite, unit, etc. (optional)"
                      className="w-full p-2 border rounded mt-2"
                      onChange={handleAddressChange}
                    />
                    <input
                      type="text"
                      name="city"
                      placeholder="Town / City"
                      className="w-full p-2 border rounded mt-2"
                      onChange={handleAddressChange}
                      required
                    />
                    <select
                      name="state"
                      className="w-full p-2 border rounded mt-2"
                      onChange={handleAddressChange}
                      required
                    >
                      <option value="">Select State</option>
                      <option value="Delhi">Delhi</option>
                      <option value="Maharashtra">Maharashtra</option>
                      <option value="Uttar Pradesh">Uttar Pradesh</option>
                    </select>
                    <input
                      type="text"
                      name="pin"
                      placeholder="PIN Code"
                      className="w-full p-2 border rounded mt-2"
                      onChange={handleAddressChange}
                      required
                    />
                  </div>

                  <div className="mb-4">
                    <label className="block mb-1 font-medium">Payment Method</label>
                    <select
                      name="paymentMethod"
                      className="w-full border border-gray-300 p-2 rounded"
                    >
                      <option value="UPI">UPI</option>
                      <option value="COD">Cash on Delivery</option>
                      <option value="Card">Credit/Debit Card</option>
                    </select>
                  </div>
                </form>
              </div>
            </div>

            {/* Right Side: Cart */}
            <div className="col-xl-4">
              <div className="tf-page-cart-sidebar">
                <form className="cart-box order-box">
                  <div className="title text-lg fw-medium">In your cart</div>
                  <ul className="list-order-product">
                    {itemsToShow.map((item) => (
                      <li key={item.product_id} className="order-item">
                        <figure className="img-product">
                          <img
                            src={BASE_IMG_URL + item?.product_image?.split(",")[0]}
                            alt={item.product_title}
                            width={30}
                          />
                          <span className="quantity">{item.quantity}</span>
                        </figure>
                        <div className="content">
                          <div className="info">
                            <p className="name text-sm fw-medium">
                              {item.product_title}
                            </p>
                            <span className="variant">White / L</span>
                          </div>
                          <span className="price text-sm fw-medium">
                            ₹{item.selling_price}
                          </span>
                        </div>
                      </li>
                    ))}
                  </ul>

                  <ul className="list-total">
                    <li className="total-item d-flex justify-between text-sm">
                      <span>Subtotal:</span>
                      <span className="fw-medium">
                        ₹{totalPrice.toFixed(2)}
                      </span>
                    </li>
                    <li className="total-item d-flex justify-between text-sm">
                      <span>Discount:</span>
                      <span className="fw-medium">00</span>
                    </li>
                    <li className="total-item d-flex justify-between text-sm">
                      <span>Shipping:</span>
                      <span className="fw-medium">00</span>
                    </li>
                    <li className="total-item d-flex justify-between text-sm">
                      <span>Tax:</span>
                      <span className="fw-medium">00</span>
                    </li>
                  </ul>

                  <div className="subtotal d-flex justify-between text-lg fw-medium mt-3">
                    <span>Total:</span>
                    <span className="total-price-order">₹{totalPrice.toFixed(2)}</span>
                  </div>

                  <div className="btn-order mt-4">
                    <button
                      onClick={openRazorpayCheckout}
                      type="submit"
                      className="tf-btn btn-dark2 animate-btn w-100 text-transform-none"
                    >
                      Place order
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Checkout;