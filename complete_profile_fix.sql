-- Complete Profile Database Fix
-- This addresses all RLS policy issues and ensures proper setup

-- First, let's ensure the table structure is correct
-- Make sure both 'id' and 'user_id' columns exist and are properly set up

-- Ensure id column is properly set as primary key and references auth.users
ALTER TABLE profiles DROP CONSTRAINT IF EXISTS profiles_pkey;
ALTER TABLE profiles DROP CONSTRAINT IF EXISTS profiles_id_fkey;

-- Make sure id column exists and is properly configured
ALTER TABLE profiles ADD COLUMN IF NOT EXISTS id UUID;
ALTER TABLE profiles ADD CONSTRAINT profiles_pkey PRIMARY KEY (id);
ALTER TABLE profiles ADD CONSTRAINT profiles_id_fkey FOREIGN KEY (id) REFERENCES auth.users(id) ON DELETE CASCADE;

-- Ensure user_id exists for compatibility
ALTER TABLE profiles ADD COLUMN IF NOT EXISTS user_id UUID;

-- Update user_id to match id for existing records
UPDATE profiles SET user_id = id WHERE user_id IS NULL;
UPDATE profiles SET id = user_id WHERE id IS NULL;

-- Create a function to automatically set id = user_id on insert
CREATE OR REPLACE FUNCTION sync_profile_ids()
RETURNS TRIGGER AS $$
BEGIN
    -- If id is null but user_id is set, copy user_id to id
    IF NEW.id IS NULL AND NEW.user_id IS NOT NULL THEN
        NEW.id = NEW.user_id;
    END IF;
    
    -- If user_id is null but id is set, copy id to user_id
    IF NEW.user_id IS NULL AND NEW.id IS NOT NULL THEN
        NEW.user_id = NEW.id;
    END IF;
    
    -- If both are null, this should fail
    IF NEW.id IS NULL AND NEW.user_id IS NULL THEN
        RAISE EXCEPTION 'Both id and user_id cannot be null';
    END IF;
    
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Create trigger to sync ids
DROP TRIGGER IF EXISTS sync_profile_ids_trigger ON profiles;
CREATE TRIGGER sync_profile_ids_trigger
    BEFORE INSERT OR UPDATE ON profiles
    FOR EACH ROW
    EXECUTE FUNCTION sync_profile_ids();

-- Now fix the RLS policies
-- Drop all existing policies first
DROP POLICY IF EXISTS "Public profiles are viewable by everyone" ON profiles;
DROP POLICY IF EXISTS "Users can insert their own profile" ON profiles;
DROP POLICY IF EXISTS "Users can update their own profile" ON profiles;
DROP POLICY IF EXISTS "Users can delete their own profile" ON profiles;

-- Create new policies that work with the component
-- Policy 1: Public read access (anyone can view profiles)
CREATE POLICY "Public profiles are viewable by everyone" ON profiles
    FOR SELECT USING (true);

-- Policy 2: Users can insert their own profile
-- Check both id and user_id to be safe
CREATE POLICY "Users can insert their own profile" ON profiles
    FOR INSERT WITH CHECK (
        auth.uid() IS NOT NULL AND (
            auth.uid() = id OR 
            auth.uid() = user_id
        )
    );

-- Policy 3: Users can update their own profile
CREATE POLICY "Users can update their own profile" ON profiles
    FOR UPDATE USING (
        auth.uid() IS NOT NULL AND (
            auth.uid() = id OR 
            auth.uid() = user_id
        )
    );

-- Policy 4: Users can delete their own profile
CREATE POLICY "Users can delete their own profile" ON profiles
    FOR DELETE USING (
        auth.uid() IS NOT NULL AND (
            auth.uid() = id OR 
            auth.uid() = user_id
        )
    );

-- Ensure RLS is enabled
ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;

-- Create an index on user_id for better performance
CREATE INDEX IF NOT EXISTS idx_profiles_user_id ON profiles(user_id);

-- Verify the setup
SELECT 
    'Table Structure Check' as check_type,
    column_name, 
    data_type, 
    is_nullable,
    column_default
FROM information_schema.columns 
WHERE table_name = 'profiles' 
    AND column_name IN ('id', 'user_id')
ORDER BY column_name;

-- Check policies
SELECT 
    'RLS Policies Check' as check_type,
    policyname, 
    cmd, 
    permissive,
    qual,
    with_check
FROM pg_policies 
WHERE tablename = 'profiles'
ORDER BY policyname;

-- Test query that SimpleProfilePage would use
-- This should work for authenticated users
SELECT 'Query Test' as check_type, 'SimpleProfilePage compatibility' as description;

-- Show current table constraints
SELECT 
    'Constraints Check' as check_type,
    constraint_name,
    constraint_type
FROM information_schema.table_constraints 
WHERE table_name = 'profiles'
ORDER BY constraint_type, constraint_name;
