"use client"
import React from "react";

type ToggleSwitchProps = {
  id: string;
  checked: boolean;
  onChange: (checked: boolean) => void;
  label?: string;
};

const ToggleSwitch: React.FC<ToggleSwitchProps> = ({
  id,
  checked,
  onChange,
  label,
}) => {
  return (
    <div className="flex items-center justify-between space-x-3">
      {label && (
        <label htmlFor={id} className="text-sm font-medium">
          {label}
        </label>
      )}
      <button
        id={id}
        role="switch"
        aria-checked={checked}
        onClick={() => onChange(!checked)}
        className={`w-12 h-6 rounded-full transition-colors duration-300 relative ${
          checked ? "bg-blue-600" : "bg-gray-300"
        }`}
      >
        <span
          className={`w-5 h-5 bg-white rounded-full shadow-md absolute top-0.5 transition-transform duration-300 ${
            checked ? "translate-x-6" : "translate-x-1"
          }`}
        ></span>
      </button>
    </div>
  );
};

export default ToggleSwitch;
