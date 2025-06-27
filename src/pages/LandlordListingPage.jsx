import { useState } from "react";
import TopNavbar from "../layout/TopNavbar";
import Sidebar from "../layout/Sidebar";
import PropertyHero from "../components/PropertyHero";
import PropertyDetails from "../components/PropertyDetails";
import RentedCard from "../components/RentedCard";
import AddedCard from "../components/AddedCard";

const LandlordListingPage = () => {
  const [showMenu, setShowMenu] = useState(false);

  const toggleMenu = () => {
    console.log("Menu toggled");
    setShowMenu(!showMenu);
  };

  return (
    <section className="flex flex-col min-h-screen bg-gray-50">
      {/* Page Container */}
      <div className="flex flex-1">
        {/* Sidebar */}
        <div
          className={`transition-transform duration-300 ${
            showMenu ? "translate-x-0" : "-translate-x-full"
          } md:translate-x-0 md:relative fixed top-16 left-0 z-30`}
        >
          <Sidebar />
        </div>

        {/* Main Content */}
        <div className="flex-1 p-4 md:p-8 mt-[95px]">
          <PropertyHero />
          <PropertyDetails />

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-8">
            <RentedCard />
            <AddedCard />
          </div>
        </div>
      </div>
    </section>
  );
};

export default LandlordListingPage;
