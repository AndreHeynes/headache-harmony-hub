
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
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/hooks/useAuth";
import { useUserStatus } from "@/hooks/useUserStatus";
import { usePhaseAdvancement } from "@/hooks/usePhaseAdvancement";

const PhaseTwo = () => {
  const { toast } = useToast();
  const { user, isAuthenticated } = useAuth();
  const userStatus = useUserStatus();
  const { checkPhase2Completion } = usePhaseAdvancement();
  const [currentDay, setCurrentDay] = useState(1);
  const [videoDisplayMode, setVideoDisplayMode] = useState<"embedded" | "link">("link");
  const [isLoading, setIsLoading] = useState(true);
  const totalDays = 77; // 11 weeks × 7 days
  
  // Initialize currentDay from database
  useEffect(() => {
    const loadSettings = async () => {
      try {
        if (isAuthenticated && user) {
          const { data, error } = await supabase
            .from('user_progress')
            .select('phase_two_day')
            .eq('user_id', user.id)
            .maybeSingle();
          
          if (!error && data?.phase_two_day) {
            setCurrentDay(data.phase_two_day);
          }
        }
      } catch (e) {
        console.error("Error loading settings:", e);
      } finally {
        setIsLoading(false);
      }
    };
    
    loadSettings();
  }, [user, isAuthenticated]);
  
  // Save currentDay to database whenever it changes
  useEffect(() => {
    if (isLoading) return;
    
    const saveDay = async () => {
      if (isAuthenticated && user) {
        try {
          await supabase
            .from('user_progress')
            .upsert({
              user_id: user.id,
              phase_two_day: currentDay,
            }, {
              onConflict: 'user_id',
            });
        } catch (err) {
          console.error('Error saving phase 2 day to database:', err);
        }
      }
    };
    
    saveDay();
  }, [currentDay, user, isAuthenticated, isLoading]);
  
  const goToNextDay = () => {
    if (currentDay < totalDays) {
      const nextDay = currentDay + 1;
      setCurrentDay(nextDay);
      
      if (currentDay % 7 === 0) {
        toast({
          title: `Week ${Math.floor(currentDay / 7)} Completed!`,
          description: "Great job completing another week of your recovery program.",
        });
      }
      
      // Check if Phase 2 is complete
      if (nextDay >= totalDays) {
        toast({
          title: "Phase 2 Complete!",
          description: "Congratulations on completing Phase 2! You're now ready to move to Phase 3.",
        });
        checkPhase2Completion(nextDay);
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
    
    toast({
      title: `Video Display Updated`,
      description: `Videos will now be shown as ${newMode === "link" ? "links" : "embedded players"}.`,
    });
  };

  const goToSpecificDay = (day: number) => {
    if (day >= 1 && day <= totalDays) {
      setCurrentDay(day);
    }
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
      
      <div className="flex flex-wrap justify-between items-center mb-4 gap-2">
        <div className="flex items-center">
          <span className="text-sm mr-2">Jump to day:</span>
          <select 
            value={currentDay}
            onChange={(e) => goToSpecificDay(parseInt(e.target.value, 10))}
            className="text-sm rounded border p-1"
          >
            {Array.from({ length: totalDays }, (_, i) => i + 1).map(day => (
              <option key={day} value={day}>Day {day}</option>
            ))}
          </select>
        </div>
        
        <Button 
          onClick={toggleVideoDisplayMode} 
          variant="outline" 
          size="sm"
        >
          Show videos as: {videoDisplayMode === "link" ? "Links" : "Embedded"}
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-card rounded-lg border shadow-sm">
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
