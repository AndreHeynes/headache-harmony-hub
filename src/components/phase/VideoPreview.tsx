import React from "react";
import { Play } from "lucide-react";

interface VideoPreviewProps {
  title: string;
  videoSrc?: string;
}

const VideoPreview = ({ title, videoSrc }: VideoPreviewProps) => {
  if (videoSrc) {
    return (
      <div className="rounded-lg overflow-hidden bg-neutral-900">
        <video
          className="w-full aspect-video"
          controls
          preload="metadata"
          title={title}
        >
          <source src={videoSrc} type="video/mp4" />
          Your browser does not support the video tag.
        </video>
      </div>
    );
  }

  return (
    <div className="bg-neutral-800 rounded-lg p-8 flex items-center justify-center aspect-video">
      <div className="text-center">
        <Play className="h-12 w-12 text-white mb-2" />
        <p className="text-white">{title}</p>
      </div>
    </div>
  );
};

export default VideoPreview;
