import React, { useState } from "react";
import axios from "axios";
import Select from "react-select";
import { MagnifyingGlassIcon, MapPinIcon, Tag } from "@phosphor-icons/react";
import { Link } from "react-router-dom";

const statesInNigeria = [
  "Abia",
  "Adamawa",
  "Akwa Ibom",
  "Anambra",
  "Bauchi",
  "Bayelsa",
  "Benue",
  "Borno",
  "Cross River",
  "Delta",
  "Ebonyi",
  "Edo",
  "Ekiti",
  "Enugu",
  "FCT - Abuja",
  "Gombe",
  "Imo",
  "Jigawa",
  "Kaduna",
  "Kano",
  "Katsina",
  "Kebbi",
  "Kogi",
  "Kwara",
  "Lagos",
  "Nasarawa",
  "Niger",
  "Ogun",
  "Ondo",
  "Osun",
  "Oyo",
  "Plateau",
  "Rivers",
  "Sokoto",
  "Taraba",
  "Yobe",
  "Zamfara",
];

const propertyTypes = ["APARTMENT", "HOUSE", "STUDIO", "ROOM", "OFFICE"];

const priceRanges = [
  "100,000-200,000",
  "300,000-400,000",
  "500,000-100,000",
  "200,000-500,000",
  "500,000-1,000,000",
  "1,000,000-2,000,000",
];

const toSelectOptions = (array) =>
  array.map((item) => ({ value: item.toLowerCase(), label: item }));

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

  const formatString = (str) =>
    typeof str === "string" ? str.replace(/-/g, " ") : "";

  const handleSelectChange = (selectedOption, { name }) => {
    setSearchCriteria((prev) => ({
      ...prev,
      [name]: selectedOption?.value || "",
    }));
  };

  const handleSearch = async () => {
    const { propertyType, location, price } = searchCriteria;

    let minPrice, maxPrice;
    if (price?.includes("-")) {
      const [min, max] = price.split("-").map(Number);
      minPrice = isNaN(min) ? undefined : min;
      maxPrice = isNaN(max) ? undefined : max;
    }

    try {
      setLoading(true);
      const { data } = await axios.get(
        `${import.meta.env.VITE_API_URL}/property`,
        {
          params: {
            type: propertyType.toUpperCase(),
            minPrice,
            maxPrice,
            state: location,
            page: 1,
            limit: 10,
            sortBy: "price",
            sortOrder: "asc",
          },
        }
      );

      setSearchResults(data?.data?.properties ?? []);
    } catch (err) {
      console.error("Search failed", err);
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
            onClick={() => setIsRent(false)}
            className={`px-5 py-2 font-semibold text-sm transition-all duration-300 ${
              !isRent
                ? "bg-white text-green-700 shadow-md"
                : "bg-gray-100 text-gray-600 hover:text-gray-800"
            }`}
          >
            Search your desired property
          </button>
        </div>

        {/* Search Fields */}
        <div className="bg-white rounded-b-2xl shadow-2xl p-6 md:p-10 flex flex-col gap-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Property Type Select */}
            <div className="flex items-center gap-2 rounded-lg px-3 py-2">
              <MagnifyingGlassIcon className="text-gray-400" size={20} />
              <Select
                name="propertyType"
                options={toSelectOptions(propertyTypes)}
                value={
                  searchCriteria.propertyType
                    ? {
                        value: searchCriteria.propertyType,
                        label: searchCriteria.propertyType,
                      }
                    : null
                }
                onChange={handleSelectChange}
                placeholder="Select Property Type"
                className="w-full text-sm"
                classNamePrefix="react-select"
                isClearable
              />
            </div>

            {/* Location Select */}
            <div className="flex items-center gap-2 rounded-lg px-3 py-2">
              <MapPinIcon className="text-gray-400" size={20} />
              <Select
                name="location"
                options={toSelectOptions(statesInNigeria)}
                value={
                  searchCriteria.location
                    ? {
                        value: searchCriteria.location,
                        label: searchCriteria.location,
                      }
                    : null
                }
                onChange={handleSelectChange}
                placeholder="Enter or select a state"
                className="w-full text-sm"
                classNamePrefix="react-select"
                isClearable
                isSearchable
              />
            </div>

            {/* Price Range Select */}
            <div className="flex items-center gap-2 rounded-lg px-3 py-2">
              <Tag className="text-gray-400" size={20} />
              <Select
                name="price"
                options={toSelectOptions(priceRanges)}
                value={
                  searchCriteria.price
                    ? {
                        value: searchCriteria.price,
                        label: searchCriteria.price,
                      }
                    : null
                }
                onChange={handleSelectChange}
                placeholder="Enter or select price range"
                className="w-full text-sm"
                classNamePrefix="react-select"
                isClearable
                isSearchable
              />
            </div>
          </div>

          {/* Search Button */}
          <div className="flex justify-center">
            <button
              onClick={handleSearch}
              disabled={isSearchDisabled || loading}
              className={`w-full sm:w-auto px-6 py-3 text-sm font-semibold rounded-xl transition duration-300 flex items-center justify-center gap-2 ${
                isSearchDisabled || loading
                  ? "bg-gray-400 text-white cursor-not-allowed"
                  : "bg-green-600 text-white hover:bg-green-700"
              }`}
            >
              {loading ? (
                <>
                  <svg
                    className="animate-spin h-4 w-4 text-white"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                  >
                    <circle
                      className="opacity-25"
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      strokeWidth="4"
                    />
                    <path
                      className="opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"
                    />
                  </svg>
                  Searching...
                </>
              ) : (
                "Search"
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Search Results (unchanged) */}
      {hasSearched && (
        <div className="w-full max-w-7xl mx-auto px-4 mt-52">
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
                    <div className="text-center">
                      <img
                        src={property?.images[0]?.url}
                        alt=""
                        className="w-full h-52"
                      />
                    </div>
                    <div className="p-4 flex flex-col gap-2 flex-grow">
                      <h3 className="text-lg font-semibold text-gray-900 capitalize">
                        {formatString(property.type)}
                      </h3>
                      <p className="text-sm text-gray-500 flex items-center gap-1 capitalize">
                        📍 {formatString(property.address)}
                      </p>
                      <p className="text-sm text-gray-500 flex items-center gap-1 capitalize">
                        {formatString(property.description)}
                      </p>
                      <div className="text-sm text-green-700 capitalize">
                        {property.rentOrLease}
                      </div>
                      <p className="text-xl font-bold text-gray-800">
                        ₦{property.price?.toLocaleString()}
                      </p>
                      <div className="mt-auto pt-2">
                        <Link to={`/property/${property.id}`}>
                          <button className="w-full bg-green-600 text-white py-2 px-4 rounded-lg hover:bg-green-700 transition duration-300 text-sm font-medium">
                            View Details
                          </button>
                        </Link>
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
