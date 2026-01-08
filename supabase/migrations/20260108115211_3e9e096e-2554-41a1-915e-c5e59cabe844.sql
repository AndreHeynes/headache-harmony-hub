-- Add phase_two_day column to user_progress for day-level tracking
ALTER TABLE public.user_progress 
ADD COLUMN IF NOT EXISTS phase_two_day INTEGER NOT NULL DEFAULT 1;