import React, { useState, useEffect } from "react";
import UserImage from "/images/image8.png";
import { PencilLineIcon, TrashIcon } from "@phosphor-icons/react";
import axios from "axios";
import AddPropertyModal from "../Components/AddPropertyModal";

// Bio Modal Component
const EditBioModal = ({ onClose, onSave, initialBio }) => {
  const [newBio, setNewBio] = useState(initialBio);

  const handleSave = () => {
    onSave(newBio);
    onClose();
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
          >
            Save Bio
          </button>
        </div>
      </div>
    </div>
  );
};

export default function LandlordProfileB4Listing() {
  const [isEditBioModalOpen, setIsEditBioModalOpen] = useState(false);
  const [isAddPropertyModalOpen, setIsAddPropertyModalOpen] = useState(false);

  const [phone, setPhone] = useState("");
  const [bio, setBio] = useState("");
  const [properties, setProperties] = useState([]);
  const [userData, setUserData] = useState(null);

  useEffect(() => {
    const userDetails = JSON.parse(localStorage.getItem("user"));
    if (userDetails?.user) {
      setUserData(userDetails.user);
      setPhone(userDetails.user.phone || "");
    }
    setBio(localStorage.getItem("bio") || "No bio added yet.");

    const storedProperties = JSON.parse(
      localStorage.getItem("properties") || "[]"
    );
    setProperties(Array.isArray(storedProperties) ? storedProperties : []);
  }, []);

  const saveBio = (newBio) => {
    setBio(newBio);
    localStorage.setItem("bio", newBio);
  };

  const saveNewProperty = async (propertyData) => {
    try {
      const user = JSON.parse(localStorage.getItem("user"));
      const token = user?.token?.token;

      const res = await axios.post(
        `${import.meta.env.VITE_API_URL}/property`,
        propertyData,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      const addedProperty = res.data.property || propertyData;
      const updatedProperties = [...properties, addedProperty];
      setProperties(updatedProperties);
      localStorage.setItem("properties", JSON.stringify(updatedProperties));
    } catch (error) {
      console.error("Error adding property:", error);
    }
  };

  return (
    <div className="max-w-4xl mx-auto px-6 py-8 font-sans leading-normal border border-gray-300 rounded-xl shadow-lg space-y-8">
      {/* Profile Section */}
      <div className="flex justify-center mt-20 gap-x-4 items-center mb-6">
        <div className="flex flex-col items-center">
          <img
            src={UserImage}
            alt="Profile"
            className="w-20 h-20 rounded-full object-cover border border-gray-300 p-2"
          />
          <p className="mt-2 text-lg font-medium">
            {userData?.fullName || "User"}
          </p>
        </div>
      </div>

      {/* Contact */}
      <div className="flex flex-col border border-gray-300 rounded-xl shadow-lg p-6 space-y-2">
        <div className="flex justify-between items-center">
          <p className="text-base font-normal">Contact Details</p>
        </div>
        <div className="border-t border-gray-300"></div>
        <h5 className="text-sm text-slate-400 mt-2 font-normal">{phone}</h5>
      </div>

      {/* Bio */}
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

      {/* Property List */}
      <div className="border border-gray-300 rounded-xl shadow-lg p-6">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-lg font-semibold">Your Properties</h3>
          <button
            onClick={() => setIsAddPropertyModalOpen(true)}
            className="bg-green-600 text-white px-4 py-1 rounded hover:bg-green-700 text-sm"
          >
            Add Property
          </button>
        </div>

        {properties.length === 0 ? (
          <p className="text-sm text-gray-500">No properties added yet.</p>
        ) : (
          <ul className="space-y-3">
            {properties.map((prop, idx) => (
              <li key={idx} className="flex justify-between items-center">
                <span>
                  {prop.title} - ₦{prop.price}
                </span>
                <TrashIcon
                  className="w-5 h-5 text-red-500 cursor-pointer"
                  onClick={() => {
                    const newProps = properties.filter((_, i) => i !== idx);
                    setProperties(newProps);
                    localStorage.setItem(
                      "properties",
                      JSON.stringify(newProps)
                    );
                  }}
                />
              </li>
            ))}
          </ul>
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
        />
      )}
    </div>
  );
}
