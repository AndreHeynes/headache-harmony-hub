import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { BetaSignupForm } from "@/components/beta/BetaSignupForm";
import { FlaskConical, Gift } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";

const BetaSignup = () => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-neutral-50 to-white flex items-center justify-center p-4">
      <div className="w-full max-w-xl">
        <div className="text-center mb-8">
          <img
            src="/lovable-uploads/37b87337-8892-418a-932d-e700a3a4568d.png"
            alt="Recover From Headache Logo"
            className="w-24 h-24 mx-auto mb-4"
          />
          <h1 className="text-2xl font-bold text-neutral-900">
            Recover from Headache, Reclaim Your Life!
          </h1>
        </div>

        <Card className="border-2 border-primary/20 shadow-lg">
          <CardHeader className="text-center pb-2">
            <div className="flex justify-center mb-4">
              <div className="p-3 bg-primary/10 rounded-full">
                <FlaskConical className="h-8 w-8 text-primary" />
              </div>
            </div>
            <CardTitle className="text-xl md:text-2xl">Join Our Beta Program</CardTitle>
            <CardDescription className="text-base mt-2">
              Be among the first to experience our 12-week headache recovery program
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="bg-green-50 border border-green-200 rounded-lg p-4 mb-6 flex items-start gap-3">
              <Gift className="h-5 w-5 text-green-600 mt-0.5 flex-shrink-0" />
              <div>
                <p className="font-medium text-green-800">Beta Tester Incentive</p>
                <p className="text-sm text-green-700">
                  Receive 1 month free premium access to My Headache Experience Journal App
                </p>
              </div>
            </div>
            <BetaSignupForm />
          </CardContent>
        </Card>

        <div className="text-center mt-6">
          <Link to="/">
            <Button variant="ghost" className="text-muted-foreground">
              ← Back to Home
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default BetaSignup;
