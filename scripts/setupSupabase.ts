/**
 * Script to set up Supabase tables
 * Run this script once to create all necessary tables in Supabase
 */

import { exec } from 'child_process';
import { promisify } from 'util';

const execPromise = promisify(exec);

async function setupSupabaseTables() {
  console.log('Setting up Supabase tables...');
  
  try {
    // Run the createSupabaseTables.ts script using tsx
    const { stdout, stderr } = await execPromise('npx tsx scripts/createSupabaseTables.ts');
    
    if (stdout) {
      console.log('Setup output:', stdout);
    }
    
    if (stderr) {
      console.error('Setup errors:', stderr);
    }
    
    console.log('✅ Supabase setup completed');
  } catch (error) {
    console.error('Failed to set up Supabase tables:', error);
    throw error;
  }
}

// Run the setup
setupSupabaseTables().catch(err => {
  console.error('Supabase setup failed:', err);
  process.exit(1);
});