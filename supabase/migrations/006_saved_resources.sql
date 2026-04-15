-- Claude Chief — Add Saved Resources
-- User can save skills/workflows/mcps to their profile

CREATE TABLE IF NOT EXISTS public.saved_resources (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  resource_type TEXT NOT NULL CHECK (resource_type IN ('skill', 'workflow', 'mcp')),
  resource_id UUID NOT NULL,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  UNIQUE(user_id, resource_type, resource_id)
);

ALTER TABLE public.saved_resources ENABLE ROW LEVEL SECURITY;

-- Users can read their own saved resources
CREATE POLICY "Users read own saved" ON public.saved_resources
  FOR SELECT USING (auth.uid() = user_id);

-- Users can insert their own saved resources
CREATE POLICY "Users insert own saved" ON public.saved_resources
  FOR INSERT WITH CHECK (auth.uid() = user_id);

-- Users can delete their own saved resources
CREATE POLICY "Users delete own saved" ON public.saved_resources
  FOR DELETE USING (auth.uid() = user_id);

-- Increment save_count when resource is saved
CREATE OR REPLACE FUNCTION public.increment_save_count()
RETURNS TRIGGER AS $$
BEGIN
  IF NEW.resource_type = 'skill' THEN
    UPDATE public.skills SET save_count = save_count + 1 WHERE id = NEW.resource_id;
  ELSIF NEW.resource_type = 'workflow' THEN
    UPDATE public.workflows SET save_count = save_count + 1 WHERE id = NEW.resource_id;
  ELSIF NEW.resource_type = 'mcp' THEN
    UPDATE public.mcps SET save_count = save_count + 1 WHERE id = NEW.resource_id;
  END IF;
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

CREATE OR REPLACE TRIGGER on_saved_resource_insert
  AFTER INSERT ON public.saved_resources
  FOR EACH ROW EXECUTE FUNCTION public.increment_save_count();

-- Decrement save_count when resource is unsaved
CREATE OR REPLACE FUNCTION public.decrement_save_count()
RETURNS TRIGGER AS $$
BEGIN
  IF OLD.resource_type = 'skill' THEN
    UPDATE public.skills SET save_count = GREATEST(0, save_count - 1) WHERE id = OLD.resource_id;
  ELSIF OLD.resource_type = 'workflow' THEN
    UPDATE public.workflows SET save_count = GREATEST(0, save_count - 1) WHERE id = OLD.resource_id;
  ELSIF OLD.resource_type = 'mcp' THEN
    UPDATE public.mcps SET save_count = GREATEST(0, save_count - 1) WHERE id = OLD.resource_id;
  END IF;
  RETURN OLD;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

CREATE OR REPLACE TRIGGER on_saved_resource_delete
  AFTER DELETE ON public.saved_resources
  FOR EACH ROW EXECUTE FUNCTION public.decrement_save_count();
