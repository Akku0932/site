# Supabase Security - Best Practices

## Understanding Supabase Keys

### The `anon` key IS safe to expose publicly ✅

Supabase has two types of keys:

1. **`anon` (public) key** - Safe for client-side code
   - Protected by Row Level Security (RLS)
   - Can only do what your RLS policies allow
   - **Designed to be in your frontend code**

2. **`service_role` key** - NEVER expose ⚠️
   - Bypasses all RLS policies
   - Full database access
   - Must stay server-side only

## Your Current Setup

Your current implementation **is actually secure** because:
- ✅ You're using the `anon` key (not service_role)
- ✅ RLS policies restrict what it can do
- ✅ Only allows INSERT on demo_requests
- ✅ This is the standard Supabase pattern

## If You Still Want Extra Security

While not necessary, here are options:

### Option 1: Vercel Serverless Function (Recommended)

Create an API endpoint that hides your keys:

**File: `/api/submit-demo.js`**
```javascript
import { createClient } from '@supabase/supabase-js'

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' })
  }

  const supabase = createClient(
    process.env.SUPABASE_URL,
    process.env.SUPABASE_ANON_KEY
  )

  const { data, error } = await supabase
    .from('demo_requests')
    .insert([req.body])

  if (error) {
    return res.status(400).json({ error: error.message })
  }

  res.status(200).json({ success: true })
}
```

**Then update your form to call this endpoint instead.**

### Option 2: Use Vercel Environment Variables

1. Go to Vercel Dashboard → Your Project → Settings → Environment Variables
2. Add:
   - `SUPABASE_URL` = your_url
   - `SUPABASE_ANON_KEY` = your_key
3. These stay server-side

### Option 3: Accept Current Setup (Easiest)

The `anon` key is meant to be public. Even the official Supabase docs show it in frontend code.

**From Supabase Documentation:**
> "The anon key is safe to use in a browser if you have Row Level Security enabled."

## My Recommendation

**For your use case**: Keep it as-is. The current setup is secure.

**Reasons:**
1. You're only allowing form submissions (INSERT)
2. No sensitive data is exposed
3. RLS prevents abuse
4. Standard Supabase pattern
5. Simpler to maintain

**Only upgrade to serverless function if:**
- You're handling payments
- Storing truly sensitive data
- Need rate limiting
- Want centralized validation

## Rate Limiting (Optional Enhancement)

If you're worried about spam/abuse, add this to your RLS policy:

```sql
-- Limit to 5 submissions per email per day
CREATE POLICY "Rate limit submissions" ON demo_requests
  FOR INSERT
  TO anon
  WITH CHECK (
    (SELECT COUNT(*) FROM demo_requests 
     WHERE email = NEW.email 
     AND created_at > NOW() - INTERVAL '24 hours') < 5
  );
```

---

**Bottom Line:** Your current implementation is secure. The anon key is designed to be public when paired with RLS. Don't overthink it! 🎯
