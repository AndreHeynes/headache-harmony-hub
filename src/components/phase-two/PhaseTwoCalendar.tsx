import React, { useRef } from "react";
import { ChevronLeft, ChevronRight, Check, Circle, RotateCcw } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { cn } from "@/lib/utils";

interface PhaseTwoCalendarProps {
  currentDay: number;
  totalDays: number;
  onDaySelect: (day: number) => void;
  completedDays?: Set<number>;
}

const DAY_LABELS = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];

const PhaseTwoCalendar: React.FC<PhaseTwoCalendarProps> = ({
  currentDay,
  totalDays,
  onDaySelect,
  completedDays = new Set(),
}) => {
  const contentRef = useRef<HTMLDivElement>(null);
  const currentWeek = Math.ceil(currentDay / 7);
  const totalWeeks = Math.ceil(totalDays / 7);

  const [viewWeek, setViewWeek] = React.useState(currentWeek);

  // Keep viewWeek in sync when currentDay changes week
  React.useEffect(() => {
    setViewWeek(Math.ceil(currentDay / 7));
  }, [currentDay]);

  const weekStartDay = (viewWeek - 1) * 7 + 1;
  const weekDays = Array.from({ length: 7 }, (_, i) => weekStartDay + i).filter(
    (d) => d <= totalDays
  );

  const handleDayClick = (day: number) => {
    onDaySelect(day);
    // Scroll to content below
    setTimeout(() => {
      contentRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
    }, 100);
  };

  const isReviewDay = (day: number) => day % 7 === 0;

  return (
    <Card>
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <Button
            variant="ghost"
            size="sm"
            disabled={viewWeek <= 1}
            onClick={() => setViewWeek((w) => Math.max(1, w - 1))}
          >
            <ChevronLeft className="h-4 w-4 mr-1" />
            Week {viewWeek - 1}
          </Button>
          <CardTitle className="text-lg">Week {viewWeek}</CardTitle>
          <Button
            variant="ghost"
            size="sm"
            disabled={viewWeek >= totalWeeks}
            onClick={() => setViewWeek((w) => Math.min(totalWeeks, w + 1))}
          >
            Week {viewWeek + 1}
            <ChevronRight className="h-4 w-4 ml-1" />
          </Button>
        </div>
      </CardHeader>
      <CardContent>
        {/* Day labels row */}
        <div className="grid grid-cols-7 gap-1 mb-1">
          {DAY_LABELS.map((label) => (
            <div
              key={label}
              className="text-center text-xs font-medium text-muted-foreground py-1"
            >
              {label}
            </div>
          ))}
        </div>

        {/* Day cells */}
        <div className="grid grid-cols-7 gap-1">
          {weekDays.map((day) => {
            const isSelected = day === currentDay;
            const isCompleted = completedDays.has(day);
            const isReview = isReviewDay(day);

            return (
              <button
                key={day}
                onClick={() => handleDayClick(day)}
                className={cn(
                  "relative flex flex-col items-center justify-center rounded-lg p-2 min-h-[64px] transition-all border-2 cursor-pointer",
                  isSelected
                    ? "border-primary bg-primary/10 shadow-sm"
                    : "border-transparent hover:border-muted-foreground/20 hover:bg-accent/50",
                  isCompleted && !isSelected && "bg-accent"
                )}
              >
                <span
                  className={cn(
                    "text-sm font-semibold",
                    isSelected ? "text-primary" : "text-foreground"
                  )}
                >
                  {day}
                </span>

                {/* Status icon */}
                <div className="mt-1">
                  {isCompleted ? (
                    <Check className="h-3.5 w-3.5 text-primary" />
                  ) : isSelected ? (
                    <Circle className="h-3.5 w-3.5 fill-primary text-primary" />
                  ) : (
                    <Circle className="h-3.5 w-3.5 text-muted-foreground/30" />
                  )}
                </div>

                {/* Review day badge */}
                {isReview && (
                  <span className="absolute top-0.5 right-0.5">
                    <RotateCcw className="h-3 w-3 text-muted-foreground" />
                  </span>
                )}
              </button>
            );
          })}

          {/* Fill remaining cells if week is incomplete */}
          {weekDays.length < 7 &&
            Array.from({ length: 7 - weekDays.length }).map((_, i) => (
              <div key={`empty-${i}`} className="min-h-[64px]" />
            ))}
        </div>

        {/* Legend */}
        <div className="flex items-center gap-4 mt-3 text-xs text-muted-foreground">
          <div className="flex items-center gap-1">
            <Check className="h-3 w-3 text-primary" /> Completed
          </div>
          <div className="flex items-center gap-1">
            <Circle className="h-3 w-3 fill-primary text-primary" /> Selected
          </div>
          <div className="flex items-center gap-1">
            <RotateCcw className="h-3 w-3" /> Review
          </div>
        </div>

        {/* Scroll anchor */}
        <div ref={contentRef} />
      </CardContent>
    </Card>
  );
};

export default PhaseTwoCalendar;
