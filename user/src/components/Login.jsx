import React, { useState } from "react";
import { Link } from "react-router-dom";

const Login = () => {
  const [email, setEmail] = useState("");

  const handleLogin = async () => {
    if (!email) return alert("Please enter your email.");

    try {
      const res = await fetch("/api/Account/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });

      const result = await res.json();
      console.log("Login API response:", result);

      if (res.ok && result.userId) {
        // Save to localStorage
        localStorage.setItem("userId", result.userId);
        localStorage.setItem("isLoggedIn", "true");

        alert("Login successful!");
        window.location.href = "/"; // Redirect after login
      } else {
        alert(result.message || "Login failed. Please try again.");
      }
    } catch (err) {
      console.error(err);
      alert("An error occurred during login.");
    }
  };

  return (
    <div className="min-h-[80vh] flex items-center flex-col justify-center bg-gradient-to-br px-4">
      <div className="bg-white rounded-lg shadow-md w-full max-w-lg p-8">
        <h2 className="text-2xl my-4 font-bold text-center text-yellow-700 mb-6">
          DeenFit Login
        </h2>

    <div className="mx-3">
 <input
          type="email"
          placeholder="Enter your email"
          className="w-full border border-gray-300 rounded-md px-4 py-2 mb-6 focus:outline-none focus:ring-2 focus:ring-yellow-500"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <button
          onClick={handleLogin}
          className="w-full bg-black text-white py-2 my-4 rounded-md hover:bg-gray-700 transition duration-200"
        >
          Login
        </button>
    </div>
       
      </div>

       <div className="w-full max-w-lg">
        <p className="text-start my-4">Don't have an Accoount? <Link className="text-blue-500" to="/register">Register Now</Link></p>
      </div>
    </div>
  );
};

export default Login;
