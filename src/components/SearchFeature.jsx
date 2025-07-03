import React, { useState } from "react";
import { MagnifyingGlassIcon, MapPinIcon, Tag } from "@phosphor-icons/react";

const SearchFeature = () => {
  const [isRent, setIsRent] = useState(true);
  const [searchCriteria, setSearchCriteria] = useState({
    propertyType: "",
    location: "",
    price: "",
  });

  const handleSelectChange = (e) => {
    const { name, value } = e.target;
    setSearchCriteria((prev) => ({ ...prev, [name]: value }));
  };

  const handleSearch = () => {
    console.log("Search initiated:", {
      type: isRent ? "Rent" : "Lease",
      ...searchCriteria,
    });
  };

  return (
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
              <option value="2-bed-room-apartment">2-Bed Room Apartment</option>
              <option value="duplex">Duplex</option>
              <option value="3-bed-room-apartment">3-BedRoom Apartment</option>
              <option value="4-bed-room-apartment">4-BedRoom Apartment</option>
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
            className="w-full sm:w-auto px-6 py-3 bg-green-600 text-white text-sm font-semibold rounded-xl hover:bg-green-700 transition duration-300"
          >
            Search
          </button>
        </div>
      </div>
    </div>
  );
};

export default SearchFeature;
