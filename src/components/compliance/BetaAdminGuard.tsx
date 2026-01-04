import { ReactNode } from "react";
import { Navigate } from "react-router-dom";
import { useBetaSession } from "@/contexts/BetaSessionContext";
import { Loader2 } from "lucide-react";

// Admin emails for beta testing - can be configured via environment variable
const BETA_ADMIN_EMAILS = [
  "andreheynes@hotmail.com",
];

interface BetaAdminGuardProps {
  children: ReactNode;
}

export const BetaAdminGuard = ({ children }: BetaAdminGuardProps) => {
  const { session } = useBetaSession();

  if (!session.isAuthenticated) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loader2 className="h-12 w-12 animate-spin text-primary" />
      </div>
    );
  }

  const userEmail = session.user?.email?.toLowerCase();
  const isAdmin = userEmail && BETA_ADMIN_EMAILS.map(e => e.toLowerCase()).includes(userEmail);

  if (!isAdmin) {
    return <Navigate to="/dashboard" replace />;
  }

  return <>{children}</>;
};
