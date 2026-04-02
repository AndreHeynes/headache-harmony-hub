
import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { Textarea } from "@/components/ui/textarea";
import { Dumbbell, Heart, TrendingUp, Trophy } from "lucide-react";
import { SportPlan, SportStage } from "@/hooks/useMaintenanceProgram";

interface ReturnToSportSectionProps {
  sportPlan: SportPlan;
  onUpdate: (plan: SportPlan) => void;
}

const ReturnToSportSection: React.FC<ReturnToSportSectionProps> = ({ sportPlan, onUpdate }) => {
  const toggleStage = (stageId: string) => {
    const updated = {
      ...sportPlan,
      stages: sportPlan.stages.map(s =>
        s.id === stageId ? { ...s, completed: !s.completed } : s
      ),
    };
    onUpdate(updated);
  };

  const updateStageNotes = (stageId: string, notes: string) => {
    const updated = {
      ...sportPlan,
      stages: sportPlan.stages.map(s =>
        s.id === stageId ? { ...s, notes } : s
      ),
    };
    onUpdate(updated);
  };

  const stageIcons = [TrendingUp, TrendingUp, Trophy, Trophy];

  return (
    <section className="bg-card rounded-xl p-6 md:p-8 mb-8 border border-border">
      <h2 className="text-2xl font-bold mb-2 text-foreground">Return to Sport & Training</h2>
      <p className="text-muted-foreground mb-6">Gradually rebuild your training capacity after completing the program.</p>

      {/* External Training Guidance */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
        <Card className="bg-muted border-border">
          <CardHeader className="pb-2">
            <div className="flex items-center gap-2">
              <Dumbbell className="h-5 w-5 text-primary" />
              <CardTitle className="text-base">High Intensity Training (HIT)</CardTitle>
            </div>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground">
              Research shows HIT can be very effective for headache management. Start with a 
              qualified Personal Trainer who can guide progressive overload safely.
            </p>
          </CardContent>
        </Card>

        <Card className="bg-muted border-border">
          <CardHeader className="pb-2">
            <div className="flex items-center gap-2">
              <Heart className="h-5 w-5 text-primary" />
              <CardTitle className="text-base">Low-Impact Training</CardTitle>
            </div>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground">
              Low-impact options such as swimming, cycling, or yoga have also been demonstrated 
              to be helpful. Choose activities you enjoy to build consistency.
            </p>
          </CardContent>
        </Card>
      </div>

      <div className="bg-muted rounded-lg p-4 mb-6">
        <p className="text-sm text-muted-foreground">
          <strong className="text-foreground">Recommendation:</strong> Start with a Personal Trainer 
          to ensure proper form and gradual progression. This helps prevent flare-ups during 
          the transition back to independent training.
        </p>
      </div>

      {/* Running Progression */}
      <h3 className="text-lg font-semibold mb-4 text-foreground">Return to Running — Graded Progression</h3>
      <div className="space-y-4">
        {sportPlan.stages.map((stage, index) => {
          const Icon = stageIcons[index] || TrendingUp;
          return (
            <div key={stage.id} className="bg-muted rounded-lg p-4 border border-border">
              <div className="flex items-start gap-3">
                <div className="flex items-center gap-3 flex-1">
                  <Checkbox
                    checked={stage.completed}
                    onCheckedChange={() => toggleStage(stage.id)}
                  />
                  <div className="flex items-center gap-2">
                    <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold ${
                      stage.completed ? 'bg-primary text-primary-foreground' : 'bg-secondary text-secondary-foreground'
                    }`}>
                      {index + 1}
                    </div>
                    <span className={`font-medium ${stage.completed ? 'line-through text-muted-foreground' : 'text-foreground'}`}>
                      {stage.label}
                    </span>
                  </div>
                </div>
              </div>
              <div className="mt-3 ml-11">
                <Textarea
                  placeholder="Notes on your experience..."
                  value={stage.notes}
                  onChange={(e) => updateStageNotes(stage.id, e.target.value)}
                  className="bg-background border-border text-foreground min-h-[60px]"
                  rows={2}
                />
              </div>
            </div>
          );
        })}
      </div>

      {/* General notes */}
      <div className="mt-6">
        <label className="block text-sm font-medium mb-2 text-foreground">Additional Training Notes</label>
        <Textarea
          placeholder="Any other training plans, goals, or observations..."
          value={sportPlan.notes}
          onChange={(e) => onUpdate({ ...sportPlan, notes: e.target.value })}
          className="bg-muted border-border text-foreground"
          rows={3}
        />
      </div>
    </section>
  );
};

export default ReturnToSportSection;
