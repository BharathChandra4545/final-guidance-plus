// Supabase Configuration
const SUPABASE_URL = 'https://vvabqfvbeglxqnnshljw.supabase.co';
const SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InZ2YWJxZnZiZWdseHFubnNobGp3Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjQwODk1MzIsImV4cCI6MjA3OTY2NTUzMn0.JNup9WhSi44rse0c_LE0cQMGrAadA4gXEC_6E9iD-vs';

// Initialize Supabase client
const supabase = supabase.createClient(SUPABASE_URL, SUPABASE_ANON_KEY);
