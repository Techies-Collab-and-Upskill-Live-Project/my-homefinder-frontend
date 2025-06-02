import PropertyCard from "./components/PropertyHero";
import PropertyDetails from "./components/PropertyDetails";
import TopNavbar from "./layout/TopNavbar";
import Sidebar from "./layout/Sidebar";
import LandlordlistingPage from "./pages/LandlordListingPage";

function App() {
  return (
    <section>
      {/* <TopNavbar />
      <div>
        <Sidebar />
      </div> */}
      <LandlordlistingPage />
    </section>
  );
}

export default App;
