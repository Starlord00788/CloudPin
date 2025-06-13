import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";

const VerifyOtp = () => {
  const [otp, setOtp] = useState("");
  const location = useLocation();
  const navigate = useNavigate();
  const email = location.state?.email;

  const handleVerify = async () => {
    try {
      await axios.post("https://cloudpin-backend.onrender.com/users/verify-otp", { email, otp });
      alert("OTP verified!");
      navigate("/login");
    } catch (err) {
      alert(err.response?.data?.message || "Invalid OTP");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
      <div className="w-full max-w-md bg-white p-8 shadow-md rounded-md">
        <h2 className="text-2xl font-semibold text-center mb-4">Verify OTP</h2>
        <input
          type="text"
          placeholder="Enter OTP"
          value={otp}
          onChange={(e) => setOtp(e.target.value)}
          className="w-full px-3 py-2 border rounded-md mb-4"
        />
        <button
          onClick={handleVerify}
          className="w-full bg-green-600 hover:bg-green-700 text-white py-2 rounded-md"
        >
          Verify
        </button>
      </div>
    </div>
  );
};

export default VerifyOtp;
