// pages/Login.jsx
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import "./Login.css"; // We'll create this CSS file
import { MdMarkEmailRead } from "react-icons/md";
import { FaLock } from "react-icons/fa6";
import { BsFillLightningFill } from "react-icons/bs";
import { GoogleLogin } from "@react-oauth/google";
import { jwtDecode } from "jwt-decode";

const Login = () => {
  const [email, setEmail] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState({});
  const navigate = useNavigate();

  const validateEmail = (email) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

  const validateForm = () => {
    const newErrors = {};
    if (!email.trim()) newErrors.email = "Email address is required";
    else if (!validateEmail(email.trim()))
      newErrors.email = "Please enter a valid email address";

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
      if (res.ok && result.userId) {
        localStorage.setItem("userId", result.userId);
        localStorage.setItem("isLoggedIn", "true");

        const redirectTo = localStorage.getItem("redirectTo") || "/";
        localStorage.removeItem("redirectTo");

        toast.success("Welcome back to CalliWear! 🎉");
        navigate(redirectTo);
      }
    } catch (err) {
      toast.error("An error occurred during login.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      handleLogin();
    }
  };

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
    // Clear error when user starts typing
    if (errors.email) {
      setErrors({ ...errors, email: "" });
    }
  };

  // ✅ Google Login handler
  const handleGoogleSuccess = async (credentialResponse) => {
    try {
      const decoded = jwtDecode(credentialResponse.credential);
      const email = decoded?.email;
      console.log(email)
      if (!email) {
        toast.error("Unable to fetch email from Google.");
        return;
      }

      // Send token to your backend for verification
      const res = await fetch("/api/Account/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: email}),
      });

      const result = await res.json();
      if (res.ok && result.userId) {
        localStorage.setItem("userId", result.userId);
        localStorage.setItem("isLoggedIn", "true");

        const redirectTo = localStorage.getItem("redirectTo") || "/";
        localStorage.removeItem("redirectTo");

        toast.success(`Welcome ${decoded?.name} 🎉`);
        navigate(redirectTo);
      } else {
        toast.error(result.message || "Google login failed.");
      }
    } catch (err) {
      toast.error("Google login error.");
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
          <p>Sign in to continue your CalliWear journey</p>
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
                className={errors.email ? "error" : ""}
                disabled={isLoading}
              />
              <div className="input-icon">
                <MdMarkEmailRead />
              </div>
            </div>
            {errors.email && (
              <div className="error-message">{errors.email}</div>
            )}
          </div>

          <button
            onClick={handleLogin}
            disabled={isLoading}
            className={`btn-primary ${isLoading ? "loading" : ""}`}
          >
            {isLoading ? (
              <>
                <span className="spinner"></span>
                Signing In...
              </>
            ) : (
              "Sign In to CalliWear"
            )}
          </button>

          <div className="divider">OR</div>

          {/* Google Login Button */}
          <GoogleLogin
            onSuccess={handleGoogleSuccess}
            onError={() => toast.error("Google login failed.")}
          />

          <div className="form-features">
            <div className="feature-item">
              <span className="feature-icon">
                <BsFillLightningFill />
              </span>
              <span>Quick & Secure Login</span>
            </div>
            <div className="feature-item">
              <span className="feature-icon">
                <FaLock />
              </span>
              <span>Your Data is Protected</span>
            </div>
          </div>
        </div>

        <div className="divider">
          <span>New to CalliWear?</span>
        </div>

        <div className="register-prompt">
          <p className="my-3">
            Join thousands of users on their CalliWear journey
          </p>
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
