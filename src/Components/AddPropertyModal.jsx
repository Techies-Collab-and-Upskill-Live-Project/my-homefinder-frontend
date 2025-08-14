import React, { useState } from "react";

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
  });

  const [images, setImages] = useState([]);
  const [dragOver, setDragOver] = useState(false);

  const handleImageChange = (e) => {
    const files = Array.from(e.target.files);
    setImages((prev) => [...prev, ...files]);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setDragOver(false);
    const files = Array.from(e.dataTransfer.files);
    const imageFiles = files.filter((file) => file.type.startsWith("image/"));
    setImages((prev) => [...prev, ...imageFiles]);
  };

  const handleImageDelete = (indexToDelete) => {
    setImages((prev) => prev.filter((_, index) => index !== indexToDelete));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const data = new FormData();

    Object.entries(formData).forEach(([key, value]) => {
      data.append(key, key === "price" ? Number(value) : value);
    });

    images.forEach((imageFile) => {
      data.append("images", imageFile);
    });

    onSave(data);
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-[99999] px-4">
      <div className="bg-white rounded-xl p-6 w-full max-w-2xl max-h-[95vh] overflow-y-auto">
        <h2 className="text-2xl font-bold mb-6 text-center">
          Add New Property
        </h2>

        {/* Image Upload Section */}
        <div
          className={`border-2 border-dashed rounded-lg p-6 mb-5 text-center transition-all ${
            dragOver ? "border-green-500 bg-green-50" : "border-gray-300"
          }`}
          onDragOver={(e) => {
            e.preventDefault();
            setDragOver(true);
          }}
          onDragLeave={() => setDragOver(false)}
          onDrop={handleDrop}
        >
          <input
            type="file"
            multiple
            accept="image/*"
            onChange={handleImageChange}
            className="hidden"
            id="fileUpload"
          />
          <label htmlFor="fileUpload" className="cursor-pointer text-gray-600">
            <p className="mb-2">
              <strong>Click to upload</strong> or drag & drop property images
              here
            </p>
            <p className="text-sm text-gray-400">
              PNG, JPG, JPEG (multiple allowed)
            </p>
          </label>
        </div>

        {/* Image Previews */}
        {images.length > 0 && (
          <div className="grid grid-cols-3 gap-3 mb-5">
            {images.map((img, idx) => (
              <div key={idx} className="relative group">
                <img
                  src={URL.createObjectURL(img)}
                  alt={`preview-${idx}`}
                  className="w-full h-24 object-cover rounded"
                />
                <button
                  type="button"
                  onClick={() => handleImageDelete(idx)}
                  className="absolute top-1 right-1 bg-red-500 text-white rounded-full w-5 h-5 text-xs flex items-center justify-center opacity-80 hover:opacity-100"
                >
                  &times;
                </button>
              </div>
            ))}
          </div>
        )}

        {/* Property Form */}
        <form onSubmit={handleSubmit} className="grid grid-cols-2 gap-5">
          {[
            { label: "Title", name: "title" },
            { label: "Description", name: "description" },
            { label: "Price", name: "price", type: "number" },
            { label: "Address", name: "address" },
            { label: "City", name: "city" },
            { label: "State", name: "state" },
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

          {/* Type Select */}
          <div className="flex flex-col">
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Type
            </label>
            <select
              className="w-full border rounded-md px-3 py-2 text-sm focus:ring-green-400 focus:border-green-400"
              value={formData.type}
              onChange={(e) =>
                setFormData((prev) => ({ ...prev, type: e.target.value }))
              }
            >
              <option value="APARTMENT">Apartment</option>
              <option value="HOUSE">House</option>
              <option value="STUDIO">Studio</option>
              <option value="ROOM">Room</option>
              <option value="OFFICE">Office</option>
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
