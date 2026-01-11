-- Fix user_subscriptions: Add UPDATE and DELETE policies
CREATE POLICY "Users can update own subscriptions" 
ON public.user_subscriptions 
FOR UPDATE 
USING (auth.uid() = user_id);

CREATE POLICY "Users can delete own subscriptions" 
ON public.user_subscriptions 
FOR DELETE 
USING (auth.uid() = user_id);

-- Fix profiles: Add INSERT policy (for edge cases where trigger doesn't fire)
CREATE POLICY "Users can insert their own profile" 
ON public.profiles 
FOR INSERT 
WITH CHECK (auth.uid() = id);