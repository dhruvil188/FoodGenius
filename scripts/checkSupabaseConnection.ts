/**
 * Script to check Supabase connection status
 * Useful for debugging connection issues
 */
import { supabase } from '../server/supabase';
import { checkSupabaseConnection } from '../server/supabase';

interface TableStatus {
  table: string;
  exists: boolean;
  error: string | null;
}

async function listSupabaseTables(): Promise<TableStatus[]> {
  // Check each table individually
  const tables = ['users', 'sessions', 'saved_recipes', 'chat_messages'];
  const results: TableStatus[] = [];
  
  for (const table of tables) {
    try {
      const { data, error } = await supabase.from(table).select('id').limit(1);
      results.push({
        table,
        exists: !error || error.code !== '42P01',
        error: error ? `${error.code}: ${error.message}` : null
      });
    } catch (err) {
      results.push({
        table,
        exists: false,
        error: `Error checking table: ${err}`
      });
    }
  }
  
  return results;
}

async function main() {
  try {
    console.log('Checking Supabase connection...');
    
    // Hide the majority of the URL and key
    if (process.env.SUPABASE_URL) {
      const url = process.env.SUPABASE_URL;
      const visiblePart = url.substring(0, 10) + '...' + url.substring(url.lastIndexOf('.'));
      console.log(`SUPABASE_URL: ${visiblePart}`);
    } else {
      console.log('SUPABASE_URL: Not set');
    }
    
    console.log(`SUPABASE_KEY: ${process.env.SUPABASE_KEY ? 'Set (hidden)' : 'Not set'}`);
    
    const isConnected = await checkSupabaseConnection();
    
    if (isConnected) {
      console.log('✅ Supabase connection successful');
      
      // List tables by checking each one
      console.log('Checking tables...');
      const tableResults = await listSupabaseTables();
      
      // Display table status
      console.log('Table status:');
      tableResults.forEach(result => {
        console.log(`- ${result.table}: ${result.exists ? '✓ Exists' : '✗ Missing'}`);
        if (result.error && !result.exists) {
          console.log(`  Error: ${result.error}`);
        }
      });
      
      // Summary
      const existingTables = tableResults.filter(t => t.exists).map(t => t.table);
      const missingTables = tableResults.filter(t => !t.exists).map(t => t.table);
      
      console.log('\nSummary:');
      console.log(`Existing tables: ${existingTables.length > 0 ? existingTables.join(', ') : 'None'}`);
      console.log(`Missing tables: ${missingTables.length > 0 ? missingTables.join(', ') : 'None'}`);
      
      if (missingTables.length > 0) {
        console.log('\nTo create missing tables, run: npx tsx scripts/createSupabaseTables.ts');
      }
    } else {
      console.error('❌ Supabase connection failed');
    }
    
    process.exit(isConnected ? 0 : 1);
  } catch (error) {
    console.error('Error checking Supabase connection:', error);
    process.exit(1);
  }
}

main();