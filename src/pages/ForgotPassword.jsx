import React, { useState } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const validationSchema = Yup.object({
  email: Yup.string()
    .email("Invalid email format")
    .required("Email is required"),
});

export default function ForgotPasswordPage() {
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (values, { setSubmitting }) => {
    setMessage("");
    setError("");
    setLoading(true);

    try {
      const { data } = await axios.post(
        `${import.meta.env.VITE_API_URL}/auth/forgot-password`,
        values
      );
      setMessage(data.message || "Password reset link sent to your email.");
      setTimeout(() => {
        setMessage(null);
      }, 3000);
      navigate("/resetPassword");
    } catch (err) {
      setError(err.response?.data?.message || "Failed to send reset email");
    } finally {
      setLoading(false);
      setSubmitting(false);
    }
  };

  return (
    <div className="relative overflow-hidden min-h-screen flex items-center justify-center bg-gray-100 px-4">
      <div className="absolute w-[250px] h-[250px] bg-green-500 rounded-full top-[-100px] right-[-100px]" />
      <div className="absolute w-[250px] h-[250px] bg-green-500 rounded-full bottom-[-100px] left-[-100px]" />

      <div className="relative z-10 w-full max-w-md bg-white p-8 rounded-3xl shadow-lg">
        <h2 className="text-2xl font-semibold text-center">Forgot Password</h2>
        <p className="text-center text-gray-600">
          Enter your email to receive a reset link
        </p>

        <Formik
          initialValues={{ email: "" }}
          validationSchema={validationSchema}
          onSubmit={handleSubmit}
        >
          {({ isSubmitting }) => (
            <Form className="space-y-4">
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

              {error && (
                <div className="text-red-500 text-sm text-center">{error}</div>
              )}
              {message && (
                <div className="text-green-600 text-sm text-center">
                  {message}
                </div>
              )}

              <button
                type="submit"
                disabled={isSubmitting || loading}
                className="w-full h-12 bg-green-500 text-white rounded-md hover:bg-green-600 transition"
              >
                {loading ? "Sending..." : "Send Reset Link"}
              </button>
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
}
