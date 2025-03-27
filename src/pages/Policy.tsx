
import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { isGdprCountry } from "@/utils/policy/countryUtils";
import PolicyHeader from "@/components/policy/PolicyHeader";
import PolicyFooter from "@/components/policy/PolicyFooter";
import CountrySelector from "@/components/policy/CountrySelector";
import TermsOfService from "@/components/policy/TermsOfService";
import PrivacyPolicy from "@/components/policy/PrivacyPolicy";
import CookiePolicy from "@/components/policy/CookiePolicy";
import GdprCompliance from "@/components/policy/GdprCompliance";

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
      <PolicyHeader />

      <main className="pt-28 pb-16">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h1 className="text-3xl md:text-4xl font-bold mb-6 text-neutral-900">Legal Policies</h1>
            
            <CountrySelector 
              selectedCountry={selectedCountry} 
              setSelectedCountry={setSelectedCountry} 
            />

            <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
              <TabsList className={`grid ${showGdprTab ? 'grid-cols-4' : 'grid-cols-3'} mb-8 bg-neutral-100`}>
                <TabsTrigger value="terms">Terms of Service</TabsTrigger>
                <TabsTrigger value="privacy">Privacy Policy</TabsTrigger>
                <TabsTrigger value="cookies">Cookie Policy</TabsTrigger>
                {showGdprTab && <TabsTrigger value="gdpr">GDPR Compliance</TabsTrigger>}
              </TabsList>

              <TabsContent value="terms">
                <TermsOfService selectedCountry={selectedCountry} />
              </TabsContent>

              <TabsContent value="privacy">
                <PrivacyPolicy selectedCountry={selectedCountry} />
              </TabsContent>

              <TabsContent value="cookies">
                <CookiePolicy selectedCountry={selectedCountry} />
              </TabsContent>

              {showGdprTab && (
                <TabsContent value="gdpr">
                  <GdprCompliance selectedCountry={selectedCountry} />
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

      <PolicyFooter />
    </div>
  );
};

export default Policy;
