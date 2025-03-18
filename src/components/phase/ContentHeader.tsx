
import React from "react";
import { ArrowRight, ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";

interface ContentHeaderProps {
  title: string;
  onNext?: () => void;
  onPrevious?: () => void;
  canGoNext?: boolean;
  canGoPrevious?: boolean;
}

const ContentHeader = ({ 
  title, 
  onNext, 
  onPrevious, 
  canGoNext = true, 
  canGoPrevious = true 
}: ContentHeaderProps) => {
  return (
    <div className="flex justify-between items-center">
      <h2 className="text-xl">{title}</h2>
      <div className="flex space-x-1">
        {onPrevious && (
          <Button 
            variant="ghost" 
            size="sm" 
            onClick={onPrevious}
            disabled={!canGoPrevious}
            className="p-1 h-auto"
          >
            <ArrowLeft className="h-5 w-5 text-neutral-600" />
          </Button>
        )}
        {onNext && (
          <Button 
            variant="ghost" 
            size="sm" 
            onClick={onNext}
            disabled={!canGoNext}
            className="p-1 h-auto"
          >
            <ArrowRight className="h-5 w-5 text-neutral-600" />
          </Button>
        )}
      </div>
    </div>
  );
};

export default ContentHeader;
