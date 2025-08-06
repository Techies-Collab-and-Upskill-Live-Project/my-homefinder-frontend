import React, { useEffect, useState } from "react";
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
import IDTypeSelection from "./pages/IDTypeSelection";
import IdDetails from "./pages/IdDetails";
import ProcessingPage from "./pages/ProcessingPage";
import ProfileVerified from "./pages/ProfileVerified";
import ProfileFormLandlord from "./pages/ProfileFormLandlord";
import HouseDetails from "./pages/HouseDetails";
import axios from "axios";
import Explore from "./pages/Explore";
import { MessagingProvider } from "./contexts/MessagingContext";

function App() {
  const [properties, setProperties] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [id, setId] = useState(null);

  useEffect(() => {
    const fetchProperties = async () => {
      try {
        const res = await axios.get(`${import.meta.env.VITE_API_URL}/property`);
        const data = res.data?.data?.properties || [];
        setProperties(Array.isArray(data) ? data : [data]);
        setId(properties.id);
      } catch (err) {
        console.error("Error fetching properties:", err);
        setError("Failed to fetch properties");
      } finally {
        setLoading(false);
      }
    };

    fetchProperties();
  }, []);
  return (
    <MessagingProvider>
      <>
        <Routes>
          <Route element={<Layout />}>
            <Route index element={<Landing />} />
            <Route path="/decisionpage" element={<DecisionPage />} />
            <Route path="/idSelection" element={<IDTypeSelection />} />
            <Route path="/idDetails" element={<IdDetails />} />
            <Route
              path="/explore"
              element={<Explore properties={properties} />}
            />

            <Route
              path="/property/:id"
              element={<HouseDetails properties={properties} />}
            />
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
                // <ProtectedRoute>
                <Messages />
                // </ProtectedRoute>
              }
            />
            <Route path="/otpverification" element={<OtpVerification />} />
            <Route
              path="/tenantForm"
              element={
                <ProtectedRoute>
                  <ProfileForm />
                </ProtectedRoute>
              }
            />
            <Route
              path="/landlordForm"
              element={
                <ProtectedRoute>
                  <ProfileFormLandlord />
                </ProtectedRoute>
              }
            />
            <Route
              path="/tenantprofile"
              element={
                <ProtectedRoute>
                  <TenantProfile />
                </ProtectedRoute>
              }
            />
            <Route
              path="/tenantlisting"
              element={
                <ProtectedRoute>
                  <TenantListing properties={properties} />
                </ProtectedRoute>
              }
            />
            <Route
              path="/landlordListing"
              element={
                <ProtectedRoute>
                  <LandlordListingPage properties={properties} />
                </ProtectedRoute>
              }
            />
            <Route
              path="/landlordProfile"
              element={
                <ProtectedRoute>
                  <LandlordProfileB4Listing />
                </ProtectedRoute>
              }
            />
            <Route path="/tenantlogin" element={<TenantLogin />} />
            <Route path="/tenantsignuppage" element={<TenantSignUpPage />} />
            <Route path="/forgotPassword" element={<ForgotPasswordPage />} />
            <Route path="/resetPassword" element={<ResetPasswordPage />} />
          </Route>
        </Routes>
      </>
    </MessagingProvider>
  );
}

export default App;
