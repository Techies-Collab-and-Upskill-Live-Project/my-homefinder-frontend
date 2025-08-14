import React from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";

const EditNumberModal = ({ onClose, onSave, initialNumber = "" }) => {
  const validationSchema = Yup.object({
    phoneNumber: Yup.string()
      .matches(/^\d{10,15}$/, "Enter a valid phone number (10-15 digits)")
      .required("Phone number is required"),
  });

  return (
    <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/50">
      <div className="bg-white p-6 rounded-md w-80 space-y-4">
        <h3 className="text-lg font-bold">
          {initialNumber ? "Edit Phone Number" : "Add Phone Number"}
        </h3>

        <Formik
          initialValues={{ phoneNumber: initialNumber }}
          validationSchema={validationSchema}
          onSubmit={(values) => {
            onSave(values.phoneNumber); // Send only the updated number
            onClose();
          }}
        >
          {() => (
            <Form className="space-y-3">
              <Field
                name="phoneNumber"
                placeholder="Enter phone number"
                className="w-full border border-gray-300 rounded-md p-2"
              />
              <ErrorMessage
                name="phoneNumber"
                component="div"
                className="text-red-500 text-sm"
              />

              <div className="flex justify-end gap-2">
                <button
                  type="button"
                  onClick={onClose}
                  className="px-4 py-1 bg-gray-300 rounded"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-1 bg-green-600 text-white rounded"
                >
                  Save
                </button>
              </div>
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
};

export default EditNumberModal;
