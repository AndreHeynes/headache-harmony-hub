import React, { useRef } from "react";
import { ChevronLeft, ChevronRight, Check, Circle, RotateCcw, CalendarDays } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { addDays, format } from "date-fns";

interface PhaseTwoCalendarProps {
  currentDay: number;
  totalDays: number;
  onDaySelect: (day: number) => void;
  completedDays?: Set<number>;
  startDate?: string | null; // ISO date string e.g. "2026-04-06"
}

const DAY_LABELS = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];

const PhaseTwoCalendar: React.FC<PhaseTwoCalendarProps> = ({
  currentDay,
  totalDays,
  onDaySelect,
  completedDays = new Set(),
  startDate,
}) => {
  const contentRef = useRef<HTMLDivElement>(null);
  const currentWeek = Math.ceil(currentDay / 7);
  const totalWeeks = Math.ceil(totalDays / 7);

  const [viewWeek, setViewWeek] = React.useState(currentWeek);

  React.useEffect(() => {
    setViewWeek(Math.ceil(currentDay / 7));
  }, [currentDay]);

  const parsedStartDate = startDate ? new Date(startDate + "T00:00:00") : null;

  const getDateForDay = (day: number): Date | null => {
    if (!parsedStartDate) return null;
    return addDays(parsedStartDate, day - 1);
  };

  const weekStartDay = (viewWeek - 1) * 7 + 1;
  const weekDays = Array.from({ length: 7 }, (_, i) => weekStartDay + i).filter(
    (d) => d <= totalDays
  );

  // Week date range label
  const weekStartDate = getDateForDay(weekStartDay);
  const weekEndDay = Math.min(weekStartDay + 6, totalDays);
  const weekEndDate = getDateForDay(weekEndDay);
  const weekDateLabel = weekStartDate && weekEndDate
    ? `${format(weekStartDate, "d MMM")} – ${format(weekEndDate, "d MMM")}`
    : null;

  // Program end date
  const programEndDate = getDateForDay(totalDays);

  const handleDayClick = (day: number) => {
    onDaySelect(day);
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
          <div className="text-center">
            <CardTitle className="text-lg">Week {viewWeek}</CardTitle>
            {weekDateLabel && (
              <p className="text-xs text-muted-foreground mt-0.5">{weekDateLabel}</p>
            )}
          </div>
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
            const dayDate = getDateForDay(day);

            return (
              <button
                key={day}
                onClick={() => handleDayClick(day)}
                className={cn(
                  "relative flex flex-col items-center justify-center rounded-lg p-2 min-h-[72px] transition-all border-2 cursor-pointer",
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

                {/* Actual date */}
                {dayDate && (
                  <span className="text-[10px] text-muted-foreground leading-tight">
                    {format(dayDate, "d MMM")}
                  </span>
                )}

                {/* Status icon */}
                <div className="mt-0.5">
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
              <div key={`empty-${i}`} className="min-h-[72px]" />
            ))}
        </div>

        {/* Legend + End Date */}
        <div className="flex items-center justify-between mt-3">
          <div className="flex items-center gap-4 text-xs text-muted-foreground">
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
          {programEndDate && (
            <div className="flex items-center gap-1 text-xs text-muted-foreground">
              <CalendarDays className="h-3 w-3" />
              Program ends: {format(programEndDate, "d MMM yyyy")}
            </div>
          )}
        </div>

        {/* Scroll anchor */}
        <div ref={contentRef} />
      </CardContent>
    </Card>
  );
};

export default PhaseTwoCalendar;
