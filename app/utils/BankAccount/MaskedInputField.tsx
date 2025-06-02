import React from "react";

const MaskedInputField = ({ label, name, value, onChange }: any) => {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onChange(name, e.target.value);
  };

  return (
    <div className="flex flex-col gap-1">
      <label className="text-sm font-semibold text-gray-700">{label}</label>
      <input
        type="text"
        name={name}
        value={value.replace(/\d(?=\d{4})/g, "*")} // masks except last 4 digits
        onChange={handleChange}
        className="border border-gray-300 px-4 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
      />
      <p className="text-xs text-gray-500">Only last 4 digits visible</p>
    </div>
  );
};

export default MaskedInputField;
