
import React from "react";
import { getCountrySpecificPrivacy } from "@/utils/policy/countryUtils";

interface PrivacyPolicyProps {
  selectedCountry: string;
}

const PrivacyPolicy: React.FC<PrivacyPolicyProps> = ({ selectedCountry }) => {
  return (
    <div className="bg-white p-6 rounded-lg border border-neutral-200">
      <h2 className="text-2xl font-semibold mb-4">Privacy Policy</h2>
      <p className="text-neutral-600 mb-4">
        {getCountrySpecificPrivacy(selectedCountry)}
      </p>
      
      <h3 className="text-xl font-medium mb-3 mt-6">1. Information We Collect</h3>
      <p className="text-neutral-600 mb-4">
        We collect information you provide directly to us, such as when you create or modify your account, request customer support, or otherwise communicate with us. This information may include: name, email address, phone number, postal address, and other information you choose to provide.
      </p>
      
      <h3 className="text-xl font-medium mb-3">2. How We Use Information</h3>
      <p className="text-neutral-600 mb-4">
        We use the information we collect to:
      </p>
      <ul className="list-disc pl-6 mb-4 text-neutral-600">
        <li>Provide, maintain, and improve our services</li>
        <li>Personalize and improve your experience</li>
        <li>Process transactions and send related information</li>
        <li>Send you technical notices, updates, security alerts, and support messages</li>
        <li>Respond to your comments, questions, and requests</li>
      </ul>
      
      <h3 className="text-xl font-medium mb-3">3. Data Retention</h3>
      <p className="text-neutral-600 mb-4">
        We will retain your information for as long as your account is active or as needed to provide you services. If you wish to cancel your account or request that we no longer use your information, please contact us at support@migrainetracker.com.
      </p>
      
      <p className="text-neutral-600">
        Last updated: June 1, 2023
      </p>
    </div>
  );
};

export default PrivacyPolicy;
