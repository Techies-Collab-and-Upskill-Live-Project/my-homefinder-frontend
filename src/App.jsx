import React from "react";
import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import LandlordlistingPage from "./pages/LandlordListingPage";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer"
import Landing from "./pages/Landing";
import Decision from "./pages/Decision";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Profile from "./pages/Profile";
import Messages from "./pages/Messages";
import Reviews from "./pages/Reviews";
import NotFound from "./pages/NotFound"
import "./Tailwind.css";

function App() {
    return (
          <section>
          <Navbar />
          <LandlordlistingPage />
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
            <Route path="/profile" element={<Profile />} />
            <Route path="/messages" element={<Messages />} />
            <Route path="/reviews" element={<Reviews />} />
            <Route path="*" element={<NotFound />} />
            <Route path="/landlordlistingpage" element={<LandlordlistingPage />} />
          </Routes>
          </section>
          
          
    );
};

export default App;
