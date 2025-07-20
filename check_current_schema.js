#!/usr/bin/env node

/**
 * Check current profiles table schema
 */

import { createClient } from '@supabase/supabase-js';

const SUPABASE_URL = "https://nmvxaplrijzknqbbpdck.supabase.co";
const SUPABASE_ANON_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im5tdnhhcGxyaWp6a25xYmJwZGNrIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTI5Nzg1NzcsImV4cCI6MjA2ODU1NDU3N30.iZP-LDqsCxdJBVnTgLnDgg3UjOQqOe3yID9my9N2SZ4";

const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

async function checkCurrentSchema() {
  console.log('🔍 Checking Current Profiles Table Schema\n');
  console.log(`📡 Connected to: ${SUPABASE_URL}`);
  console.log(`🗄️  Project ID: nmvxaplrijzknqbbpdck\n`);
  
  try {
    // Try to get any existing data to see what columns exist
    const { data, error } = await supabase
      .from('profiles')
      .select('*')
      .limit(1);
    
    if (error) {
      console.log('❌ Error accessing profiles table:');
      console.log(`   ${error.message}\n`);
      
      if (error.message.includes('relation "profiles" does not exist')) {
        console.log('🚨 The profiles table does not exist!');
        console.log('📋 You need to create the table first. Run the complete schema migration.');
        return;
      }
    }
    
    console.log('✅ Profiles table exists');
    
    if (data && data.length > 0) {
      console.log('\n📊 Current columns in profiles table:');
      const columns = Object.keys(data[0]);
      columns.forEach((col, index) => {
        console.log(`   ${index + 1}. ${col}`);
      });
      
      console.log('\n🎯 Required columns for SimpleProfilePage:');
      const requiredColumns = [
        'id', 'user_id', 'username', 'full_name', 'mobile_no', 
        'user_type', 'organization_name', 'designation', 'college_name', 
        'course_name', 'end_year', 'address', 'bio', 'created_at', 'updated_at'
      ];
      
      const missingColumns = requiredColumns.filter(col => !columns.includes(col));
      const existingColumns = requiredColumns.filter(col => columns.includes(col));
      
      if (existingColumns.length > 0) {
        console.log('\n✅ Existing required columns:');
        existingColumns.forEach(col => console.log(`   ✓ ${col}`));
      }
      
      if (missingColumns.length > 0) {
        console.log('\n❌ Missing required columns:');
        missingColumns.forEach(col => console.log(`   ✗ ${col}`));
      } else {
        console.log('\n🎉 All required columns are present!');
      }
      
    } else {
      console.log('\n📝 Table is empty, trying to determine structure...');
      
      // Try inserting a minimal record to see what columns are available
      const testRecord = { id: '00000000-0000-0000-0000-000000000001' };
      const { error: insertError } = await supabase
        .from('profiles')
        .insert(testRecord);
      
      if (insertError) {
        console.log('❌ Cannot determine table structure:');
        console.log(`   ${insertError.message}`);
      }
    }
    
  } catch (error) {
    console.log('❌ Unexpected error:');
    console.log(`   ${error.message}`);
  }
}

checkCurrentSchema().catch(console.error);
