
import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ChevronDown, Minus, Plus, Clock } from "lucide-react";

const ProgramBuilder = () => {
  return (
    <Card className="mb-6">
      <CardHeader>
        <CardTitle className="text-xl font-bold">Customize Your Routine</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
          <div className="bg-secondary rounded-xl p-6">
            <h3 className="text-lg font-medium mb-4">Selected Exercises</h3>
            
            <div className="space-y-4">
              <div className="flex items-center justify-between p-4 bg-muted rounded-lg">
                <div className="flex items-center">
                  <div className="w-2 h-12 bg-primary rounded-full mr-4"></div>
                  <div>
                    <h4 className="font-medium">Neck Flexion/Extension</h4>
                    <p className="text-sm text-muted-foreground">Mobility Exercise</p>
                  </div>
                </div>
                <div className="flex items-center space-x-6">
                  <div className="flex items-center space-x-2">
                    <label className="text-sm">Sets</label>
                    <div className="flex items-center">
                      <Button variant="outline" size="icon" className="h-8 w-8 rounded-l-lg rounded-r-none">
                        <Minus className="h-4 w-4" />
                      </Button>
                      <input type="number" className="w-12 h-8 bg-background text-center" defaultValue={3} />
                      <Button variant="outline" size="icon" className="h-8 w-8 rounded-r-lg rounded-l-none">
                        <Plus className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                  <div className="flex items-center space-x-2">
                    <label className="text-sm">Reps</label>
                    <div className="flex items-center">
                      <Button variant="outline" size="icon" className="h-8 w-8 rounded-l-lg rounded-r-none">
                        <Minus className="h-4 w-4" />
                      </Button>
                      <input type="number" className="w-12 h-8 bg-background text-center" defaultValue={10} />
                      <Button variant="outline" size="icon" className="h-8 w-8 rounded-r-lg rounded-l-none">
                        <Plus className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-secondary rounded-xl p-6">
            <h3 className="text-lg font-medium mb-4">Weekly Schedule</h3>
            <div className="grid grid-cols-7 gap-2">
              {/* Days of Week */}
              <div className="text-center p-2 text-sm text-muted-foreground">Mon</div>
              <div className="text-center p-2 text-sm text-muted-foreground">Tue</div>
              <div className="text-center p-2 text-sm text-muted-foreground">Wed</div>
              <div className="text-center p-2 text-sm text-muted-foreground">Thu</div>
              <div className="text-center p-2 text-sm text-muted-foreground">Fri</div>
              <div className="text-center p-2 text-sm text-muted-foreground">Sat</div>
              <div className="text-center p-2 text-sm text-muted-foreground">Sun</div>
              
              {/* Schedule Slots */}
              <div className="bg-background rounded-lg p-2 min-h-[100px] border-2 border-dashed border-border">
                <div className="bg-primary rounded p-2 text-sm mb-2 text-primary-foreground">Neck Flexion</div>
                <div className="bg-green-600 rounded p-2 text-sm text-white">Isometric Hold</div>
              </div>
              <div className="bg-background rounded-lg p-2 min-h-[100px] border-2 border-dashed border-border"></div>
              <div className="bg-background rounded-lg p-2 min-h-[100px] border-2 border-dashed border-border">
                <div className="bg-purple-600 rounded p-2 text-sm text-white">Upper Trap Stretch</div>
              </div>
              <div className="bg-background rounded-lg p-2 min-h-[100px] border-2 border-dashed border-border"></div>
              <div className="bg-background rounded-lg p-2 min-h-[100px] border-2 border-dashed border-border">
                <div className="bg-primary rounded p-2 text-sm text-primary-foreground">Neck Flexion</div>
              </div>
              <div className="bg-muted rounded-lg p-2 min-h-[100px] flex items-center justify-center">
                <span className="text-sm text-muted-foreground">Rest Day</span>
              </div>
              <div className="bg-muted rounded-lg p-2 min-h-[100px] flex items-center justify-center">
                <span className="text-sm text-muted-foreground">Rest Day</span>
              </div>
            </div>
          </div>
        </div>

        <div id="activity-sheets" className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
          <div className="bg-secondary rounded-xl p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-medium">Sleep Hygiene (AS3)</h3>
              <Button variant="ghost" size="icon">
                <ChevronDown className="h-4 w-4" />
              </Button>
            </div>
            <div className="space-y-4">
              <div>
                <label className="block text-sm mb-2">Bedtime Routine</label>
                <textarea className="w-full bg-background rounded-lg p-3" rows={3} placeholder="Describe your evening routine..."></textarea>
              </div>
              <div>
                <label className="block text-sm mb-2">Sleep Environment</label>
                <div className="space-y-2">
                  <label className="flex items-center">
                    <input type="checkbox" className="mr-2" />
                    Dark room
                  </label>
                  <label className="flex items-center">
                    <input type="checkbox" className="mr-2" />
                    Comfortable temperature
                  </label>
                  <label className="flex items-center">
                    <input type="checkbox" className="mr-2" />
                    Quiet environment
                  </label>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-secondary rounded-xl p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-medium">Trigger Management (AS4)</h3>
              <Button variant="ghost" size="icon">
                <ChevronDown className="h-4 w-4" />
              </Button>
            </div>
            <div className="space-y-4">
              <div>
                <label className="block text-sm mb-2">Identified Triggers</label>
                <div className="flex flex-wrap gap-2">
                  <span className="bg-muted px-3 py-1 rounded-full text-sm">Poor Posture</span>
                  <span className="bg-muted px-3 py-1 rounded-full text-sm">Screen Time</span>
                  <span className="bg-muted px-3 py-1 rounded-full text-sm">Stress</span>
                  <Button variant="outline" className="px-3 py-1 rounded-full text-sm h-auto">+ Add New</Button>
                </div>
              </div>
              <div>
                <label className="block text-sm mb-2">Management Strategy</label>
                <textarea className="w-full bg-background rounded-lg p-3" rows={3} placeholder="How do you plan to manage these triggers?"></textarea>
              </div>
            </div>
          </div>
        </div>

        <div className="flex justify-between items-center">
          <Button variant="outline" className="px-6 py-3">
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-4 w-4 mr-2"><path d="m15 18-6-6 6-6"/></svg>
            Previous
          </Button>
          <Button className="px-6 py-3">
            Next Step
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-4 w-4 ml-2"><path d="m9 18 6-6-6-6"/></svg>
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default ProgramBuilder;
