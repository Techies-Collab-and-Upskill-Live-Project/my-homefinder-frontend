
import React, { useState } from "react";
import Mastercard from "/images/Mastercard.png";
import EditNumberModal from "../Components/EditNumberModal";
import UpdateProfileModal from '../Components/UpdateProfileModal';
import { useProfile } from "../Components/ProfileContext";
// import { PencilLine } from "phosphor-react";

const TenantProfile = () => {
  const { profileData, updatePhoneNumber } = useProfile();

  const [isEditNumberModalOpen, setIsEditNumberModalOpen] = useState(false);
  const [showUpdateProfileModal, setShowUpdateProfileModal] = useState(false);

  const openEditNumberModal = () => setIsEditNumberModalOpen(true);
  const closeEditNumberModal = () => setIsEditNumberModalOpen(false);

  const openUpdateProfileModal = () => setShowUpdateProfileModal(true);
  const closeUpdateProfileModal = () => setShowUpdateProfileModal(false);

  const defaultUserImage = "https://via.placeholder.com/150";

  if (!profileData) {
    return (
      <div className="min-h-screen bg-gray-100 p-8 flex justify-center items-center">
        <p className="text-gray-600">Loading profile data...</p>
      </div>
    );
  }

  return (
    <>
      <Navbar />
      <div className="max-w-4xl mx-auto mt-32 p-8 md:p-14 font-sans leading-tight border border-gray-300 rounded-xl shadow-lg flex flex-col gap-8">
        <div className="flex flex-row items-center justify-center gap-3 md:gap-6">
          <div className="flex flex-col items-center justify-center gap-2">
            <img
              src={profileData.image || defaultUserImage}
              
              className="w-20 h-20 rounded-full object-cover"
              alt="Profile"
            />
            <p className="text-black text-xl font-semibold">{profileData.name || "Lucy Favy"}</p>
          </div>
          <a
            onClick={openUpdateProfileModal}
            className="text-orange-500 text-sm font-normal cursor-pointer hover:underline"
          >
            Update Profile
          </a>
        </div>

        <div className="flex flex-col border border-gray-300 rounded-xl shadow-lg p-6 mt-5 gap-3">
          <div className="flex flex-row justify-between items-center mt-4">
            <p className="text-base font-normal">Contact Details</p>
          </div>
          <div className="border border-gray-300 rounded-full w-full"></div>
          <div className="flex flex-row justify-between items-center mt-4">
            <p className="text-base font-normal">{profileData.phoneNumber || "08157648539"}</p>
            <PencilLine size={32} onClick={openEditNumberModal} className="cursor-pointer" />
          </div>
          <div className="flex flex-row justify-between items-center mt-4">
            <p className="text-base font-normal">{profileData.phoneNumber || "08157648539"}</p>
            <PencilLine size={32} onClick={openEditNumberModal}  className="cursor-pointer"  />
          </div>
        </div>

        
        <div className="flex flex-col border border-gray-300 rounded-xl shadow-lg p-6 mt-5 gap-4">
          <div className="flex flex-row justify-between items-center">
            <p className="text-base font-normal">Payments</p>
            <button className="text-sm font-normal text-black bg-transparent border border-gray-300 px-4 py-2 rounded-md hover:bg-gray-100 transition-colors">
              Manage
            </button>
          </div>
          <div className="border border-gray-300 rounded-full w-full"></div>
          <div className="flex flex-row justify-start items-center gap-5">
            <img src={Visa} className="w-16 h-5" alt="Visa Card" /> 
            <div className="flex flex-col gap-2">
              <p className="text-base font-normal">*****8994</p>
              <p className="text-base font-normal -mt-3">Debit Card</p> 
            </div>
          </div>
          <div className="flex flex-row justify-start items-center gap-5">
            <img src={Mastercard} className="w-15 h-9" alt="Mastercard" /> 
            <div className="flex flex-col gap-2">
              <p className="text-base font-normal">****5676</p>
              <p className="text-base font-normal -mt-3">Debit Card</p> 
            </div>
          </div>
        </div>

        {isEditNumberModalOpen && (
          <EditNumberModal
            currentNumber={profileData.phoneNumber}
            onClose={closeEditNumberModal}
          />
        )}

        {showUpdateProfileModal && (
          <UpdateProfileModal
            onClose={closeUpdateProfileModal}
          />
        )}
      </div>
    </>
  );
};

export default TenantProfile;