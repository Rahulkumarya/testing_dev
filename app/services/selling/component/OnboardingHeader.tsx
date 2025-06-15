"use client";
import React from "react";
import { CheckCircle, CircleDot, Circle } from "lucide-react";


interface Step {
  title: string;
  description: string;
}

const steps: Step[] = [
  { title: "Step 1", description: "Register" },
  { title: "Step 2", description: "Complete Profile" },
  { title: "Step 3", description: "Onboarding Done" },
];

const OnboardingHeader = ({ currentStep }: { currentStep: number }) => {
  return (
    <div className="flex justify-center items-center bg-blue-50 gap-6 py-6 mt-20">
      {steps.map((step, index) => {
        const stepNumber = index + 1;
        const isCompleted = stepNumber < currentStep;
        const isCurrent = stepNumber === currentStep;

        return (
          <div key={index} className="flex items-center gap-3">
            <div className="flex flex-col items-center">
              <div className={`text-blue-600`}>
                {isCompleted ? (
                  <CheckCircle className="text-green-600 w-7 h-7" />
                ) : isCurrent ? (
                  <CircleDot className="text-blue-600 w-7 h-7" />
                ) : (
                  <Circle className="text-gray-400 w-7 h-7" />
                )}
              </div>
              <span
                className={`text-sm mt-1 font-medium ${
                  isCompleted
                    ? "text-green-600"
                    : isCurrent
                    ? "text-blue-600"
                    : "text-gray-500"
                }`}
              >
                {step.title}
              </span>
              <span className="text-xs text-gray-400">{step.description}</span>
            </div>

            {/* Divider */}
            {stepNumber !== steps.length && (
              <div className="w-10 h-0.5 bg-gray-300" />
            )}
          </div>
        );
      })}
    </div>
  );
};

export default OnboardingHeader;
