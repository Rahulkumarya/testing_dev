"use client";
import React from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useRouter } from "next/navigation";

const validationSchema = Yup.object({
  driverName: Yup.string().required("Driver Name is required"),
  ambulanceNumber: Yup.string()
    .matches(/^[A-Z]{2}[0-9]{2}[A-Z]{1,2}[0-9]{4}$/, "Invalid Ambulance Number")
    .required("Ambulance Number is required"),
  ambulanceType: Yup.string().required("Ambulance Type is required"),
  contactNumber: Yup.string()
    .matches(/^[6-9]\d{9}$/, "Invalid Contact Number")
    .required("Contact Number is required"),
  serviceArea: Yup.string().required("Service Area is required"),
  registrationCertificate: Yup.string().required("RC Number is required"),
});

const AmbulanceProfile = () => {
  const router = useRouter();

  const formik = useFormik({
    initialValues: {
      driverName: "",
      ambulanceNumber: "",
      ambulanceType: "",
      contactNumber: "",
      serviceArea: "",
      registrationCertificate: "",
    },
    validationSchema,
    onSubmit: (values) => {
      console.log("Submitted Ambulance Profile:", values);
      alert("Ambulance Profile Submitted!");
      router.push("/dashboard");
    },
  });

  return (
    <div className="max-w-xl mx-auto p-6 bg-white rounded-xl shadow-md mt-10">
      <h2 className="text-2xl font-bold mb-6 text-center text-gray-800">
        Ambulance Profile Completion
      </h2>
      <form onSubmit={formik.handleSubmit} className="space-y-5">
        {/* Driver Name */}
        <div>
          <label className="block font-medium mb-1">Driver Name</label>
          <input
            type="text"
            name="driverName"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.driverName}
            className="w-full border border-gray-300 p-2 rounded"
            placeholder="Enter driver's full name"
          />
          {formik.touched.driverName && formik.errors.driverName && (
            <p className="text-red-500 text-sm mt-1">
              {formik.errors.driverName}
            </p>
          )}
        </div>

        {/* Ambulance Number */}
        <div>
          <label className="block font-medium mb-1">Ambulance Number</label>
          <input
            type="text"
            name="ambulanceNumber"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.ambulanceNumber}
            className="w-full border border-gray-300 p-2 rounded"
            placeholder="e.g., KA01AB1234"
          />
          {formik.touched.ambulanceNumber && formik.errors.ambulanceNumber && (
            <p className="text-red-500 text-sm mt-1">
              {formik.errors.ambulanceNumber}
            </p>
          )}
        </div>

        {/* Ambulance Type */}
        <div>
          <label className="block font-medium mb-1">Ambulance Type</label>
          <select
            name="ambulanceType"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.ambulanceType}
            className="w-full border border-gray-300 p-2 rounded"
          >
            <option value="" label="Select type" />
            <option value="BLS" label="Basic Life Support" />
            <option value="ALS" label="Advanced Life Support" />
            <option value="PTV" label="Patient Transport Vehicle" />
          </select>
          {formik.touched.ambulanceType && formik.errors.ambulanceType && (
            <p className="text-red-500 text-sm mt-1">
              {formik.errors.ambulanceType}
            </p>
          )}
        </div>

        {/* Contact Number */}
        <div>
          <label className="block font-medium mb-1">Contact Number</label>
          <input
            type="text"
            name="contactNumber"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.contactNumber}
            className="w-full border border-gray-300 p-2 rounded"
            placeholder="10-digit mobile number"
          />
          {formik.touched.contactNumber && formik.errors.contactNumber && (
            <p className="text-red-500 text-sm mt-1">
              {formik.errors.contactNumber}
            </p>
          )}
        </div>

        {/* Service Area */}
        <div>
          <label className="block font-medium mb-1">Service Area</label>
          <input
            type="text"
            name="serviceArea"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.serviceArea}
            className="w-full border border-gray-300 p-2 rounded"
            placeholder="e.g., Bangalore Urban"
          />
          {formik.touched.serviceArea && formik.errors.serviceArea && (
            <p className="text-red-500 text-sm mt-1">
              {formik.errors.serviceArea}
            </p>
          )}
        </div>

        {/* RC Number */}
        <div>
          <label className="block font-medium mb-1">
            Registration Certificate No.
          </label>
          <input
            type="text"
            name="registrationCertificate"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.registrationCertificate}
            className="w-full border border-gray-300 p-2 rounded"
            placeholder="Enter RC number"
          />
          {formik.touched.registrationCertificate &&
            formik.errors.registrationCertificate && (
              <p className="text-red-500 text-sm mt-1">
                {formik.errors.registrationCertificate}
              </p>
            )}
        </div>

        {/* Submit Button */}
        <div className="text-center">
          <button
            type="submit"
            className="bg-green-600 hover:bg-green-700 text-white px-6 py-2 rounded transition"
          >
            Submit
          </button>
        </div>
      </form>
    </div>
  );
};

export default AmbulanceProfile;
