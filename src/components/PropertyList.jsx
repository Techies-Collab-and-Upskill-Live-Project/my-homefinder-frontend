import axios from "axios";
import { useEffect, useState } from "react";
import { MapPin } from "@phosphor-icons/react";
import { motion } from "framer-motion";
import React from "react";
import PropertyAccess from "./PropertyAccess";
import { useNavigate } from "react-router-dom";

const PropertyList = () => {
  const [properties, setProperties] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedPropertyId, setSelectedPropertyId] = useState(null);
  const [showPopup, setShowPopup] = useState(false);

  const navigate = useNavigate();

  const handleViewDetails = (propertyId) => {
    const user = localStorage.getItem("user");

    if (user) {
      navigate(`/property/${propertyId}`);
    } else {
      setShowPopup(true);
      setSelectedPropertyId(propertyId);
    }
  };

  useEffect(() => {
    const fetchProperties = async () => {
      try {
        const res = await axios.get(`${import.meta.env.VITE_API_URL}/property`);
        const data = res.data?.data?.properties || [];
        setProperties(Array.isArray(data) ? data : [data]);
      } catch (err) {
        console.error("Error fetching properties:", err);
        setError("Failed to fetch properties");
      } finally {
        setLoading(false);
      }
    };

    fetchProperties();
  }, []);

  return (
    <section className="flex flex-col items-center justify-center mt-24 px-4">
      <div className="text-center mb-10">
        <h2 className="text-2xl sm:text-3xl font-semibold mb-2 text-gray-800">
          Best Properties Available
        </h2>
        <p className="text-sm sm:text-base text-gray-600">
          Select an available property that matches your desire
        </p>
      </div>

      <div className="w-full max-w-6xl">
        {loading ? (
          <p className="text-center text-gray-600">Loading properties...</p>
        ) : error ? (
          <p className="text-center text-red-500">{error}</p>
        ) : properties.length === 0 ? (
          <p className="text-center text-gray-500">No properties found.</p>
        ) : (
          <>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {properties.slice(0, 6).map((property) => (
                <motion.div
                  key={property.id}
                  className="rounded-2xl overflow-hidden flex flex-col shadow-md hover:shadow-xl transition bg-white border border-gray-100"
                  whileHover={{ scale: 1.015 }}
                >
                  <img
                    src={
                      property.images?.[0]?.url ||
                      "/images/fallback-property.jpg"
                    }
                    alt={property.title || "Property"}
                    className="w-full h-56 object-cover"
                  />
                  <div className="p-4 flex flex-col gap-2 flex-grow">
                    <h3 className="text-lg font-semibold text-gray-900 line-clamp-2">
                      {property.title || "Untitled Property"}
                    </h3>
                    <p className="text-sm text-gray-500 flex items-center gap-1">
                      <MapPin size={14} />
                      {property.address}
                    </p>
                    <div className="text-sm text-green-700 capitalize">
                      {property.type?.toLowerCase() || "unknown"}
                    </div>
                    <p className="text-xl font-bold text-gray-800">
                      ₦{property.price?.toLocaleString() || "N/A"}
                    </p>
                    <p className="text-xs text-gray-500">
                      Status:{" "}
                      {property.isAvailable ? "Available" : "Not Available"}
                    </p>
                    <p className="text-xs text-gray-400">
                      {property.city}, {property.state}, {property.country}
                    </p>

                    <div className="mt-auto pt-3">
                      <button
                        onClick={() => handleViewDetails(property.id)}
                        className="w-full bg-green-600 text-white py-2 rounded-lg hover:bg-green-700 transition"
                      >
                        View Details
                      </button>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>

            {/* View More Button */}
            {properties.length > 6 && (
              <div className="mt-10 text-center">
                <button
                  onClick={() => navigate("/explore")}
                  className="px-6 py-3 bg-green-700 text-white rounded-lg hover:bg-green-800 transition"
                >
                  View More Properties
                </button>
              </div>
            )}
          </>
        )}
      </div>

      {showPopup && (
        <PropertyAccess showPopup={showPopup} setShowPopup={setShowPopup} propertyId={selectedPropertyId} />
      )}
    </section>
  );
};

export default PropertyList;
