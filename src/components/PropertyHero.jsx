import { useState } from "react";

// Updated property images from Unsplash and Pexels
const images = [
  "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=800&q=80", // Modern House Exterior
  "https://images.unsplash.com/photo-1570129477492-45c003edd2be?auto=format&fit=crop&w=800&q=80", // Minimalist Living Space
  "https://images.unsplash.com/photo-1580587771525-78b9dba3b914?auto=format&fit=crop&w=800&q=80", // Apartment Interior
  "https://images.pexels.com/photos/106399/pexels-photo-106399.jpeg?auto=compress&cs=tinysrgb&w=800",
  "https://images.pexels.com/photos/259588/pexels-photo-259588.jpeg?auto=compress&cs=tinysrgb&w=800",
  "https://images.pexels.com/photos/2102587/pexels-photo-2102587.jpeg?auto=compress&cs=tinysrgb&w=800",
  "https://images.pexels.com/photos/271624/pexels-photo-271624.jpeg?auto=compress&cs=tinysrgb&w=800",
];

const PropertyHero = () => {
  const [mainImage, setMainImage] = useState(images[0]);

  return (
    <div className="bg-white rounded-xl shadow-md p-6">
      <h1 className="text-3xl font-bold mb-6">Property</h1>

      {/* Main Image */}
      <div className="w-full mb-4">
        <img
          src={mainImage}
          alt="Main property"
          className="w-full h-72 object-cover rounded-lg"
        />
      </div>

      {/* Carousel */}
      <div className="flex gap-4 overflow-x-auto">
        {images.map((img, index) => (
          <img
            key={index}
            src={img}
            alt={`Thumbnail ${index + 1}`}
            className={`w-24 h-24 object-cover rounded-md cursor-pointer border-2 ${
              mainImage === img ? "border-green-600" : "border-transparent"
            }`}
            onClick={() => setMainImage(img)}
          />
        ))}
      </div>
    </div>
  );
};

export default PropertyHero;
