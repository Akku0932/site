-- Run this in Supabase SQL Editor to fix RLS policies

-- First, drop existing policies if any
DROP POLICY IF EXISTS "Allow anonymous inserts" ON demo_requests;
DROP POLICY IF EXISTS "Allow authenticated users to read" ON demo_requests;

-- Recreate the correct policy for anonymous form submissions
CREATE POLICY "Allow anonymous inserts" ON demo_requests
  FOR INSERT
  TO anon
  WITH CHECK (true);

-- Optional: Allow authenticated users to view submissions
CREATE POLICY "Allow authenticated users to read" ON demo_requests
  FOR SELECT
  TO authenticated
  USING (true);
