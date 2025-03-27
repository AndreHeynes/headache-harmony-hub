
import React, { useState, useEffect } from "react";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";

export const AgeVerification = () => {
  const [open, setOpen] = useState(false);
  const [age, setAge] = useState<string>("");
  const [needsParentalConsent, setNeedsParentalConsent] = useState(false);
  const [hasParentalConsent, setHasParentalConsent] = useState(false);
  const { toast } = useToast();

  useEffect(() => {
    // Check if age has been verified
    const ageVerified = localStorage.getItem("age-verified");
    if (!ageVerified) {
      setOpen(true);
    }
  }, []);

  useEffect(() => {
    if (age) {
      const ageNumber = parseInt(age);
      setNeedsParentalConsent(ageNumber < 16);
    }
  }, [age]);

  const handleVerify = () => {
    if (!age) {
      toast({
        title: "Age Required",
        description: "Please select your age to continue.",
        variant: "destructive"
      });
      return;
    }

    if (needsParentalConsent && !hasParentalConsent) {
      toast({
        title: "Parental Consent Required",
        description: "Please confirm you have parental consent to use this service.",
        variant: "destructive"
      });
      return;
    }

    // Save age verification status
    localStorage.setItem("age-verified", "true");
    localStorage.setItem("user-age-range", age);
    
    if (needsParentalConsent) {
      localStorage.setItem("has-parental-consent", "true");
    }
    
    setOpen(false);
    
    toast({
      title: "Verification Complete",
      description: "Thank you for verifying your age."
    });
  };

  // Generate age options (13-99)
  const ageOptions = [];
  for (let i = 13; i < 100; i++) {
    ageOptions.push(i.toString());
  }

  return (
    <Dialog open={open} onOpenChange={(newOpen) => {
      // Prevent closing by clicking outside if not verified
      if (!localStorage.getItem("age-verified")) {
        return;
      }
      setOpen(newOpen);
    }}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Age Verification</DialogTitle>
          <DialogDescription>
            To comply with regulations, we need to verify your age before you can use our service.
          </DialogDescription>
        </DialogHeader>

        <div className="grid gap-4 py-4">
          <div className="grid gap-2">
            <label htmlFor="age-select" className="text-sm font-medium">
              Please select your age:
            </label>
            <Select value={age} onValueChange={setAge}>
              <SelectTrigger id="age-select">
                <SelectValue placeholder="Select your age" />
              </SelectTrigger>
              <SelectContent>
                {ageOptions.map((ageOption) => (
                  <SelectItem key={ageOption} value={ageOption}>
                    {ageOption}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {needsParentalConsent && (
            <div className="flex items-start space-x-3 pt-2">
              <input 
                type="checkbox" 
                id="parental-consent" 
                className="mt-1"
                checked={hasParentalConsent}
                onChange={(e) => setHasParentalConsent(e.target.checked)}
              />
              <label htmlFor="parental-consent" className="text-sm">
                I confirm that I have permission from my parent or guardian to use this service, and they have reviewed and agree to the <a href="/policy" className="text-blue-600 hover:underline">Privacy Policy</a> and <a href="/policy?tab=terms" className="text-blue-600 hover:underline">Terms of Service</a>.
              </label>
            </div>
          )}
        </div>

        <DialogFooter>
          <Button onClick={handleVerify} disabled={!age || (needsParentalConsent && !hasParentalConsent)}>
            Continue
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
