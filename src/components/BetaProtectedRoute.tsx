import { ReactNode } from 'react';
import { useTokenValidation } from '@/hooks/useTokenValidation';
import { Loader2, ShieldX, Clock } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface BetaProtectedRouteProps {
  children: ReactNode;
  signupUrl?: string;
}

const DEFAULT_SIGNUP_URL = 'https://headacherecovery.org/#beta-signup';

export const BetaProtectedRoute = ({ 
  children, 
  signupUrl = DEFAULT_SIGNUP_URL 
}: BetaProtectedRouteProps) => {
  const { isValidating, isValid, error, isExpired } = useTokenValidation();

  if (isValidating) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-background">
        <Loader2 className="h-12 w-12 animate-spin text-primary mb-4" />
        <p className="text-muted-foreground">Validating your access...</p>
      </div>
    );
  }

  if (!isValid) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-background p-4">
        <div className="max-w-md text-center space-y-6">
          {isExpired ? (
            <Clock className="h-16 w-16 text-amber-500 mx-auto" />
          ) : (
            <ShieldX className="h-16 w-16 text-destructive mx-auto" />
          )}
          <h1 className="text-2xl font-bold text-foreground">
            {isExpired ? 'Access Expired' : 'Beta Access Required'}
          </h1>
          <p className="text-muted-foreground">
            {isExpired 
              ? 'Your beta access token has expired. Please request a new access link.'
              : error || 'You need a valid beta access token to access this program.'}
          </p>
          <Button asChild size="lg">
            <a href={signupUrl}>
              {isExpired ? 'Request New Access' : 'Request Beta Access'}
            </a>
          </Button>
          <p className="text-sm text-muted-foreground">
            Already have access? Check your email for the access link.
          </p>
        </div>
      </div>
    );
  }

  return <>{children}</>;
};
