
import React, { useState, useEffect, useMemo } from "react";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Check, Play, Clock } from "lucide-react";
import { exercises } from "@/utils/exercises/data";
import { getRecommendedExercises } from "@/utils/exercises/filters";
import { useQuestionnaireResponses } from "@/hooks/useQuestionnaireResponses";
import { getExerciseCategory, EXERCISE_CATEGORY_COLORS, ALL_VAULT_CATEGORIES, ExerciseCategory } from "@/utils/exercises/exerciseCategoryMap";
import { Exercise } from "@/utils/exercises/types";
import { SelectedExercise } from "@/hooks/useMaintenanceProgram";

interface ExerciseLibraryProps {
  selectedExercises: SelectedExercise[];
  onSelectionChange: (exercises: SelectedExercise[]) => void;
}

const ExerciseLibrary: React.FC<ExerciseLibraryProps> = ({ selectedExercises, onSelectionChange }) => {
  const { getResponse } = useQuestionnaireResponses();
  const [recommendedExercises, setRecommendedExercises] = useState<Exercise[]>([]);
  const [activeCategory, setActiveCategory] = useState<"all" | ExerciseCategory>("all");
  const [loading, setLoading] = useState(true);

  // Load FHT response and filter exercises
  useEffect(() => {
    const loadExercises = async () => {
      const fhtResponse = await getResponse("fht", 1);
      const recommended = getRecommendedExercises(fhtResponse ?? undefined);
      // Filter out activity sheets
      const exerciseOnly = recommended.filter(ex => ex.type !== "activity");
      setRecommendedExercises(exerciseOnly);
      setLoading(false);
    };
    loadExercises();
  }, [getResponse]);

  // Determine which categories have exercises
  const availableCategories = useMemo(() => {
    const cats = new Set<ExerciseCategory>();
    recommendedExercises.forEach(ex => cats.add(getExerciseCategory(ex.id)));
    return ALL_VAULT_CATEGORIES.filter(c => cats.has(c));
  }, [recommendedExercises]);

  // Filter by active category
  const filteredExercises = useMemo(() => {
    if (activeCategory === "all") return recommendedExercises;
    return recommendedExercises.filter(ex => getExerciseCategory(ex.id) === activeCategory);
  }, [recommendedExercises, activeCategory]);

  const selectedIds = new Set(selectedExercises.map(e => e.exerciseId));

  const toggleExercise = (exercise: Exercise) => {
    if (selectedIds.has(exercise.id)) {
      onSelectionChange(selectedExercises.filter(e => e.exerciseId !== exercise.id));
    } else {
      onSelectionChange([...selectedExercises, {
        exerciseId: exercise.id,
        title: exercise.title,
        sets: 3,
        reps: 10,
        category: getExerciseCategory(exercise.id),
      }]);
    }
  };

  if (loading) {
    return (
      <section className="bg-card rounded-xl p-8 mb-8 border border-border">
        <div className="animate-pulse space-y-4">
          <div className="h-8 bg-muted rounded w-1/3"></div>
          <div className="h-4 bg-muted rounded w-1/2"></div>
          <div className="grid grid-cols-3 gap-4">
            {[1, 2, 3].map(i => <div key={i} className="h-48 bg-muted rounded"></div>)}
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="bg-card rounded-xl p-6 md:p-8 mb-8 border border-border">
      <div className="flex flex-col md:flex-row justify-between items-start mb-6 gap-3">
        <div>
          <h2 className="text-2xl font-bold text-foreground">Exercise Vault</h2>
          <p className="text-muted-foreground">Select exercises to build your personalized program</p>
        </div>
        <div className="bg-primary px-4 py-2 rounded-lg flex items-center text-primary-foreground">
          <Check className="mr-2 h-4 w-4" />
          <span>Selected: <strong>{selectedExercises.length}</strong></span>
        </div>
      </div>

      {/* Category Tabs */}
      <div className="flex flex-wrap gap-2 mb-6">
        <Button
          variant={activeCategory === "all" ? "default" : "secondary"}
          size="sm"
          onClick={() => setActiveCategory("all")}
        >
          All ({recommendedExercises.length})
        </Button>
        {availableCategories.map(cat => {
          const count = recommendedExercises.filter(ex => getExerciseCategory(ex.id) === cat).length;
          return (
            <Button
              key={cat}
              variant={activeCategory === cat ? "default" : "secondary"}
              size="sm"
              onClick={() => setActiveCategory(cat)}
            >
              {cat} ({count})
            </Button>
          );
        })}
      </div>

      {/* Exercise Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredExercises.map(exercise => {
          const category = getExerciseCategory(exercise.id);
          const isSelected = selectedIds.has(exercise.id);
          return (
            <div
              key={exercise.id}
              className={`bg-muted rounded-xl overflow-hidden border-2 transition-all cursor-pointer ${
                isSelected ? 'border-primary' : 'border-transparent hover:border-border'
              }`}
              onClick={() => toggleExercise(exercise)}
            >
              <div className="p-4">
                <div className="flex items-start justify-between mb-2">
                  <div className="flex-1">
                    <span className={`${EXERCISE_CATEGORY_COLORS[category]} px-2 py-0.5 rounded-full text-xs text-white`}>
                      {category}
                    </span>
                    <h3 className="font-medium mt-2 text-foreground">{exercise.title}</h3>
                  </div>
                  <Checkbox checked={isSelected} className="mt-1" />
                </div>
                <p className="text-sm text-muted-foreground mb-3">{exercise.description}</p>
                <div className="flex items-center justify-between">
                  {exercise.videoUrl && (
                    <a
                      href={exercise.videoUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      onClick={(e) => e.stopPropagation()}
                      className="text-primary text-sm flex items-center gap-1 hover:underline"
                    >
                      <Play className="h-3 w-3" /> Watch Video
                    </a>
                  )}
                  <span className="text-xs text-muted-foreground">ID: {exercise.id}</span>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {filteredExercises.length === 0 && (
        <div className="text-center py-8">
          <p className="text-muted-foreground">No exercises found in this category.</p>
        </div>
      )}
    </section>
  );
};

export default ExerciseLibrary;
