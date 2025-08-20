import React, { useEffect, useState } from "react";

const OrderDetails = () => {
  const [orderId, setOrderId] = useState("");
  const [item, setItem] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    if (!orderId.trim()) {
      setItem(null);
      return;
    }
    const timer = setTimeout(async () => {
      try {
        setLoading(true);
        setError("");
        const res = await fetch(`/api/account/getorderbyid/${orderId}`);
        if (!res.ok) throw new Error("Failed to fetch order");
        const data = await res.json();
        setItem(data);
      } catch (err) {
        setError(err.message);
        setItem(null);
      } finally {
        setLoading(false);
      }
    }, 500); // debounce

    return () => clearTimeout(timer);
  }, [orderId]);

  return (
    <div className="p-6 container mx-auto h-[100vh] overflow-y-auto">
      {/* Input */}
      <input
        type="text"
        className="border p-3 w-full mb-5 rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none"
        placeholder="Enter Order ID"
        value={orderId}
        onChange={(e) => setOrderId(e.target.value)}
      />

      {/* Loading & Error */}
      {loading && <BounceLoader color="#155DFC" />}
      {error && <p className="text-red-500 font-medium">{error}</p>}

      {/* Order Details */}
      {item && !loading && !error && (
        <div className="bg-white shadow-lg rounded-xl overflow-hidden border">
          {/* Header */}
          <div className="bg-indigo-600 text-white px-6 py-4">
            <h2 className="text-xl font-semibold">
              Order #{item?.orderID} — {item?.currentStatus}
            </h2>
            <p className="text-sm opacity-90">
              Placed on {new Date(item?.orderDate).toLocaleString()}
            </p>
          </div>

          {/* Customer Info */}
          <div className="p-6 border-b">
            <h3 className="text-lg font-semibold mb-2">Customer Details</h3>
            <p><span className="font-medium">Name:</span> {item?.customerName}</p>
            <p><span className="font-medium">Phone:</span> {item?.phone}</p>
            <p><span className="font-medium">Address:</span> {item?.shippingAddress}</p>
            <p><span className="font-medium">Payment:</span> {item?.paymentMethod}</p>
          </div>

          {/* Items */}
          <div className="p-6">
            <h3 className="text-lg font-semibold mb-3">Order Items</h3>
            <div className="space-y-3">
              {item.orderItems.map((prod) => (
                <div
                  key={prod?.orderItemID}
                  className="flex justify-between items-center bg-gray-50 p-3 rounded-lg"
                >
                  <div>
                    <p className="font-medium">{prod?.productName}</p>
                    <p className="text-sm text-gray-600">
                      Qty: {prod?.quantity} × ₹{prod.price}
                    </p>
                  </div>
                  <p className="font-semibold text-gray-800">₹{prod?.subtotal}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Footer */}
          <div className="bg-gray-100 px-6 py-4 flex justify-between items-center">
            <span className="font-medium">Total Amount:</span>
            <span className="text-xl font-bold text-indigo-600">₹{item?.totalAmount}</span>
          </div>
        </div>
      )}
    </div>
  );
};

export default OrderDetails;
