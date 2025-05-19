"use client";

import React, { useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { FaUpload } from "react-icons/fa";

const DoctorAddServiceForm = () => {
  const [imagePreview, setImagePreview] = useState<string | null>(null);

  const formik = useFormik({
    initialValues: {
      serviceName: "",
      description: "",
      fee: "",
      discount: "",
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
      discount: Yup.number().typeError("Discount must be a number").optional(),
      duration: Yup.string().required("Duration is required"),
      customDoctorType: Yup.string().when("duration", {
        is: "custom",
        then: (schema) =>
          schema.required("Doctor Type is required for custom duration"),
      }),
      availability: Yup.string().required("Availability is required"),
      image: Yup.mixed().nullable(),
    }),
    onSubmit: (values) => {
      console.log("Form values:", values);
      alert("Service submitted successfully!");
    },
  });

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
    <div className="max-w-3xl mx-auto px-4 py-8 bg-white shadow-lg rounded-xl">
      <h2 className="text-2xl font-bold mb-6 text-center text-blue-700">
        Add New Doctor Service
      </h2>
      <form onSubmit={formik.handleSubmit} className="space-y-6">
        {/* Service Name */}
        <div>
          <label className="block font-medium">Service Name</label>
          <input
            type="text"
            name="serviceName"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.serviceName}
            className="w-full border px-4 py-2 rounded mt-1"
          />
          {formik.touched.serviceName && formik.errors.serviceName && (
            <p className="text-red-500 text-sm">{formik.errors.serviceName}</p>
          )}
        </div>

        {/* Description */}
        <div>
          <label className="block font-medium">Description</label>
          <textarea
            name="description"
            rows={3}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.description}
            className="w-full border px-4 py-2 rounded mt-1"
          />
          {formik.touched.description && formik.errors.description && (
            <p className="text-red-500 text-sm">{formik.errors.description}</p>
          )}
        </div>

        {/* Fee and Discount */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block font-medium">Fee (₹)</label>
            <input
              type="text"
              name="fee"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.fee}
              className="w-full border px-4 py-2 rounded mt-1"
            />
            {formik.touched.fee && formik.errors.fee && (
              <p className="text-red-500 text-sm">{formik.errors.fee}</p>
            )}
          </div>
          <div>
            <label className="block font-medium">Discount (optional %)</label>
            <input
              type="text"
              name="discount"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.discount}
              className="w-full border px-4 py-2 rounded mt-1"
            />
          </div>
        </div>

        {/* Duration */}
        <div>
          <label className="block font-medium">Duration</label>
          <select
            name="duration"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.duration}
            className="w-full border px-4 py-2 rounded mt-1"
          >
            <option value="">Select Duration</option>
            <option value="15">15 Minutes</option>
            <option value="30">30 Minutes</option>
            <option value="45">45 Minutes</option>
            <option value="custom">Custom</option>
          </select>
          {formik.touched.duration && formik.errors.duration && (
            <p className="text-red-500 text-sm">{formik.errors.duration}</p>
          )}
        </div>

        {/* Custom Doctor Type */}
        {formik.values.duration === "custom" && (
          <div>
            <label className="block font-medium">
              Doctor Type (for custom)
            </label>
            <input
              type="text"
              name="customDoctorType"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.customDoctorType}
              className="w-full border px-4 py-2 rounded mt-1"
            />
            {formik.touched.customDoctorType &&
              formik.errors.customDoctorType && (
                <p className="text-red-500 text-sm">
                  {formik.errors.customDoctorType}
                </p>
              )}
          </div>
        )}

        {/* Availability */}
        <div>
          <label className="block font-medium">Availability</label>
          <select
            name="availability"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.availability}
            className="w-full border px-4 py-2 rounded mt-1"
          >
            <option value="">Select Availability</option>
            <option value="weekdays">Weekdays (Mon-Fri)</option>
            <option value="weekends">Weekends (Sat-Sun)</option>
            <option value="both">Both</option>
          </select>
          {formik.touched.availability && formik.errors.availability && (
            <p className="text-red-500 text-sm">{formik.errors.availability}</p>
          )}
        </div>

        {/* Image Upload */}
        <div>
          <label className="block font-medium">
            Upload Service Image (optional)
          </label>
          <div className="flex items-center gap-4 mt-2">
            <input
              type="file"
              accept="image/*"
              onChange={handleImageChange}
              className="border p-2 rounded"
            />
            {imagePreview && (
              <img
                src={imagePreview}
                alt="preview"
                className="w-16 h-16 object-cover rounded"
              />
            )}
          </div>
        </div>

        {/* Submit Button */}
        <div className="text-center">
          <button
            type="submit"
            className="bg-blue-600 text-white px-6 py-2 rounded-md hover:bg-blue-700 transition"
          >
            Submit Service
          </button>
        </div>
      </form>
    </div>
  );
};

export default DoctorAddServiceForm;
