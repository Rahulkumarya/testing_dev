
"use client";

import { Formik, Form, Field, ErrorMessage, FieldArray } from "formik";
import * as Yup from "yup";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useSelector } from "react-redux";
import { useRouter } from "next/navigation";
import Select from "react-select";

import { store } from "@/redux/store";
import { useCreatePatientMutation } from "@/redux/features/patients/patientApi";

// Blood group options for dropdown
const bloodGroupOptions = [
  { value: "A+", label: "A+" },
  { value: "A-", label: "A-" },
  { value: "B+", label: "B+" },
  { value: "B-", label: "B-" },
  { value: "AB+", label: "AB+" },
  { value: "AB-", label: "AB-" },
  { value: "O+", label: "O+" },
  { value: "O-", label: "O-" },
];

// Reusable form field component
export const FormField = ({ label, name, type = "text", as = "input" }) => (
  <div className="flex flex-col gap-1">
    <label htmlFor={name} className="text-sm font-semibold text-gray-700">
      {label}
    </label>
    <Field
      id={name}
      name={name}
      type={type}
      as={as}
      className="border border-gray-300 px-4 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
    />
    <ErrorMessage
      name={name}
      component="div"
      className="text-red-500 text-sm"
    />
  </div>
);

const PatientProfileForm = () => {
  // Avatar preview state
  const [avatarPreview, setAvatarPreview] = useState<string | null>(null);
  // RTK Query mutation hook
  const [createPatient, { isLoading, isSuccess }] = useCreatePatientMutation();
  // Get current user from Redux
  const user = useSelector((state: typeof store) => state.auth.user);
  const router = useRouter();

  // Geolocation state
  const [geo, setGeo] = useState({
    lat: "",
    lon: "",
    city: "",
    state: "",
    pincode: "",
    address: "",
    landmark: "",
  });

  // Fetch geolocation on mount
  useEffect(() => {
    navigator.geolocation.getCurrentPosition(async (pos) => {
      const { latitude, longitude } = pos.coords;
      const resp = await fetch(
        `https://geocode.maps.co/reverse?lat=${latitude}&lon=${longitude}`
      );
      const data = await resp.json();
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

  // Redirect after successful creation
  useEffect(() => {
    if (isSuccess) {
      toast.success("Patient profile created successfully!");
      router.push("/");
    }
  }, [isSuccess, router]);

  // Initial form values
  const initialValues = {
    userId: user?._id || "",
    name: "",
    bloodGroup: "",
    dob: "",
    allergies: "",
    // emergencyContacts: one or more entries
    emergencyContacts: [{ name: "", phone: "", relation: "" }],
    location: {
      coordinates: [geo.lon, geo.lat],
      city: geo.city,
      state: geo.state,
      pincode: geo.pincode,
      address: geo.address,
      landmark: geo.landmark,
    },
    avatar: null as File | null,
  };

  // Validation schema
  const validationSchema = Yup.object().shape({
    name: Yup.string().required("Name is required"),
    bloodGroup: Yup.string().required("Blood group is required"),
    dob: Yup.date().required("Date of birth is required"),
    emergencyContacts: Yup.array()
      .of(
        Yup.object().shape({
          name: Yup.string().required("Contact name required"),
          phone: Yup.string().required("Phone number required"),
          relation: Yup.string(),
        })
      )
      .min(1, "Add at least one contact"),
    location: Yup.object().shape({
      coordinates: Yup.array().of(Yup.string().required()).length(2),
      city: Yup.string(),
      state: Yup.string(),
      pincode: Yup.string(),
      address: Yup.string(),
      landmark: Yup.string(),
    }),
  });

  // Avatar change handler
  const handleAvatarChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    setFieldValue: (field: string, value: any) => void
  ) => {
    const file = e.currentTarget.files?.[0] ?? null;
    setFieldValue("avatar", file);
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => setAvatarPreview(reader.result as string);
      reader.readAsDataURL(file);
    } else {
      setAvatarPreview(null);
    }
  };

  // Form submit handler
  const handleSubmit = async (values: typeof initialValues) => {
    const formData = new FormData();
    if (values.avatar) formData.append("avatar", values.avatar);
    formData.append(
      "location",
      JSON.stringify({
        coordinates: values.location.coordinates,
        city: values.location.city,
        state: values.location.state,
        pincode: values.location.pincode,
        address: values.location.address,
        landmark: values.location.landmark,
      })
    );
    formData.append("userId", values.userId);
    formData.append("name", values.name);
    formData.append("bloodGroup", values.bloodGroup);
    formData.append("dob", values.dob);
    formData.append("allergies", values.allergies);

    // Append each emergency contact
    values.emergencyContacts.forEach((contact, idx) => {
      formData.append(`emergencyContacts[${idx}][name]`, contact.name);
      formData.append(`emergencyContacts[${idx}][phone]`, contact.phone);
      formData.append(`emergencyContacts[${idx}][relation]`, contact.relation);
    });

    try {
      await createPatient(formData).unwrap();
    } catch (err: any) {
      console.error("Submission error:", err);
      toast.error(err.data?.message || "Failed to submit");
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-8 bg-white shadow-lg rounded-2xl my-10">
      <h1 className="text-3xl font-bold text-blue-600 mb-6 text-center">
        Create Patient Profile
      </h1>

      <Formik
        initialValues={initialValues}
        enableReinitialize
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
      >
        {({ setFieldValue, values }) => (
          <Form className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Basic fields */}
            <FormField label="Full Name" name="name" />

            <div className="flex flex-col gap-1">
              <label
                htmlFor="bloodGroup"
                className="text-sm font-semibold text-gray-700"
              >
                Blood Group
              </label>
              <Select
                inputId="bloodGroup"
                options={bloodGroupOptions}
                value={bloodGroupOptions.find(
                  (opt) => opt.value === values.bloodGroup
                )}
                onChange={(opt) => setFieldValue("bloodGroup", opt?.value)}
              />
              <ErrorMessage
                name="bloodGroup"
                component="div"
                className="text-red-500 text-sm"
              />
            </div>

            <FormField label="Date of Birth" name="dob" type="date" />
            <FormField label="Allergies (if any)" name="allergies" />

            {/* Emergency Contacts FieldArray */}
            <div className="md:col-span-2">
              <h2 className="text-xl font-semibold text-gray-800 mb-2">
                Emergency Contacts
              </h2>
              <FieldArray name="emergencyContacts">
                {(arrayHelpers) => (
                  <div className="space-y-4">
                    {values.emergencyContacts.map((_, idx) => (
                      <div
                        key={idx}
                        className="grid grid-cols-1 md:grid-cols-4 gap-4 items-end"
                      >
                        <div>
                          <label className="text-sm font-medium text-gray-700">
                            Name
                          </label>
                          <Field
                            name={`emergencyContacts[${idx}].name`}
                            className="w-full border px-3 py-2 rounded"
                          />
                          <ErrorMessage
                            name={`emergencyContacts[${idx}].name`}
                            component="div"
                            className="text-red-500 text-xs"
                          />
                        </div>
                        <div>
                          <label className="text-sm font-medium text-gray-700">
                            Phone
                          </label>
                          <Field
                            name={`emergencyContacts[${idx}].phone`}
                            className="w-full border px-3 py-2 rounded"
                          />
                          <ErrorMessage
                            name={`emergencyContacts[${idx}].phone`}
                            component="div"
                            className="text-red-500 text-xs"
                          />
                        </div>
                        <div>
                          <label className="text-sm font-medium text-gray-700">
                            Relation
                          </label>
                          <Field
                            name={`emergencyContacts[${idx}].relation`}
                            className="w-full border px-3 py-2 rounded"
                          />
                        </div>
                        <button
                          type="button"
                          onClick={() => arrayHelpers.remove(idx)}
                          className="text-red-600 hover:text-red-800"
                        >
                          Remove
                        </button>
                      </div>
                    ))}
                    <button
                      type="button"
                      onClick={() =>
                        arrayHelpers.push({ name: "", phone: "", relation: "" })
                      }
                      className="mt-2 bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
                    >
                      + Add Contact
                    </button>
                  </div>
                )}
              </FieldArray>
            </div>

            {/* Location fields omitted for brevity... */}
            {/* Location share button */}
            <div className="md:col-span-2">
              <button
                type="button"
                className="text-blue-600 underline text-sm mb-2"
                onClick={async () => {
                  if (!navigator.geolocation) {
                    return toast.error("Geolocation not supported");
                  }
                  navigator.geolocation.getCurrentPosition(async (pos) => {
                    const { latitude, longitude } = pos.coords;
                    const resp = await fetch(
                      `https://geocode.maps.co/reverse?lat=${latitude}&lon=${longitude}`
                    );
                    const data = await resp.json();
                    const loc = {
                      coordinates: [longitude.toString(), latitude.toString()],
                      city: data.address.city || "",
                      state: data.address.state || "",
                      pincode: data.address.postcode || "",
                      address: data.display_name || "",
                      landmark: data.address.suburb || "",
                    };
                    setFieldValue("location", loc);
                    toast.success("Location updated");
                  });
                }}
              >
                📍 Share Current Location
              </button>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <FormField label="City" name="location.city" />
                <FormField label="State" name="location.state" />
                <FormField label="Pincode" name="location.pincode" />
                <FormField label="Address" name="location.address" />
              </div>
            </div>

            {/* Avatar upload */}
            <div className="md:col-span-2 bg-gray-50 rounded-2xl shadow-inner p-6">
              <h2 className="text-xl font-semibold text-gray-800 mb-4 flex items-center gap-2">
                <span className="text-2xl">🖼️</span> Profile Avatar
              </h2>
              <div className="flex flex-col md:flex-row items-center gap-6">
                <input
                  type="file"
                  accept="image/*"
                  onChange={(e) => handleAvatarChange(e, setFieldValue)}
                />
                {avatarPreview && (
                  <img
                    src={avatarPreview}
                    alt="Preview"
                    className="w-24 h-24 rounded-full object-cover border-2 border-gray-300"
                  />
                )}
              </div>
            </div>
            {/* Avatar upload omitted... */}

            {/* Submit button */}
            <div className="md:col-span-2">
              <button
                type="submit"
                disabled={isLoading}
                className="w-full bg-blue-600 text-white py-3 rounded hover:bg-blue-700 transition"
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

export default PatientProfileForm;
