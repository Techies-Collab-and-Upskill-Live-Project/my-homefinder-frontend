import Home from "./pages/Home";
import Footer from "./Profile/components/Footer";
import Navbar from "./Profile/components/Navbar";

import LandlordProfileB4Listing from "./Profile/Landlord/LandlordProfileB4Listing";
import LandlordProfileListing from "./Profile/Landlord/LandlordProfileListing";
import ProfileFormLandlord from "./Profile/Landlord/ProfileFormLandlord";
import ProfileForm from "./Profile/Tenants/ProfileForm";
import TenantProfile from "./Profile/Tenants/TenantProfile";
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';




function App() {
    return (
      <Router>
        <Routes>
          <Route path="/" element={<ProfileForm />} />
          <Route path="/TenantProfile" element={<TenantProfile />} />
        </Routes>
      </Router>
      );
}

export default App
