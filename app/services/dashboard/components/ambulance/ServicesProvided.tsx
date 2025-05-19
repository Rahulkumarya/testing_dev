import React from "react";
import { Formik, FieldArray, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";

const validationSchema = Yup.object({
  services: Yup.array()
    .of(Yup.string().required("Service is required"))
    .min(1, "At least one service must be provided"),
});

const initialValues = {
  services: [""],
};

const ServicesProvided = () => {
  const handleSubmit = (values: typeof initialValues) => {
    console.log("Submitted Services:", values.services);
    // You can make an API call here with the values
  };

  return (
    <div className="max-w-2xl mx-auto mt-10 p-6 bg-white shadow-md rounded">
      <h1 className="text-2xl font-bold mb-4 text-center">Services Provided</h1>

      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
      >
        {({ values }) => (
          <Form className="space-y-4">
            <FieldArray name="services">
              {({ push, remove }) => (
                <div className="space-y-3">
                  {values.services.map((_, index) => (
                    <div key={index} className="flex items-center gap-2">
                      <Field
                        name={`services.${index}`}
                        placeholder="Enter service (e.g., ICU Ambulance)"
                        className="w-full p-2 border border-gray-300 rounded"
                      />
                      {values.services.length > 1 && (
                        <button
                          type="button"
                          onClick={() => remove(index)}
                          className="text-red-500 text-sm"
                        >
                          Remove
                        </button>
                      )}
                    </div>
                  ))}
                  <ErrorMessage
                    name="services"
                    component="div"
                    className="text-red-500 text-sm"
                  />
                  <button
                    type="button"
                    onClick={() => push("")}
                    className="text-blue-600 text-sm"
                  >
                    + Add another service
                  </button>
                </div>
              )}
            </FieldArray>

            <button
              type="submit"
              className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
            >
              Submit
            </button>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default ServicesProvided;
