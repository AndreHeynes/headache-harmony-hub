
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

const PhaseThree = () => {
  const { toast } = useToast();
  const [currentDay, setCurrentDay] = useState(1);
  const totalDays = 8; // Updated to 8 days to include feedback day
  
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
    };
    
    loadCompletedQuestionnaires();
    
    // Listen for changes to localStorage
    window.addEventListener('storage', loadCompletedQuestionnaires);
    
    return () => {
      window.removeEventListener('storage', loadCompletedQuestionnaires);
    };
  }, []);
  
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

  return (
    <>
      <PageLayout>
        <div className="flex justify-between items-center mb-8">
          <PhaseHeading title="Consolidating your recovery progress" />
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
          
          {/* Only show external tracking for day 8 if specifically on that day, otherwise show the normal external tracking */}
          {currentDay === 8 ? (
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-lg">Additional Recovery Resources</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="border rounded-lg p-4 bg-blue-50 border-blue-100">
                    <h3 className="font-medium mb-2 text-blue-800">Phase 4 Preparation</h3>
                    <p className="text-blue-700 mb-3">
                      Your Phase 4 maintenance plan is now available. This includes long-term strategies to maintain your progress.
                    </p>
                    <Button variant="outline" className="bg-white text-blue-700 border-blue-200 hover:bg-blue-50">
                      View Phase 4 Plan
                    </Button>
                  </div>
                  
                  <div className="border rounded-lg p-4 bg-purple-50 border-purple-100">
                    <h3 className="font-medium mb-2 text-purple-800">Download Your Progress Report</h3>
                    <p className="text-purple-700 mb-3">
                      A comprehensive report of your progress through all three phases is available for download.
                    </p>
                    <Button variant="outline" className="bg-white text-purple-700 border-purple-200 hover:bg-purple-50">
                      Download Report
                    </Button>
                  </div>
                </div>
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
