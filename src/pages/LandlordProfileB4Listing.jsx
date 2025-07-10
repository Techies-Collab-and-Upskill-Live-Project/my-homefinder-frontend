import React, { useState, useEffect } from "react";
import UserImage from "/images/image8.png";
import { PencilLineIcon, TrashIcon } from "@phosphor-icons/react";
import EditNumberModal from "../Components/EditNumberModal";
import EditBioModal from "../Components/EditBioModal";
import AddPropertyModal from "../Components/AddPropertyModal";

const LandlordProfileB4Listing = () => {
  const [isEditNumberModalOpen, setIsEditNumberModalOpen] = useState(false);
  const [isEditBioModalOpen, setIsEditBioModalOpen] = useState(false);
  const [isAddPropertyModalOpen, setIsAddPropertyModalOpen] = useState(false);

  const [phoneNumbers, setPhoneNumbers] = useState([]);
  const [bio, setBio] = useState("");
  const [properties, setProperties] = useState([]);
  const [editingIndex, setEditingIndex] = useState(null);

  const [userData, setUserData] = useState(null);
  useEffect(() => {
  const userDetails = JSON.parse(localStorage.getItem("user"));
  setUserData(userDetails);

    try {
      const storedBio = localStorage.getItem("bio") || "No bio added yet.";
      const storedProperties = JSON.parse(
        localStorage.getItem("properties") || "[]"
      );

      setPhoneNumbers(userData.data.phone);
      setBio(typeof storedBio === "string" ? storedBio : "No bio added yet.");
      setProperties(Array.isArray(storedProperties) ? storedProperties : []);
    } catch (err) {
      console.error("Error loading data from localStorage", err);
      setPhoneNumbers([]);
      setBio("No bio added yet.");
      setProperties([]);
    }
  }, []);

  const saveBio = (newBio) => {
    setBio(typeof newBio === "string" ? newBio : "");
    localStorage.setItem("bio", newBio);
  };

  const saveProperties = (newProperties) => {
    setProperties(Array.isArray(newProperties) ? newProperties : []);
    localStorage.setItem("properties", JSON.stringify(newProperties));
  };

  return (
    <>
      <div className="max-w-4xl mx-auto px-6 py-8 font-sans leading-normal border border-gray-300 rounded-xl shadow-lg space-y-8">
        <div className="flex justify-center mt-20 gap-x-4 items-center mb-6">
          <div className="flex flex-col items-center">
            <img
              src={UserImage}
              alt="Profile"
              className="w-20 h-20 rounded-full object-cover border border-gray-300 p-2"
            />
            <p className="mt-2 text-lg font-medium">{userData.data.fullName}</p>
          </div>
        </div>

        <div className="flex flex-col border border-gray-300 rounded-xl shadow-lg p-6 space-y-2">
          <div className="flex justify-between items-center">
            <p className="text-base font-normal">Contact Details</p>
            <span
              onClick={() => {
                setIsEditNumberModalOpen(true);
              }}
              className="flex items-center gap-x-2 text-sm font-normal text-black hover:underline cursor-pointer"
            >
              <PencilLineIcon className="w-4 h-4" /> Edit Number
            </span>
          </div>
          <div className="border-t border-gray-300"></div>
          <h5 className="text-sm text-slate-400 mt-2 font-normal">{phoneNumbers}</h5>
        </div>
      </div>

      {isEditNumberModalOpen && (
        <EditNumberModal
          initialNumber={
            editingIndex !== null ? phoneNumbers[editingIndex] : ""
          }
          onClose={() => {
            setIsEditNumberModalOpen(false);
            setEditingIndex(null);
          }}
          onSave={(newNumber) => {
            let updatedNumbers = [...phoneNumbers];
            if (editingIndex !== null) {
              updatedNumbers[editingIndex] = newNumber; // update existing number
            } else {
              updatedNumbers.push(newNumber); // add new number
            }
            savePhoneNumbers(updatedNumbers);
            setEditingIndex(null);
            setIsEditNumberModalOpen(false);
          }}
        />
      )}

      {isEditBioModalOpen && (
        <EditBioModal
          currentBio={bio}
          onClose={() => setIsEditBioModalOpen(false)}
          onSave={saveBio}
        />
      )}

      {isAddPropertyModalOpen && (
        <AddPropertyModal
          currentProperties={properties}
          onClose={() => setIsAddPropertyModalOpen(false)}
          onSave={saveProperties}
        />
      )}
    </>
  );
};

export default LandlordProfileB4Listing;
