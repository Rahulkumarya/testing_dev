"use client";

import React from "react";
import { Formik, Form, Field, FieldArray, ErrorMessage } from "formik";
import * as Yup from "yup";
import { useSelector } from "react-redux";
import toast from "react-hot-toast";
import { store } from "../../../../../redux/store";
import { useCreateTourServiceMutation } from "../../../../../redux/features/services/resort/serviceApi";
import { useRouter } from "next/navigation";
import { Calendar, Clock, MapPin } from "lucide-react";

const MOTIVES = ["Sightseeing", "Relaxation", "Adventure", "Medical", "Other"];
const INCLUDES = [
  "Breakfast",
  "Lunch",
  "Dinner",
  "Transport",
  "Guide",
  "Insurance",
];


const CATEGORIES = ["Package", "Group", "Private"];
const TourOperatorServiceForm = () => {


  const user = useSelector((state: store) => state.auth.user);
  //   const [createTourService] = useCreateTourOperatorServiceMutation();
  const [createTourService, { isLoading }] =
    useCreateTourServiceMutation();
  const router = useRouter();
  if (!user?._id) return <div>Loading...</div>;
  console.log(`user is ${user._id} and user `, user);
  const initialValues = {
    userId: user?._id || "",
    category: "",
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
  };

  const validationSchema = Yup.object({
    userId:Yup.string(),
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
        name: Yup.string(),
        charge: Yup.number().min(0),
      })
    ),
    description: Yup.string().required(),
  });

  const handleSubmit = async (values: typeof initialValues) => {
    console.log("Submit function called");
    try {
      console.log("Form values:", values); // ✅ Make sure this logs
      const res = await createTourService(values)
      console.log(`response of tour creation`, res);
      console.log(`new formdata`, values);
      toast.success("Tour Service Created");
      router.push("/services/dashboard");
    } catch (error) {
      
      console.log(`error tourservices provider `, error);
    }
  };

  return (
    <div className="max-w-4xl mx-auto bg-white shadow-lg rounded-lg overflow-hidden">
      <div className="bg-gradient-to-r from-green-400 to-blue-500 p-6">
        <h2 className="text-2xl font-bold text-white text-center">
          Create Tour Service
        </h2>
      </div>
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
      >
        {({ values }) => (
          <Form className="p-6 space-y-8">
            {/* Category */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Category
              </label>
              <Field
                name="category"
                as="select"
                className="w-full border px-3 py-2 rounded"
              >
                {CATEGORIES.map((c) => (
                  <option key={c} value={c}>
                    {c}
                  </option>
                ))}
              </Field>
              <ErrorMessage
                name="category"
                component="div"
                className="text-red-500 text-xs mt-1"
              />
            </div>

            {/* Service Name */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Service Name
              </label>
              <Field
                name="serviceName"
                className="w-full border border-gray-300 rounded px-3 py-2 focus:ring focus:ring-indigo-200"
              />
              <ErrorMessage
                name="serviceName"
                component="div"
                className="text-red-500 text-xs mt-1"
              />
            </div>

            {/* Max Size & Age Range & Gender */}
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Max Group Size
                </label>
                <Field
                  name="maxSize"
                  type="number"
                  className="w-full border px-3 py-2 rounded"
                />
                <ErrorMessage
                  name="maxSize"
                  component="div"
                  className="text-red-500 text-xs mt-1"
                />
              </div>
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Age Min
                </label>
                <Field
                  name="ageRange.min"
                  type="number"
                  className="w-full border px-3 py-2 rounded"
                />
                <ErrorMessage
                  name="ageRange.min"
                  component="div"
                  className="text-red-500 text-xs mt-1"
                />
              </div>
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Age Max
                </label>
                <Field
                  name="ageRange.max"
                  type="number"
                  className="w-full border px-3 py-2 rounded"
                />
                <ErrorMessage
                  name="ageRange.max"
                  component="div"
                  className="text-red-500 text-xs mt-1"
                />
              </div>
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Gender
                </label>
                <div className="flex gap-2">
                  <label className="flex items-center gap-1">
                    <Field
                      type="checkbox"
                      name="gender.female"
                      className="form-checkbox"
                    />{" "}
                    Female
                  </label>
                  <label className="flex items-center gap-1">
                    <Field
                      type="checkbox"
                      name="gender.male"
                      className="form-checkbox"
                    />{" "}
                    Male
                  </label>
                  <label className="flex items-center gap-1">
                    <Field
                      type="checkbox"
                      name="gender.both"
                      className="form-checkbox"
                    />{" "}
                    Both
                  </label>
                </div>
                <ErrorMessage
                  name="gender"
                  component="div"
                  className="text-red-500 text-xs mt-1"
                />
              </div>
            </div>

            {/* Tour Details Array */}
            <FieldArray name="details">
              {({ push, remove }) => (
                <div className="space-y-4">
                  <h3 className="text-lg font-medium text-gray-800">
                    Tour Details
                  </h3>
                  {values.details.map((_, idx) => (
                    <div
                      key={idx}
                      className="grid grid-cols-1 md:grid-cols-2 gap-4 bg-gray-50 p-4 rounded"
                    >
                      <Field
                        name={`details[${idx}].place`}
                        placeholder="Place"
                        className="border px-3 py-2 rounded w-full"
                      />
                      <Field
                        name={`details[${idx}].nights`}
                        type="number"
                        placeholder="Nights"
                        className="border px-3 py-2 rounded w-full"
                      />
                      <Field
                        name={`details[${idx}].activities`}
                        placeholder="Activities"
                        className="border px-3 py-2 rounded w-full md:col-span-2"
                      />
                      <Field
                        name={`details[${idx}].meals`}
                        placeholder="Meals"
                        className="border px-3 py-2 rounded w-full md:col-span-2"
                      />
                      <Field
                        name={`details[${idx}].hotel`}
                        placeholder="Hotel"
                        className="border px-3 py-2 rounded w-full md:col-span-2"
                      />
                      <button
                        type="button"
                        onClick={() => remove(idx)}
                        className="text-red-600 hover:underline"
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
                    className="bg-indigo-500 text-white px-4 py-2 rounded hover:bg-indigo-600"
                  >
                    Add Detail
                  </button>
                </div>
              )}
            </FieldArray>

            {/* Reporting & Ending Cards */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Reporting Card */}
              <div className="bg-white shadow rounded-lg overflow-hidden">
                <div className="bg-indigo-50 p-4 border-b">
                  <h3 className="flex items-center gap-2 text-indigo-600 font-semibold">
                    <Calendar size={20} />
                    Reporting
                  </h3>
                </div>
                <div className="p-4 space-y-4">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="flex flex-col">
                      <label className="mb-1 text-gray-700 flex items-center gap-1">
                        <Calendar size={16} />
                        Date
                      </label>
                      <Field
                        name="reporting.date"
                        type="date"
                        className="border px-3 py-2 rounded focus:ring focus:ring-indigo-200"
                      />
                      <ErrorMessage
                        name="reporting.date"
                        component="div"
                        className="text-red-500 text-xs mt-1"
                      />
                    </div>
                    <div className="flex flex-col">
                      <label className="mb-1 text-gray-700 flex items-center gap-1">
                        <Clock size={16} />
                        Time
                      </label>
                      <Field
                        name="reporting.time"
                        type="time"
                        className="border px-3 py-2 rounded focus:ring focus:ring-indigo-200"
                      />
                      <ErrorMessage
                        name="reporting.time"
                        component="div"
                        className="text-red-500 text-xs mt-1"
                      />
                    </div>
                  </div>
                  {/* Place full width */}
                  <div className="flex flex-col">
                    <label className="mb-1 text-gray-700 flex items-center gap-1">
                      <MapPin size={16} />
                      Place
                    </label>
                    <Field
                      name="reporting.place"
                      className="border px-3 py-2 rounded focus:ring focus:ring-indigo-200 w-full"
                    />
                    <ErrorMessage
                      name="reporting.place"
                      component="div"
                      className="text-red-500 text-xs mt-1"
                    />
                  </div>
                </div>
              </div>

              {/* Ending Card */}
              <div className="bg-white shadow rounded-lg overflow-hidden">
                <div className="bg-green-50 p-4 border-b">
                  <h3 className="flex items-center gap-2 text-green-600 font-semibold">
                    <Calendar size={20} />
                    Ending
                  </h3>
                </div>
                <div className="p-4 space-y-4">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="flex flex-col">
                      <label className="mb-1 text-gray-700 flex items-center gap-1">
                        <Calendar size={16} />
                        Date
                      </label>
                      <Field
                        name="ending.date"
                        type="date"
                        className="border px-3 py-2 rounded focus:ring focus:ring-green-200"
                      />
                      <ErrorMessage
                        name="ending.date"
                        component="div"
                        className="text-red-500 text-xs mt-1"
                      />
                    </div>
                    <div className="flex flex-col">
                      <label className="mb-1 text-gray-700 flex items-center gap-1">
                        <Clock size={16} />
                        Time
                      </label>
                      <Field
                        name="ending.time"
                        type="time"
                        className="border px-3 py-2 rounded focus:ring focus:ring-green-200"
                      />
                      <ErrorMessage
                        name="ending.time"
                        component="div"
                        className="text-red-500 text-xs mt-1"
                      />
                    </div>
                  </div>
                  <div className="flex flex-col">
                    <label className="mb-1 text-gray-700 flex items-center gap-1">
                      <MapPin size={16} />
                      Place
                    </label>
                    <Field
                      name="ending.place"
                      className="border px-3 py-2 rounded focus:ring focus:ring-green-200 w-full"
                    />
                    <ErrorMessage
                      name="ending.place"
                      component="div"
                      className="text-red-500 text-xs mt-1"
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* Motive */}
            <div>
              <label className="block text-gray-700 font-medium mb-2">
                Motive
              </label>
              <div className="flex flex-wrap gap-4">
                {MOTIVES.map((m) => (
                  <label key={m} className="flex items-center gap-2">
                    <Field
                      type="radio"
                      name="motive"
                      value={m}
                      className="form-radio text-indigo-600"
                    />
                    <span className="capitalize">{m}</span>
                  </label>
                ))}
              </div>
              <ErrorMessage
                name="motive"
                component="div"
                className="text-red-500 text-xs mt-1"
              />
            </div>

            {/* Includes */}
            <div>
              <label className="block text-gray-700 font-medium mb-2">
                Includes
              </label>
              <div className="flex flex-wrap gap-4">
                {INCLUDES.map((item) => (
                  <label key={item} className="flex items-center gap-2">
                    <Field
                      type="checkbox"
                      name="includes"
                      value={item}
                      className="form-checkbox text-indigo-600"
                    />
                    <span>{item}</span>
                  </label>
                ))}
              </div>
            </div>

            {/* Total Days & Nights */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-gray-700 font-medium mb-1">
                  Total Days
                </label>
                <Field
                  name="totalDays"
                  type="number"
                  className="w-full border px-3 py-2 rounded focus:ring focus:ring-indigo-200"
                />
                <ErrorMessage
                  name="totalDays"
                  component="div"
                  className="text-red-500 text-xs mt-1"
                />
              </div>
              <div>
                <label className="block text-gray-700 font-medium mb-1">
                  Total Nights
                </label>
                <Field
                  name="totalNights"
                  type="number"
                  className="w-full border px-3 py-2 rounded focus:ring focus:ring-indigo-200"
                />
                <ErrorMessage
                  name="totalNights"
                  component="div"
                  className="text-red-500 text-xs mt-1"
                />
              </div>
            </div>

            {/* Price */}
            <div>
              <label className="block text-gray-700 font-medium mb-1 ">
                Price (₹)
              </label>
              <Field
                name="price"
                type="number"
                className="sm:w-[50%] md:w-[50%] lg:w-[50%] w-full border px-3 py-2 rounded focus:ring focus:ring-indigo-200"
              />
              <ErrorMessage
                name="price"
                component="div"
                className="text-red-500 text-xs mt-1"
              />
            </div>

            {/* Optional Services */}
            <FieldArray name="optionalServices">
              {({ push, remove }) => (
                <div className="space-y-4">
                  <h3 className="text-lg font-medium text-gray-800">
                    Optional Services
                  </h3>
                  {values.optionalServices.map((_, idx) => (
                    <div
                      key={idx}
                      className="grid grid-cols-1 md:grid-cols-3 gap-4 items-end"
                    >
                      <Field
                        name={`optionalServices[${idx}].name`}
                        placeholder="Service Name"
                        className="border px-3 py-2 rounded w-full"
                      />
                      <Field
                        name={`optionalServices[${idx}].charge`}
                        type="number"
                        placeholder="Charge"
                        className="border px-3 py-2 rounded w-full"
                      />
                      <button
                        type="button"
                        onClick={() => remove(idx)}
                        className="text-red-600 hover:underline"
                      >
                        Remove
                      </button>
                    </div>
                  ))}
                  <button
                    type="button"
                    onClick={() => push({ name: "", charge: 0 })}
                    className="bg-indigo-500 text-white px-4 py-2 rounded hover:bg-indigo-600"
                  >
                    Add Service
                  </button>
                </div>
              )}
            </FieldArray>

            {/* Description */}
            <div>
              <label className="block text-gray-700 font-medium mb-1">
                Description
              </label>
              <Field
                name="description"
                as="textarea"
                rows={4}
                className="w-full border px-3 py-2 rounded focus:ring focus:ring-indigo-200"
              />
              <ErrorMessage
                name="description"
                component="div"
                className="text-red-500 text-xs mt-1"
              />
            </div>

            {/* Submit Button */}
            <div className="text-center">
              <button
                type="submit"
                // disabled={isLoading}
                className="bg-green-500 text-white px-6 py-3 rounded-lg hover:bg-green-600 transition"
              >
                {isLoading ? "Submitting..." : "Create Service"}
              </button>
            </div>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default TourOperatorServiceForm;
