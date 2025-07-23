import { UploadSimple, CheckCircle, XCircle } from "@phosphor-icons/react";
import { useRef, useState, useEffect } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from "react-router-dom";

export default function IdDetails() {
  const fileInputRef = useRef(null);
  const [selectedFile, setSelectedFile] = useState(null);
  const [statusPopup, setStatusPopup] = useState("idle");
  const navigate = useNavigate();

  useEffect(() => {
    if (statusPopup === "success") {
      const timeout = setTimeout(() => {
        const userData = JSON.parse(localStorage.getItem("user"));
        const role = userData?.data.role.name;

        if (role === "RENTER") {
          navigate("/tenantlisting");
        } else if (role === "LANDLORD") {
          navigate("/landlordlisting");
        } else {
          navigate("/login");
        }
      }, 2000);

      return () => clearTimeout(timeout);
    } else if (statusPopup === "error") {
      const timeout = setTimeout(() => {
        setStatusPopup("idle");
      }, 2000);
      return () => clearTimeout(timeout);
    }
  }, [statusPopup, navigate]);

  const formik = useFormik({
    initialValues: {
      docNumber: "",
    },
    validationSchema: Yup.object({
      docNumber: Yup.string().required("ID Number is required"),
    }),
    onSubmit: async (values, { resetForm }) => {
      if (!selectedFile) {
        toast.error("Please upload a clear photo.");
        return;
      }

      try {
        setStatusPopup("loading");

        const rawDocumentType =
          localStorage.getItem("selectedIDType") || "Unknown";
        const documentType = encodeURIComponent(rawDocumentType.trim());

        const mimeTypeToFormat = {
          "image/jpeg": "jpg",
          "image/png": "png",
        };

        const fileFormat = mimeTypeToFormat[selectedFile.type];
        if (!fileFormat) {
          toast.error("Unsupported file format. Use PNG or JPEG.");
          setStatusPopup("idle");
          return;
        }

        const formData = new FormData();
        formData.append("image", selectedFile);
        formData.append("docNumber", values.docNumber);

        const baseUrl = import.meta.env.VITE_API_URL;
        const url = `${baseUrl}/upload/document?type=${documentType}&format=${fileFormat}&folder=document`;
        const token = JSON.parse(localStorage.getItem("user")).data.token;

        await axios.post(url, formData, {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${token}`,
          },
        });

        setStatusPopup("success");
        toast.success("ID submitted successfully!");
        resetForm();
        setSelectedFile(null);
        localStorage.removeItem("selectedIDType");
      } catch (error) {
        setStatusPopup("error");
        toast.error(
          error?.response?.data?.message ||
            "Something went wrong. Please try again."
        );
      }
    },
  });

  const handleButtonClick = () => {
    fileInputRef.current?.click();
  };

  const handleFileChange = (e) => {
    const file = e.target.files?.[0];

    if (file) {
      const validTypes = ["image/png", "image/jpeg"];
      if (!validTypes.includes(file.type)) {
        toast.error("Only PNG or JPEG files are allowed.");
        e.target.value = null;
        return;
      }

      setSelectedFile(file);
    }
  };

  return (
    <section className="bg-gray-50 min-h-screen flex justify-center items-center px-4 relative">
      <ToastContainer autoClose={3000} hideProgressBar />
      <form
        onSubmit={formik.handleSubmit}
        className="w-full max-w-lg bg-white rounded-xl shadow-lg p-6 space-y-6"
      >
        <h2 className="text-2xl font-bold text-center text-gray-800">
          Identity Verification
        </h2>

        <div className="flex flex-col">
          <label
            htmlFor="docNumber"
            className="text-gray-700 font-semibold mb-1"
          >
            ID Number
          </label>
          <input
            id="docNumber"
            name="docNumber"
            type="text"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.docNumber}
            className="border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-green-500"
          />
          {formik.touched.docNumber && formik.errors.docNumber && (
            <span className="text-red-500 text-sm mt-1">
              {formik.errors.docNumber}
            </span>
          )}
        </div>

        <div className="mt-6 flex flex-col items-center">
          <h3 className="text-md font-medium text-gray-700">
            Upload a Photo of Your ID
          </h3>
          <p className="text-sm text-gray-500 italic text-center mt-1">
            Ensure the photo is clear. Blurry uploads will be rejected.
          </p>

          <button
            type="button"
            onClick={handleButtonClick}
            className="mt-3 w-2/3 border border-gray-400 rounded-md px-4 py-2 flex justify-center items-center gap-2 hover:bg-gray-100 transition"
          >
            <UploadSimple />
            <span className="font-semibold">Upload</span>
          </button>

          <input
            type="file"
            accept="image/png, image/jpeg"
            ref={fileInputRef}
            onChange={handleFileChange}
            className="hidden"
          />

          {selectedFile && (
            <div className="mt-3 bg-green-50 border border-green-300 text-green-800 px-3 py-1 rounded-full text-sm">
              {selectedFile.name}
            </div>
          )}
        </div>

        <button
          type="submit"
          disabled={statusPopup === "loading"}
          className={`w-full mt-4 rounded-md px-4 py-3 text-white font-semibold ${
            statusPopup === "loading"
              ? "bg-green-400 cursor-not-allowed"
              : "bg-green-600 hover:bg-green-700"
          } transition`}
        >
          {statusPopup === "loading" ? "Submitting..." : "Submit"}
        </button>
      </form>

      {/* MODAL OVERLAY */}
      {statusPopup !== "idle" && (
        <div className="absolute inset-0 bg-black/50 bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 w-72 text-center shadow-xl">
            {statusPopup === "loading" && (
              <>
                <div className="animate-spin h-10 w-10 border-4 border-green-500 border-t-transparent rounded-full mx-auto mb-4" />
                <p className="text-gray-700 font-medium">Submitting...</p>
              </>
            )}

            {statusPopup === "success" && (
              <>
                <CheckCircle
                  size={48}
                  className="text-green-500 mx-auto mb-2"
                />
                <p className="text-green-600 font-semibold">Success!</p>
              </>
            )}

            {statusPopup === "error" && (
              <>
                <XCircle size={48} className="text-red-500 mx-auto mb-2" />
                <p className="text-red-600 font-semibold">Submission failed</p>
              </>
            )}
          </div>
        </div>
      )}
    </section>
  );
}
