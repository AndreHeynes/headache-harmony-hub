
import React from "react";
import PageLayout from "@/components/layout/PageLayout";
import PhaseHeader from "@/components/phase-four/PhaseHeader";
import PhaseProgress from "@/components/phase-four/PhaseProgress";
import GoalSettingSection from "@/components/phase-four/GoalSettingSection";
import ExerciseLibrary from "@/components/phase-four/ExerciseLibrary";
import ProgramBuilder from "@/components/phase-four/ProgramBuilder";
import ReturnToSportSection from "@/components/phase-four/ReturnToSportSection";
import PostureEducationSection from "@/components/phase-four/PostureEducationSection";
import { useMaintenanceProgram } from "@/hooks/useMaintenanceProgram";
import { Button } from "@/components/ui/button";
import { Check, Loader2 } from "lucide-react";
import { toast } from "sonner";

const PhaseFour = () => {
  const {
    program, loading,
    setGoals, setSelectedExercises, setWeeklySchedule, setSportPlan,
    activeDaysCount,
  } = useMaintenanceProgram();

  if (loading) {
    return (
      <PageLayout>
        <div className="min-h-screen bg-background text-foreground flex items-center justify-center">
          <Loader2 className="h-8 w-8 animate-spin text-primary" />
        </div>
      </PageLayout>
    );
  }

  return (
    <PageLayout>
      <div className="min-h-screen bg-background text-foreground">
        <PhaseHeader />
        <PhaseProgress activeDaysCount={activeDaysCount} goalsCount={program.goals.length} exercisesCount={program.selectedExercises.length} />
        
        <main className="container mx-auto px-4 pt-40 pb-20">
          <GoalSettingSection goals={program.goals} onGoalsChange={setGoals} />
          <ExerciseLibrary selectedExercises={program.selectedExercises} onSelectionChange={setSelectedExercises} />
          <ProgramBuilder
            selectedExercises={program.selectedExercises}
            onExercisesChange={setSelectedExercises}
            weeklySchedule={program.weeklySchedule}
            onScheduleChange={setWeeklySchedule}
            goals={program.goals}
            activeDaysCount={activeDaysCount}
          />
          <ReturnToSportSection sportPlan={program.sportPlan} onUpdate={setSportPlan} />
          <PostureEducationSection />
          
          <div className="flex justify-end items-center mb-8">
            <Button
              className="px-6 py-3"
              variant="default"
              onClick={() => toast.success("Program saved successfully!")}
            >
              <Check className="mr-2 h-4 w-4" />
              Save Program
            </Button>
          </div>
        </main>
      </div>
    </PageLayout>
  );
};

export default PhaseFour;
