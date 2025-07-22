import React, { useState, useEffect } from "react";

const LoginPopup = ({ onClose }) => {
    const [step, setStep] = useState(1);
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [otp, setOtp] = useState("");
    const [generatedOtp, setGeneratedOtp] = useState("");
    const [otpExpireTime, setOtpExpireTime] = useState(null);
    const [timer, setTimer] = useState(90);

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
        const otpCode = generateOtp();
        const subject = "Your DeenFit OTP Code";
        const body = `Dear ${name},\n\nYour OTP code is: ${otpCode}\nIt will expire in 90 seconds.`;

        try {
            const res = await fetch("/api/Email/send", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ email, subject, body }),
            });

           
            const result = await res.text(); // <-- Use .text() here
            console.log("API response:", result);
            if (res.ok && result.toLowerCase().includes("otp sent")) {
                setStep(2); // proceed to OTP input
            } else {
                alert("Failed to send OTP.");
            }
        } catch (err) {
            console.error(err);
            alert("Error sending OTP.");
        }
    };

    const verifyOtp = () => {
        if (Date.now() > otpExpireTime) {
            alert("OTP expired. Please try again.");
            return;
        }
        if (otp === generatedOtp) {
            const fakeUserId = Date.now().toString();
            localStorage.setItem("userId", fakeUserId);
            localStorage.setItem("isLoggedIn", "true");
            alert("Login successful!");
            onClose();
        } else {
            alert("Invalid OTP");
        }
    };

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white rounded-xl shadow-lg p-6 w-full max-w-md relative">
                <button
                    className="absolute top-2 right-3 text-gray-500 hover:text-red-500 text-2xl"
                    onClick={onClose}
                >
                    &times;
                </button>

                {step === 1 ? (
                    <>
                        <h2 className="text-xl font-semibold mb-4 text-center">Login or Register</h2>
                        <input
                            type="text"
                            placeholder="Your Name"
                            className="w-full border rounded-md p-2 mb-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                        />
                        <input
                            type="email"
                            placeholder="Your Email"
                            className="w-full border rounded-md p-2 mb-4 focus:outline-none focus:ring-2 focus:ring-blue-500"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />
                        <button
                            onClick={sendOtp}
                            className="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700"
                        >
                            Send OTP
                        </button>
                    </>
                ) : (
                    <>
                        <h2 className="text-xl font-semibold mb-4 text-center">Enter OTP</h2>
                        <input
                            type="text"
                            placeholder="Enter 6-digit OTP"
                            className="w-full border rounded-md p-2 mb-3 focus:outline-none focus:ring-2 focus:ring-green-500"
                            value={otp}
                            onChange={(e) => setOtp(e.target.value)}
                        />
                        <p className="text-sm text-gray-500 mb-4 text-center">
                            OTP expires in: <span className="font-semibold">{timer} sec</span>
                        </p>
                        <button
                            onClick={verifyOtp}
                            className="w-full bg-green-600 text-white py-2 rounded-md hover:bg-green-700"
                        >
                            Verify OTP
                        </button>
                    </>
                )}
            </div>
        </div>
    );
};

export default LoginPopup;