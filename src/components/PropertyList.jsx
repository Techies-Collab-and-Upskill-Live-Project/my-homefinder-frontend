import React from 'react';
import {
  BedDouble,
  Bath,
  Waves,
  Martini,
  Ruler,
  MapPin,
} from 'lucide-react';

const properties = [
  {
    id: 1,
    title: 'Two bedroom Terrace',
    location: 'Victoria Garden City, Lagos',
    price: '₦ 2,500,000',
    image: '/assets/property.jpg',
    features: [
      { icon: BedDouble, text: '2 Master Bedrooms' },
      { icon: Bath, text: '2 Bathrooms' },
      { icon: Ruler, text: '5m²' },
      { icon: Waves, text: 'Swimming Pool' },
      { icon: Martini, text: 'Bar' },
    ],
  },
  {
    id: 2,
    title: 'Two bedroom Terrace',
    location: 'Victoria Garden City, Lagos',
    price: '₦ 2,500,000',
    image: '/assets/property.jpg',
    features: [
      { icon: BedDouble, text: '2 Master Bedrooms' },
      { icon: Bath, text: '2 Bathrooms' },
      { icon: Ruler, text: '5m²' },
      { icon: Waves, text: 'Swimming Pool' },
      { icon: Martini, text: 'Bar' },
    ],
  },
  {
    id: 3,
    title: 'Two bedroom Terrace',
    location: 'Victoria Garden City, Lagos',
    price: '₦ 2,500,000',
    image: '/assets/property.jpg',
    features: [
      { icon: BedDouble, text: '2 Master Bedrooms' },
      { icon: Bath, text: '2 Bathrooms' },
      { icon: Ruler, text: '5m²' },
      { icon: Waves, text: 'Swimming Pool' },
      { icon: Martini, text: 'Bar' },
    ],
  },
  {
    id: 4,
    title: 'Two bedroom Terrace',
    location: 'Victoria Garden City, Lagos',
    price: '₦ 2,500,000',
    image: '/assets/property.jpg',
    features: [
      { icon: BedDouble, text: '2 Master Bedrooms' },
      { icon: Bath, text: '2 Bathrooms' },
      { icon: Ruler, text: '5m²' },
      { icon: Waves, text: 'Swimming Pool' },
      { icon: Martini, text: 'Bar' },
    ],
  },
  {
    id: 5,
    title: 'Two bedroom Terrace',
    location: 'Victoria Garden City, Lagos',
    price: '₦ 2,500,000',
    image: '/assets/property.jpg',
    features: [
      { icon: BedDouble, text: '2 Master Bedrooms' },
      { icon: Bath, text: '2 Bathrooms' },
      { icon: Ruler, text: '5m²' },
      { icon: Waves, text: 'Swimming Pool' },
      { icon: Martini, text: 'Bar' },
    ],
  },
  {
    id: 6,
    title: 'Two bedroom Terrace',
    location: 'Victoria Garden City, Lagos',
    price: '₦ 2,500,000',
    image: '/assets/property.jpg',
    features: [
      { icon: BedDouble, text: '2 Master Bedrooms' },
      { icon: Bath, text: '2 Bathrooms' },
      { icon: Ruler, text: '5m²' },
      { icon: Waves, text: 'Swimming Pool' },
      { icon: Martini, text: 'Bar' },
    ],
  },
];

const PropertyList = () => (
  <section className="px-4 mb-16">
    <div className="text-center max-w-2xl mx-auto mb-8">
      <h2 className="text-xl sm:text-2xl font-bold mb-1">Best Properties Available</h2>
      <p className="text-sm sm:text-base text-gray-600">
        Select available property that matches your desire
      </p>
    </div>

    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
      {properties.map((property) => (
        <div
          key={property.id}
          className="bg-white rounded-lg overflow-hidden shadow"
        >
          <img
            src={property.image}
            alt="Property"
            className="w-full h-48 object-cover"
          />
          <div className="p-4">
            <h3 className="font-semibold text-lg">{property.title}</h3>
            <p className="text-sm flex items-center mt-1 ">
              <MapPin className="w-4 h-4 mr-1 text-green-600" />
              {property.location}
            </p>

            <div className="flex flex-wrap text-sm text-gray-700 mt-3 gap-3">
              {property.features.map((feature, i) => (
                <span key={i} className="flex items-center gap-1">
                  <feature.icon className="w-4 h-4 text-gray-500" />
                  {feature.text}
                </span>
              ))}
            </div>

            <div className="mt-4 flex justify-between items-center">
              <span className="font-bold text-lg">{property.price}</span>
              <button className="px-2 py-0.5 bg-green-600 text-white rounded-[12px] hover:bg-green-700">
                Rent Now
              </button>
            </div>
          </div>
        </div>
      ))}
    </div>
  </section>
);

export default PropertyList;
