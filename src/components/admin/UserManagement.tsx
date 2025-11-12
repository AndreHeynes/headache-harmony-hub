import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Shield, ShieldCheck, User } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { RoleAssignmentDialog } from "./RoleAssignmentDialog";

interface UserData {
  id: string;
  email: string;
  full_name: string;
  created_at: string;
  roles: string[];
  subscription_status?: string;
  current_phase?: number;
  has_completed_onboarding?: boolean;
}

export const UserManagement = () => {
  const [users, setUsers] = useState<UserData[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedUser, setSelectedUser] = useState<UserData | null>(null);
  const { toast } = useToast();

  const fetchUsers = async () => {
    try {
      setLoading(true);

      // Fetch profiles with auth users
      const { data: profiles, error: profilesError } = await supabase
        .from('profiles')
        .select('*')
        .order('created_at', { ascending: false });

      if (profilesError) throw profilesError;

      // Fetch all user roles
      const { data: userRoles, error: rolesError } = await supabase
        .from('user_roles')
        .select('*');

      if (rolesError) throw rolesError;

      // Fetch subscriptions
      const { data: subscriptions, error: subsError } = await supabase
        .from('user_subscriptions')
        .select('*')
        .order('created_at', { ascending: false });

      if (subsError) throw subsError;

      // Fetch user progress
      const { data: progress, error: progressError } = await supabase
        .from('user_progress')
        .select('*');

      if (progressError) throw progressError;

      // Combine all data (using user.id from profiles since we can't access auth.users directly)
      const combinedUsers: UserData[] = profiles.map(profile => {
        const userRolesList = userRoles?.filter(r => r.user_id === profile.id).map(r => r.role) || [];
        const latestSub = subscriptions?.find(s => s.user_id === profile.id);
        const userProgress = progress?.find(p => p.user_id === profile.id);

        return {
          id: profile.id,
          email: 'User Email', // Email not accessible from client
          full_name: profile.full_name || 'No name',
          created_at: profile.created_at,
          roles: userRolesList,
          subscription_status: latestSub?.status,
          current_phase: userProgress?.current_phase,
          has_completed_onboarding: userProgress?.has_completed_onboarding,
        };
      });

      setUsers(combinedUsers);
    } catch (error) {
      console.error('Error fetching users:', error);
      toast({
        title: "Error",
        description: "Failed to load users",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const getRoleBadge = (role: string) => {
    const variants: Record<string, "default" | "secondary" | "destructive"> = {
      admin: "destructive",
      moderator: "default",
      user: "secondary",
    };
    return <Badge variant={variants[role] || "secondary"}>{role}</Badge>;
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center py-12">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
      </div>
    );
  }

  return (
    <>
      <Card>
        <CardHeader>
          <CardTitle>All Users ({users.length})</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Name</TableHead>
                <TableHead>Email</TableHead>
                <TableHead>Roles</TableHead>
                <TableHead>Subscription</TableHead>
                <TableHead>Phase</TableHead>
                <TableHead>Onboarded</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {users.map((user) => (
                <TableRow key={user.id}>
                  <TableCell>{user.full_name}</TableCell>
                  <TableCell>{user.email}</TableCell>
                  <TableCell>
                    <div className="flex gap-1 flex-wrap">
                      {user.roles.length > 0 ? (
                        user.roles.map(role => (
                          <span key={role}>{getRoleBadge(role)}</span>
                        ))
                      ) : (
                        <Badge variant="outline">No roles</Badge>
                      )}
                    </div>
                  </TableCell>
                  <TableCell>
                    {user.subscription_status ? (
                      <Badge variant={user.subscription_status === 'active' ? 'default' : 'secondary'}>
                        {user.subscription_status}
                      </Badge>
                    ) : (
                      <span className="text-muted-foreground">None</span>
                    )}
                  </TableCell>
                  <TableCell>
                    {user.current_phase ? `Phase ${user.current_phase}` : '-'}
                  </TableCell>
                  <TableCell>
                    {user.has_completed_onboarding ? (
                      <ShieldCheck className="h-4 w-4 text-green-600" />
                    ) : (
                      <span className="text-muted-foreground">No</span>
                    )}
                  </TableCell>
                  <TableCell>
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => setSelectedUser(user)}
                    >
                      <Shield className="h-4 w-4 mr-2" />
                      Manage Roles
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      {selectedUser && (
        <RoleAssignmentDialog
          user={selectedUser}
          open={!!selectedUser}
          onOpenChange={(open) => !open && setSelectedUser(null)}
          onRoleUpdated={fetchUsers}
        />
      )}
    </>
  );
};
