-- Safe RLS Policy Fix for Profiles Table
-- This fixes the 403 Forbidden errors without modifying existing constraints

-- Ensure user_id exists for compatibility (should already exist from previous fix)
ALTER TABLE profiles ADD COLUMN IF NOT EXISTS user_id UUID;

-- Update user_id to match id for existing records where user_id is null
UPDATE profiles SET user_id = id WHERE user_id IS NULL;

-- Create a function to automatically sync id and user_id on insert/update
CREATE OR REPLACE FUNCTION sync_profile_ids()
RETURNS TRIGGER AS $$
BEGIN
    -- If user_id is provided but id is null, set id = user_id
    IF NEW.user_id IS NOT NULL AND NEW.id IS NULL THEN
        NEW.id = NEW.user_id;
    END IF;
    
    -- If id is provided but user_id is null, set user_id = id
    IF NEW.id IS NOT NULL AND NEW.user_id IS NULL THEN
        NEW.user_id = NEW.id;
    END IF;
    
    -- Ensure they match if both are provided
    IF NEW.id IS NOT NULL AND NEW.user_id IS NOT NULL AND NEW.id != NEW.user_id THEN
        NEW.user_id = NEW.id;  -- id takes precedence as it's the primary key
    END IF;
    
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Create trigger to sync ids (drop first if exists)
DROP TRIGGER IF EXISTS sync_profile_ids_trigger ON profiles;
CREATE TRIGGER sync_profile_ids_trigger
    BEFORE INSERT OR UPDATE ON profiles
    FOR EACH ROW
    EXECUTE FUNCTION sync_profile_ids();

-- Fix the RLS policies - Drop all existing policies first
DROP POLICY IF EXISTS "Public profiles are viewable by everyone" ON profiles;
DROP POLICY IF EXISTS "Users can insert their own profile" ON profiles;
DROP POLICY IF EXISTS "Users can update their own profile" ON profiles;
DROP POLICY IF EXISTS "Users can delete their own profile" ON profiles;
DROP POLICY IF EXISTS "Enable read access for all users" ON profiles;
DROP POLICY IF EXISTS "Enable insert for authenticated users" ON profiles;
DROP POLICY IF EXISTS "Enable update for users based on user_id" ON profiles;
DROP POLICY IF EXISTS "Enable delete for users based on user_id" ON profiles;

-- Create new working policies
-- Policy 1: Public read access (anyone can view profiles)
CREATE POLICY "Public profiles are viewable by everyone" ON profiles
    FOR SELECT USING (true);

-- Policy 2: Users can insert their own profile
-- Check both id and user_id to handle both cases
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

-- Create index on user_id for better performance (if not exists)
CREATE INDEX IF NOT EXISTS idx_profiles_user_id ON profiles(user_id);

-- Verification queries
-- Check that both id and user_id columns exist
SELECT 
    column_name, 
    data_type, 
    is_nullable
FROM information_schema.columns 
WHERE table_name = 'profiles' 
    AND column_name IN ('id', 'user_id')
ORDER BY column_name;

-- Check that RLS policies are created correctly
SELECT 
    policyname, 
    cmd, 
    permissive
FROM pg_policies 
WHERE tablename = 'profiles'
ORDER BY policyname;

-- Success message
SELECT 'RLS Fix Applied Successfully' as status, 
       'Profile operations should now work correctly' as message;
