import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { BASE_IMG_URL } from "../utils/Constants";

const Checkout = () => {
  const cartItems = useSelector((state) => state.cart.cartItems);
  const dispatch = useDispatch();
  const totalPrice = cartItems.reduce(
    (acc, item) => acc + item.price * item.quantity,
    0
  );

  return (
    <>
      <section className="tf-page-title">
        <div className="container">
          <div className="box-title text-center">
            <h4 className="title">Checkout</h4>
            <div className="breadcrumb-list">
              <a className="breadcrumb-item" href="index.html">
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
        <div className="container">
          <div className="row">
            <div className="col-xl-8">
              <form className="tf-checkout-cart-main">
                <div className="box-ip-checkout">
                  <div className="title text-lg fw-medium">Checkout</div>
                  <div className="grid-2 mb_16">
                    <div className="tf-field style-2 style-3">
                      <input
                        className="tf-field-input tf-input"
                        id="firstname"
                        placeholder=" "
                        type="text"
                        name="firstname"
                      />
                      <label className="tf-field-label" for="firstname">
                        First name
                      </label>
                    </div>
                    <div className="tf-field style-2 style-3">
                      <input
                        className="tf-field-input tf-input"
                        id="lastname"
                        placeholder=" "
                        type="text"
                        name="lastname"
                      />
                      <label className="tf-field-label" for="lastname">
                        Last name
                      </label>
                    </div>
                  </div>
                  <fieldset className="tf-field style-2 style-3 mb_16">
                    <input
                      className="tf-field-input tf-input"
                      id="country"
                      type="text"
                      name="country"
                      placeholder=" "
                    />
                    <label className="tf-field-label" for="country">
                      Country
                    </label>
                  </fieldset>
                  <fieldset className="tf-field style-2 style-3 mb_16">
                    <input
                      className="tf-field-input tf-input"
                      id="address"
                      type="text"
                      name="address"
                      placeholder=""
                    />
                    <label className="tf-field-label" for="address">
                      Address
                    </label>
                  </fieldset>
                  <fieldset className="tf-field style-2 style-3 mb_16">
                    <input
                      type="text"
                      className="tf-field-input tf-input"
                      name="apartment"
                      placeholder=""
                    />
                    <label className="tf-field-label" for="apartment">
                      Apartment, suite, etc (optional)
                    </label>
                  </fieldset>
                  <div className="grid-3 mb_16">
                    <fieldset className="tf-field style-2 style-3">
                      <input
                        className="tf-field-input tf-input"
                        id="city"
                        type="text"
                        name="city"
                        placeholder=""
                      />
                      <label className="tf-field-label" for="city">
                        City
                      </label>
                    </fieldset>
                    <div className="tf-select select-square">
                      <select name="State" id="state">
                        <option value="">State</option>
                        <option value="alabama">Alabama</option>
                        <option value="alaska">Alaska</option>
                        <option value="california">California</option>
                        <option value="hawaii">Hawaii</option>
                        <option value="texas">Texas</option>
                        <option value="georgia">Georgia</option>
                      </select>
                    </div>
                    <fieldset className="tf-field style-2 style-3">
                      <input
                        className="tf-field-input tf-input"
                        id="code"
                        type="text"
                        name="zipcode"
                        placeholder=""
                      />
                      <label className="tf-field-label" for="code">
                        Zipcode/Postal
                      </label>
                    </fieldset>
                  </div>
                  <fieldset className="tf-field style-2 style-3 mb_16">
                    <input
                      className="tf-field-input tf-input"
                      id="phone"
                      type="text"
                      name="phone"
                      placeholder=""
                    />
                    <label className="tf-field-label" for="phone">
                      Phone
                    </label>
                  </fieldset>
                </div>
                <div className="box-ip-contact">
                  <div className="title">
                    <div className="text-lg fw-medium">Contact Information</div>
                    <a
                      href="#login"
                      data-bs-toggle="offcanvas"
                      className="text-sm link"
                    >
                      Log in
                    </a>
                  </div>
                  <fieldset className="tf-field style-2 style-3">
                    <input
                      className="tf-field-input tf-input"
                      id="email/phone"
                      placeholder=" "
                      type="text"
                      name="email/phone"
                    />
                    <label className="tf-field-label" for="email/phone">
                      Email or phone number
                    </label>
                  </fieldset>
                </div>
                <div className="box-ip-shipping">
                  <div className="title text-lg fw-medium">Shipping Method</div>
                  <fieldset className="mb_16">
                    <label for="freeship" className="check-ship">
                      <input
                        type="radio"
                        id="freeship"
                        className="tf-check-rounded"
                        name="checkshipping"
                      />
                      <span className="text text-sm">
                        <span>
                          Free Shipping (Estimate in 7/10 - 10/10/2025)
                        </span>
                        <span className="price">$00.00</span>
                      </span>
                    </label>
                  </fieldset>
                  <fieldset>
                    <label for="expship" className="check-ship">
                      <input
                        type="radio"
                        id="expship"
                        className="tf-check-rounded"
                        name="checkshipping"
                        checked=""
                      />
                      <span className="text text-sm">
                        <span>
                          Express Shipping (Estimate in 4/10 - 5/10/2025)
                        </span>
                        <span className="price">$10.00</span>
                      </span>
                    </label>
                  </fieldset>
                </div>
                <div className="box-ip-payment">
                  <div className="title">
                    <div className="text-lg fw-medium mb_4">Payment</div>
                    <p className="text-sm text-main">
                      All transactions are secure and encrypted.
                    </p>
                  </div>
                  <fieldset className="mb_12">
                    <label for="bank-transfer" className="check-payment">
                      <input
                        type="checkbox"
                        id="bank-transfer"
                        className="tf-check-rounded"
                        name="bank-transfer"
                      />
                      <span className="text-payment text-sm">
                        Direct bank transfer
                      </span>
                    </label>
                  </fieldset>
                  <p className="mb_16 text-main">
                    Make your payment directly into our bank account. Please use
                    your Order ID as the payment reference.Your order will not
                    be shipped until the funds have cleared in our account.
                  </p>
                  <div className="payment-method-box" id="payment-method-box">
                    <div className="payment-item mb_16">
                      <label
                        for="delivery"
                        className="payment-header collapsed"
                        data-bs-toggle="collapse"
                        data-bs-target="#delivery-payment"
                        aria-controls="delivery-payment"
                      >
                        <input
                          type="radio"
                          name="payment-method"
                          className="tf-check-rounded"
                          id="delivery"
                        />
                        <span className="pay-title text-sm">
                          Cash on delivery
                        </span>
                      </label>
                      <div
                        id="delivery-payment"
                        className="collapse"
                        data-bs-parent="#payment-method-box"
                      ></div>
                    </div>
                    <div className="payment-item mb_16">
                      <label
                        for="credit-card"
                        className="payment-header"
                        data-bs-toggle="collapse"
                        data-bs-target="#credit-card-payment"
                        aria-controls="credit-card-payment"
                      >
                        <input
                          type="radio"
                          name="payment-method"
                          className="tf-check-rounded"
                          id="credit-card"
                          checked=""
                        />
                        <span className="pay-title text-sm">Credit Card</span>
                      </label>
                      <div
                        id="credit-card-payment"
                        className="collapse show"
                        data-bs-parent="#payment-method-box"
                      >
                        <div className="payment-body">
                          <fieldset className="ip-card mb_16">
                            <input
                              type="text"
                              className="style-2"
                              placeholder="Card number"
                            />
                            <img
                              className="card-logo"
                              width="41"
                              height="12"
                              src="images/payment/visa-2.png"
                              alt="card"
                            />
                          </fieldset>
                          <div className="grid-2 mb_16">
                            <input
                              type="text"
                              className="style-2"
                              placeholder="Expiration date (MM/YY)"
                            />
                            <input
                              type="text"
                              className="style-2"
                              placeholder="Sercurity code"
                            />
                          </div>
                          <fieldset className="mb_16">
                            <input
                              type="text"
                              className="style-2"
                              placeholder="Name on card"
                            />
                          </fieldset>
                          <div className="cb-ship">
                            <input
                              type="checkbox"
                              checked=""
                              className="tf-check"
                              id="checkShip"
                            />
                            <label
                              for="checkShip"
                              className="text-sm text-main"
                            >
                              Use shipping address as billing address
                            </label>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="payment-item paypal-payment mb_16">
                      <label
                        for="paypal"
                        className="payment-header collapsed"
                        data-bs-toggle="collapse"
                        data-bs-target="#paypal-payment"
                        aria-controls="paypal-payment"
                      >
                        <input
                          type="radio"
                          name="payment-method"
                          className="tf-check-rounded"
                          id="paypal"
                        />
                        <span className="pay-title text-sm">
                          PayPal
                          <img
                            className="card-logo"
                            width="78"
                            height="20"
                            src="/card/PayPal.png"
                            alt="apple"
                          />
                        </span>
                      </label>
                      <div
                        id="paypal-payment"
                        className="collapse"
                        data-bs-parent="#payment-method-box"
                      ></div>
                    </div>
                  </div>
                  <p className="text-dark-6 text-sm">
                    Your personal data will be used to process your order,
                    support your experience throughout this website, and for
                    other purposes described in our{" "}
                    <a
                      href="privacy-policy.html"
                      className="fw-medium text-decoration-underline link text-sm"
                    >
                      privacy policy.
                    </a>
                  </p>
                </div>
              </form>
            </div>
            <div className="col-xl-4">
              <div className="tf-page-cart-sidebar">
                <form action="thank-you.html" className="cart-box order-box">
                  <div className="title text-lg fw-medium">In your cart</div>
                  <ul className="list-order-product">
                    {cartItems.map((item) => (
                      <li className="order-item">
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
                           ₹{item.price}
                          </span>
                        </div>
                      </li>
                    ))}
                  </ul>
                  <ul className="list-total">
                    <li className="total-item text-sm d-flex justify-content-between">
                      <span>Subtotal:</span>
                      <span className="price-sub fw-medium">
                        {totalPrice.toFixed(2)}
                      </span>
                    </li>
                    <li className="total-item text-sm d-flex justify-content-between">
                      <span>Discount:</span>
                      <span className="price-discount fw-medium">
                        00
                      </span>
                    </li>
                    <li className="total-item text-sm d-flex justify-content-between">
                      <span>Shipping:</span>
                      <span className="price-ship fw-medium">00</span>
                    </li>
                    <li className="total-item text-sm d-flex justify-content-between">
                      <span>Tax:</span>
                      <span className="price-tax fw-medium">00</span>
                    </li>
                  </ul>
                  <div className="subtotal text-lg fw-medium d-flex justify-content-between">
                    <span>Subtotal:</span>
                    <span className="total-price-order"> {totalPrice.toFixed(2)}</span>
                  </div>
                  <div className="btn-order">
                    <button
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
