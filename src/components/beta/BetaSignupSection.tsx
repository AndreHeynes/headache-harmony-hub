import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { BetaSignupForm } from "./BetaSignupForm";
import { FlaskConical, Gift } from "lucide-react";

export const BetaSignupSection = () => {
  const hasAlreadySubmitted = localStorage.getItem("beta_signup_submitted") === "true";

  if (hasAlreadySubmitted) {
    return null;
  }

  return (
    <section className="py-16 bg-gradient-to-b from-neutral-50 to-white">
      <div className="container mx-auto px-4">
        <div className="max-w-2xl mx-auto">
          <Card className="border-2 border-primary/20 shadow-lg">
            <CardHeader className="text-center pb-2">
              <div className="flex justify-center mb-4">
                <div className="p-3 bg-primary/10 rounded-full">
                  <FlaskConical className="h-8 w-8 text-primary" />
                </div>
              </div>
              <CardTitle className="text-2xl md:text-3xl">Join Our Beta Program</CardTitle>
              <CardDescription className="text-base mt-2">
                Be among the first to experience "Recover from Headache, Reclaim Your Life!"
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
        </div>
      </div>
    </section>
  );
};
