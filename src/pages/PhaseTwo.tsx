import React, { useState, useEffect } from "react";
import PageLayout from "@/components/layout/PageLayout";
import CurrentPhaseCard from "@/components/phase/CurrentPhaseCard";
import PhaseTimeline from "@/components/phase/PhaseTimeline";
import ExternalTracking from "@/components/phase/ExternalTracking";
import PhaseHeading from "@/components/phase/PhaseHeading";
import PhaseTwoContent from "@/components/phase-two/PhaseTwoContent";
import PhaseTwoTaskList from "@/components/phase-two/PhaseTwoTaskList";
import PhaseTwoCalendar from "@/components/phase-two/PhaseTwoCalendar";
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
  const [completedDays, setCompletedDays] = useState<Set<number>>(new Set());
  const [startDate, setStartDate] = useState<string | null>(null);
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

  // Load completed days from task_completions
  useEffect(() => {
    const loadCompletedDays = async () => {
      if (!isAuthenticated || !user) return;
      try {
        const { data } = await supabase
          .from('task_completions')
          .select('day')
          .eq('user_id', user.id)
          .eq('phase', 2)
          .eq('completed', true);
        
        if (data) {
          setCompletedDays(new Set(data.map(r => r.day)));
        }
      } catch (e) {
        console.error("Error loading completed days:", e);
      }
    };
    loadCompletedDays();
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

  const handleDaySelect = (day: number) => {
    setCurrentDay(day);
    
    // Check week completion toast
    if (day > 1 && (day - 1) % 7 === 0) {
      toast({
        title: `Week ${Math.floor((day - 1) / 7)} Completed!`,
        description: "Great job completing another week of your recovery program.",
      });
    }
    
    // Check if Phase 2 is complete
    if (day >= totalDays) {
      toast({
        title: "Phase 2 Complete!",
        description: "Congratulations on completing Phase 2! You're now ready to move to Phase 3.",
      });
      checkPhase2Completion(day);
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

  const currentWeek = Math.ceil(currentDay / 7);
  const dayOfWeek = ((currentDay - 1) % 7);
  const dayNames = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"];
  const isReviewDay = currentDay % 7 === 0;

  return (
    <PageLayout>
      <div className="mb-8">
        <PhaseHeading title="Building your recovery foundation" />
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
        <CurrentPhaseCard 
          day={currentDay} 
          totalDays={totalDays} 
          phaseNumber={2} 
        />
        <PhaseTwoTaskList day={currentDay} />
        <PhaseTimeline currentPhase={2} />
      </div>

      {/* Calendar Grid */}
      <div className="mb-6">
        <PhaseTwoCalendar
          currentDay={currentDay}
          totalDays={totalDays}
          onDaySelect={handleDaySelect}
          completedDays={completedDays}
        />
      </div>

      {/* Expanded Day Content */}
      <div className="flex flex-wrap justify-between items-center mb-4 gap-2">
        <h2 className="text-xl font-semibold text-foreground">
          Day {currentDay} — {dayNames[dayOfWeek]}
          {isReviewDay && (
            <span className="ml-2 text-sm font-normal text-muted-foreground">(Week {currentWeek} Review)</span>
          )}
        </h2>
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
