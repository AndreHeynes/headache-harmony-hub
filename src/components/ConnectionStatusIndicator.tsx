import { useState, useEffect } from "react";
import { WifiOff } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const ConnectionStatusIndicator = () => {
  const [isOnline, setIsOnline] = useState(navigator.onLine);
  const [showIndicator, setShowIndicator] = useState(!navigator.onLine);

  useEffect(() => {
    const handleOnline = () => {
      setIsOnline(true);
      // Show "back online" briefly before hiding
      setTimeout(() => setShowIndicator(false), 2000);
    };

    const handleOffline = () => {
      setIsOnline(false);
      setShowIndicator(true);
    };

    window.addEventListener("online", handleOnline);
    window.addEventListener("offline", handleOffline);

    return () => {
      window.removeEventListener("online", handleOnline);
      window.removeEventListener("offline", handleOffline);
    };
  }, []);

  return (
    <AnimatePresence>
      {showIndicator && (
        <motion.div
          initial={{ y: -100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: -100, opacity: 0 }}
          transition={{ type: "spring", stiffness: 300, damping: 30 }}
          className={`fixed top-0 left-0 right-0 z-[100] px-4 py-2 text-center text-sm font-medium ${
            isOnline
              ? "bg-green-500 text-white"
              : "bg-amber-500 text-amber-950"
          }`}
        >
          {isOnline ? (
            "Back online - your data will now sync"
          ) : (
            <span className="flex items-center justify-center gap-2">
              <WifiOff className="h-4 w-4" />
              You're offline - changes won't be saved until you reconnect
            </span>
          )}
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default ConnectionStatusIndicator;
