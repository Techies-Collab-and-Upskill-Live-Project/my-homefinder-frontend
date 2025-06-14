import React from "react";

export default function OtpInput({ otp, setOtp }) {
  const handleChange = (e, i) => {
    const value = e.target.value;
    if (!/^\d*$/.test(value)) return;
    const newOtp = [...otp];
    newOtp[i] = value;
    setOtp(newOtp);
    // Auto-focus next
    if (value && i < 5) {
      document.getElementById(`otp-${i + 1}`).focus();
    }
  };

  return (
    <div className="flex justify-center gap-4 mb-4  ">
      {otp.map((digit, i) => (
        <input
          key={i}
          id={`otp-${i}`}
          type="text"
          maxLength={1}
          className="w-12 h-12 text-center text-xl border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-600"
          value={digit}
          onChange={(e) => handleChange(e, i)}
        />
      ))}
    </div>
  );
}
