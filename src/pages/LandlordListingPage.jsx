import { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import PropertyHero from "../components/PropertyHero";
import { motion } from "framer-motion";

const randomImages = [
  "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=800&q=80",
  "https://images.unsplash.com/photo-1572120360610-d971b9b7886d?auto=format&fit=crop&w=800&q=80",
  "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?auto=format&fit=crop&w=800&q=80",
  "https://images.unsplash.com/photo-1613977257363-b4c7ed7caa7b?auto=format&fit=crop&w=800&q=80",
  "https://images.unsplash.com/photo-1599427304963-c37a9dc6b10c?auto=format&fit=crop&w=800&q=80",
];

const LandlordListingPage = () => {
  const [properties, setProperties] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const userId = JSON.parse(localStorage.getItem("user"))?.user.id;
  const token = JSON.parse(localStorage.getItem("user"))?.token.token;

  useEffect(() => {
    const fetchUserProperties = async () => {
      try {
        const res = await axios.get(
          `${
            import.meta.env.VITE_API_URL
          }/property/landlord/${userId}?page=1&limit=10`,
          {
            headers: { Authorization: `Bearer ${token}` },
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

  const handlePropertyClick = (id) => {
    navigate(`/property/${id}`);
  };

  return (
    <section className="flex flex-col min-h-screen bg-gray-50">
      <div className="flex flex-1">
        <div className="flex-1 p-4 md:p-8 mt-[95px]">
          <PropertyHero />

          <div className="mt-8">
            <h2 className="text-2xl font-bold text-gray-800 mb-6">
              My Properties
            </h2>

            {loading ? (
              <p className="text-center">Loading properties...</p>
            ) : error ? (
              <p className="text-center text-red-500">{error}</p>
            ) : properties.length === 0 ? (
              <p className="text-center text-gray-500">No properties found.</p>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {properties.map((property, index) => (
                  <motion.div
                    key={property.id || index}
                    onClick={() => handlePropertyClick(property.id)}
                    className="cursor-pointer group bg-white rounded-2xl overflow-hidden shadow hover:shadow-lg transition-all duration-300"
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
                      className="w-full h-52 object-cover group-hover:brightness-95 transition"
                    />
                    <div className="p-4 space-y-1">
                      <h3 className="text-lg font-semibold text-gray-900 truncate">
                        {property.title || "Untitled Property"}
                      </h3>
                      <p className="text-sm text-gray-500 truncate">
                        {property.address || "No address provided"}
                      </p>
                      <p className="text-green-600 text-sm capitalize">
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
                        <span
                          className={
                            property.isAvailable
                              ? "text-green-700"
                              : "text-red-500"
                          }
                        >
                          {property.isAvailable ? "Available" : "Not Available"}
                        </span>
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
