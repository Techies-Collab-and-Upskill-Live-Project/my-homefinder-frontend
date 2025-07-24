import { image } from "framer-motion/client";
import React, { useState, useEffect } from "react";
import axios from "axios";

export default function AllProperties () {
  const [uploads, setUploads] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [editingItem, setEditingItem] = useState(null);
  const [formData, setFormData] = useState({});
  const [newImages, setNewImages] = useState([]);
  const [updating, setUpdating] = useState(false);
  const [deletingId, setDeletingId] = useState(null);

  const apiUrl = import.meta.env.VITE_API_URL;

  const fetchUploads = async () => {
    setLoading(true);
    setError("");
    try {
      const res = await axios.get(`${apiUrl}/uploads`);
      setUploads(Array.isArray(res.data) ? res.data : []);
    } catch (err) {
      setError("Failed to fetch uploads.");
    } finally {
      setLoading(false);
    }
  };

  const deleteUpload = async (id) => {
    if (deletingId) return;
    setDeletingId(id);
    try {
      await axios.delete(`${apiUrl}/uploads/${id}`);
      setUploads((prev) => prev.filter((u) => u._id !== id));
    } catch (err) {
      alert("Failed to delete upload.");
    } finally {
      setDeletingId(null);
    }
  };

  const openEdit = (upload) => {
    setEditingItem(upload);
    setFormData(upload);
    setNewImages([]);
  };

  const closeEdit = () => {
    setEditingItem(null);
    setFormData({});
    setNewImages([]);
    setError("");
  };

  const handleImageRemove = (index) => {
    const updatedImages = [...(formData.images || [])];
    updatedImages.splice(index, 1);
    setFormData((prev) => ({ ...prev, images: updatedImages }));
  };

  const handleNewImages = (e) => {
    const files = e.target.files;
    if (!files) return;
    const fileArray = Array.from(files);
    setNewImages((prev) => [...prev, ...fileArray]);
  };

  const handleUpdate = async () => {
    if (!editingItem) return;

    setUpdating(true);
    const data = new FormData();

    (formData.images || []).forEach((url) => {
      data.append("existingImages", url);
    });

    newImages.forEach((file) => {
      data.append("newImages", file);
    });

    data.append("title", formData.title || "");
    data.append("description", formData.description || "");
    data.append("category", formData.category || "");
    data.append("problem", formData.problem || "");
    data.append("solution", formData.solution || "");
    data.append("tags", JSON.stringify(formData.tags || []));

    try {
      const res = await axios.put(
        `${apiUrl}/uploads/${editingItem._id}`,
        data,
        {
          headers: { "Content-Type": "multipart/form-data" },
        }
      );

      setUploads((prev) =>
        prev.map((u) => (u._id === editingItem._id ? res.data.updated : u))
      );
      closeEdit();
    } catch (err) {
      console.error(err);
      if (err?.response?.status === 413) {
        setError("One or more files are too large. Max size is 5MB per file.");
      } else if (err?.response?.data?.message) {
        setError(err.response.data.message);
      } else {
        setError("Failed to update upload. Please try again.");
      }
    } finally {
      setUpdating(false);
    }
  };

  useEffect(() => {
    fetchUploads();
  }, []);

  return (
    <div className="mt-12 w-full max-w-6xl">
      <h2 className="text-2xl font-bold text-gray-700 mb-4">🏠 Your Listed Properties</h2>
      <div className="grid gap-6">
        {error && <p className="text-red-500">{error}</p>}
        {loading ? (
          <p className="text-gray-500 text-sm">Getting uploaded files...</p>
        ) : uploads.length === 0 ? (
          <p className="text-gray-500 text-sm">No uploads yet.</p>
        ) : (
          uploads.map((upload) => (
            <div key={upload._id} className="bg-white rounded-xl shadow-md p-6">
              <div className="flex justify-between items-start">
                <div>
                  <h3 className="text-lg font-bold">{upload.title}</h3>
                  <p className="text-sm text-gray-600 mb-1">
                    {upload.description}
                  </p>
                  <p className="text-sm text-gray-500">
                    <strong>Category:</strong> {upload.category}
                  </p>
                  <p className="text-sm text-gray-500">
                    <strong>Tags:</strong> {upload.tags.join(", ")}
                  </p>
                  <p className="text-sm mt-2">
                    <strong>Problem:</strong> {upload.problem}
                  </p>
                  <p className="text-sm">
                    <strong>Solution:</strong> {upload.solution}
                  </p>
                  <p className="text-xs text-gray-400 mt-2">
                    Created: {new Date(upload.createdAt).toLocaleString()}
                  </p>
                </div>

                <div className="space-x-2">
                  <button
                    onClick={() => openEdit(upload)}
                    className="px-3 py-1 text-sm text-white bg-blue-500 rounded hover:bg-blue-600"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => deleteUpload(upload._id)}
                    className={`px-3 py-1 text-sm text-white rounded ${
                      deletingId === upload._id
                        ? "bg-red-300 cursor-not-allowed"
                        : "bg-red-500 hover:bg-red-600"
                    }`}
                    disabled={deletingId === upload._id}
                  >
                    {deletingId === upload._id ? "Deleting..." : "Delete"}
                  </button>
                </div>
              </div>

              <div className="flex flex-wrap gap-2 mt-4">
                {upload.images.map((img, i) => (
                  <img
                    key={i}
                    src={img}
                    alt={`${upload.title}-${i}`}
                    className="w-24 h-24 object-cover rounded-lg border"
                  />
                ))}
              </div>
            </div>
          ))
        )}
      </div>

      {/* Edit Popup */}
      {editingItem && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl p-6 w-full max-w-xl overflow-y-auto max-h-[90vh]">
            <h3 className="text-xl font-bold mb-4">Edit Upload</h3>

            <div className="grid gap-4">
              <input
                className="input-field"
                placeholder="Title"
                value={formData.title || ""}
                onChange={(e) =>
                  setFormData((prev) => ({ ...prev, title: e.target.value }))
                }
              />
              <textarea
                className="input-field"
                placeholder="Description"
                rows={3}
                value={formData.description || ""}
                onChange={(e) =>
                  setFormData((prev) => ({
                    ...prev,
                    description: e.target.value,
                  }))
                }
              />
              <input
                className="input-field"
                placeholder="Category"
                value={formData.category || ""}
                onChange={(e) =>
                  setFormData((prev) => ({ ...prev, category: e.target.value }))
                }
              />
              <input
                className="input-field"
                placeholder="Tags (comma-separated)"
                value={(formData.tags || []).join(", ")}
                onChange={(e) =>
                  setFormData((prev) => ({
                    ...prev,
                    tags: e.target.value.split(",").map((t) => t.trim()),
                  }))
                }
              />
              <textarea
                className="input-field"
                placeholder="Problem"
                rows={3}
                value={formData.problem || ""}
                onChange={(e) =>
                  setFormData((prev) => ({ ...prev, problem: e.target.value }))
                }
              />
              <textarea
                className="input-field"
                placeholder="Solution"
                rows={3}
                value={formData.solution || ""}
                onChange={(e) =>
                  setFormData((prev) => ({ ...prev, solution: e.target.value }))
                }
              />

              {/* Existing Images */}
              <div>
                <p className="text-sm font-semibold mb-2">Current Images:</p>
                <div className="flex gap-2 flex-wrap">
                  {(formData.images || []).map((img, index) => (
                    <div key={index} className="relative">
                      <img
                        src={img}
                        alt="Existing"
                        className="w-20 h-20 object-cover rounded border"
                      />
                      <button
                        onClick={() => handleImageRemove(index)}
                        className="absolute top-0 right-0 bg-red-600 text-white text-xs px-1 rounded-bl"
                      >
                        ×
                      </button>
                    </div>
                  ))}
                </div>
              </div>

              {/* New Images */}
              <div>
                <p className="text-sm font-semibold mb-2">Add New Images:</p>
                <input
                  type="file"
                  multiple
                  accept="image/*"
                  onChange={handleNewImages}
                />
                <div className="flex gap-2 mt-2 flex-wrap">
                  {newImages.map((file, idx) => (
                    <img
                      key={idx}
                      src={URL.createObjectURL(file)}
                      alt="new"
                      className="w-20 h-20 object-cover rounded border"
                    />
                  ))}
                </div>
              </div>
            </div>

            <div className="flex justify-end gap-2 mt-6">
              <button
                onClick={closeEdit}
                className="px-4 py-2 bg-gray-300 rounded hover:bg-gray-400 text-sm"
              >
                Cancel
              </button>
              <button
                onClick={handleUpdate}
                disabled={updating}
                className={`px-4 py-2 rounded text-sm text-white ${
                  updating
                    ? "bg-indigo-300 cursor-not-allowed"
                    : "bg-indigo-500 hover:bg-indigo-600"
                }`}
              >
                {updating ? "Saving..." : "Save Changes"}
              </button>
            </div>
            {error && (
              <p className="text-sm text-red-600 bg-red-50 p-2 rounded">
                {error}
              </p>
            )}
          </div>
        </div>
      )}
    </div>
  );
};
