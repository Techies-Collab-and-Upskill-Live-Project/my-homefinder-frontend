import React, { useRef, useState, useEffect } from "react";
import { toast } from "react-toastify";
import { useProfile } from "../Components/ProfileContext";
import ProfileImage from "/images/ProfileIcon.png";
import axios from "axios";
import { UploadSimpleIcon } from "@phosphor-icons/react";

const UploadPicture = ({ onImageSelect, initialImage, disabled }) => {
  const authUser = JSON.parse(localStorage.getItem("authUser"));
  const img =
    authUser?.landlordProfile?.profileImage ||
    authUser?.tenantProfile?.profileImage ||
    null;

  const { updateProfile } = useProfile();
  const [preview, setPreview] = useState(initialImage || img);
  const fileInputRef = useRef(null);

  useEffect(() => {
    if (initialImage) {
      setPreview(initialImage);
    }
  }, [initialImage]);

  const handleFileChange = async (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const imageUrl = URL.createObjectURL(file);
    setPreview(imageUrl);

    const formData = new FormData();
    formData.append("image", file);

    const token = JSON.parse(localStorage.getItem("user")).token.token;
    const mimeTypeToFormat = {
      "image/jpeg": "jpg",
      "image/png": "png",
    };

    const fileFormat = mimeTypeToFormat[file.type];
    if (!fileFormat) {
      toast.error("Unsupported file format. Use PNG or JPEG.");
      return;
    }
    try {
      const res = await axios.post(
        `${
          import.meta.env.VITE_API_URL
        }/users/uploadprofilepic?folder=profilePic&format=${fileFormat}`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const uploadedImage = res.data?.imageUrl;

      if (uploadedImage) {
        updateProfile({ image: uploadedImage });
        onImageSelect?.(uploadedImage);
      }

      toast.success(
        res?.data?.uploadMessage?.message ||
          "Profile picture uploaded successfully!"
      );
    } catch (err) {
      console.error("Upload error:", err);
      toast.error(err.response?.data?.message || "Upload failed");
    }
  };

  const triggerUpload = () => {
    if (!disabled) fileInputRef.current.click();
  };

  return (
    <div className="flex flex-col items-center space-y-4 mb-2">
      <div
        className="relative group cursor-pointer"
        onClick={triggerUpload}
        title="Click to change picture"
      >
        <img
          src={preview || ProfileImage}
          alt="Profile"
          className="w-24 h-24 rounded-full object-cover border-2 border-gray-300 shadow-sm transition duration-200 group-hover:opacity-80"
        />
        {!disabled && (
          <div className="absolute bottom-0 right-0 bg-white p-1 rounded-full shadow-sm">
            <UploadSimpleIcon className="w-5 h-5 text-gray-600" />
          </div>
        )}
      </div>

      <input
        type="file"
        accept="image/*"
        ref={fileInputRef}
        hidden
        onChange={handleFileChange}
        disabled={disabled}
      />

      <button
        onClick={triggerUpload}
        disabled={disabled}
        className="px-4 py-2 text-sm font-medium bg-green-600 text-white rounded-xl shadow hover:bg-green-700 transition disabled:opacity-50 disabled:cursor-not-allowed"
      >
        {preview ? "Change Picture" : "Upload Picture"}
      </button>
    </div>
  );
};

export default UploadPicture;
