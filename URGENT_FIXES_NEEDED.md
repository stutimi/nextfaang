# 🚨 Urgent Fixes Required

## Issue 1: Database Schema Missing Columns
**Error**: `Could not find the 'first_name' column of 'profiles' in the schema cache`

### Solution:
1. **Go to Supabase Dashboard**: https://supabase.com/dashboard/project/nmvxaplrijzknqbbpdck
2. **Navigate to**: SQL Editor
3. **Run this SQL**:
```sql
-- Add missing columns to profiles table
ALTER TABLE profiles ADD COLUMN IF NOT EXISTS first_name TEXT;
ALTER TABLE profiles ADD COLUMN IF NOT EXISTS last_name TEXT;
ALTER TABLE profiles ADD COLUMN IF NOT EXISTS display_name TEXT;
ALTER TABLE profiles ADD COLUMN IF NOT EXISTS mobile_no TEXT;
ALTER TABLE profiles ADD COLUMN IF NOT EXISTS bio TEXT;
ALTER TABLE profiles ADD COLUMN IF NOT EXISTS location TEXT;
ALTER TABLE profiles ADD COLUMN IF NOT EXISTS website TEXT;

-- Create user_preferences table
CREATE TABLE IF NOT EXISTS user_preferences (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    user_id UUID REFERENCES auth.users ON DELETE CASCADE UNIQUE,
    theme TEXT DEFAULT 'system',
    language TEXT DEFAULT 'en',
    timezone TEXT DEFAULT 'UTC',
    email_notifications BOOLEAN DEFAULT true,
    push_notifications BOOLEAN DEFAULT true,
    profile_visibility TEXT DEFAULT 'public',
    show_email BOOLEAN DEFAULT false,
    show_location BOOLEAN DEFAULT true,
    show_activity BOOLEAN DEFAULT true,
    sound_effects BOOLEAN DEFAULT true,
    auto_save BOOLEAN DEFAULT true,
    compact_mode BOOLEAN DEFAULT false,
    contest_reminders BOOLEAN DEFAULT true,
    arena_battle_invites BOOLEAN DEFAULT true,
    achievement_notifications BOOLEAN DEFAULT true,
    weekly_progress_report BOOLEAN DEFAULT true,
    platform_updates BOOLEAN DEFAULT true,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Enable RLS and add policies
ALTER TABLE user_preferences ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view own preferences" ON user_preferences
    FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Users can insert own preferences" ON user_preferences
    FOR INSERT WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update own preferences" ON user_preferences
    FOR UPDATE USING (auth.uid() = user_id);
```

## Issue 2: ToolsDropdown Empty Objects
**Problem**: Both original and fallback toolsItems showing as `[{}, {}, {}, {}, {}, {}]`

### Debugging Steps:
1. Check browser console for the new debug logs
2. Verify if the issue is in the import or the data itself
3. The fallback should work even if import fails

### Expected Console Output:
```
navigationData.ts - toolsItems at export: [Array with 7 proper objects]
ToolsDropdown rendering, original toolsItems: [Should show proper data]
ToolsDropdown using safeToolsItems: [Should show proper data]
Fallback toolsItems: [Should show proper data]
```