import React, { useState } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { useAuth } from "../contexts/AuthContext";

const validationSchema = Yup.object({
  email: Yup.string().email("Invalid email").required("Email is required"),
  password: Yup.string().required("Password is required"),
});

export default function HomePage() {
  const navigate = useNavigate();
  const [error, setError] = useState("");
  const { login } = useAuth();

  const handleSubmit = async (values, { setSubmitting }) => {
    setError("");
    try {
      const { data } = await axios.post(
        `${import.meta.env.VITE_API_URL}/auth/login`,
        values
      );
      console.log("Login success:", data);

      // Store authentication data securely
      const success = login(data.user || data, data.token || data.accessToken);

      if (success) {
        handleLoginSuccess(data.user || data);
      } else {
        setError("Failed to store authentication data");
      }
    } catch (err) {
      setError(err.response?.data?.message || "Login failed");
    } finally {
      setSubmitting(false);
    }
  };

  const handleLoginSuccess = (userData) => {
    // Navigate based on user role
    const userRole = userData.role;

    if (userRole === "renter") {
      navigate("/tenantlisting");
    } else if (userRole === "landlord") {
      navigate("/landlordListing");
    } else {
      // Fallback
      navigate("/");
    }
  };

  return (
    <div className="relative overflow-hidden min-h-screen flex items-center justify-center bg-gray-100 px-4">
      <div className="absolute w-[250px] h-[250px] bg-green-500 rounded-full top-[-100px] right-[-100px]" />
      <div className="absolute w-[250px] h-[250px] bg-green-500 rounded-full bottom-[-100px] left-[-100px]" />
      <img
        src="/Images/Logo.png"
        alt="Logo"
        className="absolute top-4 left-4 h-20"
      />

      <div className="relative z-10 w-full max-w-md bg-white p-8 rounded-3xl shadow-lg mt-[100px]">
        <Formik
          initialValues={{ email: "", password: "" }}
          validationSchema={validationSchema}
          onSubmit={handleSubmit}
        >
          {({ isSubmitting }) => (
            <Form className="space-y-4">
              <h2 className="text-2xl font-semibold text-center">
                Welcome to MyHomeFinder
              </h2>
              <p className="text-center text-gray-600">
                Sign in to access your dashboard
              </p>

              <div>
                <label className="block mb-1 text-gray-700">Email</label>
                <Field
                  type="email"
                  name="email"
                  className="w-full h-12 px-4 border rounded-md focus:ring-green-400"
                />
                <ErrorMessage
                  name="email"
                  component="div"
                  className="text-red-500 text-sm mt-1"
                />
              </div>

              <div>
                <label className="block mb-1 text-gray-700">Password</label>
                <Field
                  type="password"
                  name="password"
                  className="w-full h-12 px-4 border rounded-md focus:ring-green-400"
                />
                <ErrorMessage
                  name="password"
                  component="div"
                  className="text-red-500 text-sm mt-1"
                />
              </div>

              {error && (
                <div className="text-red-500 text-sm text-center">{error}</div>
              )}

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full h-12 bg-green-500 text-white rounded-md hover:bg-green-600 transition"
              >
                {isSubmitting ? "Logging in..." : "Login"}
              </button>

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
              <Link
                className="text-center hover:underline"
                to="/forgotPassword"
              >
                <p>Forgot Password?</p>
              </Link>
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
}
