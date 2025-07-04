-- Create user signups table to store signup data
CREATE TABLE public.user_signups (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  username TEXT NOT NULL,
  email TEXT NOT NULL UNIQUE,
  country TEXT,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable Row Level Security
ALTER TABLE public.user_signups ENABLE ROW LEVEL SECURITY;

-- Create policies for user signups
CREATE POLICY "Anyone can create signup" 
ON public.user_signups 
FOR INSERT 
WITH CHECK (true);

CREATE POLICY "Users can view all signups" 
ON public.user_signups 
FOR SELECT 
USING (true);

-- Create trigger for automatic timestamp updates
CREATE TRIGGER update_user_signups_updated_at
BEFORE UPDATE ON public.user_signups
FOR EACH ROW
EXECUTE FUNCTION public.update_updated_at_column();