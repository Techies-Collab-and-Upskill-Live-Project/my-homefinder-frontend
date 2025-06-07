import React from "react"
import "../Assets/styles/TenantProfile.css"
import UserImage from "../Assets/images/UserImage.png"
import Pen from "../Assets/images/image9.png"
import Mastercard from "../Assets/images/Mastercard.png"
import Visa from "../Assets/images/Visa-logo.png"
import { useLocation, useNavigate } from 'react-router-dom';
import Navbar from "../components/Navbar"


const TenantProfile = () => {
    const { state } = useLocation();
    const navigate = useNavigate();
     if(!state) return <p>No Data found please go back and submit the form</p>
    return(
        <>
        <Navbar />
        <div className="form-container">
            <div className="profile-header">    
                <div>
                    <img
                        src={state?.image || UserImage}
                        style={{ width: '80px', height: '80px', borderRadius: '50%', objectFit: 'cover' }}
                        alt="Profile"
                    />
                    <p>{state?.name}</p>
                </div>
                <a href="">Update Profile</a>
            </div>
            <div className="profile-contact">
                <div>
                    <p>Contact Details</p>
                    <a href="">+ Add Number</a>
                </div>
                <div className="profile-line"></div>
                <div>
                    <p>{state?.number}</p>
                    <img src={Pen} style={{width: '17px', height: '17px'}} alt="" />
                </div>
                <div>
                    <p>080534237832</p>
                    <img src={Pen} style={{width: '17px', height: '17px'}} alt="" />
                </div>
            </div>
            <div className="profile-address">
                <div>
                    <p>Address</p>
                    <a href="">+ Add Address</a>
                </div>
                <div className="profile-line"></div>
                <p>{state?.street || "No 52, Badagry Street, Mushin, Lagos"}</p>
            </div>
            <div className="profile-payment">
                <div className="payment-header">
                    <p>Payments</p>
                    <a href="">Manage</a>
                </div>
                <div className="profile-line"></div>
                <div className="card-detail">
                    <img src={Visa} style={{width: '62.9346809387207px', height: '19px'}} alt="" />
                    <div>
                        <p >*****8994</p>
                        <p style={{marginTop: '-13px'}}>Debit Card</p>
                    </div>
                </div>
                <div className="card-detail">
                    <img src={Mastercard} style={{width: '60.2998046875px', height: '35px'}} alt="" />
                    <div>
                        <p>****5676</p>
                        <p style={{marginTop: '-13px'}}>Debit Card</p>
                    </div>
                </div>
            </div>
        </div>
        </>
    )
}

export default TenantProfile;