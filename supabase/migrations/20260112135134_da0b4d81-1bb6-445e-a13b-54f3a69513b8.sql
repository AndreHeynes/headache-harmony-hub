-- Allow users to correct their own exercise logs
CREATE POLICY "Users can update own exercise completions"
ON public.exercise_completions
FOR UPDATE
TO authenticated
USING (auth.uid() = user_id)
WITH CHECK (auth.uid() = user_id);