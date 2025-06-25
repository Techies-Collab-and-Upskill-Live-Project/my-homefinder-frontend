import React, { useState } from "react";
import Pen from "../Assets/images/image9.png"
import UserImage from "../Assets/images/image8.png"
import Navbar from "../components/Navbar";
import { useNavigate } from "react-router-dom";
import EditNumberModal from "../components/EditNumberModal";
import { useProfile } from "../Assets/ProfileContext";

const LandlordProfileB4Listing = () => {
    const { profileData, updatePhoneNumber } = useProfile();
    const [isEditNumberModalOpen, setIsEditNumberModalOpen] = useState(false);
    const openEditNumberModal = () => setIsEditNumberModalOpen(true);
    const closeEditNumberModal = () => setIsEditNumberModalOpen(false);

    const navigate = useNavigate();
    if (!profileData) return <p className="text-center text-lg mt-10">No Data found, please go back and submit the form.</p>

    return (
        <>
            <Navbar />
            <div className="max-w-4xl mx-auto px-6 py-8 mt-32 font-sans leading-normal border border-gray-300 rounded-xl shadow-lg space-y-8">
                <div className="flex justify-center gap-x-4 items-center mb-6">
                    <div className="flex flex-col items-center">
                        <img
                            src={profileData.image || UserImage}
                            alt="Profile"
                            className="w-20 h-20 rounded-full object-cover border border-gray-300 p-2"
                        />
                        <p className="mt-2 text-lg font-medium">{profileData.name || "Lucy Favy"}</p>
                    </div>

                    
                    <div className="flex flex-row items-center gap-1 mt-6">
                        <svg width="14" height="16" viewBox="0 0 18 20" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-4 h-4">
                            <path d="M12 8L8 12L6 10M1 3V10.0557C1 13.0859 2.71202 15.856 5.42229 17.2111L9 19L12.5777 17.2111C15.288 15.856 17 13.0859 17 10.0557V3L16.303 3.07744C13.8542 3.34953 11.3912 2.70802 9.3863 1.27594L9 1L8.6137 1.27594C6.60878 2.70802 4.14576 3.34953 1.69699 3.07744L1 3Z" stroke="#0D7B0D" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                        <a className="text-green-700 text-sm font-medium hover:underline cursor-pointer">
                            Update Profile
                        </a>
                    </div>
                </div>

                <div className="flex flex-col border border-gray-300 rounded-xl shadow-lg p-6 space-y-0.5 mt-4"> {/* profile-contact with individual styles */}
                    <div className="flex flex-row justify-between items-center">
                        <p className="text-base font-normal -mt-2.5">Contact Details</p>
                        <a href="#" className="text-sm font-normal text-black hover:underline">+ Add Number</a>
                    </div>
                    <div className="border-t border-gray-300 rounded-full w-full"></div>
                    <div className="flex flex-row justify-between items-center">
                        <p className="text-base font-normal">{profileData.phoneNumber || "08157648539"}</p>
                        <img onClick={openEditNumberModal} src={Pen} alt="Edit Phone" className="w-4 h-4 cursor-pointer" />
                    </div>
                    <div className="flex flex-row justify-between items-center">
                        <p className="text-base font-normal">{profileData.phoneNumber || "08157648539"}</p>
                        <img onClick={openEditNumberModal} src={Pen} alt="Edit Phone" className="w-4 h-4 cursor-pointer" />
                    </div>
                </div>
                <div className="flex flex-col border border-gray-300 rounded-xl shadow-lg p-6 space-y-3 mt-4">
                    <div className="flex flex-row justify-between items-center">
                        <p className="text-base font-normal">Bio</p>
                        <img src={Pen} alt="Edit Bio" className="w-4 h-4" />
                    </div>
                    <div className="border-t border-gray-300 rounded-full w-full"></div>
                    <p className="text-sm text-gray-700 break-words">
                        Figma ipsum component variant main layer subtract opacity
                        union export boolean asset clip draft. Outline bold vector
                        storke blur component auto scale component project. shadow component main section
                        font resizing object project project bold resizing.
                    </p>
                </div>

                <div className="flex flex-col border border-gray-300 rounded-xl shadow-lg p-6 space-y-3 mt-4">
                    <div className="flex flex-row justify-between items-center">
                        <p className="text-base font-normal">Listed Properties</p>
                        <a href="#" className="text-sm font-normal text-black hover:underline">+ Add Address</a>
                    </div>
                    <div className="border-t border-gray-300 rounded-full w-full"></div>
                </div>

            </div>

            {isEditNumberModalOpen && (
                <EditNumberModal
                    currentNumber={profileData.phoneNumber}
                    onClose={closeEditNumberModal}
                    updatePhoneNumber={updatePhoneNumber}
                />
            )}
        </>
    );
};

export default LandlordProfileB4Listing;