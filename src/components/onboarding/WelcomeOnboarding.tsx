import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { CheckCircle2 } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import { useUserStatus } from "@/hooks/useUserStatus";

const WelcomeOnboarding = () => {
  const navigate = useNavigate();
  const [currentStep, setCurrentStep] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const userStatus = useUserStatus();

  // Redirect if onboarding is already complete
  useEffect(() => {
    if (!userStatus.loading && userStatus.hasCompletedOnboarding) {
      navigate("/phase-one");
    }
  }, [userStatus.loading, userStatus.hasCompletedOnboarding, navigate]);

  const steps = [
    {
      title: "Welcome to Recover & Reclaim",
      description: "Your personalized headache management program starts here.",
      points: [
        "Evidence-based treatment protocols",
        "Progressive 4-phase program",
        "Track your progress and symptoms",
        "Build lasting relief strategies"
      ]
    },
    {
      title: "How the Program Works",
      description: "A structured approach to managing your headaches effectively.",
      points: [
        "Phase 1: Understanding (7 days)",
        "Phase 2: Building Skills (11 weeks)",
        "Phase 3: Integration (8 days)",
        "Phase 4: Long-term Success"
      ]
    },
    {
      title: "Ready to Begin?",
      description: "Let's start your journey to reclaiming your life from headaches.",
      points: [
        "Complete daily exercises",
        "Track your headache patterns",
        "Follow the structured program",
        "Build your personalized strategy"
      ]
    }
  ];

  const handleComplete = async () => {
    console.log("Start My Program button clicked");
    setIsLoading(true);
    try {
      const { data: { user } } = await supabase.auth.getUser();
      console.log("Current user:", user?.id);
      
      if (!user) {
        toast.error("Please sign in to continue");
        navigate("/sign-in");
        return;
      }

      // Create user progress record with proper conflict resolution
      const { error: progressError } = await supabase
        .from("user_progress")
        .upsert({
          user_id: user.id,
          has_completed_onboarding: true,
          current_phase: 1,
          phase_one_day: 1
        }, {
          onConflict: 'user_id'
        });

      console.log("Progress upsert result:", { error: progressError });
      if (progressError) throw progressError;

      toast.success("Welcome! Let's start Phase 1");
      
      // Navigate to dashboard with query param to indicate we're coming from onboarding
      // Dashboard will then redirect to the appropriate phase
      window.location.href = "/dashboard?from=onboarding";
    } catch (error) {
      console.error("Error completing onboarding:", error);
      toast.error("Failed to complete onboarding");
    } finally {
      setIsLoading(false);
    }
  };

  const currentStepData = steps[currentStep - 1];

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-4 bg-gradient-to-br from-background via-background to-muted">
      <Card className="w-full max-w-2xl p-8">
        <div className="text-center mb-8">
          <div className="flex justify-center gap-2 mb-6">
            {steps.map((_, index) => (
              <div
                key={index}
                className={`h-2 w-16 rounded-full transition-colors ${
                  index + 1 <= currentStep ? "bg-primary" : "bg-muted"
                }`}
              />
            ))}
          </div>
          
          <h1 className="text-3xl font-bold mb-2">{currentStepData.title}</h1>
          <p className="text-muted-foreground">{currentStepData.description}</p>
        </div>

        <div className="space-y-4 mb-8">
          {currentStepData.points.map((point, index) => (
            <div key={index} className="flex items-start gap-3">
              <CheckCircle2 className="w-6 h-6 text-primary flex-shrink-0 mt-0.5" />
              <p className="text-foreground">{point}</p>
            </div>
          ))}
        </div>

        <div className="flex justify-between">
          {currentStep > 1 && (
            <Button
              variant="outline"
              onClick={() => setCurrentStep(currentStep - 1)}
            >
              Previous
            </Button>
          )}
          
          <div className="ml-auto">
            {currentStep < steps.length ? (
              <Button onClick={() => setCurrentStep(currentStep + 1)}>
                Next
              </Button>
            ) : (
              <Button onClick={handleComplete} disabled={isLoading}>
                {isLoading ? "Starting..." : "Start My Program"}
              </Button>
            )}
          </div>
        </div>
      </Card>
    </div>
  );
};

export default WelcomeOnboarding;
