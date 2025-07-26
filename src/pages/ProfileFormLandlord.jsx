import React from "react";
import { useNavigate } from "react-router-dom";
import { useFormik } from "formik";
import * as Yup from "yup";
import UploadPicture from "../Components/UploadPicture";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const ProfileFormLandlord = () => {
  const authUser = JSON.parse(localStorage.getItem("authUser"));
  const navigate = useNavigate();

  const nigerianStates = [
    "Abia",
    "Adamawa",
    "Akwa Ibom",
    "Anambra",
    "Bauchi",
    "Benue",
    "Bayelsa",
    "Borno",
    "Cross River",
    "Delta",
    "Ebonyi",
    "Edo",
    "Ekiti",
    "Enugu",
    "Gombe",
    "Imo",
    "Jigawa",
    "Kaduna",
    "Kano",
    "Katsina",
    "Kebbi",
    "Kogi",
    "Kwara",
    "Lagos",
    "Nasarawa",
    "Niger",
    "Ogun",
    "Ondo",
    "Osun",
    "Oyo",
    "Plateau",
    "Rivers",
    "Sokoto",
    "Taraba",
    "Yobe",
    "Zamfara",
    "FCT",
  ];

  const validationSchema = Yup.object({
    fullName: Yup.string()
      .min(3, "Full name must be at least 3 characters")
      .required("Full name is required"),
    phoneNumber: Yup.string()
      .matches(
        /^(\+234|0)[789]\d{9}$/,
        "phone number is not valid (e.g., 08012345678 or +2348012345678)"
      )
      .required("phoneNumber number is required"),
    street: Yup.string().required("Street address is required"),
    city: Yup.string().required("City is required"),
    state: Yup.string()
      .oneOf(nigerianStates, "Please select a valid state")
      .required("State is required"),
    driversLicense: Yup.string(),
    NIN: Yup.string()
      .matches(/^\d{11}$/, "NIN must be 11 digits")
      .required("NIN is required"),
    // contactPreference: Yup.string()
    //   .oneOf(["call", "chat", "both"]),
    otherInfo: Yup.string(), // Optional field
  });
  const userId = JSON.parse(localStorage.getItem("user")).user.id;
  const token = JSON.parse(localStorage.getItem("user")).token.token;

  const formik = useFormik({
    initialValues: {
      fullName: "",
      phoneNumber: "",
      street: "",
      city: "",
      state: "",
      driversLicense: "",
      NIN: "",
      // contactPreference: "",
      otherInfo: "",
    },
    validationSchema: validationSchema,
    onSubmit: async (values) => {
      try {
        toast.info("Submitting your profile...");

        const response = await fetch(
          `${import.meta.env.VITE_API_URL}/users/updateprofile`,
          {
            method: "PATCH",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
            body: JSON.stringify(values),
          }
        );

        if (!response.ok) {
          const errorData = await response.json();
          throw new Error(errorData.message || "Failed to submit form");
        }

        const result = await response.json();
        localStorage.setItem("completed_verification", "true");
        toast.success("Profile updated successfully!");

        setTimeout(() => {
          navigate("/landlordListing", { state: values });
          window.location.reload();
        }, 2000);
      } catch (error) {
        console.error("Error submitting form:", error);
        toast.error(`Submission failed: ${error.message}`);
      }
    },
  });

  const handleImageUpload = (imageUrl) => {
    formik.setFieldValue("image", imageUrl);
  };

  return (
    <>
      <ToastContainer position="top-right" autoClose={3000} />

      <div className="max-w-4xl mx-auto pt-40 p-5 font-sans shadow-md">
        <h2 className="text-center mb-8 text-xl font-bold">
          Complete Your Profile
        </h2>

        <UploadPicture onImageSelect={handleImageUpload} />
        {formik.touched.image && formik.errors.image ? (
          <div className="text-red-500 text-sm mt-1 text-center">
            {formik.errors.image}
          </div>
        ) : null}

        <form
          onSubmit={formik.handleSubmit}
          className="flex flex-col grid-cols-3 mt-8 gap-6"
        >
          {/* Full Name Field */}
          <div className="input-group relative mb-2.5 flex-1">
            <input
              name="fullName"
              value={authUser.fullName}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              type="text"
              id="fullName"
              placeholder=" "
              className="peer w-full h-11 pt-4 pb-2 px-2.5 text-base border border-gray-300 rounded-md outline-none focus:outline-none"
            />
            <label
              htmlFor="fullName"
              className="absolute top-[-19px] left-2 bg-white px-7 py-2.5 text-xs text-gray-800 pointer-events-none transition-all duration-200 ease-in-out border border-gray-300 rounded-xl w-auto flex items-center gap-1.5 shadow-lg
             peer-focus:top-[-30px] peer-not-placeholder-shown:top-[-19px]"
            >
              <svg
                width="15"
                height="15"
                viewBox="0 0 15 15"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                className="inline-block"
              >
                <path
                  d="M7.5 7.5C9.32837 7.5 10.8333 6.01875 10.8333 4.25C10.8333 2.48125 9.32837 1 7.5 1C5.67163 1 4.16663 2.48125 4.16663 4.25C4.16663 6.01875 5.67163 7.5 7.5 7.5ZM7.5 8.16667C5.35625 8.16667 1 9.37375 1 11.5V14C1 14.2763 1.22375 14.5 1.5 14.5H13.5C13.7763 14.5 14 14.2763 14 14V11.5C14 9.37375 9.64375 8.16667 7.5 8.16667Z"
                  stroke="#1E1E1E"
                  strokeWidth="0.6"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
              Full Name
            </label>
            {formik.touched.fullName && formik.errors.fullName ? (
              <div className="text-red-500 text-sm mt-1">
                {formik.errors.fullName}
              </div>
            ) : null}
          </div>

          {/* phoneNumber Field */}
          <div className="input-group relative mb-2.5 flex-1">
            <input
              name="phoneNumber"
              value={authUser.phone}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              type="tel"
              id="phone"
              placeholder=" "
              className="peer w-full h-11 pt-4 pb-2 px-2.5 text-base border border-gray-300 rounded-md outline-none focus:outline-none"
            />
            <label
              htmlFor="phone"
              className="absolute top-[-19px] left-2 bg-white px-7 py-2.5 text-xs text-gray-800 pointer-events-none transition-all duration-200 ease-in-out border border-gray-300 rounded-xl w-auto flex items-center gap-1.5 shadow-lg
             peer-focus:top-[-30px] peer-not-placeholder-shown:top-[-19px]"
            >
              <svg
                width="15"
                height="15"
                viewBox="0 0 15 15"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                className="inline-block"
              >
                <path
                  d="M14 10.5V12.75C14 13.0815 13.8683 13.3995 13.6339 13.6339C13.3995 13.8683 13.0815 14 12.75 14C10.7495 13.9961 8.82116 13.3444 7.18512 12.0911C5.54909 10.8378 4.26909 9.04362 3.475 7C2.68138 4.95638 2.33362 3.00762 2.33333 1C2.33333 0.668479 2.20166 0.350484 1.96722 0.116045C1.73278 -0.118394 1.41478 -0.25 1.08333 -0.25H0.25C0.217391 -0.25 0.183478 -0.24837 0.150729 -0.245137C0.11798 -0.241904 0.0864703 -0.237119 0.0567087 -0.230867C0.0269471 -0.224616 0.000300996 -0.217036 -0.0166667 -0.208333C-0.0336344 -0.199631 -0.0468087 -0.190117 -0.0566667 -0.18C-0.0706248 -0.165415 -0.0818296 -0.149206 -0.0898555 -0.131976C-0.0978814 -0.114746 -0.102604 -0.0965936 -0.103721 -0.0782354C-0.105417 -0.0494488 -0.097561 -0.0195514 -0.0809228 0.00844787L1.83333 1.91667C1.94828 2.03125 2.05927 2.15583 2.16431 2.28917C2.26935 2.4225 2.36844 2.56458 2.46083 2.71417C2.55322 2.86375 2.63936 3.02021 2.71961 3.1825C2.79986 3.34479 2.87413 3.51208 2.94167 3.68333C3.0092 3.85458 3.06977 4.02941 3.12333 4.20708C3.1769 4.38475 3.2232 4.56441 3.2625 4.74583L2.46667 5.54167C3.16667 7.20833 4.83333 8.83333 6.5 9.5L7.33333 8.70833C7.51475 8.74762 7.69441 8.79392 7.87208 8.8475C8.04975 8.90107 8.22458 8.96164 8.39583 9.02917C8.56708 9.0967 8.73354 9.17097 8.88312 9.26336C9.03271 9.35575 9.15729 9.46079 9.27188 9.57574L11.1667 11.5C11.4429 11.7763 11.758 11.9056 12.0833 11.8986C12.4087 11.8916 12.7153 11.7317 12.9242 11.4649C13.1331 11.1981 13.2289 10.8604 13.1895 10.5248C13.1501 10.1892 12.9806 9.87844 12.7118 9.66444L11.1667 8.16667"
                  stroke="#1E1E1E"
                  strokeWidth="0.6"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
              Phone Number
            </label>
            {formik.touched.phone && formik.errors.phone ? (
              <div className="text-red-500 text-sm mt-1">
                {formik.errors.phone}
              </div>
            ) : null}
          </div>

          <div className="input-group relative mb-2.5 flex-1">
            <input
              name="street"
              value={formik.values.street}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              type="text"
              id="street"
              placeholder=" "
              className="peer w-full h-11 pt-4 pb-2 px-2.5 text-base border border-gray-300 rounded-md outline-none focus:outline-none"
            />
            <label
              htmlFor="street"
              className="absolute top-[-19px] left-2 bg-white px-7 py-2.5 text-xs text-gray-800 pointer-events-none transition-all duration-200 ease-in-out border border-gray-300 rounded-xl w-auto flex items-center gap-1.5 shadow-lg
             peer-focus:top-[-30px] peer-not-placeholder-shown:top-[-19px]"
            >
              <svg
                width="15"
                height="18"
                viewBox="0 0 17 20"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                className="inline-block"
              >
                <path
                  d="M8.29513 11.428C7.56737 11.428 6.85594 11.2186 6.25083 10.8261C5.64571 10.4337 5.17408 9.87591 4.89558 9.22331C4.61707 8.57072 4.5442 7.85263 4.68618 7.15984C4.82816 6.46705 5.17862 5.83068 5.69323 5.33121C6.20783 4.83173 6.86349 4.49159 7.57727 4.35378C8.29105 4.21598 9.03091 4.2867 9.70327 4.55702C10.3756 4.82733 10.9503 5.28509 11.3547 5.87241C11.759 6.45973 11.9748 7.15023 11.9748 7.85659C11.9736 8.80344 11.5856 9.71119 10.8957 10.3807C10.2059 11.0502 9.27068 11.4269 8.29513 11.428ZM8.29513 5.71373C7.85847 5.71373 7.43162 5.83941 7.06855 6.07487C6.70548 6.31033 6.4225 6.64499 6.2554 7.03655C6.0883 7.42811 6.04457 7.85896 6.12976 8.27464C6.21495 8.69031 6.42522 9.07213 6.73399 9.37182C7.04275 9.6715 7.43614 9.87559 7.86441 9.95827C8.29268 10.041 8.7366 9.99852 9.14002 9.83633C9.54344 9.67414 9.88825 9.39949 10.1308 9.04709C10.3734 8.6947 10.5029 8.2804 10.5029 7.85659C10.5023 7.28844 10.2695 6.74373 9.85563 6.34198C9.44172 5.94024 8.8805 5.7143 8.29513 5.71373Z"
                  fill="black"
                />
                <path
                  d="M8.29519 20L2.08688 12.8936C2.00061 12.7869 1.91524 12.6795 1.83078 12.5714C0.770823 11.2153 0.197983 9.55935 0.199956 7.85714C0.199956 5.7733 1.05284 3.7748 2.571 2.3013C4.08915 0.827804 6.1482 0 8.29519 0C10.4422 0 12.5012 0.827804 14.0194 2.3013C15.5375 3.7748 16.3904 5.7733 16.3904 7.85714C16.3921 9.55854 15.8196 11.2136 14.7603 12.5693L14.7596 12.5714C14.7596 12.5714 14.5388 12.8529 14.5057 12.8907L8.29519 20ZM3.00606 11.7107C3.00606 11.7107 3.17753 11.9307 3.21653 11.9779L8.29519 17.7914L13.3805 11.97C13.4128 11.9307 13.5851 11.7093 13.5858 11.7086C14.4521 10.6008 14.9203 9.24789 14.9186 7.85714C14.9186 6.15218 14.2207 4.51705 12.9786 3.31146C11.7365 2.10587 10.0518 1.42857 8.29519 1.42857C6.53856 1.42857 4.85388 2.10587 3.61176 3.31146C2.36963 4.51705 1.67182 6.15218 1.67182 7.85714C1.67 9.24879 2.13873 10.6026 3.00606 11.7107Z"
                  fill="black"
                />
              </svg>
              Street
            </label>
            {formik.touched.street && formik.errors.street ? (
              <div className="text-red-500 text-sm mt-1">
                {formik.errors.street}
              </div>
            ) : null}
          </div>

          {/* City Field */}
          <div className="input-group relative mb-2.5 flex-1">
            <input
              name="city"
              value={formik.values.city}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              type="text"
              id="city"
              placeholder=" "
              className="peer w-full h-11 pt-4 pb-2 px-2.5 text-base border border-gray-300 rounded-md outline-none focus:outline-none"
            />
            <label
              htmlFor="city"
              className="absolute top-[-19px] left-2 bg-white px-7 py-2.5 text-xs text-gray-800 pointer-events-none transition-all duration-200 ease-in-out border border-gray-300 rounded-xl w-auto flex items-center gap-1.5 shadow-lg
             peer-focus:top-[-30px] peer-not-placeholder-shown:top-[-19px]"
            >
              <svg
                width="15"
                height="15"
                viewBox="0 0 15 15"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                className="inline-block"
              >
                <path
                  d="M7.5 13.5C10.8137 13.5 13.5 10.8137 13.5 7.5C13.5 4.18629 10.8137 1.5 7.5 1.5C4.18629 1.5 1.5 4.18629 1.5 7.5C1.5 10.8137 4.18629 13.5 7.5 13.5Z"
                  stroke="#1E1E1E"
                  strokeWidth="0.6"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <path
                  d="M7.5 9.5C8.60457 9.5 9.5 8.60457 9.5 7.5C9.5 6.39543 8.60457 5.5 7.5 5.5C6.39543 5.5 5.5 6.39543 5.5 7.5C5.5 8.60457 6.39543 9.5 7.5 9.5Z"
                  stroke="#1E1E1E"
                  strokeWidth="0.6"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <path
                  d="M7.5 1.5V1M13.5 7.5H14M7.5 13.5V14M1.5 7.5H1"
                  stroke="#1E1E1E"
                  strokeWidth="0.6"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
              City
            </label>
            {formik.touched.city && formik.errors.city ? (
              <div className="text-red-500 text-sm mt-1">
                {formik.errors.city}
              </div>
            ) : null}
          </div>

          {/* State Dropdown */}
          <div className="input-group relative mb-2.5 flex-1">
            <select
              name="state"
              value={formik.values.state}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              id="state"
              className="peer w-full h-11 pt-4 pb-2 px-2.5 text-base border border-gray-300 rounded-md outline-none focus:outline-none bg-white appearance-none" // appearance-none to remove default arrow
            >
              <option value="" disabled hidden>
                Select State
              </option>{" "}
              {/* Placeholder */}
              {nigerianStates.map((state) => (
                <option key={state} value={state}>
                  {state}
                </option>
              ))}
            </select>
            <label
              htmlFor="state"
              className="absolute top-[-19px] left-2 bg-white px-7 py-2.5 text-xs text-gray-800 pointer-events-none transition-all duration-200 ease-in-out border border-gray-300 rounded-xl w-auto flex items-center gap-1.5 shadow-lg
             peer-focus:top-[-30px] peer-not-placeholder-shown:top-[-19px]"
            >
              <svg
                width="15"
                height="15"
                viewBox="0 0 15 15"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                className="inline-block"
              >
                <path
                  d="M7.5 13.5C10.8137 13.5 13.5 10.8137 13.5 7.5C13.5 4.18629 10.8137 1.5 7.5 1.5C4.18629 1.5 1.5 4.18629 1.5 7.5C1.5 10.8137 4.18629 13.5 7.5 13.5Z"
                  stroke="#1E1E1E"
                  strokeWidth="0.6"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <path
                  d="M7.5 9.5C8.60457 9.5 9.5 8.60457 9.5 7.5C9.5 6.39543 8.60457 5.5 7.5 5.5C6.39543 5.5 5.5 6.39543 5.5 7.5C5.5 8.60457 6.39543 9.5 7.5 9.5Z"
                  stroke="#1E1E1E"
                  strokeWidth="0.6"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <path
                  d="M7.5 1.5V1M13.5 7.5H14M7.5 13.5V14M1.5 7.5H1"
                  stroke="#1E1E1E"
                  strokeWidth="0.6"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
              State
            </label>
            {/* Custom arrow for select to maintain design */}
            <div className="absolute inset-y-0 right-0 flex items-center px-2 pointer-events-none">
              <svg
                className="w-4 h-4 text-gray-700"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M19 9l-7 7-7-7"
                ></path>
              </svg>
            </div>
            {formik.touched.state && formik.errors.state ? (
              <div className="text-red-500 text-sm mt-1">
                {formik.errors.state}
              </div>
            ) : null}
          </div>

          <div className="input-group relative mb-2.5 flex-1">
            <input
              name="otherInfo"
              value={formik.values.otherInfo}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              type="text"
              id="info"
              placeholder=" "
              className="peer w-full h-11 pt-4 pb-2 px-2.5 text-base border border-gray-300 rounded-md outline-none focus:outline-none"
            />
            <label
              htmlFor="otherInfo"
              className="absolute top-[-19px] left-2 bg-white px-7 py-2.5 text-xs text-gray-800 pointer-events-none transition-all duration-200 ease-in-out border border-gray-300 rounded-xl w-auto flex items-center gap-1.5 shadow-lg
             peer-focus:top-[-30px] peer-not-placeholder-shown:top-[-19px]"
            >
              <svg
                width="17"
                height="17"
                viewBox="0 0 17 17"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                className="inline-block"
              >
                <path
                  d="M2.0332 14.6672V12.2362L9.16187 5.12691L11.5492 7.54291L4.40787 14.6672H2.0332ZM12.9152 2.58224C12.7555 2.42325 12.5394 2.33398 12.314 2.33398C12.0887 2.33398 11.8725 2.42325 11.7129 2.58224L10.3399 3.95191L12.7445 6.35058L14.1179 4.98058C14.1967 4.90193 14.2593 4.80849 14.302 4.70562C14.3447 4.60274 14.3667 4.49246 14.3667 4.38108C14.3667 4.2697 14.3447 4.15941 14.302 4.05654C14.2593 3.95367 14.1967 3.86023 14.1179 3.78158L12.9152 2.58224Z"
                  stroke="#1E1E1E"
                  strokeWidth="0.625"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
              Other Information
            </label>
            {formik.touched.otherInfo && formik.errors.otherInfo ? (
              <div className="text-red-500 text-sm mt-1">
                {formik.errors.otherInfo}
              </div>
            ) : null}
          </div>

          <div className="input-radio">
            <p className="shadow-lg bg-white px-7 py-2.5 text-xs text-gray-800 border border-gray-300 rounded-lg w-fit flex items-center gap-1.5 ml-28 mt-[-12px]">
              <img src="" alt="" className="inline-block" />
              Preference
            </p>
            <div className="flex justify-evenly mt-4">
              <label
                htmlFor="calls"
                className="flex flex-row justify-center items-center gap-1"
              >
                <input
                  name="contactPreference"
                  value="call"
                  disabled
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  checked={formik.values.contactPreference === "call"}
                  type="radio"
                />
                Calls
              </label>
              <label
                htmlFor="chat"
                className="flex flex-row justify-center items-center gap-1"
              >
                <input
                  name="contactPreference"
                  value="chat"
                  disabled
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  checked={formik.values.contactPreference === "chat"}
                  type="radio"
                />
                Chat
              </label>
              <label
                htmlFor="both"
                className="flex flex-row justify-center items-center gap-1"
              >
                <input
                  name="contactPreference"
                  value="both"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  checked={true}
                  type="radio"
                />
                Email
              </label>
            </div>
            {formik.touched.contactPreference &&
            formik.errors.contactPreference ? (
              <div className="text-red-500 text-sm mt-1 text-center">
                {formik.errors.contactPreference}
              </div>
            ) : null}
          </div>

          <p className="text-center text-3xl font-normal mt-6 mb-11">
            Verification
          </p>
          <div className="border-t-[1.5px] border-gray-300 rounded-full w-full mt-[-60px] mb-2.5"></div>

          <div className="input-group relative mb-2.5 flex-1">
            <input
              name="NIN"
              value={formik.values.NIN}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              type="text"
              id="NIN"
              placeholder=" "
              className="peer w-full h-11 pt-4 pb-2 px-2.5 text-base border border-gray-300 rounded-md outline-none focus:outline-none"
            />
            <label
              htmlFor="NIN"
              className="absolute top-[-19px] left-2 bg-white px-7 py-2.5 text-xs text-gray-800 pointer-events-none transition-all duration-200 ease-in-out border border-gray-300 rounded-xl w-auto flex items-center gap-1.5 shadow-lg
             peer-focus:top-[-30px] peer-not-placeholder-shown:top-[-19px]"
            >
              <svg
                width="15"
                height="13"
                viewBox="0 0 18 16"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                className="inline-block"
              >
                <path
                  d="M11.8872 8.44965C12.7247 7.84142 13.3359 7.00734 13.636 6.06347C13.936 5.1196 13.9099 4.11286 13.5613 3.18333C13.2127 2.25379 12.5589 1.44768 11.6908 0.87714C10.8228 0.306598 9.78374 0 8.71817 0C7.6526 0 6.61352 0.306598 5.7455 0.87714C4.87748 1.44768 4.22367 2.25379 3.87505 3.18333C3.52642 4.11286 3.50031 5.1196 3.80035 6.06347C4.10038 7.00734 4.71165 7.84142 5.54909 8.44965C4.11411 8.98038 2.86203 9.86064 1.92635 10.9966C0.990669 12.1325 0.406453 13.4816 0.235987 14.9C0.223648 15.0035 0.233524 15.1083 0.265052 15.2083C0.296579 15.3084 0.349141 15.4017 0.419735 15.4829C0.562307 15.6471 0.769676 15.7522 0.996223 15.7752C1.22277 15.7982 1.44994 15.7372 1.62775 15.6056C1.80557 15.474 1.91946 15.2826 1.94438 15.0734C2.13195 13.532 2.92815 12.1084 4.18086 11.0746C5.43357 10.0408 7.05496 9.46927 8.73525 9.46927C10.4155 9.46927 12.0369 10.0408 13.2896 11.0746C14.5423 12.1084 15.3385 13.532 15.5261 15.0734C15.5493 15.2672 15.6495 15.4461 15.8072 15.5757C15.965 15.7054 16.1691 15.7764 16.3803 15.7752H16.4743C16.6982 15.7515 16.9028 15.6469 17.0436 15.4845C17.1845 15.322 17.25 15.1147 17.226 14.9078C17.0547 13.4855 16.4673 12.1329 15.5268 10.9952C14.5864 9.85754 13.3282 8.97757 11.8872 8.44965ZM8.71817 7.88979C8.04239 7.88979 7.38179 7.7048 6.8199 7.35821C6.25801 7.01163 5.82007 6.51901 5.56146 5.94266C5.30286 5.36631 5.23519 4.73211 5.36703 4.12026C5.49887 3.5084 5.82428 2.94638 6.30213 2.50526C6.77998 2.06414 7.38879 1.76374 8.05158 1.64203C8.71438 1.52033 9.40138 1.58279 10.0257 1.82152C10.6501 2.06025 11.1837 2.46453 11.5591 2.98324C11.9346 3.50194 12.135 4.11177 12.135 4.73561C12.135 5.57215 11.775 6.37442 11.1342 6.96595C10.4934 7.55747 9.62435 7.88979 8.71817 7.88979Z"
                  fill="black"
                />
              </svg>
              NIN
            </label>
            {formik.touched.NIN && formik.errors.NIN ? (
              <div className="text-red-500 text-sm mt-1">
                {formik.errors.NIN}
              </div>
            ) : null}
          </div>

          <div className="input-group relative mb-2.5 flex-1">
            <input
              type="text"
              name="driversLicense"
              value={formik.values.driversLicense}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              id="driver"
              placeholder=" "
              className="peer w-full h-11 pt-4 pb-2 px-2.5 text-base border border-gray-300 rounded-md outline-none focus:outline-none"
            />
            <label
              htmlFor="driver"
              className="absolute top-[-19px] left-2 bg-white px-7 py-2.5 text-xs text-gray-800 pointer-events-none transition-all duration-200 ease-in-out border border-gray-300 rounded-xl w-auto flex items-center gap-1.5 shadow-lg
             peer-focus:top-[-30px] peer-not-placeholder-shown:top-[-19px]"
            >
              <svg
                width="15"
                height="13"
                viewBox="0 0 18 16"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                className="inline-block"
              >
                <path
                  d="M11.8872 8.44965C12.7247 7.84142 13.3359 7.00734 13.636 6.06347C13.936 5.1196 13.9099 4.11286 13.5613 3.18333C13.2127 2.25379 12.5589 1.44768 11.6908 0.87714C10.8228 0.306598 9.78374 0 8.71817 0C7.6526 0 6.61352 0.306598 5.7455 0.87714C4.87748 1.44768 4.22367 2.25379 3.87505 3.18333C3.52642 4.11286 3.50031 5.1196 3.80035 6.06347C4.10038 7.00734 4.71165 7.84142 5.54909 8.44965C4.11411 8.98038 2.86203 9.86064 1.92635 10.9966C0.990669 12.1325 0.406453 13.4816 0.235987 14.9C0.223648 15.0035 0.233524 15.1083 0.265052 15.2083C0.296579 15.3084 0.349141 15.4017 0.419735 15.4829C0.562307 15.6471 0.769676 15.7522 0.996223 15.7752C1.22277 15.7982 1.44994 15.7372 1.62775 15.6056C1.80557 15.474 1.91946 15.2826 1.94438 15.0734C2.13195 13.532 2.92815 12.1084 4.18086 11.0746C5.43357 10.0408 7.05496 9.46927 8.73525 9.46927C10.4155 9.46927 12.0369 10.0408 13.2896 11.0746C14.5423 12.1084 15.3385 13.532 15.5261 15.0734C15.5493 15.2672 15.6495 15.4461 15.8072 15.5757C15.965 15.7054 16.1691 15.7764 16.3803 15.7752H16.4743C16.6982 15.7515 16.9028 15.6469 17.0436 15.4845C17.1845 15.322 17.25 15.1147 17.226 14.9078C17.0547 13.4855 16.4673 12.1329 15.5268 10.9952C14.5864 9.85754 13.3282 8.97757 11.8872 8.44965ZM8.71817 7.88979C8.04239 7.88979 7.38179 7.7048 6.8199 7.35821C6.25801 7.01163 5.82007 6.51901 5.56146 5.94266C5.30286 5.36631 5.23519 4.73211 5.36703 4.12026C5.49887 3.5084 5.82428 2.94638 6.30213 2.50526C6.77998 2.06414 7.38879 1.76374 8.05158 1.64203C8.71438 1.52033 9.40138 1.58279 10.0257 1.82152C10.6501 2.06025 11.1837 2.46453 11.5591 2.98324C11.9346 3.50194 12.135 4.11177 12.135 4.73561C12.135 5.57215 11.775 6.37442 11.1342 6.96595C10.4934 7.55747 9.62435 7.88979 8.71817 7.88979Z"
                  fill="black"
                />
              </svg>
              Drivers Licence
            </label>
            {formik.touched.driversLicense && formik.errors.driversLicense ? (
              <div className="text-red-500 text-sm mt-1">
                {formik.errors.driversLicense}
              </div>
            ) : null}
          </div>

          <button
            type="submit"
            className="p-3 bg-green-500 text-white border-none rounded-md text-base cursor-pointer w-full hover:bg-green-600 transition-colors"
            disabled={formik.isSubmitting}
          >
            {formik.isSubmitting ? "Submitting..." : "Complete"}
          </button>
        </form>
      </div>
    </>
  );
};

export default ProfileFormLandlord;
