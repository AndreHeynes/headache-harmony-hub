
import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import ConnectAppButton from "./ConnectAppButton";

const ExternalTracking = () => {
  return (
    <Card>
      <CardHeader className="pb-2">
        <CardTitle className="text-xl">External Headache Tracking</CardTitle>
      </CardHeader>
      <CardContent>
        <ConnectAppButton title="Connect Your External Tracking App" />
      </CardContent>
    </Card>
  );
};

export default ExternalTracking;
