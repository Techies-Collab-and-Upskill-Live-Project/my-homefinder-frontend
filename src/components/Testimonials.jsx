import React from 'react';
import Chinanza1 from '../assets/Chinanza1.jpg';

const testimonials = [
  {
    rating: 5,
    message:
      'Using MyHomeFinder was a game-changer! I found a clean, affordable apartment in less than a week. The listings were real, the landlords were verified, and I didn’t have to deal with agents charging ridiculous fees. I’ll definitely recommend it to my friends.',
    name: 'Chinanza.O',
    location: 'Lagos, Nigeria',
    image: '/src/assets/Chinanza.jpg',
  },
  {
    rating: 5,
    message:
      'Thanks to MyHomeFinder, I secured a great space close to my workplace. The platform made my search stress-free and transparent. It’s a breath of fresh air!',
    name: 'Chinanza.O',
    location: 'Lagos, Nigeria',
    image: '/src/assets/Chinanza1.jpg',
  },
  {
    rating: 5,
    message:
      'MyHomeFinder is super easy to use and trustworthy. I love how the site verifies listings. I didn’t feel scammed at any point, and support was responsive. Highly recommend!',
    name: 'Chinanza.O.',
    location: 'Lagos, Nigeria',
    image: '/src/assets/ChinanzaO.jpg',

  },
];

const Testimonials = () => (
  <section className="w-full flex justify-center bg-gray-50 relative z-10">
  <div className="w-full max-w-6xl px-4 pt-[200px] pb-[200px]">
    <hr className="w-full border-t border-green-300 mb-8 mx-auto" />
    <h2 className="text-2xl md:text-3xl font-bold text-center mb-12">
      Hear from Our Happy Customers
    </h2>

    <div className=" grid grid-cols-1 md:grid-cols-3 gap-8">
      {testimonials.map((testimonial, index) => (
        <div
          key={index}
          className="bg-white p-6 rounded-xl shadow-md text-center space-y-4"
        >
          <div className="text-green-500 text-xl">★★★★★</div>
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
  </div>
</section>

);

export default Testimonials;
