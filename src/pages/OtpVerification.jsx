import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import OtpInput from "../components/otpInput";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const OtpVerification = () => {
  const navigate = useNavigate();
  const [otp, setOtp] = useState(["", "", "", "", "", ""]);
  const [countdown, setCountdown] = useState(30);
  const [loading, setLoading] = useState(false);
  const fullOtp = otp.join("");
  const email = JSON.parse(localStorage.getItem("user")).data.email;

  useEffect(() => {
    const timer =
      countdown > 0 &&
      setInterval(() => setCountdown((prev) => prev - 1), 1000);
    return () => clearInterval(timer);
  }, [countdown]);

  const handleVerify = async () => {
    if (fullOtp.length !== 6) {
      toast.error("Please enter the complete 6-digit code.");
      return;
    }

    try {
      setLoading(true);
      const response = await fetch(
        `${import.meta.env.VITE_API_URL}/auth/verify-email`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ email, otp: fullOtp }),
        }
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Verification failed");
      }

      toast.success("OTP Verified Successfully!");
      setTimeout(() => {
        const userRole = data.role.name;
        if (userRole === "RENTER") {
          navigate("/idSelection");
          window.location.reload();
        } else if (userRole === "LANDLORD") {
          navigate("/idSelection");
          window.location.reload();
        } else {
          navigate("/");
        }
      }, 5000);
    } catch (error) {
      toast.error(error.message || "An error occurred");
    } finally {
      setLoading(false);
    }
  };

  const handleResend = async () => {
    try {
      setCountdown(30);
      const response = await fetch(
        `${import.meta.env.VITE_API_URL}/auth/resend-verification`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ email }),
        }
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Failed to resend OTP");
      }

      toast.success("OTP resent successfully.");
    } catch (error) {
      toast.error(error.message || "Failed to resend OTP.");
    }
  };

  return (
    <>
      <ToastContainer position="top-right" autoClose={3000} hideProgressBar />
      <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
        <div className="bg-white p-8 rounded-3xl shadow-xl max-w-md w-full text-center relative">
          <h2 className="text-2xl font-bold mb-2">OTP Verification</h2>
          <p className="text-sm text-gray-600 mb-6">
            Enter the 6-digit code sent to your contact.
          </p>

          <OtpInput otp={otp} setOtp={setOtp} />

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
    </>
  );
};

export default OtpVerification;
