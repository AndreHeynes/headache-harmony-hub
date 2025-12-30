import React from "react";
import PageLayout from "@/components/layout/PageLayout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { PrivacyModule } from "@/components/compliance/PrivacyModule";
import { SecurityDashboard } from "@/components/compliance/SecurityDashboard";
import { useBetaSession } from "@/contexts/BetaSessionContext";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

const Profile = () => {
  const { session } = useBetaSession();
  const userName = session.user?.fullName || session.user?.full_name || '';
  const userEmail = session.user?.email || '';

  return (
    <PageLayout>
      <div className="container mx-auto px-4 py-8 pt-28">
        <h1 className="text-2xl font-bold mb-6">Your Profile</h1>
        
        <Tabs defaultValue="profile" className="space-y-4">
          <TabsList className="grid grid-cols-4 w-full max-w-lg">
            <TabsTrigger value="profile">Profile</TabsTrigger>
            <TabsTrigger value="settings">Settings</TabsTrigger>
            <TabsTrigger value="privacy">Privacy</TabsTrigger>
            <TabsTrigger value="security">Security</TabsTrigger>
          </TabsList>
          
          <TabsContent value="profile">
            <Card>
              <CardHeader>
                <CardTitle>Profile Information</CardTitle>
                <CardDescription>
                  Your beta tester profile (read-only during beta)
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <label className="text-sm font-medium" htmlFor="name">Name</label>
                  <Input
                    id="name"
                    type="text"
                    value={userName}
                    disabled
                    className="bg-muted"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium" htmlFor="email">Email</label>
                  <Input
                    id="email"
                    type="email"
                    value={userEmail}
                    disabled
                    className="bg-muted"
                  />
                </div>
                <p className="text-sm text-muted-foreground">
                  Profile editing will be available after the beta period.
                </p>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="settings">
            <Card>
              <CardHeader>
                <CardTitle>Account Settings</CardTitle>
                <CardDescription>
                  Manage your account settings and preferences
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <label className="text-sm font-medium">Notification Preferences</label>
                  <div className="space-y-2">
                    <label className="flex items-center">
                      <input type="checkbox" className="mr-2" />
                      Email notifications
                    </label>
                    <label className="flex items-center">
                      <input type="checkbox" className="mr-2" />
                      Push notifications
                    </label>
                  </div>
                </div>
                <button className="px-4 py-2 bg-blue-600 text-white rounded">
                  Save Preferences
                </button>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="privacy">
            <PrivacyModule />
          </TabsContent>
          
          <TabsContent value="security">
            <SecurityDashboard />
          </TabsContent>
        </Tabs>
      </div>
    </PageLayout>
  );
};

export default Profile;
