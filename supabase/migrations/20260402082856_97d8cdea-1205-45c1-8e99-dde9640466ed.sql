
CREATE TABLE public.maintenance_programs (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID NOT NULL,
  goals JSONB NOT NULL DEFAULT '[]'::jsonb,
  selected_exercises JSONB NOT NULL DEFAULT '[]'::jsonb,
  weekly_schedule JSONB NOT NULL DEFAULT '{}'::jsonb,
  sport_plan JSONB NOT NULL DEFAULT '{}'::jsonb,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

ALTER TABLE public.maintenance_programs ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view own maintenance programs"
  ON public.maintenance_programs FOR SELECT
  TO authenticated
  USING (auth.uid() = user_id);

CREATE POLICY "Users can insert own maintenance programs"
  ON public.maintenance_programs FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update own maintenance programs"
  ON public.maintenance_programs FOR UPDATE
  TO authenticated
  USING (auth.uid() = user_id)
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can delete own maintenance programs"
  ON public.maintenance_programs FOR DELETE
  TO authenticated
  USING (auth.uid() = user_id);

CREATE TRIGGER update_maintenance_programs_updated_at
  BEFORE UPDATE ON public.maintenance_programs
  FOR EACH ROW
  EXECUTE FUNCTION public.update_updated_at();
