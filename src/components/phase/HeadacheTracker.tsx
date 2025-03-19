
import React, { useState } from "react";
import { Plus, AlertCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Slider } from "@/components/ui/slider";
import { useToast } from "@/hooks/use-toast";
import { format } from "date-fns";

interface HeadacheTrackerProps {
  isConnected: boolean;
}

interface HeadacheLog {
  id: string;
  date: Date;
  severity: number;
  duration: string;
  triggers: string[];
}

const HeadacheTracker: React.FC<HeadacheTrackerProps> = ({ isConnected }) => {
  const { toast } = useToast();
  const [open, setOpen] = useState(false);
  const [severity, setSeverity] = useState(5);
  const [duration, setDuration] = useState("1-2h");
  const [logs, setLogs] = useState<HeadacheLog[]>([]);

  const handleLogHeadache = () => {
    if (!isConnected) {
      toast({
        title: "App Not Connected",
        description: "Please connect your headache tracking app first",
        variant: "destructive",
      });
      return;
    }

    const newLog: HeadacheLog = {
      id: `log-${Date.now()}`,
      date: new Date(),
      severity,
      duration,
      triggers: ["Stress", "Lack of sleep"] // In a real app, this would be user-selected
    };

    setLogs([newLog, ...logs]);
    setOpen(false);
    
    toast({
      title: "Headache Logged",
      description: "Your headache event has been recorded successfully",
    });

    // Reset form
    setSeverity(5);
    setDuration("1-2h");
  };

  return (
    <Card>
      <CardHeader className="pb-2">
        <CardTitle className="text-xl flex items-center">
          <AlertCircle className="h-5 w-5 mr-2 text-red-500" />
          Headache Logger
        </CardTitle>
      </CardHeader>
      <CardContent>
        <Dialog open={open} onOpenChange={setOpen}>
          <DialogTrigger asChild>
            <Button className="w-full mb-4" disabled={!isConnected}>
              <Plus className="h-4 w-4 mr-2" />
              Log Headache Event
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Log Headache Event</DialogTitle>
              <DialogDescription>
                Record your headache details to track patterns over time
              </DialogDescription>
            </DialogHeader>
            
            <div className="py-4 space-y-4">
              <div>
                <Label htmlFor="severity" className="block mb-2">
                  Severity (1-10): {severity}
                </Label>
                <Slider
                  id="severity"
                  min={1}
                  max={10}
                  step={1}
                  value={[severity]}
                  onValueChange={([value]) => setSeverity(value)}
                />
              </div>
              
              <div>
                <Label htmlFor="duration" className="block mb-2">
                  Duration
                </Label>
                <Select value={duration} onValueChange={setDuration}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select duration" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="<1h">Less than 1 hour</SelectItem>
                    <SelectItem value="1-2h">1-2 hours</SelectItem>
                    <SelectItem value="2-4h">2-4 hours</SelectItem>
                    <SelectItem value="4-12h">4-12 hours</SelectItem>
                    <SelectItem value=">12h">More than 12 hours</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
            
            <Button onClick={handleLogHeadache}>
              Save Headache Log
            </Button>
          </DialogContent>
        </Dialog>

        {!isConnected ? (
          <div className="text-center p-4 border border-dashed rounded">
            <p className="text-neutral-500">Connect your headache tracking app to log events</p>
          </div>
        ) : logs.length === 0 ? (
          <div className="text-center p-4 border border-dashed rounded">
            <p className="text-neutral-500">No headache events logged yet</p>
          </div>
        ) : (
          <div className="space-y-3 max-h-[300px] overflow-y-auto pr-1">
            {logs.map(log => (
              <div key={log.id} className="p-3 border rounded flex justify-between">
                <div>
                  <p className="font-medium">{format(log.date, "MMM d, yyyy 'at' h:mm a")}</p>
                  <p className="text-sm text-neutral-500">Duration: {log.duration}</p>
                </div>
                <div className="flex items-center">
                  <span className={`text-lg font-bold ${
                    log.severity > 7 ? 'text-red-500' : 
                    log.severity > 4 ? 'text-amber-500' : 'text-green-500'
                  }`}>
                    {log.severity}/10
                  </span>
                </div>
              </div>
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default HeadacheTracker;
