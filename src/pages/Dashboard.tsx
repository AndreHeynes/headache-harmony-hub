import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import PageLayout from "@/components/layout/PageLayout";
import ProgramTimeline from "@/components/dashboard/ProgramTimeline";
import ProgressCircle from "@/components/dashboard/ProgressCircle";
import TaskList from "@/components/dashboard/TaskList";
import ProgramCalendar from "@/components/dashboard/ProgramCalendar";
import HeadacheTracker from "@/components/dashboard/HeadacheTracker";
import ConnectedApp from "@/components/dashboard/ConnectedApp";
import { useBetaSession } from "@/contexts/BetaSessionContext";
import { Button } from "@/components/ui/button";
import { AlertCircle } from "lucide-react";
import { Skeleton } from "@/components/ui/skeleton";
import { supabase } from "@/integrations/supabase/client";

// Beta admin emails - matches BetaAdminGuard
const BETA_ADMIN_EMAILS = [
  "admin@headache-recovery.com",
];

const Dashboard = () => {
  const [currentProgress, setCurrentProgress] = useState<number | null>(null);
  const [loading, setLoading] = useState(true);
  const { session } = useBetaSession();
  const navigate = useNavigate();

  // Get user info from beta session
  const userName = session.user?.fullName || session.user?.full_name || session.user?.email?.split('@')[0] || 'there';
  const userEmail = session.user?.email?.toLowerCase();
  const userId = session.user?.id;
  const isAdmin = userEmail && BETA_ADMIN_EMAILS.map(e => e.toLowerCase()).includes(userEmail);
  
  // Default to phase 1 during beta
  const [currentPhase, setCurrentPhase] = useState(1);

  useEffect(() => {
    loadProgressData();
  }, [userId]);

  const loadProgressData = async () => {
    if (!userId) {
      setLoading(false);
      setCurrentProgress(0);
      return;
    }

    try {
      // Fetch user progress from database
      const { data: progressData } = await supabase
        .from('user_progress')
        .select('current_phase, phase_one_day, phase_two_day, phase_two_week, phase_three_day')
        .eq('user_id', userId)
        .maybeSingle();

      if (progressData) {
        setCurrentPhase(progressData.current_phase || 1);
        
        // Calculate overall progress based on phase and day progress
        let progress = 0;
        const phase = progressData.current_phase || 1;
        
        if (phase === 1) {
          // Phase 1: Days 1-7 = 0-25%
          progress = Math.min(25, Math.round((progressData.phase_one_day / 7) * 25));
        } else if (phase === 2) {
          // Phase 2: Weeks 1-11, Days 1-7 each = 25-85%
          const totalDays = (progressData.phase_two_week - 1) * 7 + progressData.phase_two_day;
          const maxDays = 77; // 11 weeks
          progress = 25 + Math.round((totalDays / maxDays) * 60);
        } else if (phase === 3) {
          // Phase 3: Days 1-8 = 85-95%
          progress = 85 + Math.round((progressData.phase_three_day / 8) * 10);
        } else if (phase === 4) {
          // Phase 4 = 95-100%
          progress = 95;
        }
        
        setCurrentProgress(progress);
      } else {
        // Count task completions as fallback
        const { count: taskCount } = await supabase
          .from('task_completions')
          .select('id', { count: 'exact', head: true })
          .eq('user_id', userId)
          .eq('completed', true);
        
        // Estimate progress: assume ~100 total tasks across all phases
        const estimatedTotal = 100;
        const completedTasks = taskCount || 0;
        setCurrentProgress(Math.min(100, Math.round((completedTasks / estimatedTotal) * 100)));
      }
    } catch (err) {
      if (import.meta.env.DEV) console.error('Error loading progress:', err);
      setCurrentProgress(0);
    } finally {
      setLoading(false);
    }
  };

  // Welcome banner for new users
  const isNewUser = currentPhase === 1 && (currentProgress ?? 0) < 10;

  if (loading) {
    return (
      <PageLayout>
        <div className="mb-8">
          <Skeleton className="h-10 w-64 mb-2" />
          <Skeleton className="h-5 w-48 mb-4" />
          <Skeleton className="h-32 w-full rounded-lg" />
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <Skeleton className="h-64 rounded-lg" />
          <Skeleton className="h-64 rounded-lg" />
          <Skeleton className="h-64 rounded-lg" />
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Skeleton className="h-48 rounded-lg" />
          <Skeleton className="h-48 rounded-lg" />
        </div>
      </PageLayout>
    );
  }

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
            <ProgressCircle value={currentProgress ?? 0} />
          </div>
          <p className="text-center text-neutral-600 mb-4">
            You're {currentProgress ?? 0}% through your recovery program.
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
          <HeadacheTracker userEmail={userEmail || ""} />
        </div>
        
        <div className="bg-white rounded-lg p-6 shadow-sm border">
          <h2 className="text-xl font-medium mb-4">Connected Apps</h2>
          <div className="space-y-4">
            <ConnectedApp 
              name="My Headache Experience Journal" 
              description="Track headaches, connect Fitbit & Oura for correlation analysis"
              launchUrl={`https://headache-harmony-journal.lovable.app?email=${encodeURIComponent(userEmail || "")}&source=headache-recovery-beta`}
              isPrimary={true}
            />
          </div>
        </div>
      </div>
    </PageLayout>
  );
};

export default Dashboard;
