import { useState } from "react";

const images = [
  "/images/House1.png",
  "/images/House2.png",
  "/images/House3.png",
  "/images/House4.png",
  "/images/House5.png",
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
