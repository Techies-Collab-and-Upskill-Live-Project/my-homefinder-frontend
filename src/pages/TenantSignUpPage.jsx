import React, { useState } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { useNavigate } from "react-router-dom";

const validationSchema = Yup.object({
  name: Yup.string().required("Name is required"),
  phone: Yup.string().required("Phone number is required"),
  email: Yup.string()
    .email("Invalid email format")
    .required("Email is required"),
  password: Yup.string()
    .required("Password is required")
    .min(6, "Password must be at least 6 characters"),
});

export default function TenantSignUpPage() {
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    email: "",
    password: "",
  });

  const [errors, setErrors] = useState({});
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const validate = () => {
    const newErrors = {};
    if (!formData.name) newErrors.name = "Name is required";
    if (!formData.phone) newErrors.phone = "Phone number is required";
    if (!formData.email) newErrors.email = "Email is required";
    if (!formData.password) newErrors.password = "Password is required";
    else if (formData.password.length < 6)
      newErrors.password = "Password must be at least 6 characters";
    return newErrors;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const validationErrors = validate();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }
    console.log("Form submitted:", formData);
  };

  return (
    <div className="relative min-h-screen flex items-center justify-center bg-gray-100 px-4 mx-4">
      {/* Decorative Circles */}
      <div className="absolute w-[250px] h-[250px] bg-green-500 rounded-full top-[-100px] right-[-100px] z-0" />
      <div className="absolute w-[250px] h-[250px] bg-green-500 rounded-full bottom-[-100px] left-[-100px] z-0" />

      {/* Logo */}
      <img
        src="/Images/Logo.png"
        alt="Logo"
        className="absolute top-4 left-4 h-20 z-10"
      />

      {/* Form Card */}
      <div className="relative z-10 w-full max-w-md bg-white p-6 md:p-8 rounded-3xl shadow-lg">
        <div className="flex justify-end">
          <button className="text-gray-400 hover:text-gray-600 text-xl">&times;</button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <h2 className="text-2xl font-semibold text-center">Hello! Sign up to find a perfect home!!</h2>

          {/* Name */}
          <div>
            <label className="block mb-1 text-gray-700">
              <i className="bi bi-person mr-2 text-black" />
              Name
            </label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              className={`w-full h-12 px-4 border ${
                errors.name ? "border-red-500" : "border-gray-300"
              } rounded-md focus:outline-none focus:ring-2 focus:ring-green-400`}
            />
            {errors.name && <p className="text-red-500 text-sm">{errors.name}</p>}
          </div>

          {/* Phone */}
          <div>
            <label className="block mb-1 text-gray-700">
              <i className="bi bi-telephone mr-2 text-black" />
              Phone Number
            </label>
            <input
              type="tel"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              className={`w-full h-12 px-4 border ${
                errors.phone ? "border-red-500" : "border-gray-300"
              } rounded-md focus:outline-none focus:ring-2 focus:ring-green-400`}
            />
            {errors.phone && <p className="text-red-500 text-sm">{errors.phone}</p>}
          </div>

          {/* Email */}
          <div>
            <label className="block mb-1 text-gray-700">
              <i className="bi bi-envelope mr-2 text-black" />
              Email
            </label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className={`w-full h-12 px-4 border ${
                errors.email ? "border-red-500" : "border-gray-300"
              } rounded-md focus:outline-none focus:ring-2 focus:ring-green-400`}
            />
            {errors.email && <p className="text-red-500 text-sm">{errors.email}</p>}
          </div>

          {/* Password */}
          <div>
            <label className="block mb-1 text-gray-700">
              <i className="bi bi-lock mr-2 text-black" />
              Password
            </label>
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              className={`w-full h-12 px-4 border ${
                errors.password ? "border-red-500" : "border-gray-300"
              } rounded-md focus:outline-none focus:ring-2 focus:ring-green-400`}
            />
            {errors.password && <p className="text-red-500 text-sm">{errors.password}</p>}
          </div>

          {/* Submit */}
          <button
            type="submit"
            className="w-full h-12 bg-green-500 text-white rounded-md hover:bg-green-600 transition"
          >
            Sign Up
          </button>

          {/* Divider */}
          <div className="flex items-center my-4">
            <div className="flex-grow border-t border-green-400" />
            <span className="mx-3 text-sm text-gray-600">Or sign up with</span>
            <div className="flex-grow border-t border-green-400" />
          </div>

          {/* Social Icons */}
          <div className="flex justify-center gap-4 flex-wrap">
            {["Google", "Apple", "Facebook"].map((provider) => (
              <a
                key={provider}
                href="#"
                className="w-12 h-12 bg-gray-100 flex items-center justify-center rounded-full hover:bg-gray-200 transition"
              >
                <img src={`/Images/${provider} logo.png`} alt={provider} className="w-6" />
              </a>
            ))}
          </div>

          {/* Already have account */}
          <p className="text-center mt-4 text-sm text-gray-600">
            Already have an account?{" "}
            <button
              type="button"
              className="text-green-600 hover:underline"
              onClick={() => navigate("/TenantLogin")}
            >
              Login
            </button>
          </p>
        </form>
      </div>
    </div>
  );
}
