import React, { useState, useEffect } from "react";
import ReactDOM from "react-dom";
import axios from "axios";
import { useProfile } from "../Components/ProfileContext";

const UpdateProfileModal = ({ onClose }) => {
  const { profileData, updateProfile } = useProfile();

  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [isSaving, setIsSaving] = useState(false);
  const [message, setMessage] = useState({ type: "", text: "" });

  useEffect(() => {
    setFullName(profileData.name || "");
    setEmail(profileData.email || "");
  }, [profileData]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSaving(true);
    setMessage({ type: "", text: "" });

    try {
      const token = JSON.parse(localStorage.getItem("user")).token.token;
      if (!token) throw new Error("No authentication token found");

      const response = await axios.patch(
        `${import.meta.env.VITE_API_URL}/users/update`,
        {
          fullName,
          email,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const updatedData = response.data;

      // Update profile context
      updateProfile({
        name: updatedData.fullName,
        email: updatedData.email,
      });

      // Update localStorage
      localStorage.setItem("name", updatedData.fullName);
      localStorage.setItem("email", updatedData.email);

      setMessage({ type: "success", text: "Profile updated successfully!" });
      setTimeout(() => onClose(), 1500);
    } catch (error) {
      console.error(error);
      setMessage({
        type: "error",
        text:
          error.response?.data?.message ||
          error.message ||
          "Failed to update profile. Please try again.",
      });
    } finally {
      setIsSaving(false);
      if (message.type === "error") {
        setTimeout(() => setMessage({ type: "", text: "" }), 3000);
      }
    }
  };

  return ReactDOM.createPortal(
    <div
      className="fixed inset-0 bg-black/50 bg-opacity-40 flex items-center justify-center z-50 p-4"
      onClick={onClose}
    >
      <div
        className="bg-white rounded-xl shadow-lg w-full max-w-md p-6 relative"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex justify-between items-center pb-4 border-b border-gray-200">
          <h2 className="text-xl font-semibold text-gray-800">Edit Profile</h2>
          <button
            className="text-gray-500 hover:text-gray-700 text-2xl"
            onClick={onClose}
            aria-label="Close modal"
          >
            &times;
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-5 mt-4">
          <div>
            <label
              htmlFor="fullName"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Full Name
            </label>
            <input
              type="text"
              id="fullName"
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
              className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-green-400"
              required
              disabled={isSaving}
            />
          </div>

          <div>
            <label
              htmlFor="email"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Email Address
            </label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-green-400"
              required
              disabled={isSaving}
            />
          </div>

          {/* Message */}
          {message.text && (
            <p
              className={`text-sm px-3 py-2 rounded ${
                message.type === "success"
                  ? "bg-green-100 text-green-700 border border-green-200"
                  : "bg-red-100 text-red-700 border border-red-200"
              }`}
            >
              {message.text}
            </p>
          )}

          {/* Actions */}
          <div className="flex justify-end gap-3 pt-4 border-t border-gray-200">
            <button
              type="submit"
              className="bg-green-600 hover:bg-green-700 text-white font-medium py-2 px-4 rounded focus:outline-none focus:ring-2 focus:ring-green-500"
              disabled={isSaving}
            >
              {isSaving ? "Saving..." : "Save Changes"}
            </button>
            <button
              type="button"
              className="bg-gray-200 hover:bg-gray-300 text-gray-800 disabled:opacity-10 disabled:cursor-not-allowed font-medium py-2 px-4 rounded focus:outline-none focus:ring-2 focus:ring-gray-400"
              onClick={onClose}
              disabled={isSaving}
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>,
    document.body
  );
};

export default UpdateProfileModal;
