
import { createContext, useState, useContext } from 'react';

const ProfileContext = createContext();

export const useProfile = () => useContext(ProfileContext);

export const ProfileProvider = ({ children }) => {
  const [profileData, setProfileData] = useState({
    name: '',
    phoneNumber: '',
    nin: '',
    image: null, 
    email: '', 
  });

  const updatePhoneNumber = (newNumber) => {
    setProfileData(prevProfileData => ({
      ...prevProfileData,
      phoneNumber: newNumber,
    }));
  };

  const updateProfile = (newData) => {
    setProfileData(prevProfileData => ({
      ...prevProfileData,
      ...newData,
    }));
  };

  return (
    <ProfileContext.Provider value={{
      profileData,
      setProfileData,
      updatePhoneNumber,
      updateProfile,
      
    }}>
      {children}
    </ProfileContext.Provider>
  );
};