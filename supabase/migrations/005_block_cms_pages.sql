-- Claude Chief — Block CMS
-- Create pages table for block-based content

CREATE TABLE IF NOT EXISTS public.pages (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  title TEXT NOT NULL,
  slug TEXT UNIQUE NOT NULL,
  page_type TEXT NOT NULL DEFAULT 'blog' CHECK (page_type IN ('blog', 'landing', 'resource')),
  status TEXT NOT NULL DEFAULT 'draft' CHECK (status IN ('draft', 'published')),
  excerpt TEXT DEFAULT '',
  meta_title TEXT DEFAULT '',
  meta_description TEXT DEFAULT '',
  og_image TEXT DEFAULT '',
  tags TEXT[] DEFAULT '{}',
  blocks JSONB NOT NULL DEFAULT '[]',
  author TEXT DEFAULT 'Claude Chief Team',
  published_at TIMESTAMPTZ,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

ALTER TABLE public.pages ENABLE ROW LEVEL SECURITY;

-- Public can read published pages
CREATE POLICY "Public read published pages" ON public.pages
  FOR SELECT USING (status = 'published');

-- Public can read all pages (for preview before publishing)
CREATE POLICY "Public read all pages" ON public.pages
  FOR SELECT USING (true);

-- Admin can do everything
CREATE POLICY "Admin insert pages" ON public.pages FOR INSERT WITH CHECK (
  EXISTS (SELECT 1 FROM public.user_profiles WHERE id = auth.uid() AND is_admin = true)
);
CREATE POLICY "Admin update pages" ON public.pages FOR UPDATE USING (
  EXISTS (SELECT 1 FROM public.user_profiles WHERE id = auth.uid() AND is_admin = true)
);
CREATE POLICY "Admin delete pages" ON public.pages FOR DELETE USING (
  EXISTS (SELECT 1 FROM public.user_profiles WHERE id = auth.uid() AND is_admin = true)
);

-- Auto-update updated_at
CREATE OR REPLACE FUNCTION public.handle_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE OR REPLACE TRIGGER pages_updated_at
  BEFORE UPDATE ON public.pages
  FOR EACH ROW EXECUTE FUNCTION public.handle_updated_at();