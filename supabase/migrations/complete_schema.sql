-- NEXTFAANG Database Schema
-- This file contains the complete database schema for the NEXTFAANG platform

-- Enable necessary extensions
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Users table for authentication and profiles
CREATE TABLE IF NOT EXISTS profiles (
    id UUID REFERENCES auth.users ON DELETE CASCADE,
    username TEXT UNIQUE,
    full_name TEXT,
    avatar_url TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    PRIMARY KEY (id)
);

-- Duel rooms table
CREATE TABLE IF NOT EXISTS duel_rooms (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    room_code TEXT UNIQUE NOT NULL,
    creator_id UUID REFERENCES profiles(id) ON DELETE CASCADE,
    opponent_id UUID REFERENCES profiles(id) ON DELETE CASCADE,
    status TEXT DEFAULT 'waiting',
    problem_data JSONB,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    started_at TIMESTAMP WITH TIME ZONE,
    ended_at TIMESTAMP WITH TIME ZONE
);

-- Contest analytics table
CREATE TABLE IF NOT EXISTS contest_analytics (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    user_id UUID REFERENCES profiles(id) ON DELETE CASCADE,
    platform TEXT NOT NULL,
    username TEXT NOT NULL,
    data JSONB NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Enable Row Level Security
ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE duel_rooms ENABLE ROW LEVEL SECURITY;
ALTER TABLE contest_analytics ENABLE ROW LEVEL SECURITY;

-- Policies for profiles
CREATE POLICY "Public profiles are viewable by everyone" ON profiles
    FOR SELECT USING (true);

CREATE POLICY "Users can insert their own profile" ON profiles
    FOR INSERT WITH CHECK (auth.uid() = id);

CREATE POLICY "Users can update own profile" ON profiles
    FOR UPDATE USING (auth.uid() = id);

-- Policies for duel_rooms
CREATE POLICY "Users can view rooms they're part of" ON duel_rooms
    FOR SELECT USING (auth.uid() = creator_id OR auth.uid() = opponent_id);

CREATE POLICY "Users can create rooms" ON duel_rooms
    FOR INSERT WITH CHECK (auth.uid() = creator_id);

CREATE POLICY "Room participants can update" ON duel_rooms
    FOR UPDATE USING (auth.uid() = creator_id OR auth.uid() = opponent_id);

-- Policies for contest_analytics
CREATE POLICY "Users can view own analytics" ON contest_analytics
    FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Users can insert own analytics" ON contest_analytics
    FOR INSERT WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update own analytics" ON contest_analytics
    FOR UPDATE USING (auth.uid() = user_id);