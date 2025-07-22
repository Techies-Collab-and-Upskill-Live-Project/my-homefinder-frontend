import React, { useState } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { EyeIcon, EyeSlashIcon } from "@phosphor-icons/react";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const validationSchema = Yup.object({
  fullName: Yup.string().required("Full name is required"),
  email: Yup.string()
    .email("Invalid email format")
    .required("Email is required"),
  phone: Yup.string().required("Phone number is required"),
  password: Yup.string()
    .min(8, "Minimum 8 characters")
    .matches(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d!@#$%^&*]+$/,
      "Password must include uppercase, lowercase, number, and special character"
    )
    .required("Password is required"),
  passwordRepeat: Yup.string()
    .oneOf([Yup.ref("password")], "Passwords must match")
    .required("Please confirm your password"),
  role: Yup.string()
    .oneOf(["renter", "landlord"], "Select a valid role")
    .required("Role is required"),
});

export default function TenantSignUpPage() {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (values, { setSubmitting }) => {
    setError("");
    const { passwordRepeat, ...signupData } = values; // ⬅️ Exclude passwordRepeat
    try {
      const { data } = await axios.post(
        `${import.meta.env.VITE_API_URL}/auth/signup`,
        signupData // ⬅️ Send only the rest
      );

      localStorage.setItem("user", JSON.stringify(data));
      toast.success(
        "Signup successful! An OTP was sent to your email, please use it to verify your account",
        {
          position: "top-right",
        }
      );

      setTimeout(() => {
        navigate("/otpverification");
      }, 5000);
    } catch (err) {
      setError(err.response?.data?.message || "Signup failed");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="relative overflow-hidden min-h-screen flex items-center justify-center bg-gray-100 px-4">
      <ToastContainer />
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
              <h2 className="text-2xl font-semibold text-center text-gray-800">
                Create Your MyHomeFinder Account
              </h2>

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

              <div>
                <label className="block mb-1 text-gray-700">Password</label>
                <div className="relative">
                  <Field
                    name="password"
                    type={showPassword ? "text" : "password"}
                    className="w-full h-12 px-4 border rounded-md focus:ring-green-400 pr-10"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-3 text-gray-500"
                  >
                    {showPassword ? <EyeSlashIcon /> : <EyeIcon />}
                  </button>
                </div>
                <ErrorMessage
                  name="password"
                  component="div"
                  className="text-red-500 text-sm mt-1"
                />
              </div>

              <div>
                <label className="block mb-1 text-gray-700">
                  Confirm Password
                </label>
                <div className="relative">
                  <Field
                    name="passwordRepeat"
                    type={showConfirmPassword ? "text" : "password"}
                    className="w-full h-12 px-4 border rounded-md focus:ring-green-400 pr-10"
                  />
                  <button
                    type="button"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    className="absolute right-3 top-3 text-gray-500"
                  >
                    {showConfirmPassword ? <EyeSlashIcon /> : <EyeIcon />}
                  </button>
                </div>
                <ErrorMessage
                  name="passwordRepeat"
                  component="div"
                  className="text-red-500 text-sm mt-1"
                />
              </div>

              <div>
                <label className="block mb-1 text-gray-700">Role</label>
                <Field
                  name="role"
                  as="select"
                  className="w-full h-12 px-4 border rounded-md focus:ring-green-400"
                >
                  <option value="">Select role</option>
                  <option value="renter">Renter</option>
                  <option value="landlord">Landlord</option>
                </Field>
                <ErrorMessage
                  name="role"
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
                className="w-full h-12 bg-green-500 text-white rounded-md hover:bg-green-600 transition disabled:opacity-50"
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
