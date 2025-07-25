import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

const PropertyAccess = ({ propertyId }) => {
  const [showPopup, setShowPopup] = useState(false);
  const navigate = useNavigate();

  const user = localStorage.getItem("user");
  const handleClick = () => {
    if (user) {
      navigate(`/property/${propertyId}`);
    } else {
      setShowPopup(true);
    }
  };

  if (!showPopup) return null;

  return (
    <motion.div
      className="fixed inset-0 z-50 bg-black bg-opacity-50 flex items-center justify-center"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
    >
      <motion.div
        className="bg-white rounded-lg p-8 shadow-xl w-full max-w-md text-center"
        initial={{ scale: 0.8 }}
        animate={{ scale: 1 }}
      >
        <h2 className="text-2xl font-bold mb-4">Register to View Details</h2>
        <p className="mb-6 text-gray-600">
          To view the full details of this property, please register or log in
          to your account.
        </p>
        <button
          onClick={() => navigate("/register")}
          className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700"
        >
          Register / Log In
        </button>
      </motion.div>
    </motion.div>
  );
};

export default PropertyAccess;
