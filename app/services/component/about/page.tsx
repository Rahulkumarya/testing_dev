"use client";
import React from "react";

const About = () => {
  return (
    
    <section className="w-full py-12 px-6 md:px-20 bg-gray-50 text-gray-800  mt-22">
      <div className="max-w-6xl mx-auto space-y-12">
        {/* Heading */}
        <div className="text-center">
          <h1 className="text-3xl md:text-4xl font-bold mb-4">About Us</h1>
          <p className="text-gray-600 max-w-2xl mx-auto">
            We are dedicated to delivering reliable, compassionate, and
            innovative healthcare solutions that empower communities to live
            healthier lives.
          </p>
        </div>

        {/* Mission + Vision */}
        <div className="grid md:grid-cols-2 gap-8">
          <div>
            <h2 className="text-xl font-semibold mb-2">Our Mission</h2>
            <p className="text-gray-700">
              To provide comprehensive and accessible healthcare through expert
              medical services, cutting-edge technology, and a focus on patient
              wellness.
            </p>
          </div>
          <div>
            <h2 className="text-xl font-semibold mb-2">Our Vision</h2>
            <p className="text-gray-700">
              To be the leading healthcare provider, promoting well-being and
              quality of life for every individual we serve.
            </p>
          </div>
        </div>

        {/* Services */}
        <div className="space-y-6">
          <h2 className="text-xl font-semibold mb-2 text-center">
            What We Offer
          </h2>
          <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-6">
            {[
              {
                title: "Doctor Services",
                desc: "Expert consultations from experienced specialists.",
              },
              {
                title: "Diagnosis",
                desc: "Accurate and fast medical diagnostics.",
              },
              { title: "Ambulance", desc: "24/7 emergency ambulance support." },
              {
                title: "Radiology",
                desc: "Advanced imaging for better treatment planning.",
              },
              {
                title: "Gym & Rehab",
                desc: "Facilities for recovery and fitness.",
              },
              {
                title: "Wellness Programs",
                desc: "Holistic care for long-term health.",
              },
            ].map((item, idx) => (
              <div
                key={idx}
                className="bg-white p-5 rounded-xl shadow hover:shadow-md transition"
              >
                <h3 className="text-lg font-medium mb-2">{item.title}</h3>
                <p className="text-sm text-gray-600">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
