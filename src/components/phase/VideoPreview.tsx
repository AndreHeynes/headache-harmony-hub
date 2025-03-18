
import React from "react";
import { Play } from "lucide-react";

interface VideoPreviewProps {
  title: string;
}

const VideoPreview = ({ title }: VideoPreviewProps) => {
  return (
    <div className="bg-neutral-800 rounded-lg p-8 flex items-center justify-center">
      <div className="text-center">
        <Play className="h-12 w-12 text-white mb-2" />
        <p className="text-white">{title}</p>
      </div>
    </div>
  );
};

export default VideoPreview;
