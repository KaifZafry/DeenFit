// pages/Login.jsx
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import "./Login.css"; // We'll create this CSS file
import { MdMarkEmailRead } from "react-icons/md";
import { FaLock } from "react-icons/fa6";
import { BsFillLightningFill } from "react-icons/bs";

const Login = () => {
  const [email, setEmail] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState({});
  
  const navigate = useNavigate();

  const validateEmail = (email) => {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
  };

  const validateForm = () => {
    const newErrors = {};

    if (!email.trim()) {
      newErrors.email = "Email address is required";
    } else if (!validateEmail(email.trim())) {
      newErrors.email = "Please enter a valid email address";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

 const handleLogin = async () => {
  if (!validateForm()) return;
  setIsLoading(true);

  try {
    const res = await fetch("/api/Account/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email: email.trim() }),
    });

    const result = await res.json();
    console.log("Login API response:", result);

    if (res.ok && result.userId) {
      localStorage.setItem("userId", result.userId);
      localStorage.setItem("isLoggedIn", "true");

      // 🔍 Debug: Check what's stored
      const storedRedirect = localStorage.getItem("redirectTo");
      console.log("Current redirectTo:", storedRedirect);
      console.log("Current page:", window.location.pathname);
      
      const redirectTo = storedRedirect || "/";
      
      // ✅ Always clear after reading
      localStorage.removeItem("redirectTo");
      console.log("Redirecting to:", redirectTo);
      
      toast.success("Welcome back to DeenFit! 🎉");
      navigate(redirectTo);
    }
  } catch (err) {
    console.error(err);
    toast.error("An error occurred during login.");
  } finally {
    setIsLoading(false);
  }
};

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleLogin();
    }
  };

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
    // Clear error when user starts typing
    if (errors.email) {
      setErrors({ ...errors, email: '' });
    }
  };

  return (
    <div className="login-page">
      {/* Animated background shapes */}
      <div className="bg-shapes">
        <div className="shape"></div>
        <div className="shape"></div>
        <div className="shape"></div>
      </div>

      <div className="login-container">
        <div className="logo">
          <h1>Welcome Back</h1>
          <p>Sign in to continue your DeenFit journey</p>
        </div>

        <div className="login-form">
          <div className="form-group">
            <label htmlFor="email">Email Address</label>
            <div className="input-wrapper">
              <input
                type="email"
                id="email"
                placeholder="Enter your email address"
                value={email}
                onChange={handleEmailChange}
                onKeyPress={handleKeyPress}
                className={errors.email ? 'error' : ''}
                disabled={isLoading}
              />
              <div className="input-icon"><MdMarkEmailRead /></div>
            </div>
            {errors.email && <div className="error-message">{errors.email}</div>}
          </div>

          <button
            onClick={handleLogin}
            disabled={isLoading}
            className={`btn-primary ${isLoading ? 'loading' : ''}`}
          >
            {isLoading ? (
              <>
                <span className="spinner"></span>
                Signing In...
              </>
            ) : (
              "Sign In to DeenFit"
            )}
          </button>

          <div className="form-features">
            <div className="feature-item">
              <span className="feature-icon"><BsFillLightningFill /></span>
              <span>Quick & Secure Login</span>
            </div>
            <div className="feature-item">
              <span className="feature-icon"><FaLock /></span>
              <span>Your Data is Protected</span>
            </div>
          </div>
        </div>

        <div className="divider">
          <span>New to DeenFit?</span>
        </div>

        <div className="register-prompt">
          <p className="my-3">Join thousands of users on their fitness journey</p>
          <Link to="/register" className="register-link">
            Create Your Account
            <span className="arrow">→</span>
          </Link>
        </div>

      
      </div>
    </div>
  );
};

export default Login;