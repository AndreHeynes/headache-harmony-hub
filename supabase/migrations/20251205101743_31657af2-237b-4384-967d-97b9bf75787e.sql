-- Add beta_tester to app_role enum
ALTER TYPE public.app_role ADD VALUE IF NOT EXISTS 'beta_tester';

-- Create beta_signups table
CREATE TABLE public.beta_signups (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  email TEXT NOT NULL,
  name TEXT NOT NULL,
  has_diagnosis_confirmation BOOLEAN NOT NULL DEFAULT false,
  current_approach TEXT,
  goals_expectations TEXT,
  accepted_beta_terms BOOLEAN NOT NULL DEFAULT false,
  accepted_privacy_policy BOOLEAN NOT NULL DEFAULT false,
  accepted_feedback_commitment BOOLEAN NOT NULL DEFAULT false,
  status TEXT NOT NULL DEFAULT 'pending',
  admin_notes TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  approved_at TIMESTAMPTZ,
  approved_by UUID REFERENCES auth.users(id),
  converted_user_id UUID REFERENCES auth.users(id),
  CONSTRAINT beta_signups_email_unique UNIQUE (email),
  CONSTRAINT beta_signups_status_check CHECK (status IN ('pending', 'approved', 'rejected', 'converted'))
);

-- Enable RLS
ALTER TABLE public.beta_signups ENABLE ROW LEVEL SECURITY;

-- Public can insert (for signup form)
CREATE POLICY "Anyone can submit beta signup"
ON public.beta_signups
FOR INSERT
WITH CHECK (true);

-- Only admins can view all signups
CREATE POLICY "Admins can view all beta signups"
ON public.beta_signups
FOR SELECT
USING (public.has_role(auth.uid(), 'admin'));

-- Only admins can update signups
CREATE POLICY "Admins can update beta signups"
ON public.beta_signups
FOR UPDATE
USING (public.has_role(auth.uid(), 'admin'));

-- Only admins can delete signups
CREATE POLICY "Admins can delete beta signups"
ON public.beta_signups
FOR DELETE
USING (public.has_role(auth.uid(), 'admin'));

-- Add trigger for updated_at
CREATE TRIGGER update_beta_signups_updated_at
  BEFORE UPDATE ON public.beta_signups
  FOR EACH ROW
  EXECUTE FUNCTION public.update_updated_at();