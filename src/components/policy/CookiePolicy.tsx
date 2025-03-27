
import React from "react";
import { getCountrySpecificCookies } from "@/utils/policy/countryUtils";

interface CookiePolicyProps {
  selectedCountry: string;
}

const CookiePolicy: React.FC<CookiePolicyProps> = ({ selectedCountry }) => {
  return (
    <div className="bg-white p-6 rounded-lg border border-neutral-200">
      <h2 className="text-2xl font-semibold mb-4">Cookie Policy</h2>
      <p className="text-neutral-600 mb-4">
        {getCountrySpecificCookies(selectedCountry)}
      </p>
      
      <h3 className="text-xl font-medium mb-3 mt-6">1. What Are Cookies</h3>
      <p className="text-neutral-600 mb-4">
        Cookies are small text files that are placed on your computer or mobile device when you browse websites. They are widely used to make websites work more efficiently and provide information to the owners of the site.
      </p>
      
      <h3 className="text-xl font-medium mb-3">2. How We Use Cookies</h3>
      <p className="text-neutral-600 mb-4">
        We use cookies for several purposes, including:
      </p>
      <ul className="list-disc pl-6 mb-4 text-neutral-600">
        <li>Remembering your preferences and settings</li>
        <li>Authentication and security</li>
        <li>Analyzing site traffic and usage</li>
        <li>Personalized advertising</li>
      </ul>
      
      <h3 className="text-xl font-medium mb-3">3. Controlling Cookies</h3>
      <p className="text-neutral-600 mb-4">
        You can control and/or delete cookies as you wish – for details, see aboutcookies.org. You can delete all cookies that are already on your computer and you can set most browsers to prevent them from being placed. If you do this, however, you may have to manually adjust some preferences every time you visit a site and some services and functionalities may not work.
      </p>
      
      <p className="text-neutral-600">
        Last updated: June 1, 2023
      </p>
    </div>
  );
};

export default CookiePolicy;
