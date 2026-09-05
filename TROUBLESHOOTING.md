# Quick Troubleshooting Checklist

## Problem 1: Form Not Working

### Have you completed these Supabase steps?
- [ ] Created Supabase account at https://supabase.com
- [ ] Created a new project
- [ ] Opened SQL Editor
- [ ] Ran this SQL:

```sql
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

ALTER TABLE demo_requests ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Allow anonymous inserts" ON demo_requests
  FOR INSERT
  TO anon
  WITH CHECK (true);
```

**If you haven't done this, the form CANNOT work.** The database table doesn't exist yet.

## Problem 2: Logos Not Switching

The logos might not be loading. Let's check:

### Test in browser console:
1. Open your site
2. Press F12 → Console
3. Type: `CUSTOM_LOGO_LIGHT`
4. Press Enter
5. What do you see?

If it says `null` or `undefined`, the logos aren't loading.

## Quick Fix - Test Right Now

Open browser console on your site and paste this:

```javascript
// Check if Supabase is working
supabase.from('demo_requests').select('*').limit(1).then(result => {
  console.log('Supabase test:', result);
});

// Check if logos loaded
console.log('Light logo:', CUSTOM_LOGO_LIGHT);
console.log('Dark logo:', CUSTOM_LOGO_DARK);
```

**Tell me what errors you see!**
