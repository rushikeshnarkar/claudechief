-- Claude Chief — Initial Schema
-- Run this in your Supabase SQL Editor

-- ─── ENABLE UUID EXTENSION ───────────────────────────────────────────────────
create extension if not exists "uuid-ossp";

-- ─── USER PROFILES (must come first so other tables can reference it) ─────────
create table if not exists public.user_profiles (
  id uuid references auth.users on delete cascade primary key,
  email text not null,
  is_admin boolean not null default false,
  created_at timestamptz default now()
);

alter table public.user_profiles enable row level security;
create policy "Public read own profile" on public.user_profiles
  for select using (auth.uid() = id);
create policy "Users update own profile" on public.user_profiles
  for update using (auth.uid() = id);

-- Auto-create profile on signup
create or replace function public.handle_new_user()
returns trigger as $$
begin
  insert into public.user_profiles (id, email)
  values (new.id, new.email);
  return new;
end;
$$ language plpgsql security definer;

create or replace trigger on_auth_user_created
  after insert on auth.users
  for each row execute function public.handle_new_user();

-- ─── SKILLS ─────────────────────────────────────────────────────────────────
create table if not exists public.skills (
  id uuid default uuid_generate_v4() primary key,
  title text not null,
  slug text not null unique,
  description text not null default '',
  prompt_preview text not null default '',
  department text not null check (department in (
    'marketing', 'sales', 'design', 'content',
    'founders', 'operations', 'finance', 'research'
  )),
  tier text not null default 'free' check (tier in ('free', 'elite')),
  creator_name text not null default '',
  creator_link text not null default '',
  save_count integer not null default 0,
  source_type text not null default 'github' check (source_type in (
    'youtube', 'github', 'blog', 'twitter', 'website'
  )),
  source_url text not null default '',
  asset_file text,
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);

alter table public.skills enable row level security;
create policy "Public read skills" on public.skills for select using (true);
create policy "Admin insert skills" on public.skills for insert with check (
  exists (select 1 from public.user_profiles where id = auth.uid() and is_admin = true)
);
create policy "Admin update skills" on public.skills for update using (
  exists (select 1 from public.user_profiles where id = auth.uid() and is_admin = true)
);
create policy "Admin delete skills" on public.skills for delete using (
  exists (select 1 from public.user_profiles where id = auth.uid() and is_admin = true)
);

-- ─── WORKFLOWS ──────────────────────────────────────────────────────────────
create table if not exists public.workflows (
  id uuid default uuid_generate_v4() primary key,
  title text not null,
  slug text not null unique,
  description text not null default '',
  steps jsonb not null default '[]',
  tools jsonb not null default '[]',
  time_estimate text not null default '',
  difficulty text not null default 'medium' check (difficulty in ('easy', 'medium', 'advanced')),
  department text not null check (department in (
    'marketing', 'sales', 'design', 'content',
    'founders', 'operations', 'finance', 'research'
  )),
  tier text not null default 'free' check (tier in ('free', 'elite')),
  creator_name text not null default '',
  source_url text not null default '',
  asset_file text,
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);

alter table public.workflows enable row level security;
create policy "Public read workflows" on public.workflows for select using (true);
create policy "Admin insert workflows" on public.workflows for insert with check (
  exists (select 1 from public.user_profiles where id = auth.uid() and is_admin = true)
);
create policy "Admin update workflows" on public.workflows for update using (
  exists (select 1 from public.user_profiles where id = auth.uid() and is_admin = true)
);
create policy "Admin delete workflows" on public.workflows for delete using (
  exists (select 1 from public.user_profiles where id = auth.uid() and is_admin = true)
);

-- ─── MCPS ───────────────────────────────────────────────────────────────────
create table if not exists public.mcps (
  id uuid default uuid_generate_v4() primary key,
  title text not null,
  slug text not null unique,
  connected_service text not null default '',
  setup_difficulty text not null default 'easy' check (setup_difficulty in ('easy', 'medium', 'advanced')),
  use_cases jsonb not null default '[]',
  install_link text not null default '',
  department text not null check (department in (
    'marketing', 'sales', 'design', 'content',
    'founders', 'operations', 'finance', 'research'
  )),
  tier text not null default 'free' check (tier in ('free', 'elite')),
  creator_name text not null default '',
  asset_file text,
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);

alter table public.mcps enable row level security;
create policy "Public read mcps" on public.mcps for select using (true);
create policy "Admin insert mcps" on public.mcps for insert with check (
  exists (select 1 from public.user_profiles where id = auth.uid() and is_admin = true)
);
create policy "Admin update mcps" on public.mcps for update using (
  exists (select 1 from public.user_profiles where id = auth.uid() and is_admin = true)
);
create policy "Admin delete mcps" on public.mcps for delete using (
  exists (select 1 from public.user_profiles where id = auth.uid() and is_admin = true)
);

-- ─── UPDATES ────────────────────────────────────────────────────────────────
create table if not exists public.updates (
  id uuid default uuid_generate_v4() primary key,
  title text not null,
  slug text not null unique,
  date date not null,
  update_type text not null default 'feature' check (update_type in ('model', 'api', 'feature', 'announcement')),
  impact_level text not null default 'medium' check (impact_level in ('high', 'medium', 'low')),
  summary text not null default '',
  source_link text not null default '',
  created_at timestamptz default now()
);

alter table public.updates enable row level security;
create policy "Public read updates" on public.updates for select using (true);
create policy "Admin insert updates" on public.updates for insert with check (
  exists (select 1 from public.user_profiles where id = auth.uid() and is_admin = true)
);
create policy "Admin update updates" on public.updates for update using (
  exists (select 1 from public.user_profiles where id = auth.uid() and is_admin = true)
);
create policy "Admin delete updates" on public.updates for delete using (
  exists (select 1 from public.user_profiles where id = auth.uid() and is_admin = true)
);

-- ─── CREATORS ──────────────────────────────────────────────────────────────
create table if not exists public.creators (
  id uuid default uuid_generate_v4() primary key,
  name text not null,
  slug text not null unique,
  platform text not null default 'twitter' check (platform in (
    'twitter', 'youtube', 'github', 'blog', 'linkedin', 'newsletter'
  )),
  focus_area text not null default '',
  best_resources jsonb not null default '[]',
  follower_count integer not null default 0,
  profile_url text not null default '',
  created_at timestamptz default now()
);

alter table public.creators enable row level security;
create policy "Public read creators" on public.creators for select using (true);
create policy "Admin insert creators" on public.creators for insert with check (
  exists (select 1 from public.user_profiles where id = auth.uid() and is_admin = true)
);
create policy "Admin update creators" on public.creators for update using (
  exists (select 1 from public.user_profiles where id = auth.uid() and is_admin = true)
);
create policy "Admin delete creators" on public.creators for delete using (
  exists (select 1 from public.user_profiles where id = auth.uid() and is_admin = true)
);

-- ─── SEED DATA ─────────────────────────────────────────────────────────────
insert into public.skills (title, slug, description, prompt_preview, department, tier, creator_name, creator_link, save_count, source_type, source_url) values
(
  'LinkedIn Content System',
  'linkedin-content-system',
  'A comprehensive prompt system for creating engaging LinkedIn content with Claude. Generate viral posts in minutes with this battle-tested framework used by 1,200+ professionals.',
  'Create a LinkedIn post about [TOPIC] that follows this structure:\n\n1. Hook — First line that stops the scroll (use curiosity or a bold statement)\n2. Body — 3-4 key points with specific examples\n3. Call to Action — Engage readers with a question or prompt\n\nTone: [CONVERSATIONAL / PROFESSIONAL / THOUGHT-PROVOKING]\nTarget audience: [YOUR IDEAL FOLLOWER]\nLength: 150-300 words\nFormat: Plain text, no emojis in the main post',
  'marketing',
  'free',
  'Alex Chen',
  'https://twitter.com/alexchen',
  1247,
  'github',
  'https://github.com/alexchen/claude-linkedin'
),
(
  'Cold Email Writer Pro',
  'cold-email-writer',
  'A proven cold email framework for booking more meetings. Used by SDRs and founders to generate consistent reply rates.',
  'Write a cold email for [PRODUCT/SERVICE] targeting [IDEAL CUSTOMER PROFILE]. The email should:\n\n1. Open with a specific observation about their business\n2. Show you understand their main challenge\n3. Present a brief case study or data point\n4. End with a specific, low-commitment ask\n\nTone: Professional but conversational\nLength: Under 150 words',
  'sales',
  'free',
  'Alex Chen',
  'https://twitter.com/alexchen',
  892,
  'github',
  'https://github.com/alexchen/cold-email'
),
(
  'Pitch Deck Generator',
  'pitch-deck-generator',
  'Generate a compelling pitch deck for angel or VC investors. Takes your company info and produces slides that tell a clear, persuasive story.',
  'Create a pitch deck outline for [COMPANY NAME]:\n\n- Problem: [DESCRIBE THE PROBLEM]\n- Solution: [YOUR SOLUTION]\n- Market size: [TAM/SAM/SOM]\n- Business model: [HOW YOU MAKE MONEY]\n- Traction: [CURRENT METRICS]\n- Team: [KEY TEAM MEMBERS]\n- Ask: [HOW MUCH YOU''RE RAISING AND WHY]\n\nTone: Confident, data-driven, compelling\nInclude: Key metrics, milestones, competitive positioning',
  'founders',
  'elite',
  'Sarah Mitchell',
  'https://youtube.com/@sarahmitchell',
  2341,
  'youtube',
  'https://youtube.com/watch?v=example'
)
on conflict (slug) do nothing;

insert into public.workflows (title, slug, description, steps, tools, time_estimate, difficulty, department, tier, creator_name, source_url) values
(
  'Automated Content Pipeline',
  'automated-content',
  'A complete workflow for generating, editing, and publishing content automatically using Claude + Notion. Save 5+ hours per week.',
  '["Define your content calendar in Notion with topic, platform, and publish date.","Create a reusable Claude prompt template for platform-specific content.","Connect Notion to Claude via Zapier webhook for automated triggers.","Route generated content back to Notion for human review.","Push approved content to Buffer for scheduled publishing."]'::jsonb,
  '["Claude","Notion","Buffer","Zapier"]'::jsonb,
  '30 minutes to set up, then fully automated',
  'medium',
  'content',
  'free',
  'Sarah Mitchell',
  'https://github.com/sarahmitchell/content-pipeline'
),
(
  'Lead Qualification Funnel',
  'lead-qualification-funnel',
  'Automatically score and qualify leads based on engagement data. Integrate with your CRM for seamless workflow. Used by 200+ sales teams.',
  '["Export CRM data with all engagement metrics from HubSpot.","Run Claude scoring analysis to assign lead scores based on patterns.","Segment leads as Hot, Warm, or Cold based on Claude''s analysis.","Route high-scoring leads to your sales team''s priority queue."]'::jsonb,
  '["Claude","HubSpot","Zapier","Google Sheets"]'::jsonb,
  '1 hour to set up, ongoing automation',
  'advanced',
  'sales',
  'free',
  'David Kim',
  'https://github.com/davidkim/lead-funnel'
)
on conflict (slug) do nothing;

insert into public.mcps (title, slug, connected_service, setup_difficulty, use_cases, install_link, department, tier, creator_name) values
(
  'Filesystem MCP',
  'filesystem',
  'Local System',
  'easy',
  '["Read and write code files","Generate documentation","Batch rename and organize files","Search file contents"]'::jsonb,
  'https://github.com/modelcontextprotocol/servers/tree/main/src/filesystem',
  'research',
  'free',
  'Marcus Rodriguez'
),
(
  'GitHub MCP',
  'github',
  'GitHub',
  'medium',
  '["Review pull requests","Manage issues","Search codebases","Automate repo tasks"]'::jsonb,
  'https://github.com/modelcontextprotocol/servers/tree/main/src/github',
  'research',
  'free',
  'Anthropic'
),
(
  'Sequential Thinking MCP',
  'sequential-thinking',
  'Anthropic',
  'easy',
  '["Complex problem solving","Research analysis","Multi-step planning","Decision frameworks"]'::jsonb,
  'https://github.com/modelcontextprotocol/servers/tree/main/src/sequential-thinking',
  'research',
  'free',
  'Anthropic'
)
on conflict (slug) do nothing;

insert into public.updates (title, slug, date, update_type, impact_level, summary, source_link) values
(
  'Claude 3.7 Sonnet Released',
  'claude-3-7-sonnet',
  '2026-04-10',
  'model',
  'high',
  'Claude 3.7 Sonnet introduces extended thinking with up to 128K token context for complex reasoning tasks. Coding performance improved by 15%. The new model can think through problems step-by-step before responding.',
  'https://anthropic.com/news/claude-3-7-sonnet'
),
(
  'MCP SDK v2.0 Launch',
  'mcp-sdk-v2',
  '2026-03-28',
  'feature',
  'medium',
  'The new SDK includes TypeScript support, WebSocket transport, and improved debugging tools for MCP server developers. Setup time reduced from hours to minutes.',
  'https://anthropic.com/docs/mcp/sdk-v2'
),
(
  'Claude for Business Announcement',
  'claude-for-business',
  '2026-02-20',
  'announcement',
  'high',
  'Claude for Business includes team management, analytics dashboard, custom model fine-tuning, and priority support. SSO with SAML 2.0, audit logs, and data residency options.',
  'https://anthropic.com/claude-for-business'
)
on conflict (slug) do nothing;

insert into public.creators (name, slug, platform, focus_area, best_resources, follower_count, profile_url) values
(
  'Alex Chen',
  'alex-chen',
  'twitter',
  'Claude Skills & Workflows',
  '["LinkedIn Content System","Cold Email Writer Pro"]'::jsonb,
  45000,
  'https://twitter.com/alexchen'
),
(
  'Sarah Mitchell',
  'sarah-mitchell',
  'youtube',
  'Claude for Business',
  '["Automated Content Pipeline","Pitch Deck Generator"]'::jsonb,
  28000,
  'https://youtube.com/@sarahmitchell'
),
(
  'Marcus Rodriguez',
  'marcus-rodriguez',
  'github',
  'Developer Tools & MCPs',
  '["Filesystem MCP","GitHub MCP","Slack MCP"]'::jsonb,
  12000,
  'https://github.com/marcusrodriguez'
)
on conflict (slug) do nothing;