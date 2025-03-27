
import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { Brain, Clock, CheckCircle, Target, BarChart2 } from "lucide-react";

const GoalSettingSection = () => {
  return (
    <Card className="mb-6">
      <CardHeader>
        <CardTitle className="text-xl font-bold">Define Your SMART Goal</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="mb-4">
          <Textarea 
            placeholder="Enter your specific, measurable, achievable, relevant, and time-bound goal..."
            className="w-full bg-secondary border border-border p-3 mb-4"
            rows={4}
          />
          <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
            <div className="bg-secondary p-4 rounded-lg">
              <div className="text-primary mb-2"><Target size={20} /></div>
              <h3 className="font-medium mb-1">Specific</h3>
              <p className="text-sm text-muted-foreground">Clear target outcome</p>
            </div>
            <div className="bg-secondary p-4 rounded-lg">
              <div className="text-primary mb-2"><BarChart2 size={20} /></div>
              <h3 className="font-medium mb-1">Measurable</h3>
              <p className="text-sm text-muted-foreground">Track progress</p>
            </div>
            <div className="bg-secondary p-4 rounded-lg">
              <div className="text-primary mb-2"><CheckCircle size={20} /></div>
              <h3 className="font-medium mb-1">Achievable</h3>
              <p className="text-sm text-muted-foreground">Realistic goals</p>
            </div>
            <div className="bg-secondary p-4 rounded-lg">
              <div className="text-primary mb-2"><Target size={20} /></div>
              <h3 className="font-medium mb-1">Relevant</h3>
              <p className="text-sm text-muted-foreground">Aligns with needs</p>
            </div>
            <div className="bg-secondary p-4 rounded-lg">
              <div className="text-primary mb-2"><Clock size={20} /></div>
              <h3 className="font-medium mb-1">Time-bound</h3>
              <p className="text-sm text-muted-foreground">Set deadline</p>
            </div>
          </div>
        </div>

        <div className="bg-secondary rounded-lg p-6">
          <h3 className="text-lg font-medium mb-4">Key Habits to Maintain</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="flex items-start space-x-3">
              <div className="text-primary mt-1"><Brain size={20} /></div>
              <div>
                <h4 className="font-medium">Activity Sheet AS4</h4>
                <p className="text-sm text-muted-foreground">Trigger Management Review</p>
              </div>
            </div>
            <div className="flex items-start space-x-3">
              <div className="text-primary mt-1"><Clock size={20} /></div>
              <div>
                <h4 className="font-medium">Sleep Hygiene (AS3)</h4>
                <p className="text-sm text-muted-foreground">Maintain Sleep Routine</p>
              </div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default GoalSettingSection;
