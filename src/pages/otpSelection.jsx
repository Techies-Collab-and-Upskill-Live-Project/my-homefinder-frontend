import { useNavigate } from "react-router-dom";
import logo from "../assets/HeroLogo.png";
import { FaTimes } from "react-icons/fa";

export default function OtpSelection() {
  const navigate = useNavigate();

  const handleSelect = (method) => {
    localStorage.setItem("otpMethod", method);
    // navigate("/verify");
    const destination = method === "email" ? "user@example.com" : "+1234567890";
    navigate("/verify", { state: { method, destination } });
  };

  return (
    <section className="min-h-screen bg-gray-100 flex items-center justify-center">
      <div className="bg-white rounded-lg shadow-lg w-full max-w-lg p-6 relative">
        {/* Top bar with logo and close icon */}

        <div className="absolute top-4 right-4 cursor-pointer">
          <FaTimes className="text-gray-500 hover:text-gray-700" />
        </div>
        <div className="ml-6 mb-6">
          <img src={logo} alt="logo" className="h-8 " />
        </div>

        {/* content */}
        <h2 className="text-xl font-bold text-center mb-2">Verification</h2>
        <p className="text-center text-sm text-gray-600 mb-10">
          Please select your preferred method to verify your profile
        </p>

        <div className="flex flex-col gap-4">
          <button
            onClick={() => handleSelect("email")}
            className="w-full border border-gray-300 rounded-md py-3 text-sm hover:bg-gray-50"
          >
            Email
          </button>
          <button
            onClick={() => handleSelect("phone")}
            className="w-full border border-gray-300 rounded-md py-3 text-sm hover:bg-gray-50"
          >
            Phone
          </button>
        </div>
      </div>
    </section>
  );
}
