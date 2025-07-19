-- Create duel_requests table for friend match invitations
CREATE TABLE public.duel_requests (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  sender_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  receiver_cf_handle TEXT NOT NULL,
  status TEXT NOT NULL DEFAULT 'pending' CHECK (status IN ('pending', 'accepted', 'declined')),
  match_type TEXT NOT NULL DEFAULT 'friend' CHECK (match_type IN ('friend', 'bot')),
  problems JSONB,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create bot_matches table for AI opponent matches
CREATE TABLE public.bot_matches (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  player_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  problems JSONB NOT NULL,
  bot_difficulty TEXT NOT NULL DEFAULT 'medium' CHECK (bot_difficulty IN ('easy', 'medium', 'hard')),
  player_score INTEGER DEFAULT 0,
  bot_score INTEGER DEFAULT 0,
  status TEXT NOT NULL DEFAULT 'ongoing' CHECK (status IN ('ongoing', 'completed', 'abandoned')),
  start_time TIMESTAMP WITH TIME ZONE DEFAULT now(),
  end_time TIMESTAMP WITH TIME ZONE,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable RLS for duel_requests
ALTER TABLE public.duel_requests ENABLE ROW LEVEL SECURITY;

-- Create policies for duel_requests
CREATE POLICY "Users can create duel requests" 
ON public.duel_requests 
FOR INSERT 
WITH CHECK (auth.uid() = sender_id);

CREATE POLICY "Users can view their sent duel requests" 
ON public.duel_requests 
FOR SELECT 
USING (auth.uid() = sender_id);

CREATE POLICY "Users can view duel requests sent to their CF handle" 
ON public.duel_requests 
FOR SELECT 
USING (true);

CREATE POLICY "Users can update duel requests" 
ON public.duel_requests 
FOR UPDATE 
USING (auth.uid() = sender_id);

-- Enable RLS for bot_matches
ALTER TABLE public.bot_matches ENABLE ROW LEVEL SECURITY;

-- Create policies for bot_matches
CREATE POLICY "Users can create their own bot matches" 
ON public.bot_matches 
FOR INSERT 
WITH CHECK (auth.uid() = player_id);

CREATE POLICY "Users can view their own bot matches" 
ON public.bot_matches 
FOR SELECT 
USING (auth.uid() = player_id);

CREATE POLICY "Users can update their own bot matches" 
ON public.bot_matches 
FOR UPDATE 
USING (auth.uid() = player_id);

-- Create trigger for automatic timestamp updates
CREATE TRIGGER update_duel_requests_updated_at
  BEFORE UPDATE ON public.duel_requests
  FOR EACH ROW
  EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_bot_matches_updated_at
  BEFORE UPDATE ON public.bot_matches
  FOR EACH ROW
  EXECUTE FUNCTION public.update_updated_at_column();