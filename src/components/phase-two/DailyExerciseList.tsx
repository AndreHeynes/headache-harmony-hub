
import React, { useState } from "react";
import ExerciseItem from "./ExerciseItem";
import { Exercise } from "@/utils/exercises/types";
import { Card } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  getDay7Exercises, 
  getDay14Exercises, 
  getDay21Exercises, 
  getDay28Exercises,
  getDay35Exercises,
  getDay42Exercises,
  getDay49Exercises,
  getDay56Exercises,
  getDay63Exercises,
  getDay70Exercises
} from "@/utils/exercises/schedules";

interface DailyExerciseListProps {
  exercises: Exercise[];
  day: number;
  videoDisplayMode?: "embedded" | "link";
}

const DailyExerciseList: React.FC<DailyExerciseListProps> = ({ 
  exercises, 
  day,
  videoDisplayMode = "link"
}) => {
  const [showExercisesOnReviewDay, setShowExercisesOnReviewDay] = useState(false);
  const [activeTab, setActiveTab] = useState("all");
  
  // Function to categorize exercises
  const categorizeExercises = (exercises: Exercise[]) => {
    const categories = {
      breathing: exercises.filter(e => e.title.toLowerCase().includes("breathing")),
      stretching: exercises.filter(e => 
        e.title.toLowerCase().includes("stretch") || 
        e.title.toLowerCase().includes("scalene") ||
        e.title.toLowerCase().includes("pec")
      ),
      strengthening: exercises.filter(e => 
        e.title.toLowerCase().includes("flexor") || 
        e.title.toLowerCase().includes("extensor") || 
        e.title.toLowerCase().includes("rotator") ||
        e.title.toLowerCase().includes("shrug")
      ),
      mobilization: exercises.filter(e => 
        e.title.toLowerCase().includes("mobilization") || 
        e.title.toLowerCase().includes("snag") ||
        e.title.toLowerCase().includes("neural")
      ),
      tmj: exercises.filter(e => 
        e.title.toLowerCase().includes("tmj") ||
        e.title.toLowerCase().includes("massage") ||
        e.title.toLowerCase().includes("temporal") ||
        e.title.toLowerCase().includes("buccal")
      ),
      coordination: exercises.filter(e => 
        e.title.toLowerCase().includes("coordination") || 
        e.title.toLowerCase().includes("gaze") ||
        e.title.toLowerCase().includes("combined") ||
        e.title.toLowerCase().includes("archer")
      ),
      activities: exercises.filter(e => e.type === "activity")
    };
    
    // For exercises that didn't fit in any category
    const categorized = [
      ...categories.breathing, 
      ...categories.stretching,
      ...categories.strengthening,
      ...categories.mobilization,
      ...categories.tmj,
      ...categories.coordination,
      ...categories.activities
    ];
    
    const other = exercises.filter(e => !categorized.includes(e));
    
    return {
      ...categories,
      other
    };
  };
  
  if (exercises.length === 0) {
    return (
      <div className="bg-neutral-50 p-4 rounded border text-center">
        <p className="text-neutral-600">
          Today is a rest or review day. No specific exercises are scheduled.
        </p>
      </div>
    );
  }
  
  // Weekly review days
  if (day % 7 === 0) {
    // Get specific exercises for weekly review days
    let reviewDayExercises: Exercise[] = [];
    const weekNumber = Math.floor(day / 7);
    
    if (day === 7) {
      reviewDayExercises = getDay7Exercises();
    } else if (day === 14) {
      reviewDayExercises = getDay14Exercises();
    } else if (day === 21) {
      reviewDayExercises = getDay21Exercises();
    } else if (day === 28) {
      reviewDayExercises = getDay28Exercises();
    } else if (day === 35) {
      reviewDayExercises = getDay35Exercises();
    } else if (day === 42) {
      reviewDayExercises = getDay42Exercises();
    } else if (day === 49) {
      reviewDayExercises = getDay49Exercises();
    } else if (day === 56) {
      reviewDayExercises = getDay56Exercises();
    } else if (day === 63) {
      reviewDayExercises = getDay63Exercises();
    } else if (day === 70) {
      reviewDayExercises = getDay70Exercises();
    }
        
    return (
      <div className="space-y-4">
        <div className="bg-blue-50/50 p-6 rounded-lg border border-blue-100">
          <h3 className="font-medium text-blue-800 mb-2">Weekly Review Day</h3>
          <p className="text-blue-700 mb-4">
            Today is your weekly review day (Week {weekNumber}). Take some time to reflect on your progress
            and make note of any changes in your symptoms. Continue with your tracking
            and consider which exercises have been most helpful this week.
          </p>
          
          <button 
            onClick={() => setShowExercisesOnReviewDay(!showExercisesOnReviewDay)}
            className="text-blue-600 underline text-sm font-medium hover:text-blue-800"
          >
            {showExercisesOnReviewDay ? "Hide exercises" : "Show recommended exercises for today"}
          </button>
        </div>
        
        {showExercisesOnReviewDay && reviewDayExercises.length > 0 && (
          <Card className="p-6 bg-gradient-to-br from-white to-purple-50/10 mt-4">
            <Tabs defaultValue="all" onValueChange={setActiveTab}>
              <TabsList className="mb-4">
                <TabsTrigger value="all">All Exercises</TabsTrigger>
                <TabsTrigger value="breathing">Breathing</TabsTrigger>
                <TabsTrigger value="stretching">Stretching</TabsTrigger>
                <TabsTrigger value="strengthening">Strengthening</TabsTrigger>
                <TabsTrigger value="tmj">TMJ</TabsTrigger>
                <TabsTrigger value="activities">Activities</TabsTrigger>
              </TabsList>
              
              <TabsContent value="all">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {reviewDayExercises.map((exercise) => (
                    <ExerciseItem 
                      key={exercise.id} 
                      exercise={exercise}
                      videoDisplayMode={videoDisplayMode}
                    />
                  ))}
                </div>
              </TabsContent>
              
              <TabsContent value="breathing">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {categorizeExercises(reviewDayExercises).breathing.map((exercise) => (
                    <ExerciseItem 
                      key={exercise.id} 
                      exercise={exercise}
                      videoDisplayMode={videoDisplayMode}
                    />
                  ))}
                </div>
              </TabsContent>
              
              <TabsContent value="stretching">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {categorizeExercises(reviewDayExercises).stretching.map((exercise) => (
                    <ExerciseItem 
                      key={exercise.id} 
                      exercise={exercise}
                      videoDisplayMode={videoDisplayMode}
                    />
                  ))}
                </div>
              </TabsContent>
              
              <TabsContent value="strengthening">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {categorizeExercises(reviewDayExercises).strengthening.map((exercise) => (
                    <ExerciseItem 
                      key={exercise.id} 
                      exercise={exercise}
                      videoDisplayMode={videoDisplayMode}
                    />
                  ))}
                </div>
              </TabsContent>
              
              <TabsContent value="tmj">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {categorizeExercises(reviewDayExercises).tmj.map((exercise) => (
                    <ExerciseItem 
                      key={exercise.id} 
                      exercise={exercise}
                      videoDisplayMode={videoDisplayMode}
                    />
                  ))}
                </div>
              </TabsContent>
              
              <TabsContent value="activities">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {categorizeExercises(reviewDayExercises).activities.map((exercise) => (
                    <ExerciseItem 
                      key={exercise.id} 
                      exercise={exercise}
                      videoDisplayMode={videoDisplayMode}
                    />
                  ))}
                </div>
              </TabsContent>
            </Tabs>
          </Card>
        )}
      </div>
    );
  }
  
  // Regular exercise days - show in a grid with tabs for categories
  const categories = categorizeExercises(exercises);
  
  return (
    <Card className="p-6 bg-gradient-to-br from-white to-purple-50/10">
      <Tabs defaultValue="all" onValueChange={setActiveTab}>
        <TabsList className="mb-4">
          <TabsTrigger value="all">All Exercises</TabsTrigger>
          {categories.breathing.length > 0 && (
            <TabsTrigger value="breathing">Breathing</TabsTrigger>
          )}
          {categories.stretching.length > 0 && (
            <TabsTrigger value="stretching">Stretching</TabsTrigger>
          )}
          {categories.strengthening.length > 0 && (
            <TabsTrigger value="strengthening">Strengthening</TabsTrigger>
          )}
          {categories.mobilization.length > 0 && (
            <TabsTrigger value="mobilization">Mobilization</TabsTrigger>
          )}
          {categories.tmj.length > 0 && (
            <TabsTrigger value="tmj">TMJ</TabsTrigger>
          )}
          {categories.coordination.length > 0 && (
            <TabsTrigger value="coordination">Coordination</TabsTrigger>
          )}
          {categories.activities.length > 0 && (
            <TabsTrigger value="activities">Activities</TabsTrigger>
          )}
        </TabsList>
        
        <TabsContent value="all">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {exercises.map((exercise) => (
              <ExerciseItem 
                key={exercise.id} 
                exercise={exercise}
                videoDisplayMode={videoDisplayMode}
              />
            ))}
          </div>
        </TabsContent>
        
        <TabsContent value="breathing">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {categories.breathing.map((exercise) => (
              <ExerciseItem 
                key={exercise.id} 
                exercise={exercise}
                videoDisplayMode={videoDisplayMode}
              />
            ))}
          </div>
        </TabsContent>
        
        <TabsContent value="stretching">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {categories.stretching.map((exercise) => (
              <ExerciseItem 
                key={exercise.id} 
                exercise={exercise}
                videoDisplayMode={videoDisplayMode}
              />
            ))}
          </div>
        </TabsContent>
        
        <TabsContent value="strengthening">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {categories.strengthening.map((exercise) => (
              <ExerciseItem 
                key={exercise.id} 
                exercise={exercise}
                videoDisplayMode={videoDisplayMode}
              />
            ))}
          </div>
        </TabsContent>
        
        <TabsContent value="mobilization">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {categories.mobilization.map((exercise) => (
              <ExerciseItem 
                key={exercise.id} 
                exercise={exercise}
                videoDisplayMode={videoDisplayMode}
              />
            ))}
          </div>
        </TabsContent>
        
        <TabsContent value="tmj">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {categories.tmj.map((exercise) => (
              <ExerciseItem 
                key={exercise.id} 
                exercise={exercise}
                videoDisplayMode={videoDisplayMode}
              />
            ))}
          </div>
        </TabsContent>
        
        <TabsContent value="coordination">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {categories.coordination.map((exercise) => (
              <ExerciseItem 
                key={exercise.id} 
                exercise={exercise}
                videoDisplayMode={videoDisplayMode}
              />
            ))}
          </div>
        </TabsContent>
        
        <TabsContent value="activities">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {categories.activities.map((exercise) => (
              <ExerciseItem 
                key={exercise.id} 
                exercise={exercise}
                videoDisplayMode={videoDisplayMode}
              />
            ))}
          </div>
        </TabsContent>
      </Tabs>
    </Card>
  );
};

export default DailyExerciseList;
