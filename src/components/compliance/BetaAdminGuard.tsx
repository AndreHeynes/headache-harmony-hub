import { ReactNode, useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import { useBetaSession } from "@/contexts/BetaSessionContext";
import { supabase } from "@/integrations/supabase/client";
import { Loader2 } from "lucide-react";

interface BetaAdminGuardProps {
  children: ReactNode;
}

export const BetaAdminGuard = ({ children }: BetaAdminGuardProps) => {
  const { session } = useBetaSession();
  const [isAdmin, setIsAdmin] = useState<boolean | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const checkAdminRole = async () => {
      if (!session.isAuthenticated || !session.user?.id) {
        setIsAdmin(false);
        setLoading(false);
        return;
      }

      try {
        // Check admin role server-side using has_role RPC
        const { data, error } = await supabase.rpc("has_role", {
          _user_id: session.user.id,
          _role: "admin"
        });

        if (error) {
          console.error("Error checking admin role:", error);
          setIsAdmin(false);
        } else {
          setIsAdmin(data === true);
        }
      } catch (err) {
        console.error("Error checking admin role:", err);
        setIsAdmin(false);
      } finally {
        setLoading(false);
      }
    };

    checkAdminRole();
  }, [session.isAuthenticated, session.user?.id]);

  if (loading || !session.isAuthenticated) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loader2 className="h-12 w-12 animate-spin text-primary" />
      </div>
    );
  }

  if (!isAdmin) {
    return <Navigate to="/dashboard" replace />;
  }

  return <>{children}</>;
};
