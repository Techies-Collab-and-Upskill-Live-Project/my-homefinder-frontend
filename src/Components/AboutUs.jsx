const AboutUs = () => (
  <section id="about" className="bg-white py-20 px-6 md:px-20">
    <div className="max-w-7xl mx-auto text-center">
      <h2 className="text-4xl font-bold text-gray-900 mb-4">About Us</h2>
      <p className="text-lg text-gray-600 max-w-3xl mx-auto">
        We’re redefining the rental experience. Whether you're a landlord
        looking to list your property or a tenant searching for your next home,
        our platform offers a seamless, secure, and smart solution to connect
        both worlds.
      </p>
      <div className="mt-10 grid grid-cols-1 md:grid-cols-3 gap-8 text-left">
        <div className="bg-gray-50 p-6 rounded-2xl shadow hover:shadow-md transition">
          <h4 className="text-xl font-semibold text-green-600">
            Trust & Transparency
          </h4>
          <p className="text-sm text-gray-600 mt-2">
            Every listing is verified. We ensure landlords and tenants interact
            in a safe and open environment.
          </p>
        </div>
        <div className="bg-gray-50 p-6 rounded-2xl shadow hover:shadow-md transition">
          <h4 className="text-xl font-semibold text-green-600">
            Smart Matchmaking
          </h4>
          <p className="text-sm text-gray-600 mt-2">
            Our platform recommends homes or tenants that best suit your needs
            and lifestyle.
          </p>
        </div>
        <div className="bg-gray-50 p-6 rounded-2xl shadow hover:shadow-md transition">
          <h4 className="text-xl font-semibold text-green-600">
            End-to-End Support
          </h4>
          <p className="text-sm text-gray-600 mt-2">
            From property discovery to signing contracts—we’re with you every
            step of the way.
          </p>
        </div>
      </div>
    </div>
  </section>
);
export default AboutUs;
