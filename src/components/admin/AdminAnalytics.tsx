import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Users, DollarSign, TrendingUp, UserCheck } from "lucide-react";

export const AdminAnalytics = () => {
  const [stats, setStats] = useState({
    totalUsers: 0,
    activeSubscriptions: 0,
    completedOnboarding: 0,
    totalRevenue: 0,
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        // Total users
        const { count: userCount } = await supabase
          .from('profiles')
          .select('*', { count: 'exact', head: true });

        // Active subscriptions
        const { count: subCount } = await supabase
          .from('user_subscriptions')
          .select('*', { count: 'exact', head: true })
          .eq('status', 'active');

        // Completed onboarding
        const { count: onboardedCount } = await supabase
          .from('user_progress')
          .select('*', { count: 'exact', head: true })
          .eq('has_completed_onboarding', true);

        // Total revenue
        const { data: subscriptions } = await supabase
          .from('user_subscriptions')
          .select('amount_paid');

        const totalRevenue = subscriptions?.reduce((sum, sub) => sum + Number(sub.amount_paid || 0), 0) || 0;

        setStats({
          totalUsers: userCount || 0,
          activeSubscriptions: subCount || 0,
          completedOnboarding: onboardedCount || 0,
          totalRevenue,
        });
      } catch (error) {
        console.error('Error fetching stats:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchStats();
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center py-12">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
      </div>
    );
  }

  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Total Users</CardTitle>
          <Users className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{stats.totalUsers}</div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Active Subscriptions</CardTitle>
          <TrendingUp className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{stats.activeSubscriptions}</div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Completed Onboarding</CardTitle>
          <UserCheck className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{stats.completedOnboarding}</div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Total Revenue</CardTitle>
          <DollarSign className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">${stats.totalRevenue.toFixed(2)}</div>
        </CardContent>
      </Card>
    </div>
  );
};
