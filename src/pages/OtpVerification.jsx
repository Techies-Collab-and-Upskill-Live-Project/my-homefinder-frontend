import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import OtpInput from "../components/otpInput";
import { sendOtp, verifyOtp } from "../data/dummyOtpService";

const OtpVerification = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { method, destination } = location.state || {};

  const [otp, setOtp] = useState(["", "", "", "", "", ""]);
  const [error, setError] = useState("");
  const [countdown, setCountdown] = useState(30);
  const [loading, setLoading] = useState(false);

  const fullOtp = otp.join("");

  // Redirect if no method or destination
  useEffect(() => {
    if (!method || !destination) {
      navigate("/otp-method");
    } else {
      sendOtp(method, destination);
    }
  }, [method, destination, navigate]);

  // Countdown timer for resend
  useEffect(() => {
    const timer =
      countdown > 0 &&
      setInterval(() => setCountdown((prev) => prev - 1), 1000);
    return () => clearInterval(timer);
  }, [countdown]);

  const handleVerify = async () => {
    if (fullOtp.length !== 6) {
      setError("Please enter the complete 6-digit code.");
      return;
    }

    try {
      setLoading(true);
      setError("");
      const res = await verifyOtp(fullOtp);
      alert(res);
      navigate("/dashboard");
    } catch (err) {
      setError(err);
    } finally {
      setLoading(false);
    }
  };

  const handleResend = () => {
    setCountdown(30);
    sendOtp(method, destination);
    setError("");
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
      <div className="bg-white p-8 rounded-3xl shadow-xl max-w-md w-full text-center relative">
        <h2 className="text-2xl font-bold mb-2">
          Verify Your {method === "email" ? "Email" : "Phone"}
        </h2>
        <p className="text-sm text-gray-600 mb-6">
          Enter the 6-digit code sent to{" "}
          <span className="font-medium">{destination}</span>
        </p>

        {/* OTP Input */}
        <OtpInput otp={otp} setOtp={setOtp} />

        {/* Error message */}
        {error && <p className="text-red-500 mt-2 text-sm">{error}</p>}

        {/* Verify button */}
        <button
          onClick={handleVerify}
          disabled={loading || fullOtp.length !== 6}
          className={`mt-6 w-full py-2 rounded-lg text-sm font-medium ${
            loading || fullOtp.length !== 6
              ? "bg-green-300 cursor-not-allowed"
              : "bg-green-600 hover:bg-green-700"
          } text-white transition`}
        >
          {loading ? "Verifying..." : "Verify"}
        </button>

        {/* Countdown and Resend */}
        <div className="text-xs text-gray-500 mt-4">
          {countdown > 0 ? (
            <p>Resend code in {countdown}s</p>
          ) : (
            <button
              onClick={handleResend}
              className="text-blue-500 hover:underline"
            >
              Resend Code
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default OtpVerification;
