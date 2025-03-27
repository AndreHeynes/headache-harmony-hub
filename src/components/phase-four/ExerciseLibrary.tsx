
import React from "react";
import { Button } from "@/components/ui/button";
import { Check, ChevronDown, Play, Clock } from "lucide-react";

const exerciseCategories = [
  { id: "all", name: "All Exercises", active: true },
  { id: "mobility", name: "Neck Mobility", active: false },
  { id: "stability", name: "Neck Stability", active: false },
  { id: "stretches", name: "Neck Stretches", active: false },
  { id: "sensorimotor", name: "Sensorimotor", active: false },
  { id: "neural", name: "Neural (Set 4)", disabled: true },
  { id: "tmj", name: "TMJ (Set 6)", disabled: true }
];

const exercises = [
  {
    id: 1,
    title: "Neck Flexion/Extension",
    description: "Gentle nodding movement to improve range of motion in the cervical spine.",
    category: "Mobility",
    categoryClass: "bg-blue-600",
    duration: "2-3 mins",
    image: "https://storage.googleapis.com/uxpilot-auth.appspot.com/c3aa7d589c-451f912605bd6e5bb5c6.png"
  },
  {
    id: 2,
    title: "Isometric Hold",
    description: "Strengthens deep neck flexors for improved posture and stability.",
    category: "Stability",
    categoryClass: "bg-green-600",
    duration: "3-4 mins",
    image: "https://storage.googleapis.com/uxpilot-auth.appspot.com/755ff7e48c-8ec14444aa5a014b5c94.png"
  },
  {
    id: 3,
    title: "Upper Trapezius Stretch",
    description: "Gentle lateral neck stretch to release tension in upper trapezius.",
    category: "Stretching",
    categoryClass: "bg-purple-600",
    duration: "2-3 mins",
    image: "https://storage.googleapis.com/uxpilot-auth.appspot.com/618c894a5e-ae25dbd6e0dd5a79f0a2.png"
  }
];

const ExerciseLibrary = () => {
  return (
    <section className="bg-gray-800 rounded-xl p-8 mb-8">
      <div className="flex justify-between items-start mb-8">
        <div>
          <h2 className="text-2xl font-bold mb-2">Exercise Vault</h2>
          <p className="text-gray-400">Select exercises to build your personalized program</p>
        </div>
        <div className="bg-blue-600 px-4 py-2 rounded-lg flex items-center">
          <Check className="mr-2 h-4 w-4" />
          <span>Selected: <strong>0</strong></span>
        </div>
      </div>

      {/* Filter Tabs */}
      <div className="flex space-x-4 mb-8 overflow-x-auto pb-2 hide-scrollbar">
        {exerciseCategories.map(category => (
          <Button 
            key={category.id}
            variant={category.active ? "default" : "secondary"}
            className={`whitespace-nowrap bg-${category.active ? 'blue-600' : 'gray-700'} hover:bg-${category.active ? 'blue-700' : 'gray-600'} ${category.disabled ? 'opacity-50 cursor-not-allowed' : ''}`}
            disabled={category.disabled}
          >
            {category.name}
          </Button>
        ))}
      </div>

      {/* Exercise Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {exercises.map(exercise => (
          <div key={exercise.id} className="bg-gray-700 rounded-xl overflow-hidden">
            <div className="relative">
              <img 
                src={exercise.image} 
                alt={exercise.title} 
                className="w-full h-48 object-cover" 
              />
              <div className="absolute top-3 right-3">
                <input type="checkbox" className="w-5 h-5 rounded-lg" />
              </div>
              <div className={`absolute bottom-3 left-3 ${exercise.categoryClass} px-3 py-1 rounded-full text-sm`}>
                {exercise.category}
              </div>
              <button className="absolute right-3 top-10 bg-background bg-opacity-75 p-2 rounded-full">
                <Play className="h-4 w-4" />
              </button>
            </div>
            <div className="p-4">
              <h3 className="font-medium mb-2">{exercise.title}</h3>
              <p className="text-sm text-gray-400 mb-4">{exercise.description}</p>
              <div className="flex items-center text-sm text-gray-400">
                <Clock className="mr-2 h-4 w-4" />
                <span>{exercise.duration}</span>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Load More Button */}
      <div className="text-center mt-8">
        <Button className="px-6 py-3 bg-gray-700 hover:bg-gray-600 rounded-lg flex items-center">
          Load More Exercises
          <ChevronDown className="ml-2 h-4 w-4" />
        </Button>
      </div>
    </section>
  );
};

export default ExerciseLibrary;
