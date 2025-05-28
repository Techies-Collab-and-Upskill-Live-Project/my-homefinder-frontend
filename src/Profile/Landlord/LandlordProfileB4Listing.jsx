import React from "react";
import '../Assets/styles/LandlordProfileB4Listing.css'

import Pen from "../Assets/images/image9.png"

import UserImage from "../Assets/images/image8.png"


const LandlordProfileB4Listing = () => {
    return(
        <div className="form-container">
            <div style={{display: 'flex', flexDirection: 'row',}} className="profile-header">  
                <div>
                    <div className="header-image">
                        <img src={UserImage} style={{width: '30px', height: '30px'}} alt="" />
                    </div>
                    <p >Fave Lucy</p>
                </div>  
                
                <div className="header-details" style={{marginTop: '75px', display: 'flex', flexDirection: 'row', gap: '5px', alignItems: 'center'}} >
                    <svg width="14" height="16" viewBox="0 0 18 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M12 8L8 12L6 10M1 3V10.0557C1 13.0859 2.71202 15.856 5.42229 17.2111L9 19L12.5777 17.2111C15.288 15.856 17 13.0859 17 10.0557V3L16.303 3.07744C13.8542 3.34953 11.3912 2.70802 9.3863 1.27594L9 1L8.6137 1.27594C6.60878 2.70802 4.14576 3.34953 1.69699 3.07744L1 3Z" stroke="#0D7B0D" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                    </svg>
                    <a href="">Update Profile</a>
                </div>
                
            </div>
            <div className="profile-contact">
                <div>
                    <p>Contact Details</p>
                    <a href="">+ Add Number</a>
                </div>
                <div className="profile-line"></div>
                <div>
                    <p>08112345678</p>
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
                <p>No 52, Badagry Street, Mushin, Lagos</p>
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
            <div className="profile-property">
                <div>
                    <p>Listed Properties</p>
                    <a href="">+ Add Address</a>
                </div>
                <div className="profile-line"></div>
            </div>
        </div>
    )
}

export default LandlordProfileB4Listing;