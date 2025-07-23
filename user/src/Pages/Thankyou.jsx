import React, { useEffect } from "react";
import Confetti from "react-confetti";
import { useLocation, Link } from "react-router-dom";

const ThankYouPage = () => {
  const location = useLocation();
  const { orderId } = location.state || {};

  const [width, height] = useWindowSize();
useEffect(() => {
  // Prevent horizontal scroll
  document.body.style.overflowX = "hidden";
  return () => {
    document.body.style.overflowX = "auto"; // cleanup on unmount
  };
}, []);

  return (
    <div className="min-h-[80vh] max-w-full overflow-hidden flex flex-col justify-center items-center bg-white text-center p-6">
      <Confetti width={width} height={height} />

      <h1 className="text-3xl font-bold text-green-600 mb-4">Thank you for your order!</h1>
      <p className="text-gray-700 text-lg mb-6">Your order #{orderId || "ID"} has been placed successfully.</p>

      <Link to="/" style={{padding:'10px'}} className="px-6 my-4 mx-2 py-2 bg-black text-white hover:bg-green-700 transition">
        Go to Homepage
      </Link>
    </div>
  );
};

// 👇 Yeh hook yahin define kar do
function useWindowSize() {
  const [size, setSize] = React.useState([window.innerWidth, window.innerHeight]);

  React.useEffect(() => {
    const handleResize = () => setSize([window.innerWidth, window.innerHeight]);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return size;
}

export default ThankYouPage;
