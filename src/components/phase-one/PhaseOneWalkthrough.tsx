import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  Compass, 
  Calendar, 
  ClipboardCheck, 
  Activity, 
  ArrowRight, 
  CheckCircle2,
  ChevronLeft,
  ChevronRight,
  Play,
  Pause
} from "lucide-react";
import { Button } from "@/components/ui/button";

interface Scene {
  id: number;
  title: string;
  subtitle: string;
  description: string;
  icon: React.ReactNode;
  highlights: string[];
}

const scenes: Scene[] = [
  {
    id: 1,
    title: "Welcome to Phase 1",
    subtitle: "Understanding Your Starting Point",
    description: "Over the next 7 days, you'll discover what's driving your headaches—and that knowledge is the foundation for your recovery.",
    icon: <Compass className="h-12 w-12" />,
    highlights: ["7 Days to Understand Your Headaches"]
  },
  {
    id: 2,
    title: "What You'll Do",
    subtitle: "Quick Daily Assessments",
    description: "Day 1 is orientation—you're doing it now. Days 2 through 7, you'll complete quick, validated questionnaires that doctors use worldwide. Each takes just a few minutes.",
    icon: <Calendar className="h-12 w-12" />,
    highlights: ["Day 1: Orientation", "Days 2-7: Quick Assessments", "5-10 minutes per day"]
  },
  {
    id: 3,
    title: "Daily Tracking",
    subtitle: "Build Your Headache Profile",
    description: "Track your headaches daily—just note whether you had one, how severe, and any triggers you noticed. Even logging 'no headache today' is valuable.",
    icon: <Activity className="h-12 w-12" />,
    highlights: ["Track daily", "Note intensity & triggers", "Consistency is key"]
  },
  {
    id: 4,
    title: "Why It Matters",
    subtitle: "Your Custom Program",
    description: "Your Phase 1 data directly shapes your personalized treatment plan. We'll use it to select the right exercises and strategies for YOU.",
    icon: <ClipboardCheck className="h-12 w-12" />,
    highlights: ["Your Data = Your Custom Program"]
  },
  {
    id: 5,
    title: "Let's Begin",
    subtitle: "You've Already Started",
    description: "You've already started—that's what matters. Your first tasks are ready. Let's do this together.",
    icon: <CheckCircle2 className="h-12 w-12" />,
    highlights: ["Ready? Let's begin →"]
  }
];

const PhaseOneWalkthrough: React.FC = () => {
  const [currentScene, setCurrentScene] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(false);

  React.useEffect(() => {
    if (!isAutoPlaying) return;
    
    const timer = setInterval(() => {
      setCurrentScene((prev) => {
        if (prev >= scenes.length - 1) {
          setIsAutoPlaying(false);
          return prev;
        }
        return prev + 1;
      });
    }, 4000);

    return () => clearInterval(timer);
  }, [isAutoPlaying]);

  const goToScene = (index: number) => {
    setCurrentScene(index);
    setIsAutoPlaying(false);
  };

  const nextScene = () => {
    if (currentScene < scenes.length - 1) {
      setCurrentScene(currentScene + 1);
    }
  };

  const prevScene = () => {
    if (currentScene > 0) {
      setCurrentScene(currentScene - 1);
    }
  };

  const toggleAutoPlay = () => {
    setIsAutoPlaying(!isAutoPlaying);
  };

  const scene = scenes[currentScene];

  return (
    <div className="relative bg-gradient-to-br from-primary/10 via-background to-accent/10 rounded-lg overflow-hidden aspect-video">
      {/* Progress bar */}
      <div className="absolute top-0 left-0 right-0 h-1 bg-muted z-10">
        <motion.div
          className="h-full bg-primary"
          initial={{ width: 0 }}
          animate={{ width: `${((currentScene + 1) / scenes.length) * 100}%` }}
          transition={{ duration: 0.3 }}
        />
      </div>

      {/* Scene indicators */}
      <div className="absolute top-4 left-1/2 transform -translate-x-1/2 flex gap-2 z-10">
        {scenes.map((_, index) => (
          <button
            key={index}
            onClick={() => goToScene(index)}
            className={`w-2 h-2 rounded-full transition-all ${
              index === currentScene 
                ? "bg-primary w-6" 
                : index < currentScene 
                  ? "bg-primary/60" 
                  : "bg-muted-foreground/30"
            }`}
          />
        ))}
      </div>

      {/* Main content */}
      <AnimatePresence mode="wait">
        <motion.div
          key={scene.id}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.4 }}
          className="absolute inset-0 flex flex-col items-center justify-center p-6 text-center"
        >
          {/* Icon */}
          <motion.div
            initial={{ scale: 0, rotate: -180 }}
            animate={{ scale: 1, rotate: 0 }}
            transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
            className="mb-4 p-4 rounded-full bg-primary/10 text-primary"
          >
            {scene.icon}
          </motion.div>

          {/* Title */}
          <motion.h3
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="text-xl font-bold text-foreground mb-1"
          >
            {scene.title}
          </motion.h3>

          {/* Subtitle */}
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
            className="text-sm text-primary font-medium mb-3"
          >
            {scene.subtitle}
          </motion.p>

          {/* Description */}
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="text-sm text-muted-foreground max-w-md mb-4 leading-relaxed"
          >
            {scene.description}
          </motion.p>

          {/* Highlights */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6 }}
            className="flex flex-wrap justify-center gap-2"
          >
            {scene.highlights.map((highlight, index) => (
              <motion.span
                key={index}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.7 + index * 0.1 }}
                className="px-3 py-1 rounded-full bg-primary/10 text-primary text-xs font-medium"
              >
                {highlight}
              </motion.span>
            ))}
          </motion.div>

          {/* Phase timeline for scene 4 */}
          {scene.id === 4 && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.8 }}
              className="flex items-center gap-2 mt-4"
            >
              {["Phase 1", "Phase 2", "Phase 3", "Phase 4"].map((phase, index) => (
                <React.Fragment key={phase}>
                  <span className={`px-2 py-1 rounded text-xs ${
                    index === 0 ? "bg-primary text-primary-foreground" : "bg-muted text-muted-foreground"
                  }`}>
                    {phase}
                  </span>
                  {index < 3 && <ArrowRight className="h-3 w-3 text-muted-foreground" />}
                </React.Fragment>
              ))}
            </motion.div>
          )}
        </motion.div>
      </AnimatePresence>

      {/* Controls */}
      <div className="absolute bottom-4 left-0 right-0 flex items-center justify-center gap-4 z-10">
        <Button
          variant="ghost"
          size="icon"
          onClick={prevScene}
          disabled={currentScene === 0}
          className="h-8 w-8 rounded-full bg-background/80 backdrop-blur-sm"
        >
          <ChevronLeft className="h-4 w-4" />
        </Button>

        <Button
          variant="ghost"
          size="icon"
          onClick={toggleAutoPlay}
          className="h-10 w-10 rounded-full bg-primary/10 text-primary hover:bg-primary/20"
        >
          {isAutoPlaying ? (
            <Pause className="h-4 w-4" />
          ) : (
            <Play className="h-4 w-4 ml-0.5" />
          )}
        </Button>

        <Button
          variant="ghost"
          size="icon"
          onClick={nextScene}
          disabled={currentScene === scenes.length - 1}
          className="h-8 w-8 rounded-full bg-background/80 backdrop-blur-sm"
        >
          <ChevronRight className="h-4 w-4" />
        </Button>
      </div>
    </div>
  );
};

export default PhaseOneWalkthrough;
