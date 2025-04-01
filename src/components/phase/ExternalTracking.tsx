
import React, { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsList, TabsContent, TabsTrigger } from "@/components/ui/tabs";
import ConnectAppButton from "./ConnectAppButton";
import HeadacheTracker from "./HeadacheTracker";
import HeadacheAnalysis from "./HeadacheAnalysis";
import { AlertCircle } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { secureRetrieve, secureStore } from "@/utils/security/encryption";

interface ExternalTrackingProps {
  phase?: number;
}

const ExternalTracking: React.FC<ExternalTrackingProps> = ({ phase = 1 }) => {
  const { toast } = useToast();
  const [isConnected, setIsConnected] = useState(false);
  const [appId, setAppId] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState("log");
  
  // Load connection status using secure retrieval
  useEffect(() => {
    const savedAppId = secureRetrieve("headache-app-id");
    if (savedAppId) {
      setAppId(savedAppId);
      setIsConnected(true);
    }
  }, []);

  const handleConnect = (newAppId: string, isExisting: boolean) => {
    setAppId(newAppId);
    setIsConnected(true);
    
    if (!isExisting) {
      setTimeout(() => {
        toast({
          title: "Headache Notification Set",
          description: "You will be notified to log headaches when they occur",
        });
      }, 1000);
    }
  };

  // If not connected, show the connect button
  if (!isConnected) {
    return (
      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="text-xl">External Headache Tracking</CardTitle>
        </CardHeader>
        <CardContent>
          <ConnectAppButton 
            title="Connect Your External Tracking App" 
            onConnect={handleConnect}
          />
        </CardContent>
      </Card>
    );
  }

  // If in Phase 3, show only analysis
  if (phase === 3) {
    return <HeadacheAnalysis isConnected={true} showInPhaseThree={true} />;
  }

  // For Phase 1 and 2, show tabs for logging and analysis
  return (
    <Card>
      <CardHeader className="pb-2">
        <CardTitle className="text-xl flex items-center">
          <AlertCircle className="h-5 w-5 mr-2 text-red-500" />
          Headache Tracking
        </CardTitle>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue={activeTab} onValueChange={setActiveTab} className="space-y-4">
          <TabsList className="grid grid-cols-2">
            <TabsTrigger value="log">Log Headache</TabsTrigger>
            <TabsTrigger value="analysis">Analysis</TabsTrigger>
          </TabsList>
          
          <TabsContent value="log">
            <HeadacheTracker isConnected={isConnected} />
          </TabsContent>
          
          <TabsContent value="analysis">
            <HeadacheAnalysis isConnected={isConnected} />
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
};

export default ExternalTracking;
