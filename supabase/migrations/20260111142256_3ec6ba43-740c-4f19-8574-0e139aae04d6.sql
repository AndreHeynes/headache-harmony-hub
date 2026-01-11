-- Add DELETE policies for GDPR compliance

-- exercise_completions already has DELETE policy, skip

-- user_progress: Add DELETE policy
CREATE POLICY "Users can delete their own progress" 
ON public.user_progress 
FOR DELETE 
USING (auth.uid() = user_id);

-- profiles: Add DELETE policy
CREATE POLICY "Users can delete their own profile" 
ON public.profiles 
FOR DELETE 
USING (auth.uid() = id);

-- user_responses: Add DELETE policy
CREATE POLICY "Users can delete own responses" 
ON public.user_responses 
FOR DELETE 
USING (auth.uid() = user_id);

-- activity_sheet_progress: Add DELETE policy
CREATE POLICY "Users can delete own activity sheets" 
ON public.activity_sheet_progress 
FOR DELETE 
USING (auth.uid() = user_id);