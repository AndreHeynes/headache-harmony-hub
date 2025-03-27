import React, { useState, useEffect } from "react";
import { Brain } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "@/components/ui/select";
import { countries } from "@/lib/countries";

const isGdprCountry = (countryCode: string): boolean => {
  const gdprCountries = ["GB", "DE", "FR", "ES", "IT", "NL", "SE", "DK", "FI", "AT", "BE", "IE"];
  return gdprCountries.includes(countryCode);
};

const Policy = () => {
  const [selectedCountry, setSelectedCountry] = useState("US");
  const [activeTab, setActiveTab] = useState("terms");
  const [showGdprTab, setShowGdprTab] = useState(false);

  useEffect(() => {
    setShowGdprTab(isGdprCountry(selectedCountry));
    
    if (activeTab === "gdpr" && !isGdprCountry(selectedCountry)) {
      setActiveTab("terms");
    }
  }, [selectedCountry, activeTab]);

  return (
    <div className="min-h-screen bg-white">
      <header className="fixed top-0 left-0 right-0 bg-white border-b border-neutral-200 z-50">
        <div className="container mx-auto px-4 py-3 flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <Brain className="w-6 h-6 text-neutral-800" />
            <span className="text-xl text-neutral-800">Recover & Reclaim</span>
          </div>
          <nav className="hidden md:flex space-x-6">
            <Link to="/" className="text-neutral-600 hover:text-neutral-900">Home</Link>
            <Link to="/learn-more" className="text-neutral-600 hover:text-neutral-900">Learn More</Link>
            <Link to="/pricing" className="text-neutral-600 hover:text-neutral-900">Pricing</Link>
            <Link to="/policy" className="text-neutral-900 font-medium">Policies</Link>
          </nav>
          <button className="md:hidden">
            <span className="sr-only">Open menu</span>
            <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>
        </div>
      </header>

      <main className="pt-28 pb-16">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h1 className="text-3xl md:text-4xl font-bold mb-6 text-neutral-900">Legal Policies</h1>
            
            <div className="mb-8">
              <label htmlFor="country-select" className="block text-sm font-medium text-neutral-700 mb-2">
                Select your country/region to see relevant policies:
              </label>
              <Select
                value={selectedCountry}
                onValueChange={(value) => setSelectedCountry(value)}
              >
                <SelectTrigger id="country-select" className="w-full md:w-72">
                  <SelectValue placeholder="Select a country" />
                </SelectTrigger>
                <SelectContent>
                  {countries.map((country) => (
                    <SelectItem key={country.code} value={country.code}>
                      {country.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <p className="mt-2 text-sm text-neutral-500">
                Showing policies applicable to {countries.find(c => c.code === selectedCountry)?.name || "United States"}
              </p>
            </div>

            <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
              <TabsList className={`grid ${showGdprTab ? 'grid-cols-4' : 'grid-cols-3'} mb-8 bg-neutral-100`}>
                <TabsTrigger value="terms">Terms of Service</TabsTrigger>
                <TabsTrigger value="privacy">Privacy Policy</TabsTrigger>
                <TabsTrigger value="cookies">Cookie Policy</TabsTrigger>
                {showGdprTab && <TabsTrigger value="gdpr">GDPR Compliance</TabsTrigger>}
              </TabsList>

              <TabsContent value="terms" className="bg-white p-6 rounded-lg border border-neutral-200">
                <h2 className="text-2xl font-semibold mb-4">Terms of Service</h2>
                <p className="text-neutral-600 mb-4">
                  {getCountrySpecificTerms(selectedCountry)}
                </p>
                <h3 className="text-xl font-medium mb-3 mt-6">1. Agreement to Terms</h3>
                <p className="text-neutral-600 mb-4">
                  By accessing or using MigraineTracker, you agree to be bound by these Terms of Service and all applicable laws and regulations. If you do not agree with any of these terms, you are prohibited from using or accessing this site.
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
                  The materials on MigraineTracker's website are provided on an 'as is' basis. MigraineTracker makes no warranties, expressed or implied, and hereby disclaims and negates all other warranties including, without limitation, implied warranties or conditions of merchantability, fitness for a particular purpose, or non-infringement of intellectual property or other violation of rights.
                </p>
                <p className="text-neutral-600">
                  Last updated: June 1, 2023
                </p>
              </TabsContent>

              <TabsContent value="privacy" className="bg-white p-6 rounded-lg border border-neutral-200">
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
              </TabsContent>

              <TabsContent value="cookies" className="bg-white p-6 rounded-lg border border-neutral-200">
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
              </TabsContent>

              {showGdprTab && (
                <TabsContent value="gdpr" className="bg-white p-6 rounded-lg border border-neutral-200">
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
                </TabsContent>
              )}
            </Tabs>

            <div className="mt-8 flex justify-between items-center">
              <p className="text-sm text-neutral-500">
                If you have any questions about our policies, please <a href="#" className="text-blue-600 hover:underline">contact us</a>.
              </p>
              <Button variant="outline" asChild>
                <Link to="/pricing">View Pricing</Link>
              </Button>
            </div>
          </div>
        </div>
      </main>

      <footer className="bg-neutral-100 py-8">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-4 gap-8">
            <div>
              <h4 className="mb-4">About</h4>
              <ul className="space-y-2">
                <li><a href="#" className="text-neutral-600 hover:text-neutral-900">Our Story</a></li>
                <li><a href="#" className="text-neutral-600 hover:text-neutral-900">Team</a></li>
                <li><a href="#" className="text-neutral-600 hover:text-neutral-900">Careers</a></li>
              </ul>
            </div>
            <div>
              <h4 className="mb-4">Support</h4>
              <ul className="space-y-2">
                <li><a href="#" className="text-neutral-600 hover:text-neutral-900">Help Center</a></li>
                <Link to="/policy" className="text-neutral-900 font-medium">Privacy & Terms</Link>
                <li><a href="#" className="text-neutral-600 hover:text-neutral-900">Contact</a></li>
              </ul>
            </div>
            <div>
              <h4 className="mb-4">Contact</h4>
              <ul className="space-y-2">
                <li><a href="#" className="text-neutral-600 hover:text-neutral-900">Email Us</a></li>
                <li><a href="#" className="text-neutral-600 hover:text-neutral-900">Phone</a></li>
                <li><a href="#" className="text-neutral-600 hover:text-neutral-900">Office</a></li>
              </ul>
            </div>
            <div>
              <h4 className="mb-4">Follow Us</h4>
              <div className="flex space-x-4">
                <a href="#" className="text-neutral-600 hover:text-neutral-900">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 8l-8 8m0-8l8 8" />
                  </svg>
                </a>
                <a href="#" className="text-neutral-600 hover:text-neutral-900">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 8l-8 8m0-8l8 8" />
                  </svg>
                </a>
                <a href="#" className="text-neutral-600 hover:text-neutral-900">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 8l-8 8m0-8l8 8" />
                  </svg>
                </a>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

const getCountrySpecificTerms = (countryCode: string) => {
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

const getCountrySpecificPrivacy = (countryCode: string) => {
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

const getCountrySpecificCookies = (countryCode: string) => {
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

const getCountrySpecificGDPR = (countryCode: string) => {
  const gdprCountries = ["GB", "DE", "FR", "ES", "IT", "NL", "SE", "DK", "FI", "AT", "BE", "IE"];
  
  if (gdprCountries.includes(countryCode)) {
    return "The General Data Protection Regulation (GDPR) applies to your use of our services. We are committed to protecting your data rights under GDPR.";
  } else {
    return "While the GDPR may not directly apply to your region, we strive to apply its principles of data protection and privacy globally.";
  }
};

export default Policy;
