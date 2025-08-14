import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import axios from "axios";

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

const SignUpPage = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (values) => {
    setLoading(true);
    setError("");

    try {
      const { data } = await axios.post(
        `${import.meta.env.VITE_API_URL}/auth/register`,
        values
      );
      console.log("Registration successful:", data);

      // Save token or user info if needed
      // localStorage.setItem("token", data.token);

      navigate("/dashboard");
    } catch (err) {
      console.error(err);
      setError(err.response?.data?.message || "Registration failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen overflow-hidden items-center justify-center bg-gray-50 relative px-4">
      <div className="w-60 h-60 bg-green-600 rounded-full absolute -top-28 -right-28"></div>
      <div className="w-60 h-60 bg-green-600 rounded-full absolute -bottom-28 -left-28"></div>

      <img
        src="/Images/Logo.png"
        alt="Logo"
        className="absolute top-4 left-6 h-20"
      />

      <div className="bg-white rounded-3xl shadow-lg p-8 w-full mt-[100px] mb-[100px] max-w-md z-10">
        <h2 className="text-2xl font-bold text-center mb-2">
          Create an Account to List Your Property
        </h2>

        <Formik
          initialValues={{ name: "", phone: "", email: "", password: "" }}
          validationSchema={validationSchema}
          onSubmit={handleSubmit}
        >
          {() => (
            <Form className="space-y-4">
              <div>
                <label
                  className="block text-sm font-medium mb-1"
                  htmlFor="name"
                >
                  Name
                </label>
                <Field
                  name="name"
                  type="text"
                  placeholder="Enter your name"
                  className="w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-600"
                />
                <ErrorMessage
                  name="name"
                  component="div"
                  className="text-red-500 text-sm mt-1"
                />
              </div>

              <div>
                <label
                  className="block text-sm font-medium mb-1"
                  htmlFor="phone"
                >
                  Phone Number
                </label>
                <Field
                  name="phone"
                  type="tel"
                  placeholder="Enter your phone"
                  className="w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-600"
                />
                <ErrorMessage
                  name="phone"
                  component="div"
                  className="text-red-500 text-sm mt-1"
                />
              </div>

              <div>
                <label
                  className="block text-sm font-medium mb-1"
                  htmlFor="email"
                >
                  Email
                </label>
                <Field
                  name="email"
                  type="email"
                  placeholder="Enter your email"
                  className="w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-600"
                />
                <ErrorMessage
                  name="email"
                  component="div"
                  className="text-red-500 text-sm mt-1"
                />
              </div>

              <div>
                <label
                  className="block text-sm font-medium mb-1"
                  htmlFor="password"
                >
                  Password
                </label>
                <Field
                  name="password"
                  type="password"
                  placeholder="Enter your password"
                  className="w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-600"
                />
                <ErrorMessage
                  name="password"
                  component="div"
                  className="text-red-500 text-sm mt-1"
                />
              </div>

              {error && (
                <div className="text-red-500 text-sm mt-1 text-center">
                  {error}
                </div>
              )}

              <button
                type="submit"
                className="w-full bg-green-600 text-white rounded-lg py-3 font-medium hover:bg-green-700 transition"
                disabled={loading}
              >
                {loading ? "Creating account..." : "Sign Up"}
              </button>
            </Form>
          )}
        </Formik>

        <div className="flex items-center my-4">
          <div className="flex-grow border-t border-green-600"></div>
          <span className="mx-3 text-gray-700 text-sm">Or sign up with</span>
          <div className="flex-grow border-t border-green-600"></div>
        </div>

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
            { img: "/fb.svg", alt: "Facebook", link: "https://facebook.com" },
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

        <p className="text-center mt-6 text-sm">
          Already have an account?{" "}
          <button
            className="text-green-600 hover:underline"
            onClick={() => navigate("/LandlordLogin")}
          >
            Login
          </button>
        </p>
      </div>
    </div>
  );
};

export default SignUpPage;
