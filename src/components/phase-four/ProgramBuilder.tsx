
import React, { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Trash2 } from "lucide-react";

const ProgramBuilder = () => {
  const [exercises, setExercises] = useState([
    { 
      id: 1, 
      name: "Neck Flexion Exercise", 
      sets: 3, 
      reps: 10 
    }
  ]);

  const updateExercise = (id, field, value) => {
    setExercises(
      exercises.map(ex => 
        ex.id === id ? { ...ex, [field]: parseInt(value) || 1 } : ex
      )
    );
  };

  const removeExercise = (id) => {
    setExercises(exercises.filter(ex => ex.id !== id));
  };

  // Calculate estimated program duration (2 minutes per exercise)
  const totalDuration = exercises.reduce((sum, ex) => sum + 2, 0);

  return (
    <Card className="bg-white shadow-sm border-gray-200 mt-6">
      <CardContent className="p-6">
        <h2 className="text-lg font-medium text-gray-800 mb-4">My Program</h2>
        
        {exercises.length > 0 ? (
          exercises.map(exercise => (
            <div key={exercise.id} className="bg-gray-50 rounded-lg p-4 mb-4 border border-gray-200">
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center">
                  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-gray-400 mr-3">
                    <line x1="4" y1="10" x2="10" y2="10"></line>
                    <line x1="4" y1="14" x2="10" y2="14"></line>
                    <line x1="14" y1="10" x2="20" y2="10"></line>
                    <line x1="14" y1="14" x2="20" y2="14"></line>
                  </svg>
                  <div>
                    <h4 className="text-gray-800 font-medium">{exercise.name}</h4>
                    <div className="flex items-center space-x-2 mt-1">
                      <input 
                        type="number" 
                        className="w-16 bg-white border border-gray-300 text-gray-800 rounded px-2 py-1 text-sm" 
                        value={exercise.sets} 
                        min="1"
                        onChange={(e) => updateExercise(exercise.id, 'sets', e.target.value)}
                      />
                      <span className="text-gray-600">sets</span>
                      <input 
                        type="number" 
                        className="w-16 bg-white border border-gray-300 text-gray-800 rounded px-2 py-1 text-sm" 
                        value={exercise.reps} 
                        min="1"
                        onChange={(e) => updateExercise(exercise.id, 'reps', e.target.value)}
                      />
                      <span className="text-gray-600">reps</span>
                    </div>
                  </div>
                </div>
                <button 
                  className="text-gray-400 hover:text-red-500"
                  onClick={() => removeExercise(exercise.id)}
                >
                  <Trash2 className="h-5 w-5" />
                </button>
              </div>
            </div>
          ))
        ) : (
          <div className="text-center py-8 bg-gray-50 rounded-lg mb-4">
            <p className="text-gray-500">Drag exercises here to build your program</p>
          </div>
        )}
        
        <div className="flex justify-between items-center">
          <div>
            <span className="text-gray-600">Program Duration:</span>
            <span className="text-gray-800 ml-2">{totalDuration} minutes</span>
          </div>
          <Button className="bg-purple-600 hover:bg-purple-700 text-white">
            Save Program
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default ProgramBuilder;
