import React, { useState } from "react";
import PageLayout from "@/components/layout/PageLayout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { PrivacyModule } from "@/components/compliance/PrivacyModule";
import { SecurityDashboard } from "@/components/compliance/SecurityDashboard";
import { useBetaSession } from "@/contexts/BetaSessionContext";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { toast } from "sonner";

const Profile = () => {
  const { session } = useBetaSession();
  const userName = session.user?.fullName || session.user?.full_name || '';
  const userEmail = session.user?.email || '';

  // Notification preferences state
  const [emailNotifications, setEmailNotifications] = useState(() => {
    const saved = localStorage.getItem('pref_email_notifications');
    return saved ? JSON.parse(saved) : true;
  });
  const [pushNotifications, setPushNotifications] = useState(() => {
    const saved = localStorage.getItem('pref_push_notifications');
    return saved ? JSON.parse(saved) : false;
  });
  const [saving, setSaving] = useState(false);

  const handleSavePreferences = async () => {
    setSaving(true);
    try {
      // Save to localStorage for beta
      localStorage.setItem('pref_email_notifications', JSON.stringify(emailNotifications));
      localStorage.setItem('pref_push_notifications', JSON.stringify(pushNotifications));
      toast.success('Preferences saved successfully');
    } catch (err) {
      toast.error('Failed to save preferences');
    } finally {
      setSaving(false);
    }
  };

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
                <div className="space-y-4">
                  <label className="text-sm font-medium">Notification Preferences</label>
                  <div className="space-y-3">
                    <div className="flex items-center space-x-2">
                      <Checkbox 
                        id="email-notifications"
                        checked={emailNotifications}
                        onCheckedChange={(checked) => setEmailNotifications(!!checked)}
                      />
                      <label 
                        htmlFor="email-notifications" 
                        className="text-sm cursor-pointer"
                      >
                        Email notifications
                      </label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Checkbox 
                        id="push-notifications"
                        checked={pushNotifications}
                        onCheckedChange={(checked) => setPushNotifications(!!checked)}
                      />
                      <label 
                        htmlFor="push-notifications" 
                        className="text-sm cursor-pointer"
                      >
                        Push notifications
                      </label>
                    </div>
                  </div>
                </div>
                <Button 
                  onClick={handleSavePreferences}
                  disabled={saving}
                >
                  {saving ? 'Saving...' : 'Save Preferences'}
                </Button>
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
