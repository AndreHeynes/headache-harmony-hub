-- Create beta_feedback table for collecting user feedback during beta testing
CREATE TABLE public.beta_feedback (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  beta_user_email TEXT NOT NULL,
  beta_user_name TEXT,
  feedback_type TEXT NOT NULL CHECK (feedback_type IN ('bug', 'feature', 'usability', 'general')),
  title TEXT NOT NULL,
  description TEXT NOT NULL,
  rating INTEGER CHECK (rating >= 1 AND rating <= 5),
  page_url TEXT,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable Row Level Security
ALTER TABLE public.beta_feedback ENABLE ROW LEVEL SECURITY;

-- Allow inserts from anyone (feedback will be validated by edge function)
CREATE POLICY "Allow public inserts for beta feedback" 
ON public.beta_feedback 
FOR INSERT 
WITH CHECK (true);

-- Only admins can view feedback
CREATE POLICY "Admins can view beta feedback" 
ON public.beta_feedback 
FOR SELECT 
USING (has_role(auth.uid(), 'admin'::app_role));

-- Only admins can delete feedback
CREATE POLICY "Admins can delete beta feedback" 
ON public.beta_feedback 
FOR DELETE 
USING (has_role(auth.uid(), 'admin'::app_role));

-- Add index for faster queries by email and type
CREATE INDEX idx_beta_feedback_email ON public.beta_feedback(beta_user_email);
CREATE INDEX idx_beta_feedback_type ON public.beta_feedback(feedback_type);
CREATE INDEX idx_beta_feedback_created ON public.beta_feedback(created_at DESC);