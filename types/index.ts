// ─── CONTENT TYPES ───

export type Department =
  | 'marketing'
  | 'sales'
  | 'design'
  | 'content'
  | 'founders'
  | 'operations'
  | 'finance'
  | 'research';

export type Tier = 'free' | 'elite';

export type SourceType = 'youtube' | 'github' | 'blog' | 'twitter' | 'website';

export type UpdateType = 'model' | 'api' | 'feature' | 'announcement';

export type ImpactLevel = 'high' | 'medium' | 'low';

export type Difficulty = 'easy' | 'medium' | 'advanced';

export type Platform = 'twitter' | 'youtube' | 'github' | 'blog' | 'linkedin' | 'newsletter';

// ─── SKILL ───

export interface Skill {
  id: string;
  title: string;
  slug: string;
  description: string;
  prompt_preview: string;
  department: Department;
  tier: Tier;
  creator_name: string;
  creator_link: string;
  save_count: number;
  source_type: SourceType;
  source_url: string;
  asset_file: string | null;
  created_at: string;
  updated_at: string;
}

export interface SkillFormData {
  title: string;
  description: string;
  prompt_preview: string;
  department: Department;
  tier: Tier;
  creator_name: string;
  creator_link: string;
  source_type: SourceType;
  source_url: string;
}

// ─── WORKFLOW ───

export interface Workflow {
  id: string;
  title: string;
  slug: string;
  description: string;
  steps: string[];
  tools: string[];
  time_estimate: string;
  difficulty: Difficulty;
  department: Department;
  tier: Tier;
  creator_name: string;
  source_url: string;
  asset_file: string | null;
  created_at: string;
  updated_at: string;
}

export interface WorkflowFormData {
  title: string;
  description: string;
  steps: string[];
  tools: string[];
  time_estimate: string;
  difficulty: Difficulty;
  department: Department;
  tier: Tier;
  creator_name: string;
  source_url: string;
}

// ─── MCP ───

export interface MCP {
  id: string;
  title: string;
  slug: string;
  connected_service: string;
  setup_difficulty: Difficulty;
  use_cases: string[];
  install_link: string;
  department: Department;
  tier: Tier;
  creator_name: string;
  asset_file: string | null;
  created_at: string;
  updated_at: string;
}

export interface MCPFormData {
  title: string;
  connected_service: string;
  setup_difficulty: Difficulty;
  use_cases: string[];
  install_link: string;
  department: Department;
  tier: Tier;
  creator_name: string;
}

// ─── UPDATE ───

export interface Update {
  id: string;
  title: string;
  slug: string;
  date: string;
  update_type: UpdateType;
  impact_level: ImpactLevel;
  summary: string;
  source_link: string;
  created_at: string;
}

export interface UpdateFormData {
  title: string;
  date: string;
  update_type: UpdateType;
  impact_level: ImpactLevel;
  summary: string;
  source_link: string;
}

// ─── CREATOR ───

export interface Creator {
  id: string;
  name: string;
  slug: string;
  platform: Platform;
  focus_area: string;
  best_resources: string[];
  follower_count: number;
  profile_url: string;
  created_at: string;
}

export interface CreatorFormData {
  name: string;
  platform: Platform;
  focus_area: string;
  best_resources: string[];
  follower_count: number;
  profile_url: string;
}

// ─── USER ───

export interface UserProfile {
  id: string;
  email: string;
  is_admin: boolean;
  created_at: string;
}

// ─── SEARCH ───

export type ResourceType = 'skills' | 'workflows' | 'mcps' | 'updates' | 'creators';

export interface SearchResult {
  type: ResourceType;
  id: string;
  title: string;
  description: string;
  department: Department;
  tier: Tier;
  slug: string;
  creator_name?: string;
  source_type?: SourceType;
}

// ─── DEPARTMENT ───

export interface DepartmentInfo {
  name: string;
  slug: Department;
  count: number;
  description: string;
}
