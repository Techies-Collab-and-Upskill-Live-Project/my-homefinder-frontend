import React, { useState } from 'react';
import { MapPin, Search as SearchIconLucide, Tag as TagIconLucide } from 'lucide-react';

const SearchFeature = () => {
  const [isRent, setIsRent] = useState(true);
  const [searchCriteria, setSearchCriteria] = useState({
    propertyType: '',
    location: '',
    price: '',
  });

  const handleSelectChange = (e) => {
    const { name, value } = e.target;
    setSearchCriteria(prev => ({ ...prev, [name]: value }));
  };

  const handleSearch = () => {
    console.log("Search initiated:", {
      type: isRent ? 'Rent' : 'Lease',
      ...searchCriteria
    });
  };

  return (
    <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-[98%] md:w-5/6 lg:w-[80%] max-w-6xl z-20 px-4">
      
      {/* Rent/Lease Toggle */}
      <div className="flex border border-green-500 bg-white rounded-t-[24px] w-[250px] h-[50px] overflow-hidden mb-0 shadow-sm">
        <button
          onClick={() => setIsRent(true)}
          className={`flex-1 px-4 py-2 font-semibold rounded-l-lg transition-all duration-300 ${
            isRent ? 'bg-white text-green-700 shadow-md' : 'bg-gray-100 text-gray-600 hover:text-gray-800'
          }`}
        >
          Rent
        </button>
        <button
          onClick={() => setIsRent(false)}
          className={`flex-1 px-4 py-2 font-semibold rounded-r-lg transition-all duration-300 ${
            !isRent ? 'bg-white text-green-700 shadow-md' : 'bg-gray-100 text-gray-600 hover:text-gray-800'
          }`}
        >
          Lease
        </button>
      </div>

      {/* Main Search Section */}
      <div className="bg-white h-[180px]  shadow-2xl px-6 py-10 flex flex-col justify-center items-center gap-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-16 w-full max-w-4xl">
          {/* Property Type */}
          <div className="relative">
            <SearchIconLucide className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
            <select
              name="propertyType"
              value={searchCriteria.propertyType}
              onChange={handleSelectChange}
              className="w-full border border-gray-300 rounded-lg p-3 pl-10 text-base focus:outline-none focus:ring-2 focus:ring-green-500 appearance-none"
            >
              <option value="" disabled selected>Property Type</option>
              <option value="self-contain-apartment">Self-Contain Apartment</option>
              <option value="2-bed-room-apartment">2-Bed Room Apartment</option>
              <option value="duplex">Duplex</option>
              <option value="3-bed-room-apartment">3-BedRoom Apartment</option>
              <option value="4-bed-room-apartment">4-BedRoom Apartment</option>
              <option value="warehouse">Warehouse</option>
              <option value="church-hall">Church Hall</option>
              <option value="studio">Studio</option>
            </select>
            <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
              <svg className="fill-current h-4 w-4" viewBox="0 0 20 20"><path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 6.096 6.924 4.682 8.338l4.615 4.612z" /></svg>
            </div>
          </div>

          {/* Location */}
          <div className="relative">
            <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
            <select
              name="location"
              value={searchCriteria.location}
              onChange={handleSelectChange}
              className="w-full border border-gray-300 rounded-lg p-3 pl-10 text-base focus:outline-none focus:ring-2 focus:ring-green-500 appearance-none"
            >
              <option value="" disabled selected>Location</option>
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
            <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
              <svg className="fill-current h-4 w-4" viewBox="0 0 20 20"><path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 6.096 6.924 4.682 8.338l4.615 4.612z" /></svg>
            </div>
          </div>

          {/* Price */}
          <div className="relative ">
            <TagIconLucide className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
            <select
              name="price"
              value={searchCriteria.price}
              onChange={handleSelectChange}
              className="w-full border border-gray-300 rounded-lg p-3 pl-10 text-base focus:outline-none focus:ring-2 focus:ring-green-500 appearance-none"
            >
              <option value="" disabled selected>Price</option>
              <option value="100000-200000">100,000 - 200,000</option>
              <option value="201000-300000">201,000 - 300,000</option>
              <option value="301000-400000">301,000 - 400,000</option>
              <option value="401000-500000">401,000 - 500,000</option>
              <option value="501000-600000">501,000 - 600,000</option>
            </select>
            <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
              <svg className="fill-current h-4 w-4" viewBox="0 0 20 20"><path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 6.096 6.924 4.682 8.338l4.615 4.612z" /></svg>
            </div>
          </div>
        </div>

        {/* Search Button */}
        <div className="w-full max-w-xl flex justify-center mt-4">
          <button
            onClick={handleSearch}
            className="w-full md:w-1/2 lg:w-1/3 px-8 py-4 bg-green-600 text-white text-base font-semibold rounded-lg hover:bg-green-700 transition duration-300"
          >
            Search
          </button>
        </div>
      </div>
    </div>
  );
};

export default SearchFeature;
