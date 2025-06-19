import React, { useState } from 'react';
import { X, User, Home } from 'lucide-react'; 

const SignupSelectionPage = () => {
  const [selectedRole, setSelectedRole] = useState(null);

  const handleRoleSelect = (role) => {
    setSelectedRole(role);
    console.log(`Selected role: ${role}`);
  };

  const handleClose = () => {
    console.log("Close button clicked");
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 p-4 font-inter">
      <div className="relative bg-white rounded-xl shadow-2xl p-8 md:p-12 w-full max-w-md mx-auto text-center border border-gray-200">
        
        <button
          onClick={handleClose}
          className="absolute top-4 right-2 text-gray-500 hover:text-gray-800 focus:outline-none"
          aria-label="Close"
        >
          <X size={24} />
        </button>

        {/* Header Text */}
        <h2 className="text-4xl font-bold text-gray-800 mt-4 mb-2">Let's get you started</h2>
        <p className="text-lg text-gray-600 mb-8">Sign Up as a</p>

        {/* Decision Selection Cards */}
        <div className="flex flex-col md:flex-row space-y-3 md:space-y-0 md:space-x-4 justify-center">
          {/* Landlord Card */}
          <button
            onClick={() => handleRoleSelect('landlord')}
            className={`flex flex-col items-center justify-center p-6 md:p-8 rounded-lg border-2 w-full md:w-1/2 transition-all duration-300
              ${selectedRole === 'landlord'
                ? 'bg-green-700 border-green-700 text-white shadow-lg transform scale-105'
                : 'bg-white border-green-500 text-green-700 hover:bg-green-50 hover:shadow-md'
              }`}
            aria-pressed={selectedRole === 'landlord'}
            aria-label="Sign up as a Landlord"
          >
            {/* Icon section */}
            <User
              size={60} // This icon can be sized
              className="mb-3"
              style={{ color: selectedRole === 'landlord' ? 'white' : '#10B981' }}
            />
            {/* Text Label */}
            <span
              className={`text-2xl font-bold ${selectedRole === 'landlord' ? 'text-white' : 'text-green-700'}`}
              style={{ color: selectedRole === 'landlord' ? 'white' : '#10B981' }} 
            >
              LANDLORD
            </span>
          </button>

          {/* Tenant Card */}
          <button
            onClick={() => handleRoleSelect('tenant')}
            className={`flex flex-col items-center justify-center p-6 md:p-8 rounded-lg border-2 w-full md:w-1/2 transition-all duration-300
              ${selectedRole === 'tenant'
                ? 'bg-green-700 border-green-700 text-white shadow-lg transform scale-105'
                : 'bg-white border-green-500 text-green-700 hover:bg-green-50 hover:shadow-md'
              }`}
            aria-pressed={selectedRole === 'tenant'}
            aria-label="Sign up as a Tenant"
          >
            {/* Icon */}
            <Home
              size={60} 
              className="mb-3"
              style={{ color: selectedRole === 'tenant' ? 'white' : '#10B981' }} 
            />
            {/* Text Label */}
            <span
              className={`text-2xl font-bold ${selectedRole === 'tenant' ? 'text-white' : 'text-green-700'}`}
              style={{ color: selectedRole === 'tenant' ? 'white' : '#10B981' }} 
            >
              TENANT
            </span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default SignupSelectionPage;