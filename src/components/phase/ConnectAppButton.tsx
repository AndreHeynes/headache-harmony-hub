
import React from "react";
import { ChartLine } from "lucide-react";

interface ConnectAppButtonProps {
  title: string;
}

const ConnectAppButton = ({ title }: ConnectAppButtonProps) => {
  return (
    <div className="bg-neutral-800 rounded-lg p-8 flex items-center justify-center h-[200px]">
      <div className="text-center">
        <ChartLine className="h-12 w-12 text-white mb-2" />
        <p className="text-white">{title}</p>
      </div>
    </div>
  );
};

export default ConnectAppButton;
