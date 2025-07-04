-- Create storage bucket for user files and home page assets
INSERT INTO storage.buckets (id, name, public) 
VALUES ('user-assets', 'user-assets', true);

-- Create storage policies for user assets
CREATE POLICY "Anyone can view user assets" 
ON storage.objects 
FOR SELECT 
USING (bucket_id = 'user-assets');

CREATE POLICY "Authenticated users can upload assets" 
ON storage.objects 
FOR INSERT 
WITH CHECK (bucket_id = 'user-assets' AND auth.uid() IS NOT NULL);

CREATE POLICY "Users can update their own assets" 
ON storage.objects 
FOR UPDATE 
USING (bucket_id = 'user-assets' AND auth.uid()::text = (storage.foldername(name))[1]);

CREATE POLICY "Users can delete their own assets" 
ON storage.objects 
FOR DELETE 
USING (bucket_id = 'user-assets' AND auth.uid()::text = (storage.foldername(name))[1]);

-- Create table to store user session data and preferences
CREATE TABLE public.user_sessions (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  session_data JSONB NOT NULL DEFAULT '{}',
  last_login TIMESTAMP WITH TIME ZONE DEFAULT now(),
  login_count INTEGER DEFAULT 1,
  preferences JSONB DEFAULT '{}',
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable RLS
ALTER TABLE public.user_sessions ENABLE ROW LEVEL SECURITY;

-- Create policies for user sessions
CREATE POLICY "Users can view their own sessions" 
ON public.user_sessions 
FOR SELECT 
USING (auth.uid() = user_id);

CREATE POLICY "Users can insert their own sessions" 
ON public.user_sessions 
FOR INSERT 
WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own sessions" 
ON public.user_sessions 
FOR UPDATE 
USING (auth.uid() = user_id);

-- Create trigger for automatic updated_at timestamps
CREATE TRIGGER update_user_sessions_updated_at
BEFORE UPDATE ON public.user_sessions
FOR EACH ROW
EXECUTE FUNCTION public.update_updated_at_column();