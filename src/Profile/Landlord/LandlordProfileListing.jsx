import React, { useState } from "react";
import Pen from "../Assets/images/image9.png"
import HouseImage from "../Assets/images/House-Image.png"
import UserImage from "../Assets/images/image8.png"
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import EditNumberModal from "../components/EditNumberModal";
import { useProfile } from "../Assets/ProfileContext";


const LandlordProfileListing = () => {
    const { profileData, updatePhoneNumber } = useProfile();
    const [isEditNumberModalOpen, setIsEditNumberModalOpen] = useState(false);
    const openEditNumberModal = () => setIsEditNumberModalOpen(true);
    const closeEditNumberModal = () => setIsEditNumberModalOpen(false);

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
                        <a href="#" className="text-green-700 text-sm font-medium hover:underline cursor-pointer">Update Profile</a>
                    </div>
                </div>

                
                <div className="flex flex-col border border-gray-300 rounded-xl shadow-lg p-6 space-y-0.5">
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

                <div className="flex flex-col border border-gray-300 rounded-xl shadow-lg p-6 space-y-3">
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

                
                <div className="flex flex-col border border-gray-300 rounded-xl shadow-lg p-6 space-y-3"> 
                    <div className="flex flex-row justify-between items-center mt-2">
                        <p className="text-base font-normal">Listed Properties</p>
                        <a href="#" className="text-sm font-normal text-black hover:underline">Add Property</a>
                    </div>
                    <div className="border-t border-gray-300 rounded-full w-full"></div>

                    
                    <div className="border-[1.5px] border-green-700 p-3.5 rounded-[15px] mt-2.5 relative"> 
                        <div className="flex md:flex-row flex-col justify-start gap-2.5"> 
                            <img src={HouseImage} alt="Property" className="w-[202px] h-[140px]" />
                            <div className="flex flex-col justify-center items-start md:space-y-2.5 space-y-1.5 ml-2.5">
                                <p className="text-xl font-semibold">Grace Ville</p>
                                <p className="text-sm font-semibold opacity-40">142, Lagos road, Apapa Lagos</p>
                                <p className="text-sm font-semibold opacity-40">2 Bedroom Flat, Balcony, Parking lot, 24/7 power, Constant Water, Nearness to road</p>
                                <p className="text-sm font-semibold">2,000,000/year</p>
                            </div>
                        </div>
                        <div className="absolute top-[14px] right-[20px] border-0 rounded-full p-1.5 bg-yellow-100 flex justify-center items-center cursor-pointer transition-all duration-200 hover:bg-green-100 hover:p-[7px]"> {/* profile-like-icon */}
                            <svg width="20" height="21" viewBox="0 0 20 21" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-5 h-5">
                                <path d="M10 7.16602C10 7.16602 10 7.16602 10.6333 6.33268C11.3667 5.36602 12.45 4.66602 13.75 4.66602C15.825 4.66602 17.5 6.34102 17.5 8.41602C17.5 9.19102 17.2667 9.90768 16.8667 10.4993C16.1917 11.5077 10 17.9993 10 17.9993C10 17.9993 3.80833 11.5077 3.13333 10.4993C2.73333 9.90768 2.5 9.19102 2.5 8.41602C2.5 6.34102 4.175 4.66602 6.25 4.66602C7.55 4.66602 8.64167 5.36602 9.36667 6.33268C10 7.16602 10 7.16602 10 7.16602Z" fill="black"/>
                                <path d="M10 7.16602C10 7.16602 10 7.16602 9.36667 6.33268C8.63333 5.36602 7.55 4.66602 6.25 4.66602C4.175 4.66602 2.5 6.34102 2.5 8.41602C2.5 9.19102 2.73333 9.90768 3.13333 10.4993C3.80833 11.5077 10 17.9993 10 17.9993M10 7.16602C10 7.16602 10 7.16602 10.6333 6.33268C11.3667 5.36602 12.45 4.66602 13.75 4.66602C15.825 4.66602 17.5 6.34102 17.5 8.41602C17.5 9.19102 17.2667 9.90768 16.8667 10.4993C16.1917 11.5077 10 17.9993 10 17.9993" stroke="black" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                            </svg>
                        </div>
                    </div>
                </div>

            </div>

            {isEditNumberModalOpen && (
                <EditNumberModal
                    currentNumber={profileData.phoneNumber}
                    onClose={closeEditNumberModal}
                    updatePhoneNumber={updatePhoneNumber}
                />
            )}
            <Footer />
        </>
    );
};

export default LandlordProfileListing;