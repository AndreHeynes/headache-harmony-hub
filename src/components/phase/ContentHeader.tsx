
import React from "react";
import { ArrowRight } from "lucide-react";

interface ContentHeaderProps {
  title: string;
}

const ContentHeader = ({ title }: ContentHeaderProps) => {
  return (
    <div className="flex justify-between items-center">
      <h2 className="text-xl">{title}</h2>
      <ArrowRight className="h-5 w-5 text-neutral-600" />
    </div>
  );
};

export default ContentHeader;
