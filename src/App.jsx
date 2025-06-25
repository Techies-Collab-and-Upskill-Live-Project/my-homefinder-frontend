import React from "react";
import { Routes, Route } from "react-router-dom";
import Landing from "./pages/Landing";
import Layout from "./layout/Layout";
import "./index.css";
import DecisionPage from "./pages/DecisionPage";
import LandlordListingPage from "./pages/LandlordListingPage";
import LandlordLogin from "./pages/LandlordLogin";
import LandlordSignUpPage from './pages/LandlordSignUpPage';
import Messages from "./pages/Messages";
import OtpSelection from "./pages/OtpSelection";
import OtpVerification from "./pages/OtpVerification";
import Profile from "./pages/Profile";
import TenantListing from "./pages/TenantListing";
import TenantLogin from "./pages/TenantLogin";
import TenantSignUpPage from "./pages/TenantSignUpPage";

// import 'leaflet/dist/leaflet.css';

function App() {
  return (
    <>
      <Routes>
        <Route element={<Layout />}>
          <Route index element={<Landing />} />
          <Route path= "/decisionpage" element={<DecisionPage />} />
          <Route path= "/landlordlistingpage" element={<LandlordListingPage />} />
          <Route path= "/landlordlogin" element={<LandlordLogin />} />
          <Route path= "/landlordsignuppage" element={<LandlordSignUpPage />} />
          <Route path= "/messages" element={<Messages />} />
          <Route path= "/otpselection" element={<OtpSelection />} />
          <Route path= "/otpverification" element={<OtpVerification />} />
          <Route path= "/profile" element={<Profile />} />
          <Route path= "/tenantlisting" element={<TenantListing />} />
          <Route path= "/tenantlogin" element={<TenantLogin />} />
          <Route path= "/tenantsignuppage" element={<TenantSignUpPage />} />

        </Route>
      </Routes>
    </>
  );
}

export default App;
