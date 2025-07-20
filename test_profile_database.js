#!/usr/bin/env node

/**
 * Profile Database Test Script
 * Tests the profile database functionality after applying the schema fix
 */

import { createClient } from '@supabase/supabase-js';
import fs from 'fs';
import path from 'path';

// Load environment variables
const SUPABASE_URL = process.env.VITE_SUPABASE_URL || "https://ksesqwvwppigjpmpjutx.supabase.co";
const SUPABASE_ANON_KEY = process.env.VITE_SUPABASE_ANON_KEY || "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImtzZXNxd3Z3cHBpZ2pwbXBqdXR4Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTE0NDgyMzMsImV4cCI6MjA2NzAyNDIzM30.LIbGIDhi_agGTjJyNgCAxEER2LqAezO-c2pphJh38zw";

// Create Supabase client
const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

// Test results tracking
const testResults = {
  passed: 0,
  failed: 0,
  tests: []
};

// Helper function to log test results
function logTest(testName, passed, message = '') {
  const status = passed ? '✅ PASS' : '❌ FAIL';
  const result = { testName, passed, message };
  testResults.tests.push(result);
  
  if (passed) {
    testResults.passed++;
    console.log(`${status}: ${testName}`);
  } else {
    testResults.failed++;
    console.log(`${status}: ${testName} - ${message}`);
  }
}

// Test 1: Database Connectivity
async function testDatabaseConnectivity() {
  try {
    const { data, error } = await supabase
      .from('profiles')
      .select('count', { count: 'exact', head: true });
    
    if (error) {
      logTest('Database Connectivity', false, error.message);
      return false;
    }
    
    logTest('Database Connectivity', true, 'Successfully connected to Supabase');
    return true;
  } catch (error) {
    logTest('Database Connectivity', false, error.message);
    return false;
  }
}

// Test 2: Check if Schema Fix is Needed
async function checkSchemaStatus() {
  try {
    console.log('\n🔧 Checking current schema status...');

    // Try to select all columns that SimpleProfilePage expects
    const { data, error } = await supabase
      .from('profiles')
      .select('id, user_id, username, full_name, mobile_no, user_type, organization_name, designation, college_name, course_name, end_year, address, bio, created_at, updated_at')
      .limit(1);

    if (error) {
      if (error.message.includes('column') && error.message.includes('does not exist')) {
        logTest('Schema Status Check', false, `Missing columns detected: ${error.message}`);
        console.log('\n⚠️  Schema fix needed! Please run the SQL fix manually in Supabase dashboard.');
        console.log('📋 Copy and paste the contents of tmp_rovodev_complete_profile_fix.sql');
        return false;
      } else {
        logTest('Schema Status Check', false, error.message);
        return false;
      }
    }

    logTest('Schema Status Check', true, 'All required columns are present');
    return true;
  } catch (error) {
    logTest('Schema Status Check', false, error.message);
    return false;
  }
}

// Test 3: Verify Table Structure by Testing Insert
async function verifyTableStructure() {
  try {
    console.log('\n🔍 Testing table structure with sample data...');

    // Test profile data with all expected fields
    const testProfile = {
      user_id: '00000000-0000-0000-0000-000000000999',
      username: 'structure_test_' + Date.now(),
      full_name: 'Structure Test User',
      mobile_no: '+1234567890',
      user_type: 'student',
      organization_name: 'Test Org',
      designation: 'Test Role',
      college_name: 'Test University',
      course_name: 'Computer Science',
      end_year: 2025,
      address: '123 Test Street',
      bio: 'Test bio for structure verification'
    };

    // Try to insert test data
    const { data, error } = await supabase
      .from('profiles')
      .insert(testProfile)
      .select()
      .single();

    if (error) {
      logTest('Table Structure Verification', false, `Insert failed: ${error.message}`);
      return false;
    }

    // Clean up test data
    await supabase.from('profiles').delete().eq('user_id', testProfile.user_id);

    logTest('Table Structure Verification', true, 'All required columns working correctly');
    return true;
  } catch (error) {
    logTest('Table Structure Verification', false, error.message);
    return false;
  }
}

// Test 4: Test CRUD Operations
async function testCRUDOperations() {
  try {
    const testUserId = '00000000-0000-0000-0000-000000000001'; // Test UUID
    
    // Test INSERT
    const testProfile = {
      user_id: testUserId,
      username: 'test_user_' + Date.now(),
      full_name: 'Test User',
      mobile_no: '+1234567890',
      user_type: 'student',
      college_name: 'Test University',
      course_name: 'Computer Science',
      end_year: 2025,
      bio: 'Test bio for database testing'
    };
    
    const { data: insertData, error: insertError } = await supabase
      .from('profiles')
      .insert(testProfile)
      .select()
      .single();
    
    if (insertError) {
      logTest('CRUD - Insert', false, insertError.message);
      return false;
    }
    
    logTest('CRUD - Insert', true, 'Profile inserted successfully');
    
    // Test SELECT
    const { data: selectData, error: selectError } = await supabase
      .from('profiles')
      .select('*')
      .eq('user_id', testUserId)
      .single();
    
    if (selectError) {
      logTest('CRUD - Select', false, selectError.message);
      return false;
    }
    
    logTest('CRUD - Select', true, 'Profile retrieved successfully');
    
    // Test UPDATE
    const { error: updateError } = await supabase
      .from('profiles')
      .update({ bio: 'Updated test bio' })
      .eq('user_id', testUserId);
    
    if (updateError) {
      logTest('CRUD - Update', false, updateError.message);
      return false;
    }
    
    logTest('CRUD - Update', true, 'Profile updated successfully');
    
    // Test DELETE (cleanup)
    const { error: deleteError } = await supabase
      .from('profiles')
      .delete()
      .eq('user_id', testUserId);
    
    if (deleteError) {
      logTest('CRUD - Delete', false, deleteError.message);
      return false;
    }
    
    logTest('CRUD - Delete', true, 'Profile deleted successfully');
    return true;
    
  } catch (error) {
    logTest('CRUD Operations', false, error.message);
    return false;
  }
}

// Test 5: Test User Type Constraint
async function testUserTypeConstraint() {
  try {
    const testUserId = '00000000-0000-0000-0000-000000000002';
    
    // Test valid user_type
    const { error: validError } = await supabase
      .from('profiles')
      .insert({
        user_id: testUserId,
        username: 'constraint_test_' + Date.now(),
        user_type: 'student'
      });
    
    if (validError) {
      logTest('User Type Constraint - Valid', false, validError.message);
      return false;
    }
    
    logTest('User Type Constraint - Valid', true, 'Valid user_type accepted');
    
    // Test invalid user_type (should fail)
    const { error: invalidError } = await supabase
      .from('profiles')
      .insert({
        user_id: '00000000-0000-0000-0000-000000000003',
        username: 'constraint_test_invalid_' + Date.now(),
        user_type: 'invalid_type'
      });
    
    if (!invalidError) {
      logTest('User Type Constraint - Invalid', false, 'Invalid user_type was accepted (should have been rejected)');
    } else {
      logTest('User Type Constraint - Invalid', true, 'Invalid user_type correctly rejected');
    }
    
    // Cleanup
    await supabase.from('profiles').delete().eq('user_id', testUserId);
    
    return true;
  } catch (error) {
    logTest('User Type Constraint', false, error.message);
    return false;
  }
}

// Main test runner
async function runTests() {
  console.log('🧪 Starting Profile Database Tests...\n');
  
  // Run tests in sequence
  await testDatabaseConnectivity();
  await checkSchemaStatus();
  await verifyTableStructure();
  await testCRUDOperations();
  await testUserTypeConstraint();
  
  // Print summary
  console.log('\n📊 Test Summary:');
  console.log(`✅ Passed: ${testResults.passed}`);
  console.log(`❌ Failed: ${testResults.failed}`);
  console.log(`📈 Success Rate: ${((testResults.passed / (testResults.passed + testResults.failed)) * 100).toFixed(1)}%`);
  
  if (testResults.failed > 0) {
    console.log('\n❌ Failed Tests:');
    testResults.tests
      .filter(test => !test.passed)
      .forEach(test => console.log(`   - ${test.testName}: ${test.message}`));
  }
  
  console.log('\n🎯 Next Steps:');
  if (testResults.failed === 0) {
    console.log('✅ All tests passed! Your profile database is working correctly.');
    console.log('✅ You can now use the SimpleProfilePage component safely.');
  } else {
    console.log('⚠️  Some tests failed. Please check the errors above.');
    console.log('💡 Consider running the SQL fix manually in your Supabase dashboard.');
  }
  
  return testResults.failed === 0;
}

// Run the tests
runTests().catch(console.error);
