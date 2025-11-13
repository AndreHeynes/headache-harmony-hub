-- Fix the user_roles foreign key to reference profiles instead of auth.users
-- This prevents foreign key violations and follows best practices

-- First, drop the existing foreign key constraint if it exists
ALTER TABLE public.user_roles 
DROP CONSTRAINT IF EXISTS user_roles_user_id_fkey;

-- Add the correct foreign key to profiles table
ALTER TABLE public.user_roles
ADD CONSTRAINT user_roles_user_id_fkey 
FOREIGN KEY (user_id) 
REFERENCES public.profiles(id) 
ON DELETE CASCADE;