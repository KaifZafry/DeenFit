// pages/Register.jsx - Optimized Version
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
  const [sendingProgress, setSendingProgress] = useState(0); // Progress indicator

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

  // Progress simulation for better UX
  useEffect(() => {
    let progressInterval;
    if (isSending) {
      setSendingProgress(0);
      progressInterval = setInterval(() => {
        setSendingProgress(prev => {
          if (prev >= 90) return prev; // Stop at 90%, complete when API responds
          return prev + Math.random() * 15;
        });
      }, 200);
    } else {
      setSendingProgress(0);
    }
    return () => clearInterval(progressInterval);
  }, [isSending]);

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

  // Optimized OTP sending with immediate UI update
  const sendOtp = async () => {
    if (!validateForm()) return;
    if (isSending || !canResend) return;

    setIsSending(true);
    
    // 🚀 OPTIMIZATION 1: Generate OTP and update UI immediately
    const otpCode = generateOtp();
    
    // 🚀 OPTIMIZATION 2: Move to next step immediately for better UX
    setTimeout(() => {
      setStep(2);
      setSendingProgress(100);
      toast.success("Moving to verification step...");
    }, 500); // Small delay for smooth transition

    const subject = "Your DeenFit OTP Code";
    const body = `
  <div style="font-family: Arial, sans-serif; max-width: 600px; margin: auto; padding: 30px; border: 1px solid #eee; border-radius: 10px; background-color: #f9f9f9;">
    <div style="text-align: center; margin-bottom: 20px;">
      <img src="https://deenfit.store/logo.png" alt="DeenFit Logo" style="height: 60px;" />
    </div>
    <h2 style="color: #222;">Your OTP Code</h2>
    <p>Dear <strong>${name}</strong>,</p>
    <p>Use the following OTP to complete your authentication:</p>
    <div style="font-size: 28px; font-weight: bold; color: #0c6cf2; background: #fff; padding: 15px 30px; display: inline-block; border-radius: 8px; border: 1px dashed #ccc;">
      ${otpCode}
    </div>
    <p style="margin-top: 20px;">This code is valid for <strong>90 seconds</strong>. Please do not share it with anyone.</p>
    <p style="font-size: 14px; color: #888; margin-top: 40px;">— Team DeenFit</p>
  </div>
`;


    try {
      // 🚀 OPTIMIZATION 3: Send email in background
      const emailPromise = fetch("/api/Email/send", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, subject, body, isHtml: true }),
      });

      // Set cooldown timer immediately
      setCanResend(false);
      setTimeout(() => setCanResend(true), 90000);

      // Handle email response in background
      const res = await emailPromise;
      const result = await res.text();
      
      if (res.ok && result.toLowerCase().includes("otp sent")) {
        toast.success("OTP sent to your email! 📧");
      } else {
        toast.warn("Email sending delayed, but you can still enter OTP when received");
      }
    } catch (err) {
      console.error("Email sending error:", err);
      toast.warn("Email sending delayed, please wait for OTP");
    } finally {
      setIsSending(false);
      setSendingProgress(0);
    }
  };

  // Optimized OTP verification with timeout handling
  const verifyOtp = async () => {
    if (!otp.trim()) {
      toast.error("Please enter the OTP");
      return;
    }

    // 🚀 OPTIMIZATION 4: More flexible OTP validation
    if (Date.now() > otpExpireTime) {
      toast.error("OTP expired. Please request a new one.");
      return;
    }

    if (otp === generatedOtp) {
      // Show success immediately
      toast.success("OTP verified! Completing registration...");
      
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
          
          const storedRedirect = localStorage.getItem("redirectTo");
          const redirectTo = storedRedirect || "/";
          localStorage.removeItem("redirectTo");
          
          toast.success("Welcome to DeenFit! 🎉");
          navigate(redirectTo);
        } else {
          toast.error(result.message || "Registration failed. Please try again.");
        }
      } catch (err) {
        console.error("Registration error:", err);
        toast.error("Registration failed. Please try again.");
      }
    } else {
      toast.error("Invalid OTP. Please check and try again.");
    }
  };

  const resendOtp = () => {
    if (canResend && !isSending) {
      toast.info("Resending OTP...");
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

        {/* <div className="logo">
          <h1>Join DeenFit</h1>
          <p>Create your account and start your journey</p>
        </div> */}

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

            {/* Enhanced button with progress */}
            <button
              onClick={sendOtp}
              disabled={isSending || !canResend}
              className={`btn-primary ${isSending || !canResend ? 'loading' : ''}`}
            >
              {isSending ? (
                <div className="sending-state">
                  <span className="spinner"></span>
                  <span>Preparing verification...</span>
                  <div className="progress-bar">
                    <div 
                      className="progress-fill" 
                      style={{ width: `${sendingProgress}%` }}
                    ></div>
                  </div>
                </div>
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
              {/* <div className="otp-status">
                {isSending ? (
                  <span className="sending-indicator">📤 Sending email...</span>
                ) : (
                  <span className="sent-indicator">✅ Check your inbox</span>
                )}
              </div> */}
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
                  autoFocus // Auto focus for better UX
                />
                <div className="input-icon"><SiGnuprivacyguard /></div>
              </div>
            </div>

            <div className="timer-section">
              <div className="timer-display">
                <span className="timer-icon"><MdTimer /></span>
                <span>Code expires in: <strong>{formatTimer(timer)}</strong></span>
              </div>
              {(timer === 0 || timer < 30) && (
                <button 
                  onClick={resendOtp}
                  className="resend-btn"
                  disabled={isSending}
                >
                  {timer === 0 ? "Resend OTP" : "Resend OTP Early"}
                </button>
              )}
            </div>

            <button
              onClick={verifyOtp}
              className="btn-primary mt-2 verify-btn"
              disabled={!otp.trim() || otp.length !== 6}
            >
              Verify 
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