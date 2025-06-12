
import React, { useState } from "react";
import "../Assets/styles/TenantProfile.css";
import Pen from "../Assets/images/image9.png"; 
import Mastercard from "../Assets/images/Mastercard.png";
import Visa from "../Assets/images/Visa-logo.png";
import Navbar from "../components/Navbar";
import EditNumberModal from "../components/EditNumberModal";
import UpdateProfileModal from '../components/UpdateProfileModal';
import { useProfile } from "../Assets/ProfileContext";

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
      <div className="form-container">
        <div className="profile-header">
          <div>
            <img
              src={profileData.image || defaultUserImage}
              style={{ width: '80px', height: '80px', borderRadius: '50%', objectFit: 'cover' }}
              alt="Profile"
            />
            <p>{profileData.name || "Lucy Favy"}</p>
          </div>
          <a onClick={openUpdateProfileModal} className="update-profile-btn" style={{cursor: 'pointer'}}>
            Update Profile
          </a>
        </div>

        <div className="profile-contact">
          <div>
            <p>Contact Details</p>
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

        <div className="profile-payment">
          <div className="payment-header">
            <p>Payments</p>
            <button className="manage-payments-btn">Manage</button>
          </div>
          <div className="profile-line"></div>
          <div className="card-detail">
            <img src={Visa} style={{ width: '62.93px', height: '19px' }} alt="Visa Card" />
            <div>
              <p >*****8994</p>
              <p style={{ marginTop: '-13px' }}>Debit Card</p>
            </div>
          </div>
          <div className="card-detail">
            <img src={Mastercard} style={{ width: '60.30px', height: '35px' }} alt="Mastercard" />
            <div>
              <p>****5676</p>
              <p style={{ marginTop: '-13px' }}>Debit Card</p>
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