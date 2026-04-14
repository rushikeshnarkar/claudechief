# Supabase Setup Guide for Claude Chief

## Step 1: Create a Supabase Project

1. Go to [supabase.com](https://supabase.com) and create an account (or sign in)
2. Click **"New Project"**
3. Give it a name like `claude-chief`
4. Choose a region closest to your users
5. Set a strong database password — **save it somewhere safe**
6. Wait for the project to be created (~2 minutes)

## Step 2: Get Your API Keys

1. In your Supabase dashboard, go to **Settings → API**
2. Copy the following values:

### For your `.env.local` file:

```
NEXT_PUBLIC_SUPABASE_URL=https://your-project-ref.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-public-key
SUPABASE_SERVICE_ROLE_KEY=your-service-role-key (keep this secret!)
```

Find these under:
- **Project URL** → `NEXT_PUBLIC_SUPABASE_URL`
- **anon/public** key → `NEXT_PUBLIC_SUPABASE_ANON_KEY`
- **service_role** key → `SUPABASE_SERVICE_ROLE_KEY`

## Step 3: Run the Database Migration

1. In Supabase dashboard, go to **SQL Editor** (left sidebar)
2. Click **"New query"**
3. Copy the entire contents of `supabase/migrations/001_initial_schema.sql`
4. Paste it into the SQL editor
5. Click **"Run"** (or press Cmd+Enter)

This will:
- Create all 5 content tables (skills, workflows, mcps, updates, creators)
- Set up Row Level Security (RLS) policies
- Auto-create user profiles on signup
- Seed sample data (3 skills, 2 workflows, 3 MCPs, 3 updates, 3 creators)

## Step 4: Set Yourself as Admin

After running the migration and signing up:

1. In Supabase dashboard, go to **Table Editor → user_profiles**
2. Find your user row
3. Set `is_admin` to `true`

Or run this SQL (replace `your@email.com` with your signup email):

```sql
UPDATE public.user_profiles
SET is_admin = true
WHERE email = 'your@email.com';
```

## Step 5: Enable Email Auth (Optional)

1. Go to **Authentication → Providers**
2. Enable **Email** if not already enabled
3. Optionally enable **Google** or **GitHub** OAuth for easier sign-in

## Step 6: Verify Setup

1. Start your dev server: `npm run dev`
2. Visit `http://localhost:3000/admin` — you should be able to sign in
3. Check that data loads on the homepage

## Troubleshooting

### "Supabase client not initialized"
- Make sure your `.env.local` file exists and has the correct keys
- Restart your dev server after updating `.env.local`

### "Unauthorized" on admin routes
- Make sure you've set `is_admin = true` in your user_profiles table

### Build fails with missing env vars
- Add dummy values to `.env.local` for local development
- Real values are set in Netlify environment variables
