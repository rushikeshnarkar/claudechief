-- Claude Chief — Seed Content (25-30 items across all sections)
-- Run this in your Supabase SQL Editor
-- Overwrites existing 3 skills from 001 migration, adds new content

-- ─── SKILLS (10 total: 3 updated, 7 new) ───────────────────────────────────────

insert into public.skills (title, slug, description, prompt_preview, department, tier, creator_name, creator_link, save_count, source_type, source_url) values
-- UPDATED from migration 001
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
on conflict (slug) do update set
  title=excluded.title, description=excluded.description, prompt_preview=excluded.prompt_preview,
  department=excluded.department, tier=excluded.tier, creator_name=excluded.creator_name,
  creator_link=excluded.creator_link, save_count=excluded.save_count,
  source_type=excluded.source_type, source_url=excluded.source_url;

-- NEW SKILLS
insert into public.skills (title, slug, description, prompt_preview, department, tier, creator_name, creator_link, save_count, source_type, source_url) values
(
  'Social Media Content Calendar',
  'social-media-content-calendar',
  'Generate a month-long social media content calendar for any brand. Plan, batch-create, and schedule posts across LinkedIn, Twitter, and Instagram with Claude.',
  'Create a 30-day social media content calendar for [BRAND NAME] targeting [AUDIENCE]. Include:\n\n- 5 posts per week across [PLATFORMS]\n- Content themes: [THEME 1, THEME 2, THEME 3]\n- Post types: educational, engagement, promotional mix\n- Hooks for each platform (character limits: Twitter 280, LinkedIn 3000)\n\nTone: [BRAND VOICE]\nGoal: [FOLLOWERS / ENGAGEMENT / LEADS]',
  'marketing',
  'free',
  'Priya Patel',
  'https://twitter.com/priyapatel',
  654,
  'twitter',
  'https://twitter.com/priyapatel/status/example'
),
(
  'Meeting Notes Summarizer',
  'meeting-notes-summarizer',
  'Transform raw meeting notes into actionable summaries. Extract decisions, owner assignments, deadlines, and next steps from any meeting transcript.',
  'Analyze the following meeting notes and produce a structured summary:\n\nMEETING: [MEETING TITLE]\nATTENDEES: [LIST]\n\nExtract and organize:\n1. Key decisions made\n2. Action items (with owners and deadlines)\n3. Open questions or blockers\n4. Next meeting agenda\n\nFormat as markdown with clear headers.',
  'operations',
  'free',
  'Jordan Lee',
  'https://github.com/jordanlee',
  1203,
  'github',
  'https://github.com/jordanlee/meeting-summarizer'
),
(
  'Competitive Analysis Report',
  'competitive-analysis-report',
  'Generate a comprehensive competitive analysis for any market. Research 5 competitors, compare features, pricing, positioning, and create an actionable strategic brief.',
  'Create a competitive analysis for [YOUR COMPANY] in the [INDUSTRY] space.\n\nCompetitors to analyze: [LIST 3-5 COMPETITORS]\n\nFor each competitor, provide:\n- Product positioning\n- Pricing model\n- Key features and strengths\n- Notable weaknesses\n- Market share estimate\n- Target customer segment\n\nEnd with: How [YOUR COMPANY] can differentiate.',
  'sales',
  'free',
  'Alex Chen',
  'https://twitter.com/alexchen',
  487,
  'github',
  'https://github.com/alexchen/competitive-analysis'
),
(
  'Code Review Assistant',
  'code-review-assistant',
  'A systematic code review prompt that catches bugs, security issues, performance problems, and style violations. Great for teams wanting consistent review standards.',
  'Review the following code for a [LANGUAGE/PROJECT TYPE] project:\n\n```\n[PASTE CODE HERE]\n```\n\nCheck for:\n1. Security vulnerabilities (OWASP Top 10)\n2. Performance issues and bottlenecks\n3. Code style and readability\n4. Error handling completeness\n5. Test coverage gaps\n6. API design quality\n\nProvide a prioritized list of issues with severity levels.',
  'research',
  'free',
  'Marcus Rodriguez',
  'https://github.com/marcusrodriguez',
  1789,
  'github',
  'https://github.com/marcusrodriguez/code-review-assistant'
),
(
  'Financial Report Generator',
  'financial-report-generator',
  'Generate monthly or quarterly financial reports from raw numbers. Includes P&L, cash flow analysis, variance reporting, and executive-ready summaries.',
  'Generate a financial report for [COMPANY NAME] for [MONTH/QUARTER].\n\nKey metrics to include:\n- Revenue: [AMOUNT] (vs prior period: [AMOUNT])\n- Gross margin: [PERCENTAGE]\n- Operating expenses: [BREAKDOWN]\n- Net income: [AMOUNT]\n- Cash position: [AMOUNT]\n\nProduce:\n1. P&L statement\n2. Variance analysis vs budget\n3. Cash flow summary\n4. 3-sentence executive summary\n5. Top 3 concerns and recommendations',
  'finance',
  'elite',
  'Jordan Lee',
  'https://newsletter.example.com/jordanlee',
  342,
  'website',
  'https://newsletter.example.com/financial-reports'
),
(
  'Research Brief Generator',
  'research-brief-generator',
  'Create comprehensive research briefs for any topic. Ideal for market research, product decisions, or academic investigations. Includes source evaluation and hypothesis framing.',
  'Create a research brief on [TOPIC] with the following objectives:\n\n1. Executive summary (2 sentences)\n2. Research questions to answer\n3. Key hypotheses to test\n4. Recommended sources (primary and secondary)\n5. Methods: [SURVEYS / INTERVIEWS / DATA ANALYSIS / LITERATURE REVIEW]\n6. Expected deliverables and timeline\n7. Stakeholders and how they will use findings',
  'research',
  'free',
  'Priya Patel',
  'https://twitter.com/priyapatel',
  891,
  'github',
  'https://github.com/priyapatel/research-brief'
),
(
  'Product Announcement Writer',
  'product-announcement-writer',
  'Write launch-ready product announcements for B2B SaaS products. Includes feature announcements, product updates, and newsletter-style reveals that drive engagement.',
  'Write a product announcement for [PRODUCT NAME] — [FEATURE/UPDATE NAME].\n\nAudience: [TARGET CUSTOMER]\nTone: [EXCITED / THOUGHTFUL / CASUAL]\nPlatform: [BLOG / NEWSLETTER / TWITTER / LINKEDIN]\n\nStructure:\n1. Hook — What problem does this solve?\n2. The reveal — What is it?\n3. How it works (1-2 sentences)\n4. Who it is for\n5. CTA — Try it / Learn more / Join waitlist\n\nLength: [SHORT (300w) / MEDIUM (600w) / LONG (1000w)]',
  'marketing',
  'free',
  'Sarah Mitchell',
  'https://youtube.com/@sarahmitchell',
  567,
  'blog',
  'https://blog.example.com/product-announcements'
)
on conflict (slug) do nothing;

-- ─── WORKFLOWS (6 total) ──────────────────────────────────────────────────────

insert into public.workflows (title, slug, description, steps, tools, time_estimate, difficulty, department, tier, creator_name, source_url) values
-- UPDATED from migration 001
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
on conflict (slug) do update set
  title=excluded.title, description=excluded.description, steps=excluded.steps,
  tools=excluded.tools, time_estimate=excluded.time_estimate, difficulty=excluded.difficulty,
  department=excluded.department, tier=excluded.tier, creator_name=excluded.creator_name,
  source_url=excluded.source_url;

-- NEW WORKFLOWS
insert into public.workflows (title, slug, description, steps, tools, time_estimate, difficulty, department, tier, creator_name, source_url) values
(
  'Customer Onboarding Flow',
  'customer-onboarding-flow',
  'A step-by-step onboarding workflow that welcomes new customers, gathers context, and sets them up for success in the first 7 days.',
  '["Send personalized welcome email with onboarding link.","Collect context via intake form (role, goals, current tools).","Generate personalized setup guide using Claude.","Schedule 15-min kickoff call within 3 days.","Send week-1 check-in with progress template."]'::jsonb,
  '["Claude","Gmail","Notion","Calendly"]'::jsonb,
  '2 hours to set up, saves 1 hour per new customer',
  'easy',
  'operations',
  'free',
  'Jordan Lee',
  'https://github.com/jordanlee/onboarding-flow'
),
(
  'Market Research Workflow',
  'market-research-workflow',
  'Conduct thorough market research in under 2 hours. Research competitors, trends, customer pain points, and emerging opportunities with structured Claude-powered analysis.',
  '["Define research scope: market, competitors, time period.","Gather data from public sources, reports, and social listening.","Use Claude to synthesize findings into key themes.","Generate competitor comparison matrix.","Produce market opportunity report with recommendations."]'::jsonb,
  '["Claude","Google","Notion","Perplexity"]'::jsonb,
  '1-2 hours per research cycle',
  'medium',
  'research',
  'free',
  'Priya Patel',
  'https://github.com/priyapatel/market-research'
),
(
  'SEO Optimization Pipeline',
  'seo-optimization-pipeline',
  'Audit and optimize existing content for SEO performance. Analyze keyword opportunities, improve meta tags, and generate internal linking recommendations.',
  '["Input URL or paste content for SEO analysis.","Claude audits: title tags, meta description, H1/H2 structure, keyword density.","Generate improved meta title and description (under 60 and 160 chars).","Suggest related long-tail keywords and semantic variations.","Create internal linking recommendations from existing site content."]'::jsonb,
  '["Claude","Google Search Console","Ahrefs","Notion"]'::jsonb,
  '15 minutes per piece of content',
  'easy',
  'marketing',
  'free',
  'Alex Chen',
  'https://github.com/alexchen/seo-pipeline'
),
(
  'Sales Playbook Generator',
  'sales-playbook-generator',
  'Build a complete sales playbook for your product in a single session. Includes discovery questions, objection handling, competitive positioning, and closing techniques.',
  '["Input: product overview, target customer profile, pricing.","Claude generates discovery questions for each buying stage.","Write objection handling guide for top 5 objections.","Create competitive battle cards comparing [YOUR PRODUCT] vs [TOP 3 COMPETITORS].","Draft closing techniques and proposal templates."]'::jsonb,
  '["Claude","Google Docs","HubSpot"]'::jsonb,
  '3 hours to build, use forever',
  'medium',
  'sales',
  'elite',
  'David Kim',
  'https://github.com/davidkim/sales-playbook'
)
on conflict (slug) do nothing;

-- ─── MCPS (5 total) ──────────────────────────────────────────────────────────

insert into public.mcps (title, slug, connected_service, setup_difficulty, use_cases, install_link, department, tier, creator_name, description) values
-- UPDATED from migration 001
(
  'Filesystem MCP',
  'filesystem',
  'Local System',
  'easy',
  '["Read and write code files","Generate documentation","Batch rename and organize files","Search file contents"]'::jsonb,
  'https://github.com/modelcontextprotocol/servers/tree/main/src/filesystem',
  'research',
  'free',
  'Marcus Rodriguez',
  'Connect Claude to your local filesystem. Read, write, search, and organize files directly from conversations. Perfect for developers who want Claude to work alongside their codebase.'
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
  'Anthropic',
  'Connect Claude directly to GitHub. Review code, manage issues, search repositories, and automate development workflows without leaving your conversation.'
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
  'Anthropic',
  'Structured thinking tool that helps Claude break down complex problems into sequential steps. Ideal for research, planning, and analysis-heavy workflows.'
)
on conflict (slug) do update set
  title=excluded.title, connected_service=excluded.connected_service,
  setup_difficulty=excluded.setup_difficulty, use_cases=excluded.use_cases,
  install_link=excluded.install_link, department=excluded.department,
  creator_name=excluded.creator_name,
  description=excluded.description;

-- NEW MCPS
insert into public.mcps (title, slug, connected_service, setup_difficulty, use_cases, install_link, department, tier, creator_name, description) values
(
  'Slack MCP',
  'slack',
  'Slack',
  'medium',
  '["Send messages to channels and DMs","Search message history","Create channels and manage members","Trigger workflows from Claude conversations"]'::jsonb,
  'https://github.com/modelcontextprotocol/servers/tree/main/src/slack',
  'operations',
  'free',
  'Marcus Rodriguez',
  'Connect Claude to Slack for team communication automation. Send updates, search history, create channels, and keep your team in sync directly from Claude conversations.'
),
(
  'Browser MCP',
  'browser',
  'Web Browser',
  'medium',
  '["Take screenshots of web pages","Extract content from any URL","Fill and submit web forms","Navigate and interact with websites"]'::jsonb,
  'https://github.com/modelcontextprotocol/servers/tree/main/src/browser',
  'research',
  'free',
  'Anthropic',
  'Give Claude the ability to browse the web. Take screenshots, extract content, fill forms, and navigate websites. Perfect for research, competitive analysis, and automated web tasks.'
)
on conflict (slug) do nothing;

-- ─── UPDATES (5 total) ────────────────────────────────────────────────────────

insert into public.updates (title, slug, date, update_type, impact_level, summary, source_link) values
-- UPDATED from migration 001
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
on conflict (slug) do update set
  title=excluded.title, date=excluded.date, update_type=excluded.update_type,
  impact_level=excluded.impact_level, summary=excluded.summary, source_link=excluded.source_link;

-- NEW UPDATES
insert into public.updates (title, slug, date, update_type, impact_level, summary, source_link) values
(
  'Claude Haiku 4.5 Released',
  'claude-haiku-45',
  '2026-04-05',
  'model',
  'high',
  'Haiku 4.5 brings 40% faster response times and improved instruction following for concise, actionable outputs. Now with native function calling support and expanded context window up to 200K tokens.',
  'https://anthropic.com/news/claude-haiku-45'
),
(
  'Computer Use API Launch',
  'computer-use-api',
  '2026-03-15',
  'api',
  'high',
  'The new Computer Use API allows Claude to interact with desktop applications through a sandboxed environment. Supports macOS, Windows, and Linux. Enables automation of complex multi-app workflows that previously required human intervention.',
  'https://anthropic.com/docs/computer-use'
)
on conflict (slug) do nothing;

-- ─── CREATORS (5 total) ──────────────────────────────────────────────────────

insert into public.creators (name, slug, platform, focus_area, best_resources, follower_count, profile_url) values
-- UPDATED from migration 001
(
  'Alex Chen',
  'alex-chen',
  'twitter',
  'Claude Skills & Workflows',
  '["LinkedIn Content System","Cold Email Writer Pro","SEO Optimization Pipeline"]'::jsonb,
  45000,
  'https://twitter.com/alexchen'
),
(
  'Sarah Mitchell',
  'sarah-mitchell',
  'youtube',
  'Claude for Business',
  '["Pitch Deck Generator","Product Announcement Writer","Automated Content Pipeline"]'::jsonb,
  28000,
  'https://youtube.com/@sarahmitchell'
),
(
  'Marcus Rodriguez',
  'Marcus Rodriguez',
  'github',
  'Developer Tools & MCPs',
  '["Filesystem MCP","GitHub MCP","Slack MCP","Code Review Assistant"]'::jsonb,
  12000,
  'https://github.com/marcusrodriguez'
)
on conflict (slug) do update set
  name=excluded.name, platform=excluded.platform, focus_area=excluded.focus_area,
  best_resources=excluded.best_resources, follower_count=excluded.follower_count,
  profile_url=excluded.profile_url;

-- NEW CREATORS
insert into public.creators (name, slug, platform, focus_area, best_resources, follower_count, profile_url) values
(
  'Priya Patel',
  'priya-patel',
  'twitter',
  'Marketing & Research',
  '["Social Media Content Calendar","Research Brief Generator","Market Research Workflow"]'::jsonb,
  18200,
  'https://twitter.com/priyapatel'
),
(
  'Jordan Lee',
  'jordan-lee',
  'newsletter',
  'Operations & Finance',
  '["Meeting Notes Summarizer","Customer Onboarding Flow","Financial Report Generator"]'::jsonb,
  8900,
  'https://newsletter.example.com/jordanlee'
)
on conflict (slug) do nothing;

-- ─── BLOG POSTS (3 total) ─────────────────────────────────────────────────────

insert into public.pages (title, slug, page_type, status, excerpt, meta_title, meta_description, tags, blocks, author, published_at) values
(
  'Claude Skills vs Workflows: What''s the Difference?',
  'claude-skills-vs-workflows',
  'blog',
  'published',
  'A clear guide explaining what Claude Skills are, how Workflows differ, and when to use each one for maximum productivity.',
  'Claude Skills vs Workflows — What''s the Difference? | Claude Chief',
  'Understand the difference between Claude Skills and Workflows. Learn when to use prompt-based skills versus multi-step automated workflows.',
  '["Claude","Skills","Workflows","Guide"]'::jsonb,
  '[
    {
      "id": "hero-1",
      "type": "hero",
      "content": {
        "headline": "Claude Skills vs Workflows: What''s the Difference?",
        "subheadline": "A clear guide to understanding the two most powerful ways to use Claude in your work.",
        "badge_text": "Beginner Guide"
      }
    },
    {
      "id": "text-1",
      "type": "text",
      "content": {
        "heading": "What is a Claude Skill?",
        "paragraph": "A Claude Skill is a reusable prompt template that you apply to a specific task. Think of it as a trained assistant who knows how to handle one type of job exceptionally well — like writing LinkedIn posts, drafting cold emails, or analyzing code. Skills are fast to use, easy to share, and perfect for repetitive tasks where the output format is consistent."
      }
    },
    {
      "id": "text-2",
      "type": "text",
      "content": {
        "heading": "What is a Claude Workflow?",
        "paragraph": "A Workflow is a multi-step process that chains tools, data sources, and prompts together. Where a Skill writes one LinkedIn post, a Workflow might research trending topics, generate 30 posts, score them for engagement potential, and publish them to Buffer. Workflows automate entire pipelines, not just individual tasks."
      }
    },
    {
      "id": "features-1",
      "type": "feature_grid",
      "content": {
        "section_title": "Skills vs Workflows at a Glance",
        "section_subtitle": "Use this guide to choose the right tool for the job.",
        "columns": 2,
        "items": [
          {"icon": "Zap", "title": "Skills are fast", "description": "One prompt, one output. Ideal for daily use."},
          {"icon": "LayoutGrid", "title": "Workflows automate", "description": "Chain multiple steps and tools together automatically."},
          {"icon": "Star", "title": "Skills are shareable", "description": "Easy to copy, paste, and share as prompts."},
          {"icon": "Code", "title": "Workflows connect", "description": "Integrate with APIs, databases, and external tools."},
          {"icon": "HelpCircle", "title": "Skills need input", "description": "You provide context each time you use one."},
          {"icon": "Zap", "title": "Workflows run unattended", "description": "Once set up, they execute with minimal supervision."}
        ]
      }
    },
    {
      "id": "cta-1",
      "type": "cta_banner",
      "content": {
        "cta_headline": "Ready to explore Claude Chief?",
        "cta_subtext": "Browse hundreds of Skills and Workflows curated by the community.",
        "cta_button_text": "Explore the Directory",
        "cta_button_url": "/skills",
        "cta_theme": "terracotta"
      }
    }
  ]'::jsonb,
  'Claude Chief Team',
  NOW()
),
(
  'Top 10 Claude Skills for Marketing Teams in 2025',
  'top-claude-skills-marketing-2025',
  'blog',
  'published',
  'The best Claude skills every marketing team should be using right now — from content creation to competitive analysis and social media automation.',
  'Top 10 Claude Skills for Marketing Teams in 2025 | Claude Chief',
  'Discover the best Claude skills for marketing teams. From LinkedIn content to SEO optimization and competitor research — save hours every week.',
  '["Claude","Marketing","Skills","Content","SEO"]'::jsonb,
  '[
    {
      "id": "hero-1",
      "type": "hero",
      "content": {
        "headline": "Top 10 Claude Skills for Marketing Teams",
        "subheadline": "The skills that top-performing marketing teams use to create more content, close faster, and outmaneuver competitors.",
        "badge_text": "Marketing Guide"
      }
    },
    {
      "id": "text-1",
      "type": "text",
      "content": {
        "heading": "Why Marketing Teams Need Claude Skills",
        "paragraph": "Marketing is a volume game — more content, more experiments, more iterations. Claude Skills let your team produce more without burning out. Here are the top 10 skills that marketing teams are using right now to 10x their output."
      }
    },
    {
      "id": "features-1",
      "type": "feature_grid",
      "content": {
        "section_title": "The Top 10 Skills",
        "columns": 2,
        "items": [
          {"icon": "LayoutGrid", "title": "LinkedIn Content System", "description": "Generate viral LinkedIn posts in under 5 minutes with a proven framework."},
          {"icon": "Zap", "title": "Cold Email Writer Pro", "description": "Book more meetings with personalized cold emails that actually get responses."},
          {"icon": "Type", "title": "Social Media Calendar", "description": "Plan an entire month of social content across LinkedIn, Twitter, and Instagram."},
          {"icon": "Code", "title": "SEO Optimization Pipeline", "description": "Audit and optimize any piece of content for search performance in minutes."},
          {"icon": "BarChart3", "title": "Competitive Analysis Report", "description": "Research competitors and produce strategic reports without a research team."},
          {"icon": "Star", "title": "Product Announcement Writer", "description": "Write launch-ready announcements for B2B products that drive engagement."},
          {"icon": "Quote", "title": "Content Brief Generator", "description": "Create SEO-optimized content briefs for your writers in one click."},
          {"icon": "HelpCircle", "title": "Campaign Performance Analyzer", "description": "Paste campaign data and get AI-powered insights and recommendations."}
        ]
      }
    },
    {
      "id": "cta-1",
      "type": "cta_banner",
      "content": {
        "cta_headline": "Browse all marketing skills on Claude Chief",
        "cta_subtext": "New skills added weekly by the community.",
        "cta_button_text": "Explore Marketing Skills",
        "cta_button_url": "/skills/marketing",
        "cta_theme": "dark"
      }
    }
  ]'::jsonb,
  'Claude Chief Team',
  NOW()
),
(
  'The Complete Guide to Claude MCPs in 2025',
  'claude-mcp-complete-guide-2025',
  'blog',
  'published',
  'Everything you need to know about Model Context Protocol (MCP) servers — what they are, how to install them, and the best MCPs for every use case.',
  'Complete Guide to Claude MCPs in 2025 | Claude Chief',
  'Learn what Claude MCPs are, how to install them, and which Model Context Protocol servers will supercharge your workflow in 2025.',
  '["Claude","MCPs","Integrations","Developer"]'::jsonb,
  '[
    {
      "id": "hero-1",
      "type": "hero",
      "content": {
        "headline": "The Complete Guide to Claude MCPs",
        "subheadline": "Model Context Protocol servers connect Claude to your tools, data, and workflows. Here is everything you need to know.",
        "badge_text": "Developer Guide"
      }
    },
    {
      "id": "text-1",
      "type": "text",
      "content": {
        "heading": "What is MCP?",
        "paragraph": "MCP (Model Context Protocol) is an open standard developed by Anthropic that lets Claude connect to external tools and data sources. Think of it as a universal adapter — once an MCP server exists for a tool (like GitHub, Slack, or your filesystem), any AI assistant built on MCP can use it. This means you only need to set up an integration once, and it works across every MCP-compatible AI tool."
      }
    },
    {
      "id": "features-1",
      "type": "feature_grid",
      "content": {
        "section_title": "Essential MCPs by Use Case",
        "section_subtitle": "The must-have MCP servers for every professional.",
        "columns": 3,
        "items": [
          {"icon": "Code", "title": "GitHub MCP", "description": "Review PRs, manage issues, and automate development tasks."},
          {"icon": "LayoutGrid", "title": "Filesystem MCP", "description": "Read, write, and search files directly from Claude."},
          {"icon": "Zap", "title": "Slack MCP", "description": "Send messages, search history, and automate team communication."},
          {"icon": "HelpCircle", "title": "Sequential Thinking", "description": "Break down complex problems into structured reasoning steps."},
          {"icon": "BarChart3", "title": "Browser MCP", "description": "Browse the web, take screenshots, and extract content automatically."},
          {"icon": "Type", "title": "Notion MCP", "description": "Read and write to your Notion workspace from any conversation."}
        ]
      }
    },
    {
      "id": "faq-1",
      "type": "faq",
      "content": {
        "section_title": "Common Questions",
        "items": [
          {"question": "Are MCPs free to use?", "answer": "Yes. All official Anthropic MCP servers are free and open source. Third-party MCPs may have their own pricing."},
          {"question": "Do MCPs work with other AI assistants?", "answer": "MCP is an open standard. Any AI assistant built to support it (Claude, GPT, Gemini) can use MCP servers."},
          {"question": "How do I install an MCP?", "answer": "Install the MCP server package, configure it in your Claude Desktop app, and restart. Full instructions are on each MCP''s GitHub page."},
          {"question": "Is MCP secure?", "answer": "Anthropic MCP servers run locally or through authenticated APIs. Always review the permissions an MCP requests before enabling it."}
        ]
      }
    },
    {
      "id": "cta-1",
      "type": "cta_banner",
      "content": {
        "cta_headline": "Browse all MCPs on Claude Chief",
        "cta_subtext": "Curated MCP servers with setup guides and use cases.",
        "cta_button_text": "Explore MCPs",
        "cta_button_url": "/mcps",
        "cta_theme": "terracotta"
      }
    }
  ]'::jsonb,
  'Claude Chief Team',
  NOW()
)
on conflict (slug) do nothing;
