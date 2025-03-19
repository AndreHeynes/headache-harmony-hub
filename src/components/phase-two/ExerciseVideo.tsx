
import React, { useState } from "react";
import { ExternalLink, Play } from "lucide-react";
import { Button } from "@/components/ui/button";

interface ExerciseVideoProps {
  title: string;
  videoUrl: string;
  displayMode?: "embedded" | "link";
}

const ExerciseVideo: React.FC<ExerciseVideoProps> = ({ 
  title, 
  videoUrl, 
  displayMode = "link" 
}) => {
  const [isPlaying, setIsPlaying] = useState(false);
  
  if (displayMode === "embedded" && isPlaying) {
    return (
      <div className="w-full aspect-video rounded-md overflow-hidden">
        <iframe
          src={videoUrl}
          className="w-full h-full"
          frameBorder="0"
          allow="autoplay; fullscreen; picture-in-picture"
          allowFullScreen
          title={title}
        />
      </div>
    );
  }
  
  if (displayMode === "embedded" && !isPlaying) {
    return (
      <div 
        className="bg-neutral-800 rounded-lg p-8 flex items-center justify-center cursor-pointer"
        onClick={() => setIsPlaying(true)}
      >
        <div className="text-center">
          <Play className="h-12 w-12 text-white mb-2" />
          <p className="text-white">{title}</p>
        </div>
      </div>
    );
  }
  
  // Link mode
  return (
    <Button variant="outline" className="w-full flex justify-between" asChild>
      <a href={videoUrl} target="_blank" rel="noopener noreferrer">
        <span>{title}</span>
        <ExternalLink className="h-4 w-4 ml-2" />
      </a>
    </Button>
  );
};

export default ExerciseVideo;
