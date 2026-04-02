
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Card, CardContent } from "@/components/ui/card";
import { CalendarIcon, Plus, Trash2, Target, TrendingUp, CheckCircle, Crosshair, Clock } from "lucide-react";
import { format, differenceInDays } from "date-fns";
import { cn } from "@/lib/utils";
import { SmartGoal } from "@/hooks/useMaintenanceProgram";

interface GoalSettingSectionProps {
  goals: SmartGoal[];
  onGoalsChange: (goals: SmartGoal[]) => void;
}

const GoalSettingSection: React.FC<GoalSettingSectionProps> = ({ goals, onGoalsChange }) => {
  const [expandedGoalId, setExpandedGoalId] = useState<string | null>(null);

  const addGoal = () => {
    if (goals.length >= 3) return;
    const newGoal: SmartGoal = {
      id: crypto.randomUUID(),
      specific: "",
      measurable: "",
      achievable: "",
      relevant: "",
      targetDate: "",
    };
    onGoalsChange([...goals, newGoal]);
    setExpandedGoalId(newGoal.id);
  };

  const updateGoal = (id: string, field: keyof SmartGoal, value: string) => {
    onGoalsChange(goals.map(g => g.id === id ? { ...g, [field]: value } : g));
  };

  const removeGoal = (id: string) => {
    onGoalsChange(goals.filter(g => g.id !== id));
    if (expandedGoalId === id) setExpandedGoalId(null);
  };

  const getDaysRemaining = (dateStr: string) => {
    if (!dateStr) return null;
    const days = differenceInDays(new Date(dateStr), new Date());
    return days;
  };

  const smartIcons = [
    { key: "specific", icon: Crosshair, label: "Specific", description: "Clear target outcome" },
    { key: "measurable", icon: TrendingUp, label: "Measurable", description: "Track progress" },
    { key: "achievable", icon: CheckCircle, label: "Achievable", description: "Realistic goals" },
    { key: "relevant", icon: Target, label: "Relevant", description: "Aligns with needs" },
    { key: "targetDate", icon: Clock, label: "Time-bound", description: "Set deadline" },
  ];

  return (
    <section className="bg-card rounded-xl p-6 md:p-8 mb-8 border border-border">
      <div className="flex items-start justify-between mb-6">
        <div>
          <h2 className="text-2xl font-bold text-foreground">Define Your SMART Goals</h2>
          <p className="text-sm text-muted-foreground mt-1">
            In 1981, George T. Doran wrote a paper titled, "There's a S.M.A.R.T. Way to Write Management's Goals and Objectives."
          </p>
        </div>
        {goals.length < 3 && (
          <Button onClick={addGoal} variant="outline" size="sm">
            <Plus className="h-4 w-4 mr-1" /> Add Goal
          </Button>
        )}
      </div>

      {/* SMART reference cards */}
      <div className="grid grid-cols-2 md:grid-cols-5 gap-3 mb-6">
        {smartIcons.map(({ icon: Icon, label, description }) => (
          <div key={label} className="bg-muted p-3 rounded-lg">
            <Icon className="h-5 w-5 text-primary mb-1" />
            <h3 className="font-medium text-sm text-foreground">{label}</h3>
            <p className="text-xs text-muted-foreground">{description}</p>
          </div>
        ))}
      </div>

      {goals.length === 0 && (
        <div className="text-center py-8 bg-muted rounded-lg">
          <Target className="h-10 w-10 text-muted-foreground mx-auto mb-3" />
          <p className="text-muted-foreground">No goals set yet. Click "Add Goal" to define your first SMART goal.</p>
        </div>
      )}

      {/* Goal Cards */}
      <div className="space-y-4">
        {goals.map((goal, index) => {
          const daysLeft = getDaysRemaining(goal.targetDate);
          const isExpanded = expandedGoalId === goal.id;
          const isComplete = goal.specific && goal.measurable && goal.achievable && goal.relevant && goal.targetDate;

          return (
            <Card key={goal.id} className={cn("border transition-all", isComplete ? "border-primary/50 bg-primary/5" : "border-border bg-muted")}>
              <CardContent className="p-4">
                {/* Header */}
                <div className="flex items-center justify-between mb-3 cursor-pointer" onClick={() => setExpandedGoalId(isExpanded ? null : goal.id)}>
                  <div className="flex items-center gap-3">
                    <div className={cn(
                      "w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold",
                      isComplete ? "bg-primary text-primary-foreground" : "bg-secondary text-secondary-foreground"
                    )}>
                      {index + 1}
                    </div>
                    <div>
                      <h4 className="font-medium text-foreground">
                        {goal.specific ? goal.specific.substring(0, 60) + (goal.specific.length > 60 ? '...' : '') : `Goal ${index + 1}`}
                      </h4>
                      {daysLeft !== null && (
                        <span className={cn(
                          "text-xs font-medium px-2 py-0.5 rounded-full",
                          daysLeft > 30 ? "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200" :
                          daysLeft > 7 ? "bg-amber-100 text-amber-800 dark:bg-amber-900 dark:text-amber-200" :
                          "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200"
                        )}>
                          {daysLeft > 0 ? `${daysLeft} days remaining` : daysLeft === 0 ? "Due today!" : `${Math.abs(daysLeft)} days overdue`}
                        </span>
                      )}
                    </div>
                  </div>
                  <Button variant="ghost" size="icon" onClick={(e) => { e.stopPropagation(); removeGoal(goal.id); }}>
                    <Trash2 className="h-4 w-4 text-destructive" />
                  </Button>
                </div>

                {/* Expanded Form */}
                {isExpanded && (
                  <div className="space-y-4 pt-3 border-t border-border">
                    <div>
                      <label className="block text-sm font-medium mb-1 text-foreground">Specific — What exactly do you want to achieve?</label>
                      <Textarea
                        value={goal.specific}
                        onChange={(e) => updateGoal(goal.id, "specific", e.target.value)}
                        placeholder="e.g., Reduce headache frequency to less than 2 per month"
                        className="bg-background border-border"
                        rows={2}
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-1 text-foreground">Measurable — How will you track progress?</label>
                      <Textarea
                        value={goal.measurable}
                        onChange={(e) => updateGoal(goal.id, "measurable", e.target.value)}
                        placeholder="e.g., Track headache days per month in diary"
                        className="bg-background border-border"
                        rows={2}
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-1 text-foreground">Achievable — What steps will you take?</label>
                      <Textarea
                        value={goal.achievable}
                        onChange={(e) => updateGoal(goal.id, "achievable", e.target.value)}
                        placeholder="e.g., Exercise 4x weekly, maintain sleep routine"
                        className="bg-background border-border"
                        rows={2}
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-1 text-foreground">Relevant — Why does this matter to you?</label>
                      <Textarea
                        value={goal.relevant}
                        onChange={(e) => updateGoal(goal.id, "relevant", e.target.value)}
                        placeholder="e.g., Being able to enjoy weekend activities without pain"
                        className="bg-background border-border"
                        rows={2}
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-1 text-foreground">Time-bound — Target date</label>
                      <Popover>
                        <PopoverTrigger asChild>
                          <Button variant="outline" className={cn("w-full md:w-[280px] justify-start text-left font-normal", !goal.targetDate && "text-muted-foreground")}>
                            <CalendarIcon className="mr-2 h-4 w-4" />
                            {goal.targetDate ? format(new Date(goal.targetDate), "PPP") : "Pick a target date"}
                          </Button>
                        </PopoverTrigger>
                        <PopoverContent className="w-auto p-0" align="start">
                          <Calendar
                            mode="single"
                            selected={goal.targetDate ? new Date(goal.targetDate) : undefined}
                            onSelect={(date) => date && updateGoal(goal.id, "targetDate", date.toISOString())}
                            disabled={(date) => date < new Date()}
                            initialFocus
                            className={cn("p-3 pointer-events-auto")}
                          />
                        </PopoverContent>
                      </Popover>
                    </div>
                  </div>
                )}

                {/* Visual Goal Preview (collapsed, complete) */}
                {!isExpanded && isComplete && (
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-2 text-xs">
                    <div className="bg-background rounded p-2">
                      <span className="text-muted-foreground">Measure:</span>
                      <p className="text-foreground truncate">{goal.measurable}</p>
                    </div>
                    <div className="bg-background rounded p-2">
                      <span className="text-muted-foreground">Steps:</span>
                      <p className="text-foreground truncate">{goal.achievable}</p>
                    </div>
                    <div className="bg-background rounded p-2">
                      <span className="text-muted-foreground">Why:</span>
                      <p className="text-foreground truncate">{goal.relevant}</p>
                    </div>
                    <div className="bg-background rounded p-2">
                      <span className="text-muted-foreground">Deadline:</span>
                      <p className="text-foreground">{goal.targetDate ? format(new Date(goal.targetDate), "MMM d, yyyy") : '-'}</p>
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>
          );
        })}
      </div>
    </section>
  );
};

export default GoalSettingSection;
