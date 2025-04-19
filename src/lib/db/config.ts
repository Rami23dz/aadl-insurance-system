import { createClient } from '@supabase/supabase-js';

// Supabase configuration
const supabaseUrl = 'https://hniqqmcmqwpnkztkfnec.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImhuaXFxbWNtcXdwbmt6dGtmbmVjIiwicm9sZSI6ImFub24iLCJpYXQiOjE2MTYxODMyOTgsImV4cCI6MTkzMTc1OTI5OH0';

// Create Supabase client
export const supabase = createClient(supabaseUrl, supabaseKey);

// Database configuration
export const dbConfig = {
  provider: 'supabase',
  client: supabase,
};

export default dbConfig;
