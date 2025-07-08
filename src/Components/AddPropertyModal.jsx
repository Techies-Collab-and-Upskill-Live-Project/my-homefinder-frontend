import React, { useState } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";

const propertyTags = ["Furnished", "Pool", "Garage", "Pet Friendly", "Wi-Fi"];

const AddPropertyModal = ({ onClose, onSave }) => {
  const [imagePreviews, setImagePreviews] = useState([]);

  const validationSchema = Yup.object({
    address: Yup.string()
      .min(5, "Address is too short")
      .required("Address is required"),
    description: Yup.string()
      .min(10, "Description is too short")
      .required("Description is required"),
    price: Yup.number()
      .positive("Enter a valid price")
      .required("Price is required"),
    tags: Yup.array().of(Yup.string()).min(1, "Select at least one tag"),
    images: Yup.mixed().test(
      "fileRequired",
      "Please upload at least one image",
      (value) => value && value.length > 0
    ),
  });

  const handleImageChange = (e, setFieldValue) => {
    const files = Array.from(e.target.files);
    setFieldValue("images", files);

    const previews = files.map((file) => URL.createObjectURL(file));
    setImagePreviews(previews);
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center z-[9999] bg-black/50">
      <div className="bg-white p-8 rounded-xl w-full max-w-2xl space-y-6 overflow-y-auto max-h-[90vh] shadow-lg">
        <h3 className="text-xl font-bold text-gray-800">Add New Property</h3>

        <Formik
          initialValues={{
            address: "",
            description: "",
            price: "",
            tags: [],
            images: [],
          }}
          validationSchema={validationSchema}
          onSubmit={(values, { resetForm }) => {
            const newProperty = { ...values, images: imagePreviews };
            onSave((prev) => [...prev, newProperty]);
            resetForm();
            setImagePreviews([]);
            onClose();
          }}
        >
          {({ setFieldValue }) => (
            <Form className="space-y-5">
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Address
                </label>
                <Field
                  name="address"
                  placeholder="Enter property address"
                  className="w-full border border-gray-300 rounded-md p-3 mt-1 focus:outline-none focus:ring-2 focus:ring-green-500"
                />
                <ErrorMessage
                  name="address"
                  component="div"
                  className="text-red-500 text-sm mt-1"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Description
                </label>
                <Field
                  as="textarea"
                  name="description"
                  placeholder="Property description"
                  rows={4}
                  className="w-full border border-gray-300 rounded-md p-3 mt-1 focus:outline-none focus:ring-2 focus:ring-green-500"
                />
                <ErrorMessage
                  name="description"
                  component="div"
                  className="text-red-500 text-sm mt-1"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Price ($)
                </label>
                <Field
                  name="price"
                  type="number"
                  placeholder="Enter price"
                  className="w-full border border-gray-300 rounded-md p-3 mt-1 focus:outline-none focus:ring-2 focus:ring-green-500"
                />
                <ErrorMessage
                  name="price"
                  component="div"
                  className="text-red-500 text-sm mt-1"
                />
              </div>

              <Field name="tags">
                {({ field, form }) => {
                  const selectedTags = field.value;

                  const toggleTag = (tag) => {
                    const updatedTags = selectedTags.includes(tag)
                      ? selectedTags.filter((t) => t !== tag)
                      : [...selectedTags, tag];
                    form.setFieldValue("tags", updatedTags);
                  };

                  return (
                    <>
                      <p className="block text-sm font-medium text-gray-700 mb-2">
                        Features:
                      </p>
                      <div className="flex flex-wrap gap-3">
                        {propertyTags.map((tag) => (
                          <div
                            key={tag}
                            onClick={() => toggleTag(tag)}
                            className={`px-4 py-1 rounded-full border text-sm cursor-pointer transition-all
                ${
                  selectedTags.includes(tag)
                    ? "bg-green-600 text-white border-green-600"
                    : "bg-white text-gray-700 border-gray-300 hover:bg-gray-100"
                }`}
                          >
                            {tag}
                          </div>
                        ))}
                      </div>
                    </>
                  );
                }}
              </Field>
              <ErrorMessage
                name="tags"
                component="div"
                className="text-red-500 text-sm mt-1"
              />

              <div>
                <p className="block text-sm font-medium text-gray-700 mb-2">
                  Upload Images
                </p>
                <input
                  type="file"
                  accept="image/*"
                  multiple
                  onChange={(e) => handleImageChange(e, setFieldValue)}
                  className="block border border-gray-300 rounded-md p-2"
                />
                <ErrorMessage
                  name="images"
                  component="div"
                  className="text-red-500 text-sm mt-1"
                />
                <div className="flex gap-2 mt-3 flex-wrap">
                  {imagePreviews.map((src, i) => (
                    <img
                      key={i}
                      src={src}
                      alt={`Preview ${i}`}
                      className="w-20 h-20 object-cover rounded-md border"
                    />
                  ))}
                </div>
              </div>

              <div className="flex justify-end gap-3">
                <button
                  type="button"
                  onClick={() => {
                    setImagePreviews([]);
                    onClose();
                  }}
                  className="px-4 py-2 bg-gray-200 hover:bg-gray-300 rounded-md"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-green-600 hover:bg-green-700 text-white rounded-md"
                >
                  Save
                </button>
              </div>
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
};

export default AddPropertyModal;
