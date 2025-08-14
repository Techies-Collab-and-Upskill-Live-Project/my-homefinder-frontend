import React, { useState } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { EyeClosedIcon, EyeIcon } from "@phosphor-icons/react";

const validationSchema = Yup.object({
  token: Yup.string()
    .matches(/^\d{6}$/, "OTP must be a 6-digit number")
    .required("OTP is required"),
  newPassword: Yup.string()
    .min(8, "Password must be at least 8 characters")
    .matches(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d!@#$%^&*]+$/,
      "Password must include uppercase, lowercase, number, and special character"
    )
    .required("Password is required"),
  passwordRepeat: Yup.string()
    .oneOf([Yup.ref("newPassword")], "Passwords must match")
    .required("Please confirm your password"),
});

export default function ResetPasswordPage() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showRepeat, setShowRepeat] = useState(false);

  const handleSubmit = async ({ token, newPassword }, { setSubmitting }) => {
    setLoading(true);
    try {
      const { data } = await axios.post(
        `${import.meta.env.VITE_API_URL}/auth/reset-password`,
        { token, newPassword }
      );

      toast.success(data.message || "Password reset successfully.");
      setTimeout(() => navigate("/"), 2000);
    } catch (err) {
      toast.error(err.response?.data?.message || "Failed to reset password");
    } finally {
      setLoading(false);
      setSubmitting(false);
    }
  };

  return (
    <div className="relative overflow-hidden min-h-screen flex items-center justify-center bg-gray-100 px-4">
      <ToastContainer />
      <div className="absolute w-[250px] h-[250px] bg-green-500 rounded-full top-[-100px] right-[-100px]" />
      <div className="absolute w-[250px] h-[250px] bg-green-500 rounded-full bottom-[-100px] left-[-100px]" />

      <div className="relative z-10 w-full max-w-md bg-white p-8 rounded-3xl shadow-lg">
        <h2 className="text-2xl font-semibold text-center">Reset Password</h2>

        <Formik
          initialValues={{ token: "", newPassword: "", passwordRepeat: "" }}
          validationSchema={validationSchema}
          onSubmit={handleSubmit}
        >
          {({ isSubmitting }) => (
            <Form className="space-y-4">
              <div>
                <label className="block mb-1 text-gray-700">OTP</label>
                <Field
                  type="number"
                  name="token"
                  className="w-full h-12 px-4 border rounded-md focus:ring-green-400"
                />
                <ErrorMessage
                  name="token"
                  component="div"
                  className="text-red-500 text-sm mt-1"
                />
              </div>

              {/* New Password */}
              <div>
                <label className="block mb-1 text-gray-700">New Password</label>
                <div className="relative">
                  <Field
                    type={showPassword ? "text" : "password"}
                    name="newPassword"
                    className="w-full h-12 px-4 pr-12 border rounded-md focus:ring-green-400"
                  />
                  <span
                    className="absolute inset-y-0 right-4 flex items-center cursor-pointer text-gray-500"
                    onClick={() => setShowPassword((prev) => !prev)}
                  >
                    {showPassword ? <EyeClosedIcon /> : <EyeIcon />}
                  </span>
                </div>
                <ErrorMessage
                  name="newPassword"
                  component="div"
                  className="text-red-500 text-sm mt-1"
                />
              </div>

              {/* Repeat Password */}
              <div>
                <label className="block mb-1 text-gray-700">
                  Confirm Password
                </label>
                <div className="relative">
                  <Field
                    type={showRepeat ? "text" : "password"}
                    name="passwordRepeat"
                    className="w-full h-12 px-4 pr-12 border rounded-md focus:ring-green-400"
                  />
                  <span
                    className="absolute inset-y-0 right-4 flex items-center cursor-pointer text-gray-500"
                    onClick={() => setShowRepeat((prev) => !prev)}
                  >
                    {showRepeat ? <EyeClosedIcon /> : <EyeIcon />}
                  </span>
                </div>
                <ErrorMessage
                  name="passwordRepeat"
                  component="div"
                  className="text-red-500 text-sm mt-1"
                />
              </div>

              <button
                type="submit"
                disabled={isSubmitting || loading}
                className="w-full h-12 bg-green-500 text-white rounded-md hover:bg-green-600 transition"
              >
                {loading ? "Resetting..." : "Reset Password"}
              </button>
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
}
