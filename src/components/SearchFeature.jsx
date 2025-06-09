import React from "react";
import { Link } from "react-router-dom";

const SearchFeature = () => {
  return (

  <div className="relative z-10 -mt-10 px-4">
  <div className="bg-white rounded-xl shadow-lg max-w-5xl mx-auto p-6 md:p-8 flex flex-col md:flex-row items-center justify-between space-y-4 md:space-y-0 md:space-x-4">
    {/* Location dropdown */}
    <div className="w-full md:w-1/3">
      <label className="block text-gray-700 font-medium mb-2">Location</label>
      <select className="w-full border border-gray-300 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-green-500">
        <option value="">Select Location</option>
        <option value="lagos">Lagos</option>
        <option value="ikeja">Ikeja</option>
        <option value="surulere">Surulere</option>
        <option value="lekki-phase-1">Lekki phase 1</option>
        <option value="shomolu">Shomolu</option>
        <option value="oshodi-isolo">Oshodi/Isolo</option>
        <option value="illupeju">Illupeju</option>
        <option value="victoria-island">Victoria Island</option>
        <option value="badagry">Badagry</option>
      </select>
    </div>

    {/* Property type dropdown */}
    <div className="w-full md:w-1/3">
      <label className="block text-gray-700 font-medium mb-2">Property Type</label>
      <select className="w-full border border-gray-300 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-green-500">
        <option value="">Select Type</option>
        <option value="self-contain-apartment">Self-Contain Apartment</option>
        <option value="apartment">2-Bed Room Apartment</option>
        <option value="duplex">Duplex</option>
        <option value="apartment">3-BedRoom Apartment</option>
        <option value="apartment">4-BedRoom Apartment</option>
        <option value="warehouse">Warehouse</option>
        <option value="church-hall">Church Hall</option>
        <option value="studio">Studio</option>
      </select>
    </div>

    {/* Search button */}
    <div className="w-full md:w-auto">
      <button className="w-full md:w-auto px-6 py-3 bg-green-500 text-white rounded-lg hover:bg-green-600 transition duration-300 mt-4 md:mt-6">
        Search
      </button>
    </div>
  </div>
</div>
)}
export default SearchFeature;