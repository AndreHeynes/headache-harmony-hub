
import React, { useState, useEffect } from "react";
import { ArrowLeft, ArrowRight } from "lucide-react";
import PageLayout from "@/components/layout/PageLayout";
import CurrentPhaseCard from "@/components/phase/CurrentPhaseCard";
import PhaseTimeline from "@/components/phase/PhaseTimeline";
import ExternalTracking from "@/components/phase/ExternalTracking";
import PhaseHeading from "@/components/phase/PhaseHeading";
import PhaseTwoContent from "@/components/phase-two/PhaseTwoContent";
import PhaseTwoTaskList from "@/components/phase-two/PhaseTwoTaskList";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";

const PhaseTwo = () => {
  const { toast } = useToast();
  const [currentDay, setCurrentDay] = useState(1);
  const [videoDisplayMode, setVideoDisplayMode] = useState<"embedded" | "link">("link");
  const totalDays = 76;
  
  // Initialize currentDay from localStorage or set to 1
  useEffect(() => {
    const savedDay = localStorage.getItem('phase2-current-day');
    if (savedDay) {
      setCurrentDay(parseInt(savedDay, 10));
    }
    
    // Also load the video display preference
    const savedMode = localStorage.getItem('video-display-mode');
    if (savedMode === 'embedded' || savedMode === 'link') {
      setVideoDisplayMode(savedMode);
    }
  }, []);
  
  // Save currentDay to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem('phase2-current-day', currentDay.toString());
  }, [currentDay]);
  
  const goToNextDay = () => {
    if (currentDay < totalDays) {
      setCurrentDay(currentDay + 1);
      
      // Show completion toast for certain milestone days
      if (currentDay % 7 === 0) {
        toast({
          title: `Week ${Math.floor(currentDay / 7)} Completed!`,
          description: "Great job completing another week of your recovery program.",
        });
      }
      
      // Final day toast
      if (currentDay === totalDays - 1) {
        toast({
          title: "Phase 2 Complete!",
          description: "Congratulations on completing Phase 2! You're now ready to move to Phase 3.",
        });
      }
    }
  };
  
  const goToPreviousDay = () => {
    if (currentDay > 1) {
      setCurrentDay(currentDay - 1);
    }
  };
  
  const toggleVideoDisplayMode = () => {
    const newMode = videoDisplayMode === "link" ? "embedded" : "link";
    setVideoDisplayMode(newMode);
    localStorage.setItem('video-display-mode', newMode);
    
    toast({
      title: `Video Display Updated`,
      description: `Videos will now be shown as ${newMode === "link" ? "links" : "embedded players"}.`,
    });
  };

  return (
    <PageLayout>
      <div className="flex justify-between items-center mb-8">
        <PhaseHeading title="Building your recovery foundation" />
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
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-4">
        <CurrentPhaseCard 
          day={currentDay} 
          totalDays={totalDays} 
          phaseNumber={2} 
        />
        <PhaseTwoTaskList day={currentDay} />
        <PhaseTimeline currentPhase={2} />
      </div>
      
      <div className="flex justify-end mb-4">
        <Button 
          onClick={toggleVideoDisplayMode} 
          variant="outline" 
          size="sm"
        >
          Show videos as: {videoDisplayMode === "link" ? "Links" : "Embedded"}
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-white rounded-lg border shadow-sm">
          <div className="p-6">
            <h3 className="text-lg font-semibold mb-4">Day {currentDay} Content</h3>
            <PhaseTwoContent 
              day={currentDay} 
              videoDisplayMode={videoDisplayMode}
            />
          </div>
        </div>
        <ExternalTracking phase={2} />
      </div>
    </PageLayout>
  );
};

export default PhaseTwo;
