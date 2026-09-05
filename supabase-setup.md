# Supabase Setup Guide for Kordexflow

## Step 1: Create Supabase Project

1. Go to https://supabase.com and sign up/log in
2. Click "New Project"
3. Fill in:
   - **Name**: Kordexflow
   - **Database Password**: (choose a strong password)
   - **Region**: Choose closest to your users
4. Click "Create new project" (takes ~2 minutes)

## Step 2: Create Database Table

1. In your Supabase dashboard, go to **SQL Editor**
2. Click "New Query"
3. Copy and paste this SQL:

```sql
-- Create demo_requests table
CREATE TABLE demo_requests (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  company TEXT NOT NULL,
  email TEXT NOT NULL,
  phone TEXT,
  business_type TEXT NOT NULL,
  call_volume TEXT NOT NULL,
  automation_goals TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc', NOW()),
  status TEXT DEFAULT 'pending'
);

-- Add index for faster queries
CREATE INDEX idx_demo_requests_created_at ON demo_requests(created_at DESC);
CREATE INDEX idx_demo_requests_email ON demo_requests(email);

-- Enable Row Level Security (RLS)
ALTER TABLE demo_requests ENABLE ROW LEVEL SECURITY;

-- Create policy to allow anonymous inserts (for form submissions)
CREATE POLICY "Allow anonymous inserts" ON demo_requests
  FOR INSERT
  TO anon
  WITH CHECK (true);

-- Create policy to allow authenticated users to read all records
CREATE POLICY "Allow authenticated users to read" ON demo_requests
  FOR SELECT
  TO authenticated
  USING (true);

-- Optional: Add comment
COMMENT ON TABLE demo_requests IS 'Stores demo request submissions from the website';
```

4. Click "Run" or press Cmd/Ctrl + Enter

## Step 3: Get Your API Credentials

1. In Supabase dashboard, go to **Project Settings** (gear icon in sidebar)
2. Click **API** in the left menu
3. Copy these two values:
   - **Project URL** (under "Project API URL")
   - **anon public** key (under "Project API keys")

## Step 4: Update Your Website

1. Open `index.html`
2. Find this section near the top of the JavaScript:

```javascript
const SUPABASE_URL = 'YOUR_SUPABASE_PROJECT_URL';
const SUPABASE_ANON_KEY = 'YOUR_SUPABASE_ANON_KEY';
```

3. Replace with your actual values:

```javascript
const SUPABASE_URL = 'https://xxxxxxxxxxxxx.supabase.co';
const SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...';
```

## Step 5: Test the Form

1. Open your website locally or on Vercel
2. Scroll to the "Book a Demo" section
3. Fill out the form and submit
4. Go back to Supabase dashboard → **Table Editor** → `demo_requests`
5. You should see your test submission!

## Step 6: View Submissions

To view form submissions, you have several options:

### Option A: Supabase Dashboard
1. Go to **Table Editor** in your Supabase dashboard
2. Click on `demo_requests` table
3. View all submissions with filtering and search

### Option B: Export to CSV
1. In Table Editor, click the "..." menu
2. Select "Export to CSV"

### Option C: Create Admin Panel (Advanced)
You can build a simple admin panel to view submissions:
- Use Supabase Auth for login
- Query the `demo_requests` table
- Display in a dashboard

## Email Notifications (Optional)

To get email notifications when someone submits the form:

1. Go to **Database** → **Webhooks** in Supabase
2. Create a new webhook that triggers on INSERT to `demo_requests`
3. Use services like:
   - **Zapier** to send emails
   - **Make.com** (formerly Integromat)
   - **n8n** for custom workflows
   - Or write a simple serverless function

## Security Notes

✅ **RLS is enabled** - Only anonymous users can INSERT, authenticated users can SELECT
✅ **anon key is safe to expose** - It's meant for client-side use
✅ **No sensitive data** - The form doesn't collect passwords or payment info

## Troubleshooting

### Error: "Failed to insert"
- Check that your Supabase URL and anon key are correct
- Verify the table name is `demo_requests` (lowercase)
- Check browser console for detailed error messages

### Error: "new row violates row-level security"
- Make sure you ran the RLS policy SQL
- Verify the "Allow anonymous inserts" policy exists

### Form submits but no data in Supabase
- Open browser DevTools → Network tab
- Submit the form
- Look for a request to Supabase
- Check if there's an error response

## Next Steps

Once working, consider:
- Setting up email notifications
- Creating an admin dashboard to manage leads
- Integrating with your CRM (Salesforce, HubSpot, etc.)
- Adding spam protection (hCaptcha, reCAPTCHA)
- Setting up automated follow-up emails

---

Need help? Check the [Supabase Documentation](https://supabase.com/docs) or contact support.
