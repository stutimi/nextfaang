#!/usr/bin/env node

/**
 * Simple test to check specific columns
 */

import { createClient } from '@supabase/supabase-js';

const SUPABASE_URL = "https://nmvxaplrijzknqbbpdck.supabase.co";
const SUPABASE_ANON_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im5tdnhhcGxyaWp6a25xYmJwZGNrIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTI5Nzg1NzcsImV4cCI6MjA2ODU1NDU3N30.iZP-LDqsCxdJBVnTgLnDgg3UjOQqOe3yID9my9N2SZ4";

const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

async function testColumns() {
  console.log('🔍 Testing Individual Columns\n');
  
  const columnsToTest = [
    'id', 'username', 'full_name', 'mobile_no', 'user_type', 
    'bio', 'address', 'created_at', 'updated_at'
  ];
  
  for (const column of columnsToTest) {
    try {
      const { data, error } = await supabase
        .from('profiles')
        .select(column)
        .limit(1);
      
      if (error) {
        if (error.message.includes('does not exist')) {
          console.log(`❌ Column '${column}' does not exist`);
        } else {
          console.log(`⚠️  Column '${column}' exists but error: ${error.message}`);
        }
      } else {
        console.log(`✅ Column '${column}' exists`);
      }
    } catch (err) {
      console.log(`❌ Column '${column}' test failed: ${err.message}`);
    }
  }
  
  console.log('\n🎯 Summary:');
  console.log('If you see "does not exist" errors above, the SQL fix was not applied correctly.');
  console.log('Please try running the SQL again in your Supabase dashboard.');
}

testColumns().catch(console.error);
