"use client"
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { useEffect, useState } from "react";
import { useCreateDoctorProfileMutation } from "@/redux/features/dprofile/profileSlice";
import toast from "react-hot-toast";
import axiosInstance from "@/app/utils/axiosInstance";
import { useCreateDoctorMutation } from "@/redux/features/dprofile/profileApi";
import { useGetDoctorsQuery as useDoctorsQuery } from "@/redux/features/dprofile/profileApi";
import { useGetDoctorByIdQuery ,useDeleteDoctorMutation} from "@/redux/features/dprofile/profileApi";

import { store } from "@/redux/store";
import { useSelector } from "react-redux";
const DoctorProfileForm = () => {
  const [avatarPreview, setAvatarPreview] = useState<string | null>(null);
  const [selectedDoctorId, setSelectedDoctorId] = useState<string | null>(null);
// const [createDoctorProfile, { isLoading }] = useCreateDoctorProfileMutation();
const [createDoctor, { isLoading,data}] = useCreateDoctorMutation();
// const [doctors,{isLoading,data,error}]= useGetDoctorsQuery()
const { data: doctors, error } = useDoctorsQuery();


const {
  data: doctorDetail,
  error: doctorDetailError,
  isLoading: isDoctorDetailLoading,
} = useGetDoctorByIdQuery(selectedDoctorId!, {
  skip: !selectedDoctorId, // don't run unless ID is set
});

// Correct usage: get the trigger and the mutation state object
const [deleteDoctor, { isLoading: isDeleting, error: deleteError }] =
  useDeleteDoctorMutation();

const handleDeleteDoctor = async () => {
  if (!selectedDoctorId) return;

  const confirmed = window.confirm(
    "Are you sure you want to delete this doctor?"
  );
  if (!confirmed) return;

  try {
    await deleteDoctor(selectedDoctorId).unwrap();
    alert("Doctor deleted successfully.");
    setSelectedDoctorId(null); // Clear selection after delete
  } catch (err: any) {
    console.error("Delete failed:", err);
    alert("Failed to delete the doctor.");
  }
};


// useEffect(()=>{
//   if(doctorDetail){
//     console.log(`doctorDetails is `, doctorDetail)
//   }
// },[doctorDetail])

const doctorList = doctors?.doctor ?? [];


useEffect(() => {
  if (doctors) {
    console.log("Doctors array is:", doctors.doctor);
    console.log("Fetched doctors:", doctors);
  }
}, [doctors]);



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
    gender: Yup.string().required("Required"),
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
      setFieldValue("avatar", file); // stores in Formik state
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
      } else if (key === "location") {
        formData.append("location", JSON.stringify(values.location));
      } else if (key === "specialization") {
        values.specialization.forEach((spec: string, index: number) =>
          formData.append(`specialization[${index}]`, spec)
        );
      } else if (key === "accountDetails") {
        for (const accKey in values.accountDetails) {
          formData.append(
            `accountDetails[${accKey}]`,
            values.accountDetails[accKey]
          );
        }
      } else {
        formData.append(key, values[key]);
      }
    }

    try {
      const res = await createDoctor(formData).unwrap();
      console.log(`formData without stringify`, formData);
      console.log(`avatar file`, formData.get("avatar") instanceof File);
      const avatarFile = formData.get("avatar");
      console.log("Avatar file object:", avatarFile);
      console.log("Avatar type:", Object.prototype.toString.call(avatarFile));

      toast.success("Profile updated successfully!");
      console.log("Response data is:", res);
    } catch (err: any) {
      toast.error(err?.data?.message || "Update failed");
      console.error("Error:", err);
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
            {/* Specialization */}
            <div>
              <label className="block text-gray-700 font-medium mb-1">
                Specialization
              </label>
              <Field
                name="specialization[0]"
                placeholder="e.g. Cardiologist"
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <ErrorMessage
                name="specialization[0]"
                component="div"
                className="text-red-500 text-sm mt-1"
              />
            </div>

            {/* Registration Number */}
            <div>
              <label className="block text-gray-700 font-medium mb-1">
                Registration Number
              </label>
              <Field
                name="registrationNumber"
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <ErrorMessage
                name="registrationNumber"
                component="div"
                className="text-red-500 text-sm mt-1"
              />
            </div>

            {/* Experience */}
            <div>
              <label className="block text-gray-700 font-medium mb-1">
                Experience (Years)
              </label>
              <Field
                name="experience"
                type="number"
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <ErrorMessage
                name="experience"
                component="div"
                className="text-red-500 text-sm mt-1"
              />
            </div>

            {/* GST */}
            <div>
              <label className="block text-gray-700 font-medium mb-1">
                GST Number (Optional)
              </label>
              <Field
                name="gstNumber"
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none"
              />
            </div>

            {/* Licence */}
            <div>
              <label className="block text-gray-700 font-medium mb-1">
                Licence Number (Optional)
              </label>
              <Field
                name="licenceNumber"
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none"
              />
            </div>

            {/* Gender */}
            <div>
              <label className="block text-gray-700 font-medium mb-1">
                Gender
              </label>
              <Field
                as="select"
                name="gender"
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none"
              >
                <option value="">Select Gender</option>
                <option value="Male">Male</option>
                <option value="Female">Female</option>
                <option value="Other">Other</option>
              </Field>
              <ErrorMessage
                name="gender"
                component="div"
                className="text-red-500 text-sm mt-1"
              />
            </div>

            {/* Address */}
            <div className="sm:col-span-2">
              <label className="block text-gray-700 font-medium mb-1">
                Primary Address
              </label>
              <Field
                name="address"
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none"
              />
              <ErrorMessage
                name="address"
                component="div"
                className="text-red-500 text-sm mt-1"
              />
            </div>

            {/* Location Sharing */}
            <div className="sm:col-span-2">
              <label className="block text-gray-700 font-medium mb-2">
                Share Location
              </label>
              <button
                type="button"
                onClick={() => {
                  if (navigator.geolocation) {
                    navigator.geolocation.getCurrentPosition(
                      async (position) => {
                        const { latitude, longitude } = position.coords;

                        // Set coordinates
                        setFieldValue("location.coordinates[0]", longitude);
                        setFieldValue("location.coordinates[1]", latitude);

                        toast.success("Location captured successfully!");

                        try {
                          // Reverse Geocode using OpenStreetMap (Nominatim)
                          const res = await fetch(
                            `https://nominatim.openstreetmap.org/reverse?lat=${latitude}&lon=${longitude}&format=json`
                          );
                          const data = await res.json();
                          console.log(`longtitude data is `, data);
                          const address = data.address;

                          // Set auto-filled values
                          if (
                            address.city ||
                            address.town ||
                            address.state_district
                          )
                            setFieldValue(
                              "location.city",
                              address.city ||
                                address.town ||
                                address.state_district
                            );
                          if (address.state)
                            setFieldValue("location.state", address.state);
                          if (address.postcode)
                            setFieldValue("location.pincode", address.postcode);
                          if (address.road || address.suburb)
                            setFieldValue(
                              "location.landmark",
                              address.road || address.suburb
                            );
                        } catch (error) {
                          toast.error(
                            "Failed to fetch address from coordinates"
                          );
                          console.error("Geocoding error:", error);
                        }
                      },
                      (error) => {
                        toast.error("Unable to retrieve location");
                        console.error(error);
                      }
                    );
                  } else {
                    toast.error(
                      "Geolocation is not supported by this browser."
                    );
                  }
                }}
                className="bg-green-600 text-white px-4 py-2 rounded-md hover:bg-green-700"
              >
                Share Location
              </button>
            </div>

            {/* City, State, Pincode, Landmark */}
            <div>
              <label className="block text-gray-700 font-medium mb-1">
                City
              </label>
              <Field name="location.city" className="input" />
            </div>
            <div>
              <label className="block text-gray-700 font-medium mb-1">
                State
              </label>
              <Field name="location.state" className="input" />
            </div>
            <div>
              <label className="block text-gray-700 font-medium mb-1">
                Pincode
              </label>
              <Field name="location.pincode" className="input" />
            </div>
            <div>
              <label className="block text-gray-700 font-medium mb-1">
                Landmark
              </label>
              <Field name="location.landmark" className="input" />
            </div>

            {/* Account Details  */}
            {/* Account Details Section */}
            <div className="sm:col-span-2">
              <h3 className="text-xl font-semibold text-gray-800 mb-2">
                Bank Account Details
              </h3>
            </div>

            <div>
              <label className="block text-gray-700 font-medium mb-1">
                Account Holder Name
              </label>
              <Field
                name="accountDetails.HolderName"
                className="input"
                placeholder="e.g. Rahul Kumar"
              />
              <ErrorMessage
                name="accountDetails.HolderName"
                component="div"
                className="text-red-500 text-sm mt-1"
              />
            </div>

            <div>
              <label className="block text-gray-700 font-medium mb-1">
                IFSC Code
              </label>
              <Field
                name="accountDetails.Ifsc"
                className="input"
                placeholder="e.g. SBIN0001234"
              />
              <ErrorMessage
                name="accountDetails.Ifsc"
                component="div"
                className="text-red-500 text-sm mt-1"
              />
            </div>

            <div>
              <label className="block text-gray-700 font-medium mb-1">
                Account Number
              </label>
              <Field
                name="accountDetails.accountNumber"
                className="input"
                placeholder="e.g. 1234567890"
              />
              <ErrorMessage
                name="accountDetails.accountNumber"
                component="div"
                className="text-red-500 text-sm mt-1"
              />
            </div>

            <div>
              <label className="block text-gray-700 font-medium mb-1">
                Bank Name
              </label>
              <Field
                name="accountDetails.bankName"
                className="input"
                placeholder="e.g. State Bank of India"
              />
              <ErrorMessage
                name="accountDetails.bankName"
                component="div"
                className="text-red-500 text-sm mt-1"
              />
            </div>

            {/* Avatar Upload */}
            <div className="sm:col-span-2">
              <label className="block text-gray-700 font-medium mb-1">
                Avatar (Optional)
              </label>
              <input
                type="file"
                accept="image/*"
                onChange={(e) => handleAvatarChange(e, setFieldValue)}
                className="w-full text-sm text-gray-500
                       file:mr-4 file:py-2 file:px-4
                       file:rounded-md file:border-0
                       file:text-sm file:font-semibold
                       file:bg-blue-50 file:text-blue-700
                       hover:file:bg-blue-100"
              />
              {avatarPreview && (
                <img
                  src={avatarPreview}
                  alt="Avatar Preview"
                  className="mt-3 w-24 h-24 rounded-full border object-cover"
                />
              )}
            </div>

            {/* Submit Button */}
            <div className="sm:col-span-2 mt-6 text-right">
              <button
                type="submit"
                className="bg-blue-600 text-white px-6 py-2 rounded-md hover:bg-blue-700"
              >
                Submit Profile
              </button>
            </div>
          </Form>
        )}
      </Formik>

      <span className="bg-red-400 text-black ">
        All Doctors are here
        {doctorList.length > 0 ? (
          doctorList.map((doc) => (
            <>
              <h1
                key={doc._id}
                className="text-black cursor-pointer mb-20 pb-10"
                onClick={() => setSelectedDoctorId(doc._id)} // ⬅️ sets the ID
              >
                Hello {doc.address}
                <br />
                len {doctorList.length}
              </h1>
            </>
          ))
        ) : (
          <p>No doctors found</p>
        )}
        hello world
      </span>

      {doctorDetail && doctorDetail.doctor && (
        <div className="mt-4 p-2 border bg-yellow-200 text-black">
          <h2 className="font-bold">Doctor Details</h2>
          <p>Registration: {doctorDetail.doctor.registrationNumber}</p>
          <p>Experience: {doctorDetail.doctor.experience}</p>
          <p>
            Created:{" "}
            {new Date(doctorDetail.doctor.createdAt).toLocaleDateString()}
          </p>

          <button
            onClick={handleDeleteDoctor}
            className="mt-2 bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
            disabled={isDeleting}
          >
            {isDeleting ? "Deleting..." : "Delete Doctor"}
          </button>
        </div>
      )}

      {doctorDetailError && (
        <p className="text-red-600">Failed to load doctor details.</p>
      )}
      {deleteError && <p className="text-red-600">Error deleting doctor.</p>}
    </div>
  );
};

export default DoctorProfileForm;
