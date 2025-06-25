import { useNavigate } from "react-router-dom";
import logo from "/images/HeroLogo.png";
import { X } from "@phosphor-icons/react";

export default function OtpSelection() {
  const navigate = useNavigate();

  const handleSelect = (method) => {
    const destination = method === "email" ? "user@example.com" : "+1234567890";
    localStorage.setItem("otpMethod", method);
    navigate("/verify", { state: { method, destination } });
  };

  return (
    <section className="min-h-screen bg-gray-100 flex items-center justify-center px-4">
      <div className="relative bg-white rounded-3xl shadow-lg w-full max-w-md p-8">
        {/* Close Button */}
        <button
          className="absolute top-4 right-4 text-gray-500 hover:text-gray-700 focus:outline-none"
          onClick={() => navigate(-1)}
          aria-label="Close"
        >
          <X size={18} />
        </button>

        {/* Logo */}
        <div className="mb-6 flex justify-center">
          <img src={logo} alt="Logo" className="h-10" />
        </div>

        {/* Header */}
        <h2 className="text-2xl font-bold text-center mb-3">Verification</h2>
        <p className="text-center text-gray-600 mb-8">
          Select how you’d like to receive your verification code
        </p>

        {/* Selection Buttons */}
        <div className="flex flex-col gap-4">
          <button
            onClick={() => handleSelect("email")}
            className="w-full border border-gray-300 rounded-lg py-3 text-sm font-medium hover:bg-gray-50 focus:ring-2 focus:ring-green-600 focus:outline-none transition"
          >
            Verify via Email
          </button>
          <button
            onClick={() => handleSelect("phone")}
            className="w-full border border-gray-300 rounded-lg py-3 text-sm font-medium hover:bg-gray-50 focus:ring-2 focus:ring-green-600 focus:outline-none transition"
          >
            Verify via Phone
          </button>
        </div>
      </div>
    </section>
  );
}
