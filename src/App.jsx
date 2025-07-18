import React from "react";
import { Routes, Route } from "react-router-dom";
import Landing from "./pages/Landing";
import Layout from "./layout/Layout";
import "./index.css";
import DecisionPage from "./pages/DecisionPage";
import LandlordListingPage from "./pages/LandlordListingPage";
import Messages from "./pages/Messages";
import OtpSelection from "./pages/OtpSelection";
import OtpVerification from "./pages/OtpVerification";
import ProfileForm from "./pages/ProfileForm";
import TenantProfile from "./pages/TenantProfile";
import TenantListing from "./pages/TenantListing";
import TenantLogin from "./pages/TenantLogin";
import TenantSignUpPage from "./pages/TenantSignUpPage";
import "leaflet/dist/leaflet.css";
import ForgotPasswordPage from "./pages/ForgotPassword";
import ResetPasswordPage from "./pages/ResetPassword";
import ProtectedRoute from "./Components/ProtectedRoute";
import LandlordProfileB4Listing from "./pages/LandlordProfileB4Listing";

function App() {
  return (
    <>
      <Routes>
        <Route element={<Layout />}>
          <Route index element={<Landing />} />
          <Route path="/decisionpage" element={<DecisionPage />} />
          <Route
            path="/landlordlistingpage"
            element={
              <ProtectedRoute requiredRole="landlord">
                <LandlordListingPage />
              </ProtectedRoute>
            }
          />
          <Route
            path="/messages"
            element={
              <ProtectedRoute>
                <Messages />
              </ProtectedRoute>
            }
          />
          <Route path="/otpselection" element={<OtpSelection />} />
          <Route path="/otpverification" element={<OtpVerification />} />
          <Route
            path="/profileform"
            element={
              <ProtectedRoute>
                <ProfileForm />
              </ProtectedRoute>
            }
          />
          <Route
            path="/tenantprofile"
            element={
              // <ProtectedRoute>
                <TenantProfile />
              // </ProtectedRoute>
            }
          />
          <Route
            path="/tenantlisting"
            element={
              <ProtectedRoute>
                <TenantListing />
              </ProtectedRoute>
            }
          />
          <Route
            path="/landlordListing"
            element={
              <ProtectedRoute>
                <LandlordListingPage />
              </ProtectedRoute>
            }
          />
          <Route
            path="/landlordProfile"
            element={
              // <ProtectedRoute>
                <LandlordProfileB4Listing />
              // </ProtectedRoute>
            }
          />
          <Route path="/tenantlogin" element={<TenantLogin />} />
          <Route path="/tenantsignuppage" element={<TenantSignUpPage />} />
          <Route path="/forgotPassword" element={<ForgotPasswordPage />} />
          <Route path="/resetPassword" element={<ResetPasswordPage />} />
        </Route>
      </Routes>
    </>
  );
}

export default App;
