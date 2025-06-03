"use client";

import React, { useState, useEffect } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { FaUpload, FaEdit } from "react-icons/fa";
import { useSelector } from "react-redux";
import {store} from "../../../../../redux/store"
import { useCreateDoctorServiceMutation } from "@/redux/features/services/dprofile/ServiceApi";

const DoctorAddServiceForm = () => {
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [editMode, setEditMode] = useState(true);
  const [discountAmount, setDiscountAmount] = useState<number | null>(null);
  const [showAddMore, setShowAddMore] = useState(true);
const [createDoctorService, { isLoading, isError }] = useCreateDoctorServiceMutation();
const user = useSelector((state: store) => state.auth.user);
const formik = useFormik({
  initialValues: {
    userId: user?._id,
    serviceName: "",
    description: "",
    fee: "",
    estimatedPrice: "",
    mode: "",
    duration: "",
    customDoctorType: "",
    availability: "",
    image: null as File | null,
  },
  validationSchema: Yup.object({
    serviceName: Yup.string().required("Service Name is required"),
    description: Yup.string().required("Description is required"),
    fee: Yup.number()
      .typeError("Fee must be a number")
      .required("Fee is required"),
    estimatedPrice: Yup.number()
      .typeError("Estimated price must be a number")
      .required("Estimated price is required"),
    duration: Yup.string().required("Duration is required"),
    customDoctorType: Yup.string().when("duration", {
      is: "custom",
      then: (schema) =>
        schema.required("Doctor Type is required for custom duration"),
    }),
    availability: Yup.string().required("Availability is required"),
    image: Yup.mixed().nullable(),
  }),
  onSubmit: async (values) => {
  try {
    const formData = new FormData();
    formData.append("userId", values.userId);
    formData.append("serviceName", values.serviceName);
    formData.append("description", values.description);
    formData.append("fee", values.fee.toString());
    formData.append("estimatedPrice", values.estimatedPrice.toString());
    formData.append("mode", values.mode);
    formData.append("duration", values.duration);
    formData.append("customDoctorType", values.customDoctorType);
    formData.append("availability", values.availability);
    if (values.image) {
      formData.append("image", values.image);
    }

    const res = await createDoctorService(formData).unwrap();
    console.log("response", res);
    alert("Service submitted successfully!");
    setEditMode(false);
  } catch (error) {
    console.error("Error submitting service:", error);
    alert("Failed to submit service.");
  }
}

});

  useEffect(() => {
    const fee = parseFloat(formik.values.fee);
    const est = parseFloat(formik.values.estimatedPrice);
    if (!isNaN(fee) && !isNaN(est) && est > fee) {
      const discount = est - fee;
      setDiscountAmount(discount);
    } else {
      setDiscountAmount(null);
    }
  }, [formik.values.fee, formik.values.estimatedPrice]);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.currentTarget.files?.[0];
    if (file) {
      formik.setFieldValue("image", file);
      const reader = new FileReader();
      reader.onloadend = () => setImagePreview(reader.result as string);
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      <div className="flex flex-col sm:flex-col md:flex-row gap-6 md:gap-8">
        {/* Form Section */}
        <div className="w-full md:w-1/2 bg-white p-6 shadow-lg rounded-xl">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-bold text-blue-700">
              Gym Service Form
            </h2>
            {!editMode && (
              <button
                onClick={() => setEditMode(true)}
                className="text-gray-500 hover:text-blue-600 transition"
              >
                <FaEdit />
              </button>
            )}
          </div>

          <form onSubmit={formik.handleSubmit} className="space-y-4">
            {/* Service Name */}
            <input
              disabled={!editMode}
              type="text"
              name="serviceName"
              placeholder="Service Name"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.serviceName}
              className="w-full border px-4 py-2 rounded"
            />

            {/* Description */}
            <textarea
              disabled={!editMode}
              name="description"
              placeholder="Service Description"
              rows={3}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.description}
              className="w-full border px-4 py-2 rounded"
            />

            {/* Fee & Estimate */}
            <div className="flex gap-4">
              <input
                disabled={!editMode}
                type="text"
                name="fee"
                placeholder="Fee (₹)"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.fee}
                className="w-full border px-4 py-2 rounded"
              />
              <input
                disabled={!editMode}
                type="text"
                name="estimatedPrice"
                placeholder="Estimated Price (₹)"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.estimatedPrice}
                className="w-full border px-4 py-2 rounded"
              />
            </div>

            {/* Duration */}
            <select
              disabled={!editMode}
              name="duration"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.duration}
              className="w-full border px-4 py-2 rounded"
            >
              <option value="">Select Duration</option>
              <option value="15">15 Minutes</option>
              <option value="30">30 Minutes</option>
              <option value="45">45 Minutes</option>
              <option value="custom">Custom</option>
            </select>

            {/* Custom Doctor Type */}
            {formik.values.duration === "custom" && (
              <input
                disabled={!editMode}
                type="text"
                name="customDoctorType"
                placeholder="Doctor Type"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.customDoctorType}
                className="w-full border px-4 py-2 rounded"
              />
            )}

            {/* Availability */}
            <select
              disabled={!editMode}
              name="availability"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.availability}
              className="w-full border px-4 py-2 rounded"
            >
              <option value="">Select Availability</option>
              <option value="weekdays">Weekdays</option>
              <option value="weekends">Weekends</option>
              <option value="both">Both</option>
            </select>

            {/* Image Upload */}
            <div className="flex items-center gap-4">
              <input
                disabled={!editMode}
                type="file"
                accept="image/*"
                onChange={handleImageChange}
                className="border p-2 rounded"
              />
              {imagePreview && (
                <img
                  src={imagePreview}
                  alt="Preview"
                  className="w-14 h-14 object-cover rounded shadow"
                />
              )}
            </div>

            {editMode && (
              <button
                type="submit"
                className="bg-blue-600 text-white w-full py-2 rounded hover:bg-blue-700"
              >
                Submit Service
              </button>
            )}

           
          </form>
        </div>

        {/* Service Card Preview */}
        <div className="w-full md:w-1/2 bg-white p-6 shadow-xl rounded-xl flex flex-col items-center justify-center text-center">
          {imagePreview && (
            <img
              src={imagePreview}
              alt="Service"
              className="w-full max-w-sm h-40 object-cover rounded-lg mb-4 shadow-md"
            />
          )}
          <h3 className="text-lg font-bold text-gray-700 mb-1">
            {formik.values.serviceName || "Service Name"}
          </h3>
          <p className="text-sm text-gray-500 mb-3">
            {formik.values.description || "Description..."}
          </p>
          <div className="text-gray-600">
            <p>
              <strong>Fee:</strong> ₹{formik.values.fee || "0"}
            </p>
            <p>
              <strong>Estimated:</strong> ₹{formik.values.estimatedPrice || "0"}
            </p>
            {discountAmount !== null && (
              <p className="text-green-600 font-semibold">
                You save: ₹{discountAmount.toFixed(2)}
              </p>
            )}
          </div>
          <p className="text-sm mt-2 text-gray-500">
            <strong>Duration:</strong> {formik.values.duration || "-"}{" "}
            {formik.values.customDoctorType &&
              `(${formik.values.customDoctorType})`}
          </p>
          <p className="text-sm text-gray-500">
            <strong>Availability:</strong> {formik.values.availability || "-"}
          </p>
        </div>
      </div>
    </div>
  );
};

export default DoctorAddServiceForm;
function createDoctorService(values: { userId: any; serviceName: string; description: string; fee: string; estimatedPrice: string; mode: string; duration: string; customDoctorType: string; availability: string; image: File | null; }) {
  throw new Error("Function not implemented.");
}

