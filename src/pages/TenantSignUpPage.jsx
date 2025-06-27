import React from "react";
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
  const navigate = useNavigate();

  const handleSubmit = (values) => {
    console.log("Form submitted:", values);
    // Handle form submission logic here (API call, etc.)
  };

  return (
    <div className="relative overflow-hidden min-h-screen flex items-center justify-center bg-gray-100 px-4">
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
      <div className="relative z-10 w-full mb-20 max-w-md bg-white p-6 md:p-8 rounded-3xl shadow-lg mt-[100px]">
        <Formik
          initialValues={{
            name: "",
            phone: "",
            email: "",
            password: "",
          }}
          validationSchema={validationSchema}
          onSubmit={handleSubmit}
        >
          {({ isSubmitting }) => (
            <Form className="space-y-4">
              <h2 className="text-2xl font-semibold text-center">
                Create Your MyHomeFinder Account
              </h2>
              <p className="text-center text-gray-600">
                Join to explore listings, save favorites, and manage your home
                search easily.
              </p>

              {/* Name */}
              <div>
                <label className="block mb-1 text-gray-700">
                  <i className="bi bi-person mr-2 text-black" />
                  Name
                </label>
                <Field
                  type="text"
                  name="name"
                  className="w-full h-12 px-4 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-400"
                />
                <ErrorMessage
                  name="name"
                  component="div"
                  className="text-red-500 text-sm mt-1"
                />
              </div>

              {/* Phone */}
              <div>
                <label className="block mb-1 text-gray-700">
                  <i className="bi bi-telephone mr-2 text-black" />
                  Phone Number
                </label>
                <Field
                  type="tel"
                  name="phone"
                  className="w-full h-12 px-4 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-400"
                />
                <ErrorMessage
                  name="phone"
                  component="div"
                  className="text-red-500 text-sm mt-1"
                />
              </div>

              {/* Email */}
              <div>
                <label className="block mb-1 text-gray-700">
                  <i className="bi bi-envelope mr-2 text-black" />
                  Email
                </label>
                <Field
                  type="email"
                  name="email"
                  className="w-full h-12 px-4 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-400"
                />
                <ErrorMessage
                  name="email"
                  component="div"
                  className="text-red-500 text-sm mt-1"
                />
              </div>

              {/* Password */}
              <div>
                <label className="block mb-1 text-gray-700">
                  <i className="bi bi-lock mr-2 text-black" />
                  Password
                </label>
                <Field
                  type="password"
                  name="password"
                  className="w-full h-12 px-4 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-400"
                />
                <ErrorMessage
                  name="password"
                  component="div"
                  className="text-red-500 text-sm mt-1"
                />
              </div>

              {/* Submit */}
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full h-12 bg-green-500 text-white rounded-md hover:bg-green-600 transition"
              >
                {isSubmitting ? "Signing Up..." : "Sign Up"}
              </button>

              {/* Divider */}
              <div className="flex items-center my-4">
                <div className="flex-grow border-t border-green-400" />
                <span className="mx-3 text-sm text-gray-600">
                  Or sign up with
                </span>
                <div className="flex-grow border-t border-green-400" />
              </div>

              {/* Social Icons */}
              <div className="flex justify-center gap-6">
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
                    key={item.alt}
                    href={item.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="bg-gray-100 rounded-full p-3 hover:bg-gray-200"
                  >
                    <img src={item.img} alt={item.alt} className="w-6 h-6" />
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
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
}
