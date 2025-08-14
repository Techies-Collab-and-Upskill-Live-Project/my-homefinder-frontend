import React from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";

const EditBioModal = ({ currentBio = "", onClose, onSave }) => {
  const validationSchema = Yup.object({
    bio: Yup.string()
      .min(10, "Bio must be at least 10 characters")
      .required("Bio is required"),
  });

  return (
    <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/50">
      <div className="bg-white p-6 rounded-md w-96 space-y-4">
        <h3 className="text-lg font-bold">Edit Bio</h3>
        <Formik
          initialValues={{ bio: currentBio }}
          validationSchema={validationSchema}
          onSubmit={(values, { resetForm }) => {
            onSave(values.bio);
            resetForm();
            onClose();
          }}
        >
          {() => (
            <Form className="space-y-3">
              <Field
                as="textarea"
                name="bio"
                rows="4"
                placeholder="Write something about yourself..."
                className="w-full border border-gray-300 rounded-md p-2"
              />
              <ErrorMessage
                name="bio"
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

export default EditBioModal;
