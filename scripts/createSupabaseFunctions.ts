import { supabase } from '../server/supabase';

async function createTableFunctions() {
  console.log('Creating SQL functions in Supabase...');

  // Create function to create users table
  const createUsersFunction = `
  CREATE OR REPLACE FUNCTION create_users_table()
  RETURNS void AS $$
  BEGIN
    CREATE TABLE IF NOT EXISTS public.users (
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
    );
  END;
  $$ LANGUAGE plpgsql;
  `;

  // Create function to create sessions table
  const createSessionsFunction = `
  CREATE OR REPLACE FUNCTION create_sessions_table()
  RETURNS void AS $$
  BEGIN
    CREATE TABLE IF NOT EXISTS public.sessions (
      id SERIAL PRIMARY KEY,
      user_id INTEGER NOT NULL REFERENCES users(id) ON DELETE CASCADE,
      token TEXT NOT NULL UNIQUE,
      expires TIMESTAMP WITH TIME ZONE NOT NULL,
      created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
    );
  END;
  $$ LANGUAGE plpgsql;
  `;

  // Create function to create saved_recipes table
  const createRecipesFunction = `
  CREATE OR REPLACE FUNCTION create_saved_recipes_table()
  RETURNS void AS $$
  BEGIN
    CREATE TABLE IF NOT EXISTS public.saved_recipes (
      id SERIAL PRIMARY KEY,
      user_id INTEGER NOT NULL REFERENCES users(id) ON DELETE CASCADE,
      recipe_data JSONB NOT NULL,
      food_name TEXT NOT NULL,
      description TEXT,
      image_url TEXT,
      favorite BOOLEAN DEFAULT false,
      tags TEXT[],
      created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
    );
  END;
  $$ LANGUAGE plpgsql;
  `;

  // Create function to create chat_messages table
  const createMessagesFunction = `
  CREATE OR REPLACE FUNCTION create_chat_messages_table()
  RETURNS void AS $$
  BEGIN
    CREATE TABLE IF NOT EXISTS public.chat_messages (
      id SERIAL PRIMARY KEY,
      user_id INTEGER NOT NULL REFERENCES users(id) ON DELETE CASCADE,
      content TEXT NOT NULL,
      conversation_id TEXT NOT NULL,
      role TEXT NOT NULL,
      created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
    );
  END;
  $$ LANGUAGE plpgsql;
  `;

  try {
    // Create functions
    console.log('Creating create_users_table function...');
    const { error: usersError } = await supabase.rpc('exec_sql', { sql: createUsersFunction });
    if (usersError) {
      console.error('Error creating users function:', usersError);
    } else {
      console.log('✓ Users function created successfully');
    }

    console.log('Creating create_sessions_table function...');
    const { error: sessionsError } = await supabase.rpc('exec_sql', { sql: createSessionsFunction });
    if (sessionsError) {
      console.error('Error creating sessions function:', sessionsError);
    } else {
      console.log('✓ Sessions function created successfully');
    }

    console.log('Creating create_saved_recipes_table function...');
    const { error: recipesError } = await supabase.rpc('exec_sql', { sql: createRecipesFunction });
    if (recipesError) {
      console.error('Error creating recipes function:', recipesError);
    } else {
      console.log('✓ Recipes function created successfully');
    }

    console.log('Creating create_chat_messages_table function...');
    const { error: messagesError } = await supabase.rpc('exec_sql', { sql: createMessagesFunction });
    if (messagesError) {
      console.error('Error creating messages function:', messagesError);
    } else {
      console.log('✓ Messages function created successfully');
    }

    console.log('✓ All functions created successfully!');
  } catch (error) {
    console.error('Error creating functions:', error);
  }
}

async function main() {
  try {
    await createTableFunctions();
    console.log('✅ Supabase functions setup completed successfully!');
    process.exit(0);
  } catch (error) {
    console.error('❌ Supabase functions setup failed:', error);
    process.exit(1);
  }
}

main();