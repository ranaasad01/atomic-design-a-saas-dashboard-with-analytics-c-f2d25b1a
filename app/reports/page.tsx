"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Plus, Download, FileText, Calendar, AlignJustify, TrendingUp, Clock, CheckCircle, AlertCircle, Search, MoreHorizontal, ChevronDown } from 'lucide-react';
import { Reveal } from "@/components/Reveal";
import { useTranslations } from "next-intl";
type MOCK_REPORTS = any;
const MOCK_REPORTS: any = [];
type Report = any;
const Report: any = [];

const STAT_CARDS = [
  {
    key: "generated",
    labelKey: "reports.stats.generatedLabel",
    value: "1,284",
    badge: "+12%",
    badgeColor: "green",
    subLabelKey: "reports.stats.generatedSub",
    icon: "grid",
  },
  {
    key: "scheduled",
    labelKey: "reports.stats.scheduledLabel",
    value: "42",
    badge: null,
    badgeColor: null,
    subLabelKey: "reports.stats.scheduledSub",
    icon: "calendar",
  },
  {
    key: "storage",
    labelKey: "reports.stats.storageLabel",
    value: "4.2 GB",
    valueSuffix: "/ 10 GB",
    badge: null,
    badgeColor: null,
    subLabelKey: null,
    icon: "list",
    progress: 42,
  },
];

const INLINE_REPORTS: Report[] = [
  {
    id: "rpt-001",
    name: "Monthly Revenue Summary",
    type: "Financial",
    status: "Completed",
    generatedAt: "Aug 1, 2024",
    size: "2.4 MB",
  },
  {
    id: "rpt-002",
    name: "Weekly Traffic Overview",
    type: "Analytics",
    status: "Scheduled",
    schedule: "Every Monday",
    size: "1.1 MB",
  },
  {
    id: "rpt-003",
    name: "Q2 Conversion Funnel",
    type: "Marketing",
    status: "Completed",
    generatedAt: "Jul 15, 2024",
    size: "3.8 MB",
  },
  {
    id: "rpt-004",
    name: "User Retention Analysis",
    type: "Analytics",
    status: "Completed",
    generatedAt: "Jul 10, 2024",
    size: "5.2 MB",
  },
  {
    id: "rpt-005",
    name: "Ad Spend Performance",
    type: "Marketing",
    status: "Draft",
    size: "—",
  },
  {
    id: "rpt-006",
    name: "Enterprise Billing Report",
    type: "Financial",
    status: "Scheduled",
    schedule: "1st of month",
    size: "0.9 MB",
  },
  {
    id: "rpt-007",
    name: "Device & Browser Breakdown",
    type: "Analytics",
    status: "Completed",
    generatedAt: "Jun 28, 2024",
    size: "1.7 MB",
  },
  {
    id: "rpt-008",
    name: "Team Activity Log",
    type: "Operations",
    status: "Draft",
    size: "—",
  },
];

const TYPE_FILTERS = ["All Types", "Financial", "Analytics", "Marketing", "Operations"];

function StatIcon({ icon }: { icon: string }) {
  const cls = "h-5 w-5 text-[var(--brand-secondary)]";
  if (icon === "grid") return <AlignJustify className={cls} />;
  if (icon === "calendar") return <Calendar className={cls} />;
  return <FileText className={cls} />;
}

function StatusBadge({ status }: { status: Report["status"] }) {
  if (status === "Completed") {
    return (
      <span className="inline-flex items-center gap-1 rounded-full bg-emerald-50 px-2.5 py-0.5 text-xs font-semibold text-emerald-700">
        <CheckCircle className="h-3 w-3" />
        Completed
      </span>
    );
  }
  if (status === "Scheduled") {
    return (
      <span className="inline-flex items-center gap-1 rounded-full bg-blue-50 px-2.5 py-0.5 text-xs font-semibold text-blue-700">
        <Clock className="h-3 w-3" />
        Scheduled
      </span>
    );
  }
  return (
    <span className="inline-flex items-center gap-1 rounded-full bg-amber-50 px-2.5 py-0.5 text-xs font-semibold text-amber-700">
      <AlertCircle className="h-3 w-3" />
      Draft
    </span>
  );
}

export default function ReportsPage() {
  const t = useTranslations();
  const [search, setSearch] = useState("");
  const [typeFilter, setTypeFilter] = useState("All Types");

  const filtered = INLINE_REPORTS.filter((r) => {
    const matchesSearch =
      r.name.toLowerCase().includes(search.toLowerCase()) ||
      r.type.toLowerCase().includes(search.toLowerCase());
    const matchesType = typeFilter === "All Types" || r.type === typeFilter;
    return matchesSearch && matchesType;
  });

  return (
    <div className="min-h-screen bg-[var(--brand-surface)] px-6 py-8">
      {/* Page Header */}
      <Reveal>
        <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h1 className="font-['Plus_Jakarta_Sans'] text-3xl font-bold tracking-tight text-[var(--brand-on-surface)]">
              {t("reports.heading")}
            </h1>
            <p className="mt-1 text-sm text-[var(--brand-on-surface-variant)]">
              {t("reports.subheading")}
            </p>
          </div>
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="inline-flex items-center gap-2 rounded-lg bg-[var(--brand-secondary)] px-4 py-2.5 text-sm font-semibold text-white shadow-sm transition-all duration-200 hover:bg-[var(--brand-secondary-container)]"
          >
            <Plus className="h-4 w-4" />
            {t("reports.createBtn")}
          </motion.button>
        </div>
      </Reveal>

      {/* Stat Cards */}
      <Reveal>
        <div className="mb-8 grid grid-cols-1 gap-4 sm:grid-cols-3">
          {STAT_CARDS.map((card) => (
            <div
              key={card.key}
              className="rounded-xl border border-[var(--brand-outline-variant)] bg-white p-6 shadow-[0_1px_3px_rgba(0,0,0,0.04),0_4px_12px_-4px_rgba(0,0,0,0.08)]"
            >
              <div className="mb-3 flex items-center justify-between">
                <span className="font-['Inter'] text-xs font-semibold uppercase tracking-widest text-[var(--brand-on-surface-variant)]">
                  {t(card.labelKey)}
                </span>
                <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-[var(--brand-surface-container-low)]">
                  <StatIcon icon={card.icon} />
                </div>
              </div>

              <div className="flex items-baseline gap-2">
                <span className="font-['Plus_Jakarta_Sans'] text-4xl font-bold text-[var(--brand-on-surface)]">
                  {card.value}
                </span>
                {"valueSuffix" in card && card.valueSuffix && (
                  <span className="text-sm text-[var(--brand-on-surface-variant)]">
                    {card.valueSuffix}
                  </span>
                )}
                {card.badge && (
                  <span className="inline-flex items-center gap-0.5 rounded-full bg-emerald-50 px-2 py-0.5 text-xs font-semibold text-emerald-700">
                    <TrendingUp className="h-3 w-3" />
                    {card.badge}
                  </span>
                )}
              </div>

              {card.subLabelKey && (
                <p className="mt-1 font-['Inter'] text-sm text-[var(--brand-on-surface-variant)]">
                  {t(card.subLabelKey)}
                </p>
              )}

              {"progress" in card && typeof card.progress === "number" && (
                <div className="mt-3">
                  <div className="h-1.5 w-full overflow-hidden rounded-full bg-[var(--brand-surface-container)]">
                    <motion.div
                      className="h-full rounded-full bg-[var(--brand-secondary)]"
                      initial={{ width: 0 }}
                      animate={{ width: `${card.progress}%` }}
                      transition={{ duration: 0.8, ease: "easeOut", delay: 0.3 }}
                    />
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      </Reveal>

      {/* Reports Table */}
      <Reveal>
        <div className="rounded-xl border border-[var(--brand-outline-variant)] bg-white shadow-[0_1px_3px_rgba(0,0,0,0.04),0_4px_12px_-4px_rgba(0,0,0,0.08)]">
          {/* Table Header */}
          <div className="flex flex-col gap-3 border-b border-[var(--brand-outline-variant)] px-6 py-4 sm:flex-row sm:items-center sm:justify-between">
            <h2 className="font-['Plus_Jakarta_Sans'] text-base font-semibold text-[var(--brand-on-surface)]">
              {t("reports.tableTitle")}
            </h2>
            <div className="flex flex-wrap items-center gap-2">
              {/* Search */}
              <div className="relative">
                <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-[var(--brand-on-surface-variant)]" />
                <input
                  type="text"
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  placeholder={t("reports.searchPlaceholder")}
                  className="h-9 rounded-lg border border-[var(--brand-outline-variant)] bg-[var(--brand-surface)] pl-9 pr-3 font-['Inter'] text-sm text-[var(--brand-on-surface)] placeholder:text-[var(--brand-on-surface-variant)] focus:border-[var(--brand-secondary)] focus:outline-none focus:ring-2 focus:ring-[var(--brand-secondary)]/20"
                />
              </div>
              {/* Type Filter */}
              <div className="relative">
                <select
                  value={typeFilter}
                  onChange={(e) => setTypeFilter(e.target.value)}
                  className="h-9 appearance-none rounded-lg border border-[var(--brand-outline-variant)] bg-[var(--brand-surface)] pl-3 pr-8 font-['Inter'] text-sm text-[var(--brand-on-surface)] focus:border-[var(--brand-secondary)] focus:outline-none focus:ring-2 focus:ring-[var(--brand-secondary)]/20"
                >
                  {TYPE_FILTERS.map((f) => (
                    <option key={f} value={f}>
                      {f}
                    </option>
                  ))}
                </select>
                <ChevronDown className="pointer-events-none absolute right-2 top-1/2 h-4 w-4 -translate-y-1/2 text-[var(--brand-on-surface-variant)]" />
              </div>
            </div>
          </div>

          {/* Table */}
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-[var(--brand-outline-variant)] bg-[var(--brand-surface-container-low)]">
                  <th className="px-6 py-3 text-left font-['Inter'] text-xs font-semibold uppercase tracking-wider text-[var(--brand-on-surface-variant)]">
                    {t("reports.col.name")}
                  </th>
                  <th className="px-6 py-3 text-left font-['Inter'] text-xs font-semibold uppercase tracking-wider text-[var(--brand-on-surface-variant)]">
                    {t("reports.col.type")}
                  </th>
                  <th className="px-6 py-3 text-left font-['Inter'] text-xs font-semibold uppercase tracking-wider text-[var(--brand-on-surface-variant)]">
                    {t("reports.col.status")}
                  </th>
                  <th className="px-6 py-3 text-left font-['Inter'] text-xs font-semibold uppercase tracking-wider text-[var(--brand-on-surface-variant)]">
                    {t("reports.col.generated")}
                  </th>
                  <th className="px-6 py-3 text-left font-['Inter'] text-xs font-semibold uppercase tracking-wider text-[var(--brand-on-surface-variant)]">
                    {t("reports.col.size")}
                  </th>
                  <th className="px-6 py-3 text-right font-['Inter'] text-xs font-semibold uppercase tracking-wider text-[var(--brand-on-surface-variant)]">
                    {t("reports.col.actions")}
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[var(--brand-outline-variant)]">
                {filtered.length === 0 ? (
                  <tr>
                    <td
                      colSpan={6}
                      className="px-6 py-12 text-center font-['Inter'] text-sm text-[var(--brand-on-surface-variant)]"
                    >
                      {t("reports.emptyState")}
                    </td>
                  </tr>
                ) : (
                  filtered.map((report, i) => (
                    <motion.tr
                      key={report.id}
                      initial={{ opacity: 0, y: 8 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: i * 0.04, duration: 0.3, ease: "easeOut" }}
                      className="group transition-colors duration-150 hover:bg-[var(--brand-surface-container-low)]"
                    >
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-3">
                          <div className="flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-lg bg-[var(--brand-surface-container-low)]">
                            <FileText className="h-4 w-4 text-[var(--brand-secondary)]" />
                          </div>
                          <span className="font-['Inter'] text-sm font-medium text-[var(--brand-on-surface)]">
                            {report.name}
                          </span>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <span className="font-['Inter'] text-sm text-[var(--brand-on-surface-variant)]">
                          {report.type}
                        </span>
                      </td>
                      <td className="px-6 py-4">
                        <StatusBadge status={report.status} />
                      </td>
                      <td className="px-6 py-4">
                        <span className="font-['Inter'] text-sm text-[var(--brand-on-surface-variant)]">
                          {report.status === "Scheduled"
                            ? report.schedule ?? "—"
                            : report.generatedAt ?? "—"}
                        </span>
                      </td>
                      <td className="px-6 py-4">
                        <span className="font-['Inter'] text-sm text-[var(--brand-on-surface-variant)]">
                          {report.size ?? "—"}
                        </span>
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex items-center justify-end gap-1">
                          {report.status === "Completed" && (
                            <motion.button
                              whileHover={{ scale: 1.1 }}
                              whileTap={{ scale: 0.95 }}
                              aria-label={`Download ${report.name}`}
                              className="flex h-8 w-8 items-center justify-center rounded-lg text-[var(--brand-on-surface-variant)] transition-colors hover:bg-[var(--brand-surface-container)] hover:text-[var(--brand-secondary)]"
                            >
                              <Download className="h-4 w-4" />
                            </motion.button>
                          )}
                          <motion.button
                            whileHover={{ scale: 1.1 }}
                            whileTap={{ scale: 0.95 }}
                            aria-label={`More options for ${report.name}`}
                            className="flex h-8 w-8 items-center justify-center rounded-lg text-[var(--brand-on-surface-variant)] transition-colors hover:bg-[var(--brand-surface-container)] hover:text-[var(--brand-on-surface)]"
                          >
                            <MoreHorizontal className="h-4 w-4" />
                          </motion.button>
                        </div>
                      </td>
                    </motion.tr>
                  ))
                )}
              </tbody>
            </table>
          </div>

          {/* Table Footer */}
          <div className="flex items-center justify-between border-t border-[var(--brand-outline-variant)] px-6 py-3">
            <span className="font-['Inter'] text-xs text-[var(--brand-on-surface-variant)]">
              {t("reports.showing", { count: filtered.length, total: INLINE_REPORTS.length })}
            </span>
            <div className="flex items-center gap-1">
              <button
                className="rounded-lg px-3 py-1.5 font-['Inter'] text-xs font-medium text-[var(--brand-on-surface-variant)] transition-colors hover:bg-[var(--brand-surface-container-low)] disabled:opacity-40"
                disabled
              >
                {t("reports.prev")}
              </button>
              <button className="rounded-lg bg-[var(--brand-secondary)] px-3 py-1.5 font-['Inter'] text-xs font-semibold text-white">
                1
              </button>
              <button className="rounded-lg px-3 py-1.5 font-['Inter'] text-xs font-medium text-[var(--brand-on-surface-variant)] transition-colors hover:bg-[var(--brand-surface-container-low)]">
                {t("reports.next")}
              </button>
            </div>
          </div>
        </div>
      </Reveal>
    </div>
  );
}