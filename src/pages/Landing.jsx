// import PropertyHero from "./Components/PropertyHero";
// import PropertyDetails from "./Components/PropertyDetails";
import Hero from "../Components/Hero"
import PropertyList from "../Components/PropertyList";
import Testimonials from "../Components/Testimonials";
import SearchFeature from "../Components/SearchFeature";
import SubSection from "../Components/SubSection";

function App() {
  return (
    <section>
      <div>
      <Hero />
      <SearchFeature /> 
      </div>
      <SubSection />
      <PropertyList />
      <Testimonials />
    </section>
  );
}

export default App;