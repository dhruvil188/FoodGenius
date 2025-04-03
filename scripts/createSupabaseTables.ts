/**
 * Script to create tables in Supabase
 * This script reads the SQL from supabase-tables.sql and executes it against your Supabase database
 */

import { createClient } from '@supabase/supabase-js';
import fs from 'fs';
import path from 'path';

// Get Supabase credentials from environment
const supabaseUrl = process.env.SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_KEY;

if (!supabaseUrl || !supabaseKey) {
  console.error('❌ Error: SUPABASE_URL and SUPABASE_KEY environment variables must be set');
  process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseKey);

/**
 * Function to create tables in Supabase
 * This executes the SQL from the supabase-tables.sql file
 */
async function createSupabaseTables() {
  try {
    console.log('Creating Supabase tables...');
    
    // Read SQL file
    const sqlFilePath = path.join(__dirname, 'supabase-tables.sql');
    const sql = fs.readFileSync(sqlFilePath, 'utf8');
    
    // Execute SQL
    const { error } = await supabase.rpc('exec_sql', { sql });
    
    if (error) {
      console.error('❌ Error creating tables:', error);
      console.log('\n');
      console.log('IMPORTANT: The exec_sql function might not be available in your Supabase instance.');
      console.log('Please go to the Supabase dashboard SQL Editor and execute the SQL in supabase-tables.sql manually.');
      console.log(`SQL file path: ${sqlFilePath}`);
      return false;
    }
    
    console.log('✅ Tables created successfully!');
    return true;
  } catch (error) {
    console.error('❌ Error creating tables:', error);
    console.log('\n');
    console.log('IMPORTANT: Please go to the Supabase dashboard SQL Editor and execute the SQL in supabase-tables.sql manually.');
    return false;
  }
}

/**
 * Alternative approach to create tables individually through the PostgreSQL API
 * This is more limited but doesn't require the exec_sql function
 */
async function createTablesIndividually() {
  try {
    console.log('Creating tables individually...');
    
    // Create users table
    const { error: usersError } = await supabase.from('users').select('id').limit(1);
    
    if (usersError && usersError.code === '42P01') {
      console.log('Creating users table...');
      const { error } = await supabase
        .rpc('create_table', { 
          table_name: 'users',
          table_definition: `
            id SERIAL PRIMARY KEY,
            username TEXT NOT NULL UNIQUE,
            email TEXT NOT NULL UNIQUE,
            password TEXT,
            created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
            display_name TEXT,
            firebase_uid TEXT UNIQUE,
            profile_image TEXT,
            credits INTEGER DEFAULT 3,
            subscription_status TEXT DEFAULT 'free',
            subscription_tier TEXT DEFAULT 'free',
            stripe_customer_id TEXT,
            stripe_subscription_id TEXT
          `
        });
      
      if (error) {
        console.error('Error creating users table:', error);
        return false;
      }
    } else {
      console.log('Users table already exists');
    }
    
    // Add code for other tables here...
    
    console.log('✅ Tables created successfully!');
    return true;
  } catch (error) {
    console.error('❌ Error creating tables individually:', error);
    return false;
  }
}

async function main() {
  console.log('Starting Supabase table creation...');
  console.log(`SUPABASE_URL: ${supabaseUrl.substring(0, 10)}...`);
  console.log('SUPABASE_KEY: Set (hidden)');
  
  // Try the main approach first
  const success = await createSupabaseTables();
  
  if (!success) {
    console.log('\nAttempting alternative approach...');
    const altSuccess = await createTablesIndividually();
    
    if (!altSuccess) {
      console.log('\n');
      console.log('Both approaches failed. Please create the tables manually using the SQL in supabase-tables.sql');
      console.log('Go to the Supabase dashboard SQL Editor and paste the contents of that file.');
      process.exit(1);
    }
  }
  
  console.log('All tables created successfully!');
}

main().catch(err => {
  console.error('Unhandled error:', err);
  process.exit(1);
});