// Supabase Configuration for Guidance Plus
// ============================================
// INSTRUCTIONS:
// 1. Create a Supabase account at https://supabase.com
// 2. Create a new project called 'guidance-plus'
// 3. Go to Settings > API and copy your credentials
// 4. Replace the placeholders below with your actual values
// 5. Rename this file from 'config.example.js' to 'config.js'
// 6. NEVER commit config.js to public repository

// Replace with your Supabase Project URL
const SUPABASE_URL = 'https://YOUR-PROJECT-ID.supabase.co';

// Replace with your Supabase anon/public key
const SUPABASE_ANON_KEY = 'YOUR-SUPABASE-ANON-KEY-HERE';

// Initialize Supabase client
const supabase = window.supabase.createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

// Test connection (optional - remove in production)
supabase.from('users').select('count').then(({ data, error }) => {
  if (error) {
    console.error('Supabase connection error:', error.message);
  } else {
    console.log('✅ Supabase connected successfully');
  }
});
