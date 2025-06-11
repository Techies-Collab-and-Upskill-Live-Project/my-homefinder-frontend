import PropertyCard from "./components/PropertyHero";
import PropertyDetails from "./components/PropertyDetails";
import TopNavbar from "./layout/TopNavbar";
import Sidebar from "./layout/Sidebar";
import { Routes, Route } from "react-router-dom";
import OtpSelection from "./pages/otpSelection";
import OtpVerification from "./pages/otpVerification";

import LandlordlistingPage from "./pages/LandlordListingPage";

function App() {
  return (
    // <section>

    //   <LandlordlistingPage />
    //   <BrowserRouter>
    //     <Routes>
    //       <Route path="/" element={<OtpSelection />} />
    //       <Route path="/verify" element={<OtpVerification />} />
    //       <Route
    //         path="/dashboard"
    //         element={<h1>Success! You're verified.</h1>}
    //       />
    //     </Routes>
    //   </BrowserRouter>
    // </section>
    <Routes>
      <Route path="/" element={<OtpSelection />} />
      <Route path="/verify" element={<OtpVerification />} />
      <Route path="/dashboard" element={<h1>Success! You're verified.</h1>} />
      <Route path="/landlord" element={<LandlordlistingPage />} />
      {/* <Route path="*" element={<h1>Page Not Found</h1>} /> */}
    </Routes>
  );
}

export default App;
