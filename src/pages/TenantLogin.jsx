import React, { useState } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { useNavigate } from "react-router-dom";

const validationSchema = Yup.object({
  email: Yup.string()
    .email("Invalid email format")
    .required("Email is required"),
  password: Yup.string()
    .required("Password is required")
    .min(6, "Password must be at least 6 characters"),
});

export default function HomePage() {
  const [formData, setFormData] = useState({
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
    <div className="relative min-h-screen flex items-center justify-center bg-gray-100 px-4">
      {/* Decorative Circles */}
      <div className="absolute w-[250px] h-[250px] bg-green-500 rounded-full top-[-100px] right-[-100px] z-0" />
      <div className="absolute w-[250px] h-[250px] bg-green-500 rounded-full bottom-[-100px] left-[-100px] z-0" />

      {/* Logo */}
      <img
        src="/Images/Logo.png"
        alt="Logo"
        className="absolute top-4 left-4 h-20 z-10"
      />

      {/* Card */}
      <div className="relative z-10 w-full max-w-md bg-white p-6 md:p-8 rounded-3xl shadow-lg mt-[100px]">
        <div className="flex justify-end">
          <button className="text-gray-400 hover:text-gray-600 text-xl">&times;</button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <h2 className="text-2xl font-semibold text-center">Welcome Back!!</h2>
          <p className="text-center text-gray-600">Please log in to continue</p>

          {/* Email */}
          <div>
            <label className="block mb-1 text-gray-700">
              <i className="bi bi-envelope mr-2 text-black" />
              Email
            </label>
            <input
              type="email"
              name="email"
              className={`w-full h-12 px-4 border ${
                errors.email ? "border-red-500" : "border-gray-300"
              } rounded-md focus:outline-none focus:ring-2 focus:ring-green-400`}
              value={formData.email}
              onChange={handleChange}
            />
            {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email}</p>}
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
              className={`w-full h-12 px-4 border ${
                errors.password ? "border-red-500" : "border-gray-300"
              } rounded-md focus:outline-none focus:ring-2 focus:ring-green-400`}
              value={formData.password}
              onChange={handleChange}
            />
            {errors.password && <p className="text-red-500 text-sm mt-1">{errors.password}</p>}
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full h-12 bg-green-500 text-white rounded-md hover:bg-green-600 transition"
          >
            Login
          </button>

          {/* Socials */}
          <div className="flex justify-center gap-6 mt-6">
          {[
            {
              img: "/google.svg",
              alt: "Google",
              link: "https://accounts.google.com",
            },
            {
              img: "/apple.svg",
              alt: "Apple",
              link: "https://appleid.apple.com",
            },
            {
              img: "/fb.svg",
              alt: "Facebook",
              link: "https://facebook.com",
            },
          ].map((item) => (
            <a
              href={item.link}
              target="_blank"
              rel="noopener noreferrer"
              key={item.alt}
              className="bg-gray-100 rounded-full p-3 hover:bg-gray-200"
            >
              <img src={item.img} alt={item.alt} className="w-6 h-6" />
            </a>
          ))}
        </div>

          {/* Sign Up */}
          <p className="text-center mt-4 text-sm text-gray-600">
            Don’t have an account?{" "}
            <button
              type="button"
              className="text-green-600 hover:underline"
              onClick={() => navigate("/TenantSignUpPage")}
            >
              Sign Up
            </button>
          </p>
        </form>
      </div>
    </div>
  );
}

