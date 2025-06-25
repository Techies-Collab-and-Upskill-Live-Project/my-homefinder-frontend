import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import TenantListingSidebar from "./TenantListingSidebar";
import { Heart } from "@phosphor-icons/react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import L from "leaflet";

// Dummy icon to avoid missing marker issue
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl:
    "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png",
  iconUrl:
    "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png",
  shadowUrl:
    "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png",
});

const houseData = [
  {
    id: 1,
    name: "Sunny Side Villa",
    address: "12 Ocean View Drive, Lagos",
    amenities: ["WiFi", "Air Conditioning", "Pool", "Parking"],
    type: "bungalow",
    price: 450000,
    featured: true,
    popular: true,
    image: "/house_sample.png",
    position: [6.5244, 3.3792],
  },
  {
    id: 2,
    name: "Modern Duplex",
    address: "5 Lekki Gardens, Lagos",
    amenities: ["Gym", "WiFi", "Garage"],
    type: "duplex",
    price: 750000,
    featured: false,
    popular: false,
    image: "/house_sample.png",
    position: [6.4667, 3.45],
  },
  {
    id: 3,
    name: "Compact Self-Contain",
    address: "22 Palm Street, Abuja",
    amenities: ["Water Heater", "Fan"],
    type: "self-contain",
    price: 200000,
    featured: false,
    popular: true,
    image: "/house_sample.png",
    position: [9.0579, 7.4951],
  },
  {
    id: 4,
    name: "Luxury Bungalow",
    address: "10 Paradise Lane, Ibadan",
    amenities: ["WiFi", "AC", "Generator", "CCTV"],
    type: "bungalow",
    price: 600000,
    featured: true,
    popular: false,
    image: "/house_sample.png",
    position: [7.3775, 3.947],
  },
  {
    id: 5,
    name: "Penthouse Duplex",
    address: "88 Victoria Island, Lagos",
    amenities: ["Gym", "Swimming Pool", "Lift"],
    type: "duplex",
    price: 1200000,
    featured: true,
    popular: true,
    image: "/house_sample.png",
    position: [6.4281, 3.4216],
  },
  {
    id: 6,
    name: "Urban Nest",
    address: "3 Broadway Crescent, Enugu",
    amenities: ["WiFi", "Backup Power"],
    type: "self-contain",
    price: 220000,
    featured: false,
    popular: false,
    image: "/house_sample.png",
    position: [6.5244, 7.5186],
  },
  {
    id: 7,
    name: "Serenity Duplex",
    address: "7 Trans Amadi, Port Harcourt",
    amenities: ["Gym", "WiFi", "Security"],
    type: "duplex",
    price: 800000,
    featured: true,
    popular: true,
    image: "/house_sample.png",
    position: [4.8156, 7.0498],
  },
  {
    id: 8,
    name: "Garden View Bungalow",
    address: "15 Ring Road, Benin City",
    amenities: ["Garden", "WiFi", "Generator"],
    type: "bungalow",
    price: 480000,
    featured: true,
    popular: false,
    image: "/house_sample.png",
    position: [6.3382, 5.6258],
  },
  {
    id: 9,
    name: "Royal Self-Contain",
    address: "42 Prince Avenue, Jos",
    amenities: ["Fan", "Water Heater"],
    type: "self-contain",
    price: 180000,
    featured: false,
    popular: true,
    image: "/house_sample.png",
    position: [9.8965, 8.8583],
  },
  {
    id: 10,
    name: "Elite Duplex",
    address: "25 Admiralty Way, Lekki",
    amenities: ["WiFi", "AC", "Gym", "Security"],
    type: "duplex",
    price: 1100000,
    featured: true,
    popular: true,
    image: "/house_sample.png",
    position: [6.436, 3.4846],
  },
  {
    id: 11,
    name: "Tranquil Cottage",
    address: "9 Rock Hill, Abeokuta",
    amenities: ["CCTV", "WiFi", "Solar"],
    type: "bungalow",
    price: 400000,
    featured: false,
    popular: false,
    image: "/house_sample.png",
    position: [7.1606, 3.3481],
  },
  {
    id: 12,
    name: "Budget Stay",
    address: "1 Unity Close, Osogbo",
    amenities: ["Fan", "Water"],
    type: "self-contain",
    price: 160000,
    featured: false,
    popular: true,
    image: "/house_sample.png",
    position: [7.7719, 4.556],
  },
];

const filterOptions = [
  "featured",
  "duplex",
  "bungalow",
  "self-contain",
  "most popular",
];

const TenantListingHouses = () => {
  const [filter, setFilter] = useState("featured");
  const [liked, setLiked] = useState({});
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  const toggleLike = (id) => {
    setLiked((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  const filteredHouses = houseData.filter((house) => {
    if (filter === "featured") return house.featured;
    if (filter === "most popular") return house.popular;
    return house.type === filter;
  });

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
                setCurrentPage(1); // Reset to page 1 when filter changes
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
              <Marker position={house.position} key={house.id}>
                <Popup>
                  <strong>{house.name}</strong> <br />₦
                  {house.price.toLocaleString()}
                </Popup>
              </Marker>
            ))}
          </MapContainer>
        </div>

        {/* Cards */}
        <div className="grid grid-cols-1 gap-6">
          <AnimatePresence>
            {paginatedHouses.map((house) => (
              <motion.div
                key={house.id}
                layout
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -30 }}
                transition={{ duration: 0.4 }}
                className="rounded-xl relative grid lg:grid-cols-2 grid-cols-1 overflow-hidden p-4 shadow hover:shadow-lg transition bg-white"
              >
                <div className="">
                  <img
                    src={house.image}
                    alt={house.name}
                    className="w-full h-52 rounded-md object-cover"
                  />
                  <button
                    onClick={() => toggleLike(house.id)}
                    className={`absolute top-3 right-3 p-2 rounded-full shadow-md ${
                      liked[house.id]
                        ? "bg-[#0D7B0D]/50 text-white"
                        : "bg-white text-gray-600 hover:text-[#0D7B0D]"
                    } transition`}
                  >
                    <Heart weight={liked[house.id] ? "fill" : "regular"} />
                  </button>
                </div>
                <div className="p-4 space-y-2">
                  <h3 className="text-lg font-semibold text-gray-800">
                    {house.name}
                  </h3>
                  <p className="text-sm text-gray-500">{house.address}</p>
                  <span className="text-green-700 text-sm capitalize inline-block">
                    {house.type}
                  </span>
                  <div className="pt-2">
                    <div className="flex items-center gap-3 text-sm text-gray-600 flex-wrap">
                      {house.amenities.map((item, idx) => (
                        <h5 key={idx} className="border rounded-full px-4 py-1">
                          {item}
                        </h5>
                      ))}
                    </div>
                  </div>
                  <p className="text-xl font-bold text-gray-800">
                    ₦{house.price.toLocaleString()}
                  </p>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
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
