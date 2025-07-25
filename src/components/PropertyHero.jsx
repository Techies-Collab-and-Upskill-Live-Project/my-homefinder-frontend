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

        // Flatten all image URLs from all properties
        const images = safeProperties.flatMap(
          (property) => property.images?.map((img) => img.url) || []
        );

        setAllImages(images);

        // Set the first image as main image
        if (images.length > 0) {
          setMainImage(images[0]);
        }
      } catch (err) {
        console.error("Error fetching properties:", err);
        setError("Failed to fetch properties");
      } finally {
        setLoading(false);
      }
    };

    fetchProperties();
  }, []);

  if (loading) return <p>Loading...</p>;
  if (error) return <p className="text-red-600">{error}</p>;

  return (
    <div className="bg-white rounded-xl shadow-md p-6">
      <h1 className="text-3xl font-bold mb-6">Top Movers</h1>

      {/* Main Image */}
      <div className="w-full mb-4">
        {mainImage && (
          <img
            src={mainImage}
            alt="Main Display"
            className="w-full h-72 object-cover rounded-lg"
          />
        )}
      </div>

      {/* Image Carousel */}
      <div className="flex gap-4 overflow-x-auto">
        {allImages.map((imgUrl, index) => (
          <img
            key={index}
            src={imgUrl}
            alt={`Thumbnail ${index + 1}`}
            className={`w-24 h-24 object-cover rounded-md cursor-pointer border-2 ${
              mainImage === imgUrl ? "border-green-600" : "border-transparent"
            }`}
            onClick={() => setMainImage(imgUrl)}
          />
        ))}
      </div>
    </div>
  );
};

export default PropertyHero;
