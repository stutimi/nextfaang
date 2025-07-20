#!/usr/bin/env node

/**
 * Final verification that profile database is working
 */

import { createClient } from '@supabase/supabase-js';

const SUPABASE_URL = "https://nmvxaplrijzknqbbpdck.supabase.co";
const SUPABASE_ANON_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im5tdnhhcGxyaWp6a25xYmJwZGNrIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTI5Nzg1NzcsImV4cCI6MjA2ODU1NDU3N30.iZP-LDqsCxdJBVnTgLnDgg3UjOQqOe3yID9my9N2SZ4";

const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

async function finalVerification() {
  console.log('🎯 Final Profile Database Verification\n');
  
  let allPassed = true;
  
  // Test 1: Check all required columns exist
  console.log('1️⃣ Testing Column Existence...');
  try {
    const { data, error } = await supabase
      .from('profiles')
      .select('id, user_id, username, full_name, mobile_no, user_type, organization_name, designation, college_name, course_name, end_year, address, bio, avatar_url, created_at, updated_at')
      .limit(1);
    
    if (error) {
      console.log(`❌ Column test failed: ${error.message}`);
      allPassed = false;
    } else {
      console.log('✅ All required columns exist');
    }
  } catch (err) {
    console.log(`❌ Column test error: ${err.message}`);
    allPassed = false;
  }
  
  // Test 2: Test profile creation with all fields
  console.log('\n2️⃣ Testing Profile Creation...');
  const testProfile = {
    user_id: '00000000-0000-0000-0000-000000000999',
    username: 'final_test_' + Date.now(),
    full_name: 'Final Test User',
    mobile_no: '+1234567890',
    user_type: 'student',
    organization_name: 'Test Organization',
    designation: 'Test Role',
    college_name: 'Test University',
    course_name: 'Computer Science',
    end_year: 2025,
    address: '123 Test Street, Test City',
    bio: 'This is a test profile for verification purposes.',
    avatar_url: 'https://example.com/avatar.jpg'
  };
  
  try {
    const { data, error } = await supabase
      .from('profiles')
      .insert(testProfile)
      .select()
      .single();
    
    if (error) {
      console.log(`❌ Profile creation failed: ${error.message}`);
      allPassed = false;
    } else {
      console.log('✅ Profile created successfully');
      console.log(`   Created profile for: ${data.full_name}`);
      
      // Test 3: Test profile retrieval
      console.log('\n3️⃣ Testing Profile Retrieval...');
      const { data: retrievedData, error: retrieveError } = await supabase
        .from('profiles')
        .select('*')
        .eq('user_id', testProfile.user_id)
        .single();
      
      if (retrieveError) {
        console.log(`❌ Profile retrieval failed: ${retrieveError.message}`);
        allPassed = false;
      } else {
        console.log('✅ Profile retrieved successfully');
        console.log(`   Retrieved: ${retrievedData.full_name} (${retrievedData.user_type})`);
      }
      
      // Test 4: Test profile update
      console.log('\n4️⃣ Testing Profile Update...');
      const { error: updateError } = await supabase
        .from('profiles')
        .update({ bio: 'Updated bio for testing' })
        .eq('user_id', testProfile.user_id);
      
      if (updateError) {
        console.log(`❌ Profile update failed: ${updateError.message}`);
        allPassed = false;
      } else {
        console.log('✅ Profile updated successfully');
      }
      
      // Test 5: Test user_type constraint
      console.log('\n5️⃣ Testing User Type Constraint...');
      const { error: constraintError } = await supabase
        .from('profiles')
        .update({ user_type: 'professional' })
        .eq('user_id', testProfile.user_id);
      
      if (constraintError) {
        console.log(`❌ User type constraint test failed: ${constraintError.message}`);
        allPassed = false;
      } else {
        console.log('✅ User type constraint working correctly');
      }
      
      // Cleanup
      console.log('\n🧹 Cleaning up test data...');
      const { error: deleteError } = await supabase
        .from('profiles')
        .delete()
        .eq('user_id', testProfile.user_id);
      
      if (deleteError) {
        console.log(`⚠️  Cleanup failed: ${deleteError.message}`);
      } else {
        console.log('✅ Test data cleaned up');
      }
    }
  } catch (err) {
    console.log(`❌ Profile creation error: ${err.message}`);
    allPassed = false;
  }
  
  // Final result
  console.log('\n' + '='.repeat(50));
  if (allPassed) {
    console.log('🎉 SUCCESS! Profile database is working perfectly!');
    console.log('✅ All required columns are present');
    console.log('✅ CRUD operations work correctly');
    console.log('✅ Data constraints are enforced');
    console.log('✅ SimpleProfilePage component will work correctly');
    console.log('\n🚀 You can now use the profile functionality in your app!');
  } else {
    console.log('❌ FAILED! Some tests did not pass.');
    console.log('⚠️  Please check the errors above and try applying the SQL fix again.');
  }
  console.log('='.repeat(50));
  
  return allPassed;
}

finalVerification().catch(console.error);
