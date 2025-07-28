// pages/Register.jsx
import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import "./Register.css"; 
import { MdMarkEmailRead, MdTimer } from "react-icons/md";
import { SiGnuprivacyguard } from "react-icons/si";
import { IoPersonAdd } from "react-icons/io5";
import { FaMobileRetro } from "react-icons/fa6";

const Register = () => {
  const [step, setStep] = useState(1);
  const [name, setName] = useState("");
  const [mobile, setMobile] = useState("");
  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState("");
  const [generatedOtp, setGeneratedOtp] = useState("");
  const [otpExpireTime, setOtpExpireTime] = useState(null);
  const [timer, setTimer] = useState(90);
  const [isSending, setIsSending] = useState(false);
  const [canResend, setCanResend] = useState(true);
  const [errors, setErrors] = useState({});

  const navigate = useNavigate();

  useEffect(() => {
    let interval;
    if (otpExpireTime && Date.now() < otpExpireTime) {
      interval = setInterval(() => {
        const remaining = Math.floor((otpExpireTime - Date.now()) / 1000);
        setTimer(remaining > 0 ? remaining : 0);
        if (remaining <= 0) clearInterval(interval);
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [otpExpireTime]);

  const validateForm = () => {
    const newErrors = {};
    
    if (!name.trim()) {
      newErrors.name = "Full name is required";
    } else if (name.trim().length < 2) {
      newErrors.name = "Name must be at least 2 characters";
    }

    if (!mobile.trim()) {
      newErrors.mobile = "Mobile number is required";
    } else if (!/^\d{10}$/.test(mobile.trim())) {
      newErrors.mobile = "Please enter a valid 10-digit mobile number";
    }

    if (!email.trim()) {
      newErrors.email = "Email address is required";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim())) {
      newErrors.email = "Please enter a valid email address";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const generateOtp = () => {
    const newOtp = Math.floor(100000 + Math.random() * 900000).toString();
    setGeneratedOtp(newOtp);
    setOtpExpireTime(Date.now() + 90000); // 90 seconds
    setTimer(90);
    return newOtp;
  };

  const sendOtp = async () => {
    if (!validateForm()) return;
    if (isSending || !canResend) return;

    setIsSending(true);
    const otpCode = generateOtp();
    const subject = "Your DeenFit OTP Code";
    const body = `Dear ${name},\n\nYour OTP code is: ${otpCode}\nIt will expire in 90 seconds.`;

    try {
      const res = await fetch("/api/Email/send", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, subject, body }),
      });

      const result = await res.text();
      if (res.ok && result.toLowerCase().includes("otp sent")) {
        setStep(2);
        setCanResend(false);
        setTimeout(() => setCanResend(true), 90000);
        toast.success("OTP sent successfully! Check your email.");
      } else {
        toast.warn("Failed to send OTP.");
      }
    } catch (err) {
      console.error(err);
      toast.error("Error sending OTP.");
    } finally {
      setIsSending(false);
    }
  };

  const verifyOtp = async () => {
    if (!otp.trim()) {
      toast.error("Please enter the OTP");
      return;
    }

    if (Date.now() > otpExpireTime) {
      toast.error("OTP expired. Please try again.");
      return;
    }

    if (otp === generatedOtp) {
      try {
        const res = await fetch("/api/Account/register", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            fullName: name,
            email: email,
            mobile: mobile,
          }),
        });

        const result = await res.json();
        console.log("Register API response:", result);

        if (res.ok && result.userId) {
        localStorage.setItem("userId", result.userId);
        localStorage.setItem("isLoggedIn", "true");
        
        // 🔍 Debug
        const storedRedirect = localStorage.getItem("redirectTo");
        console.log("Register - Current redirectTo:", storedRedirect);
        
        const redirectTo = storedRedirect || "/";
        
        // ✅ Clear after reading
        localStorage.removeItem("redirectTo");
        console.log("Register - Redirecting to:", redirectTo);
        
        toast.success("Registration successful!");
        navigate(redirectTo);
      } else {
          toast.warn(result.message || "Registration failed.");
        }
      } catch (err) {
        console.error(err);
        toast.error("Error during registration.");
      }
    } else {
      toast.error("Invalid OTP");
    }
  };

  const resendOtp = () => {
    if (canResend && !isSending) {
      sendOtp();
    }
  };

  const formatTimer = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  return (
    <div className="register-page">
      {/* Animated background shapes */}
      <div className="bg-shapes">
        <div className="shape"></div>
        <div className="shape"></div>
        <div className="shape"></div>
      </div>

      <div className="register-container">
        {/* Progress indicator */}
        <div className="progress-indicator">
          <div className={`progress-step ${step >= 1 ? 'active' : ''}`}>
            <div className="step-number">1</div>
            <span>Details</span>
          </div>
          <div className="progress-line"></div>
          <div className={`progress-step ${step >= 2 ? 'active' : ''}`}>
            <div className="step-number">2</div>
            <span>Verify</span>
          </div>
        </div>

        <div className="logo">
          <h1>Join DeenFit</h1>
          <p>Create your account and start your journey</p>
        </div>

        {step === 1 ? (
          <div className="step-content">
            <div className="form-group">
              <label htmlFor="name">Full Name</label>
              <div className="input-wrapper">
                <input
                  type="text"
                  id="name"
                  placeholder="Enter your full name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className={errors.name ? 'error' : ''}
                />
                <div className="input-icon"><IoPersonAdd /></div>
              </div>
              {errors.name && <div className="error-message">{errors.name}</div>}
            </div>

            <div className="form-group">
              <label htmlFor="mobile">Mobile Number</label>
              <div className="input-wrapper">
                <input
                  type="tel"
                  id="mobile"
                  placeholder="Enter your mobile number"
                  value={mobile}
                  onChange={(e) => setMobile(e.target.value)}
                  className={errors.mobile ? 'error' : ''}
                />
                <div className="input-icon"><FaMobileRetro /></div>
              </div>
              {errors.mobile && <div className="error-message">{errors.mobile}</div>}
            </div>

            <div className="form-group">
              <label htmlFor="email">Email Address</label>
              <div className="input-wrapper">
                <input
                  type="email"
                  id="email"
                  placeholder="Enter your email address"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className={errors.email ? 'error' : ''}
                />
                <div className="input-icon"><MdMarkEmailRead /></div>
              </div>
              {errors.email && <div className="error-message">{errors.email}</div>}
            </div>

            <button
              onClick={sendOtp}
              disabled={isSending || !canResend}
              className={`btn-primary ${isSending || !canResend ? 'loading' : ''}`}
            >
              {isSending ? (
                <>
                  <span className="spinner"></span>
                  Sending OTP...
                </>
              ) : !canResend ? (
                "Please wait..."
              ) : (
                "Send OTP"
              )}
            </button>
          </div>
        ) : (
          <div className="step-content">
            <div className="otp-info">
              <h3>Verify Your Email</h3>
              <p>We've sent a 6-digit code to <strong>{email}</strong></p>
            </div>

            <div className="form-group">
              <label htmlFor="otp">Enter OTP</label>
              <div className="input-wrapper">
                <input
                  type="text"
                  id="otp"
                  placeholder="Enter 6-digit OTP"
                  value={otp}
                  onChange={(e) => setOtp(e.target.value)}
                  maxLength="6"
                />
                <div className="input-icon"><SiGnuprivacyguard /></div>
              </div>
            </div>

            <div className="timer-section">
              <div className="timer-display">
                <span className="timer-icon"><MdTimer /></span>
                <span>Code expires in: <strong>{formatTimer(timer)}</strong></span>
              </div>
              {timer === 0 && (
                <button 
                  onClick={resendOtp}
                  className="resend-btn"
                  disabled={isSending}
                >
                  Resend OTP
                </button>
              )}
            </div>

            <button
              onClick={verifyOtp}
              className="btn-primary verify-btn"
              disabled={!otp.trim() || timer === 0}
            >
              Verify & Complete Registration
            </button>

            <button
              onClick={() => setStep(1)}
              className="btn-secondary"
            >
              ← Back to Details
            </button>
          </div>
        )}

        <div className="login-prompt">
          Already have an account? <Link to="/login">Sign in here</Link>
        </div>
      </div>
    </div>
  );
};

export default Register;