-- Claude Chief — Add creator_link to workflows
-- Run this in your Supabase SQL Editor

-- Add creator_link column to workflows table
alter table public.workflows add column if not exists creator_link text not null default '';
