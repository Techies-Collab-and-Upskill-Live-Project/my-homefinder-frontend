// import PropertyHero from "./components/PropertyHero";
// import PropertyDetails from "./components/PropertyDetails";
import Hero from "../components/Hero";
import PropertyList from "../components/PropertyList";
import Testimonials from "../components/Testimonials";
import SearchFeature from "../components/SearchFeature";
import SubSection from "../Components/SubSection";
import AboutUs from "../Components/AboutUs";
import HowItWorks from "../Components/HowItWorks";

function App() {
  return (
    <section>
      <div>
        <Hero />
        <SearchFeature />
      </div>
      <SubSection />
      <AboutUs />
      <HowItWorks />
      <PropertyList />
      <Testimonials />
    </section>
  );
}

export default App;
