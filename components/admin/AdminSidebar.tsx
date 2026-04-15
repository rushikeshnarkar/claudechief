'use client';

import { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  LayoutDashboard,
  Bookmark,
  Zap,
  Cpu,
  Rocket,
  Users,
  LogOut,
  ChevronLeft,
  Menu,
} from 'lucide-react';

const ADMIN_NAV = [
  { href: '/admin', label: 'Dashboard', icon: LayoutDashboard },
  { href: '/admin/skills', label: 'Skills', icon: Bookmark },
  { href: '/admin/workflows', label: 'Workflows', icon: Zap },
  { href: '/admin/mcps', label: 'MCPs', icon: Cpu },
  { href: '/admin/updates', label: 'Updates', icon: Rocket },
  { href: '/admin/creators', label: 'Creators', icon: Users },
];

export default function AdminSidebar() {
  const pathname = usePathname();
  const [collapsed, setCollapsed] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <>
      {/* Sidebar */}
      <aside
        className={`fixed inset-y-0 left-0 z-50 flex flex-col bg-[#131118] border-r border-[rgba(54,46,40,0.4)] transition-all duration-300 ${
          collapsed ? 'w-[72px]' : 'w-64'
        } ${mobileOpen ? 'translate-x-0' : '-translate-x-full'} lg:translate-x-0`}
      >
        {/* Logo */}
        <div className="flex items-center justify-between h-[72px] px-5 border-b border-[rgba(54,46,40,0.4)]">
          {!collapsed && (
            <Link href="/" className="flex items-center gap-3">
              <div className="relative w-8 h-8 flex-shrink-0">
                <div className="absolute inset-0 bg-[#D97757] rounded-lg overflow-hidden">
                  <div className="absolute top-[3px] right-[3px] w-2.5 h-2.5 bg-[#F5F0EB] rounded-full" />
                  <div className="absolute bottom-[3px] left-[3px] w-2 h-2 bg-[#F5F0EB] rounded-[2px] rotate-12" />
                </div>
              </div>
              <span className="font-display text-base font-bold text-[#F5F0EB] tracking-tight">
                Admin
              </span>
            </Link>
          )}
          <button
            onClick={() => setCollapsed(!collapsed)}
            className="p-2 rounded-lg text-[#6B6158] hover:text-[#F5F0EB] hover:bg-[rgba(54,46,40,0.3)] transition-all"
            aria-label="Toggle sidebar"
          >
            <ChevronLeft className={`w-4 h-4 transition-transform ${collapsed ? 'rotate-180' : ''}`} />
          </button>
        </div>

        {/* Nav */}
        <nav className="flex-1 py-4 px-3 space-y-1 overflow-y-auto">
          {ADMIN_NAV.map(({ href, label, icon: Icon }) => {
            const isActive = pathname === href;
            return (
              <Link
                key={href}
                href={href}
                className={`flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-all ${
                  isActive
                    ? 'bg-[#D97757] text-[#F5F0EB]'
                    : 'text-[#A99E92] hover:text-[#F5F0EB] hover:bg-[rgba(54,46,40,0.3)]'
                } ${collapsed ? 'justify-center' : ''}`}
                title={collapsed ? label : undefined}
              >
                <Icon className="w-5 h-5 flex-shrink-0" />
                {!collapsed && <span>{label}</span>}
              </Link>
            );
          })}
        </nav>

        {/* Bottom */}
        <div className="p-3 border-t border-[rgba(54,46,40,0.4)] space-y-1">
          <Link
            href="/"
            className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium text-[#A99E92] hover:text-[#F5F0EB] hover:bg-[rgba(54,46,40,0.3)] transition-all"
          >
            <LogOut className="w-5 h-5 flex-shrink-0" />
            {!collapsed && <span>Back to site</span>}
          </Link>
        </div>
      </aside>

      {/* Mobile overlay */}
      {mobileOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-40 lg:hidden"
          onClick={() => setMobileOpen(false)}
        />
      )}

      {/* Mobile menu button */}
      <button
        onClick={() => setMobileOpen(true)}
        className="fixed bottom-4 right-4 z-40 p-3 rounded-full bg-[#D97757] text-white shadow-lg lg:hidden"
      >
        <Menu className="w-6 h-6" />
      </button>
    </>
  );
}
