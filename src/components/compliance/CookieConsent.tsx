
import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { useToast } from "@/hooks/use-toast";

export const CookieConsent = () => {
  const [open, setOpen] = useState(false);
  const [showAdvanced, setShowAdvanced] = useState(false);
  const { toast } = useToast();
  
  // Cookie consent preferences
  const [preferences, setPreferences] = useState({
    necessary: true, // Always true and disabled
    analytics: false,
    marketing: false,
    personalizedContent: false
  });

  useEffect(() => {
    // Check if user has already consented
    const hasConsented = localStorage.getItem("cookie-consent");
    if (!hasConsented) {
      setOpen(true);
    }
  }, []);

  const handleAcceptAll = () => {
    const allAccepted = {
      necessary: true,
      analytics: true,
      marketing: true,
      personalizedContent: true
    };
    
    setPreferences(allAccepted);
    saveConsent(allAccepted);
    setOpen(false);
  };

  const handleAcceptSelected = () => {
    saveConsent(preferences);
    setOpen(false);
  };

  const saveConsent = (consentPreferences: typeof preferences) => {
    localStorage.setItem("cookie-consent", JSON.stringify(consentPreferences));
    localStorage.setItem("cookie-consent-date", new Date().toISOString());
    
    toast({
      title: "Preferences Saved",
      description: "Your cookie preferences have been saved."
    });
  };

  const resetConsent = () => {
    localStorage.removeItem("cookie-consent");
    localStorage.removeItem("cookie-consent-date");
    setOpen(true);
  };

  return (
    <>
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="sm:max-w-[500px]">
          <DialogHeader>
            <DialogTitle>Cookie Preferences</DialogTitle>
            <DialogDescription>
              We use cookies to enhance your experience, analyze site traffic, and for marketing purposes.
              You can choose which cookies you want to allow.
            </DialogDescription>
          </DialogHeader>

          {showAdvanced ? (
            <div className="space-y-4 py-4">
              <div className="flex items-start space-x-4">
                <Checkbox id="necessary" checked disabled />
                <div>
                  <label htmlFor="necessary" className="font-medium block">Necessary Cookies</label>
                  <p className="text-sm text-neutral-500">These cookies are required for basic site functionality and cannot be disabled.</p>
                </div>
              </div>
              
              <div className="flex items-start space-x-4">
                <Checkbox 
                  id="analytics" 
                  checked={preferences.analytics}
                  onCheckedChange={(checked) => 
                    setPreferences(prev => ({...prev, analytics: checked as boolean}))
                  }
                />
                <div>
                  <label htmlFor="analytics" className="font-medium block">Analytics Cookies</label>
                  <p className="text-sm text-neutral-500">These cookies help us improve our website by collecting anonymous information.</p>
                </div>
              </div>
              
              <div className="flex items-start space-x-4">
                <Checkbox 
                  id="marketing" 
                  checked={preferences.marketing}
                  onCheckedChange={(checked) => 
                    setPreferences(prev => ({...prev, marketing: checked as boolean}))
                  }
                />
                <div>
                  <label htmlFor="marketing" className="font-medium block">Marketing Cookies</label>
                  <p className="text-sm text-neutral-500">These cookies are used to track advertising effectiveness and to display personalized ads.</p>
                </div>
              </div>
              
              <div className="flex items-start space-x-4">
                <Checkbox 
                  id="personalized-content" 
                  checked={preferences.personalizedContent}
                  onCheckedChange={(checked) => 
                    setPreferences(prev => ({...prev, personalizedContent: checked as boolean}))
                  }
                />
                <div>
                  <label htmlFor="personalized-content" className="font-medium block">Personalized Content</label>
                  <p className="text-sm text-neutral-500">These cookies allow us to provide content that is more relevant to your interests.</p>
                </div>
              </div>
            </div>
          ) : null}

          <DialogFooter className="flex-col sm:flex-col gap-2">
            <div className="flex w-full justify-between">
              <Button 
                variant="ghost" 
                onClick={() => setShowAdvanced(!showAdvanced)}
                type="button"
              >
                {showAdvanced ? "Simple View" : "Advanced Settings"}
              </Button>
              <div className="flex gap-2">
                {showAdvanced && (
                  <Button
                    variant="outline"
                    onClick={handleAcceptSelected}
                  >
                    Save Preferences
                  </Button>
                )}
                <Button onClick={handleAcceptAll}>
                  Accept All
                </Button>
              </div>
            </div>
            <p className="text-xs text-center text-neutral-500 pt-2">
              By using our website, you acknowledge that you have read and understand our{" "}
              <Link to="/policy" className="text-blue-600 hover:underline">Privacy Policy</Link> and{" "}
              <Link to="/policy?tab=terms" className="text-blue-600 hover:underline">Terms of Service</Link>
            </p>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Floating "Manage Cookies" button - only visible when consent has been given */}
      {!open && (
        <button 
          onClick={resetConsent}
          className="fixed bottom-4 left-4 bg-neutral-800 text-white text-xs px-3 py-1 rounded-full opacity-50 hover:opacity-100 transition-opacity"
        >
          Manage Cookies
        </button>
      )}
    </>
  );
};
