"use client";

import { Formik, Form, Field, ErrorMessage, FieldArray } from "formik";
import * as Yup from "yup";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useCreateDoctorMutation } from "@/redux/features/dprofile/profileApi";
import { useSelector } from "react-redux";
import { useRouter } from "next/navigation";
import Select from "react-select";
import { store } from "@/redux/store";

// Helper for form field
const FormField = ({ label, name, type = "text" }: any) => (
  <div className="flex flex-col">
    <label className="font-medium mb-1">{label}</label>
    <Field
      name={name}
      type={type}
      className="input border border-gray-300 px-3 py-2 rounded-md text-black"
    />
    <ErrorMessage
      name={name}
      component="div"
      className="text-red-500 text-sm"
    />
  </div>
);

const DoctorProfileForm = () => {
  const [avatarPreview, setAvatarPreview] = useState<string | null>(null);
  const [createDoctor, { isLoading, isSuccess }] = useCreateDoctorMutation();
  const user = useSelector((state: store) => state.auth.user);
  const router = useRouter();

  // Get location using Geolocation API
  useEffect(() => {
    navigator.geolocation.getCurrentPosition(async (pos) => {
      const { latitude, longitude } = pos.coords;
      const response = await fetch(
        `https://geocode.maps.co/reverse?lat=${latitude}&lon=${longitude}`
      );
      const data = await response.json();
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

  const [geo, setGeo] = useState({
    lat: "",
    lon: "",
    city: "",
    state: "",
    pincode: "",
    address: "",
    landmark: "",
  });

  useEffect(() => {
    if (isSuccess) router.push("/");
  }, [isSuccess, router]);

  const initialValues = {
    userId: user?._id,
    specialization: [""],
    registrationNumber: "",
    experience: "",
    gstNumber: "",
    licenceNumber: "",
    gender: "",
    address: "",
    location: {
      coordinates: [geo.lon, geo.lat],
      city: geo.city,
      state: geo.state,
      pincode: geo.pincode,
      address: geo.address,
      landmark: geo.landmark,
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
    userId: Yup.string(),
    specialization: Yup.array().of(Yup.string().required("Required")),
    registrationNumber: Yup.string().required("Required"),
    experience: Yup.number().min(0).required("Required"),
    gstNumber: Yup.string(),
    licenceNumber: Yup.string(),
    gender: Yup.string(),
    address: Yup.string().required("Required"),
    location: Yup.object().shape({
      coordinates: Yup.array().of(Yup.string().required("Required")).length(2),
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
    if (values.avatar) formData.append("avatar", values.avatar);
    values.specialization.forEach((spec: string, i: number) =>
      formData.append(`specialization[${i}]`, spec)
    );
    formData.append("location", JSON.stringify(values.location));
    formData.append("accountDetails", JSON.stringify(values.accountDetails));
    const exclude = ["avatar", "specialization", "location", "accountDetails"];
    Object.keys(values).forEach((key) => {
      if (!exclude.includes(key)) formData.append(key, values[key]);
    });

    try {
      const res = await createDoctor(formData).unwrap();
      toast.success("Doctor profile created!");
      console.log("Submitted:", res);
    } catch (err: any) {
      console.error("Error:", err);
      toast.error(err?.data?.message || "Failed to submit profile.");
    }
  };

  return (
    <div className="max-w-6xl mx-auto p-6 bg-white shadow-md rounded-md">
      <h1 className="text-2xl font-bold mb-6">Doctor Profile</h1>
      <Formik
        initialValues={initialValues}
        enableReinitialize
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
      >
        {({ setFieldValue, values }) => (
          <Form className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Specialization (multiple) */}
            <div className="col-span-1 md:col-span-2">
              <label className="font-medium">Specializations</label>
              <FieldArray name="specialization">
                {({ push, remove }) => (
                  <div className="flex flex-col gap-2 mt-2">
                    {values.specialization.map((_: any, index: number) => (
                      <div key={index} className="flex gap-2 items-center">
                        <Field
                          name={`specialization[${index}]`}
                          className="flex-1 border px-3 py-2 rounded-md text-black"
                        />
                        {index > 0 && (
                          <button
                            type="button"
                            onClick={() => remove(index)}
                            className="text-red-500"
                          >
                            Remove
                          </button>
                        )}
                      </div>
                    ))}
                    <button
                      type="button"
                      onClick={() => push("")}
                      className="text-blue-500 mt-1"
                    >
                      + Add More
                    </button>
                  </div>
                )}
              </FieldArray>
            </div>

            <FormField label="Registration Number" name="registrationNumber" />
            <FormField
              label="Experience (years)"
              name="experience"
              type="number"
            />
            <FormField label="GST Number" name="gstNumber" />
            <FormField label="Licence Number" name="licenceNumber" />
            <FormField label="Gender" name="gender" />
            <FormField label="Clinic Address" name="address" />

            {/* Geo Coordinates & Address */}
            <FormField label="Longitude" name="location.coordinates[0]" />
            <FormField label="Latitude" name="location.coordinates[1]" />
            <FormField label="City" name="location.city" />
            <FormField label="State" name="location.state" />
            <FormField label="Pincode" name="location.pincode" />
            <FormField label="Full Address" name="location.address" />
            <FormField label="Landmark" name="location.landmark" />

            {/* Bank Details */}
            <FormField
              label="Account Holder Name"
              name="accountDetails.HolderName"
            />
            <FormField label="IFSC Code" name="accountDetails.Ifsc" />
            <FormField
              label="Account Number"
              name="accountDetails.accountNumber"
            />
            <FormField label="Bank Name" name="accountDetails.bankName" />

            {/* Avatar Upload */}
            <div>
              <label>Profile Avatar</label>
              <input
                type="file"
                name="avatar"
                accept="image/*"
                onChange={(e) => handleAvatarChange(e, setFieldValue)}
                className="mt-2"
              />
              {avatarPreview && (
                <img
                  src={avatarPreview}
                  alt="Avatar Preview"
                  className="mt-2 w-24 h-24 object-cover rounded-full"
                />
              )}
            </div>

            <div className="md:col-span-2">
              <button
                type="submit"
                className="bg-blue-600 text-white px-6 py-2 rounded-md hover:bg-blue-700 w-full"
                disabled={isLoading}
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
