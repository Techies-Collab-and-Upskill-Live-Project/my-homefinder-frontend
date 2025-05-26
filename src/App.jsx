import { Routes, Route } from "react-router-dom";
import Landing from "./pages/Landing";
import Decision from "./pages/Decision";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Listings from "./pages/Listings";
import ListingDetails from "./pages/ListingDetails";
import Profile from "./pages/Profile";
import Messaging from "./pages/Messaging";
import Reviews from "./pages/Reviews";

function App() {
    return (
      // Wrapping the application with Router to enable routing
      // and defining the routes for different pages
      // Each Route component specifies a path and the corresponding component to render

          <Routes>
            <Route path="/" element={<Landing />} />
            <Route path="/decision" element={<Decision />} />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/listings" element={<Listings />} />
            <Route path="/listings/:id" element={<ListingDetails />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/messaging" element={<Messaging />} />
            <Route path="/reviews" element={<Reviews />} />
          </Routes>
    );
};

export default App
