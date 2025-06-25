import React from "react";
import { useNavigate } from "react-router-dom";
import { X, UserCircle, House } from "@phosphor-icons/react";

const SignupSelectionPage = () => {
  const navigate = useNavigate();

  const handleRoleSelect = (role) => {
    if (role === "landlord") {
      navigate("/signup/landlord");
    } else if (role === "tenant") {
      navigate("/signup/tenant");
    }
  };

  const handleClose = () => {
    navigate("/");
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#F8FAFC] px-4 font-inter">
      <div className="relative bg-white rounded-2xl shadow-xl border border-gray-200 p-8 md:p-10 w-full max-w-md text-center">
        {/* Header */}
        <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-2">
          Let’s get you started
        </h2>
        <p className="text-sm md:text-lg text-gray-500 mb-8">Sign up as a</p>

        {/* Selection Cards */}
        <div className="flex flex-col md:flex-row gap-4">
          {/* Landlord */}
          <button
            onClick={() => handleRoleSelect("landlord")}
            className="flex flex-col items-center justify-center p-6 rounded-xl border-2 w-full transition-all duration-300 bg-white border-green-500 text-green-700 hover:bg-green-50 hover:shadow-md"
          >
            <UserCircle
              size={56}
              weight="duotone"
              className="mb-3 text-green-600"
            />
            <span className="text-lg md:text-xl font-semibold">LANDLORD</span>
          </button>

          {/* Tenant */}
          <button
            onClick={() => handleRoleSelect("tenant")}
            className="flex flex-col items-center justify-center p-6 rounded-xl border-2 w-full transition-all duration-300 bg-white border-green-500 text-green-700 hover:bg-green-50 hover:shadow-md"
          >
            <House size={56} weight="duotone" className="mb-3 text-green-600" />
            <span className="text-lg md:text-xl font-semibold">TENANT</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default SignupSelectionPage;
