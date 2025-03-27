
import React from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { DataAccessControl } from "./DataAccessControl";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";

export const PrivacyModule = () => {
  const { toast } = useToast();
  
  const resetCookieConsent = () => {
    localStorage.removeItem("cookie-consent");
    localStorage.removeItem("cookie-consent-date");
    
    toast({
      title: "Cookie Preferences Reset",
      description: "You'll be asked for your cookie preferences next time you refresh the page."
    });
  };

  const resetAgeVerification = () => {
    localStorage.removeItem("age-verified");
    localStorage.removeItem("user-age-range");
    localStorage.removeItem("has-parental-consent");
    
    toast({
      title: "Age Verification Reset",
      description: "You'll be asked to verify your age next time you refresh the page."
    });
  };
  
  return (
    <Card>
      <CardHeader>
        <CardTitle>Privacy & Compliance Controls</CardTitle>
        <CardDescription>
          Manage your data privacy settings and compliance preferences
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div>
          <h3 className="text-lg font-medium mb-2">Data Access</h3>
          <p className="text-sm text-neutral-500 mb-4">
            Access, download or delete your personal data
          </p>
          <DataAccessControl />
        </div>
        
        <Separator />
        
        <div>
          <h3 className="text-lg font-medium mb-2">Cookie Preferences</h3>
          <p className="text-sm text-neutral-500 mb-4">
            Update your cookie consent settings
          </p>
          <Button variant="outline" onClick={resetCookieConsent}>
            Update Cookie Preferences
          </Button>
        </div>
        
        <Separator />
        
        <div>
          <h3 className="text-lg font-medium mb-2">Age Verification</h3>
          <p className="text-sm text-neutral-500 mb-4">
            Reset your age verification status
          </p>
          <Button variant="outline" onClick={resetAgeVerification}>
            Reset Age Verification
          </Button>
        </div>
        
        <Separator />
        
        <div>
          <h3 className="text-lg font-medium mb-2">Health Information Disclaimer</h3>
          <p className="text-sm text-neutral-500">
            The Recover & Reclaim application is designed to help track and manage headache symptoms. 
            It is not intended to replace professional medical advice, diagnosis, or treatment. 
            Always seek the advice of your physician or other qualified health provider with any 
            questions you may have regarding a medical condition.
          </p>
        </div>
      </CardContent>
    </Card>
  );
};
