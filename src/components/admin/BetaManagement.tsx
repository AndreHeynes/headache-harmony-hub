import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Loader2, Search, CheckCircle, XCircle, Clock, Users } from "lucide-react";
import { format } from "date-fns";

interface BetaSignup {
  id: string;
  email: string;
  name: string;
  has_diagnosis_confirmation: boolean;
  current_approach: string | null;
  goals_expectations: string | null;
  status: string;
  admin_notes: string | null;
  created_at: string;
  approved_at: string | null;
}

export const BetaManagement = () => {
  const [signups, setSignups] = useState<BetaSignup[]>([]);
  const [loading, setLoading] = useState(true);
  const [statusFilter, setStatusFilter] = useState<string>("all");
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedSignup, setSelectedSignup] = useState<BetaSignup | null>(null);
  const [actionLoading, setActionLoading] = useState(false);
  const [adminNotes, setAdminNotes] = useState("");
  const { toast } = useToast();

  const fetchSignups = async () => {
    setLoading(true);
    try {
      let query = supabase
        .from("beta_signups")
        .select("*")
        .order("created_at", { ascending: false });

      if (statusFilter !== "all") {
        query = query.eq("status", statusFilter);
      }

      const { data, error } = await query;

      if (error) throw error;
      setSignups(data || []);
    } catch (error) {
      console.error("Error fetching beta signups:", error);
      toast({
        title: "Error",
        description: "Failed to load beta signups",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchSignups();
  }, [statusFilter]);

  const handleStatusUpdate = async (id: string, newStatus: "approved" | "rejected") => {
    setActionLoading(true);
    try {
      const updateData: Record<string, unknown> = {
        status: newStatus,
        admin_notes: adminNotes || null,
      };

      if (newStatus === "approved") {
        updateData.approved_at = new Date().toISOString();
      }

      const { error } = await supabase
        .from("beta_signups")
        .update(updateData)
        .eq("id", id);

      if (error) throw error;

      toast({
        title: newStatus === "approved" ? "Approved!" : "Rejected",
        description: `Beta signup has been ${newStatus}`,
      });

      setSelectedSignup(null);
      setAdminNotes("");
      fetchSignups();
    } catch (error) {
      console.error("Error updating status:", error);
      toast({
        title: "Error",
        description: "Failed to update status",
        variant: "destructive",
      });
    } finally {
      setActionLoading(false);
    }
  };

  const filteredSignups = signups.filter(
    (signup) =>
      signup.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      signup.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const stats = {
    total: signups.length,
    pending: signups.filter((s) => s.status === "pending").length,
    approved: signups.filter((s) => s.status === "approved").length,
    rejected: signups.filter((s) => s.status === "rejected").length,
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "pending":
        return <Badge variant="outline" className="bg-yellow-50 text-yellow-700 border-yellow-200"><Clock className="h-3 w-3 mr-1" />Pending</Badge>;
      case "approved":
        return <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200"><CheckCircle className="h-3 w-3 mr-1" />Approved</Badge>;
      case "rejected":
        return <Badge variant="outline" className="bg-red-50 text-red-700 border-red-200"><XCircle className="h-3 w-3 mr-1" />Rejected</Badge>;
      default:
        return <Badge variant="outline">{status}</Badge>;
    }
  };

  return (
    <div className="space-y-6">
      {/* Stats Cards */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Total Signups</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center gap-2">
              <Users className="h-5 w-5 text-primary" />
              <span className="text-2xl font-bold">{stats.total}</span>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Pending</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center gap-2">
              <Clock className="h-5 w-5 text-yellow-500" />
              <span className="text-2xl font-bold">{stats.pending}</span>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Approved</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center gap-2">
              <CheckCircle className="h-5 w-5 text-green-500" />
              <span className="text-2xl font-bold">{stats.approved}</span>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Rejected</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center gap-2">
              <XCircle className="h-5 w-5 text-red-500" />
              <span className="text-2xl font-bold">{stats.rejected}</span>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Filters */}
      <div className="flex flex-col sm:flex-row gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search by name or email..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-9"
          />
        </div>
        <Select value={statusFilter} onValueChange={setStatusFilter}>
          <SelectTrigger className="w-full sm:w-[180px]">
            <SelectValue placeholder="Filter by status" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Statuses</SelectItem>
            <SelectItem value="pending">Pending</SelectItem>
            <SelectItem value="approved">Approved</SelectItem>
            <SelectItem value="rejected">Rejected</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* Table */}
      <Card>
        <CardContent className="p-0">
          {loading ? (
            <div className="flex items-center justify-center py-12">
              <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
            </div>
          ) : filteredSignups.length === 0 ? (
            <div className="text-center py-12 text-muted-foreground">
              No beta signups found
            </div>
          ) : (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Name</TableHead>
                  <TableHead>Email</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Diagnosis</TableHead>
                  <TableHead>Date</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredSignups.map((signup) => (
                  <TableRow key={signup.id}>
                    <TableCell className="font-medium">{signup.name}</TableCell>
                    <TableCell>{signup.email}</TableCell>
                    <TableCell>{getStatusBadge(signup.status)}</TableCell>
                    <TableCell>
                      {signup.has_diagnosis_confirmation ? (
                        <CheckCircle className="h-4 w-4 text-green-500" />
                      ) : (
                        <XCircle className="h-4 w-4 text-red-500" />
                      )}
                    </TableCell>
                    <TableCell>{format(new Date(signup.created_at), "MMM d, yyyy")}</TableCell>
                    <TableCell className="text-right">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => {
                          setSelectedSignup(signup);
                          setAdminNotes(signup.admin_notes || "");
                        }}
                      >
                        View
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          )}
        </CardContent>
      </Card>

      {/* Detail Dialog */}
      <Dialog open={!!selectedSignup} onOpenChange={() => setSelectedSignup(null)}>
        <DialogContent className="sm:max-w-lg">
          <DialogHeader>
            <DialogTitle>Beta Signup Details</DialogTitle>
            <DialogDescription>
              Review and manage this beta application
            </DialogDescription>
          </DialogHeader>

          {selectedSignup && (
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-sm text-muted-foreground">Name</p>
                  <p className="font-medium">{selectedSignup.name}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Email</p>
                  <p className="font-medium">{selectedSignup.email}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Status</p>
                  {getStatusBadge(selectedSignup.status)}
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Submitted</p>
                  <p className="font-medium">
                    {format(new Date(selectedSignup.created_at), "MMM d, yyyy 'at' h:mm a")}
                  </p>
                </div>
              </div>

              <div>
                <p className="text-sm text-muted-foreground mb-1">Diagnosis Confirmed</p>
                <p className="font-medium">
                  {selectedSignup.has_diagnosis_confirmation ? "Yes" : "No"}
                </p>
              </div>

              {selectedSignup.current_approach && (
                <div>
                  <p className="text-sm text-muted-foreground mb-1">Current Approach</p>
                  <p className="text-sm bg-muted p-3 rounded-md">{selectedSignup.current_approach}</p>
                </div>
              )}

              {selectedSignup.goals_expectations && (
                <div>
                  <p className="text-sm text-muted-foreground mb-1">Goals & Expectations</p>
                  <p className="text-sm bg-muted p-3 rounded-md">{selectedSignup.goals_expectations}</p>
                </div>
              )}

              <div>
                <p className="text-sm text-muted-foreground mb-1">Admin Notes</p>
                <Textarea
                  value={adminNotes}
                  onChange={(e) => setAdminNotes(e.target.value)}
                  placeholder="Add notes about this application..."
                  className="resize-none"
                />
              </div>
            </div>
          )}

          <DialogFooter className="gap-2">
            {selectedSignup?.status === "pending" && (
              <>
                <Button
                  variant="outline"
                  onClick={() => handleStatusUpdate(selectedSignup.id, "rejected")}
                  disabled={actionLoading}
                >
                  {actionLoading ? <Loader2 className="h-4 w-4 animate-spin" /> : "Reject"}
                </Button>
                <Button
                  onClick={() => handleStatusUpdate(selectedSignup.id, "approved")}
                  disabled={actionLoading}
                >
                  {actionLoading ? <Loader2 className="h-4 w-4 animate-spin" /> : "Approve"}
                </Button>
              </>
            )}
            {selectedSignup?.status !== "pending" && (
              <Button variant="outline" onClick={() => setSelectedSignup(null)}>
                Close
              </Button>
            )}
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};
