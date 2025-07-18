import React, { useState } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { EyeIcon, EyeClosedIcon } from "@phosphor-icons/react";

const validationSchema = Yup.object({
  emailOrPhone: Yup.string().required("Email or phone is required"),
  password: Yup.string().required("Password is required"),
});

export default function HomePage() {
  const navigate = useNavigate();
  const [error, setError] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const API_URL = import.meta.env.VITE_API_URL;
  const handleSubmit = async (values, { setSubmitting }) => {
    setError("");
    try {
      const { data } = await axios.post(
        `${API_URL}/auth/login`,
        values
      );
      console.log("Login success:", data.user);

      // Save to localStorage
      const user = localStorage.setItem("user", JSON.stringify(data));

      const userRole = data.user.role.name;
      if (userRole === "RENTER") {
        navigate("/tenantlisting");
        window.location.reload();
      } else if (userRole === "LANDLORD") {
        navigate("/landlordListing");
        window.location.reload();
      } else {
        navigate("/");
      }
    } catch (err) {
      setError(err.response?.data?.message || "Login failed");
    } finally {
      setSubmitting(false);
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
          initialValues={{ emailOrPhone: "", password: "" }}
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
                <label className="block mb-1 text-gray-700">
                  Email or Phone
                </label>
                <Field
                  type="text"
                  name="emailOrPhone"
                  className="w-full h-12 px-4 border rounded-md focus:ring-green-400"
                />
                <ErrorMessage
                  name="emailOrPhone"
                  component="div"
                  className="text-red-500 text-sm mt-1"
                />
              </div>

              <div className="relative">
                <label className="block mb-1 text-gray-700">Password</label>
                <Field
                  type={showPassword ? "text" : "password"}
                  name="password"
                  className="w-full h-12 px-4 border rounded-md focus:ring-green-400 pr-10"
                />
                <span
                  className="absolute top-10 right-3 text-gray-500 cursor-pointer"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? (
                    <EyeClosedIcon size={20} />
                  ) : (
                    <EyeIcon size={20} />
                  )}
                </span>
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
                className="text-center hover:underline block text-sm text-gray-600"
                to="/forgotPassword"
              >
                Forgot Password?
              </Link>
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
}
