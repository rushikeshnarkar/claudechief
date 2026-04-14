'use client';

import Link from 'next/link';
import { Search, User, Menu, X } from 'lucide-react';
import { useState } from 'react';
import { NAV_LINKS } from '@/lib/constants';

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);

  return (
    <header
      className="sticky top-0 z-50 w-full border-b border-[var(--color-border)] bg-[var(--color-bg-surface)]/95 backdrop-blur-sm"
      role="banner"
    >
      {/* Main Nav */}
      <nav
        className="container flex items-center justify-between h-16"
        role="navigation"
        aria-label="Main navigation"
      >
        {/* Logo */}
        <Link
          href="/"
          className="flex items-center gap-3 group"
          aria-label="Claude Chief - Home"
        >
          <div className="w-9 h-9 bg-[var(--color-terra)] rounded-xl relative overflow-hidden flex-shrink-0 transition-transform group-hover:scale-105">
            {/* Logo mark - abstract "C" shape */}
            <div className="absolute w-4 h-4 bg-white rounded-full top-1.5 right-1.5" />
            <div className="absolute w-3 h-3 bg-white rounded-sm bottom-1.5 left-1.5 rotate-12" />
          </div>
          <span className="font-display text-lg font-bold text-[var(--color-text-primary)] tracking-tight">
            Claude Chief
          </span>
        </Link>

        {/* Desktop Nav Links */}
        <div className="hidden md:flex items-center gap-1">
          {NAV_LINKS.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="px-3 py-2 text-sm font-medium text-[var(--color-text-secondary)] rounded-lg hover:text-[var(--color-text-primary)] hover:bg-[var(--color-bg-elevated)] transition-all"
            >
              {link.label}
            </Link>
          ))}
        </div>

        {/* Right Actions */}
        <div className="flex items-center gap-2">
          {/* Search Button */}
          <button
            onClick={() => setIsSearchOpen(!isSearchOpen)}
            className="p-2.5 rounded-lg text-[var(--color-text-secondary)] hover:text-[var(--color-text-primary)] hover:bg-[var(--color-bg-elevated)] transition-all"
            aria-label="Search"
          >
            <Search className="w-5 h-5" />
          </button>

          {/* Sign In */}
          <Link
            href="/sign-in"
            className="hidden sm:inline-flex items-center gap-2 px-4 py-2.5 text-sm font-semibold text-[var(--color-text-primary)] bg-[var(--color-bg-elevated)] rounded-lg border border-[var(--color-border)] hover:border-[var(--color-terra)] hover:bg-[var(--color-terra-muted)] transition-all"
          >
            <User className="w-4 h-4" />
            Sign In
          </Link>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="p-2.5 rounded-lg text-[var(--color-text-secondary)] hover:text-[var(--color-text-primary)] hover:bg-[var(--color-bg-elevated)] transition-all md:hidden"
            aria-label="Toggle menu"
            aria-expanded={isMenuOpen}
          >
            {isMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </nav>

      {/* Search Bar (expandable) */}
      {isSearchOpen && (
        <div className="border-t border-[var(--color-border)] bg-[var(--color-bg-surface)] px-4 py-3">
          <div className="container">
            <form action="/search" method="GET" className="relative">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-[var(--color-text-muted)]" />
              <input
                type="search"
                name="q"
                placeholder="Search skills, workflows, MCPs, creators…"
                className="input pl-12 pr-4 py-3 w-full bg-[var(--color-bg-base)]"
                autoFocus
                aria-label="Search"
              />
            </form>
          </div>
        </div>
      )}

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="border-t border-[var(--color-border)] bg-[var(--color-bg-surface)] md:hidden">
          <nav className="container py-4 flex flex-col gap-1">
            {NAV_LINKS.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setIsMenuOpen(false)}
                className="px-4 py-3 text-sm font-medium text-[var(--color-text-secondary)] rounded-lg hover:text-[var(--color-text-primary)] hover:bg-[var(--color-bg-elevated)] transition-all"
              >
                {link.label}
              </Link>
            ))}
            <div className="divider" style={{ margin: '8px 0' }} />
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