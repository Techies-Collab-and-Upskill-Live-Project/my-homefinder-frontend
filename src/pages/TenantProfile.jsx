import React, { useEffect, useState } from "react";
import Mastercard from "/images/Mastercard.png";
import EditNumberModal from "../Components/EditNumberModal";
import UpdateProfileModal from "../Components/UpdateProfileModal";
import { PencilLine } from "@phosphor-icons/react";
import axios from "axios";

const TenantProfile = () => {
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

      const response = await axios.patch(
        `https://my-homefinder-backend.onrender.com/api/v1/users/update-phone`,
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
      const storedUser = localStorage.getItem("user");
      let userData = null;

      if (storedUser) {
        try {
          const parsedUser = JSON.parse(storedUser);
          userData = parsedUser.user;
        } catch {
          userData = null;
        }
      }

      const name = userData?.fullName || "Lucy Favy";
      const email = userData?.email || "lucyfavy@email.com";
      const phone = userData?.phone || "08157648539";
      const image =
        localStorage.getItem("profileImage") || generateAvatar(name);

      setProfileData({
        name,
        email,
        phoneNumber: phone,
        image,
      });

      // Leave the card details untouched
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

      console.log(token)

      const formData = new FormData();
      formData.append("profileImage", file);
      formData.append("folder", "profile-pictures");
      formData.append("format", file.type);

      const response = await axios.post(
        `https://my-homefinder-backend.onrender.com/api/v1/users/uploadprofilepic`,
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            // "Content-Type": "multipart/form-data",
          },
        }
      );

      console.log(response.data);

      const imageUrl = response.data.imageUrl || response.data.url || response.data.profileImageUrl;
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
            onClick={() => setIsEditImageModalOpen(true)}
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
          <PencilLine
            size={24}
            onClick={() => setIsEditNumberModalOpen(true)}
            className="cursor-pointer text-gray-500 hover:text-gray-700"
          />
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

      {/* Payments */}
      <div className="border border-gray-200 rounded-xl p-6 flex flex-col gap-4">
        <div className="flex justify-between items-center">
          <p className="text-base font-semibold text-gray-700">
            Payment Methods
          </p>
          <button
            onClick={() => setIsEditCardModalOpen(true)}
            className="text-sm font-medium text-black bg-transparent border border-gray-300 px-3 py-1.5 rounded-md hover:bg-gray-100 transition-colors"
          >
            Edit
          </button>
        </div>
        <div className="border-t border-gray-200 my-2" />
        <div className="flex items-center gap-4">
          <img
            src={Mastercard}
            alt="Mastercard"
            className="w-12 h-8 object-contain"
          />
          <div className="flex flex-col">
            <p className="text-base text-gray-800">{cardDetails.number}</p>
            <p className="text-sm text-gray-500 -mt-1">{cardDetails.type}</p>
          </div>
        </div>
      </div>

      {/* Edit Image Popup */}
      {isEditImageModalOpen && (
        <div className="fixed inset-0 bg-black/50 flex justify-center items-center z-50">
          <div className="bg-white rounded-xl p-6 w-full max-w-md">
            <h3 className="text-lg font-semibold mb-4">
              Upload New Profile Image
            </h3>
            <input
              type="file"
              accept="image/*"
              onChange={handleImageUpload}
              disabled={isImageSaving}
              className="mb-4"
            />
            {imageError && (
              <p className="text-red-600 text-sm mb-4">{imageError}</p>
            )}
            <div className="flex justify-end gap-3">
              <button
                onClick={() => setIsEditImageModalOpen(false)}
                className="text-sm text-gray-600 hover:text-gray-800"
                disabled={isImageSaving}
              >
                {isImageSaving ? "Loading..." : "Cancel"}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Edit Card Popup */}
      {isEditCardModalOpen && (
        <div className="fixed inset-0 bg-black/50 flex justify-center items-center z-50">
          <div className="bg-white rounded-xl p-6 w-full max-w-md">
            <h3 className="text-lg font-semibold mb-4">Edit Card Details</h3>
            <form
              onSubmit={handleSaveCardDetails}
              className="flex flex-col gap-4"
            >
              <div>
                <label className="text-sm font-medium text-gray-700">
                  Card Number
                </label>
                <input
                  type="text"
                  name="cardNumber"
                  defaultValue={cardDetails.number}
                  className="w-full border border-gray-300 rounded-md px-3 py-2 mt-1"
                  required
                />
              </div>
              <div>
                <label className="text-sm font-medium text-gray-700">
                  Card Type
                </label>
                <input
                  type="text"
                  name="cardType"
                  defaultValue={cardDetails.type}
                  className="w-full border border-gray-300 rounded-md px-3 py-2 mt-1"
                  required
                />
              </div>
              <div className="flex justify-end gap-3 mt-4">
                <button
                  type="button"
                  onClick={() => setIsEditCardModalOpen(false)}
                  className="text-sm text-gray-600 hover:text-gray-800"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="text-sm bg-green-600 text-white px-4 py-2 rounded-md hover:bg-green-700"
                >
                  Save
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

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
