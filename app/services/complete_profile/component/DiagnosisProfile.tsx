"use client";

import { Formik, Form } from "formik";
import * as Yup from "yup";
import { useState } from "react";
import toast from "react-hot-toast";
import { useCreateDiagnosisMutation } from "@/redux/features/services/diagnosis/profileApi";
import Image from "next/image";

interface Location {
  coordinates: [string, string];
  city: string;
  state: string;
  pincode: string;
  address: string;
  landmark: string;
}

interface AccountDetails {
  HolderName: string;
  Ifsc: string;
  accountNumber: string;
  bankName: string;
}

interface FormValues {
  registrationNumber: string;
  experience: string;
  gstNumber: string;
  licenceNumber: string;
  location: Location;
  accountDetails: AccountDetails;
  avatar: File | null;
}

interface ApiError {
  data?: {
    message?: string;
  };
}

interface FormFieldProps {
  label: string;
  name: string;
  type?: string;
  value?: string;
  onChange?: (field: string, value: any) => void;
}

export const FormField = ({ label, name, type = "text", value, onChange }: FormFieldProps) => (
  <div className="flex flex-col gap-1">
    <label className="text-sm font-medium text-gray-700">{label}</label>
    <input
      type={type}
      name={name}
      value={value}
      onChange={(e) => onChange?.(name, e.target.value)}
      className="px-4 py-2 border rounded-md focus:ring-2 focus:ring-blue-500"
    />
  </div>
);

const DiagnosisProfile = () => {
  const [avatarPreview, setAvatarPreview] = useState<string | null>(null);
  const [createDiagnosis, { isLoading }] = useCreateDiagnosisMutation();

  const initialValues: FormValues = {
    registrationNumber: "",
    experience: "",
    gstNumber: "",
    licenceNumber: "",
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
    registrationNumber: Yup.string().required("Required"),
    experience: Yup.number().min(0).required("Required"),
    gstNumber: Yup.string(),
    licenceNumber: Yup.string(),
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

  const handleSubmit = async (values: FormValues) => {
    const formData = new FormData();
    if (values.avatar) formData.append("avatar", values.avatar);
  
    formData.append("location", JSON.stringify(values.location));
    formData.append("accountDetails", JSON.stringify(values.accountDetails));
    const exclude = ["avatar", "location", "accountDetails"];
    Object.keys(values).forEach((key) => {
      if (!exclude.includes(key)) formData.append(key, values[key]);
    });

    try {
      const res = await createDiagnosis(formData).unwrap();
      toast.success("Thanks for completing your profile!");
      console.log("Submitted:", res);
    } catch (err: unknown) {
      const error = err as ApiError;
      console.error("Error:", error);
      toast.error(error?.data?.message || "Failed to submit profile.");
    }
  };

  return (
    <div className="max-w-5xl mx-auto p-8 bg-white shadow-xl rounded-2xl my-10">
      <h1 className="text-2xl font-bold text-blue-700 mb-6 text-center">
       Complete your Diagnostic Profile
      </h1>

      <Formik
        initialValues={initialValues}
        enableReinitialize
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
      >
        {({ setFieldValue, values }) => (
          <Form className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <FormField label="Registration Number" name="registrationNumber" />
            <FormField
              label="Experience (in years)"
              name="experience"
              type="number"
            />
            <FormField label="GST Number" name="gstNumber" />
            <FormField label="License Number" name="licenceNumber" />

            <div className="md:col-span-2">
              <div className="flex items-center justify-between mb-2">
                <button
                  type="button"
                  className="text-blue-600 underline text-sm cursor-pointer"
                  onClick={async () => {
                    if (navigator.geolocation) {
                      navigator.geolocation.getCurrentPosition(async (pos) => {
                        const { latitude, longitude } = pos.coords;
                        const res = await fetch(
                          `https://geocode.maps.co/reverse?lat=${latitude}&lon=${longitude}`
                        );
                        const data = await res.json();
                        const locData = {
                          coordinates: [
                            longitude.toString(),
                            latitude.toString(),
                          ],
                          city: data.address.city || "",
                          state: data.address.state || "",
                          pincode: data.address.postcode || "",
                          address: data.display_name || "",
                          landmark:
                            data.address.suburb ||
                            data.address.neighbourhood ||
                            "",
                        };
                        setFieldValue("location", locData);
                        toast.success("Location fetched successfully!");
                      });
                    } else {
                      toast.error(
                        "Geolocation is not supported by this browser."
                      );
                    }
                  }}
                >
                  📍Share Location
                </button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <FormField label="City" name="location.city" />
                <FormField label="State" name="location.state" />
                <FormField label="Pincode" name="location.pincode" />
                <FormField label="Full Address" name="location.address" />
              </div>
            </div>

            <div className="md:col-span-2 bg-white rounded-2xl shadow-md px-8 py-6 mb-5 w-full">
              <h2 className="text-xl font-semibold text-gray-800 flex items-center gap-2 mb-6 border-b-2 border-gray-300 pb-3">
                <span className="text-2xl">💳</span>
                <span>Account Details</span>
              </h2>

              <div className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-x-8 gap-y-6">
                <FormField
                  label="Account Holder Name"
                  name="accountDetails.HolderName"
                />
                <FormField label="Bank Name" name="accountDetails.bankName" />
                <FormField label="IFSC Code" name="accountDetails.Ifsc" />
                <FormField
                  label="Account Number"
                  name="accountDetails.accountNumber"
                  value={values.accountDetails.accountNumber}
                  onChange={setFieldValue}
                />
              </div>
            </div>

            <div className="md:col-span-2 bg-white rounded-2xl shadow-md px-8 py-6 w-full">
              <h2 className="text-xl font-semibold text-gray-800 flex items-center gap-2 mb-6 border-b-2 border-gray-300 pb-3">
                <span className="text-2xl">🖼️</span>
                <span>Profile Avatar</span>
              </h2>

              <div className="flex flex-col md:flex-row items-center md:items-start gap-8">
                <div className="w-full md:w-1/2">
                  <input
                    type="file"
                    accept="image/*"
                    onChange={(e) => handleAvatarChange(e, setFieldValue)}
                    className="file-input file-input-bordered w-full"
                  />
                </div>
                {avatarPreview && (
                  <div className="flex justify-center md:justify-start">
                    <Image
                      src={avatarPreview}
                      alt="Avatar Preview"
                      width={128}
                      height={128}
                      className="rounded-full object-cover border-2 border-gray-300 shadow"
                    />
                  </div>
                )}
              </div>
            </div>

            <div className="md:col-span-2">
              <button
                type="submit"
                className="bg-blue-600 text-white px-6 py-3 rounded-lg w-full hover:bg-blue-700 transition"
                disabled={isLoading}
              >
                {isLoading ? "Submitting..." : "Submit Profile"}
              </button>
            </div>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default DiagnosisProfile;








