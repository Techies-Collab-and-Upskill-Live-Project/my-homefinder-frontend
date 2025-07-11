import React, { useState, useEffect } from "react";

export default function AddPropertyModal({ onClose, onSave }) {
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    price: "",
    type: "APARTMENT",
    address: "",
    city: "",
    state: "",
    country: "Nigeria",
    latitude: "",
    longitude: "",
  });

  // Set random coordinates on modal mount
  useEffect(() => {
    const randomLatitude = (5 + Math.random() * 5).toFixed(6); // Nigeria approx latitudes 5 - 10
    const randomLongitude = (3 + Math.random() * 7).toFixed(6); // Nigeria approx longitudes 3 - 10

    setFormData((prev) => ({
      ...prev,
      latitude: randomLatitude,
      longitude: randomLongitude,
    }));
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave({
      ...formData,
      price: Number(formData.price),
      latitude: parseFloat(formData.latitude),
      longitude: parseFloat(formData.longitude),
    });
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-[99999] px-4">
      <div className="bg-white rounded-xl p-6 w-full max-w-2xl">
        <h2 className="text-2xl font-bold mb-6 text-center">Add New Property</h2>

        <form onSubmit={handleSubmit} className="grid grid-cols-2 gap-5">
          {[
            { label: "Title", name: "title" },
            { label: "Description", name: "description" },
            { label: "Price", name: "price", type: "number" },
            { label: "Address", name: "address" },
            { label: "City", name: "city" },
            { label: "State", name: "state" },
            { label: "Latitude", name: "latitude", type: "number" },
            { label: "Longitude", name: "longitude", type: "number" },
          ].map(({ label, name, type = "text" }) => (
            <div key={name} className="flex flex-col">
              <label className="block text-sm font-medium text-gray-700 mb-1">
                {label}
              </label>
              <input
                type={type}
                name={name}
                required
                className="w-full border rounded-md px-3 py-2 text-sm focus:ring-green-400 focus:border-green-400"
                value={formData[name]}
                onChange={(e) =>
                  setFormData((prev) => ({ ...prev, [name]: e.target.value }))
                }
              />
            </div>
          ))}

          <div className="flex flex-col">
            <label className="block text-sm font-medium text-gray-700 mb-1">Type</label>
            <select
              className="w-full border rounded-md px-3 py-2 text-sm focus:ring-green-400 focus:border-green-400"
              value={formData.type}
              onChange={(e) =>
                setFormData((prev) => ({ ...prev, type: e.target.value }))
              }
            >
              <option value="APARTMENT">Apartment</option>
              <option value="DUPLEX">Duplex</option>
              <option value="SELF-CONTAIN">Self Contain</option>
              <option value="BUNGALOW">Bungalow</option>
            </select>
          </div>
        </form>

        {/* Footer */}
        <div className="flex justify-end gap-3 pt-6">
          <button
            type="button"
            onClick={onClose}
            className="text-gray-600 hover:text-gray-800 text-sm"
          >
            Cancel
          </button>
          <button
            type="submit"
            onClick={handleSubmit}
            className="bg-green-600 hover:bg-green-700 text-white px-5 py-2 text-sm rounded"
          >
            Add Property
          </button>
        </div>
      </div>
    </div>
  );
}
