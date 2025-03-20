
import React, { useState, useEffect } from "react";
import { ArrowLeft, ArrowRight } from "lucide-react";
import PageLayout from "@/components/layout/PageLayout";
import CurrentPhaseCard from "@/components/phase/CurrentPhaseCard";
import PhaseTimeline from "@/components/phase/PhaseTimeline";
import ExternalTracking from "@/components/phase/ExternalTracking";
import PhaseHeading from "@/components/phase/PhaseHeading";
import PhaseThreeContent from "@/components/phase-three/PhaseThreeContent";
import PhaseThreeTaskList from "@/components/phase-three/PhaseThreeTaskList";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import PageFooter from "@/components/layout/PageFooter";
import HeadacheAnalysis from "@/components/phase/HeadacheAnalysis";

const PhaseThree = () => {
  const { toast } = useToast();
  const [currentDay, setCurrentDay] = useState(1);
  const totalDays = 8; // 8 days to include feedback day
  
  // Initialize currentDay from localStorage or set to 1
  useEffect(() => {
    const savedDay = localStorage.getItem('phase3-current-day');
    if (savedDay) {
      setCurrentDay(parseInt(savedDay, 10));
    }
  }, []);
  
  // Save currentDay to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem('phase3-current-day', currentDay.toString());
    console.log("Current day set to:", currentDay);
  }, [currentDay]);
  
  // Track completed questionnaires
  const [completedQuestionnaires, setCompletedQuestionnaires] = useState<Record<string, boolean>>({});
  
  useEffect(() => {
    // Load completed questionnaires from localStorage
    const loadCompletedQuestionnaires = () => {
      const questionnaires = ['hit-6', 'midas', 'psfs', 'gpoc'];
      const completed: Record<string, boolean> = {};
      
      questionnaires.forEach(id => {
        const savedResponse = localStorage.getItem(`questionnaire-${id}`);
        if (savedResponse) {
          completed[id] = true;
        }
      });
      
      setCompletedQuestionnaires(completed);
      console.log("Loaded questionnaires in PhaseThree:", completed);
    };
    
    loadCompletedQuestionnaires();
    
    // Listen for changes to localStorage
    window.addEventListener('storage', loadCompletedQuestionnaires);
    
    return () => {
      window.removeEventListener('storage', loadCompletedQuestionnaires);
    };
  }, []);
  
  // Show a reminder toast when user reaches day 7 and hasn't completed all questionnaires
  useEffect(() => {
    if (currentDay === 7) {
      const incompleteQuestionnaires = ['hit-6', 'midas', 'psfs', 'gpoc'].filter(
        id => !completedQuestionnaires[id]
      );
      
      if (incompleteQuestionnaires.length > 0) {
        toast({
          title: "Incomplete Assessments",
          description: `Please complete the following assessments before proceeding to Day 8: ${incompleteQuestionnaires.join(', ')}`,
          variant: "default" // Changed from "warning" to "default" since "warning" is not an allowed variant
        });
      }
    }
  }, [currentDay, completedQuestionnaires, toast]);
  
  const goToNextDay = () => {
    if (currentDay < totalDays) {
      // If going to day 8, check if all questionnaires are completed
      if (currentDay === 7 && Object.keys(completedQuestionnaires).length < 4) {
        toast({
          title: "Assessments Incomplete",
          description: "Please complete all assessments before proceeding to view your feedback.",
          variant: "destructive"
        });
        return;
      }
      
      setCurrentDay(currentDay + 1);
      
      // Show completion toast for final day
      if (currentDay === totalDays - 1) {
        toast({
          title: "Phase 3 Complete!",
          description: "Congratulations on completing Phase 3! You're now ready to move to Phase 4.",
        });
      }
    }
  };
  
  const goToPreviousDay = () => {
    if (currentDay > 1) {
      setCurrentDay(currentDay - 1);
    }
  };

  // FOR TESTING ONLY: Navigate directly to day 8
  const goToDay8 = () => {
    console.log("Going to day 8 for testing");
    // Add some mock data for testing
    const questionnaires = ['hit-6', 'midas', 'psfs', 'gpoc'];
    questionnaires.forEach(id => {
      if (!localStorage.getItem(`questionnaire-${id}`)) {
        localStorage.setItem(`questionnaire-${id}`, JSON.stringify({completed: true}));
      }
    });
    
    setCurrentDay(8);
    // Force reload completed questionnaires
    const completed: Record<string, boolean> = {};
    questionnaires.forEach(id => {
      completed[id] = true;
    });
    setCompletedQuestionnaires(completed);
    console.log("Set current day to 8 and completed questionnaires:", completed);
  };

  return (
    <>
      <PageLayout>
        <div className="flex justify-between items-center mb-8">
          <PhaseHeading title="Consolidating your recovery progress" />
          
          {/* Test button for Day 8 - always visible for debugging */}
          <Button 
            onClick={goToDay8}
            variant="secondary"
            size="sm"
            className="ml-auto"
          >
            Test Day 8
          </Button>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-4">
          <CurrentPhaseCard 
            day={currentDay} 
            totalDays={totalDays} 
            phaseNumber={3} 
          />
          <PhaseThreeTaskList day={currentDay} />
          <PhaseTimeline currentPhase={3} />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          <Card>
            <CardHeader className="pb-2 flex justify-between items-center">
              <CardTitle className="text-lg">Day {currentDay} Content</CardTitle>
              <div className="flex space-x-2">
                <Button 
                  onClick={goToPreviousDay}
                  disabled={currentDay === 1}
                  variant="outline"
                  size="sm"
                >
                  <ArrowLeft className="h-4 w-4 mr-1" />
                  Previous
                </Button>
                <Button 
                  onClick={goToNextDay}
                  disabled={currentDay === totalDays}
                  variant="outline"
                  size="sm"
                >
                  Next
                  <ArrowRight className="h-4 w-4 ml-1" />
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <PhaseThreeContent day={currentDay} />
            </CardContent>
          </Card>
          
          {/* Only show headache analysis for day 8, otherwise show the normal external tracking */}
          {currentDay === 8 ? (
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-lg">Headache Progress Analysis</CardTitle>
              </CardHeader>
              <CardContent>
                <HeadacheAnalysis isConnected={true} showInPhaseThree={true} />
              </CardContent>
            </Card>
          ) : (
            <ExternalTracking phase={3} />
          )}
        </div>
      </PageLayout>
      <PageFooter />
    </>
  );
};

export default PhaseThree;

