import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import TenantListingSidebar from "./TenantListingSidebar";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import L from "leaflet";
import { Link } from "react-router-dom";

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

// Random fallback images
const randomImages = [
  "https://images.unsplash.com/photo-1600585154340-be6161a56a0c",
  "https://images.unsplash.com/photo-1572120360610-d971b9b7886d",
  "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2",
  "https://images.unsplash.com/photo-1568605117036-5fe5e7bab0b7",
  "https://images.unsplash.com/photo-1613977257363-b4c7ed7caa7b",
  "https://images.unsplash.com/photo-1570129477492-45c003edd2be",
  "https://images.unsplash.com/photo-1577985046627-3c74f5f8b13f",
  "https://images.unsplash.com/photo-1565182999561-18d7dc61d9c5",
];

const filterOptions = [
  "featured",
  "duplex",
  "bungalow",
  "self-contain",
  "most popular",
];

const TenantListingHouses = ({ properties = [] }) => {
  const [filter, setFilter] = useState("featured");
  const [filterOptions, setFilterOptions] = useState(["featured"]);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  useEffect(() => {
    const fetchPropertyTypes = async () => {
      try {
        const res = await fetch(`${import.meta.env.VITE_API_URL}/property`);
        const data = await res.json();
        const properties = data?.data?.properties || [];

        const types = Array.from(
          new Set(
            properties
              .map((p) => p.type?.toLowerCase())
              .filter((type) => !!type)
          )
        );

        setFilterOptions(["featured", ...types]);
      } catch (err) {
        console.error("Failed to fetch property types:", err);
      }
    };

    fetchPropertyTypes();
  }, []);

  // Filter and format
  const filteredHouses = properties
    .filter((house) => {
      const isAvailable = house.isAvailable;
      const matchesType =
        filter === "featured"
          ? true
          : house.type?.toLowerCase().includes(filter.toLowerCase());

      return isAvailable && matchesType;
    })
    .map((property) => ({
      ...property,
      position: [property.latitude, property.longitude],
    }));

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
    <section className="mt-10 gap-10">
      <div className="lg:col-span-2 col-span-3 space-y-6">
        {/* Filters */}
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
                  {house.price?.toLocaleString()}
                </Popup>
              </Marker>
            ))}
          </MapContainer>
        </div>

        {/* Property Cards */}
        {filteredHouses.length === 0 ? (
          <div className="text-center py-10 text-gray-500 text-lg font-medium">
            No houses in this category
          </div>
        ) : (
          <AnimatePresence>
            {paginatedHouses.map((property) => (
              <Link
                to={`/property/${property.id}`}
                key={property.id}
                className="block hover:shadow-lg transition"
              >
                <motion.div
                  key={property.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  className="rounded-xl grid lg:grid-cols-2 overflow-hidden p-4 shadow bg-white"
                >
                  <div>
                    <img
                      src={
                        property.images?.[0]?.url ||
                        randomImages[
                          Math.floor(Math.random() * randomImages.length)
                        ]
                      }
                      alt={property.title}
                      className="w-full h-52 object-cover rounded-md"
                    />
                  </div>
                  <div className="p-4 space-y-2">
                    <h3 className="text-lg font-semibold">{property.title}</h3>
                    <p className="text-sm text-gray-600">{property.address}</p>
                    <p className="text-green-700 text-sm capitalize">
                      {property.type?.toLowerCase()}
                    </p>
                    <p className="text-xl font-bold text-gray-800">
                      ₦{property.price?.toLocaleString()}
                    </p>
                  </div>
                </motion.div>
              </Link>
            ))}
          </AnimatePresence>
        )}

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
