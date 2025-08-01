import React, { useState } from "react";
import axios from "axios";
import { MagnifyingGlassIcon, MapPinIcon, Tag } from "@phosphor-icons/react";

const SearchFeature = () => {
  const [isRent, setIsRent] = useState(true);
  const [searchCriteria, setSearchCriteria] = useState({
    propertyType: "",
    location: "",
    price: "",
  });
  const [searchResults, setSearchResults] = useState([]);
  const [hasSearched, setHasSearched] = useState(false);
  const [loading, setLoading] = useState(false);

  const formatString = (str) => str.replace(/-/g, " ");

  const handleSelectChange = (e) => {
    const { name, value } = e.target;
    setSearchCriteria((prev) => ({ ...prev, [name]: value }));
  };

  const handleSearch = async () => {
    const { propertyType, location, price } = searchCriteria;
    const [minPrice, maxPrice] = price
      ? price.split("-").map(Number)
      : [undefined, undefined];

    setLoading(true);
    setHasSearched(false);

    try {
      const res = await axios.get(`${import.meta.env.VITE_API_URL}/property`, {
        params: {
          type: propertyType || undefined,
          location: location || undefined,
          rentOrLease: isRent ? "rent" : "lease",
          minPrice,
          maxPrice,
        },
      });

      const data = res.data?.data?.properties || [];
      setSearchResults(Array.isArray(data) ? data : [data]);
    } catch (err) {
      console.error("Failed to fetch search results:", err);
      setSearchResults([]);
    } finally {
      setLoading(false);
      setHasSearched(true);
    }
  };

  const isSearchDisabled =
    !searchCriteria.propertyType &&
    !searchCriteria.location &&
    !searchCriteria.price;

  return (
    <>
      <div className="absolute -bottom-30 left-1/2 transform -translate-x-1/2 w-[95%] max-w-7xl z-20 px-4">
        {/* Rent/Lease Toggle */}
        <div className="flex bg-white border border-green-500 rounded-t-2xl w-fit h-12 overflow-hidden mb-0 shadow-sm">
          <button
            onClick={() => setIsRent(true)}
            className={`px-5 py-2 font-semibold text-sm transition-all duration-300 ${
              isRent
                ? "bg-white text-green-700 shadow-md"
                : "bg-gray-100 text-gray-600 hover:text-gray-800"
            }`}
          >
            Rent
          </button>
          <button
            onClick={() => setIsRent(false)}
            className={`px-5 py-2 font-semibold text-sm transition-all duration-300 ${
              !isRent
                ? "bg-white text-green-700 shadow-md"
                : "bg-gray-100 text-gray-600 hover:text-gray-800"
            }`}
          >
            Lease
          </button>
        </div>

        {/* Search Fields Container */}
        <div className="bg-white rounded-b-2xl shadow-2xl p-6 md:p-10 flex flex-col gap-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Property Type */}
            <div className="relative flex items-center gap-2 border border-slate-300 rounded-lg px-3 py-2 focus-within:border-green-500 transition">
              <MagnifyingGlassIcon className="text-gray-400" size={20} />
              <select
                name="propertyType"
                value={searchCriteria.propertyType}
                onChange={handleSelectChange}
                className="w-full bg-transparent border-none outline-none text-sm"
              >
                <option value="">Property Type</option>
                <option value="self-contain-apartment">
                  Self-Contain Apartment
                </option>
                <option value="2-bed-room-apartment">
                  2-Bed Room Apartment
                </option>
                <option value="duplex">Duplex</option>
                <option value="3-bed-room-apartment">
                  3-BedRoom Apartment
                </option>
                <option value="4-bed-room-apartment">
                  4-BedRoom Apartment
                </option>
                <option value="warehouse">Warehouse</option>
                <option value="church-hall">Church Hall</option>
                <option value="studio">Studio</option>
              </select>
            </div>

            {/* Location */}
            <div className="relative flex items-center gap-2 border border-slate-300 rounded-lg px-3 py-2 focus-within:border-green-500 transition">
              <MapPinIcon className="text-gray-400" size={20} />
              <select
                name="location"
                value={searchCriteria.location}
                onChange={handleSelectChange}
                className="w-full bg-transparent border-none outline-none text-sm"
              >
                <option value="">Location</option>
                <option value="lagos">Lagos</option>
                <option value="ikeja">Ikeja</option>
                <option value="surulere">Surulere</option>
                <option value="lekki-phase-1">Lekki Phase 1</option>
                <option value="shomolu">Shomolu</option>
                <option value="oshodi-isolo">Oshodi/Isolo</option>
                <option value="illupeju">Illupeju</option>
                <option value="victoria-island">Victoria Island</option>
                <option value="badagry">Badagry</option>
              </select>
            </div>

            {/* Price */}
            <div className="relative flex items-center gap-2 border border-slate-300 rounded-lg px-3 py-2 focus-within:border-green-500 transition">
              <Tag className="text-gray-400" size={20} />
              <select
                name="price"
                value={searchCriteria.price}
                onChange={handleSelectChange}
                className="w-full bg-transparent border-none outline-none text-sm"
              >
                <option value="">Price</option>
                <option value="100000-200000">100,000 - 200,000</option>
                <option value="201000-300000">201,000 - 300,000</option>
                <option value="301000-400000">301,000 - 400,000</option>
                <option value="401000-500000">401,000 - 500,000</option>
                <option value="501000-600000">501,000 - 600,000</option>
              </select>
            </div>
          </div>

          {/* Search Button */}
          <div className="flex justify-center">
            <button
              onClick={handleSearch}
              disabled={isSearchDisabled}
              className={`w-full sm:w-auto px-6 py-3 text-sm font-semibold rounded-xl transition duration-300 ${
                isSearchDisabled
                  ? "bg-gray-400 text-white cursor-not-allowed"
                  : "bg-green-600 text-white hover:bg-green-700"
              }`}
            >
              Search
            </button>
          </div>
        </div>
      </div>

      {/* Search Results */}
      {hasSearched && (
        <div className="w-full max-w-7xl mx-auto px-4 mt-32">
          <div className="bg-white rounded-2xl shadow-lg p-6">
            <div className="mb-6">
              <h3 className="text-xl font-semibold text-gray-800 mb-2">
                Search Results
              </h3>
              <p className="text-sm text-gray-600">
                Found {searchResults.length} propert
                {searchResults.length !== 1 ? "ies" : "y"}
              </p>
            </div>

            {loading ? (
              <p className="text-center text-gray-500">Loading results...</p>
            ) : searchResults.length === 0 ? (
              <div className="text-center py-8">
                <p className="text-gray-500 text-lg">
                  No properties found matching your criteria.
                </p>
                <p className="text-sm text-gray-400 mt-2">
                  Try adjusting your search filters.
                </p>
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {searchResults.map((property) => (
                  <div
                    key={property.id}
                    className="rounded-2xl overflow-hidden flex flex-col shadow-md hover:shadow-xl transition bg-white border border-gray-100"
                  >
                    <div className="h-48 bg-gradient-to-br from-green-100 to-green-200 flex items-center justify-center">
                      <div className="text-center">
                        <div className="text-4xl mb-2">🏠</div>
                        <p className="text-sm text-gray-600 capitalize">
                          {formatString(property.type)}
                        </p>
                      </div>
                    </div>
                    <div className="p-4 flex flex-col gap-2 flex-grow">
                      <h3 className="text-lg font-semibold text-gray-900 capitalize">
                        {formatString(property.type)}
                      </h3>
                      <p className="text-sm text-gray-500 flex items-center gap-1 capitalize">
                        📍 {formatString(property.location)}
                      </p>
                      <div className="text-sm text-green-700 capitalize">
                        {property.rentOrLease}
                      </div>
                      <p className="text-xl font-bold text-gray-800">
                        ₦{property.price?.toLocaleString()}
                      </p>
                      <div className="mt-auto pt-2">
                        <button className="w-full bg-green-600 text-white py-2 px-4 rounded-lg hover:bg-green-700 transition duration-300 text-sm font-medium">
                          View Details
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      )}
    </>
  );
};

export default SearchFeature;
