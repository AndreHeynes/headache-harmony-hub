
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

const PhaseThree = () => {
  const { toast } = useToast();
  const [currentDay, setCurrentDay] = useState(1);
  const totalDays = 7;
  
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
  
  const goToNextDay = () => {
    if (currentDay < totalDays) {
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

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
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
        <ExternalTracking phase={3} />
      </div>
    </PageLayout>
  );
};

export default PhaseThree;
