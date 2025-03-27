
import React, { useState } from "react";
import ExerciseItem from "../ExerciseItem";
import { Exercise } from "@/utils/exercises/types";
import { Card } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { categorizeExercises } from "./ExerciseCategorizer";

interface WeeklyReviewDayProps {
  day: number;
  weekNumber: number;
  reviewDayExercises: Exercise[];
  videoDisplayMode?: "embedded" | "link";
}

const WeeklyReviewDay: React.FC<WeeklyReviewDayProps> = ({
  day,
  weekNumber,
  reviewDayExercises,
  videoDisplayMode = "link"
}) => {
  const [showExercisesOnReviewDay, setShowExercisesOnReviewDay] = useState(false);
  
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
        <ReviewDayExerciseTabs 
          exercises={reviewDayExercises} 
          videoDisplayMode={videoDisplayMode} 
        />
      )}
    </div>
  );
};

interface ReviewDayExerciseTabsProps {
  exercises: Exercise[];
  videoDisplayMode?: "embedded" | "link";
}

const ReviewDayExerciseTabs: React.FC<ReviewDayExerciseTabsProps> = ({ 
  exercises, 
  videoDisplayMode 
}) => {
  const categories = categorizeExercises(exercises);
  
  return (
    <Card className="p-6 bg-gradient-to-br from-white to-purple-50/10 mt-4">
      <Tabs defaultValue="all">
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
          {categories.tmj.length > 0 && (
            <TabsTrigger value="tmj">TMJ</TabsTrigger>
          )}
          {categories.activities.length > 0 && (
            <TabsTrigger value="activities">Activities</TabsTrigger>
          )}
        </TabsList>
        
        <TabsContent value="all">
          <ExerciseGrid 
            exercises={exercises} 
            videoDisplayMode={videoDisplayMode} 
          />
        </TabsContent>
        
        <TabsContent value="breathing">
          <ExerciseGrid 
            exercises={categories.breathing} 
            videoDisplayMode={videoDisplayMode} 
          />
        </TabsContent>
        
        <TabsContent value="stretching">
          <ExerciseGrid 
            exercises={categories.stretching} 
            videoDisplayMode={videoDisplayMode} 
          />
        </TabsContent>
        
        <TabsContent value="strengthening">
          <ExerciseGrid 
            exercises={categories.strengthening} 
            videoDisplayMode={videoDisplayMode} 
          />
        </TabsContent>
        
        <TabsContent value="tmj">
          <ExerciseGrid 
            exercises={categories.tmj} 
            videoDisplayMode={videoDisplayMode} 
          />
        </TabsContent>
        
        <TabsContent value="activities">
          <ExerciseGrid 
            exercises={categories.activities} 
            videoDisplayMode={videoDisplayMode} 
          />
        </TabsContent>
      </Tabs>
    </Card>
  );
};

interface ExerciseGridProps {
  exercises: Exercise[];
  videoDisplayMode?: "embedded" | "link";
}

const ExerciseGrid: React.FC<ExerciseGridProps> = ({ exercises, videoDisplayMode }) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      {exercises.map((exercise) => (
        <ExerciseItem 
          key={exercise.id} 
          exercise={exercise}
          videoDisplayMode={videoDisplayMode}
        />
      ))}
    </div>
  );
};

export default WeeklyReviewDay;
