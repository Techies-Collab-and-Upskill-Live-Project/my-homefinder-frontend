import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useFormik } from "formik";
import * as Yup from "yup";
import UploadPicture from "../Components/UploadPicture";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import ConfirmationModal from "../Components/ConfirmationModal";

// List of Nigerian States
const nigerianStates = [
  "Abia",
  "Adamawa",
  "Akwa Ibom",
  "Anambra",
  "Bauchi",
  "Bayelsa",
  "Benue",
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

const ProfileForm = () => {
  const navigate = useNavigate();
  const [showSkipModal, setShowSkipModal] = useState(false);
  const userId = JSON.parse(localStorage.getItem("user")).user.id;
  const user = JSON.parse(localStorage.getItem("user")).user;
  const token = JSON.parse(localStorage.getItem("user")).token.token;

  const handleSkip = () => {
    setShowSkipModal(true);
  };

  const confirmSkip = () => {
    setShowSkipModal(false);
    navigate("/tenantlisting");
  };

  const cancelSkip = () => {
    setShowSkipModal(false);
  };

  const validationSchema = Yup.object({
    fullName: Yup.string()
      .min(3, "Full Name must be at least 3 characters")
      .required("Full Name is required"),
    // phone: Yup.string()
    //   .matches(
    //     /^(\+234|0)[789]\d{9}$/,
    //     "Phone number is not valid (e.g., 08012345678 or +2348012345678)"
    //   )
    //   .required("Phone Number is required"),
    // city: Yup.string()
    //   .min(2, "City must be at least 2 characters")
    //   .required("City is required"),
    // state: Yup.string()
    //   .oneOf(nigerianStates, "Please select a valid State")
    //   .required("State is required"),
    NIN: Yup.string()
      .matches(/^\d{11}$/, "NIN must be 11 digits")
      .required("NIN is required"),
  });

  const formik = useFormik({
    initialValues: {
      fullName: user.fullName || "",
      // phone: "",
      // city: "",
      // state: "",
      NIN: "",
    },
    validationSchema: validationSchema,
    onSubmit: async (values, { setSubmitting, setStatus }) => {
      setStatus(null);
      try {
        const { fullName, NIN } = values;

        const payload = {
          fullName,
          NIN,
        };

        console.log("Submitting profile data:", payload);

        const response = await fetch(
          `${import.meta.env.VITE_API_URL}/users/updateprofile`,
          {
            method: "PATCH",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
            body: JSON.stringify(payload),
          }
        );

        if (!response.ok) {
          const errorData = await response.json();
          throw new Error(errorData.message || "Failed to save profile");
        }

        const result = await response.json();

        localStorage.setItem("completed_verification_tenant", "true");
        setTimeout(() => {
          toast.success("Profile saved successfully!");
          navigate("/tenantListing");
        }, 1500);
      } catch (error) {
        console.error("Error saving profile:", error);
        toast.error(`Failed to save profile: ${error.message}`);
      } finally {
        setSubmitting(false);
      }
    },
  });

  const handleImageUpload = (imageUrl) => {
    formik.setFieldValue("image", imageUrl);
  };

  return (
    <>
      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="colored"
      />
      <ConfirmationModal
        isOpen={showSkipModal}
        onClose={cancelSkip}
        onConfirm={confirmSkip}
      />

      <div className="font-sans text-gray-800 p-4 md:p-8 max-w-lg mx-auto bg-white rounded-lg shadow-lg">
        <div className="mt-[100px]">
          <h2 className="text-center mb-7 text-xl font-semibold md:text-2xl">
            Complete Your Profile
          </h2>
          <UploadPicture
            onImageSelect={handleImageUpload}
            disabled={formik.isSubmitting}
          />
          {formik.touched.doc && formik.errors.doc ? (
            <div className="text-red-500 text-sm mt-1 text-center">
              {formik.errors.doc}
            </div>
          ) : null}

          <form
            onSubmit={formik.handleSubmit}
            className="flex flex-col gap-6 mt-6 md:mt-10"
          >
            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-6">
              {/* Full Name Field */}
              <div className="relative flex-1">
                <input
                  name="fullName"
                  value={formik.values.fullName}
                  disabled={formik.isSubmitting}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  type="text"
                  id="fullName"
                  placeholder=" "
                  className="w-full h-16 md:h-12 px-3 pt-4 text-base border border-gray-300 rounded-md outline-none focus:border-green-500 peer"
                />
                <label
                  htmlFor="typeOfHouse"
                  className="absolute top-[-19px]  left-2 bg-white px-7 py-2.5 text-xs text-gray-800 pointer-events-none transition-all duration-200 ease-in-out border border-gray-300 rounded-xl w-auto flex items-center gap-1.5 shadow-lg
             peer-focus:top-[-30px] peer-not-placeholder-shown:top-[-19px]"
                >
                  <svg
                    width="15"
                    height="13"
                    viewBox="0 0 18 16"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M11.8872 8.44965C12.7247 7.84142 13.3359 7.00734 13.636 6.06347C13.936 5.1196 13.9099 4.11286 13.5613 3.18333C13.2127 2.25379 12.5589 1.44768 11.6908 0.87714C10.8228 0.306598 9.78374 0 8.71817 0C7.6526 0 6.61352 0.306598 5.7455 0.87714C4.87748 1.44768 4.22367 2.25379 3.87505 3.18333C3.52642 4.11286 3.50031 5.1196 3.80035 6.06347C4.10038 7.00734 4.71165 7.84142 5.54909 8.44965C4.11411 8.98038 2.86203 9.86064 1.92635 10.9966C0.990669 12.1325 0.406453 13.4816 0.235987 14.9C0.223648 15.0035 0.233524 15.1083 0.265052 15.2083C0.296579 15.3084 0.349141 15.4017 0.419735 15.4829C0.562307 15.6471 0.769676 15.7522 0.996223 15.7752C1.22277 15.7982 1.44994 15.7372 1.62775 15.6056C1.80557 15.474 1.91946 15.2826 1.94438 15.0734C2.13195 13.532 2.92815 12.1084 4.18086 11.0746C5.43357 10.0408 7.05496 9.46927 8.73525 9.46927C10.4155 9.46927 12.0369 10.0408 13.2896 11.0746C14.5423 12.1084 15.3385 13.532 15.5261 15.0734C15.5493 15.2672 15.6495 15.4461 15.8072 15.5757C15.965 15.7054 16.1691 15.7764 16.3803 15.7752H16.4743C16.6982 15.7515 16.9028 15.6469 17.0436 15.4845C17.1845 15.322 17.25 15.1147 17.226 14.9078C17.0547 13.4855 16.4673 12.1329 15.5268 10.9952C14.5864 9.85754 13.3282 8.97757 11.8872 8.44965ZM8.71817 7.88979C8.04239 7.88979 7.38179 7.7048 6.8199 7.35821C6.25801 7.01163 5.82007 6.51901 5.56146 5.94266C5.30286 5.36631 5.23519 4.73211 5.36703 4.12026C5.49887 3.5084 5.82428 2.94638 6.30213 2.50526C6.77998 2.06414 7.38879 1.76374 8.05158 1.64203C8.71438 1.52033 9.40138 1.58279 10.0257 1.82152C10.6501 2.06025 11.1837 2.46453 11.5591 2.98324C11.9346 3.50194 12.135 4.11177 12.135 4.73561C12.135 5.57215 11.775 6.37442 11.1342 6.96595C10.4934 7.55747 9.62435 7.88979 8.71817 7.88979Z"
                      fill="black"
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

              {/* Phone Number Field */}
              <div className="relative flex-1">
                <input
                  name="phone"
                  value={user.phone}
                  disabled
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  type="tel"
                  id="phoneNo"
                  placeholder=" "
                  className="w-full h-16 md:h-12 px-3 pt-4 text-base border border-gray-300 rounded-md outline-none focus:border-green-500 peer"
                />
                <label
                  htmlFor="typeOfHouse"
                  className="absolute top-[-19px]  left-2 bg-white px-7 py-2.5 text-xs text-gray-800 pointer-events-none transition-all duration-200 ease-in-out border border-gray-300 rounded-xl w-auto flex items-center gap-1.5 shadow-lg
             peer-focus:top-[-30px] peer-not-placeholder-shown:top-[-19px]"
                >
                  <svg
                    width="15"
                    height="14"
                    viewBox="0 0 18 17"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M3.57417 1.88889C3.63084 2.72944 3.7725 3.55111 3.99917 4.335L2.86583 5.46833C2.47861 4.335 2.23306 3.13556 2.14806 1.88889H3.57417ZM12.8864 13.2411C13.6892 13.4678 14.5108 13.6094 15.3419 13.6661V15.0733C14.0953 14.9883 12.8958 14.7428 11.7531 14.365L12.8864 13.2411ZM4.48083 0H1.17528C0.655835 0 0.230835 0.425 0.230835 0.944444C0.230835 9.81278 7.41806 17 16.2864 17C16.8058 17 17.2308 16.575 17.2308 16.0556V12.7594C17.2308 12.24 16.8058 11.815 16.2864 11.815C15.1153 11.815 13.9725 11.6261 12.9147 11.2767C12.821 11.2427 12.7216 11.2266 12.6219 11.2294C12.3764 11.2294 12.1403 11.3239 11.9514 11.5033L9.87361 13.5811C7.19652 12.212 5.0188 10.0343 3.64972 7.35722L5.7275 5.27944C5.99195 5.015 6.0675 4.64667 5.96361 4.31611C5.60534 3.22816 5.42359 2.08986 5.42528 0.944444C5.42528 0.425 5.00028 0 4.48083 0Z"
                      fill="black"
                    />
                  </svg>
                  Phone no
                </label>
                {formik.touched.phone && formik.errors.phone ? (
                  <div className="text-red-500 text-sm mt-1">
                    {formik.errors.phone}
                  </div>
                ) : null}
              </div>

              {/* City Field */}
              {/* <div className="relative flex-1">
                <input
                  name="city"
                  value={formik.values.city}
                  disabled={formik.isSubmitting}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  type="text"
                  id="city"
                  placeholder=" "
                  className="w-full h-16 md:h-12 px-3 pt-4 text-base border border-gray-300 rounded-md outline-none focus:border-green-500 peer"
                />
                <label
                  htmlFor="typeOfHouse"
                  className="absolute top-[-19px]  left-2 bg-white px-7 py-2.5 text-xs text-gray-800 pointer-events-none transition-all duration-200 ease-in-out border border-gray-300 rounded-xl w-auto flex items-center gap-1.5 shadow-lg
             peer-focus:top-[-30px] peer-not-placeholder-shown:top-[-19px]"
                >
                  <svg
                    width="15"
                    height="13"
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M12 11.5C10.6193 11.5 9.5 10.3807 9.5 9C9.5 7.61929 10.6193 6.5 12 6.5C13.3807 6.5 14.5 7.61929 14.5 9C14.5 10.3807 13.3807 11.5 12 11.5ZM12 1C8.13401 1 5 4.13401 5 8C5 13.25 12 22 12 22C12 22 19 13.25 19 8C19 4.13401 15.866 1 12 1ZM12 3C14.7614 3 17 5.23858 17 8C17 11.026 13.8824 15.9818 12 18.5C10.1176 15.9818 7 11.026 7 8C7 5.23858 9.23858 3 12 3Z"
                      fill="black"
                    />
                  </svg>
                  City
                </label>
                {formik.touched.city && formik.errors.city ? (
                  <div className="text-red-500 text-sm mt-1">
                    {formik.errors.city}
                  </div>
                ) : null}
              </div> */}

              {/* State Dropdown */}
              {/* <div className="relative flex-1">
                <select
                  name="state"
                  value={formik.values.state}
                  disabled={formik.isSubmitting}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  id="state"
                  className="w-full h-16 md:h-12 px-3 pt-4 text-base border border-gray-300 rounded-md outline-none focus:border-green-500 peer bg-white"
                >
                  <option value="" disabled>
                    Select a State
                  </option>
                  {nigerianStates.map((stateName) => (
                    <option key={stateName} value={stateName}>
                      {stateName}
                    </option>
                  ))}
                </select>
                <label
                  htmlFor="typeOfHouse"
                  className="absolute top-[-19px]  left-2 bg-white px-7 py-2.5 text-xs text-gray-800 pointer-events-none transition-all duration-200 ease-in-out border border-gray-300 rounded-xl w-auto flex items-center gap-1.5 shadow-lg
             peer-focus:top-[-30px] peer-not-placeholder-shown:top-[-19px]"
                >
                  <svg
                    width="15"
                    height="13"
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M12 2C6.48 2 2 6.48 2 12C2 17.52 6.48 22 12 22C17.52 22 22 17.52 22 12C22 6.48 17.52 2 12 2ZM12 20C7.59 20 4 16.41 4 12C4 7.59 7.59 4 12 4C16.41 4 20 7.59 20 12C20 16.41 16.41 20 12 20ZM12.5 7H11.5V12.25L16.25 15.05L16.75 14.2L12.5 11.7V7Z"
                      fill="black"
                    />
                  </svg>
                  State
                </label>
                {formik.touched.state && formik.errors.state ? (
                  <div className="text-red-500 text-sm mt-1">
                    {formik.errors.state}
                  </div>
                ) : null}
              </div> */}

              {/* NIN Field - Spans two columns on medium screens and up */}
              <div className="relative flex-1 md:col-span-2">
                <input
                  name="NIN"
                  value={formik.values.NIN}
                  disabled={formik.isSubmitting}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  type="text"
                  id="NIN"
                  placeholder=" "
                  className="w-full h-16 md:h-12 px-3 pt-4 text-base border border-gray-300 rounded-md outline-none focus:border-green-500 peer"
                />
                <label
                  htmlFor="typeOfHouse"
                  className="absolute top-[-19px]  left-2 bg-white px-7 py-2.5 text-xs text-gray-800 pointer-events-none transition-all duration-200 ease-in-out border border-gray-300 rounded-xl w-auto flex items-center gap-1.5 shadow-lg
             peer-focus:top-[-30px] peer-not-placeholder-shown:top-[-19px]"
                >
                  <svg
                    width="15"
                    height="13"
                    viewBox="0 0 18 16"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
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
            </div>{" "}
            {/* Buttons Container */}
            <div className="grid grid-cols-3 gap-3">
              <button
                type="submit"
                disabled={formik.isSubmitting}
                className="w-full py-3 col-span-2 bg-green-600 text-white font-semibold rounded-md hover:bg-green-700 transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {formik.isSubmitting ? "Saving..." : "Complete Profile"}
              </button>
              <button
                type="button"
                onClick={handleSkip}
                disabled={formik.isSubmitting}
                className="w-full py-3 bg-gray-200 text-gray-800 font-semibold rounded-md hover:bg-gray-300 transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Skip for now
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default ProfileForm;
