"use client";

import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";

import { useSelector } from "react-redux";
import { useRouter } from "next/navigation";
import { RootState } from "@/redux/store";
import { useCreateRadiologyMutation } from "@/redux/features/services/radiology/profileApi";
// Reusable Form Field Component
export const FormField = ({ label, name, type = "text" }: any) => (
  <div className="flex flex-col gap-1">
    <label className="text-sm font-semibold text-gray-700">{label}</label>
    <Field
      name={name}
      type={type}
      className="border border-gray-300 px-4 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
    />
    <ErrorMessage
      name={name}
      component="div"
      className="text-red-500 text-sm"
    />
  </div>
);
const specializationOptions = [
  { value: "Cardiologist", label: "Yoga" },
  { value: "Dermatologist", label: "Musuleup" },
  { value: "Neurologist", label: "Running" },
  { value: "Orthopedic", label: "Orthopedic" },
  { value: "Pediatrician", label: "Pediatrician" },
  // add more as needed
];


const RadiologyProfile = () => {
  const [avatarPreview, setAvatarPreview] = useState<string | null>(null);
  // const [createDoctor, { isLoading, isSuccess }] = useCreateDoctorMutation();
const [createRadiology, { isLoading, isSuccess }] = useCreateRadiologyMutation();

const user = useSelector((state: RootState) => state.auth.user);
  const router = useRouter();

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

  useEffect(() => {
    if (isSuccess) router.push("/services");
  }, [isSuccess, router]);

  const initialValues = {
    userId: user?._id,
  
    registrationNumber: "",
    experience: "",
    gstNumber: "",
    licenceNumber: "",
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
    registrationNumber: Yup.string(),
    gstNumber: Yup.string()
      .matches(
        /^([0-9]{2}[A-Z]{5}[0-9]{4}[A-Z]{1}[1-9A-Z]{1}Z[0-9A-Z]{1})$/,
        "Invalid GST Number"
      )
      .required("GST Number is required"),
    licenceNumber: Yup.string(),
    address: Yup.string(),
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
      Ifsc: Yup.string()
        .matches(/^[A-Z]{4}0[A-Z0-9]{6}$/, "Invalid IFSC code")
        .required("Required"),
      accountNumber: Yup.string()
        .required("Account Number is required"),
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

   
    formData.append("location", JSON.stringify(values.location));
    formData.append("accountDetails", JSON.stringify(values.accountDetails));
    const exclude = ["avatar", "location", "accountDetails"];
    Object.keys(values).forEach((key) => {
      if (!exclude.includes(key)) formData.append(key, values[key]);
    });

    try {
      const res = await createRadiology(formData).unwrap();
      toast.success("Radiology profile Completed!");
      router.push("/services");
      console.log("Submitted:", res);
    } catch (err: any) {
      console.error("Error:", err);
      toast.error(err?.data?.message || "Failed to submit profile.");
    }
  };

  return (
    <div className="max-w-5xl mx-auto p-8 bg-white shadow-xl rounded-2xl my-10">
      <h3 className="text-2xl font-bold text-blue-400 mb-6 text-center">
       Complete your Radiology Profile
      </h3>

      <Formik
        initialValues={initialValues}
        enableReinitialize
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
      >
        {({ setFieldValue, values }) => (
          <Form className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* <div className="md:col-span-1">
              <label className="block text-sm font-semibold text-gray-700 mb-1">
                Specializations
              </label>
              <Select
                isMulti
                name="specialization"
                options={specializationOptions}
                className="basic-multi-select"
                classNamePrefix="select"
                onChange={(
                  selectedOptions: { value: string; label: string }[]
                ) =>
                  setFieldValue(
                    "specialization",
                    selectedOptions.map((opt) => opt.value)
                  )
                }
                value={specializationOptions.filter((opt) =>
                  values.specialization.includes(opt.value)
                )}
              />
              <ErrorMessage
                name="specialization"
                component="div"
                className="text-red-500 text-sm mt-1"
              />
            </div> */}

            {/* Basic Info */}
          
            <FormField label="AERB registration" name="licenceNumber" />
            <FormField label="GST Number" name="gstNumber" />
           
            {/* <FormField label="Clinic Address" name="address" /> */}

            {/* Geo Fields (Auto-Filled) */}
            <div className="md:col-span-2">
              <div className="flex items-center justify-between mb-2">
                {/* <h2 className="text-sm font-semibold text-gray-700">
                  Professional Location
                </h2> */}
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
                        // Update Formik fields
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

            {/* Account Information Section */}
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

            {/* Avatar Upload Section */}
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
                    <img
                      src={avatarPreview}
                      alt="Avatar Preview"
                      className="w-32 h-32 rounded-full object-cover border-2 border-gray-300 shadow"
                    />
                  </div>
                )}
              </div>
            </div>

            {/* Submit Button */}
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

export default RadiologyProfile;








