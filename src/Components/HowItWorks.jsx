const HowItWorks = () => (
  <section id="how-it-works" className="bg-gray-100 py-20 px-6 md:px-20">
    <div className="max-w-7xl mx-auto text-center">
      <h2 className="text-4xl font-bold text-gray-900 mb-12">How It Works</h2>
      <div className="grid md:grid-cols-3 gap-10">
        {[
          {
            title: "1. Create an Account",
            desc: "Sign up as a landlord or tenant. Customize your profile and get verified for added trust.",
            icon: "👤",
          },
          {
            title: "2. List or Discover",
            desc: "Landlords list properties with photos and details. Tenants explore listings using smart filters.",
            icon: "🏡",
          },
          {
            title: "3. Connect & Rent",
            desc: "Schedule viewings, chat securely, and finalize deals with ease—right on the platform.",
            icon: "🤝",
          },
        ].map((step, i) => (
          <div
            key={i}
            className="bg-white p-8 rounded-2xl shadow hover:shadow-lg transition flex flex-col items-center"
          >
            <div className="text-4xl mb-4">{step.icon}</div>
            <h4 className="text-xl font-semibold text-green-600 mb-2">
              {step.title}
            </h4>
            <p className="text-gray-600 text-sm">{step.desc}</p>
          </div>
        ))}
      </div>
    </div>
  </section>
);

export default HowItWorks;
