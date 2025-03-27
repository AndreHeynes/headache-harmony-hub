
import React, { useState } from "react";
import { Card } from "@/components/ui/card";
import { Filter, SortAsc, Play } from "lucide-react";
import { exerciseData } from "./exerciseData";

const ExerciseLibrary = () => {
  const [activeCategory, setActiveCategory] = useState("All");
  
  const categories = [
    "All",
    "Neck Mobility",
    "Neck Stability",
    "Stretches",
    "Sensorimotor",
    "TMJ",
    "Neural"
  ];

  // Filter exercises based on active category
  const filteredExercises = activeCategory === "All" 
    ? exerciseData 
    : exerciseData.filter(exercise => 
        exercise.categories.includes(activeCategory)
      );

  return (
    <div className="mt-6">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-lg font-medium text-gray-800">Exercise Library</h2>
        <div className="flex space-x-2">
          <button className="bg-gray-100 hover:bg-gray-200 text-gray-700 px-3 py-1 rounded-lg text-sm flex items-center">
            <Filter className="h-4 w-4 mr-1" />
            Filter
          </button>
          <button className="bg-gray-100 hover:bg-gray-200 text-gray-700 px-3 py-1 rounded-lg text-sm flex items-center">
            <SortAsc className="h-4 w-4 mr-1" />
            Sort
          </button>
        </div>
      </div>

      <div className="flex overflow-x-auto space-x-2 pb-4 mb-6 hide-scrollbar">
        {categories.map(category => (
          <button 
            key={category}
            className={`${
              activeCategory === category 
                ? "bg-purple-600 text-white" 
                : "bg-gray-100 text-gray-700 hover:bg-gray-200"
            } px-4 py-2 rounded-full whitespace-nowrap text-sm transition-colors`}
            onClick={() => setActiveCategory(category)}
          >
            {category}
          </button>
        ))}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {filteredExercises.map(exercise => (
          <ExerciseCard key={exercise.id} exercise={exercise} />
        ))}
      </div>
    </div>
  );
};

const ExerciseCard = ({ exercise }) => {
  return (
    <Card className="overflow-hidden bg-white border-gray-200">
      <div className="relative h-48">
        <img className="w-full h-full object-cover" src={exercise.imageUrl} alt={exercise.imageAlt} />
        <div className="absolute inset-0 bg-gradient-to-t from-gray-900 to-transparent"></div>
        <button className="absolute right-4 top-4 bg-black bg-opacity-60 p-2 rounded-full text-white hover:bg-opacity-80 transition-all">
          <Play className="h-5 w-5" />
        </button>
      </div>
      <div className="p-4">
        <h3 className="text-lg font-medium text-gray-800 mb-2">{exercise.title}</h3>
        <p className="text-gray-600 text-sm mb-3">{exercise.description}</p>
        <div className="flex flex-wrap gap-2">
          {exercise.categories.map(category => {
            let bgColor = "";
            let textColor = "";
            
            switch(category) {
              case "Neck Mobility":
                bgColor = "bg-indigo-100";
                textColor = "text-indigo-700";
                break;
              case "Stretches":
                bgColor = "bg-green-100";
                textColor = "text-green-700";
                break;
              case "Sensorimotor":
                bgColor = "bg-yellow-100";
                textColor = "text-yellow-700";
                break;
              case "TMJ":
                bgColor = "bg-orange-100";
                textColor = "text-orange-700";
                break;
              case "Neural":
                bgColor = "bg-red-100";
                textColor = "text-red-700";
                break;
              case "Neck Stability":
                bgColor = "bg-blue-100";
                textColor = "text-blue-700";
                break;
              default:
                bgColor = "bg-gray-100";
                textColor = "text-gray-700";
            }
            
            return (
              <span key={category} className={`${bgColor} ${textColor} px-2 py-1 rounded text-xs`}>
                {category}
              </span>
            );
          })}
          
          <span className="bg-purple-100 text-purple-700 px-2 py-1 rounded text-xs">
            {exercise.level}
          </span>
          
          <span className="bg-blue-100 text-blue-700 px-2 py-1 rounded text-xs">
            {exercise.duration}
          </span>
        </div>
      </div>
    </Card>
  );
};

export default ExerciseLibrary;
