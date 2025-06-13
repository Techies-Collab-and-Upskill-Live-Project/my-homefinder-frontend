import PropertyCard from "./components/PropertyHero";
import PropertyDetails from "./components/PropertyDetails";
import TopNavbar from "./layout/TopNavbar";
import Sidebar from "./layout/Sidebar";
import LandlordlistingPage from "./pages/LandlordListingPage";
import Hero from "./components/Hero";
import PropertyList from "./components/PropertyList";
import Testimonials from "./components/Testimonials";
import SearchFeature from "./components/SearchFeature";
import SubSection from "./pages/Home";
import DecisionPage from './components/DecisionPage';

function App() {
  return (
    <section>
      <div className="">
      <Hero />
      <SearchFeature /> 
      </div>
      <SubSection />

      {/* <DecisionSection /> */}
      <PropertyList />
      <Testimonials />

      {/* <TopNavbar />
      <div>
        <Sidebar />
      </div> */}
      <LandlordlistingPage />
      <DecisionPage />
    </section>
  );
}

export default App;
