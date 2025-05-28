import Home from "./pages/Home";
import Footer from "./Profile/components/Footer";
import Navbar from "./Profile/components/Navbar";

import LandlordProfileB4Listing from "./Profile/Landlord/LandlordProfileB4Listing";
import LandlordProfileListing from "./Profile/Landlord/LandlordProfileListing";
import ProfileFormLandlord from "./Profile/Landlord/ProfileFormLandlord";
import TenantProfile from "./Profile/Tenants/TenantProfile";




function App() {
    return (

      <>
        
        
        <Navbar />
        <div className="mt-30">
          <LandlordProfileListing />
        </div>
        
        <Footer />    
       
      
      </>
      );
}

export default App
