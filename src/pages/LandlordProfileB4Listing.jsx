import React, { useState, useEffect } from "react";
import UserImage from "/images/image8.png";
import {
  CheckCircleIcon,
  PencilLineIcon,
  TrashIcon,
} from "@phosphor-icons/react";
import axios from "axios";
import AddPropertyModal from "../Components/AddPropertyModal";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
const EditBioModal = ({ onClose, onSave, initialBio, loading }) => {
  const [newBio, setNewBio] = useState(initialBio);

  const handleSave = () => {
    onSave(newBio);
  };

  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-[99999] px-4">
      <div className="bg-white rounded-xl p-6 w-full max-w-lg">
        <h2 className="text-xl font-bold mb-4">Edit Bio</h2>
        <textarea
          className="w-full border rounded p-3 text-sm"
          rows={5}
          value={newBio}
          onChange={(e) => setNewBio(e.target.value)}
        />
        <div className="flex justify-end gap-3 pt-4">
          <button onClick={onClose} className="text-gray-500">
            Cancel
          </button>
          <button
            onClick={handleSave}
            className="bg-green-600 text-white px-4 py-2 rounded"
            disabled={loading}
          >
            {loading ? "Saving..." : "Save Bio"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default function LandlordProfileB4Listing() {
  const [isEditBioModalOpen, setIsEditBioModalOpen] = useState(false);
  const [isAddPropertyModalOpen, setIsAddPropertyModalOpen] = useState(false);
  const [isEditImageModalOpen, setIsEditImageModalOpen] = useState(false);
  const userId = JSON.parse(localStorage.getItem("user"))?.user.id;

  const [phone, setPhone] = useState("");
  const [bio, setBio] = useState("");
  const [properties, setProperties] = useState([]);
  const [userData, setUserData] = useState(null);

  const [bioLoading, setBioLoading] = useState(false);
  const [propertyLoading, setPropertyLoading] = useState(false);

  useEffect(() => {
    const fetchUserData = async () => {
      const userDetails = JSON.parse(localStorage.getItem("user"));
      const authUser = JSON.parse(localStorage.getItem("authUser"));

      const token = userDetails?.token?.token;
      const fallbackUser = userDetails?.user;
      const sourceUser = authUser || fallbackUser;

      if (sourceUser) {
        setUserData({
          ...sourceUser,
          image:
            authUser?.landlordProfile?.profileImage ||
            authUser?.tenantProfile?.profileImage ||
            UserImage,
        });

        setPhone(sourceUser.phone || "");
      }

      setBio(localStorage.getItem("bio") || "No bio added yet.");

      try {
        const res = await axios.get(
          `${
            import.meta.env.VITE_API_URL
          }/property/landlord/${userId}?page=1&limit=10`,
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );
        setProperties(res.data.data.properties || []);
      } catch (err) {
        console.error("Failed to fetch user's properties", err);
      }
    };

    fetchUserData();
  }, []);

  const saveBio = (newBio) => {
    setBioLoading(true);
    setTimeout(() => {
      setBio(newBio);
      localStorage.setItem("bio", newBio);
      setBioLoading(false);
      setIsEditBioModalOpen(false);
    }, 3000);
  };

  const saveNewProperty = async (formData) => {
    setPropertyLoading(true);
    try {
      const user = JSON.parse(localStorage.getItem("user"));
      const token = user?.token?.token;

      const format = formData.get("format") || "jpg";
      const folder = "propertyPics";

      const res = await axios.post(
        `${
          import.meta.env.VITE_API_URL
        }/property?format=${format}&folder=${folder}`,
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "multipart/form-data",
          },
        }
      );

      const addedProperty = res.data.property;
      setProperties((prev) => [...prev, addedProperty]);
      toast.success("Property uploaded successfully!");
    } catch (error) {
      console.error(
        "Error uploading property:",
        error.response?.data || error.message
      );
      toast.error(
        error.response?.data?.message ||
          "Failed to upload property. Please check the form and try again."
      );
    } finally {
      setPropertyLoading(false);
      setIsAddPropertyModalOpen(false);
    }
  };

  return (
    <>
      <ToastContainer position="top-right" autoClose={3000} />
      <div className="max-w-4xl mx-auto px-6 py-8 font-sans leading-normal border border-gray-300 rounded-xl shadow-lg space-y-8">
        <div className="flex justify-center mt-20 gap-x-4 items-center mb-6">
          <div className="flex flex-col items-center">
            <img
              src={userData?.image || UserImage}
              alt="Profile"
              className="w-24 h-24 rounded-full object-cover cursor-pointer hover:opacity-80 transition-all"
              onClick={() => setIsEditImageModalOpen(true)}
            />
            <p className="mt-4 text-lg font-medium flex items-center gap-2">
              {userData?.fullName || "User"}
              {userData?.isVerified ? (
                <img src="/images/verified.png" className="w-8" />
              ) : (
                ""
              )}
            </p>
            <small className="text-green-600">{userData?.email}</small>
          </div>
        </div>

        <div className="flex flex-col border border-gray-300 rounded-xl shadow-lg p-6 space-y-2">
          <div className="flex justify-between items-center">
            <p className="text-base font-normal">Contact Details</p>
          </div>
          <div className="border-t border-gray-300"></div>
          <h5 className="text-sm text-slate-400 mt-2 font-normal">{phone}</h5>
        </div>

        <div className="flex flex-col border border-gray-300 rounded-xl shadow-lg p-6 space-y-2">
          <div className="flex justify-between items-center">
            <p className="text-base font-normal">Bio</p>
            <span
              onClick={() => setIsEditBioModalOpen(true)}
              className="flex items-center gap-x-2 text-sm font-normal text-black hover:underline cursor-pointer"
            >
              <PencilLineIcon className="w-4 h-4" /> Edit Bio
            </span>
          </div>
          <div className="border-t border-gray-300"></div>
          <p className="text-sm text-slate-500 mt-2">{bio}</p>
        </div>

        <div className="border border-gray-300 rounded-xl shadow-lg p-6">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-lg font-semibold">Your Properties</h3>
            <button
              onClick={() => setIsAddPropertyModalOpen(true)}
              className="bg-green-600 text-white px-4 py-1 rounded hover:bg-green-700 text-sm"
            >
              {propertyLoading ? "Adding..." : "Add Property"}
            </button>
          </div>

          {properties.length === 0 ? (
            <p className="text-sm text-gray-500 text-center mt-4">
              No properties added yet.
            </p>
          ) : (
            <div className="grid gap-6 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
              {properties.map((prop, idx) => (
                <span
                  key={idx}
                  className="bg-white rounded-2xl shadow-sm hover:shadow-md transition-all p-4 flex flex-col gap-3"
                >
                  {prop.images?.length > 0 ? (
                    <div className="w-full h-40 rounded-xl overflow-hidden">
                      <img
                        src={prop.images[0].url}
                        alt={prop.title}
                        className="w-full h-full object-cover"
                      />
                    </div>
                  ) : (
                    <div className="w-full h-40 bg-gray-100 rounded-xl flex items-center justify-center text-gray-400 text-sm">
                      No Image Available
                    </div>
                  )}

                  <div className="flex justify-between items-start">
                    <div>
                      <h3 className="text-lg font-semibold text-gray-800">
                        {prop.title}
                      </h3>
                      <p className="text-sm text-green-600 font-medium">
                        ₦{prop.price?.toLocaleString()}
                      </p>
                    </div>
                    <TrashIcon
                      className="w-5 h-5 text-red-500 cursor-pointer hover:text-red-700"
                      onClick={() => {
                        const newProps = properties.filter((_, i) => i !== idx);
                        setProperties(newProps);
                        localStorage.setItem(
                          "properties",
                          JSON.stringify(newProps)
                        );
                      }}
                    />
                  </div>

                  <p className="text-sm text-gray-600">{prop.description}</p>
                  <p className="text-xs text-gray-500">Type: {prop.type}</p>
                  <p className="text-xs text-gray-500">
                    Location: {prop.address}, {prop.city}, {prop.state},{" "}
                    {prop.country}
                  </p>

                  {prop.images?.length > 1 && (
                    <div className="flex gap-2 mt-2 overflow-x-auto">
                      {prop.images.slice(1).map((img, i) => (
                        <img
                          key={i}
                          src={img}
                          alt={`Property image ${i + 2}`}
                          className="w-16 h-16 object-cover rounded-lg border"
                        />
                      ))}
                    </div>
                  )}
                </span>
              ))}
            </div>
          )}
        </div>

        {isAddPropertyModalOpen && (
          <AddPropertyModal
            onClose={() => setIsAddPropertyModalOpen(false)}
            onSave={saveNewProperty}
          />
        )}

        {isEditBioModalOpen && (
          <EditBioModal
            initialBio={bio}
            onClose={() => setIsEditBioModalOpen(false)}
            onSave={saveBio}
            loading={bioLoading}
            {...(isEditImageModalOpen && (
              <>
                <AddPropertyModal />
              </>
            ))}
          />
        )}
      </div>
    </>
  );
}
