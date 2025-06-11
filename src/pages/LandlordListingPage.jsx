import { useState } from "react";
import listing from "./LandlordlistingPage.module.css";
import TopNavbar from "../layout/TopNavbar";
import Sidebar from "../layout/Sidebar";
import PropertyHero from "../components/PropertyHero";
import PropertyDetails from "../components/PropertyDetails";
import RentedCard from "../components/RentedCard";
import AddedCard from "../components/AddedCard";
import Footer from "../layout/Footer";

const LandlordlistingPage = () => {
  const [showMenu, setShowMenu] = useState(false);
  const toggleMenu = () => {
    console.log("Menu toggled");
    setShowMenu(!showMenu);
  };
  return (
    <section className={listing.container}>
      {/* <header className={listing.header}> */}
      <header
        className={`${listing.header} ${showMenu ? listing.menuOpen : ""}`}
      >
        <TopNavbar toggleMenu={toggleMenu} showMenu={showMenu} />
      </header>
      <div className={listing.pageContainer}>
        <div>
          {/* <Sidebar
            className={` ${listing.sidebarContainer} ${showMenu ? "show" : ""}`}
          /> */}
          <Sidebar className={showMenu ? "show" : ""} />
        </div>

        <div className={listing.mainContent}>
          <PropertyHero />
          <PropertyDetails />
          <div className={listing.rentedDetails}>
            <RentedCard />
            <AddedCard />
          </div>
        </div>
      </div>

      <Footer />
    </section>
  );
};
export default LandlordlistingPage;
