"use client";

import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { useState } from "react";
import toast from "react-hot-toast";
import { useCreateDoctorMutation } from "@/redux/features/dprofile/profileApi";
import Select from "react-select";
// ✅ Doctor Profile Form Component
const DoctorProfileForm = () => {
  const [avatarPreview, setAvatarPreview] = useState<string | null>(null);
  const [createDoctor, { isLoading }] = useCreateDoctorMutation();

  const specializationOptions = [
    { value: "Cardiologist", label: "Cardiologist" },
    { value: "Dermatologist", label: "Dermatologist" },
    { value: "Neurologist", label: "Neurologist" },
    { value: "Pediatrician", label: "Pediatrician" },
    { value: "Psychiatrist", label: "Psychiatrist" },
    // ➕ Add more as needed
  ];
  // ✅ Initial Form Values
  const initialValues = {
    specialization: [specializationOptions],
    registrationNumber: "",
    experience: "",
    gstNumber: "",
    licenceNumber: "",
    gender: "",
    address: "",
    location: {
      coordinates: ["", ""],
      city: "",
      state: "",
      pincode: "",
      address: "",
      landmark: "",
    },
    accountDetails: {
      HolderName: "",
      Ifsc: "",
      accountNumber: "",
      bankName: "",
    },
    avatar: null,
  };

  // ✅ Validation Schema
  const validationSchema = Yup.object().shape({
    specialization: Yup.array().of(Yup.string().required("Required")),
    registrationNumber: Yup.string().required("Required"),
    experience: Yup.number().min(0).required("Required"),
    gstNumber: Yup.string(),
    licenceNumber: Yup.string(),
    gender: Yup.string(),
    address: Yup.string().required("Required"),
    location: Yup.object().shape({
      coordinates: Yup.array()
        .of(Yup.string().required("Required"))
        .length(2, "Must include both lat and long"),
      city: Yup.string(),
      state: Yup.string(),
      pincode: Yup.string(),
      address: Yup.string(),
      landmark: Yup.string(),
    }),
    accountDetails: Yup.object().shape({
      HolderName: Yup.string().required("Required"),
      Ifsc: Yup.string().required("Required"),
      accountNumber: Yup.string().required("Required"),
      bankName: Yup.string().required("Required"),
    }),
  });

  // ✅ Handle Avatar Image Preview
  const handleAvatarChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    setFieldValue: any
  ) => {
    const file = e.currentTarget.files?.[0];
    if (file) {
      setFieldValue("avatar", file);
      const reader = new FileReader();
      reader.onloadend = () => setAvatarPreview(reader.result as string);
      reader.readAsDataURL(file);
    } else {
      setFieldValue("avatar", null);
    }
  };

  // ✅ Handle Form Submit
  const handleSubmit = async (values: any) => {
    const formData = new FormData();

    if (values.avatar) {
      formData.append("avatar", values.avatar);
    }

    values.specialization.forEach((spec: string, i: number) =>
      formData.append(`specialization[${i}]`, spec)
    );

    formData.append("location", JSON.stringify(values.location));
    formData.append("accountDetails", JSON.stringify(values.accountDetails));

    const excludeKeys = [
      "avatar",
      "specialization",
      "location",
      "accountDetails",
    ];

    Object.keys(values).forEach((key) => {
      if (!excludeKeys.includes(key)) {
        formData.append(key, values[key]);
      }
    });

    try {
      const res = await createDoctor(formData).unwrap();
      toast.success("Doctor profile created successfully!");
      console.log("Submitted:", res);
    } catch (err: any) {
      console.error("Error submitting doctor form:", err);
      toast.error(err?.data?.message || "Failed to create doctor profile.");
    }
  };

  return (
    <div className="max-w-4xl mx-auto px-6 py-10 bg-white rounded-xl shadow-md">
      <h2 className="text-3xl font-semibold text-gray-800 mb-8">
        Doctor Profile
      </h2>

      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
      >
        {({ setFieldValue }) => (
          <Form className="grid gap-6 grid-cols-1 sm:grid-cols-2">
            {/* ✅ Specialization Multi-Select using react-select */}
            <div className="w-full sm:col-span-2">
              <label className="block mb-1 font-medium text-sm sm:text-base md:text-base lg:text-base xl:text-base">
                Specializations
              </label>
              <Select
                isMulti
                name="specialization"
                options={specializationOptions}
                className="react-select-container"
                classNamePrefix="select"
                onChange={(selectedOptions) =>
                  setFieldValue(
                    "specialization",
                    selectedOptions.map((opt) => opt.value)
                  )
                }
                placeholder="Select specializations..."
              />
              <ErrorMessage
                name="specialization"
                component="div"
                className="text-red-500 text-xs sm:text-sm mt-1"
              />
            </div>

            {/* Registration Number */}
            <div>
              <label className="block mb-1 font-medium">
                Registration Number
              </label>
              <Field name="registrationNumber" className="input" />
              <ErrorMessage
                name="registrationNumber"
                component="div"
                className="text-red-500 text-sm"
              />
            </div>

            {/* Experience */}
            <div>
              <label className="block mb-1 font-medium">
                Experience (Years)
              </label>
              <Field type="number" name="experience" className="input" />
              <ErrorMessage
                name="experience"
                component="div"
                className="text-red-500 text-sm"
              />
            </div>

            {/* Avatar Upload */}
            <div>
              <label className="block mb-1 font-medium">Profile Image</label>
              <input
                type="file"
                accept="image/*"
                onChange={(e) => handleAvatarChange(e, setFieldValue)}
                className="w-full"
              />
              {avatarPreview && (
                <img
                  src={avatarPreview}
                  alt="Avatar Preview"
                  className="mt-2 h-24 rounded"
                />
              )}
            </div>

            {/* Address Field */}
            <div className="sm:col-span-2">
              <label className="block font-medium mb-1">Primary Address</label>
              <Field name="address" className="input" />
              <ErrorMessage
                name="address"
                component="div"
                className="text-red-500 text-sm"
              />
            </div>

            {/* ✅ Geolocation Button */}
            <div className="sm:col-span-2">
              <button
                type="button"
                onClick={async () => {
                  if (navigator.geolocation) {
                    navigator.geolocation.getCurrentPosition(
                      async (position) => {
                        const { latitude, longitude } = position.coords;

                        setFieldValue("location.coordinates[0]", longitude);
                        setFieldValue("location.coordinates[1]", latitude);
                        toast.success("Location captured!");

                        try {
                          const res = await fetch(
                            `https://nominatim.openstreetmap.org/reverse?lat=${latitude}&lon=${longitude}&format=json`
                          );
                          const data = await res.json();
                          const address = data.address;

                          setFieldValue(
                            "location.city",
                            address.city || address.town || ""
                          );
                          setFieldValue("location.state", address.state || "");
                          setFieldValue(
                            "location.pincode",
                            address.postcode || ""
                          );
                          setFieldValue(
                            "location.landmark",
                            address.road || address.suburb || ""
                          );
                        } catch (err) {
                          console.error("Geocode fetch error:", err);
                          toast.error("Failed to fetch address.");
                        }
                      },
                      (err) => {
                        console.error(err);
                        toast.error("Unable to access location.");
                      }
                    );
                  } else {
                    toast.error("Geolocation is not supported.");
                  }
                }}
                className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
              >
                Share Location
              </button>
            </div>

            {/* Location Details */}
            <Field name="location.city" placeholder="City" className="input" />
            <Field
              name="location.state"
              placeholder="State"
              className="input"
            />
            <Field
              name="location.pincode"
              placeholder="Pincode"
              className="input"
            />
            <Field
              name="location.landmark"
              placeholder="Landmark"
              className="input"
            />

            {/* Bank Account Section */}
            <div className="sm:col-span-2 mt-4">
              <h3 className="text-xl font-semibold text-gray-700 mb-2">
                Bank Account Details
              </h3>
            </div>
            <Field
              name="accountDetails.HolderName"
              placeholder="Holder Name"
              className="input"
            />
            <Field
              name="accountDetails.bankName"
              placeholder="Bank Name"
              className="input"
            />
            <Field
              name="accountDetails.accountNumber"
              placeholder="Account Number"
              className="input"
            />
            <Field
              name="accountDetails.Ifsc"
              placeholder="IFSC Code"
              className="input"
            />

            {/* Submit Button */}
            <div className="sm:col-span-2">
              <button
                type="submit"
                disabled={isLoading}
                className="bg-green-600 text-white px-6 py-2 rounded hover:bg-green-700"
              >
                {isLoading ? "Submitting..." : "Create Doctor Profile"}
              </button>
            </div>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default DoctorProfileForm;



// 2nd
"use client";

import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { useState } from "react";
import toast from "react-hot-toast";
import { useCreateDoctorMutation } from "@/redux/features/dprofile/profileApi";

const DoctorProfileForm = () => {
  const [avatarPreview, setAvatarPreview] = useState<string | null>(null);
  const [createDoctor, { isLoading }] = useCreateDoctorMutation();

  const initialValues = {
    specialization: [""],
    registrationNumber: "",
    experience: "",
    gstNumber: "",
    licenceNumber: "",
    gender: "",
    address: "",
    location: {
      coordinates: ["", ""],
      city: "",
      state: "",
      pincode: "",
      address: "",
      landmark: "",
    },
    accountDetails: {
      HolderName: "",
      Ifsc: "",
      accountNumber: "",
      bankName: "",
    },
    avatar: null,
  };

  const validationSchema = Yup.object().shape({
    specialization: Yup.array().of(Yup.string().required("Required")),
    registrationNumber: Yup.string().required("Required"),
    experience: Yup.number().min(0).required("Required"),
    gstNumber: Yup.string(),
    licenceNumber: Yup.string(),
    gender: Yup.string(),
    address: Yup.string().required("Required"),
    location: Yup.object().shape({
      coordinates: Yup.array()
        .of(Yup.number().typeError("Must be a number"))
        .length(2, "Must have 2 coordinates"),
      city: Yup.string(),
      state: Yup.string(),
      pincode: Yup.string(),
      address: Yup.string(),
      landmark: Yup.string(),
    }),
    accountDetails: Yup.object().shape({
      HolderName: Yup.string().required("Holder name is required"),
      Ifsc: Yup.string().required("IFSC is required"),
      accountNumber: Yup.number()
        .typeError("Must be a number")
        .required("Account Number is required"),
      bankName: Yup.string().required("Bank Name is required"),
    }),
  });

  const handleAvatarChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    setFieldValue: any
  ) => {
    const file = e.currentTarget.files?.[0];
    if (file) {
      setFieldValue("avatar", file);
      const reader = new FileReader();
      reader.onloadend = () => setAvatarPreview(reader.result as string);
      reader.readAsDataURL(file);
    } else {
      setFieldValue("avatar", null);
    }
  };

  const handleSubmit = async (values: any) => {
    const formData = new FormData();
    for (const key in values) {
      if (key === "avatar" && values.avatar) {
        formData.append("avatar", values.avatar);
      } else if (key === "location" || key === "accountDetails") {
        formData.append(key, JSON.stringify(values[key]));
      } else if (key === "specialization") {
        values.specialization.forEach((spec: string, index: number) =>
          formData.append(`specialization[${index}]`, spec)
        );
      } else {
        formData.append(key, values[key]);
      }
    }

    try {
      await createDoctor(formData).unwrap();
      toast.success("Profile created successfully!");
    } catch (err: any) {
      toast.error(err?.data?.message || "Creation failed");
      console.error("Error:", err);
    }
  };

  return (
    <div className="max-w-5xl mx-auto px-6 py-10 bg-white rounded-xl shadow-lg border border-gray-100">
      <h2 className="text-3xl sm:text-4xl font-bold text-gray-800 mb-10 text-center">
        Create Doctor Profile
      </h2>
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
      >
        {({ setFieldValue }) => (
          <Form className="grid gap-6 grid-cols-1 md:grid-cols-2">
            <div>
              <label className="block font-medium mb-1">Specialization</label>
              <Field
                name="specialization[0]"
                placeholder="e.g. Cardiologist"
                className="w-full px-4 py-2 border rounded-md focus:ring-2 focus:ring-blue-500"
              />
              <ErrorMessage
                name="specialization[0]"
                component="div"
                className="text-red-500 text-sm mt-1"
              />
            </div>

            <div>
              <label className="block font-medium mb-1">
                Registration Number
              </label>
              <Field
                name="registrationNumber"
                className="w-full px-4 py-2 border rounded-md focus:ring-2 focus:ring-blue-500"
              />
              <ErrorMessage
                name="registrationNumber"
                component="div"
                className="text-red-500 text-sm mt-1"
              />
            </div>

            <div>
              <label className="block font-medium mb-1">
                Experience (Years)
              </label>
              <Field
                name="experience"
                type="number"
                className="w-full px-4 py-2 border rounded-md focus:ring-2 focus:ring-blue-500"
              />
              <ErrorMessage
                name="experience"
                component="div"
                className="text-red-500 text-sm mt-1"
              />
            </div>

            <div>
              <label className="block font-medium mb-1">GST Number</label>
              <Field
                name="gstNumber"
                className="w-full px-4 py-2 border rounded-md focus:ring"
              />
            </div>

            <div>
              <label className="block font-medium mb-1">Licence Number</label>
              <Field
                name="licenceNumber"
                className="w-full px-4 py-2 border rounded-md focus:ring"
              />
            </div>

            <div className="md:col-span-2">
              <label className="block font-medium mb-1">Address</label>
              <Field
                name="address"
                className="w-full px-4 py-2 border rounded-md focus:ring"
              />
              <ErrorMessage
                name="address"
                component="div"
                className="text-red-500 text-sm mt-1"
              />
            </div>

            <div className="md:col-span-2">
              <label className="block font-medium mb-2">Share Location</label>
              <button
                type="button"
                onClick={() => {
                  if (navigator.geolocation) {
                    navigator.geolocation.getCurrentPosition((position) => {
                      const { latitude, longitude } = position.coords;
                      setFieldValue("location.coordinates[0]", longitude);
                      setFieldValue("location.coordinates[1]", latitude);
                      toast.success("Location captured successfully!");
                    });
                  } else {
                    toast.error(
                      "Geolocation is not supported by this browser."
                    );
                  }
                }}
                className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
              >
                Capture Location
              </button>
            </div>

            <div className="md:col-span-2">
              <label className="block font-medium mb-1">Upload Avatar</label>
              <input
                type="file"
                accept="image/*"
                onChange={(e) => handleAvatarChange(e, setFieldValue)}
                className="w-full px-4 py-2 border rounded-md"
              />
              {avatarPreview && (
                <img
                  src={avatarPreview}
                  alt="Avatar Preview"
                  className="mt-4 w-32 h-32 object-cover rounded-full border"
                />
              )}
            </div>

            <div className="md:col-span-2 flex justify-end">
              <button
                type="submit"
                disabled={isLoading}
                className="bg-green-600 hover:bg-green-700 text-white font-semibold px-6 py-2 rounded-md shadow-md transition"
              >
                {isLoading ? "Submitting..." : "Submit"}
              </button>
            </div>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default DoctorProfileForm;
