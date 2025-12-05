import { useState, useEffect, useCallback } from "react";
import { BetaSignupModal } from "./BetaSignupModal";

export const ExitIntentPopup = () => {
  const [showModal, setShowModal] = useState(false);
  const [hasShown, setHasShown] = useState(false);

  const handleMouseLeave = useCallback((e: MouseEvent) => {
    // Only trigger when mouse leaves through the top of the page
    if (e.clientY <= 0 && !hasShown) {
      const hasSubmitted = localStorage.getItem("beta_signup_submitted") === "true";
      const hasDismissed = sessionStorage.getItem("beta_popup_dismissed") === "true";
      
      if (!hasSubmitted && !hasDismissed) {
        setShowModal(true);
        setHasShown(true);
      }
    }
  }, [hasShown]);

  useEffect(() => {
    document.addEventListener("mouseleave", handleMouseLeave);
    return () => {
      document.removeEventListener("mouseleave", handleMouseLeave);
    };
  }, [handleMouseLeave]);

  const handleOpenChange = (open: boolean) => {
    setShowModal(open);
    if (!open) {
      sessionStorage.setItem("beta_popup_dismissed", "true");
    }
  };

  return <BetaSignupModal open={showModal} onOpenChange={handleOpenChange} />;
};
