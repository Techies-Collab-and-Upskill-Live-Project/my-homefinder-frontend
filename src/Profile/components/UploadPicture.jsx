
import React, { useRef, useState, useEffect } from 'react';
import "../Assets/styles/ProfileForm.css";
import ProfileImage from '../Assets/images/ProfileIcon.png';
import { useProfile } from '../Assets/ProfileContext';

const UploadPicture = ({ onImageSelect, initialImage, disabled }) => {
  const { updateProfile } = useProfile();

  const [preview, setPreview] = useState(null);
  const fileInputRef = useRef(null);

  useEffect(() => {
    if (initialImage) {
      setPreview(initialImage);
    } else {
      setPreview(null);
    }
  }, [initialImage]);

  const handleButtonClick = () => {
    if (!disabled) {
      fileInputRef.current.click();
    }
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const imageUrl = URL.createObjectURL(file);
      setPreview(imageUrl);

      
      updateProfile({ image: imageUrl });

      if (onImageSelect) {
        onImageSelect(imageUrl); 
      }
    }
  };

  return (
    <div className="upload-section">
      {preview ?
        <img
          src={preview}
          alt="Profile Preview"
          style={{
            width: '60px',
            height: '60px',
            borderRadius: '50%',
            objectFit: 'cover',
          }}
        />
        :
        <div className="upload-circle">
          <img style={{ width: '27px', height: '27px' }} src={ProfileImage} alt="Upload Icon" />
        </div>}

      <input
        type="file"
        accept="image/*"
        ref={fileInputRef}
        style={{ display: 'none' }}
        onChange={handleFileChange}
        disabled={disabled}
      />

      <button
        type="button"
        className="upload-btn"
        onClick={handleButtonClick}
        disabled={disabled}
      >
        Upload Picture
      </button>
    </div>
  );
};

export default UploadPicture;