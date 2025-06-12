import React from "react";
import '../Assets/styles/LandlordProfileB4Listing.css'

import Pen from "../Assets/images/image9.png"
import HouseImage from "../Assets/images/House-Image.png" 
import UserImage from "../Assets/images/image8.png"
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import EditNumberModal from "../components/EditNumberModal";
import { useProfile } from "../Assets/ProfileContext";
import { useState } from "react";



const LandlordProfileListing = () => {

        const { profileData, updatePhoneNumber } = useProfile();
        const [isEditNumberModalOpen, setIsEditNumberModalOpen] = useState(false);
        const openEditNumberModal = () => setIsEditNumberModalOpen(true);
        const closeEditNumberModal = () => setIsEditNumberModalOpen(false);
    return(
        <>
        <Navbar />
        <div className="form1">
            <div style={{display: 'flex', flexDirection: 'row',}} className="profile-header">  
                <div>
                    <img
                        src={profileData.image || UserImage}
                        style={{ width: '80px', height: '80px', borderRadius: '50%', objectFit: 'cover' }}
                        alt="Profile"
                    />
                    <p>{profileData.name || "Lucy Favy"}</p>
                </div>  
                
                <div className="header-details" style={{marginTop: '75px', display: 'flex', flexDirection: 'row', gap: '5px', alignItems: 'center'}} >
                    <svg width="14" height="16" viewBox="0 0 18 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M12 8L8 12L6 10M1 3V10.0557C1 13.0859 2.71202 15.856 5.42229 17.2111L9 19L12.5777 17.2111C15.288 15.856 17 13.0859 17 10.0557V3L16.303 3.07744C13.8542 3.34953 11.3912 2.70802 9.3863 1.27594L9 1L8.6137 1.27594C6.60878 2.70802 4.14576 3.34953 1.69699 3.07744L1 3Z" stroke="#0D7B0D" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                    </svg>
                    <a href="">Update Profile</a>
                </div>
                
            </div>
            <div className="profile-contact gap-y-4">
                <div>
                    <p>Contact Details</p>
                    <a href="">+ Add Number</a>
                </div>
                <div className="profile-line"></div>
                <div>
                    <p>{profileData.phoneNumber || "08157648539"}</p>
                    <img onClick={openEditNumberModal} src={Pen} style={{ width: '17px', height: '17px', cursor: 'pointer' }} alt="Edit Phone" />
                </div>
                <div>
                    <p>{profileData.phoneNumber || "08157648539"}</p>
                    <img onClick={openEditNumberModal} src={Pen} style={{ width: '17px', height: '17px', cursor: 'pointer' }} alt="Edit Phone" />
                </div>
            </div>
            <div className="profile-bio">
                <div>
                    <p>Bio</p>
                    <img src={Pen} style={{width: '17px', height: '17px'}} alt="" />
                </div>
                <div className="profile-line"></div>
                <p>Figma ipsum component variant main layer subtract opacity 
                    union export boolean asset clip draft. Outline bold vector
                    storke blur component auto scale component project. shadow component main section
                    font resizing object project project bold resizing. 
                </p>
            </div>
            <div className="profile-property gap-y-3">
                <div className="mt-2">
                    <p>Listed Properties</p>
                    <a href="">Add Property</a>
                </div>
                <div className="profile-line"></div>
                <div className="profile-property-details-container">
                    <div className="profile-property-details">
                        <img src={HouseImage} style={{width: '202px', height: '140px'}} alt="" />
                        <div>
                            <p style={{fontSize: '20px', fontWeight: '600', }}>Grace Ville</p>
                            <p style={{fontSize: '14px', fontWeight: '600', opacity: '40%'}}>142, Lagos road, Apapa Lagos</p>
                            <p style={{fontSize: '14px', fontWeight: '600', opacity: '40%'}}>2 Bedroom Flat, Balcony, Parking lot, 24/7 power, Constant Water, Nearness to road</p>
                            <p style={{fontSize: '14px', fontWeight: '600'}}>2,000,000/year</p>
                        </div>
                    </div>
                    <div className="profile-like-icon">
                        <svg width="20" height="21" viewBox="0 0 20 21" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M10 7.16602C10 7.16602 10 7.16602 10.6333 6.33268C11.3667 5.36602 12.45 4.66602 13.75 4.66602C15.825 4.66602 17.5 6.34102 17.5 8.41602C17.5 9.19102 17.2667 9.90768 16.8667 10.4993C16.1917 11.5077 10 17.9993 10 17.9993C10 17.9993 3.80833 11.5077 3.13333 10.4993C2.73333 9.90768 2.5 9.19102 2.5 8.41602C2.5 6.34102 4.175 4.66602 6.25 4.66602C7.55 4.66602 8.64167 5.36602 9.36667 6.33268C10 7.16602 10 7.16602 10 7.16602Z" fill="black"/>
                        <path d="M10 7.16602C10 7.16602 10 7.16602 9.36667 6.33268C8.63333 5.36602 7.55 4.66602 6.25 4.66602C4.175 4.66602 2.5 6.34102 2.5 8.41602C2.5 9.19102 2.73333 9.90768 3.13333 10.4993C3.80833 11.5077 10 17.9993 10 17.9993M10 7.16602C10 7.16602 10 7.16602 10.6333 6.33268C11.3667 5.36602 12.45 4.66602 13.75 4.66602C15.825 4.66602 17.5 6.34102 17.5 8.41602C17.5 9.19102 17.2667 9.90768 16.8667 10.4993C16.1917 11.5077 10 17.9993 10 17.9993" stroke="black" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                        </svg>
                    </div>
                </div>
            </div>
            {isEditNumberModalOpen && (
                <EditNumberModal
                currentNumber={profileData.phoneNumber}
                onClose={closeEditNumberModal}
            />
            )}
        </div>
        <Footer />
        </>
    )
}

export default LandlordProfileListing;