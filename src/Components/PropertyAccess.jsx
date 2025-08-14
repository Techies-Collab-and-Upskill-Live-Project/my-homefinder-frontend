import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { XIcon } from "@phosphor-icons/react";

const PropertyAccess = ({ propertyId, showPopup, setShowPopup }) => {
  const navigate = useNavigate();
  if (!showPopup) return null;

  return (
    <motion.div
      className="fixed inset-0 z-50 bg-black/50 bg-opacity-50 flex items-center justify-center"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
    >
      <motion.div
        className="bg-white rounded-lg p-8 shadow-xl w-full max-w-md text-center"
        initial={{ scale: 0.8 }}
        animate={{ scale: 1 }}
      >
        <span>
          <XIcon
            className="text-red-500 float-right"
            size={20}
            onClick={() => setShowPopup(false)}
          />
        </span>
        <h2 className="text-2xl font-bold mb-4">Register to View Details</h2>
        <p className="mb-6 text-gray-600">
          To view the full details of this property, please register or log in
          to your account.
        </p>
        <button
          onClick={() => navigate("/tenantsignuppage")}
          className="bg-green-600 text-white px-6 py-2 rounded-lg hover:bg-green-700"
        >
          Register / Log In
        </button>
      </motion.div>
    </motion.div>
  );
};

export default PropertyAccess;
