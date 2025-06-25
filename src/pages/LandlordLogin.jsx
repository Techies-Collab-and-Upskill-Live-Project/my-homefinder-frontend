import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { Link, useNavigate } from "react-router-dom";

const validationSchema = Yup.object({
  email: Yup.string()
    .email("Invalid email format")
    .required("Email is required"),
  password: Yup.string()
    .required("Password is required")
    .min(6, "Password must be at least 6 characters"),
});

const LandlordLoginPage = () => {
  const navigate = useNavigate();

  const handleSubmit = (values) => {
    console.log("Login submitted:", values);
    // Add login API logic here
    navigate("/dashboard");
  };

  return (
    <div className="flex min-h-screen overflow-hidden items-center justify-center bg-gray-50 relative px-4">
      {/* Top right circle */}
      <div className="w-60 h-60 bg-green-600 rounded-full absolute -top-28 -right-28"></div>
      {/* Bottom left circle */}
      <div className="w-60 h-60 bg-green-600 rounded-full absolute -bottom-28 -left-28"></div>

      {/* Logo */}
      <img
        src="/Images/Logo.png"
        alt="Logo"
        className="absolute top-4 left-6 h-20"
      />

      <div className="bg-white rounded-3xl shadow-lg p-8 w-full max-w-md z-10">
        <h2 className="text-2xl font-bold text-center mb-2">Welcome Back!</h2>
        <p className="text-center text-gray-600 mb-6">
          Please log in to continue
        </p>

        <Formik
          initialValues={{ email: "", password: "" }}
          validationSchema={validationSchema}
          onSubmit={handleSubmit}
        >
          {() => (
            <Form className="space-y-4">
              {/* Email */}
              <div>
                <label
                  htmlFor="email"
                  className="block text-sm font-medium mb-1"
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

              {/* Password */}
              <div>
                <label
                  htmlFor="password"
                  className="block text-sm font-medium mb-1"
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

              {/* Login Button */}
              <button
                type="submit"
                className="w-full bg-green-600 text-white rounded-lg py-3 font-medium hover:bg-green-700 transition"
              >
                Login
              </button>
            </Form>
          )}
        </Formik>

        {/* Social Login */}
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

        {/* Sign Up Link */}
        <p className="text-center mt-6 text-sm">
          Don't have an account?{" "}
          <button
            className="text-green-600 hover:underline"
            onClick={() => navigate("/LandlordSignUpPage")}
          >
            Sign Up
          </button>
        </p>

        <Link to="/OtpSelection">
          <p className="text-center mt-6 underline hover:text-green-600 cursor-pointer text-sm">
            Forgot your password?
          </p>
        </Link>
      </div>
    </div>
  );
};

export default LandlordLoginPage;
