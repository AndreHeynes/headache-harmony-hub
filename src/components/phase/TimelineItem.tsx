
import React from "react";

interface TimelineItemProps {
  phase: string;
  status: "Current" | "Completed" | "Not Started";
  isCurrent?: boolean;
}

const TimelineItem = ({ phase, status, isCurrent = false }: TimelineItemProps) => {
  const getStatusClass = () => {
    switch (status) {
      case "Completed":
        return "px-2 py-1 bg-neutral-800 text-white text-sm rounded";
      case "Current":
        return "px-2 py-1 bg-neutral-600 text-white text-sm rounded";
      default:
        return "px-2 py-1 bg-neutral-200 text-neutral-700 text-sm rounded";
    }
  };

  return (
    <div className="flex justify-between items-center">
      <span className={isCurrent ? "text-neutral-800" : "text-neutral-500"}>{phase}</span>
      <span className={getStatusClass()}>{status}</span>
    </div>
  );
};

export default TimelineItem;
