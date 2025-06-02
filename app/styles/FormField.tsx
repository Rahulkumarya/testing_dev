import { ErrorMessage, Field } from 'formik';

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
