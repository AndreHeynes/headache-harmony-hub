-- Drop existing RESTRICTIVE policies on beta_signups
DROP POLICY IF EXISTS "Admins can delete beta signups" ON public.beta_signups;
DROP POLICY IF EXISTS "Admins can update beta signups" ON public.beta_signups;
DROP POLICY IF EXISTS "Admins can view all beta signups" ON public.beta_signups;
DROP POLICY IF EXISTS "Anyone can submit beta signup" ON public.beta_signups;

-- Create proper PERMISSIVE policies
CREATE POLICY "Admins can view all beta signups"
ON public.beta_signups
FOR SELECT
TO authenticated
USING (public.has_role(auth.uid(), 'admin'::app_role));

CREATE POLICY "Admins can update beta signups"
ON public.beta_signups
FOR UPDATE
TO authenticated
USING (public.has_role(auth.uid(), 'admin'::app_role));

CREATE POLICY "Admins can delete beta signups"
ON public.beta_signups
FOR DELETE
TO authenticated
USING (public.has_role(auth.uid(), 'admin'::app_role));

CREATE POLICY "Anyone can submit beta signup"
ON public.beta_signups
FOR INSERT
TO anon, authenticated
WITH CHECK (true);