-- Claude Chief — Add Missing Columns
-- Run this in your Supabase SQL Editor

-- Add save_count to workflows table
alter table public.workflows add column if not exists save_count integer not null default 0;

-- Add description and save_count to mcps table
alter table public.mcps add column if not exists description text not null default '';
alter table public.mcps add column if not exists save_count integer not null default 0;

-- Update existing mcps with descriptive text based on connected_service
update public.mcps
set description = 'Connect Claude to ' || connected_service || ' for enhanced capabilities.'
where description = '';

-- Update existing workflows with save counts
update public.workflows set save_count = 1500 where slug = 'automated-content';
update public.workflows set save_count = 982 where slug = 'lead-qualification-funnel';
