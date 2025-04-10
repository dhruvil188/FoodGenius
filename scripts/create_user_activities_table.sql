CREATE TABLE IF NOT EXISTS user_activities (
  id SERIAL PRIMARY KEY,
  user_id INTEGER NOT NULL REFERENCES users(id),
  activity_type TEXT NOT NULL,
  resource_id TEXT,
  details JSONB,
  credits_cost INTEGER DEFAULT 0,
  credits_remaining INTEGER,
  ip_address TEXT,
  user_agent TEXT,
  created_at TIMESTAMP NOT NULL DEFAULT NOW()
);