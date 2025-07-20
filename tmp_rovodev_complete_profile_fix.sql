-- Complete fix for profiles table schema mismatch
-- This adds all missing columns that SimpleProfilePage.tsx expects
-- Run this SQL in your Supabase dashboard SQL Editor

-- Enable necessary extensions (if not already enabled)
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Add all missing columns to the profiles table
-- These columns are required by SimpleProfilePage.tsx component

-- Basic profile information
ALTER TABLE profiles ADD COLUMN IF NOT EXISTS full_name TEXT;
ALTER TABLE profiles ADD COLUMN IF NOT EXISTS mobile_no TEXT;
ALTER TABLE profiles ADD COLUMN IF NOT EXISTS bio TEXT;
ALTER TABLE profiles ADD COLUMN IF NOT EXISTS address TEXT;

-- User type with constraint (student or professional)
ALTER TABLE profiles ADD COLUMN IF NOT EXISTS user_type TEXT 
    CHECK (user_type IN ('student', 'professional')) 
    DEFAULT 'student';

-- Professional information
ALTER TABLE profiles ADD COLUMN IF NOT EXISTS organization_name TEXT;
ALTER TABLE profiles ADD COLUMN IF NOT EXISTS designation TEXT;

-- Academic information
ALTER TABLE profiles ADD COLUMN IF NOT EXISTS college_name TEXT;
ALTER TABLE profiles ADD COLUMN IF NOT EXISTS course_name TEXT;
ALTER TABLE profiles ADD COLUMN IF NOT EXISTS end_year INTEGER;

-- Compatibility column for SimpleProfilePage component
-- This ensures the component can work with both 'id' and 'user_id' references
ALTER TABLE profiles ADD COLUMN IF NOT EXISTS user_id UUID;

-- Update user_id to match id for existing records where user_id is null
UPDATE profiles SET user_id = id WHERE user_id IS NULL;

-- Add avatar_url if it doesn't exist (some schemas might be missing this)
ALTER TABLE profiles ADD COLUMN IF NOT EXISTS avatar_url TEXT;

-- Ensure timestamps exist
ALTER TABLE profiles ADD COLUMN IF NOT EXISTS created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW();
ALTER TABLE profiles ADD COLUMN IF NOT EXISTS updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW();

-- Create indexes for better performance on commonly queried columns
CREATE INDEX IF NOT EXISTS idx_profiles_user_type ON profiles(user_type);
CREATE INDEX IF NOT EXISTS idx_profiles_user_id ON profiles(user_id);
CREATE INDEX IF NOT EXISTS idx_profiles_username ON profiles(username);
CREATE INDEX IF NOT EXISTS idx_profiles_full_name ON profiles(full_name);

-- Create a trigger to automatically update the updated_at timestamp
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ language 'plpgsql';

-- Apply the trigger to profiles table
DROP TRIGGER IF EXISTS update_profiles_updated_at ON profiles;
CREATE TRIGGER update_profiles_updated_at
    BEFORE UPDATE ON profiles
    FOR EACH ROW
    EXECUTE FUNCTION update_updated_at_column();

-- Ensure Row Level Security policies are properly set
-- (These might already exist, but we'll create them if they don't)

-- Policy for users to view all profiles (public profiles)
DROP POLICY IF EXISTS "Public profiles are viewable by everyone" ON profiles;
CREATE POLICY "Public profiles are viewable by everyone" ON profiles
    FOR SELECT USING (true);

-- Policy for users to insert their own profile
DROP POLICY IF EXISTS "Users can insert their own profile" ON profiles;
CREATE POLICY "Users can insert their own profile" ON profiles
    FOR INSERT WITH CHECK (auth.uid() = id);

-- Policy for users to update their own profile
DROP POLICY IF EXISTS "Users can update their own profile" ON profiles;
CREATE POLICY "Users can update their own profile" ON profiles
    FOR UPDATE USING (auth.uid() = id);

-- Policy for users to delete their own profile
DROP POLICY IF EXISTS "Users can delete their own profile" ON profiles;
CREATE POLICY "Users can delete their own profile" ON profiles
    FOR DELETE USING (auth.uid() = id);

-- Verify the table structure by selecting column information
-- This will show you all columns and their types
SELECT 
    column_name, 
    data_type, 
    is_nullable,
    column_default
FROM information_schema.columns 
WHERE table_name = 'profiles' 
    AND table_schema = 'public'
ORDER BY ordinal_position;

-- Show a sample of the table structure (will be empty if no data exists)
-- This helps verify that all columns are accessible
SELECT 
    id,
    user_id,
    username,
    full_name,
    mobile_no,
    user_type,
    organization_name,
    designation,
    college_name,
    course_name,
    end_year,
    address,
    bio,
    avatar_url,
    created_at,
    updated_at
FROM profiles 
LIMIT 1;
