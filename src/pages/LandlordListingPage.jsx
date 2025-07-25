import { useState, useEffect } from "react";
import axios from "axios";
import TopNavbar from "../layout/TopNavbar";
import Sidebar from "../layout/Sidebar";
import PropertyHero from "../components/PropertyHero";
import { motion } from "framer-motion";

// Random image list
const randomImages = [
  "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=800&q=80",
  "https://images.unsplash.com/photo-1572120360610-d971b9b7886d?auto=format&fit=crop&w=800&q=80",
  "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?auto=format&fit=crop&w=800&q=80",
  "https://images.unsplash.com/photo-1613977257363-b4c7ed7caa7b?auto=format&fit=crop&w=800&q=80",
  "https://images.unsplash.com/photo-1599427304963-c37a9dc6b10c?auto=format&fit=crop&w=800&q=80",
];

const LandlordListingPage = () => {
  const [showMenu, setShowMenu] = useState(false);
  const [properties, setProperties] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const toggleMenu = () => {
    setShowMenu(!showMenu);
  };

  useEffect(() => {
    const fetchUserProperties = async () => {
      try {
        const res = await axios.get(
          `${import.meta.env.VITE_API_URL}/property/user`,
          {
            withCredentials: true, // ensure cookies/token are sent
          }
        );

        const data = res.data?.data?.properties || [];
        setProperties(Array.isArray(data) ? data : [data]);
      } catch (err) {
        console.error("Error fetching user properties:", err);
        setError("Failed to fetch your properties.");
      } finally {
        setLoading(false);
      }
    };

    fetchUserProperties();
  }, []);

  return (
    <section className="flex flex-col min-h-screen bg-gray-50">
      <div className="flex flex-1">
        {/* Sidebar */}
        <div
          className={`transition-transform duration-300 ${
            showMenu ? "translate-x-0" : "-translate-x-full"
          } md:translate-x-0 md:relative fixed top-16 left-0 z-30`}
        >
          <Sidebar />
        </div>

        {/* Main Content */}
        <div className="flex-1 p-4 md:p-8 mt-[95px]">
          <PropertyHero />

          {/* Property Listings */}
          <div className="mt-8">
            <h2 className="text-xl font-bold mb-4">My Properties</h2>

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
                        property.images?.[0]?.url ||
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
        </div>
      </div>
    </section>
  );
};

export default LandlordListingPage;
