-- Create email_logs table to track sent emails
CREATE TABLE public.email_logs (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID,
  user_email TEXT NOT NULL,
  email_type TEXT NOT NULL,
  sent_at TIMESTAMPTZ DEFAULT now(),
  resend_id TEXT,
  status TEXT DEFAULT 'sent',
  error_message TEXT,
  created_at TIMESTAMPTZ DEFAULT now()
);

-- Enable RLS
ALTER TABLE public.email_logs ENABLE ROW LEVEL SECURITY;

-- Admins can view all email logs
CREATE POLICY "Admins can view email logs"
ON public.email_logs FOR SELECT
USING (public.has_role(auth.uid(), 'admin'::app_role));

-- Admins can delete email logs
CREATE POLICY "Admins can delete email logs"
ON public.email_logs FOR DELETE
USING (public.has_role(auth.uid(), 'admin'::app_role));

-- Create index for faster lookups
CREATE INDEX idx_email_logs_user_email ON public.email_logs(user_email);
CREATE INDEX idx_email_logs_email_type ON public.email_logs(email_type);
CREATE INDEX idx_email_logs_sent_at ON public.email_logs(sent_at);