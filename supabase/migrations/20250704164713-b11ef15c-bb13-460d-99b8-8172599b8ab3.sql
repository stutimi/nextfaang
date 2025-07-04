-- Create visitor tracking table
CREATE TABLE public.visitor_logs (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  ip_address INET,
  user_agent TEXT,
  country TEXT,
  visited_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable RLS
ALTER TABLE public.visitor_logs ENABLE ROW LEVEL SECURITY;

-- Create policies for visitor logs
CREATE POLICY "Anyone can insert visitor logs" 
ON public.visitor_logs 
FOR INSERT 
WITH CHECK (true);

CREATE POLICY "Only authenticated users can view visitor logs" 
ON public.visitor_logs 
FOR SELECT 
USING (auth.uid() IS NOT NULL);