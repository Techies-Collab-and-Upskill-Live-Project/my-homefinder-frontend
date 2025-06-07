// This file defines a context for managing the profile data state in a React application.

import { createContext, useState, useContext } from 'react';

const ProfileContext = createContext();

export const useProfile = () => useContext(ProfileContext);

export const ProfileProvider = ({ children }) => {
  const [profileImage, setProfileImage] = useState(null);
  const [profileData, setProfileData] = useState(null);

  return (
    <ProfileContext.Provider value={{ profileImage, setProfileImage, profileData, setProfileData }}>
      {children}
    </ProfileContext.Provider>
  );
};
