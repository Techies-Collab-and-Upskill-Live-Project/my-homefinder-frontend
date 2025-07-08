import React, { useState } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useAuth } from "../contexts/AuthContext";

const validationSchema = Yup.object({
  fullName: Yup.string().required("Full name is required"),
  email: Yup.string()
    .email("Invalid email format")
    .required("Email is required"),
  phone: Yup.string().required("Phone number is required"),
  password: Yup.string()
    .min(6, "Minimum 6 characters")
    .required("Password is required"),
  passwordRepeat: Yup.string()
    .oneOf([Yup.ref("password")], "Passwords must match")
    .required("Please confirm your password"),
  role: Yup.string()
    .oneOf(["tenant", "landlord"], "Select a valid role")
    .required("Role is required"),
});

export default function TenantSignUpPage() {
  const navigate = useNavigate();
  const [error, setError] = useState("");
  const { login } = useAuth();

  const handleSubmit = async (values, { setSubmitting }) => {
    setError("");
    try {
      const { data } = await axios.post(
        `${import.meta.env.VITE_API_URL}/auth/signup`,
        values
      );
      console.log("Signup success:", data);
      
      // Store authentication data securely
      const success = login(data.user || data, data.token || data.accessToken);
      
      if (success) {
        // Redirect based on user role
        const userRole = values.role;
        if (userRole === "tenant") {
          navigate("/tenantprofile");
        } else if (userRole === "landlord") {
          navigate("/landlordprofileb4listing");
        } else {
          // Fallback to dashboard if role is not specified
          navigate("/dashboard");
        }
      } else {
        setError("Failed to store authentication data");
      }
    } catch (err) {
      setError(err.response?.data?.message || "Signup failed");
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
        className="absolute top-4 left-4 h-20 z-10"
      />

      <div className="relative z-10 w-full max-w-md bg-white p-8 rounded-3xl shadow-lg mt-[100px] mb-[100px]">
        <Formik
          initialValues={{
            fullName: "",
            email: "",
            phone: "",
            password: "",
            passwordRepeat: "",
            role: "",
          }}
          validationSchema={validationSchema}
          onSubmit={handleSubmit}
        >
          {({ isSubmitting }) => (
            <Form className="space-y-4">
              <h2 className="text-2xl font-semibold text-center">
                Create Your MyHomeFinder Account
              </h2>

              {/* Full Name */}
              <div>
                <label className="block mb-1 text-gray-700">Full Name</label>
                <Field
                  name="fullName"
                  className="w-full h-12 px-4 border rounded-md focus:ring-green-400"
                />
                <ErrorMessage
                  name="fullName"
                  component="div"
                  className="text-red-500 text-sm mt-1"
                />
              </div>

              {/* Email */}
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

              {/* Phone */}
              <div>
                <label className="block mb-1 text-gray-700">Phone Number</label>
                <Field
                  name="phone"
                  type="tel"
                  className="w-full h-12 px-4 border rounded-md focus:ring-green-400"
                />
                <ErrorMessage
                  name="phone"
                  component="div"
                  className="text-red-500 text-sm mt-1"
                />
              </div>

              {/* Password */}
              <div>
                <label className="block mb-1 text-gray-700">Password</label>
                <Field
                  name="password"
                  type="password"
                  className="w-full h-12 px-4 border rounded-md focus:ring-green-400"
                />
                <ErrorMessage
                  name="password"
                  component="div"
                  className="text-red-500 text-sm mt-1"
                />
              </div>

              {/* Confirm Password */}
              <div>
                <label className="block mb-1 text-gray-700">
                  Confirm Password
                </label>
                <Field
                  name="passwordRepeat"
                  type="password"
                  className="w-full h-12 px-4 border rounded-md focus:ring-green-400"
                />
                <ErrorMessage
                  name="passwordRepeat"
                  component="div"
                  className="text-red-500 text-sm mt-1"
                />
              </div>

              {/* Role */}
              <div>
                <label className="block mb-1 text-gray-700">Role</label>
                <Field
                  name="role"
                  as="select"
                  className="w-full h-12 px-4 border rounded-md focus:ring-green-400"
                >
                  <option value="">Select role</option>
                  <option value="tenant">Tenant</option>
                  <option value="landlord">Landlord</option>
                </Field>
                <ErrorMessage
                  name="role"
                  component="div"
                  className="text-red-500 text-sm mt-1"
                />
              </div>

              {/* Error Display */}
              {error && (
                <div className="text-red-500 text-sm text-center">{error}</div>
              )}

              {/* Submit */}
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full h-12 bg-green-500 text-white rounded-md hover:bg-green-600 transition"
              >
                {isSubmitting ? "Signing Up..." : "Sign Up"}
              </button>

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
