import Footer from "../layout/Footer"

const Hero = () => {
  return (
    <section className="max-w-full h-auto mx-auto mb-6 ">
      {/* <div className="relative bg-cover bg-center h-screen md:h-[500px]" src={heroBg.png} alt="Background Image"> */}
      <div className="md:h-[550px] bg-[url('/heroBg.png')] bg-center bg-cover bg-no-repeat flex items-center justify-center"></div>
     
        <div className="w-full">
  {/* Dark overlay */}
  <div className="relative inset-0 bg-black opacity-40" />

  {/* Hero content */}
  <div className="absolute inset-0 z-10 flex flex-col items-center justify-center text-center px-4">
    <h1 className="text-3xl md:text-5xl font-bold text-white mb-4">Find Your Perfect Home</h1>
    <p className="text-lg md:text-2xl text-white mb-6">
      Browse verified listings, connect with landlords, and rent with confidence.
    </p>
    <button className="px-6 py-3 bg-green-500 text-white rounded-lg hover:bg-green-600 transition duration-300">
      Get Started
    </button>
  </div>
</div>
      {/* </div> */}
    </section>
  )
}
export default Hero