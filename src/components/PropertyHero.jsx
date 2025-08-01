import { useState, useEffect } from "react";
import axios from "axios";

const PropertyHero = () => {
  const [properties, setProperties] = useState([]);
  const [mainImage, setMainImage] = useState("");
  const [allImages, setAllImages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProperties = async () => {
      try {
        const res = await axios.get(`${import.meta.env.VITE_API_URL}/property`);
        const data = res.data?.data?.properties || [];

        const safeProperties = Array.isArray(data) ? data : [data];
        setProperties(safeProperties);

        const images = safeProperties.flatMap(
          (property) => property.images?.map((img) => img.url) || []
        );

        setAllImages(images);
        if (images.length > 0) setMainImage(images[0]);
      } catch (err) {
        console.error("Error fetching properties:", err);
        setError("Failed to fetch properties");
      } finally {
        setLoading(false);
      }
    };

    fetchProperties();
  }, []);

  if (loading) return <p className="text-gray-600">Loading properties...</p>;
  if (error) return <p className="text-red-600">{error}</p>;

  return (
    <div className="bg-white rounded-2xl shadow-lg p-6">
      <h1 className="text-3xl font-semibold mb-6 text-gray-800">Top Movers</h1>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Main Image */}
        <div className="md:col-span-2">
          {mainImage && (
            <img
              src={mainImage}
              alt="Main Display"
              className="w-full h-[500px] object-cover rounded-xl shadow-sm"
            />
          )}
        </div>

        {/* Thumbnails */}
        <div className="md:col-span-1 content-start grid grid-cols-3 sm:grid-cols-4 gap-3 max-h-[500px] overflow-y-auto pr-2">
          {allImages.map((imgUrl, index) => (
            <img
              key={index}
              src={imgUrl}
              alt={`Thumbnail ${index + 1}`}
              className={`w-full h-24 object-cover rounded-md cursor-pointer border-2 transition duration-300 ${
                mainImage === imgUrl
                  ? "border-green-600 scale-105"
                  : "border-gray-200"
              }`}
              onClick={() => setMainImage(imgUrl)}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default PropertyHero;
