import React from 'react';

const testimonials = [
  {
    rating: 5,
    message:
      'Using MyHome was a game-changer! I found a clean, affordable apartment in less than a week. The listings were real, the landlords were verified, and I didn’t have to deal with agents charging ridiculous fees. I’ll definitely recommend it to my friends.',
    name: 'Chinanza.O',
    location: 'Lagos, Nigeria',
    image: '/user.jpg',
  },
  {
    rating: 5,
    message:
      'Thanks to MyHome, I secured a great space close to my workplace. The platform made my search stress-free and transparent. It’s a breath of fresh air!',
    name: 'Adaeze N.',
    location: 'Abuja, Nigeria',
    image: '/user.jpg',
  },
  {
    rating: 5,
    message:
      'Super easy to use and trustworthy. I love how the site verifies listings. I didn’t feel scammed at any point, and support was responsive. Highly recommend!',
    name: 'Emeka T.',
    location: 'Port Harcourt, Nigeria',
    image: '/user.jpg',
  },
];

const Testimonials = () => (
  <section className="px-4 mb-16 bg-gray-50 py-12">
    <h2 className="text-2xl md:text-3xl font-bold text-center mb-8">
      Hear from Our Happy Customers
    </h2>
    <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-6">
      {testimonials.map((testimonial, index) => (
        <div
          key={index}
          className="bg-white p-6 rounded-lg shadow text-center space-y-4"
        >
          <div className="text-green-500">★★★★★</div>
          <p className="text-sm text-gray-700">{testimonial.message}</p>
          <div className="flex items-center justify-center space-x-3">
            <img
              src={testimonial.image}
              alt={testimonial.name}
              className="h-10 w-10 rounded-full object-cover"
            />
            <div className="text-sm text-gray-600">
              {testimonial.name}, {testimonial.location}
            </div>
          </div>
        </div>
      ))}
    </div>
  </section>
);

export default Testimonials;
