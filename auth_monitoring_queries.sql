-- File: auth_monitoring_queries.sql
-- A collection of helpful queries for monitoring authentication

-- 1. Count all users in the system
SELECT COUNT(*) AS total_users FROM users;

-- 2. Count users by authentication type
SELECT 
  COUNT(*) FILTER (WHERE firebase_uid IS NOT NULL) AS firebase_users,
  COUNT(*) FILTER (WHERE firebase_uid IS NULL) AS regular_users
FROM users;

-- 3. Most recent user registrations
SELECT id, username, email, firebase_uid, created_at 
FROM users 
ORDER BY created_at DESC 
LIMIT 10;

-- 4. Most recent sessions
SELECT s.id, s.user_id, u.username, u.email, s.created_at, s.expires_at 
FROM sessions s
JOIN users u ON s.user_id = u.id
ORDER BY s.created_at DESC
LIMIT 10;

-- 5. Active sessions (not expired)
SELECT s.id, s.user_id, u.username, u.email, s.created_at, s.expires_at 
FROM sessions s
JOIN users u ON s.user_id = u.id
WHERE s.expires_at > NOW()
ORDER BY s.expires_at ASC;

-- 6. Users created today
SELECT id, username, email, firebase_uid, created_at 
FROM users 
WHERE DATE(created_at) = CURRENT_DATE
ORDER BY created_at DESC;

-- 7. User login frequency (sessions per user)
SELECT u.id, u.username, u.email, COUNT(s.id) AS session_count
FROM users u
LEFT JOIN sessions s ON u.id = s.user_id
GROUP BY u.id, u.username, u.email
ORDER BY session_count DESC;

-- 8. Find a specific user by email
-- Replace 'user@example.com' with the actual email
SELECT * FROM users WHERE email = 'user@example.com';

-- 9. Find a specific user by Firebase UID
-- Replace 'firebase_uid_here' with the actual Firebase UID
SELECT * FROM users WHERE firebase_uid = 'firebase_uid_here';

-- 10. Check if a specific token exists and is valid
-- Replace 'token_here' with the actual token
SELECT s.id, s.user_id, u.username, u.email, s.created_at, s.expires_at 
FROM sessions s
JOIN users u ON s.user_id = u.id
WHERE s.token = 'token_here' AND s.expires_at > NOW();