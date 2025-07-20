-- Fix Row Level Security policies for profiles table
-- This addresses the 403 Forbidden and RLS policy violation errors
-- The issue is that SimpleProfilePage uses 'user_id' field but RLS policies check 'id'

-- Drop existing policies to recreate them correctly
DROP POLICY IF EXISTS "Public profiles are viewable by everyone" ON profiles;
DROP POLICY IF EXISTS "Users can insert their own profile" ON profiles;
DROP POLICY IF EXISTS "Users can update their own profile" ON profiles;
DROP POLICY IF EXISTS "Users can delete their own profile" ON profiles;

-- Policy for viewing profiles (public read access)
CREATE POLICY "Public profiles are viewable by everyone" ON profiles
    FOR SELECT USING (true);

-- Policy for inserting profiles - check user_id matches authenticated user
CREATE POLICY "Users can insert their own profile" ON profiles
    FOR INSERT WITH CHECK (
        auth.uid() IS NOT NULL AND
        auth.uid() = user_id
    );

-- Policy for updating profiles - check user_id matches authenticated user
CREATE POLICY "Users can update their own profile" ON profiles
    FOR UPDATE USING (
        auth.uid() IS NOT NULL AND
        auth.uid() = user_id
    );

-- Policy for deleting profiles - check user_id matches authenticated user
CREATE POLICY "Users can delete their own profile" ON profiles
    FOR DELETE USING (
        auth.uid() IS NOT NULL AND
        auth.uid() = user_id
    );

-- Alternative: If the above doesn't work, try these simpler policies
-- Uncomment these and comment out the above if needed

/*
-- Simple policy for inserting - just check if user is authenticated
CREATE POLICY "Authenticated users can insert profiles" ON profiles
    FOR INSERT WITH CHECK (auth.uid() IS NOT NULL);

-- Simple policy for updating - check user_id matches auth.uid()
CREATE POLICY "Users can update own profile by user_id" ON profiles
    FOR UPDATE USING (auth.uid()::text = user_id::text);

-- Simple policy for deleting - check user_id matches auth.uid()
CREATE POLICY "Users can delete own profile by user_id" ON profiles
    FOR DELETE USING (auth.uid()::text = user_id::text);
*/

-- Ensure RLS is enabled
ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;

-- Verify the policies are created
SELECT schemaname, tablename, policyname, permissive, roles, cmd, qual, with_check
FROM pg_policies 
WHERE tablename = 'profiles';

-- Test query to verify structure
SELECT column_name, data_type 
FROM information_schema.columns 
WHERE table_name = 'profiles' 
    AND column_name IN ('id', 'user_id')
ORDER BY column_name;
