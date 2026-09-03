"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";
import { Bell, HelpCircle, Search } from 'lucide-react';
import Link from "next/link";

interface DashboardHeaderProps {
  title?: string;
  subtitle?: string;
  children?: React.ReactNode;
}

// Safe translation helper — returns fallback if the key is missing or
// next-intl throws for any reason (e.g. missing message catalog key).
function safe(fn: () => string, fallback: string): string {
  try {
    return fn() ?? fallback;
  } catch {
    return fallback;
  }
}

export default function DashboardHeader({ title, subtitle, children }: DashboardHeaderProps) {
  const [searchValue, setSearchValue] = useState("");
  const tHeader = useTranslations("header");

  const searchPlaceholder = safe(() => tHeader("searchPlaceholder"), "Search...");
  const notificationsLabel = safe(() => tHeader("notifications"), "Notifications");
  const helpLabel = safe(() => tHeader("help"), "Help Center");
  const userMenuLabel = safe(() => tHeader("userMenu"), "User menu");

  return (
    <header
      className="bg-[var(--brand-header-bg)] border-b border-[var(--brand-card-border)] px-6 flex items-center gap-4"
      style={{ height: "var(--header-height)", minHeight: "var(--header-height)" }}
    >
      {/* Search */}
      <div className="flex-1 max-w-sm">
        <div className="relative">
          <Search
            className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[var(--brand-sidebar-muted)]"
            aria-hidden="true"
          />
          <input
            type="search"
            value={searchValue}
            onChange={(e) => setSearchValue(e.target.value)}
            placeholder={searchPlaceholder}
            className="w-full pl-9 pr-4 py-2 text-sm bg-[var(--color-surface-container-low)] border border-[var(--brand-card-border)] rounded-lg text-[var(--color-on-surface)] placeholder:text-[var(--brand-sidebar-muted)] focus:outline-none focus:ring-2 focus:ring-[var(--brand-primary)] focus:border-transparent transition-all duration-200"
            aria-label={searchPlaceholder}
          />
        </div>
      </div>

      {/* Right side actions */}
      <div className="flex items-center gap-1 ml-auto">
        {children}

        {/* Notification Bell */}
        <button
          className="relative p-2 rounded-lg text-[var(--brand-sidebar-muted)] hover:bg-[var(--brand-primary-light)] hover:text-[var(--brand-primary)] transition-colors duration-200"
          aria-label={notificationsLabel}
        >
          <Bell className="w-5 h-5" aria-hidden="true" />
          <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-[var(--brand-danger)] rounded-full" aria-hidden="true" />
        </button>

        {/* Help */}
        <Link
          href="/help"
          className="p-2 rounded-lg text-[var(--brand-sidebar-muted)] hover:bg-[var(--brand-primary-light)] hover:text-[var(--brand-primary)] transition-colors duration-200"
          aria-label={helpLabel}
        >
          <HelpCircle className="w-5 h-5" aria-hidden="true" />
        </Link>

        {/* Divider */}
        <div className="w-px h-6 bg-[var(--brand-card-border)] mx-1" aria-hidden="true" />

        {/* User Avatar */}
        <button
          className="w-8 h-8 rounded-full bg-[var(--brand-primary)] flex items-center justify-center hover:ring-2 hover:ring-[var(--brand-primary)] hover:ring-offset-2 transition-all duration-200"
          aria-label={userMenuLabel}
        >
          <span className="text-xs font-semibold text-white">AM</span>
        </button>
      </div>
    </header>
  );
}
