import { ReactNode } from "react";
import { useBetaSession } from "@/hooks/useTokenValidation";
import { Loader2, ShieldX } from "lucide-react";
import { Button } from "@/components/ui/button";

interface BetaAccessGateProps {
  children: ReactNode;
  signupUrl?: string;
}

export function BetaAccessGate({ 
  children, 
  signupUrl = "https://headache-recovery.lovable.app" 
}: BetaAccessGateProps) {
  const { isValidating, isValid, error } = useBetaSession();

  if (isValidating) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <div className="text-center space-y-4">
          <Loader2 className="h-12 w-12 animate-spin text-primary mx-auto" />
          <p className="text-muted-foreground">Validating your access...</p>
        </div>
      </div>
    );
  }

  if (!isValid) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background p-4">
        <div className="max-w-md w-full text-center space-y-6">
          <div className="mx-auto w-16 h-16 rounded-full bg-destructive/10 flex items-center justify-center">
            <ShieldX className="h-8 w-8 text-destructive" />
          </div>
          
          <div className="space-y-2">
            <h1 className="text-2xl font-bold text-foreground">Access Required</h1>
            <p className="text-muted-foreground">
              {error || "You need a valid beta access token to use this app."}
            </p>
          </div>

          <div className="space-y-3">
            <p className="text-sm text-muted-foreground">
              Don't have access yet? Sign up for the beta program:
            </p>
            <Button asChild>
              <a href={signupUrl} target="_blank" rel="noopener noreferrer">
                Join Beta Program
              </a>
            </Button>
          </div>

          <p className="text-xs text-muted-foreground">
            If you believe this is an error, please contact support.
          </p>
        </div>
      </div>
    );
  }

  return <>{children}</>;
}
