
/**
 * Checks if a country is covered by GDPR
 */
export const isGdprCountry = (countryCode: string): boolean => {
  const gdprCountries = ["GB", "DE", "FR", "ES", "IT", "NL", "SE", "DK", "FI", "AT", "BE", "IE"];
  return gdprCountries.includes(countryCode);
};

/**
 * Get country-specific terms of service text
 */
export const getCountrySpecificTerms = (countryCode: string) => {
  switch (countryCode) {
    case "US":
      return "These Terms of Service are governed by the laws of the United States. Any disputes related to these terms will be subject to the exclusive jurisdiction of the courts in California.";
    case "GB":
      return "These Terms of Service are governed by the laws of the United Kingdom. Any disputes related to these terms will be subject to the exclusive jurisdiction of the courts in England and Wales.";
    case "CA":
      return "These Terms of Service are governed by the laws of Canada. Any disputes related to these terms will be subject to the exclusive jurisdiction of the courts in Ontario.";
    case "AU":
      return "These Terms of Service are governed by the laws of Australia. Any disputes related to these terms will be subject to the exclusive jurisdiction of the courts in New South Wales.";
    case "DE":
      return "These Terms of Service are governed by the laws of Germany. Any disputes related to these terms will be subject to the exclusive jurisdiction of the courts in Berlin.";
    case "FR":
      return "These Terms of Service are governed by the laws of France. Any disputes related to these terms will be subject to the exclusive jurisdiction of the courts in Paris.";
    default:
      return "These Terms of Service are governed by the laws of the United States. Any disputes related to these terms will be subject to the exclusive jurisdiction of the courts in California.";
  }
};

/**
 * Get country-specific privacy policy text
 */
export const getCountrySpecificPrivacy = (countryCode: string) => {
  switch (countryCode) {
    case "US":
      return "This Privacy Policy complies with the California Consumer Privacy Act (CCPA) and other applicable US privacy laws.";
    case "GB":
    case "DE":
    case "FR":
    case "ES":
    case "IT":
    case "NL":
    case "SE":
    case "DK":
    case "FI":
    case "AT":
    case "BE":
    case "IE":
      return "This Privacy Policy complies with the General Data Protection Regulation (GDPR) and other applicable EU privacy laws.";
    case "CA":
      return "This Privacy Policy complies with the Personal Information Protection and Electronic Documents Act (PIPEDA) and other applicable Canadian privacy laws.";
    case "AU":
      return "This Privacy Policy complies with the Australian Privacy Principles (APPs) and other applicable Australian privacy laws.";
    default:
      return "This Privacy Policy is designed to comply with privacy laws in your jurisdiction.";
  }
};

/**
 * Get country-specific cookie policy text
 */
export const getCountrySpecificCookies = (countryCode: string) => {
  switch (countryCode) {
    case "US":
      return "We use cookies to enhance your experience, analyze site traffic, and for marketing purposes. By continuing to browse our site, you consent to our use of cookies.";
    case "GB":
    case "DE":
    case "FR":
    case "ES":
    case "IT":
    case "NL":
    case "SE":
    case "DK":
    case "FI":
    case "AT":
    case "BE":
    case "IE":
      return "In accordance with the EU ePrivacy Directive and GDPR, we inform you that we use cookies and similar technologies to enhance your experience. You have the right to opt out of non-essential cookies.";
    case "CA":
      return "In accordance with Canada's Anti-Spam Legislation (CASL), we inform you that we use cookies to enhance your experience. You can manage your cookie preferences at any time.";
    case "AU":
      return "In accordance with the Australian Privacy Principles, we inform you that we use cookies to enhance your experience. You can manage your cookie preferences at any time.";
    default:
      return "We use cookies to enhance your experience. You can manage your cookie preferences at any time.";
  }
};

/**
 * Get country-specific GDPR text
 */
export const getCountrySpecificGDPR = (countryCode: string) => {
  const gdprCountries = ["GB", "DE", "FR", "ES", "IT", "NL", "SE", "DK", "FI", "AT", "BE", "IE"];
  
  if (gdprCountries.includes(countryCode)) {
    return "The General Data Protection Regulation (GDPR) applies to your use of our services. We are committed to protecting your data rights under GDPR.";
  } else {
    return "While the GDPR may not directly apply to your region, we strive to apply its principles of data protection and privacy globally.";
  }
};
