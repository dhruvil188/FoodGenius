-- SQL script to create all required tables in Supabase
-- Copy and paste this into the Supabase SQL Editor

-- Users table
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

-- Sessions table
CREATE TABLE IF NOT EXISTS public.sessions (
  id SERIAL PRIMARY KEY,
  user_id INTEGER NOT NULL REFERENCES public.users(id) ON DELETE CASCADE,
  token TEXT NOT NULL UNIQUE,
  expires TIMESTAMP WITH TIME ZONE NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Saved Recipes table
CREATE TABLE IF NOT EXISTS public.saved_recipes (
  id SERIAL PRIMARY KEY,
  user_id INTEGER NOT NULL REFERENCES public.users(id) ON DELETE CASCADE,
  recipe_data JSONB NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  food_name TEXT NOT NULL,
  description TEXT,
  image_url TEXT,
  favorite BOOLEAN DEFAULT FALSE,
  tags TEXT[]
);

-- Chat Messages table
CREATE TABLE IF NOT EXISTS public.chat_messages (
  id SERIAL PRIMARY KEY, 
  user_id INTEGER NOT NULL REFERENCES public.users(id) ON DELETE CASCADE,
  content TEXT NOT NULL,
  conversation_id TEXT NOT NULL,
  role TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create a test user (optional - uncomment if needed)
-- INSERT INTO public.users (username, email, display_name, credits)
-- VALUES ('test_user', 'test@example.com', 'Test User', 10)
-- ON CONFLICT (username) DO NOTHING;

-- Set up Row Level Security (RLS) policies
ALTER TABLE public.users ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.sessions ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.saved_recipes ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.chat_messages ENABLE ROW LEVEL SECURITY;

-- Users can only see and update their own data
CREATE POLICY "Users can view own data" ON public.users
  FOR SELECT USING (auth.uid()::text = firebase_uid OR auth.uid() IS NULL);
  
CREATE POLICY "Users can update own data" ON public.users
  FOR UPDATE USING (auth.uid()::text = firebase_uid);

-- Sessions policies
CREATE POLICY "Users can manage their own sessions" ON public.sessions
  FOR ALL USING (
    user_id IN (SELECT id FROM public.users WHERE firebase_uid = auth.uid()::text)
  );

-- Saved recipes policies  
CREATE POLICY "Users can manage their own recipes" ON public.saved_recipes
  FOR ALL USING (
    user_id IN (SELECT id FROM public.users WHERE firebase_uid = auth.uid()::text)
  );

-- Chat messages policies
CREATE POLICY "Users can manage their own messages" ON public.chat_messages
  FOR ALL USING (
    user_id IN (SELECT id FROM public.users WHERE firebase_uid = auth.uid()::text)
  );