import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { UserManagement } from "@/components/admin/UserManagement";
import { AdminAnalytics } from "@/components/admin/AdminAnalytics";
import { Shield } from "lucide-react";

const Admin = () => {
  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8">
        <div className="flex items-center gap-3 mb-8">
          <Shield className="h-8 w-8 text-primary" />
          <h1 className="text-3xl font-bold">Admin Dashboard</h1>
        </div>

        <Tabs defaultValue="users" className="w-full">
          <TabsList className="grid w-full max-w-md grid-cols-2">
            <TabsTrigger value="users">User Management</TabsTrigger>
            <TabsTrigger value="analytics">Analytics</TabsTrigger>
          </TabsList>

          <TabsContent value="users" className="mt-6">
            <UserManagement />
          </TabsContent>

          <TabsContent value="analytics" className="mt-6">
            <AdminAnalytics />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default Admin;
