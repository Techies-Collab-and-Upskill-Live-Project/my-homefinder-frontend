import React, { useState, useEffect } from 'react';
import ReactDOM from 'react-dom';
import UploadPicture from './UploadPicture';
import { useProfile } from '../Assets/ProfileContext';

const UpdateProfileModal = ({ onClose }) => {
  const { profileData, updateProfile } = useProfile();

  const [name, setName] = useState(profileData.name || '');
  const [image, setImage] = useState(profileData.image || null);
  const [isSaving, setIsSaving] = useState(false);
  const [saveMessage, setSaveMessage] = useState('');

  useEffect(() => {
    setName(profileData.name || '');
    setImage(profileData.image || null);
  }, [profileData.name, profileData.image]);

  const handleNameChange = (e) => {
    setName(e.target.value);
  };

  const handleImageUpload = (imageUrl) => {
    setImage(imageUrl);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSaving(true);
    setSaveMessage('');

    try {
      await new Promise(resolve => setTimeout(resolve, 800));

      updateProfile({
        name: name,
        image: image,
      });

      setSaveMessage('Profile updated successfully!');
      setTimeout(() => {
        onClose();
      }, 1000);

    } catch (error) {
      console.error('Failed to update profile:', error);
      setSaveMessage('Failed to update profile. Please try again.');
    } finally {
      setIsSaving(false);
      if (saveMessage.includes('Failed')) {
        setTimeout(() => setSaveMessage(''), 3000);
      }
    }
  };

  return ReactDOM.createPortal(
  
    <div className="fixed inset-0 bg-none bg-opacity-50 flex items-center justify-center z-50 p-4" onClick={onClose}>
    
      <div
        className="bg-white rounded-lg shadow-xl w-full max-w-md mx-auto p-6 relative transform transition-all duration-300 ease-out scale-100 opacity-100"
        onClick={(e) => e.stopPropagation()}
      >
        
        <div className="flex justify-between items-center pb-4 mb-4 border-b border-gray-200">
          <h2 className="text-2xl font-semibold text-gray-800">Edit Profile</h2>
          <button
            className="text-gray-500 hover:text-gray-700 text-3xl leading-none"
            onClick={onClose}
            aria-label="Close modal"
          >
            &times;
          </button>
        </div>

       
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="mb-4">
            <label htmlFor="modalName" className="block text-gray-700 text-sm font-bold mb-2">
              Full Name:
            </label>
            <input
              type="text"
              id="modalName"
              value={name}
              onChange={handleNameChange}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              required
              disabled={isSaving}
            />
          </div>

          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2">
              Profile Picture:
            </label>
            <UploadPicture
              onImageSelect={handleImageUpload}
              initialImage={image}
              disabled={isSaving}
            />
          </div>

          {saveMessage && (
            <p className={`text-sm py-2 px-3 rounded ${
              saveMessage.includes('successfully')
                ? 'bg-green-100 text-green-700 border border-green-200'
                : 'bg-red-100 text-red-700 border border-red-200'
            }`}>
              {saveMessage}
            </p>
          )}

         
          <div className="flex justify-end pt-4 border-t border-gray-200 mt-6 space-x-3">
            <button
              type="submit"
              className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 transition-colors duration-200"
              disabled={isSaving}
            >
              {isSaving ? 'Saving...' : 'Save Changes'}
            </button>
            <button
              type="button"
              className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-opacity-50 transition-colors duration-200"
              onClick={onClose}
              disabled={isSaving}
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>,
    document.body
  );
};

export default UpdateProfileModal;