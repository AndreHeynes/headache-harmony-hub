
import React from "react";
import ExerciseItem from "../ExerciseItem";
import { Exercise } from "@/utils/exercises/types";
import { Card } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { CategorizedExercises, categorizeExercises } from "./ExerciseCategorizer";

interface RegularExerciseDayProps {
  exercises: Exercise[];
  videoDisplayMode?: "embedded" | "link";
}

const RegularExerciseDay: React.FC<RegularExerciseDayProps> = ({ 
  exercises, 
  videoDisplayMode = "link"
}) => {
  const categories = categorizeExercises(exercises);
  
  return (
    <Card className="p-6 bg-gradient-to-br from-white to-purple-50/10">
      <Tabs defaultValue="all">
        <TabsList className="mb-4">
          <TabsTrigger value="all">All Exercises</TabsTrigger>
          {renderTabTriggers(categories)}
        </TabsList>
        
        <TabsContent value="all">
          <ExerciseGrid 
            exercises={exercises} 
            videoDisplayMode={videoDisplayMode} 
          />
        </TabsContent>
        
        {renderTabContents(categories, videoDisplayMode)}
      </Tabs>
    </Card>
  );
};

// Helper function to render category tabs
const renderTabTriggers = (categories: CategorizedExercises) => {
  const triggers = [];
  
  if (categories.breathing.length > 0) {
    triggers.push(
      <TabsTrigger key="breathing" value="breathing">Breathing</TabsTrigger>
    );
  }
  
  if (categories.stretching.length > 0) {
    triggers.push(
      <TabsTrigger key="stretching" value="stretching">Stretching</TabsTrigger>
    );
  }
  
  if (categories.strengthening.length > 0) {
    triggers.push(
      <TabsTrigger key="strengthening" value="strengthening">Strengthening</TabsTrigger>
    );
  }
  
  if (categories.mobilization.length > 0) {
    triggers.push(
      <TabsTrigger key="mobilization" value="mobilization">Mobilization</TabsTrigger>
    );
  }
  
  if (categories.tmj.length > 0) {
    triggers.push(
      <TabsTrigger key="tmj" value="tmj">TMJ</TabsTrigger>
    );
  }
  
  if (categories.coordination.length > 0) {
    triggers.push(
      <TabsTrigger key="coordination" value="coordination">Coordination</TabsTrigger>
    );
  }
  
  if (categories.activities.length > 0) {
    triggers.push(
      <TabsTrigger key="activities" value="activities">Activities</TabsTrigger>
    );
  }
  
  return triggers;
};

// Helper function to render category contents
const renderTabContents = (categories: CategorizedExercises, videoDisplayMode?: "embedded" | "link") => {
  const contents = [];
  
  if (categories.breathing.length > 0) {
    contents.push(
      <TabsContent key="breathing" value="breathing">
        <ExerciseGrid 
          exercises={categories.breathing} 
          videoDisplayMode={videoDisplayMode} 
        />
      </TabsContent>
    );
  }
  
  if (categories.stretching.length > 0) {
    contents.push(
      <TabsContent key="stretching" value="stretching">
        <ExerciseGrid 
          exercises={categories.stretching} 
          videoDisplayMode={videoDisplayMode} 
        />
      </TabsContent>
    );
  }
  
  if (categories.strengthening.length > 0) {
    contents.push(
      <TabsContent key="strengthening" value="strengthening">
        <ExerciseGrid 
          exercises={categories.strengthening} 
          videoDisplayMode={videoDisplayMode} 
        />
      </TabsContent>
    );
  }
  
  if (categories.mobilization.length > 0) {
    contents.push(
      <TabsContent key="mobilization" value="mobilization">
        <ExerciseGrid 
          exercises={categories.mobilization} 
          videoDisplayMode={videoDisplayMode} 
        />
      </TabsContent>
    );
  }
  
  if (categories.tmj.length > 0) {
    contents.push(
      <TabsContent key="tmj" value="tmj">
        <ExerciseGrid 
          exercises={categories.tmj} 
          videoDisplayMode={videoDisplayMode} 
        />
      </TabsContent>
    );
  }
  
  if (categories.coordination.length > 0) {
    contents.push(
      <TabsContent key="coordination" value="coordination">
        <ExerciseGrid 
          exercises={categories.coordination} 
          videoDisplayMode={videoDisplayMode} 
        />
      </TabsContent>
    );
  }
  
  if (categories.activities.length > 0) {
    contents.push(
      <TabsContent key="activities" value="activities">
        <ExerciseGrid 
          exercises={categories.activities} 
          videoDisplayMode={videoDisplayMode} 
        />
      </TabsContent>
    );
  }
  
  return contents;
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

export default RegularExerciseDay;
