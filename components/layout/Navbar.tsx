'use client';

import Link from 'next/link';
import { User, Menu, X } from 'lucide-react';
import { useState } from 'react';
import { usePathname } from 'next/navigation';
import { NAV_LINKS } from '@/lib/constants';
import { CommandPalette } from '@/components/CommandPalette';

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const pathname = usePathname();

  return (
    <header className="sticky top-4 z-50 w-full px-4">
      <nav className="rounded-2xl bg-[rgba(20,18,16,0.85)] backdrop-blur-2xl border border-[var(--color-border)]">
        <div className="container flex items-center justify-between h-16 px-6">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-3 group" aria-label="Claude Chief - Home">
            <div className="w-9 h-9 bg-[var(--color-accent)] rounded-xl relative overflow-hidden flex-shrink-0 transition-transform group-hover:scale-105">
              <div className="absolute w-4 h-4 bg-[var(--color-bg-base)] rounded-sm top-1.5 right-1.5 rotate-12" />
              <div className="absolute w-3 h-3 bg-[var(--color-bg-base)] rounded-full bottom-1.5 left-1.5" />
            </div>
            <span className="font-display text-lg font-bold text-[var(--color-text-primary)] tracking-tight">
              Claude Chief
            </span>
          </Link>

          {/* Desktop Nav Links */}
          <div className="hidden md:flex items-center gap-1">
            {NAV_LINKS.map((link) => {
              const isActive = pathname === link.href || pathname.startsWith(link.href + '/');
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`px-4 py-2 text-sm font-medium rounded-xl transition-all ${
                    isActive
                      ? 'text-[var(--color-text-primary)] bg-[var(--color-accent)]'
                      : 'text-[var(--color-text-secondary)] hover:text-[var(--color-text-primary)] hover:bg-[var(--color-bg-elevated)]'
                  }`}
                >
                  {link.label}
                </Link>
              );
            })}
          </div>

          {/* Right Actions */}
          <div className="flex items-center gap-3">
            {/* Command Palette trigger */}
            <CommandPalette />

            <Link
              href="/sign-in"
              className="hidden sm:inline-flex items-center gap-2 px-5 py-2.5 text-sm font-semibold text-[var(--color-text-primary)] bg-[var(--color-accent)] rounded-xl hover:bg-[var(--color-accent-hover)] transition-all"
            >
              <User className="w-4 h-4" />
              Sign In
            </Link>

            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="p-2.5 rounded-xl text-[var(--color-text-secondary)] hover:text-[var(--color-text-primary)] hover:bg-[var(--color-bg-elevated)] transition-all md:hidden"
              aria-label="Toggle menu"
              aria-expanded={isMenuOpen}
            >
              {isMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="mt-2 rounded-2xl bg-[rgba(20,18,16,0.95)] backdrop-blur-2xl border border-[var(--color-border)] md:hidden">
          <nav className="p-4 flex flex-col gap-1">
            {NAV_LINKS.map((link) => {
              const isActive = pathname === link.href || pathname.startsWith(link.href + '/');
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setIsMenuOpen(false)}
                  className={`px-4 py-3 text-sm font-medium rounded-xl transition-all ${
                    isActive
                      ? 'text-[var(--color-text-primary)] bg-[var(--color-accent)]'
                      : 'text-[var(--color-text-secondary)] hover:text-[var(--color-text-primary)] hover:bg-[var(--color-bg-elevated)]'
                  }`}
                >
                  {link.label}
                </Link>
              );
            })}
            <div className="h-px bg-[var(--color-border)] my-2" />
            <Link
              href="/sign-in"
              onClick={() => setIsMenuOpen(false)}
              className="btn btn-primary w-full"
            >
              <User className="w-4 h-4" />
              Sign In
            </Link>
          </nav>
        </div>
      )}
    </header>
  );
}
