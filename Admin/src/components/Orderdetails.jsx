import React, { useEffect, useState } from "react";

const OrderDetails = () => {
  const [orderId, setOrderId] = useState("1");
  const [item, setItem] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    if (!orderId.trim()) return;
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
    <div className="p-4 max-w-md mx-auto">
      <input
        type="text"
        className="border p-2 w-full mb-3 rounded"
        placeholder="Enter Order ID"
        value={orderId}
        onChange={(e) => setOrderId(e.target.value)}
      />
      {loading && <p className="text-blue-500">Loading...</p>}
      {error && <p className="text-red-500">{error}</p>}
      {item && !loading && !error && (
        <pre className="bg-gray-100 p-3 rounded text-sm">
          {JSON.stringify(item, null, 2)}
        </pre>
      )}
    </div>
  );
};

export default OrderDetails;
