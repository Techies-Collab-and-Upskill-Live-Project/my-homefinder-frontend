import React, { useState } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";

const validationSchema = Yup.object({
  password: Yup.string().min(6, "Password must be at least 6 characters").required("Password is required"),
  passwordRepeat: Yup.string()
    .oneOf([Yup.ref("password")], "Passwords must match")
    .required("Please confirm your password"),
});

export default function ResetPasswordPage() {
  const navigate = useNavigate();
  const { token } = useParams();
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (values, { setSubmitting }) => {
    setError("");
    setMessage("");
    setLoading(true);

    try {
      const { data } = await axios.post(`${import.meta.env.VITE_API_URL}/auth/reset-password/${token}`, values);
      setMessage(data.message || "Password reset successfully.");
      setTimeout(() => navigate("/"), 2000);
    } catch (err) {
      setError(err.response?.data?.message || "Failed to reset password");
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
        <h2 className="text-2xl font-semibold text-center">Reset Password</h2>

        <Formik initialValues={{ password: "", passwordRepeat: "" }} validationSchema={validationSchema} onSubmit={handleSubmit}>
          {({ isSubmitting }) => (
            <Form className="space-y-4">
              <div>
                <label className="block mb-1 text-gray-700">New Password</label>
                <Field
                  type="password"
                  name="password"
                  className="w-full h-12 px-4 border rounded-md focus:ring-green-400"
                />
                <ErrorMessage name="password" component="div" className="text-red-500 text-sm mt-1" />
              </div>

              <div>
                <label className="block mb-1 text-gray-700">Confirm Password</label>
                <Field
                  type="password"
                  name="passwordRepeat"
                  className="w-full h-12 px-4 border rounded-md focus:ring-green-400"
                />
                <ErrorMessage name="passwordRepeat" component="div" className="text-red-500 text-sm mt-1" />
              </div>

              {error && <div className="text-red-500 text-sm text-center">{error}</div>}
              {message && <div className="text-green-600 text-sm text-center">{message}</div>}

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
