import { HeartIcon, MailboxIcon, Star } from "@phosphor-icons/react";
import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Link } from "react-router-dom";

const StarRating = ({ rating, onChange }) => {
  return (
    <div className="flex items-center gap-1">
      {[1, 2, 3, 4, 5].map((star) => (
        <button
          type="button"
          key={star}
          onClick={() => onChange(star)}
          className={`text-2xl transition ${
            star <= rating ? "text-yellow-400" : "text-gray-300"
          } hover:scale-110`}
        >
          <Star fill={star <= rating ? "#facc15" : "#333"} strokeWidth={1.5} />
        </button>
      ))}
    </div>
  );
};

const HouseDetails = ({ properties, setProperties }) => {
  const { id } = useParams();
  const navigate = useNavigate();
  const house = properties.find((item) => item.id === id);
  const token = JSON.parse(localStorage.getItem("user"))?.token.token;

  const ratingMap = {
    1: "ONE",
    2: "TWO",
    3: "THREE",
    4: "FOUR",
    5: "FIVE",
  };

  const ratingValueMap = {
    ONE: 1,
    TWO: 2,
    THREE: 3,
    FOUR: 4,
    FIVE: 5,
  };

  const [reviewText, setReviewText] = useState("");
  const [rating, setRating] = useState(0);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState(null);
  const [reviews, setReviews] = useState([]);
  const [mainImage, setMainImage] = useState(
    house?.images?.[0]?.url || "/placeholder.jpg"
  );

  const propertyId = id;

  useEffect(() => {
    if (house?.images) {
      setMainImage(house.images[0]?.url || "/placeholder.jpg");
    }
  }, [house]);

  useEffect(() => {
    const getReviews = async () => {
      try {
        const rev = await axios.get(
          `${
            import.meta.env.VITE_API_URL
          }/reviews/property/${propertyId}?limit=5`,
          {
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
          }
        );
        setReviews(Array.isArray(rev.data) ? rev.data : []);
      } catch (err) {
        console.error(err);
      }
    };
    getReviews();
  }, [propertyId, token]);

  useEffect(() => {
    const fetchProperties = async () => {
      try {
        const res = await axios.get(`${import.meta.env.VITE_API_URL}/property`);
        const data = res.data?.data?.properties || [];

        const matched = data.find((property) => property.id === id);
        if (matched) {
          setReviews(matched.reviews || []);
        } else {
          setError("Property not found");
        }
      } catch (err) {
        console.error("Error fetching properties:", err);
        setError("Failed to fetch reviews");
      } finally {
        setLoading(false);
      }
    };

    fetchProperties();
  }, [id, setProperties]);

  const handleReviewSubmit = async (e) => {
    e.preventDefault();
    if (!reviewText.trim() || rating < 1) {
      toast.warn("Please add a rating and a comment before submitting.");
      return;
    }

    const reviewerId = JSON.parse(localStorage.getItem("user"))?.user?.id;
    const newReview = {
      reviewerId,
      propertyId,
      rating: ratingMap[rating],
      comment: reviewText.trim(),
    };

    setSubmitting(true);
    try {
      const res = await axios.post(
        `${import.meta.env.VITE_API_URL}/reviews/property/${propertyId}`,
        newReview,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setReviews((prev) => [
        {
          ...newReview,
          createdAt: new Date().toISOString(),
          id: res.data?.id || Date.now(),
        },
        ...prev,
      ]);

      toast.success("Your review has been submitted!");
    } catch (err) {
      console.error(err.response?.data?.message || "Unable to add review");
      toast.error(err.response?.data?.message || "Unable to add review");
    } finally {
      setReviewText("");
      setRating(0);
      setSubmitting(false);
    }
  };

  if (!house)
    return <div className="text-center mt-20">Property not found.</div>;

  const {
    title,
    description,
    price,
    images,
    address,
    city,
    state,
    country,
    type,
    landlord,
  } = house;

  const featured = properties.filter((item) => item.id !== id).slice(0, 3);

  return (
    <div className="max-w-7xl mx-auto p-4 sm:p-8 space-y-10">
      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="colored"
      />
      {/* Main Layout */}
      <div className="grid md:grid-cols-2 gap-10 lg:mt-40 mt-20">
        {/* Images */}
        <div className="space-y-4">
          <img
            src={mainImage}
            alt={title}
            className="rounded-xl w-full h-[420px] object-cover shadow-md"
          />

          {images?.length > 1 && (
            <div className="flex items-center overflow-x-scroll gap-4">
              {images.map((img, idx) => (
                <img
                  key={idx}
                  src={img.url}
                  onClick={() => setMainImage(img.url)}
                  alt={`Image ${idx}`}
                  className="rounded-lg h-30 w-full object-cover"
                />
              ))}
            </div>
          )}
        </div>

        {/* Details */}
        <div className="space-y-6">
          <h1 className="text-3xl font-bold text-gray-900">{title}</h1>
          <p className="text-gray-600">{description}</p>

          <div className="space-y-2 text-gray-700">
            <p>
              <strong>Price:</strong> ₦{price.toLocaleString()}
            </p>
            <p>
              <strong>Type:</strong> {type}
            </p>
            <p>
              <strong>Location:</strong> {address}, {city}, {state}, {country}
            </p>
          </div>

          <div className="border-t pt-4 space-y-2">
            <h2 className="text-xl font-semibold">Contact Poster</h2>
            <p>
              <strong>Name:</strong> {landlord?.fullName}
            </p>
            <p>
              <strong>Email:</strong>{" "}
              <a
                href={`mailto:${landlord?.email}`}
                className="text-green-600 underline"
              >
                {landlord?.email}
              </a>
            </p>
            <p>
              <strong>Phone:</strong>{" "}
              <a
                href={`tel:${landlord?.phone}`}
                className="text-green-600 underline"
              >
                {landlord?.phone}
              </a>
            </p>
          </div>

          <div className="flex items-center gap-4 pt-2">
            <Link
              to={`/messages?propertyId=${
                house.id
              }&propertyTitle=${encodeURIComponent(house.title)}&landlordId=${
                house.landlord?.id || "unknown"
              }&landlordName=${encodeURIComponent(
                house.landlord?.name || "Property Owner"
              )}`}
              state={{
                property: house,
                landlord: house.landlord || {
                  id: "unknown",
                  name: "Property Owner",
                },
              }}
            >
              <button className="flex items-center gap-2 px-6 py-3 bg-green-700 text-white rounded-xl hover:bg-green-800 transition">
                <MailboxIcon className="w-5 h-5" /> Contact Now
              </button>
            </Link>
            <button className="p-2 border rounded-full text-gray-600 hover:text-red-600 hover:border-red-400 transition">
              <HeartIcon className="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>

      {/* 📝 Review Section */}
      <div className="mt-6 rounded-2xl p-6 shadow-md bg-white">
        <h3 className="text-xl font-semibold text-gray-800 mb-5">
          Leave a Review
        </h3>

        <form onSubmit={handleReviewSubmit} className="space-y-6">
          {/* Star Rating */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Rating
            </label>
            <StarRating rating={rating} onChange={setRating} />
          </div>

          {/* Comment */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Comment
            </label>
            <div className="relative">
              <textarea
                value={reviewText}
                onChange={(e) => setReviewText(e.target.value)}
                placeholder="Write your thoughts here... What did you enjoy or dislike?"
                rows={5}
                className="w-full border border-gray-300 rounded-xl px-4 py-3 text-sm shadow-sm focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500 transition resize-none"
              ></textarea>
            </div>
          </div>

          {/* Submit */}
          <div className="text-right">
            <button
              type="submit"
              className="inline-flex items-center justify-center px-6 py-2.5 bg-green-600 hover:bg-green-700 text-white text-sm font-medium rounded-xl shadow-sm transition"
            >
              {submitting ? "Submitting..." : "Submit Review"}
            </button>
          </div>
        </form>
      </div>

      {/* 📖 Existing Reviews */}
      {loading ? (
        <div className="bg-white rounded-xl shadow-md p-6 text-gray-500 italic">
          Loading reviews...
        </div>
      ) : error ? (
        <div className="bg-white rounded-xl shadow-md p-6 text-red-500 font-medium">
          {error}
        </div>
      ) : reviews.length > 0 ? (
        <div className="bg-white rounded-xl shadow-md p-6 space-y-6">
          <h2 className="text-2xl font-semibold">What People Think</h2>
          <div className="space-y-4">
            {reviews.map((review, index) => (
              <div key={index} className="border-b pb-4 border-gray-200">
                <p className="text-gray-700">{review.comment}</p>
                <div className="flex items-center gap-1 mb-1">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <Star
                      key={star}
                      size={18}
                      weight={
                        star <= ratingValueMap[review.rating]
                          ? "fill"
                          : "regular"
                      }
                      className={
                        star <= ratingValueMap[review.rating]
                          ? "text-yellow-500"
                          : "text-gray-300"
                      }
                    />
                  ))}
                </div>
                <p className="text-xs text-gray-400 mt-1">
                  {new Date(review.createdAt).toLocaleString("en-US", {
                    year: "numeric",
                    month: "short",
                    day: "numeric",
                    hour: "2-digit",
                    minute: "2-digit",
                  })}
                </p>
              </div>
            ))}
          </div>
        </div>
      ) : (
        <div className="bg-white rounded-xl shadow-md p-6 text-gray-500 italic">
          No reviews yet.
        </div>
      )}

      {/* Featured Properties */}
      <div className="mt-10">
        <h2 className="text-2xl font-semibold mb-6">Featured Properties</h2>
        <div className="grid md:grid-cols-3 gap-6">
          {featured.map((item) => (
            <div
              key={item.id}
              className="bg-white rounded-xl overflow-hidden shadow hover:shadow-lg transition flex flex-col"
            >
              <img
                src={item.images?.[0]?.url || "/placeholder.jpg"}
                alt={item.title}
                className="w-full h-48 object-cover"
              />
              <div className="p-4 flex flex-col justify-between h-full">
                <div>
                  <h3 className="text-lg font-semibold">{item.title}</h3>
                  <p className="text-sm text-gray-500">
                    {item.city}, {item.state}
                  </p>
                  <p className="text-green-700 font-bold mt-1">
                    ₦{item.price.toLocaleString()}
                  </p>
                </div>
                <button
                  onClick={() => navigate(`/property/${item.id}`)}
                  className="mt-4 px-4 py-2 text-sm bg-green-700 text-white rounded-md hover:bg-green-800 transition"
                >
                  View Details
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default HouseDetails;
