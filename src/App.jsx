import React from "react";
import { Routes, Route } from "react-router-dom";
import Landing from "./pages/Landing"
import Layout from "./layout/Layout";
import LandlordListingPage from "./pages/LandlordListingPage";
// import LandlordLogin from "./pages/LandlordLogin";
// import LandlordSignUpPage from "./pages/LandlordSignUpPage";
import Messages from "./pages/Messages";
import Profile from "./pages/Profile";
import TenantListing from "./pages/TenantListing";
// import TenantLogin from "./pages/TenantLogin";
import OtpSelection from "./pages/OtpSelection";
import OtpVerification from "./pages/OtpVerification";
import NotFound from "./pages/NotFound";
import "./Tailwind.css";
// import 'leaflet/dist/leaflet.css';

function App() {
    return (
          <>
          <Routes>
            <Route element = {<Layout />}>
            <Route index element = {<Landing />}/>
            <Route path = "/Messages" element = {<Messages />}/>
            <Route path = "/LandlordListingPage" element = {<LandlordListingPage />}/>
            <Route path = "/TenantListing" element = {<TenantListing />}/>
            {/* <Route path = "/LandlordLogin" element = {<LandlordLogin />}/> */}
            {/* <Route path = "/LandlordSignUp" element = {<LandlordSignUp />}/> */}
            <Route path = "/OtpSelection" element = {<OtpSelection />}/>
            <Route path = "/OtpVerification" element = {<OtpVerification />}/>
            <Route path = "/Profile" element = {<Profile />}/>
            {/* <Route path = "/TenantLogin" element = {<TenantLogin />}/> */}
            </Route>
          </Routes>
          </>
          
    );
};

export default App;




