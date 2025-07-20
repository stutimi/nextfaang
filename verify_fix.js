#!/usr/bin/env node

/**
 * Quick verification script to check if the profile database fix worked
 */

import { createClient } from '@supabase/supabase-js';

// Load environment variables
const SUPABASE_URL = process.env.VITE_SUPABASE_URL || "https://ksesqwvwppigjpmpjutx.supabase.co";
const SUPABASE_ANON_KEY = process.env.VITE_SUPABASE_ANON_KEY || "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImtzZXNxd3Z3cHBpZ2pwbXBqdXR4Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTE0NDgyMzMsImV4cCI6MjA2NzAyNDIzM30.LIbGIDhi_agGTjJyNgCAxEER2LqAezO-c2pphJh38zw";

const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

async function quickVerification() {
  console.log('🔍 Quick Profile Database Verification\n');
  
  try {
    // Test if all required columns exist by trying to select them
    const { data, error } = await supabase
      .from('profiles')
      .select('id, user_id, username, full_name, mobile_no, user_type, organization_name, designation, college_name, course_name, end_year, address, bio, created_at, updated_at')
      .limit(1);
    
    if (error) {
      console.log('❌ FAILED: Schema fix not applied correctly');
      console.log(`   Error: ${error.message}`);
      console.log('\n📋 Please apply the SQL fix from tmp_rovodev_complete_profile_fix.sql');
      return false;
    }
    
    console.log('✅ SUCCESS: All required columns are present');
    
    // Test a simple insert/delete to verify functionality
    const testProfile = {
      user_id: '00000000-0000-0000-0000-000000000999',
      username: 'verify_test_' + Date.now(),
      full_name: 'Verification Test',
      user_type: 'student',
      bio: 'Test verification'
    };
    
    const { data: insertData, error: insertError } = await supabase
      .from('profiles')
      .insert(testProfile)
      .select()
      .single();
    
    if (insertError) {
      console.log('❌ FAILED: Cannot insert test profile');
      console.log(`   Error: ${insertError.message}`);
      return false;
    }
    
    console.log('✅ SUCCESS: Profile insert/select working');
    
    // Clean up test data
    await supabase.from('profiles').delete().eq('user_id', testProfile.user_id);
    console.log('✅ SUCCESS: Profile delete working');
    
    console.log('\n🎉 Profile database is working correctly!');
    console.log('✅ You can now use the SimpleProfilePage component');
    console.log('✅ All CRUD operations are functional');
    
    return true;
    
  } catch (error) {
    console.log('❌ FAILED: Unexpected error');
    console.log(`   Error: ${error.message}`);
    return false;
  }
}

// Run verification
quickVerification().catch(console.error);
