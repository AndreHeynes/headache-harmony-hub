import { useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { useToast } from "@/hooks/use-toast";

interface UserData {
  id: string;
  email: string;
  full_name: string;
  roles: string[];
}

interface RoleAssignmentDialogProps {
  user: UserData;
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onRoleUpdated: () => void;
}

const availableRoles = ['admin', 'moderator', 'user'];

export const RoleAssignmentDialog = ({ user, open, onOpenChange, onRoleUpdated }: RoleAssignmentDialogProps) => {
  const [selectedRoles, setSelectedRoles] = useState<string[]>(user.roles);
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();

  const handleRoleToggle = (role: string) => {
    setSelectedRoles(prev =>
      prev.includes(role)
        ? prev.filter(r => r !== role)
        : [...prev, role]
    );
  };

  const handleSave = async () => {
    try {
      setLoading(true);

      // Remove all existing roles
      const { error: deleteError } = await supabase
        .from('user_roles')
        .delete()
        .eq('user_id', user.id);

      if (deleteError) throw deleteError;

      // Add selected roles
      if (selectedRoles.length > 0) {
        const { error: insertError } = await supabase
          .from('user_roles')
          .insert(
            selectedRoles.map(role => ({
              user_id: user.id,
              role: role as 'admin' | 'moderator' | 'user',
            }))
          );

        if (insertError) throw insertError;
      }

      toast({
        title: "Success",
        description: "User roles updated successfully",
      });

      onRoleUpdated();
      onOpenChange(false);
    } catch (error) {
      console.error('Error updating roles:', error);
      toast({
        title: "Error",
        description: "Failed to update user roles",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Manage Roles for {user.full_name}</DialogTitle>
          <p className="text-sm text-muted-foreground">{user.email}</p>
        </DialogHeader>

        <div className="space-y-4 py-4">
          {availableRoles.map(role => (
            <div key={role} className="flex items-center space-x-2">
              <Checkbox
                id={role}
                checked={selectedRoles.includes(role)}
                onCheckedChange={() => handleRoleToggle(role)}
              />
              <label
                htmlFor={role}
                className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 capitalize"
              >
                {role}
              </label>
            </div>
          ))}
        </div>

        <DialogFooter>
          <Button variant="outline" onClick={() => onOpenChange(false)} disabled={loading}>
            Cancel
          </Button>
          <Button onClick={handleSave} disabled={loading}>
            {loading ? "Saving..." : "Save Changes"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
