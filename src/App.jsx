import Home from "./pages/Home";
import Footer from "./Profile/components/Footer";
import Navbar from "./Profile/components/Navbar";

import LandlordProfileB4Listing from "./Profile/Landlord/LandlordProfileB4Listing";
import LandlordProfileListing from "./Profile/Landlord/LandlordProfileListing";
import ProfileFormLandlord from "./Profile/Landlord/ProfileFormLandlord";
import Profile from "./Profile/profile";
import ProfileForm from "./Profile/Tenants/ProfileForm";
import TenantProfile from "./Profile/Tenants/TenantProfile";
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';




function App() {
    return (
      <Router>
        <Routes>
          <Route path="/" element={<Profile />} />
          <Route path="/TenantProfile" element={<TenantProfile />} />
          <Route path="/ProfileForm" element={<ProfileForm />} />
          <Route path="/landlordProfileListing" element={<LandlordProfileListing />} />
          <Route path="/landlordProfileB4Listing" element={<LandlordProfileB4Listing />} />
          <Route path="/profileFormLandlord" element={<ProfileFormLandlord />} />
        </Routes>
      </Router>
      );
}

export default App
