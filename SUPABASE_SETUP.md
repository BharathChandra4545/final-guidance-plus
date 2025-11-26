# Supabase Setup Guide for Guidance Plus

## Step 1: Create Supabase Project

1. Go to [https://supabase.com](https://supabase.com)
2. Sign in or create a free account
3. Click "New Project"
4. Fill in:
   - Project Name: `guidance-plus`
   - Database Password: (choose a strong password)
   - Region: (select closest to your users)
5. Click "Create new project" and wait for setup to complete

## Step 2: Get Your Credentials

1. In your Supabase project dashboard, click on the "Settings" icon (⚙️)
2. Go to "API" section
3. Copy these values:
   - `Project URL` - This is your `SUPABASE_URL`
   - `anon public` key - This is your `SUPABASE_ANON_KEY`

## Step 3: Create Database Tables

1. In your Supabase dashboard, go to "SQL Editor"
2. Click "New query"
3. Copy and paste the SQL schema below
4. Click "Run" to execute

## Database Schema

```sql
-- Create users table
CREATE TABLE users (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  username TEXT UNIQUE NOT NULL,
  password TEXT NOT NULL,
  email TEXT,
  role TEXT NOT NULL CHECK (role IN ('Admin', 'Agent', 'Student', 'RequestedAgent')),
  status TEXT NOT NULL DEFAULT 'pending' CHECK (status IN ('approved', 'pending', 'rejected')),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create courses table
CREATE TABLE courses (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  title TEXT NOT NULL,
  course TEXT NOT NULL,
  link TEXT NOT NULL,
  category TEXT,
  reference_book TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create resources_images table
CREATE TABLE resources_images (
  id TEXT PRIMARY KEY,
  title TEXT NOT NULL,
  type TEXT DEFAULT 'image',
  data TEXT NOT NULL,
  created BIGINT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create resources_pdfs table
CREATE TABLE resources_pdfs (
  id TEXT PRIMARY KEY,
  title TEXT NOT NULL,
  type TEXT DEFAULT 'pdf',
  data TEXT NOT NULL,
  created BIGINT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create resources_links table
CREATE TABLE resources_links (
  id TEXT PRIMARY KEY,
  title TEXT NOT NULL,
  type TEXT DEFAULT 'link',
  data TEXT NOT NULL,
  created BIGINT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create messages table
CREATE TABLE messages (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  to_user TEXT NOT NULL,
  text TEXT NOT NULL,
  time TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create chat table
CREATE TABLE chat (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  from_user TEXT NOT NULL,
  to_user TEXT NOT NULL,
  text TEXT NOT NULL,
  time BIGINT NOT NULL,
  read BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create activity log table
CREATE TABLE activity (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  text TEXT NOT NULL,
  time TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Insert default admin user
INSERT INTO users (username, password, email, role, status)
VALUES ('admin', 'admin123', 'admin@example.com', 'Admin', 'approved');

-- Create indexes for better performance
CREATE INDEX idx_users_username ON users(username);
CREATE INDEX idx_users_role ON users(role);
CREATE INDEX idx_users_status ON users(status);
CREATE INDEX idx_courses_title ON courses(title);
CREATE INDEX idx_chat_from_user ON chat(from_user);
CREATE INDEX idx_chat_to_user ON chat(to_user);
CREATE INDEX idx_activity_time ON activity(time DESC);
```

## Step 4: Set Up Row Level Security (RLS) - Optional

For production, you should enable RLS. For development/testing, you can skip this.

```sql
-- Enable RLS on tables
ALTER TABLE users ENABLE ROW LEVEL SECURITY;
ALTER TABLE courses ENABLE ROW LEVEL SECURITY;
ALTER TABLE chat ENABLE ROW LEVEL SECURITY;
ALTER TABLE activity ENABLE ROW LEVEL SECURITY;
ALTER TABLE messages ENABLE ROW LEVEL SECURITY;
ALTER TABLE resources_images ENABLE ROW LEVEL SECURITY;
ALTER TABLE resources_pdfs ENABLE ROW LEVEL SECURITY;
ALTER TABLE resources_links ENABLE ROW LEVEL SECURITY;

-- Create policies (allow all for now - customize based on your needs)
CREATE POLICY "Allow all operations" ON users FOR ALL USING (true);
CREATE POLICY "Allow all operations" ON courses FOR ALL USING (true);
CREATE POLICY "Allow all operations" ON chat FOR ALL USING (true);
CREATE POLICY "Allow all operations" ON activity FOR ALL USING (true);
CREATE POLICY "Allow all operations" ON messages FOR ALL USING (true);
CREATE POLICY "Allow all operations" ON resources_images FOR ALL USING (true);
CREATE POLICY "Allow all operations" ON resources_pdfs FOR ALL USING (true);
CREATE POLICY "Allow all operations" ON resources_links FOR ALL USING (true);
```

## Step 5: Update Your HTML Files

1. Create a new file called `config.js` in your project root
2. Add your Supabase credentials:

```javascript
// config.js
const SUPABASE_URL = 'YOUR_SUPABASE_URL_HERE';
const SUPABASE_ANON_KEY = 'YOUR_SUPABASE_ANON_KEY_HERE';
```

3. Replace `YOUR_SUPABASE_URL_HERE` and `YOUR_SUPABASE_ANON_KEY_HERE` with your actual credentials from Step 2

## Step 6: Add Supabase CDN Script

Add this script tag in the `<head>` section of ALL your HTML files (index.html, admin.html, agent.html, regester.html):

```html
<script src="https://cdn.jsdelivr.net/npm/@supabase/supabase-js@2"></script>
<script src="config.js"></script>
```

## Step 7: Test Your Setup

1. Open the browser console
2. Run: `console.log(SUPABASE_URL, SUPABASE_ANON_KEY)`
3. Verify your credentials are loaded
4. Try logging in with username: `admin` password: `admin123`

## Next Steps

After completing this setup:
1. Use the updated HTML files (with Supabase integration)
2. All data will now be stored in Supabase instead of localStorage
3. Data will persist across devices and browsers
4. Multiple users can access the same data in real-time

## Troubleshooting

**Issue**: "Invalid API key" error
- Solution: Double-check your SUPABASE_URL and SUPABASE_ANON_KEY in config.js

**Issue**: Tables not found
- Solution: Make sure you ran the SQL schema in Step 3

**Issue**: CORS errors
- Solution: In Supabase dashboard, go to Settings > API > CORS and add your domain

**Issue**: Data not saving
- Solution: Check browser console for errors. Ensure RLS policies allow the operation.

## Security Notes

⚠️ **IMPORTANT**: 
- Never commit `config.js` to a public repository
- Add `config.js` to `.gitignore`
- For production, use environment variables or a secure config management system
- The default admin password should be changed immediately
- Implement proper password hashing (current setup is for demonstration)

## Support

For more information:
- Supabase Documentation: https://supabase.com/docs
- Supabase JavaScript Client: https://supabase.com/docs/reference/javascript
