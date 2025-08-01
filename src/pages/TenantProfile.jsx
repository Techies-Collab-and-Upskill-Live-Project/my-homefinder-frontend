import React, { useEffect, useState } from "react";
import Mastercard from "/images/Mastercard.png";
import EditNumberModal from "../Components/EditNumberModal";
import UpdateProfileModal from "../Components/UpdateProfileModal";
import { PencilLine } from "@phosphor-icons/react";
import axios from "axios";

const TenantProfile = () => {
  const authUser = JSON.parse(localStorage.getItem("authUser"));
  const [isEditNumberModalOpen, setIsEditNumberModalOpen] = useState(false);
  const [showUpdateProfileModal, setShowUpdateProfileModal] = useState(false);
  const [isEditCardModalOpen, setIsEditCardModalOpen] = useState(false);
  const [isEditImageModalOpen, setIsEditImageModalOpen] = useState(false);
  // Helper function to generate the avatar URL
  const generateAvatar = (name) => {
    const encodedName = encodeURIComponent(name || "User");
    return `https://ui-avatars.com/api/?name=${encodedName}&background=0D8ABC&color=fff&bold=true`;
  };

  const [profileData, setProfileData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isImageSaving, setIsImageSaving] = useState(false);
  const [imageError, setImageError] = useState("");

  const [cardDetails, setCardDetails] = useState({
    number: "*****8994",
    type: "Debit Card",
  });

  const handleSavePhoneNumber = async (newPhoneNumber) => {
    try {
      const token = JSON.parse(localStorage.getItem("user")).token;
      const API_URL = import.meta.env.VITE_API_URL;
      const response = await axios.patch(
        `${API_URL}/users/update-phone`,
        { phone: newPhoneNumber },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setProfileData((prev) => ({
        ...prev,
        phoneNumber: newPhoneNumber,
      }));

      const storedUser = localStorage.getItem("user");
      if (storedUser) {
        const parsedUser = JSON.parse(storedUser);
        parsedUser.user.phone = newPhoneNumber;
        localStorage.setItem("user", JSON.stringify(parsedUser));
      }

      setIsEditNumberModalOpen(false);
    } catch (error) {
      console.error("Failed to update phone number:", error);
      alert(
        error?.response?.data?.message ||
          "Failed to update phone number. Try again."
      );
    }
  };

  useEffect(() => {
    setIsLoading(true);

    setTimeout(() => {
      const storedAuthUser = localStorage.getItem("authUser");
      let authUserData = null;

      if (storedAuthUser) {
        try {
          authUserData = JSON.parse(storedAuthUser);
        } catch {
          authUserData = null;
        }
      }

      const profile =
        authUserData?.tenantProfile || authUserData?.landlordProfile || {};

      const name = profile?.fullName || "Lucy Favy";
      const email = authUserData?.email || "lucyfavy@email.com";
      const phone = profile?.phoneNumber || "08157648539";

      const image =
        profile?.profileImage ||
        localStorage.getItem("profileImage") ||
        generateAvatar(name);

      setProfileData({
        name,
        email,
        phoneNumber: phone,
        image,
      });

      const storedCardNumber = localStorage.getItem("cardNumber");
      const storedCardType = localStorage.getItem("cardType");
      setCardDetails({
        number: storedCardNumber || "*****8994",
        type: storedCardType || "Debit Card",
      });

      setIsLoading(false);
    }, 800);
  }, []);

  const handleSaveCardDetails = (e) => {
    e.preventDefault();
    const form = e.target;
    const newNumber = form.cardNumber.value.trim();
    const newType = form.cardType.value.trim();

    if (!newNumber || !newType) return;

    localStorage.setItem("cardNumber", newNumber);
    localStorage.setItem("cardType", newType);

    setCardDetails({
      number: newNumber,
      type: newType,
    });

    setIsEditCardModalOpen(false);
  };

  const handleImageUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    if (!file.type.startsWith("image/")) {
      setImageError("Please upload a valid image file.");
      return;
    }
    if (file.size > 2 * 1024 * 1024) {
      setImageError("Image size should be less than 2MB.");
      return;
    }

    setIsImageSaving(true);
    setImageError("");

    try {
      let token;
      const user = JSON.parse(localStorage.getItem("user"));
      ("authToken");

      // Added this line to properly retrive auth token from local storage
      if (user?.token) {
        token = typeof user.token === "object" ? user.token.token : user.token;
      } else {
        token = localStorage.getItem("authToken");
      }

      if (!token) {
        setImageError("You must be logged in to upload an image.");
        setIsImageSaving(false);
        return;
      }

      const formData = new FormData();
      formData.append("profileImage", file);
      formData.append("folder", "profile-pictures");
      formData.append("format", file.type);

      const API_URL = import.meta.env.VITE_API_URL;
      const response = await axios.post(
        `${API_URL}/users/uploadprofilepic`,
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            // "Content-Type": "multipart/form-data",
          },
        }
      );

      const imageUrl =
        response.data.imageUrl ||
        response.data.url ||
        response.data.profileImageUrl;
      if (!imageUrl) {
        setImageError("No image URL returned from server.");
        return;
      }

      localStorage.setItem("profileImage", imageUrl);
      setProfileData((prev) => ({ ...prev, image: imageUrl }));

      setIsEditImageModalOpen(false);
    } catch (error) {
      console.error(error);
      setImageError(
        error.response?.data?.message || "Image upload failed. Try again."
      );
    } finally {
      setIsImageSaving(false);
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex justify-center items-center bg-gray-100 p-6">
        <p className="text-gray-600 text-base">Loading profile data...</p>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto p-6 sm:p-8 md:p-12 bg-white border border-gray-200 rounded-2xl shadow-lg flex flex-col gap-8 mb-20">
      {/* Profile Header */}
      <div className="flex mt-40 flex-col sm:flex-row items-center justify-between gap-6">
        <div className="flex flex-col sm:flex-row items-center gap-4">
          <img
            src={profileData.image}
            alt="Profile"
            className="w-24 h-24 rounded-full object-cover cursor-pointer hover:opacity-80 transition-all"
          />
          <div className="flex flex-col items-center sm:items-start">
            <p className="text-xl font-semibold text-gray-800">
              {profileData.name}
            </p>
            <button
              onClick={() => setShowUpdateProfileModal(true)}
              className="text-sm text-green-600 hover:underline mt-1"
            >
              Update Profile
            </button>
          </div>
        </div>
      </div>

      {/* Contact Details */}
      <div className="border border-gray-200 rounded-xl p-6 flex flex-col gap-4">
        <div className="flex justify-between items-center">
          <p className="text-base font-semibold text-gray-700">
            Contact Details
          </p>
        </div>
        <div className="border-t border-gray-200 my-2" />
        <div className="flex flex-col gap-3">
          <div className="flex flex-col sm:flex-row sm:justify-between">
            <p className="text-sm text-gray-500">Phone Number:</p>
            <p className="text-sm text-gray-800">{profileData.phoneNumber}</p>
          </div>
          <div className="flex flex-col sm:flex-row sm:justify-between">
            <p className="text-sm text-gray-500">Email:</p>
            <p className="text-sm text-gray-800">{profileData.email}</p>
          </div>
        </div>
      </div>

      {/* Other Modals */}
      {isEditNumberModalOpen && (
        <EditNumberModal
          currentNumber={profileData.phoneNumber}
          onClose={() => setIsEditNumberModalOpen(false)}
          onSave={handleSavePhoneNumber}
        />
      )}
      {showUpdateProfileModal && (
        <UpdateProfileModal onClose={() => setShowUpdateProfileModal(false)} />
      )}
    </div>
  );
};

export default TenantProfile;
