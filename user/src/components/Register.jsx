// pages/Register.jsx
import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const Register = () => {
  const [step, setStep] = useState(1);
  const [name, setName] = useState("");
  const [mobile, setMobile] = useState("");
  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState("");
  const [generatedOtp, setGeneratedOtp] = useState("");
  const [otpExpireTime, setOtpExpireTime] = useState(null);
  const [timer, setTimer] = useState(90);
const [isSending, setIsSending] = useState(false); // new state
const [canResend, setCanResend] = useState(true); // for resend later

const navigate= useNavigate();
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

  const generateOtp = () => {
    const newOtp = Math.floor(100000 + Math.random() * 900000).toString();
    setGeneratedOtp(newOtp);
    setOtpExpireTime(Date.now() + 90000); // 90 seconds
    setTimer(90);
    return newOtp;
  };

  const sendOtp = async () => {
    if (!name || !email) return alert("Please enter name and email.");
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
        setTimeout(() => setCanResend(true), 90000); // Enable resend after 90s
      } else {
        toast.warn("Failed to send OTP.");
      }
    } catch (err) {
      console.error(err);
      toast.error("Error sending OTP.");
    } finally {
      setIsSending(false); // Allow resend after 90s only
    }
  };
  const verifyOtp = async () => {
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
            mobile: mobile, // must collect this in input
          }),
        });

        const result = await res.json();
        console.log("Register API response:", result);

        if (res.ok && result.userId) {
          localStorage.setItem("userId", result.userId);
          localStorage.setItem("isLoggedIn", "true");
          toast.success("Registeration successful!");
          
          const redirectTo = localStorage.getItem("redirectTo") || "/";
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

  return (
    <div className="min-h-[80vh] bg-white flex-col flex items-center justify-center px-4">
      <div className="bg-white shadow-xl rounded-xl p-8 w-full max-w-xl">
        <h2 className="text-2xl font-bold my-4 text-center text-indigo-700 mb-6">
          DeenFit Registration
        </h2>

        {step === 1 ? (
          <div className="m-3">
            <input
              type="text"
              placeholder="Full Name"
              className="w-full border border-gray-300  rounded-md px-3 py-2 mb-4 focus:outline-none focus:ring-2 focus:ring-indigo-500"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
            <input
              type="text"
              placeholder="Your Mobile"
              className="w-full border rounded-md p-2 mb-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={mobile}
              onChange={(e) => setMobile(e.target.value)}
            />

            <input
              type="email"
              placeholder="Email Address"
              className="w-full border border-gray-300 rounded-md px-3 py-2 mb-6 focus:outline-none focus:ring-2 focus:ring-indigo-500"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <button
              onClick={sendOtp}
              disabled={isSending || !canResend}
              className={`w-full text-white py-2 rounded-md 
    ${
      isSending || !canResend
        ? "bg-gray-400 cursor-not-allowed"
        : "bg-blue-600 hover:bg-blue-700"
    }`}
            >
              {isSending
                ? "Sending..."
                : canResend
                ? "Send OTP"
                : "Please wait..."}
            </button>
          </div>
        ) : (
          <div className="mx-4">
            <input
              type="text"
              placeholder="Enter 6-digit OTP"
              className="w-full border border-gray-300 rounded-md px-3 py-2 mb-3 focus:outline-none focus:ring-2 focus:ring-green-500"
              value={otp}
              onChange={(e) => setOtp(e.target.value)}
            />
            <p className="text-sm text-gray-600 mb-4 text-center">
              OTP expires in:{" "}
              <span className="font-semibold text-red-500">{timer}s</span>
            </p>
            <button
              onClick={verifyOtp}
              className="w-full bg-green-600 mb-4 text-white py-2 rounded-md hover:bg-green-700 transition duration-200"
            >
              Verify & Register
            </button>
          </div>
        )}
      </div>
      <div className="w-full max-w-xl">
        <p className="text-start my-4">
          Already Registered?{" "}
          <Link className="text-blue-500" to="/login">
            Login Now
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Register;
