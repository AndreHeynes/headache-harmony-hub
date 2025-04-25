
import React from "react";
import { getCountrySpecificTerms } from "@/utils/policy/countryUtils";

interface TermsOfServiceProps {
  selectedCountry: string;
}

const TermsOfService: React.FC<TermsOfServiceProps> = ({ selectedCountry }) => {
  return (
    <div className="bg-white p-6 rounded-lg border border-neutral-200">
      <h2 className="text-2xl font-semibold mb-4">Terms of Service</h2>
      <p className="text-neutral-600 mb-4">
        {getCountrySpecificTerms(selectedCountry)}
      </p>
      
      <h3 className="text-xl font-medium mb-3 mt-6">1. Agreement to Terms</h3>
      <p className="text-neutral-600 mb-4">
        By accessing or using Recover & Reclaim, you agree to be bound by these Terms of Service and all applicable laws and regulations. If you do not agree with any of these terms, you are prohibited from using or accessing this site.
      </p>
      
      <h3 className="text-xl font-medium mb-3">2. Use License</h3>
      <p className="text-neutral-600 mb-4">
        Permission is granted to temporarily access the materials on MigraineTracker's website for personal, non-commercial use only. This is the grant of a license, not a transfer of title, and under this license you may not:
      </p>
      <ul className="list-disc pl-6 mb-4 text-neutral-600">
        <li>Modify or copy the materials</li>
        <li>Use the materials for any commercial purpose</li>
        <li>Attempt to decompile or reverse engineer any software contained on the website</li>
        <li>Remove any copyright or other proprietary notations from the materials</li>
        <li>Transfer the materials to another person or "mirror" the materials on any other server</li>
      </ul>
      
      <h3 className="text-xl font-medium mb-3">3. Disclaimer</h3>
      <p className="text-neutral-600 mb-4">
        The materials on Recover & Reclaim's website are provided on an 'as is' basis. Recover & Reclaim makes no warranties, expressed or implied, and hereby disclaims and negates all other warranties including, without limitation, implied warranties or conditions of merchantability, fitness for a particular purpose, or non-infringement of intellectual property or other violation of rights.
      </p>
      
      <p className="text-neutral-600">
        Last updated: June 1, 2023
      </p>
    </div>
  );
};

export default TermsOfService;
