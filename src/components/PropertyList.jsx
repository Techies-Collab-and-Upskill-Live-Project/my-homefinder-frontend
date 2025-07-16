import axios from "axios";
import { useEffect, useState } from "react";
import {
  Bed,
  Toilet,
  MapPin,
  BeerBottle,
  SwimmingPoolIcon,
} from "@phosphor-icons/react";
import React from "react";



const PropertyList = () => {
  const [properties, setProperties] = useState([]);
const [loading, setLoading] = useState(true);
const [error, setError] = useState(null);

useEffect(() => {
  const fetchProperties = async () => {
    try {
      const res = await axios.get(`${import.meta.env.VITE_API_URL}/property`);

      console.log("Fetched data:", res.data); // Debugging

      let data = res.data.properties || [];

      // Ensure it's always an array
      if (!Array.isArray(data)) {
        data = [data];
      }

      setProperties(data);
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
  
  <section className="flex flex-col items-center justify-center mt-[100px] px-4">
    <div className="text-center mb-8">
      <h2 className="text-xl sm:text-2xl font-medium mb-1">
        Best Properties Available
      </h2>
      <p className="text-sm sm:text-base text-gray-600">
        Select available property that matches your desire
      </p>
    </div>

    <div className="mt-8">

            {loading ? (
              <p className="text-center">Loading properties...</p>
            ) : error ? (
              <p className="text-center text-red-500">{error}</p>
            ) : properties.length === 0 ? (
              <p className="text-center text-gray-500">No properties found.</p>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {properties.map((property, index) => (
                  <motion.div
                    key={property.id || index}
                    className="rounded-xl overflow-hidden shadow bg-white"
                    whileHover={{ scale: 1.02 }}
                  >
                    <img
                      src={
                        randomImages[
                          Math.floor(Math.random() * randomImages.length)
                        ]
                      }
                      alt={property.title || "Property"}
                      className="w-full h-52 object-cover"
                    />
                    <div className="p-4 space-y-2">
                      <h3 className="text-lg font-semibold">
                        {property.title || "Untitled Property"}
                      </h3>
                      <p className="text-sm text-gray-600">
                        {property.address || "No address"}
                      </p>
                      <p className="text-green-700 text-sm capitalize">
                        {(property.type || "Unknown").toLowerCase()}
                      </p>
                      <p className="text-xl font-bold text-gray-800">
                        ₦
                        {property.price
                          ? property.price.toLocaleString()
                          : "N/A"}
                      </p>
                      <p className="text-xs text-gray-500">
                        Status:{" "}
                        {property.isAvailable ? "Available" : "Not Available"}
                      </p>
                    </div>
                  </motion.div>
                ))}
              </div>
            )}
          </div>
  </section>
)};

export default PropertyList;
