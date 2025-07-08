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

  useEffect(() => {
    try {
      const storedPhones = JSON.parse(
        localStorage.getItem("phoneNumbers") || "[]"
      );
      const storedBio = localStorage.getItem("bio") || "No bio added yet.";
      const storedProperties = JSON.parse(
        localStorage.getItem("properties") || "[]"
      );

      setPhoneNumbers(Array.isArray(storedPhones) ? storedPhones : []);
      setBio(typeof storedBio === "string" ? storedBio : "No bio added yet.");
      setProperties(Array.isArray(storedProperties) ? storedProperties : []);
    } catch (err) {
      console.error("Error loading data from localStorage", err);
      setPhoneNumbers([]);
      setBio("No bio added yet.");
      setProperties([]);
    }
  }, []);

  const savePhoneNumbers = (newNumbers) => {
    setPhoneNumbers(Array.isArray(newNumbers) ? newNumbers : []);
    localStorage.setItem("phoneNumbers", JSON.stringify(newNumbers));
  };

  const saveBio = (newBio) => {
    setBio(typeof newBio === "string" ? newBio : "");
    localStorage.setItem("bio", newBio);
  };

  const saveProperties = (newProperties) => {
    setProperties(Array.isArray(newProperties) ? newProperties : []);
    localStorage.setItem("properties", JSON.stringify(newProperties));
  };

  const handleDeleteNumber = (indexToDelete) => {
    const updatedNumbers = phoneNumbers.filter(
      (_, index) => index !== indexToDelete
    );
    savePhoneNumbers(updatedNumbers);
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
            <p className="mt-2 text-lg font-medium">Lucy Favy</p>
          </div>
        </div>

        <div className="flex flex-col border border-gray-300 rounded-xl shadow-lg p-6 space-y-2">
          <div className="flex justify-between items-center">
            <p className="text-base font-normal">Contact Details</p>
            <span
              onClick={() => {
                setEditingIndex(null);
                setIsEditNumberModalOpen(true);
              }}
              className="text-sm font-normal text-black hover:underline cursor-pointer"
            >
              + Add Number
            </span>
          </div>
          <div className="border-t border-gray-300"></div>
          {phoneNumbers.length > 0 ? (
            phoneNumbers.map((num, index) => (
              <div key={index} className="flex justify-between items-center">
                <p className="text-base font-normal">{num}</p>
                <span className="flex items-center gap-2">
                  <PencilLineIcon
                    size={24}
                    onClick={() => {
                      setEditingIndex(index);
                      setIsEditNumberModalOpen(true);
                    }}
                    className="cursor-pointer text-green-600 hover:text-green-800"
                  />
                  <button
                    onClick={() => handleDeleteNumber(index)}
                    className="text-red-500 hover:text-red-700 ml-4"
                  >
                    <TrashIcon size={24} />
                  </button>
                </span>
              </div>
            ))
          ) : (
            <p className="text-sm text-gray-500">No phone numbers added.</p>
          )}
        </div>

        <div className="flex flex-col border border-gray-300 rounded-xl shadow-lg p-6 space-y-3">
          <div className="flex justify-between items-center">
            <p className="text-base font-normal">Bio</p>
            <PencilLineIcon
              size={32}
              onClick={() => setIsEditBioModalOpen(true)}
              className="cursor-pointer"
            />
          </div>
          <div className="border-t border-gray-300"></div>
          <p className="text-sm text-gray-700 break-words">{bio}</p>
        </div>

        <div className="flex flex-col border border-gray-300 rounded-xl shadow-lg p-6 space-y-3">
          <div className="flex justify-between items-center">
            <p className="text-base font-normal">Listed Properties</p>
            <span
              onClick={() => setIsAddPropertyModalOpen(true)}
              className="text-sm font-normal text-black hover:underline cursor-pointer"
            >
              + Add Property
            </span>
          </div>
          <div className="border-t border-gray-300"></div>
          {properties.length > 0 ? (
            properties.map((prop, index) => (
              <div key={index} className="text-sm text-gray-700 space-y-1">
                <p>
                  <strong>Address:</strong> {prop.address}
                </p>
                <p>
                  <strong>Description:</strong> {prop.description}
                </p>
                <p>
                  <strong>Price:</strong> ₦{prop.price}
                </p>
                <p>
                  <strong>Tags:</strong> {prop.tags.join(", ")}
                </p>
                <div className="flex space-x-2">
                  {prop.images.map((img, i) => (
                    <img
                      key={i}
                      src={img}
                      alt="property"
                      className="w-20 h-20 object-cover rounded"
                    />
                  ))}
                </div>
              </div>
            ))
          ) : (
            <p className="text-sm text-gray-500">No properties listed yet.</p>
          )}
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
