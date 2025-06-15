"use client";

import { Formik, Form, Field, ErrorMessage, FormikHelpers } from "formik";
import * as Yup from "yup";
import { useState } from "react";
import toast from "react-hot-toast";
import { useCreateDoctorMutation } from "@/redux/features/dprofile/profileApi";

interface Location {
  coordinates: [number, number];
  city: string;
  state: string;
  pincode: string;
  address: string;
  landmark: string;
}

interface AccountDetails {
  HolderName: string;
  Ifsc: string;
  accountNumber: number;
  bankName: string;
}

interface FormValues {
  specialization: string[];
  registrationNumber: string;
  experience: number;
  gstNumber: string;
  licenceNumber: string;
  gender: string;
  address: string;
  location: Location;
  accountDetails: AccountDetails;
  avatar: File | null;
}

const DoctorProfileForm = () => {
  const [avatarPreview, setAvatarPreview] = useState<string | null>(null);
  const [createDoctor, { isLoading }] = useCreateDoctorMutation();

  const initialValues: FormValues = {
    specialization: [""],
    registrationNumber: "",
    experience: 0,
    gstNumber: "",
    licenceNumber: "",
    gender: "",
    address: "",
    location: {
      coordinates: [0, 0],
      city: "",
      state: "",
      pincode: "",
      address: "",
      landmark: "",
    },
    accountDetails: {
      HolderName: "",
      Ifsc: "",
      accountNumber: 0,
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
    setFieldValue: (field: string, value: any) => void
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

  const handleSubmit = async (
    values: FormValues,
    { setSubmitting }: FormikHelpers<FormValues>
  ) => {
    const formData = new FormData();
    for (const key in values) {
      if (key === "avatar" && values.avatar) {
        formData.append("avatar", values.avatar);
      } else if (key === "location" || key === "accountDetails") {
        formData.append(key, JSON.stringify(values[key as keyof FormValues]));
      } else if (key === "specialization") {
        values.specialization.forEach((spec: string, index: number) =>
          formData.append(`specialization[${index}]`, spec)
        );
      } else {
        formData.append(key, String(values[key as keyof FormValues]));
      }
    }

    try {
      await createDoctor(formData).unwrap();
      toast.success("Profile created successfully!");
    } catch (error: unknown) {
      const err = error as { data?: { message?: string } };
      toast.error(err?.data?.message || "Creation failed");
      console.error("Error:", err);
    } finally {
      setSubmitting(false);
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
