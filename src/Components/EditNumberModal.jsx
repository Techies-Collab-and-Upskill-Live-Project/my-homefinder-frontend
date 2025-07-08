import React, { useState, useEffect } from "react";
import axios from "axios";
import { useProfile } from "../Components/ProfileContext";

const EditNumberModal = ({ currentNumber, currentEmail, onClose }) => {
  const { updatePhoneNumber, updateEmail } = useProfile();

  const [phoneNumber, setPhoneNumber] = useState(currentNumber || "");
  const [email, setEmail] = useState(currentEmail || "");
  const [error, setError] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    setPhoneNumber(currentNumber || "");
    setEmail(currentEmail || "");
  }, [currentNumber, currentEmail]);

  const validateInputs = () => {
    if (!phoneNumber.trim() || !email.trim()) {
      return "All fields are required.";
    }
    if (!/^\+?[0-9\s-()]+$/.test(phoneNumber.trim())) {
      return "Invalid phone number format.";
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim())) {
      return "Invalid email format.";
    }
    return "";
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccessMessage("");

    const validationError = validateInputs();
    if (validationError) {
      setError(validationError);
      return;
    }

    setIsLoading(true);
    try {
      const token = localStorage.getItem("authToken");
      const response = await axios.patch(
        `${import.meta.env.VITE_API_URL}/users/update-contact`,
        { phoneNumber: phoneNumber.trim(), email: email.trim() },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      const updatedData = response.data;

      // Update localStorage
      localStorage.setItem("phoneNumber", updatedData.phoneNumber);
      localStorage.setItem("email", updatedData.email);

      // Update context
      updatePhoneNumber(updatedData.phoneNumber);
      updateEmail(updatedData.email);

      setSuccessMessage("Contact details updated successfully!");
      setTimeout(() => onClose(), 1500);
    } catch (err) {
      console.error("Error updating contact:", err);
      setError(
        err.response?.data?.message || "Failed to update. Please try again."
      );
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex justify-center items-center z-50 p-4">
      <div
        className="bg-white rounded-xl shadow-xl w-full max-w-md p-6 relative"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={onClose}
          className="absolute top-3 right-3 text-gray-400 hover:text-gray-600 text-2xl font-bold"
          aria-label="Close modal"
        >
          &times;
        </button>

        <h2 className="text-xl font-semibold text-gray-800 mb-4">
          Edit Contact Details
        </h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Phone Number
            </label>
            <input
              type="text"
              value={phoneNumber}
              onChange={(e) => setPhoneNumber(e.target.value)}
              placeholder="e.g., +2348012345678"
              className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-green-400"
              disabled={isLoading}
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Email Address
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="e.g., example@email.com"
              className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-green-400"
              disabled={isLoading}
            />
          </div>

          {error && <p className="text-red-600 text-sm">{error}</p>}
          {successMessage && (
            <p className="text-green-600 text-sm">{successMessage}</p>
          )}

          <div className="flex justify-end gap-3 pt-2">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 bg-gray-200 text-gray-800 rounded-md hover:bg-gray-300"
              disabled={isLoading}
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 disabled:opacity-50"
              disabled={isLoading}
            >
              {isLoading ? "Saving..." : "Save Changes"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditNumberModal;
