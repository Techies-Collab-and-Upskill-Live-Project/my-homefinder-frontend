
import React, { useRef, useState } from 'react';
import "../Assets/styles/ProfileForm.css"
import ProfileImage from '../Assets/images/ProfileIcon.png'
import { useProfile } from '../Assets/ProfileContext'; // Import the context to manage profile image state

const UploadPicture = ({ onImageSelect }) => {

  const { setProfileImage } = useProfile();
  
  const [preview, setPreview] = useState(null);
  const fileInputRef = useRef(null);

  const handleButtonClick = () => {
    fileInputRef.current.click(); // open file dialog
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const imageUrl = URL.createObjectURL(file);
      setPreview(imageUrl);
      setProfileImage(imageUrl); // update the context with the new image
      onImageSelect(imageUrl); // preview the image
    }
  };

  return (
    <div className="upload-section">
      {preview ? 
        <img src={preview} alt="Preview" width="150" 
        style={{
        width: '60px',
        height: '60px',
        borderRadius: '50%',
        objectFit: 'cover',}} />
        
       : 
        <div className="upload-circle">
            <img style={{width:'27px', height: '27px' }} src={ProfileImage} alt="Upload Icon" />
        </div>}
      
      <input
        type="file"
        accept="image/*"
        ref={fileInputRef}
        style={{ display: 'none' }}
        onChange={handleFileChange}
      />
      
      <button className="upload-btn" onClick={handleButtonClick}>Upload Picture</button>
    </div>
  );
};

export default UploadPicture;
