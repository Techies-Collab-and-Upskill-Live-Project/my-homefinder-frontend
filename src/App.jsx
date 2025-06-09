import PropertyCard from "./components/PropertyHero";
import PropertyDetails from "./components/PropertyDetails";
import TopNavbar from "./layout/TopNavbar";
import Sidebar from "./layout/Sidebar";
import LandlordlistingPage from "./pages/LandlordListingPage";
import Hero from "./components/Hero";
import PropertyList from "./components/PropertyList";
import Testimonials from "./components/Testimonials";
import SearchFeature from "./components/SearchFeature";

function App() {
  return (
    <section>
      <Hero />
      <SearchFeature />
      <PropertyList />
      <Testimonials />

      {/* <TopNavbar />
      <div>
        <Sidebar />
      </div> */}
      <LandlordlistingPage />
    </section>
  );
}

export default App;
