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

  useEffect(() => {
    if (!method || !destination) {
      navigate("/otp-method");
    } else {
      sendOtp(method, destination);
    }
  }, [method, destination, navigate]);

  useEffect(() => {
    const timer =
      countdown > 0 &&
      setInterval(() => setCountdown((prev) => prev - 1), 1000);
    return () => clearInterval(timer);
  }, [countdown]);

  const handleVerify = async () => {
    try {
      setLoading(true);
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
      <div className="bg-white p-8 rounded-lg shadow-xl max-w-md w-full text-center relative">
        <h2 className="text-xl font-bold mb-2">
          Check Your {method === "email" ? "Email" : "Phone"}
        </h2>
        <p className="text-sm text-gray-600 mb-6">
          Enter the 6-digit verification code sent to
          <span className="font-medium">{destination}</span>
        </p>
        <OtpInput otp={otp} setOtp={setOtp} />
        {error && <p className="text-red-500 mt-2">{error}</p>}
        <button
          className="mt-6 bg-green-600 hover:bg-green-700 text-white w-full py-2 rounded-lg text-sm "
          onClick={handleVerify}
          disabled={loading || fullOtp.length !== 6}
        >
          {loading ? "Verifying..." : "Verify"}
        </button>
        <p className="text-xs text-gray-500 mt-4 flex flex-col">
          Resend code in {countdown}s{" "}
          {countdown === 0 && (
            <button
              className="ml-2 text-blue-500 hover:underline"
              onClick={handleResend}
            >
              Resend
            </button>
          )}
        </p>
      </div>
    </div>
  );
};

export default OtpVerification;
