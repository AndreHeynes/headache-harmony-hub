
import React, { useState, useEffect } from "react";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";

export const AgeVerification = () => {
  const [open, setOpen] = useState(false);
  const [age, setAge] = useState<string>("");
  const { toast } = useToast();

  useEffect(() => {
    // Check if age has been verified
    const ageVerified = localStorage.getItem("age-verified");
    if (!ageVerified) {
      setOpen(true);
    }
  }, []);

  const handleVerify = () => {
    if (!age) {
      toast({
        title: "Age Required",
        description: "Please select your age to continue.",
        variant: "destructive"
      });
      return;
    }

    const ageNumber = parseInt(age);
    if (ageNumber < 18) {
      toast({
        title: "Age Restriction",
        description: "You must be 18 or older to use this service.",
        variant: "destructive"
      });
      return;
    }

    // Save age verification status
    localStorage.setItem("age-verified", "true");
    localStorage.setItem("user-age-range", age);
    
    setOpen(false);
    
    toast({
      title: "Verification Complete",
      description: "Thank you for verifying your age."
    });
  };

  // Generate age options (18-99)
  const ageOptions = [];
  for (let i = 18; i < 100; i++) {
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
            This application contains medical information intended for adults 18 years and older.
            Please verify your age to continue.
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
        </div>

        <DialogFooter>
          <Button onClick={handleVerify} disabled={!age}>
            Continue
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
