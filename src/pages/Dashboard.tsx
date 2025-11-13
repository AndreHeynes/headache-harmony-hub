
import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import PageLayout from "@/components/layout/PageLayout";
import ProgramTimeline from "@/components/dashboard/ProgramTimeline";
import ProgressCircle from "@/components/dashboard/ProgressCircle";
import TaskList from "@/components/dashboard/TaskList";
import ProgramCalendar from "@/components/dashboard/ProgramCalendar";
import HeadacheTracker from "@/components/dashboard/HeadacheTracker";
import ConnectedApp from "@/components/dashboard/ConnectedApp";
import { useAuth } from "@/hooks/useAuth";
import { useUserStatus } from "@/hooks/useUserStatus";
import { Button } from "@/components/ui/button";
import { AlertCircle } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";

const Dashboard = () => {
  const [currentProgress, setCurrentProgress] = useState(75);
  const [userProfile, setUserProfile] = useState<{ full_name: string | null } | null>(null);
  const [isAdmin, setIsAdmin] = useState(false);
  const { user, loading } = useAuth();
  const userStatus = useUserStatus();
  const navigate = useNavigate();

  // Handle redirects based on user status
  useEffect(() => {
    if (loading || userStatus.loading) return;

    if (!user) {
      navigate("/sign-in", { replace: true });
      return;
    }

    if (!userStatus.hasSubscription) {
      console.log("No subscription found, redirecting to pricing");
      navigate("/pricing", { replace: true });
      return;
    }

    if (!userStatus.hasCompletedOnboarding) {
      console.log("Onboarding not completed, redirecting to onboarding");
      navigate("/onboarding", { replace: true });
      return;
    }

    // If all checks pass and user just completed onboarding, redirect to current phase
    const currentPhase = userStatus.currentPhase;
    console.log("User status loaded. Current phase:", currentPhase, "Has subscription:", userStatus.hasSubscription, "Completed onboarding:", userStatus.hasCompletedOnboarding);
    
    // Only auto-redirect if user has just completed onboarding
    const urlParams = new URLSearchParams(window.location.search);
    if (urlParams.get('from') === 'onboarding') {
      switch (currentPhase) {
        case 1:
          navigate("/phase-one", { replace: true });
          break;
        case 2:
          navigate("/phase-two", { replace: true });
          break;
        case 3:
          navigate("/phase-three", { replace: true });
          break;
        case 4:
          navigate("/phase-four", { replace: true });
          break;
      }
    }
  }, [loading, userStatus.loading, userStatus.hasSubscription, userStatus.hasCompletedOnboarding, userStatus.currentPhase, user, navigate]);

  // Fetch user profile and admin status
  useEffect(() => {
    const fetchUserData = async () => {
      if (!user) return;

      try {
        // Fetch profile
        const { data: profile } = await supabase
          .from("profiles")
          .select("full_name")
          .eq("id", user.id)
          .maybeSingle();

        setUserProfile(profile);

        // Check admin status
        const { data: hasAdminRole } = await supabase
          .rpc('has_role', { _user_id: user.id, _role: 'admin' });

        setIsAdmin(hasAdminRole || false);
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };

    fetchUserData();
  }, [user]);

  if (loading || userStatus.loading) {
    return (
      <PageLayout>
        <div className="flex items-center justify-center min-h-[400px]">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
            <p className="text-muted-foreground">Loading your dashboard...</p>
          </div>
        </div>
      </PageLayout>
    );
  }

  if (!user) {
    return null;
  }

  const userName = userProfile?.full_name || user.user_metadata?.full_name || user.email?.split('@')[0] || 'there';
  const currentPhase = userStatus.currentPhase;

  // Welcome banner for new users
  const isNewUser = currentPhase === 1 && currentProgress < 10;

  return (
    <PageLayout>
      {isNewUser && (
        <div className="mb-6 bg-primary/10 border border-primary/20 rounded-lg p-6">
          <div className="flex items-start gap-3">
            <AlertCircle className="w-6 h-6 text-primary mt-0.5" />
            <div className="flex-1">
              <h3 className="font-semibold text-lg mb-2">Welcome to Your Program!</h3>
              <p className="text-muted-foreground mb-4">
                You're all set! Your headache management journey begins with Phase 1. Click below to start Day 1.
              </p>
              <Button onClick={() => navigate("/phase-one")}>
                Start Phase 1 - Day 1
              </Button>
            </div>
          </div>
        </div>
      )}

      <div className="mb-8">
        <div className="flex items-center justify-between mb-2">
          <h1 className="text-3xl font-semibold">Welcome back, {userName}! 👋</h1>
          {isAdmin && (
            <Link to="/admin">
              <Button variant="outline" size="sm">
                Admin Dashboard
              </Button>
            </Link>
          )}
        </div>
        <p className="text-muted-foreground mb-4">Here's your recovery progress</p>
        <div className="bg-white rounded-lg p-6 shadow-sm border">
          <ProgramTimeline />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div className="bg-white rounded-lg p-6 shadow-sm border">
          <h2 className="text-xl font-medium mb-4">Your Progress</h2>
          <div className="flex items-center justify-center mb-4">
            <ProgressCircle value={currentProgress} />
          </div>
          <p className="text-center text-neutral-600 mb-4">
            You're {currentProgress}% through your recovery program.
          </p>
          
          <div className="space-y-2">
            {currentPhase === 1 && (
              <Link 
                to="/phase-one" 
                className="block w-full bg-blue-500 text-white text-center py-2 px-4 rounded hover:bg-blue-600 transition-colors"
              >
                Continue to Phase 1
              </Link>
            )}
            
            {currentPhase === 2 && (
              <Link 
                to="/phase-two" 
                className="block w-full bg-blue-500 text-white text-center py-2 px-4 rounded hover:bg-blue-600 transition-colors"
              >
                Continue to Phase 2
              </Link>
            )}
            
            {currentPhase === 3 && (
              <Link 
                to="/phase-three" 
                className="block w-full bg-blue-500 text-white text-center py-2 px-4 rounded hover:bg-blue-600 transition-colors"
              >
                Continue to Phase 3
              </Link>
            )}
            
            {currentPhase === 4 && (
              <Link 
                to="/phase-four" 
                className="block w-full bg-blue-500 text-white text-center py-2 px-4 rounded hover:bg-blue-600 transition-colors"
              >
                Continue to Phase 4
              </Link>
            )}
          </div>
        </div>
        
        <div className="bg-white rounded-lg p-6 shadow-sm border">
          <h2 className="text-xl font-medium mb-4">Today's Tasks</h2>
          <TaskList />
        </div>
        
        <div className="bg-white rounded-lg p-6 shadow-sm border">
          <h2 className="text-xl font-medium mb-4">Upcoming Schedule</h2>
          <ProgramCalendar />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-white rounded-lg p-6 shadow-sm border">
          <h2 className="text-xl font-medium mb-4">Headache Tracking</h2>
          <HeadacheTracker />
        </div>
        
        <div className="bg-white rounded-lg p-6 shadow-sm border">
          <h2 className="text-xl font-medium mb-4">Connected Apps</h2>
          <div className="space-y-4">
            <ConnectedApp 
              name="Strava" 
              status="connected" 
              lastSync="2 hours ago" 
            />
            <ConnectedApp 
              name="Fitbit" 
              status="connected" 
              lastSync="1 day ago" 
            />
            <ConnectedApp 
              name="Apple Health" 
              status="not-connected" 
            />
            <ConnectedApp 
              name="Sleep Cycle" 
              status="not-connected" 
            />
          </div>
          <div className="mt-4">
            <Link 
              to="/profile#connected-apps" 
              className="text-blue-500 hover:underline text-sm"
            >
              Manage connected apps
            </Link>
          </div>
        </div>
      </div>
    </PageLayout>
  );
};

export default Dashboard;
