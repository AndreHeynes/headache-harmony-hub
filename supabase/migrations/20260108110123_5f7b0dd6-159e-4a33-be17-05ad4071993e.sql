-- Add migration tracking column to user_progress
ALTER TABLE public.user_progress 
ADD COLUMN IF NOT EXISTS data_migrated_to_db BOOLEAN NOT NULL DEFAULT false;

-- Table 1: user_responses (Questionnaire Data)
CREATE TABLE public.user_responses (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  questionnaire_id TEXT NOT NULL,
  phase INTEGER NOT NULL CHECK (phase IN (1, 3)),
  answers JSONB NOT NULL,
  score INTEGER,
  group_scores JSONB,
  saved_activities JSONB,
  recommended_exercises TEXT[],
  completed_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  
  UNIQUE(user_id, questionnaire_id, phase)
);

-- RLS Policies for user_responses
ALTER TABLE public.user_responses ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view own responses" ON public.user_responses
  FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Users can insert own responses" ON public.user_responses
  FOR INSERT WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update own responses" ON public.user_responses
  FOR UPDATE USING (auth.uid() = user_id);

-- Table 2: exercise_completions (Phase 2 Exercise Tracking)
CREATE TABLE public.exercise_completions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  exercise_id TEXT NOT NULL,
  phase INTEGER NOT NULL DEFAULT 2,
  week INTEGER NOT NULL,
  day INTEGER NOT NULL,
  completed_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  notes TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  
  UNIQUE(user_id, exercise_id, week, day)
);

-- RLS Policies for exercise_completions
ALTER TABLE public.exercise_completions ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view own exercise completions" ON public.exercise_completions
  FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Users can insert own exercise completions" ON public.exercise_completions
  FOR INSERT WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can delete own exercise completions" ON public.exercise_completions
  FOR DELETE USING (auth.uid() = user_id);

-- Table 3: task_completions (Phase 1, 2, 3 Daily Tasks)
CREATE TABLE public.task_completions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  task_id TEXT NOT NULL,
  phase INTEGER NOT NULL,
  day INTEGER NOT NULL,
  completed BOOLEAN NOT NULL DEFAULT true,
  completed_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  
  UNIQUE(user_id, task_id, phase, day)
);

-- RLS Policies for task_completions
ALTER TABLE public.task_completions ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view own task completions" ON public.task_completions
  FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Users can insert own task completions" ON public.task_completions
  FOR INSERT WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update own task completions" ON public.task_completions
  FOR UPDATE USING (auth.uid() = user_id);

CREATE POLICY "Users can delete own task completions" ON public.task_completions
  FOR DELETE USING (auth.uid() = user_id);

-- Table 4: activity_sheet_progress (Activity Sheet Entries)
CREATE TABLE public.activity_sheet_progress (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  activity_sheet_id TEXT NOT NULL,
  form_data JSONB NOT NULL DEFAULT '{}',
  status TEXT NOT NULL DEFAULT 'in-progress' CHECK (status IN ('in-progress', 'completed')),
  completed_at TIMESTAMPTZ,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  
  UNIQUE(user_id, activity_sheet_id)
);

-- RLS Policies for activity_sheet_progress
ALTER TABLE public.activity_sheet_progress ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view own activity sheets" ON public.activity_sheet_progress
  FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Users can insert own activity sheets" ON public.activity_sheet_progress
  FOR INSERT WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update own activity sheets" ON public.activity_sheet_progress
  FOR UPDATE USING (auth.uid() = user_id);

-- Create updated_at triggers
CREATE TRIGGER update_user_responses_updated_at
  BEFORE UPDATE ON public.user_responses
  FOR EACH ROW
  EXECUTE FUNCTION public.update_updated_at();

CREATE TRIGGER update_activity_sheet_progress_updated_at
  BEFORE UPDATE ON public.activity_sheet_progress
  FOR EACH ROW
  EXECUTE FUNCTION public.update_updated_at();

-- Create indexes for performance
CREATE INDEX idx_user_responses_user_phase ON public.user_responses(user_id, phase);
CREATE INDEX idx_exercise_completions_user_week ON public.exercise_completions(user_id, week, day);
CREATE INDEX idx_task_completions_user_phase_day ON public.task_completions(user_id, phase, day);
CREATE INDEX idx_activity_sheet_progress_user ON public.activity_sheet_progress(user_id);