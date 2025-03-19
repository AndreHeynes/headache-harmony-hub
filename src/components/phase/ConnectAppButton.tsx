
import React, { useState } from "react";
import { ChartLine, Plus, LinkIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";

interface ConnectAppButtonProps {
  title: string;
  onConnect?: (appId: string, isExisting: boolean) => void;
}

const ConnectAppButton = ({ title, onConnect }: ConnectAppButtonProps) => {
  const { toast } = useToast();
  const [connectionType, setConnectionType] = useState<"new" | "existing">("new");
  const [appId, setAppId] = useState("");
  const [open, setOpen] = useState(false);

  const handleConnect = () => {
    if (connectionType === "existing" && !appId.trim()) {
      toast({
        title: "App ID Required",
        description: "Please enter your existing app ID to connect",
        variant: "destructive",
      });
      return;
    }

    toast({
      title: "App Connected Successfully",
      description: connectionType === "existing" 
        ? "Your existing headache tracking data has been linked" 
        : "New headache tracking has been set up",
    });

    if (onConnect) {
      onConnect(appId || "new-app-id-" + Date.now(), connectionType === "existing");
    }
    
    setOpen(false);
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <div className="bg-neutral-800 rounded-lg p-8 flex items-center justify-center h-[200px] cursor-pointer hover:bg-neutral-700 transition-colors">
          <div className="text-center">
            <ChartLine className="h-12 w-12 text-white mb-2 mx-auto" />
            <p className="text-white mb-4">{title}</p>
            <Button variant="outline" className="bg-transparent text-white border-white hover:bg-white hover:text-neutral-800">
              Connect App
            </Button>
          </div>
        </div>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Connect Headache Tracking</DialogTitle>
          <DialogDescription>
            Link your existing tracking data or create a new tracking profile.
          </DialogDescription>
        </DialogHeader>
        
        <div className="py-4">
          <RadioGroup 
            value={connectionType} 
            onValueChange={(value) => setConnectionType(value as "new" | "existing")}
            className="flex flex-col space-y-3"
          >
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="new" id="new" />
              <Label htmlFor="new" className="flex items-center">
                <Plus className="h-4 w-4 mr-2" />
                Create new tracking profile
              </Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="existing" id="existing" />
              <Label htmlFor="existing" className="flex items-center">
                <LinkIcon className="h-4 w-4 mr-2" />
                Connect existing account
              </Label>
            </div>
          </RadioGroup>
          
          {connectionType === "existing" && (
            <div className="mt-4">
              <Label htmlFor="app-id">Enter your Headache Tracking App ID</Label>
              <Input 
                id="app-id" 
                value={appId} 
                onChange={(e) => setAppId(e.target.value)}
                placeholder="e.g., HT-123456"
                className="mt-1"
              />
            </div>
          )}
        </div>
        
        <Button onClick={handleConnect}>
          {connectionType === "existing" ? "Link Account" : "Create New Tracking"}
        </Button>
      </DialogContent>
    </Dialog>
  );
};

export default ConnectAppButton;
