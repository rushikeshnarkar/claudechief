import Link from 'next/link';
import { Bookmark, Zap, Cpu, Rocket, Users, ArrowRight, TrendingUp, Eye, Download, Plus } from 'lucide-react';

// Mock stats — replace with Supabase queries when connected
const STATS = [
  { label: 'Total Skills', value: '847', change: '+12 this week', icon: Bookmark, color: '#D97757', href: '/admin/skills' },
  { label: 'Workflows', value: '234', change: '+5 this week', icon: Zap, color: '#6A9BCC', href: '/admin/workflows' },
  { label: 'MCPs', value: '156', change: '+8 this week', icon: Cpu, color: '#4ADE80', href: '/admin/mcps' },
  { label: 'Creators', value: '89', change: '+3 this week', icon: Users, color: '#C9862A', href: '/admin/creators' },
];

const RECENT_ACTIVITY = [
  { type: 'skill', title: 'LinkedIn Content System', action: 'Added', time: '2 hours ago' },
  { type: 'workflow', title: 'Lead Qualification Funnel', action: 'Updated', time: '5 hours ago' },
  { type: 'mcp', title: 'Sequential Thinking MCP', action: 'Added', time: '1 day ago' },
  { type: 'creator', title: 'Emily Watson', action: 'Added', time: '2 days ago' },
  { type: 'update', title: 'Claude 3.7 Sonnet Released', action: 'Published', time: '3 days ago' },
];

const TOP_PAGES = [
  { title: 'LinkedIn Content System', views: '12,432', saves: '1,247' },
  { title: 'Sequential Thinking MCP', views: '9,821', saves: '4,102' },
  { title: 'Pitch Deck Generator', views: '7,654', saves: '1,891' },
  { title: 'Cold Email Writer Pro', views: '6,234', saves: '892' },
  { title: 'GitHub MCP', views: '5,891', saves: '2,847' },
];

export default function AdminDashboard() {
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
        {STATS.map((stat) => {
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
              <div className="font-display text-2xl font-bold text-[#F5F0EB] mb-1">{stat.value}</div>
              <div className="text-sm text-[#A99E92]">{stat.label}</div>
              <div className="text-xs text-[#6B6158] mt-1">{stat.change}</div>
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
            {RECENT_ACTIVITY.map((item, i) => (
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
            {TOP_PAGES.map((page, i) => (
              <div key={i} className="flex items-center justify-between gap-4">
                <div className="flex items-center gap-3 min-w-0">
                  <span className="text-[#6B6158] text-sm font-mono w-5 text-right flex-shrink-0">{i + 1}</span>
                  <span className="text-sm text-[#A99E92] truncate">{page.title}</span>
                </div>
                <div className="flex items-center gap-4 text-xs text-[#6B6158] flex-shrink-0">
                  <span className="flex items-center gap-1"><Eye className="w-3 h-3" />{page.views}</span>
                  <span className="flex items-center gap-1"><Download className="w-3 h-3" />{page.saves}</span>
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
