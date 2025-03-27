
import React from "react";
import { getCountrySpecificGDPR } from "@/utils/policy/countryUtils";

interface GdprComplianceProps {
  selectedCountry: string;
}

const GdprCompliance: React.FC<GdprComplianceProps> = ({ selectedCountry }) => {
  return (
    <div className="bg-white p-6 rounded-lg border border-neutral-200">
      <h2 className="text-2xl font-semibold mb-4">GDPR Compliance</h2>
      <p className="text-neutral-600 mb-4">
        {getCountrySpecificGDPR(selectedCountry)}
      </p>
      
      <h3 className="text-xl font-medium mb-3 mt-6">1. Your Rights Under GDPR</h3>
      <p className="text-neutral-600 mb-4">
        If you are a resident of the European Economic Area (EEA), you have certain data protection rights. MigraineTracker aims to take reasonable steps to allow you to correct, amend, delete, or limit the use of your Personal Data.
      </p>
      <ul className="list-disc pl-6 mb-4 text-neutral-600">
        <li>The right to access - You have the right to request copies of your personal data.</li>
        <li>The right to rectification - You have the right to request that we correct any information you believe is inaccurate or complete information you believe is incomplete.</li>
        <li>The right to erasure - You have the right to request that we erase your personal data, under certain conditions.</li>
        <li>The right to restrict processing - You have the right to request that we restrict the processing of your personal data, under certain conditions.</li>
        <li>The right to object to processing - You have the right to object to our processing of your personal data, under certain conditions.</li>
        <li>The right to data portability - You have the right to request that we transfer the data that we have collected to another organization, or directly to you, under certain conditions.</li>
      </ul>
      
      <h3 className="text-xl font-medium mb-3">2. Data Protection Officer</h3>
      <p className="text-neutral-600 mb-4">
        We have appointed a Data Protection Officer (DPO) who is responsible for overseeing questions in relation to this privacy policy. If you have any questions about this privacy policy, including any requests to exercise your legal rights, please contact the DPO at dpo@migrainetracker.com.
      </p>
      
      <p className="text-neutral-600">
        Last updated: June 1, 2023
      </p>
    </div>
  );
};

export default GdprCompliance;
