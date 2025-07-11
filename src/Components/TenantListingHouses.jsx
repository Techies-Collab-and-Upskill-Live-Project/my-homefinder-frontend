import React, { useEffect, useState } from "react";
import axios from "axios";
import { motion, AnimatePresence } from "framer-motion";
import TenantListingSidebar from "./TenantListingSidebar";
import { Heart } from "@phosphor-icons/react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import L from "leaflet";

// Leaflet marker fix
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl:
    "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png",
  iconUrl:
    "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png",
  shadowUrl:
    "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png",
});

// Random house images
const randomImages = [
  "https://images.unsplash.com/photo-1600585154340-be6161a56a0c", // Modern house
  "https://images.unsplash.com/photo-1572120360610-d971b9b7886d", // Cozy house front
  "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2", // White modern home
  "https://images.unsplash.com/photo-1568605117036-5fe5e7bab0b7", // Contemporary home
  "https://images.unsplash.com/photo-1613977257363-b4c7ed7caa7b", // Lake view house
  "https://images.unsplash.com/photo-1570129477492-45c003edd2be", // Blue house with plants
  "https://images.unsplash.com/photo-1577985046627-3c74f5f8b13f", // Tiny cabin
  "https://images.unsplash.com/photo-1565182999561-18d7dc61d9c5", // Farmhouse
  "https://images.unsplash.com/photo-1550958427-0cfb7edac4b7", // Suburban home
  "https://images.unsplash.com/photo-1600585153837-4e26c92ed968", // White villa
  "https://images.unsplash.com/photo-1505691938895-1758d7feb511", // Traditional home
  "https://images.unsplash.com/photo-1599427304963-c37a9dc6b10c", // Urban house
  "https://images.unsplash.com/photo-1523217582562-09d0def993a6", // Small country house
  "https://images.unsplash.com/photo-1597098273951-cfded59b95ab", // Modern brick house
  "https://images.unsplash.com/photo-1571079931345-80e8ec9c6d8c", // Seaside house
  "https://images.unsplash.com/photo-1600585153957-4593bdbb7e69", // Night view house
  "https://images.unsplash.com/photo-1620579378798-1b03363144ab", // Small modern home
  "https://images.unsplash.com/photo-1600585154106-d48f6a3d07ef", // Minimalist exterior
];

const randomImage =
  randomImages[Math.floor(Math.random() * randomImages.length)];

// Filter options
const filterOptions = [
  "featured",
  "duplex",
  "bungalow",
  "self-contain",
  "most popular",
];

const TenantListingHouses = () => {
  const [houses, setHouses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [filter, setFilter] = useState("featured");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  // Fetch properties from backend
  useEffect(() => {
    const fetchHouses = async () => {
      setLoading(true);
      try {
        const res = await axios.get(`${import.meta.env.VITE_API_URL}/property`);
        const responseData = res.data?.data;

        if (!responseData) {
          throw new Error("No data found in response");
        }

        // If responseData is a single property object, wrap it in an array
        const properties = Array.isArray(responseData)
          ? responseData
          : [responseData.property || responseData]; // adjust as needed

        const mapped = properties.map((property) => ({
          id: property.id,
          title: property.title,
          address: property.address,
          price: property.price,
          type: property.type,
          isAvailable: property.isAvailable,
          latitude: property.latitude,
          longitude: property.longitude,
          position: [property.latitude, property.longitude],
        }));

        setHouses(mapped);
      } catch (err) {
        console.error("Error fetching houses:", err);
        setError("Failed to load properties");
        setHouses([]);
      } finally {
        setLoading(false);
      }
    };

    fetchHouses();
  }, []);

  // Filter available properties
  const filteredHouses = houses.filter((house) => house.isAvailable);

  // Pagination logic
  const totalPages = Math.ceil(filteredHouses.length / itemsPerPage);
  const paginatedHouses = filteredHouses.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const handlePageChange = (page) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
    }
  };

  return (
    <section className="mt-10 grid grid-cols-3 gap-10">
      <TenantListingSidebar />

      <div className="lg:col-span-2 col-span-3 space-y-6">
        {/* Filter Buttons */}
        <div className="flex flex-wrap gap-3">
          {filterOptions.map((option) => (
            <button
              key={option}
              onClick={() => {
                setFilter(option);
                setCurrentPage(1);
              }}
              className={`px-4 py-2 rounded-full text-sm font-medium border transition ${
                filter === option
                  ? "bg-green-700 text-white"
                  : "bg-gray-100 text-gray-700 hover:bg-gray-200"
              }`}
            >
              {option.charAt(0).toUpperCase() + option.slice(1)}
            </button>
          ))}
        </div>

        {/* Map */}
        <div className="w-full h-64 rounded-lg overflow-hidden shadow-sm border">
          <MapContainer
            center={[6.5244, 3.3792]}
            zoom={6}
            scrollWheelZoom={false}
            className="w-full h-full"
          >
            <TileLayer
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
              attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
            />
            {filteredHouses.map((house) => (
              <Marker key={house.id} position={house.position}>
                <Popup>
                  <strong>{house.title}</strong> <br />₦
                  {house.price.toLocaleString()}
                </Popup>
              </Marker>
            ))}
          </MapContainer>
        </div>

        {/* Property Cards */}
        <div className="grid grid-cols-1 gap-6">
          {loading ? (
            <p className="text-center">Loading properties...</p>
          ) : error ? (
            <p className="text-center text-red-500">{error}</p>
          ) : filteredHouses.length === 0 ? (
            <p className="text-center text-gray-500">No properties available</p>
          ) : (
            <AnimatePresence>
              {paginatedHouses.map((property) => (
                <motion.div
                  key={property.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  className="rounded-xl grid lg:grid-cols-2 overflow-hidden p-4 shadow bg-white"
                >
                  <div>
                    <img
                      src={randomImage}
                      alt={property.title}
                      className="w-full h-52 object-cover rounded-md"
                    />
                  </div>
                  <div className="p-4 space-y-2">
                    <h3 className="text-lg font-semibold">{property.title}</h3>
                    <p className="text-sm text-gray-600">{property.address}</p>
                    <p className="text-green-700 text-sm capitalize">
                      {property.type.toLowerCase()}
                    </p>
                    <p className="text-xl font-bold text-gray-800">
                      ₦{property.price.toLocaleString()}
                    </p>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          )}
        </div>

        {/* Pagination */}
        <div className="flex justify-center gap-2 pt-4">
          <button
            onClick={() => handlePageChange(currentPage - 1)}
            disabled={currentPage === 1}
            className="px-4 py-2 border rounded disabled:opacity-50"
          >
            Previous
          </button>
          {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
            <button
              key={page}
              onClick={() => handlePageChange(page)}
              className={`px-4 py-2 border rounded ${
                currentPage === page
                  ? "bg-green-700 text-white"
                  : "bg-white text-gray-700"
              }`}
            >
              {page}
            </button>
          ))}
          <button
            onClick={() => handlePageChange(currentPage + 1)}
            disabled={currentPage === totalPages}
            className="px-4 py-2 border rounded disabled:opacity-50"
          >
            Next
          </button>
        </div>
      </div>
    </section>
  );
};

export default TenantListingHouses;
