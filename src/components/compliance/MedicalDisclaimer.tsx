
import React, { useState, useEffect } from "react";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";

export const MedicalDisclaimer = () => {
  const [open, setOpen] = useState(false);
  const [accepted, setAccepted] = useState(false);

  useEffect(() => {
    // Check if the disclaimer has been accepted
    const hasAccepted = localStorage.getItem("medical-disclaimer-accepted");
    if (!hasAccepted) {
      setOpen(true);
    }
  }, []);

  const handleAccept = () => {
    if (accepted) {
      localStorage.setItem("medical-disclaimer-accepted", "true");
      localStorage.setItem("medical-disclaimer-date", new Date().toISOString());
      setOpen(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={(newOpen) => {
      // Prevent closing by clicking outside if not accepted
      if (!localStorage.getItem("medical-disclaimer-accepted")) {
        return;
      }
      setOpen(newOpen);
    }}>
      <DialogContent className="sm:max-w-[600px]">
        <DialogHeader>
          <DialogTitle>Medical Disclaimer</DialogTitle>
          <DialogDescription>
            Important information about the health-related content in this application
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-4 py-4 max-h-[50vh] overflow-y-auto">
          <h3 className="font-medium">Not Medical Advice</h3>
          <p className="text-sm text-neutral-600 mb-4">
            The content provided in the Recover & Reclaim application is for informational and educational 
            purposes only. It is not intended to be a substitute for professional medical advice, diagnosis, 
            or treatment. Always seek the advice of your physician or other qualified healthcare provider 
            with any questions you may have regarding a medical condition.
          </p>

          <h3 className="font-medium">No Doctor-Patient Relationship</h3>
          <p className="text-sm text-neutral-600 mb-4">
            Using this application does not create a doctor-patient relationship. The information provided 
            is general in nature and may not apply to your specific health situation.
          </p>

          <h3 className="font-medium">Not for Emergencies</h3>
          <p className="text-sm text-neutral-600 mb-4">
            This application is not designed for use in medical emergencies. If you are experiencing a 
            medical emergency, please call your local emergency services immediately.
          </p>

          <h3 className="font-medium">Data Security</h3>
          <p className="text-sm text-neutral-600 mb-4">
            While we take reasonable measures to protect your health information, no system can guarantee 
            complete security. By using this application, you acknowledge and accept this limitation.
          </p>

          <h3 className="font-medium">Health Tracking Tools</h3>
          <p className="text-sm text-neutral-600 mb-4">
            The headache tracking tools and exercises provided in this application are designed to support 
            your self-management efforts but should be used in conjunction with professional medical care.
          </p>

          <div className="flex items-start space-x-3 pt-4">
            <Checkbox 
              id="disclaimer-accept" 
              checked={accepted}
              onCheckedChange={(checked) => setAccepted(checked as boolean)}
            />
            <label htmlFor="disclaimer-accept" className="text-sm">
              I have read and understood this medical disclaimer and agree to use the Recover & Reclaim 
              application with the understanding that it does not replace professional medical advice.
            </label>
          </div>
        </div>

        <DialogFooter>
          <Button onClick={handleAccept} disabled={!accepted}>
            Accept & Continue
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
