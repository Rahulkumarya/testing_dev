"use client";

import React, { useState, useEffect } from "react";
import { Formik, Form, Field, FieldArray, ErrorMessage } from "formik";
import * as Yup from "yup";
import { useSelector } from "react-redux";
import toast from "react-hot-toast";
// import { useCreateTourOperatorServiceMutation } from "@/redux/features/services/tour/serviceApi";
import { useRouter } from "next/navigation";

const TourOperatorServiceForm = () => {
  const [geo, setGeo] = useState({
    lat: "",
    lon: "",
    city: "",
    state: "",
    pincode: "",
    address: "",
    landmark: "",
  });

  const user = useSelector((state) => state.auth.user);
//   const [createTourService] = useCreateTourOperatorServiceMutation();
  const router = useRouter();

  useEffect(() => {
    navigator.geolocation.getCurrentPosition(async (pos) => {
      const { latitude, longitude } = pos.coords;
      const res = await fetch(
        `https://geocode.maps.co/reverse?lat=${latitude}&lon=${longitude}`
      );
      const data = await res.json();
      setGeo({
        lat: String(latitude),
        lon: String(longitude),
        city: data.address.city || "",
        state: data.address.state || "",
        pincode: data.address.postcode || "",
        address: data.display_name || "",
        landmark: data.address.suburb || "",
      });
    });
  }, []);

  const initialValues = {
    userId: user?._id || "",
    category: "package",
    serviceName: "",
    details: [
      {
        place: "",
        nights: 1,
        activities: "",
        meals: "",
        hotel: "",
      },
    ],
    maxSize: 0,
    ageRange: { min: 0, max: 0 },
    gender: { female: false, male: false, both: true },
    reporting: { date: "", time: "", place: "" },
    ending: { date: "", time: "", place: "" },
    motive: "sightseeing",
    includes: [],
    totalDays: 1,
    totalNights: 0,
    price: 0,
    optionalServices: [],
    description: "",
    location: {
      coordinates: [geo.lon, geo.lat],
      city: geo.city,
      state: geo.state,
      pincode: geo.pincode,
      address: geo.address,
      landmark: geo.landmark,
    },
  };

  const validationSchema = Yup.object({
    category: Yup.string().required(),
    serviceName: Yup.string().required("Service name is required"),
    details: Yup.array().of(
      Yup.object({
        place: Yup.string().required("Place is required"),
        nights: Yup.number().min(1).required("Nights required"),
        activities: Yup.string().required(),
        meals: Yup.string().required(),
        hotel: Yup.string().required(),
      })
    ),
    maxSize: Yup.number().min(1).required("Enter group size"),
    ageRange: Yup.object({
      min: Yup.number().min(1).required(),
      max: Yup.number().moreThan(Yup.ref("min")).required(),
    }),
    gender: Yup.object({
      female: Yup.boolean(),
      male: Yup.boolean(),
      both: Yup.boolean(),
    }),
    reporting: Yup.object({
      date: Yup.string().required(),
      time: Yup.string().required(),
      place: Yup.string().required(),
    }),
    ending: Yup.object({
      date: Yup.string().required(),
      time: Yup.string().required(),
      place: Yup.string().required(),
    }),
    motive: Yup.string().required(),
    includes: Yup.array().of(Yup.string()),
    totalDays: Yup.number().min(1).required(),
    totalNights: Yup.number().min(0).required(),
    price: Yup.number().min(0).required(),
    optionalServices: Yup.array().of(
      Yup.object({
        name: Yup.string().required(),
        charge: Yup.number().min(0).required(),
      })
    ),
    description: Yup.string().required(),
  });

  const handleSubmit = async (values, helpers) => {
    try {
    //   await createTourService(values).unwrap();
      toast.success("Tour Service Created");
      router.push("/services/dashboard");
    } catch (error) {
      toast.error(error?.data?.message || "Error creating service");
    }
  };

  return (
    <div className="max-w-4xl mx-auto bg-white shadow-md rounded-lg p-6">
      <h2 className="text-xl font-semibold mb-4">Create Tour Service</h2>
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
      >
        {({ values }) => (
          <Form className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="col-span-2">
              <label>Service Name</label>
              <Field
                name="serviceName"
                className="w-full border rounded px-3 py-2"
              />
              <ErrorMessage
                name="serviceName"
                className="text-red-500 text-sm"
                component="div"
              />
            </div>

            <FieldArray name="details">
              {({ push, remove }) => (
                <div className="col-span-2 space-y-4">
                  <h3 className="text-lg font-medium">Tour Details</h3>
                  {values.details.map((_, idx) => (
                    <div
                      key={idx}
                      className="grid grid-cols-1 md:grid-cols-2 gap-4"
                    >
                      <Field
                        name={`details[${idx}].place`}
                        placeholder="Place"
                        className="border px-3 py-2 rounded"
                      />
                      <Field
                        name={`details[${idx}].nights`}
                        placeholder="Nights"
                        type="number"
                        className="border px-3 py-2 rounded"
                      />
                      <Field
                        name={`details[${idx}].activities`}
                        placeholder="Activities"
                        className="border px-3 py-2 rounded"
                      />
                      <Field
                        name={`details[${idx}].meals`}
                        placeholder="Meals"
                        className="border px-3 py-2 rounded"
                      />
                      <Field
                        name={`details[${idx}].hotel`}
                        placeholder="Hotel"
                        className="border px-3 py-2 rounded"
                      />
                      <button
                        type="button"
                        onClick={() => remove(idx)}
                        className="text-red-600"
                      >
                        Remove
                      </button>
                    </div>
                  ))}
                  <button
                    type="button"
                    onClick={() =>
                      push({
                        place: "",
                        nights: 1,
                        activities: "",
                        meals: "",
                        hotel: "",
                      })
                    }
                    className="bg-green-500 text-white px-4 py-1 rounded"
                  >
                    Add More
                  </button>
                </div>
              )}
            </FieldArray>

            <div className="col-span-2">
              <label>Description</label>
              <Field
                name="description"
                as="textarea"
                className="w-full border rounded px-3 py-2"
              />
              <ErrorMessage
                name="description"
                className="text-red-500 text-sm"
                component="div"
              />
            </div>

            <div className="col-span-2">
              <label>Price</label>
              <Field
                name="price"
                type="number"
                className="w-full border rounded px-3 py-2"
              />
              <ErrorMessage
                name="price"
                className="text-red-500 text-sm"
                component="div"
              />
            </div>

            <div className="col-span-2 text-center">
              <button
                type="submit"
                className="bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700"
              >
                Submit
              </button>
            </div>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default TourOperatorServiceForm;
