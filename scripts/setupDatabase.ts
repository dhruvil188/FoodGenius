import { setupSupabaseTables } from '../server/setupSupabase';

async function main() {
  console.log('Starting Supabase database setup...');
  
  try {
    await setupSupabaseTables();
    console.log('✅ Database setup completed successfully!');
    process.exit(0);
  } catch (error) {
    console.error('❌ Database setup failed:', error);
    process.exit(1);
  }
}

main();