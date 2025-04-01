
import React, { useState } from "react";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { secureRetrieve, secureStore, secureRemove } from "@/utils/security/encryption";

export const DataAccessControl = () => {
  const [downloadInProgress, setDownloadInProgress] = useState(false);
  const [deleteRequestInProgress, setDeleteRequestInProgress] = useState(false);
  const { toast } = useToast();

  const handleDataDownload = () => {
    setDownloadInProgress(true);
    
    // Simulate preparing the data
    setTimeout(() => {
      // Collect all user data using secure retrieval
      const userData = {
        profile: secureRetrieve("user-profile") || {},
        preferences: secureRetrieve("user-preferences") || {},
        activities: secureRetrieve("user-activities") || [],
        headacheData: secureRetrieve("headache-data") || [],
        // Add other data points as needed
      };
      
      // Create a downloadable file
      const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(userData, null, 2));
      const downloadAnchorNode = document.createElement('a');
      downloadAnchorNode.setAttribute("href", dataStr);
      downloadAnchorNode.setAttribute("download", "personal_data.json");
      document.body.appendChild(downloadAnchorNode);
      downloadAnchorNode.click();
      downloadAnchorNode.remove();
      
      setDownloadInProgress(false);
      
      toast({
        title: "Data Export Complete",
        description: "Your personal data has been downloaded."
      });
    }, 2000);
  };

  const handleDataDeletion = () => {
    setDeleteRequestInProgress(true);
    
    // Simulate the deletion process
    setTimeout(() => {
      // In a real implementation, you would connect to your backend to delete the data
      // For this demo, we'll just clear localStorage
      const keysToKeep = ["cookie-consent", "cookie-consent-date"]; // Keep consent settings
      
      // Get all keys from localStorage
      const allKeys = Object.keys(localStorage);
      
      // Remove items that aren't in the keep list
      allKeys.forEach(key => {
        if (!keysToKeep.includes(key)) {
          secureRemove(key);
        }
      });
      
      setDeleteRequestInProgress(false);
      
      toast({
        title: "Data Deletion Complete",
        description: "Your personal data has been deleted from our system."
      });
    }, 2000);
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline">Manage Your Data</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle>Your Data Privacy Controls</DialogTitle>
          <DialogDescription>
            Under GDPR, CCPA and other privacy regulations, you have rights regarding your personal data.
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-6 py-4">
          <div className="space-y-2">
            <h3 className="text-lg font-medium">Download Your Data</h3>
            <p className="text-sm text-neutral-500">
              You can download all personal data we have collected about you.
              This includes your profile information, settings, and usage data.
            </p>
            <Button 
              variant="outline" 
              onClick={handleDataDownload}
              disabled={downloadInProgress}
            >
              {downloadInProgress ? "Preparing..." : "Download My Data"}
            </Button>
          </div>

          <div className="space-y-2">
            <h3 className="text-lg font-medium">Delete Your Data</h3>
            <p className="text-sm text-neutral-500">
              You can request the deletion of all your personal data from our systems.
              This action cannot be undone.
            </p>
            <Button 
              variant="destructive" 
              onClick={handleDataDeletion}
              disabled={deleteRequestInProgress}
            >
              {deleteRequestInProgress ? "Processing..." : "Delete All My Data"}
            </Button>
          </div>

          <div className="space-y-2">
            <h3 className="text-lg font-medium">Do Not Sell My Personal Information</h3>
            <p className="text-sm text-neutral-500">
              Under the California Consumer Privacy Act (CCPA), you have the right to opt-out 
              of the sale of your personal information.
            </p>
            <Button variant="outline" onClick={() => {
              secureStore("do-not-sell", "true");
              toast({
                title: "Preference Saved",
                description: "Your 'Do Not Sell' preference has been saved."
              });
            }}>
              Opt Out of Data Sales
            </Button>
          </div>
        </div>

        <DialogFooter>
          <p className="text-xs text-neutral-500">
            For more information about how we handle your data, please see our{" "}
            <a href="/policy" className="text-blue-600 hover:underline">Privacy Policy</a>.
          </p>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
