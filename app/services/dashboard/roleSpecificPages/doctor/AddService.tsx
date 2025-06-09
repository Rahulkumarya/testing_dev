"use client";

import React, { useState, useEffect } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { FaUpload, FaEdit } from "react-icons/fa";
import { useSelector } from "react-redux";
import { store } from "../../../../../redux/store";
import { useCreateDoctorServiceMutation } from "@/redux/features/services/dprofile/ServiceApi";
import toast from "react-hot-toast";

const DoctorAddServiceForm = () => {
  // For image preview
  const [imagePreview, setImagePreview] = useState<string | null>(null);

  // Edit mode toggle for the form
  const [editMode, setEditMode] = useState(true);

  // Discount calculation
  const [discountAmount, setDiscountAmount] = useState<number | null>(null);

  // Mutation to submit the doctor service
  const [createDoctorService, { isLoading, isError }] =
    useCreateDoctorServiceMutation();

  // Get user from redux store
  const user = useSelector((state: store) => state.auth.user);

  // Geolocation state for location fields
  const [geo, setGeo] = useState({
    lat: "",
    lon: "",
    city: "",
    state: "",
    pincode: "",
    address: "",
    landmark: "",
  });

  // Fetch user's current location using Geolocation API on component mount
  useEffect(() => {
    navigator.geolocation.getCurrentPosition(async (pos) => {
      const { latitude, longitude } = pos.coords;
      const response = await fetch(
        `https://geocode.maps.co/reverse?lat=${latitude}&lon=${longitude}`
      );
      const data = await response.json();

      // Fill geo fields with API data
      setGeo({
        lat: latitude.toString(),
        lon: longitude.toString(),
        city: data.address.city || "",
        state: data.address.state || "",
        pincode: data.address.postcode || "",
        address: data.display_name || "",
        landmark: data.address.suburb || "",
      });
    });
  }, []);

  // Formik setup for form state and validation
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
      location: {
        coordinates: [geo.lon, geo.lat],
        city: geo.city,
        state: geo.state,
        pincode: geo.pincode,
        address: geo.address,
        landmark: geo.landmark,
      },
      image: null as File | null,
    },

    // Yup validation rules
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
      location: Yup.object().shape({
        coordinates: Yup.array()
          .of(Yup.string().required("Required"))
          .length(2),
        city: Yup.string(),
        state: Yup.string(),
        pincode: Yup.string(),
        address: Yup.string(),
        landmark: Yup.string(),
      }),
      image: Yup.mixed().nullable(),
    }),

    // Form submit handler
    onSubmit: async (values, { resetForm }) => {
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
        formData.append("location", JSON.stringify(values.location));
        if (values.image) {
          formData.append("image", values.image);
        }

        const res = await createDoctorService(formData).unwrap();
        toast.success("Service submitted successfully!");
        console.log("Service created:", res);
        resetForm(); // ✅ Clear form
      } catch (error) {
        console.error("Error submitting service:", error);
        alert("Failed to submit service.");
      }
    },
  });

  // Calculate discount when fee or estimate changes
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

  // Handle image file selection and preview
  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.currentTarget.files?.[0];
    if (file) {
      formik.setFieldValue("image", file);
      const reader = new FileReader();
      reader.onloadend = () => setImagePreview(reader.result as string);
      reader.readAsDataURL(file);
    }
  };

  // 🧾 UI STARTS HERE
  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      <div className="flex flex-col md:flex-row gap-6">
        {/* Left Side: Form */}
        <div className="w-full md:w-1/2 bg-white p-6 shadow-lg rounded-xl">
          <h2 className="text-xl font-bold text-blue-700 mb-4">
            Doctor Service Form
          </h2>

          <form onSubmit={formik.handleSubmit} className="space-y-4">
            <input
             
              type="text"
              name="serviceName"
              placeholder="Service Name"
              onChange={formik.handleChange}
              value={formik.values.serviceName}
              className="w-full border px-4 py-2 rounded"
            />

            <textarea
             
              name="description"
              placeholder="Service Description"
              rows={3}
              onChange={formik.handleChange}
              value={formik.values.description}
              className="w-full border px-4 py-2 rounded"
            />

            {/* Fee and Estimate */}
            <div className="flex gap-4">
              <input
             
                type="text"
                name="fee"
                placeholder="Fee (₹)"
                onChange={formik.handleChange}
                value={formik.values.fee}
                className="w-full border px-4 py-2 rounded"
              />
              <input
             
                type="text"
                name="estimatedPrice"
                placeholder="Estimated Price (₹)"
                onChange={formik.handleChange}
                value={formik.values.estimatedPrice}
                className="w-full border px-4 py-2 rounded"
              />
            </div>

            {/* Duration Select */}
            <select
             
              name="duration"
              onChange={formik.handleChange}
              value={formik.values.duration}
              className="w-full border px-4 py-2 rounded"
            >
              <option value="">Select Duration</option>
              <option value="15">15 Minutes</option>
              <option value="30">30 Minutes</option>
              <option value="45">45 Minutes</option>
              <option value="custom">Custom</option>
            </select>

            {/* Show doctor type input only if duration = custom */}
            {formik.values.duration === "custom" && (
              <input
               
                type="text"
                name="customDoctorType"
                placeholder="Doctor Type"
                onChange={formik.handleChange}
                value={formik.values.customDoctorType}
                className="w-full border px-4 py-2 rounded"
              />
            )}

            {/* Availability Dropdown */}
            <select
             
              name="availability"
              onChange={formik.handleChange}
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

            {/* Share Location Button */}
            <button
              type="button"
              className="text-blue-600 underline text-sm"
              onClick={async () => {
                if (navigator.geolocation) {
                  navigator.geolocation.getCurrentPosition(async (pos) => {
                    const { latitude, longitude } = pos.coords;
                    const res = await fetch(
                      `https://geocode.maps.co/reverse?lat=${latitude}&lon=${longitude}`
                    );
                    const data = await res.json();
                    const locData = {
                      coordinates: [longitude.toString(), latitude.toString()],
                      city: data.address.city || "",
                      state: data.address.state || "",
                      pincode: data.address.postcode || "",
                      address: data.display_name || "",
                      landmark:
                        data.address.suburb || data.address.neighbourhood || "",
                    };
                    formik.setFieldValue("location", locData);
                    toast.success("Location fetched successfully!");
                  });
                } else {
                  toast.error("Geolocation is not supported.");
                }
              }}
            >
              📍Share Location
            </button>

            {/* Submit Button */}
            <button
              type="submit"
              className="bg-blue-600 text-white w-full py-2 rounded hover:bg-blue-700"
            >
              Submit Service
            </button>
          </form>
        </div>

        {/* Right Side: Preview Card */}
        <div className="w-full md:w-1/2 bg-white p-6 shadow-xl rounded-xl flex flex-col items-center text-center">
          {imagePreview && (
            <img
              src={imagePreview}
              alt="Service"
              className="w-full max-w-sm h-40 object-cover rounded-lg mb-4"
            />
          )}
          <h3 className="text-lg font-bold">{formik.values.serviceName}</h3>
          <p className="text-sm text-gray-600">
            {formik.values.description || "No description yet"}
          </p>
          <div className="text-gray-600 mt-2">
            <p>
              <strong>Fee:</strong> ₹{formik.values.fee || "0"}
            </p>
            <p>
              <strong>Estimated:</strong> ₹{formik.values.estimatedPrice || "0"}
            </p>
            {discountAmount !== null && (
              <p className="text-green-600 font-semibold">
                You save ₹{discountAmount.toFixed(2)}
              </p>
            )}
          </div>
          <p className="text-sm mt-2 text-gray-500">
            <strong>Duration:</strong> {formik.values.duration}
            {formik.values.customDoctorType &&
              ` (${formik.values.customDoctorType})`}
          </p>
          <p className="text-sm text-gray-500">
            <strong>Availability:</strong> {formik.values.availability}
          </p>
        </div>
      </div>
    </div>
  );
};

export default DoctorAddServiceForm;
