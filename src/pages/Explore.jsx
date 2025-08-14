import { HeartIcon } from "@phosphor-icons/react";
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import PropertyAccess from "../Components/PropertyAccess";

const Explore = ({ properties }) => {
  const [showPopup, setShowPopup] = useState(false);
  const [selectedPropertyId, setSelectedPropertyId] = useState(null);
  const navigate = useNavigate();

  if (!properties || properties.length === 0) {
    return (
      <div className="max-w-6xl mx-auto py-20 text-center text-gray-500">
        No properties available.
      </div>
    );
  }

  const latest = properties[0];
  const others = properties.slice(1);

  const handleViewDetails = (propertyId) => {
    const storedUser = localStorage.getItem("user");
    let user = null;

    try {
      user = storedUser ? JSON.parse(storedUser) : null;
    } catch (e) {
      user = null; // invalid JSON
    }

    if (user && user.user) {
      // or any property that confirms user is logged in
      navigate(`/property/${propertyId}`);
    } else {
      setShowPopup(true);
      setSelectedPropertyId(propertyId);
    }
  };

  return (
    <>
      <div className="max-w-7xl mx-auto px-4 py-10 space-y-10">
        <div className="flex items-center justify-between lg:mt-30 mt-10">
          <h1 className="text-3xl font-bold text-gray-900">
            Explore Properties
          </h1>
          <span className="text-gray-600">
            {properties.length}{" "}
            {properties.length === 1 ? "property" : "propertys"} available
          </span>
        </div>

        {/* Latest property */}
        <div className="bg-white rounded-2xl shadow-lg overflow-hidden flex flex-col lg:flex-row gap-8">
          <img
            src={latest.images?.[0]?.url || "/placeholder.jpg"}
            alt={latest.title}
            className="w-full lg:w-1/2 h-80 object-cover"
          />
          <div className="p-6 flex-1 space-y-4">
            <div className="flex justify-between items-center">
              <h2 className="text-2xl font-semibold text-gray-900">
                Latest Listing
              </h2>
            </div>
            <h3 className="text-xl font-bold text-gray-800">{latest.title}</h3>
            <p className="text-gray-600 line-clamp-3">{latest.description}</p>
            <div className="text-sm text-gray-700">
              <p>
                <strong>Location:</strong> {latest.city}, {latest.state}
              </p>
              <p>
                <strong>Price:</strong> ₦{latest.price.toLocaleString()}
              </p>
            </div>
            <div className="flex justify-between pt-4">
              <button
                onClick={() => handleViewDetails(latest.id)}
                className="bg-green-700 text-white px-4 py-2 rounded-lg hover:bg-green-800"
              >
                Contact Poster
              </button>
              <button className="text-red-500 hover:text-red-600">
                <HeartIcon className="w-6 h-6" />
              </button>
            </div>
          </div>
        </div>

        {/* All Other Properties */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {others.map((property) => (
            <div
              onClick={() => handleViewDetails(property.id)}
              key={property.id}
              className="group bg-white rounded-2xl shadow hover:shadow-lg transition overflow-hidden"
            >
              <div className="relative">
                <img
                  src={property.images?.[0]?.url || "/placeholder.jpg"}
                  alt={property.title}
                  className="h-48 w-full object-cover transition group-hover:scale-105"
                />
              </div>
              <div className="p-4 space-y-2">
                <h3 className="font-semibold text-gray-900 truncate">
                  {property.title}
                </h3>
                <p className="text-gray-600 text-sm truncate">
                  {property.city}, {property.state}
                </p>
                <p className="text-gray-800 font-medium">
                  ₦{property.price.toLocaleString()}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {showPopup && (
        <PropertyAccess
          showPopup={showPopup}
          setShowPopup={setShowPopup}
          propertyId={selectedPropertyId}
        />
      )}
    </>
  );
};

export default Explore;
