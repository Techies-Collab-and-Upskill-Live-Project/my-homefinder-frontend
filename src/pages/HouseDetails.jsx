import { HeartIcon, MailboxIcon } from "@phosphor-icons/react";
import React, { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";

const HouseDetails = ({ properties }) => {
  const { id } = useParams();
  const navigate = useNavigate();
  const house = properties.find((item) => item.id === id);
  const [showAllImages, setShowAllImages] = useState(false);

  if (!house)
    return <div className="text-center mt-20">Property not found.</div>;

  const {
    title,
    description,
    price,
    images,
    address,
    city,
    state,
    country,
    type,
    landlord,
  } = house;

  const featured = properties.filter((item) => item.id !== id).slice(0, 3);

  return (
    <div className="max-w-7xl mx-auto p-4 sm:p-8 space-y-10">
      {/* Main Layout */}
      <div className="grid md:grid-cols-2 gap-10 lg:mt-40 mt-20">
        {/* Images */}
        <div className="space-y-4">
          <img
            src={images?.[0]?.url || "/placeholder.jpg"}
            alt={title}
            className="rounded-xl w-full h-[420px] object-cover shadow-md"
          />
          <div className="grid grid-cols-3 gap-3">
            {images?.slice(1, 4).map((img, idx) => (
              <img
                key={idx}
                src={img.url}
                alt={`Thumbnail ${idx}`}
                className="rounded-lg h-24 object-cover w-full cursor-pointer hover:scale-105 transition"
              />
            ))}
          </div>

          {images?.length > 4 && (
            <button
              onClick={() => setShowAllImages(true)}
              className="text-sm text-green-600 mt-2 hover:underline"
            >
              View more images
            </button>
          )}
        </div>

        {/* Details */}
        <div className="space-y-6">
          <h1 className="text-3xl font-bold text-gray-900">{title}</h1>
          <p className="text-gray-600">{description}</p>

          <div className="space-y-2 text-gray-700">
            <p>
              <strong>Price:</strong> ₦{price.toLocaleString()}
            </p>
            <p>
              <strong>Type:</strong> {type}
            </p>
            <p>
              <strong>Location:</strong> {address}, {city}, {state}, {country}
            </p>
          </div>

          <div className="border-t pt-4 space-y-2">
            <h2 className="text-xl font-semibold">Contact Poster</h2>
            <p>
              <strong>Name:</strong> {landlord?.fullName}
            </p>
            <p>
              <strong>Email:</strong>{" "}
              <a
                href={`mailto:${landlord?.email}`}
                className="text-green-600 underline"
              >
                {landlord?.email}
              </a>
            </p>
            <p>
              <strong>Phone:</strong>{" "}
              <a
                href={`tel:${landlord?.phone}`}
                className="text-green-600 underline"
              >
                {landlord?.phone}
              </a>
            </p>
          </div>

          <div className="flex items-center gap-4 pt-2">
            <button className="flex items-center gap-2 px-6 py-3 bg-green-700 text-white rounded-xl hover:bg-green-800 transition">
              <MailboxIcon className="w-5 h-5" /> Contact Now
            </button>
            <button className="p-2 border rounded-full text-gray-600 hover:text-red-600 hover:border-red-400 transition">
              <HeartIcon className="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>

      {/* All Images Modal */}
      {showAllImages && (
        <div className="fixed inset-0 bg-black/80 z-50 flex items-center justify-center p-6">
          <div className="bg-white p-4 rounded-xl max-h-[80vh] overflow-y-auto w-full max-w-4xl">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-xl font-semibold">All Images</h3>
              <button
                onClick={() => setShowAllImages(false)}
                className="text-gray-600 hover:text-red-600 text-sm"
              >
                Close
              </button>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
              {images.map((img, idx) => (
                <img
                  key={idx}
                  src={img.url}
                  alt={`Image ${idx}`}
                  className="rounded-lg h-40 w-full object-cover"
                />
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Featured Properties */}
      <div className="mt-10">
        <h2 className="text-2xl font-semibold mb-6">Featured Properties</h2>
        <div className="grid md:grid-cols-3 gap-6">
          {featured.map((item) => (
            <div
              key={item.id}
              className="bg-white rounded-xl overflow-hidden shadow hover:shadow-lg transition flex flex-col"
            >
              <img
                src={item.images?.[0]?.url || "/placeholder.jpg"}
                alt={item.title}
                className="w-full h-48 object-cover"
              />
              <div className="p-4 flex flex-col justify-between h-full">
                <div>
                  <h3 className="text-lg font-semibold">{item.title}</h3>
                  <p className="text-sm text-gray-500">
                    {item.city}, {item.state}
                  </p>
                  <p className="text-green-700 font-bold mt-1">
                    ₦{item.price.toLocaleString()}
                  </p>
                </div>
                <button
                  onClick={() => navigate(`/property/${item.id}`)}
                  className="mt-4 px-4 py-2 text-sm bg-green-700 text-white rounded-md hover:bg-green-800 transition"
                >
                  View Details
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default HouseDetails;
