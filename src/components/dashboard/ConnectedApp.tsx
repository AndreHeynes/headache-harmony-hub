import React from "react";
import { BookOpen, ExternalLink } from "lucide-react";
import { Button } from "@/components/ui/button";

interface ConnectedAppProps {
  name: string;
  description?: string;
  launchUrl?: string;
  isPrimary?: boolean;
}

const ConnectedApp: React.FC<ConnectedAppProps> = ({ 
  name, 
  description,
  launchUrl,
  isPrimary = false
}) => {
  return (
    <div className={`p-4 border rounded-lg ${isPrimary ? 'border-primary bg-primary/5' : ''}`}>
      <div className="flex items-start justify-between gap-4">
        <div className="flex items-start gap-3">
          <div className={`p-2 rounded-lg ${isPrimary ? 'bg-primary/10' : 'bg-muted'}`}>
            <BookOpen className={`h-5 w-5 ${isPrimary ? 'text-primary' : 'text-muted-foreground'}`} />
          </div>
          <div className="flex-1">
            <h3 className="font-medium">{name}</h3>
            {description && (
              <p className="text-sm text-muted-foreground mt-1">{description}</p>
            )}
          </div>
        </div>
        {launchUrl && (
          <Button size="sm" asChild>
            <a href={launchUrl} target="_blank" rel="noopener noreferrer">
              Launch
              <ExternalLink className="ml-2 h-3 w-3" />
            </a>
          </Button>
        )}
      </div>
    </div>
  );
};

export default ConnectedApp;
