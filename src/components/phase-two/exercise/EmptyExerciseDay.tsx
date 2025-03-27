
import React from "react";

const EmptyExerciseDay: React.FC = () => {
  return (
    <div className="bg-neutral-50 p-4 rounded border text-center">
      <p className="text-neutral-600">
        Today is a rest or review day. No specific exercises are scheduled.
      </p>
    </div>
  );
};

export default EmptyExerciseDay;
