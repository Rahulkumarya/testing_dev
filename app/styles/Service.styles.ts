// RadiologyServiceForm.styles.ts
const styles = {
  container: "max-w-4xl mx-auto p-6 bg-white shadow-md rounded-lg",
  formGrid: "grid grid-cols-1 md:grid-cols-2 gap-6",
  fieldWrapper: "flex flex-col",
  fullWidth: "md:col-span-2",
  label: "text-sm font-semibold text-gray-700 mb-1",
  input:
    "w-full border px-3 py-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-300",
  textarea:
    "w-full border px-3 py-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-300 h-32",
  error: "text-red-500 text-sm mt-1",
  optionGroup: "flex flex-wrap gap-4",
  optionLabel: "flex items-center gap-2",
  buttonGroup: "md:col-span-2 flex gap-4",
  button: "flex-1 text-white py-2 rounded transition",
  save: "bg-green-600 hover:bg-green-700",
  saveNew: "bg-blue-600 hover:bg-blue-700",
};

export default styles;
