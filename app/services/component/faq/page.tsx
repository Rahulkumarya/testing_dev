"use client"
import React, { useState } from "react";

// Example FAQ data
const faqs = [
  {
    question: "What is your refund policy?",
    answer:
      "We offer a full refund within 14 days of purchase if you're not satisfied. After that, partial refunds may be considered under specific circumstances.",
  },
  {
    question: "How long does delivery take?",
    answer:
      "Standard delivery usually takes 3–5 business days. Expedited options are available at checkout.",
  },
  {
    question: "Is customer support available 24/7?",
    answer:
      "Yes, our customer support team is available via chat and email 24/7 to help you with your queries.",
  },
];

const FAQ: React.FC = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  // Toggle function for accordion
  const toggleFAQ = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section className="max-w-3xl mx-auto p-6  mt-22">
      {/* Section Header */}
      <h2 className="text-3xl font-bold mb-6 text-center">
        Frequently Asked Questions
      </h2>

      {/* FAQ List */}
      <div className="space-y-4">
        {faqs.map((faq, index) => (
          <div key={index} className="border rounded-lg overflow-hidden">
            {/* Question Button */}
            <button
              className="w-full flex justify-between items-center p-4 bg-gray-100 hover:bg-gray-200 transition text-left"
              onClick={() => toggleFAQ(index)}
              aria-expanded={openIndex === index}
              aria-controls={`faq-answer-${index}`}
            >
              <span className="text-lg font-medium">{faq.question}</span>
              <svg
                className={`w-5 h-5 transform transition-transform ${
                  openIndex === index ? "rotate-180" : ""
                }`}
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M19 9l-7 7-7-7"
                />
              </svg>
            </button>

            {/* Answer Content */}
            {openIndex === index && (
              <div
                id={`faq-answer-${index}`}
                className="px-4 py-3 text-gray-700 bg-white"
              >
                {faq.answer}
              </div>
            )}
          </div>
        ))}
      </div>
    </section>
  );
};

export default FAQ;
