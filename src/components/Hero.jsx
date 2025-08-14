import DecisionSection from "../layout/DecisionSection";
import { Link } from "react-router-dom";

const Hero = () => {
  return (
    <section className="relative w-full h-[90vh] bg-[url('/heroBg.png')] bg-center bg-cover bg-no-repeat">
      {/* Dark overlay */}
      <div className="absolute inset-0 bg-black/40 z-0" />

      {/* Hero content */}
      <div className="relative z-10 max-w-4xl mx-auto px-4 h-full flex flex-col items-center justify-center text-center">
        <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-4 leading-tight">
          Find Your Perfect Home
        </h1>
        <p className="text-base sm:text-lg md:text-xl text-white mb-6 max-w-2xl">
          Browse verified listings, connect with landlords, and rent with
          confidence.
        </p>
        <Link to="/tenantSignUpPage">
        <button className="px-6 py-3 text-white bg-green-700 hover:bg-green-600 rounded-xl text-sm md:text-base font-semibold transition duration-300">
          Get Started
        </button>
        </Link>
      </div>
    </section>
  );
};

export default Hero;
