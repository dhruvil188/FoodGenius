import { supabase } from './supabase';

/**
 * Script to set up Supabase tables
 * Run this script once to create all necessary tables in Supabase
 */
async function setupSupabaseTables() {
  console.log('Setting up Supabase tables...');

  try {
    // Create users table
    console.log('Creating users table...');
    const { error: usersError } = await supabase.from('users').select('id').limit(1).maybeSingle();
    
    if (usersError && usersError.code === '42P01') {
      // Table doesn't exist, create it
      const { error } = await supabase.rpc('create_users_table');
      
      if (error) {
        console.error('Error creating users table:', error);
      } else {
        console.log('✓ Users table created successfully');
      }
    } else {
      console.log('✓ Users table already exists');
    }
    
    // Create sessions table
    console.log('Creating sessions table...');
    const { error: sessionsCheckError } = await supabase.from('sessions').select('id').limit(1).maybeSingle();
    
    if (sessionsCheckError && sessionsCheckError.code === '42P01') {
      // Table doesn't exist, create it
      const { error } = await supabase.rpc('create_sessions_table');
      
      if (error) {
        console.error('Error creating sessions table:', error);
      } else {
        console.log('✓ Sessions table created successfully');
      }
    } else {
      console.log('✓ Sessions table already exists');
    }
    
    // Create saved_recipes table
    console.log('Creating saved_recipes table...');
    const { error: recipesCheckError } = await supabase.from('saved_recipes').select('id').limit(1).maybeSingle();
    
    if (recipesCheckError && recipesCheckError.code === '42P01') {
      // Table doesn't exist, create it
      const { error } = await supabase.rpc('create_saved_recipes_table');
      
      if (error) {
        console.error('Error creating saved_recipes table:', error);
      } else {
        console.log('✓ Saved recipes table created successfully');
      }
    } else {
      console.log('✓ Saved recipes table already exists');
    }
    
    // Create chat_messages table
    console.log('Creating chat_messages table...');
    const { error: messagesCheckError } = await supabase.from('chat_messages').select('id').limit(1).maybeSingle();
    
    if (messagesCheckError && messagesCheckError.code === '42P01') {
      // Table doesn't exist, create it
      const { error } = await supabase.rpc('create_chat_messages_table');
      
      if (error) {
        console.error('Error creating chat_messages table:', error);
      } else {
        console.log('✓ Chat messages table created successfully');
      }
    } else {
      console.log('✓ Chat messages table already exists');
    }
    
    console.log('✓ All tables created successfully!');
    
  } catch (error) {
    console.error('Error setting up Supabase tables:', error);
  }
}

// This is now an ES module, so we don't need the require.main check

export { setupSupabaseTables };