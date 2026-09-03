"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useTranslations } from "next-intl";
import { motion } from "framer-motion";
import { navLinks, APP_NAME, APP_TAGLINE } from "@/lib/data";
import { BarChart2 } from 'lucide-react';

export default function Sidebar() {
  const pathname = usePathname();
  const t = useTranslations();
  const navT = t.raw("nav") as Record<string, string>;

  return (
    <aside
      className="hidden md:flex flex-col bg-[var(--brand-sidebar-bg)] border-r border-[var(--brand-card-border)] h-screen overflow-y-auto scrollbar-thin"
      style={{ width: "var(--sidebar-width)", minWidth: "var(--sidebar-width)" }}
    >
      {/* Logo */}
      <div className="flex items-center gap-3 px-5 py-5 border-b border-[var(--brand-card-border)]">
        <div className="w-9 h-9 rounded-lg bg-[var(--brand-primary)] flex items-center justify-center flex-shrink-0">
          <BarChart2 className="w-5 h-5 text-white" aria-hidden="true" />
        </div>
        <div className="min-w-0">
          <p className="text-sm font-semibold text-[var(--brand-sidebar-text)] font-jakarta leading-tight truncate">
            {APP_NAME}
          </p>
          <p className="text-xs text-[var(--brand-sidebar-muted)] leading-tight truncate">
            {APP_TAGLINE}
          </p>
        </div>
      </div>

      {/* Nav Links */}
      <nav className="flex-1 px-3 py-4 space-y-1" aria-label="Main navigation">
        {navLinks.map((link) => {
          const isActive =
            link.href === "/"
              ? pathname === "/"
              : pathname.startsWith(link.href);
          const Icon = link.icon;
          const label = navT[link.key] ?? link.label;

          return (
            <Link
              key={link.key}
              href={link.href}
              className={`
                relative flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium
                transition-all duration-200 group
                ${
                  isActive
                    ? "bg-[var(--brand-primary)] text-white"
                    : "text-[var(--brand-sidebar-muted)] hover:bg-[var(--brand-primary-light)] hover:text-[var(--brand-primary)]"
                }
              `}
              aria-current={isActive ? "page" : undefined}
            >
              {isActive && (
                <motion.span
                  layoutId="sidebar-active-pill"
                  className="absolute inset-0 rounded-lg bg-[var(--brand-primary)]"
                  style={{ zIndex: -1 }}
                  transition={{ type: "spring", stiffness: 380, damping: 30 }}
                />
              )}
              <Icon
                className={`w-5 h-5 flex-shrink-0 ${isActive ? "text-white" : "text-[var(--brand-sidebar-muted)] group-hover:text-[var(--brand-primary)]"}`}
                aria-hidden="true"
              />
              <span className="truncate">{label}</span>
            </Link>
          );
        })}
      </nav>

      {/* User Profile Footer */}
      <div className="px-3 py-4 border-t border-[var(--brand-card-border)]">
        <div className="flex items-center gap-3 px-2 py-2 rounded-lg hover:bg-[var(--brand-primary-light)] transition-colors duration-200 cursor-pointer">
          <div className="w-8 h-8 rounded-full bg-[var(--brand-primary)] flex items-center justify-center flex-shrink-0">
            <span className="text-xs font-semibold text-white">AM</span>
          </div>
          <div className="min-w-0 flex-1">
            <p className="text-sm font-semibold text-[var(--brand-sidebar-text)] truncate leading-tight">
              Alex Morgan
            </p>
            <p className="text-xs text-[var(--brand-sidebar-muted)] truncate leading-tight">
              Admin
            </p>
          </div>
        </div>
      </div>
    </aside>
  );
}