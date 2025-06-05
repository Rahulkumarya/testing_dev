"use client";
import React from "react";

const Policy = () => {
  return (
    <section className="w-full py-12 px-6 md:px-20 bg-white text-gray-800 mt-22">
      <div className="max-w-5xl mx-auto space-y-10">
        <div className="text-center">
          <h1 className="text-3xl md:text-4xl font-bold mb-4">
            Privacy Policy
          </h1>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Your privacy is important to us. This policy outlines how we
            collect, use, and protect your personal information.
          </p>
        </div>

        {/* Policy Sections */}
        <div className="space-y-8">
          <div>
            <h2 className="text-xl font-semibold mb-2">
              1. Information We Collect
            </h2>
            <p className="text-gray-700">
              We may collect personal details such as your name, contact number,
              email address, and health-related data when you interact with our
              services.
            </p>
          </div>

          <div>
            <h2 className="text-xl font-semibold mb-2">
              2. How We Use Your Information
            </h2>
            <p className="text-gray-700">
              Your information helps us provide better service, personalized
              healthcare solutions, appointment management, and emergency
              response.
            </p>
          </div>

          <div>
            <h2 className="text-xl font-semibold mb-2">3. Data Protection</h2>
            <p className="text-gray-700">
              We implement strong security measures and encryption to protect
              your data from unauthorized access, alteration, or disclosure.
            </p>
          </div>

          <div>
            <h2 className="text-xl font-semibold mb-2">4. Sharing of Data</h2>
            <p className="text-gray-700">
              We do not share your personal data with third parties without your
              consent, except when required by law or for essential healthcare
              services.
            </p>
          </div>

          <div>
            <h2 className="text-xl font-semibold mb-2">5. Your Rights</h2>
            <p className="text-gray-700">
              You have the right to access, update, or delete your data at any
              time. Contact our support team for assistance.
            </p>
          </div>

          <div>
            <h2 className="text-xl font-semibold mb-2">
              6. Changes to This Policy
            </h2>
            <p className="text-gray-700">
              We may update this policy periodically. Please review it regularly
              to stay informed about how we protect your data.
            </p>
          </div>

          <div>
            <h2 className="text-xl font-semibold mb-2">7. Contact Us</h2>
            <p className="text-gray-700">
              If you have any questions or concerns about our privacy practices,
              reach out at{" "}
              <span className="text-blue-600">support@yourdomain.com</span>.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Policy;
