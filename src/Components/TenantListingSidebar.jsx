import {
  CurrencyBtcIcon,
  Plus,
  Minus,
  CaretDownIcon,
} from "@phosphor-icons/react";
import React, { useState } from "react";

const TenantListingSidebar = () => {
  const [rentRange, setRentRange] = useState([100000, 1000000]);
  const [rooms, setRooms] = useState(1);
  const [bathrooms, setBathrooms] = useState(1);
  const [showMoreAmenities, setShowMoreAmenities] = useState(false);
  const [showMoreLocations, setShowMoreLocations] = useState(false);

  const amenities = [
    "Wi-Fi",
    "Air Conditioning",
    "24/7 Power",
    "Furnished",
    "Kitchen",
    "CCTV",
    "Security",
    "Parking",
    "Water Heater",
    "Balcony",
    "Pet Friendly",
    "Gym",
  ];

  const locations = {
    Lekki: ["Ajah", "Ikate", "Chevron", "VGC"],
    Ikeja: ["GRA", "Alausa", "Allen", "Maryland"],
    Yaba: ["Sabo", "Akoka", "Alagomeji"],
    Surulere: ["Aguda", "Iponri", "Bode Thomas"],
    "Victoria Island": ["Oniru", "Ozumba", "Eko Atlantic"],
  };

  const handleRentChange = (index, value) => {
    const newRange = [...rentRange];
    newRange[index] = value;
    setRentRange(newRange);
  };

  return (
    <aside className="col-span-1 hidden lg:block h-[70%] overflow-y-auto border border-[#0D7B0D] rounded-lg p-6 bg-white shadow-lg">
      <div className="flex flex-col space-y-6">
        <h1 className="text-2xl font-semibold text-gray-800">Filter by:</h1>
        <div className="w-full h-[1px] bg-gray-300"></div>

        {/* Rent Range */}
        <section>
          <h5 className="text-lg font-semibold mb-2 flex items-center gap-2 text-gray-800">
            Rent Range <CurrencyBtcIcon size={20} />
          </h5>
          <input
            type="range"
            min="50000"
            max="5000000"
            step="50000"
            value={rentRange[1]}
            onChange={(e) =>
              setRentRange([rentRange[0], parseInt(e.target.value)])
            }
            className="w-full"
          />
          <div className="flex gap-2 mb-2">
            <input
              type="number"
              value={rentRange[0]}
              min={50000}
              max={rentRange[1]}
              onChange={(e) => handleRentChange(0, Number(e.target.value))}
              className="w-full border rounded-md px-2 py-1 text-sm focus:outline-none focus:ring-2 focus:ring-green-400"
              placeholder="Min"
            />
            <input
              type="number"
              value={rentRange[1]}
              min={rentRange[0]}
              max={5000000}
              onChange={(e) => handleRentChange(1, Number(e.target.value))}
              className="w-full border rounded-md px-2 py-1 text-sm focus:outline-none focus:ring-2 focus:ring-green-400"
              placeholder="Max"
            />
          </div>

          <div className="text-sm mt-2 flex justify-between text-gray-600">
            <span>₦{rentRange[0].toLocaleString()}</span>
            <span>₦{rentRange[1].toLocaleString()}</span>
          </div>
        </section>

        <div className="w-full h-[1px] bg-gray-300"></div>

        {/* Amenities */}
        <section>
          <h5 className="text-lg font-semibold mb-2 text-gray-800">
            Amenities
          </h5>
          <div className="grid grid-cols-1 gap-2">
            {(showMoreAmenities ? amenities : amenities.slice(0, 6)).map(
              (amenity) => (
                <label
                  key={amenity}
                  className="flex items-center gap-2 text-sm text-gray-700"
                >
                  <input type="checkbox" className="accent-green-600" />
                  {amenity}
                </label>
              )
            )}
          </div>
          {!showMoreAmenities && (
            <button
              onClick={() => setShowMoreAmenities(true)}
              className="mt-2 text-[#0D7B0D] text-sm font-bold flex items-center gap-2 hover:underline"
            >
              Show All ({amenities.length - 6}) <CaretDownIcon />
            </button>
          )}
        </section>

        <div className="w-full h-[1px] bg-gray-300"></div>

        {/* House Type */}
        <section>
          <h5 className="text-lg font-semibold mb-2 text-gray-800">
            Property Type
          </h5>
          {["Shortlet", "Apartment", "House"].map((type) => (
            <label
              key={type}
              className="flex items-center gap-2 text-sm text-gray-700"
            >
              <input type="checkbox" className="accent-green-600" />
              {type}
            </label>
          ))}
        </section>

        <div className="w-full h-[1px] bg-gray-300"></div>

        {/* Rooms and Bathrooms */}
        <section className="flex gap-4 justify-between">
          <div className="mb-4">
            <h5 className="text-lg font-semibold mb-2 text-gray-800">
              Bedrooms
            </h5>
            <div className="flex items-center gap-3">
              <button
                onClick={() => setRooms(Math.max(1, rooms - 1))}
                className="bg-[#E7F2E7] p-1"
              >
                <Minus size={18} />
              </button>
              <span>{rooms}</span>
              <button
                onClick={() => setRooms(rooms + 1)}
                className="bg-[#E7F2E7] p-1"
              >
                <Plus size={18} />
              </button>
            </div>
          </div>

          <div>
            <h5 className="text-lg font-semibold mb-2 text-gray-800">
              Bathrooms
            </h5>
            <div className="flex items-center gap-3">
              <button
                onClick={() => setBathrooms(Math.max(1, bathrooms - 1))}
                className="bg-[#E7F2E7] p-1"
              >
                <Minus size={18} />
              </button>
              <span>{bathrooms}</span>
              <button
                onClick={() => setBathrooms(bathrooms + 1)}
                className="bg-[#E7F2E7] p-1"
              >
                <Plus size={18} />
              </button>
            </div>
          </div>
        </section>

        <div className="w-full h-[1px] bg-gray-300"></div>

        {/* Locations */}
        <section>
          <h5 className="text-lg font-semibold mb-2 text-gray-800">
            Areas in Lagos
          </h5>
          {Object.entries(locations)
            .slice(0, showMoreLocations ? Object.keys(locations).length : 3)
            .map(([area, subAreas]) => (
              <div key={area} className="mb-3">
                <label className="font-medium text-gray-700">{area}</label>
                <div className="ml-4 mt-1 grid grid-cols-1 gap-1 text-sm text-gray-600">
                  {subAreas.map((location) => (
                    <label key={location} className="flex items-center gap-2">
                      <input type="checkbox" className="accent-green-600" />
                      {location}
                    </label>
                  ))}
                </div>
              </div>
            ))}
          {!showMoreLocations &&
            locations &&
            Array.isArray(locations) &&
            locations.length > 3 && (
              <button
                onClick={() => setShowMoreLocations(true)}
                className="mt-2 text-[#0D7B0D] text-sm font-bold flex items-center gap-2 hover:underline"
              >
                Show All ({locations.length - 3}) <CaretDownIcon />
              </button>
            )}
        </section>
      </div>
    </aside>
  );
};

export default TenantListingSidebar;
