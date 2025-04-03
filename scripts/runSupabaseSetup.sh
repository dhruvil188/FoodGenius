#!/bin/bash

# Script to run Supabase setup scripts

echo "Running Supabase scripts..."

# First check connection
echo "Checking Supabase connection..."
npx tsx scripts/checkSupabaseConnection.ts

# If connection check succeeded, set up tables
if [ $? -eq 0 ]; then
  echo "Setting up Supabase tables..."
  npx tsx scripts/setupSupabase.ts
else
  echo "❌ Connection check failed. Please check your Supabase configuration."
  exit 1
fi

echo "✅ Supabase setup complete."