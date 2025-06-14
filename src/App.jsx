import React from "react";
import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import TenantListing from "./pages/TenantListing";
import LandlordlistingPage from "./pages/LandlordListingPage";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer"
// profile start
import LandlordProfileB4Listing from "./Profile/Landlord/LandlordProfileB4Listing";
import LandlordProfileListing from "./Profile/Landlord/LandlordProfileListing";
import ProfileFormLandlord from "./Profile/Landlord/ProfileFormLandlord";
import Profile from "./Profile/profile";
import ProfileForm from "./Profile/Tenants/ProfileForm";
import TenantProfile from "./Profile/Tenants/TenantProfile";
// profile end

// landing start
import Hero from "./components/Hero";
import PropertyList from "./components/PropertyList";
import Testimonials from "./components/Testimonials";
import SearchFeature from "./components/SearchFeature";
import SubSection from "./pages/Home";
// landing end

// OTP start
import DecisionPage from './components/DecisionPage';
import PropertyCard from "./components/PropertyHero";
import PropertyDetails from "./components/PropertyDetails";
import TopNavbar from "./layout/TopNavbar";
import Sidebar from "./layout/Sidebar";
import OtpSelection from "./pages/otpSelection";
import OtpVerification from "./pages/otpVerification";
// OTP end
import Landing from "./pages/Landing";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Messages from "./pages/Messages";
import NotFound from "./pages/NotFound"
import "./Tailwind.css";
import 'leaflet/dist/leaflet.css';

function App() {
    return (
          <section>
          <Navbar />
          <div className="">
            <Hero />
            <SearchFeature /> 
           </div>
            <SubSection />
            <PropertyList />
            <Testimonials />
            <LandlordlistingPage />
            <DecisionPage />
          <LandlordlistingPage />
          <TenantListing />
          <Messages />
          <Footer />
          {/* Wrapping the application with Router to enable routing */}
          {/* and defining the routes for different pages */}
          {/* Each Route component specifies a path and the corresponding component to render */}
          <Routes>
            <Route path="/" element={<Landing />} />
            <Route path="/decision" element={<Decision />} />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/" element={<Profile />} />
            <Route path="/TenantProfile" element={<TenantProfile />} />
            <Route path="/ProfileForm" element={<ProfileForm />} />
            <Route path="/landlordProfileListing" element={<LandlordProfileListing />} />
            <Route path="/landlordProfileB4Listing" element={<LandlordProfileB4Listing />} />
            <Route path="/profileFormLandlord" element={<ProfileFormLandlord />} />
            <Route path="/messages" element={<Messages />} />
            <Route path="/reviews" element={<Reviews />} />
            <Route path="*" element={<NotFound />} />
            <Route path="/landlordlistingpage" element={<LandlordlistingPage />} />
            <Route path="/" element={<OtpSelection />} />
            <Route path="/verify" element={<OtpVerification />} />
            <Route path="/dashboard" element={<h1>Success! You're verified.</h1>} />
            <Route path="/landlord" element={<LandlordlistingPage />} />
          </Routes>
          </section>
          
          
    );
};

export default App;




