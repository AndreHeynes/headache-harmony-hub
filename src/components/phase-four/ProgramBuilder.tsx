
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Check, Minus, Plus, Calendar, List } from "lucide-react";
import { SelectedExercise, WeeklySchedule, SmartGoal } from "@/hooks/useMaintenanceProgram";
import { EXERCISE_CATEGORY_COLORS, ExerciseCategory } from "@/utils/exercises/exerciseCategoryMap";
import { cn } from "@/lib/utils";

const DAYS = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"];

interface ProgramBuilderProps {
  selectedExercises: SelectedExercise[];
  onExercisesChange: (exercises: SelectedExercise[]) => void;
  weeklySchedule: WeeklySchedule;
  onScheduleChange: (schedule: WeeklySchedule) => void;
  goals: SmartGoal[];
  activeDaysCount: number;
}

const ProgramBuilder: React.FC<ProgramBuilderProps> = ({
  selectedExercises, onExercisesChange,
  weeklySchedule, onScheduleChange,
  goals, activeDaysCount,
}) => {
  const [view, setView] = useState<"schedule" | "diary">("schedule");

  const updateExercise = (exerciseId: string, field: "sets" | "reps", delta: number) => {
    onExercisesChange(selectedExercises.map(ex =>
      ex.exerciseId === exerciseId ? { ...ex, [field]: Math.max(1, ex[field] + delta) } : ex
    ));
  };

  const toggleExerciseOnDay = (day: string, exerciseId: string) => {
    const current = weeklySchedule[day] || [];
    const updated = current.includes(exerciseId)
      ? current.filter(id => id !== exerciseId)
      : [...current, exerciseId];
    onScheduleChange({ ...weeklySchedule, [day]: updated });
  };

  const getExerciseById = (id: string) => selectedExercises.find(e => e.exerciseId === id);

  if (selectedExercises.length === 0) {
    return (
      <section className="bg-card rounded-xl p-6 md:p-8 mb-8 border border-border">
        <h2 className="text-2xl font-bold mb-4 text-foreground">Customize Your Routine</h2>
        <div className="text-center py-8 bg-muted rounded-lg">
          <p className="text-muted-foreground">Select exercises from the Exercise Vault above to start building your program.</p>
        </div>
      </section>
    );
  }

  return (
    <section className="bg-card rounded-xl p-6 md:p-8 mb-8 border border-border">
      <div className="flex flex-col md:flex-row justify-between items-start mb-6 gap-3">
        <h2 className="text-2xl font-bold text-foreground">Customize Your Routine</h2>
        <div className="flex items-center gap-2">
          <Button variant={view === "schedule" ? "default" : "secondary"} size="sm" onClick={() => setView("schedule")}>
            <Calendar className="h-4 w-4 mr-1" /> Schedule
          </Button>
          <Button variant={view === "diary" ? "default" : "secondary"} size="sm" onClick={() => setView("diary")}>
            <List className="h-4 w-4 mr-1" /> Diary
          </Button>
        </div>
      </div>

      {/* Frequency indicator */}
      <div className={cn(
        "rounded-lg px-4 py-2 mb-6 text-sm font-medium",
        activeDaysCount >= 4 ? "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300" :
        "bg-amber-100 text-amber-800 dark:bg-amber-900/30 dark:text-amber-300"
      )}>
        {activeDaysCount}/7 days scheduled — {activeDaysCount >= 4 ? "✓ Meets recommended 4x weekly frequency" : `Add ${4 - activeDaysCount} more day(s) to meet the recommended 4x weekly frequency`}
      </div>

      {view === "schedule" ? (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Exercise Customization */}
          <div className="bg-muted rounded-xl p-4">
            <h3 className="text-lg font-medium mb-4 text-foreground">Selected Exercises</h3>
            <div className="space-y-3 max-h-[400px] overflow-y-auto">
              {selectedExercises.map(ex => (
                <div key={ex.exerciseId} className="flex items-center justify-between p-3 bg-background rounded-lg">
                  <div className="flex items-center min-w-0">
                    <div className={cn("w-1.5 h-10 rounded-full mr-3 shrink-0", EXERCISE_CATEGORY_COLORS[ex.category as ExerciseCategory] || "bg-primary")}></div>
                    <div className="min-w-0">
                      <h4 className="font-medium text-sm text-foreground truncate">{ex.title}</h4>
                      <p className="text-xs text-muted-foreground">{ex.category}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-4 shrink-0">
                    <div className="flex items-center gap-1">
                      <span className="text-xs text-muted-foreground">Sets</span>
                      <Button variant="outline" size="icon" className="h-6 w-6" onClick={() => updateExercise(ex.exerciseId, "sets", -1)}>
                        <Minus className="h-3 w-3" />
                      </Button>
                      <span className="w-6 text-center text-sm text-foreground">{ex.sets}</span>
                      <Button variant="outline" size="icon" className="h-6 w-6" onClick={() => updateExercise(ex.exerciseId, "sets", 1)}>
                        <Plus className="h-3 w-3" />
                      </Button>
                    </div>
                    <div className="flex items-center gap-1">
                      <span className="text-xs text-muted-foreground">Reps</span>
                      <Button variant="outline" size="icon" className="h-6 w-6" onClick={() => updateExercise(ex.exerciseId, "reps", -1)}>
                        <Minus className="h-3 w-3" />
                      </Button>
                      <span className="w-6 text-center text-sm text-foreground">{ex.reps}</span>
                      <Button variant="outline" size="icon" className="h-6 w-6" onClick={() => updateExercise(ex.exerciseId, "reps", 1)}>
                        <Plus className="h-3 w-3" />
                      </Button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Weekly Schedule Grid */}
          <div className="bg-muted rounded-xl p-4">
            <h3 className="text-lg font-medium mb-4 text-foreground">Weekly Schedule</h3>
            <div className="grid grid-cols-7 gap-1">
              {DAYS.map(day => (
                <div key={day} className="text-center text-xs font-medium text-muted-foreground pb-1">
                  {day.substring(0, 3)}
                </div>
              ))}
              {DAYS.map(day => {
                const dayExercises = weeklySchedule[day] || [];
                return (
                  <div key={`slot-${day}`} className="bg-background rounded-lg p-1.5 min-h-[80px] border border-dashed border-border">
                    {dayExercises.map(exId => {
                      const ex = getExerciseById(exId);
                      if (!ex) return null;
                      return (
                        <div
                          key={exId}
                          className={cn("rounded px-1.5 py-1 text-[10px] text-white mb-1 cursor-pointer truncate", EXERCISE_CATEGORY_COLORS[ex.category as ExerciseCategory] || "bg-primary")}
                          onClick={() => toggleExerciseOnDay(day, exId)}
                          title={`${ex.title} (click to remove)`}
                        >
                          {ex.title.substring(0, 12)}
                        </div>
                      );
                    })}
                  </div>
                );
              })}
            </div>
            {/* Quick assign */}
            <div className="mt-4">
              <p className="text-xs text-muted-foreground mb-2">Click an exercise below, then click a day to assign:</p>
              <div className="flex flex-wrap gap-1">
                {selectedExercises.map(ex => (
                  <button
                    key={ex.exerciseId}
                    className={cn("text-[10px] px-2 py-1 rounded text-white", EXERCISE_CATEGORY_COLORS[ex.category as ExerciseCategory] || "bg-primary")}
                    onClick={() => {
                      // Add to next empty/available day
                      const nextDay = DAYS.find(d => !(weeklySchedule[d] || []).includes(ex.exerciseId));
                      if (nextDay) toggleExerciseOnDay(nextDay, ex.exerciseId);
                    }}
                  >
                    + {ex.title.substring(0, 15)}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      ) : (
        /* Diary View */
        <div>
          {/* Goals highlight */}
          {goals.length > 0 && (
            <div className="mb-4 p-3 bg-primary/10 rounded-lg border border-primary/20">
              <h4 className="text-sm font-semibold text-primary mb-1">Your Goals</h4>
              {goals.filter(g => g.specific).map(g => (
                <p key={g.id} className="text-xs text-foreground">• {g.specific}</p>
              ))}
            </div>
          )}

          {/* Weekly diary */}
          <div className="space-y-3">
            {DAYS.map(day => {
              const dayExercises = (weeklySchedule[day] || []).map(id => getExerciseById(id)).filter(Boolean);
              return (
                <div key={day} className="bg-muted rounded-lg p-3">
                  <h4 className="font-medium text-sm text-foreground mb-2">{day}</h4>
                  {dayExercises.length === 0 ? (
                    <p className="text-xs text-muted-foreground italic">Rest day</p>
                  ) : (
                    <div className="space-y-2">
                      {dayExercises.map(ex => ex && (
                        <div key={ex.exerciseId} className="flex items-center gap-2 text-sm">
                          <Checkbox />
                          <span className="text-foreground">{ex.title}</span>
                          <span className="text-xs text-muted-foreground">{ex.sets}×{ex.reps}</span>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      )}
    </section>
  );
};

export default ProgramBuilder;
