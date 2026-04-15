import Link from 'next/link';
import { Bookmark, Zap, Cpu, Users, ArrowRight, TrendingUp, Eye, Download, Plus } from 'lucide-react';
import { createClient } from '@/lib/supabase/server';

export default async function AdminDashboard() {
  const supabase = await createClient();

  // Fetch real counts from all tables in parallel
  const [skillsCount, workflowsCount, mcpsCount, creatorsCount] = await Promise.all([
    supabase.from('skills').select('id', { count: 'exact', head: true }),
    supabase.from('workflows').select('id', { count: 'exact', head: true }),
    supabase.from('mcps').select('id', { count: 'exact', head: true }),
    supabase.from('creators').select('id', { count: 'exact', head: true }),
  ]);

  // Fetch top performing items (by save_count)
  const { data: topSkills } = await supabase
    .from('skills')
    .select('title, save_count')
    .order('save_count', { ascending: false })
    .limit(5);

  const { data: topWorkflows } = await supabase
    .from('workflows')
    .select('title, save_count')
    .order('save_count', { ascending: false })
    .limit(3);

  const { data: topMcps } = await supabase
    .from('mcps')
    .select('title, save_count')
    .order('save_count', { ascending: false })
    .limit(2);

  // Combine top performers
  const topItems = [
    ...(topSkills ?? []).map(s => ({ title: s.title, saves: s.save_count ?? 0, type: 'skill', href: `/skills` })),
    ...(topWorkflows ?? []).map(w => ({ title: w.title, saves: w.save_count ?? 0, type: 'workflow', href: `/workflows` })),
    ...(topMcps ?? []).map(m => ({ title: m.title, saves: m.save_count ?? 0, type: 'mcp', href: `/mcps` })),
  ]
    .sort((a, b) => b.saves - a.saves)
    .slice(0, 5);

  // Fetch recent items from each table
  const [{ data: recentSkills }, { data: recentWorkflows }, { data: recentMcps }, { data: recentCreators }, { data: recentUpdates }] = await Promise.all([
    supabase.from('skills').select('title, created_at').order('created_at', { ascending: false }).limit(3),
    supabase.from('workflows').select('title, created_at').order('created_at', { ascending: false }).limit(2),
    supabase.from('mcps').select('title, created_at').order('created_at', { ascending: false }).limit(2),
    supabase.from('creators').select('name as title, created_at').order('created_at', { ascending: false }).limit(2),
    supabase.from('updates').select('title, created_at').order('created_at', { ascending: false }).limit(2),
  ]);

  const recentActivity = [
    ...(recentSkills ?? []).map((s: any) => ({ type: 'skill', title: s.title, action: 'Added', time: s.created_at })),
    ...(recentWorkflows ?? []).map((w: any) => ({ type: 'workflow', title: w.title, action: 'Added', time: w.created_at })),
    ...(recentMcps ?? []).map((m: any) => ({ type: 'mcp', title: m.title, action: 'Added', time: m.created_at })),
    ...(recentCreators ?? []).map((c: any) => ({ type: 'creator', title: c.title, action: 'Added', time: c.created_at })),
    ...(recentUpdates ?? []).map((u: any) => ({ type: 'update', title: u.title, action: 'Published', time: u.created_at })),
  ]
    .sort((a: any, b: any) => new Date(b.time).getTime() - new Date(a.time).getTime())
    .slice(0, 5)
    .map((item: any) => ({
      ...item,
      time: formatRelativeTime(item.time),
    }));

  const stats = [
    { label: 'Skills', value: skillsCount.count ?? 0, icon: Bookmark, color: '#D97757', href: '/admin/skills' },
    { label: 'Workflows', value: workflowsCount.count ?? 0, icon: Zap, color: '#6A9BCC', href: '/admin/workflows' },
    { label: 'MCPs', value: mcpsCount.count ?? 0, icon: Cpu, color: '#4ADE80', href: '/admin/mcps' },
    { label: 'Creators', value: creatorsCount.count ?? 0, icon: Users, color: '#C9862A', href: '/admin/creators' },
  ];

  return (
    <div className="space-y-8">
      {/* Welcome */}
      <div>
        <h2 className="font-display text-2xl font-bold text-[#F5F0EB] tracking-tight mb-1">
          Welcome back
        </h2>
        <p className="text-[#6B6158] text-sm">Here&apos;s what&apos;s happening with Claude Chief today.</p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((stat) => {
          const Icon = stat.icon;
          return (
            <div
              key={stat.label}
              className="relative p-5 bg-[rgba(19,17,24,0.88)] border border-[rgba(54,46,40,0.5)] rounded-xl hover:border-[#D97757]/30 transition-all"
            >
              <div className="flex items-start justify-between mb-4">
                <div className="w-10 h-10 rounded-lg flex items-center justify-center" style={{ background: `${stat.color}18` }}>
                  <Icon className="w-5 h-5" style={{ color: stat.color }} />
                </div>
                <Link href={stat.href} className="text-[#6B6158] hover:text-[#D97757] transition-colors">
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
              <div className="font-display text-2xl font-bold text-[#F5F0EB] mb-1">{stat.value.toLocaleString()}</div>
              <div className="text-sm text-[#A99E92]">{stat.label}</div>
            </div>
          );
        })}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Recent Activity */}
        <div className="p-6 bg-[rgba(19,17,24,0.88)] border border-[rgba(54,46,40,0.5)] rounded-xl">
          <div className="flex items-center justify-between mb-6">
            <h3 className="font-display text-lg font-bold text-[#F5F0EB]">Recent activity</h3>
          </div>
          <div className="space-y-4">
            {recentActivity.map((item: any, i: number) => (
              <div key={i} className="flex items-center justify-between gap-4">
                <div className="flex items-center gap-3 min-w-0">
                  <span className={`px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wider rounded border flex-shrink-0 ${
                    item.type === 'skill' ? 'bg-[rgba(217,119,87,0.12)] text-[#D97757] border-[rgba(217,119,87,0.2)]' :
                    item.type === 'workflow' ? 'bg-[rgba(106,155,204,0.12)] text-[#6A9BCC] border-[rgba(106,155,204,0.2)]' :
                    item.type === 'mcp' ? 'bg-[rgba(74,222,128,0.12)] text-[#4ADE80] border-[rgba(74,222,128,0.2)]' :
                    item.type === 'creator' ? 'bg-[rgba(201,134,42,0.12)] text-[#C9862A] border-[rgba(201,134,42,0.2)]' :
                    'bg-[rgba(120,140,93,0.12)] text-[#788C5D] border-[rgba(120,140,93,0.2)]'
                  }`}>
                    {item.type}
                  </span>
                  <span className="text-sm text-[#A99E92] truncate">{item.title}</span>
                </div>
                <div className="flex items-center gap-3 flex-shrink-0">
                  <span className="text-xs text-[#6B6158]">{item.time}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Top Pages */}
        <div className="p-6 bg-[rgba(19,17,24,0.88)] border border-[rgba(54,46,40,0.5)] rounded-xl">
          <div className="flex items-center justify-between mb-6">
            <h3 className="font-display text-lg font-bold text-[#F5F0EB]">Top performing pages</h3>
            <TrendingUp className="w-5 h-5 text-[#4ADE80]" />
          </div>
          <div className="space-y-4">
            {topItems.map((page: any, i: number) => (
              <div key={i} className="flex items-center justify-between gap-4">
                <div className="flex items-center gap-3 min-w-0">
                  <span className="text-[#6B6158] text-sm font-mono w-5 text-right flex-shrink-0">{i + 1}</span>
                  <span className="text-sm text-[#A99E92] truncate">{page.title}</span>
                </div>
                <div className="flex items-center gap-4 text-xs text-[#6B6158] flex-shrink-0">
                  <span className="flex items-center gap-1"><Download className="w-3 h-3" />{page.saves.toLocaleString()}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="p-6 bg-[rgba(19,17,24,0.88)] border border-[rgba(54,46,40,0.5)] rounded-xl">
        <h3 className="font-display text-lg font-bold text-[#F5F0EB] mb-5">Quick actions</h3>
        <div className="grid grid-cols-2 sm:grid-cols-5 gap-3">
          {[
            { label: 'Add Skill', href: '/admin/skills', color: '#D97757' },
            { label: 'Add Workflow', href: '/admin/workflows', color: '#6A9BCC' },
            { label: 'Add MCP', href: '/admin/mcps', color: '#4ADE80' },
            { label: 'Add Update', href: '/admin/updates', color: '#788C5D' },
            { label: 'Add Creator', href: '/admin/creators', color: '#C9862A' },
          ].map(action => (
            <Link
              key={action.label}
              href={action.href}
              className="flex flex-col items-center gap-2 p-4 rounded-xl border border-[rgba(54,46,40,0.5)] hover:border-[#D97757]/40 bg-[#131118]/50 transition-all text-center"
            >
              <div className="w-8 h-8 rounded-lg flex items-center justify-center" style={{ background: `${action.color}18` }}>
                <Plus className="w-4 h-4" style={{ color: action.color }} />
              </div>
              <span className="text-xs text-[#A99E92] font-medium">{action.label}</span>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}

function formatRelativeTime(dateString: string): string {
  const date = new Date(dateString);
  const now = new Date();
  const diffMs = now.getTime() - date.getTime();
  const diffMins = Math.floor(diffMs / 60000);
  const diffHours = Math.floor(diffMins / 60);
  const diffDays = Math.floor(diffHours / 24);

  if (diffMins < 1) return 'just now';
  if (diffMins < 60) return `${diffMins}m ago`;
  if (diffHours < 24) return `${diffHours}h ago`;
  if (diffDays < 7) return `${diffDays}d ago`;
  return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
}
