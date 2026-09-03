"use client";

import { useState, useMemo } from "react";
import { useTranslations } from "next-intl";
import { motion } from "framer-motion";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
} from "recharts";
import { Download, Calendar, ChevronDown, Filter, Users, ArrowUpRight, ArrowDownRight, Clock, Flag, MoreHorizontal, ExternalLink } from 'lucide-react';
import { Reveal } from "@/components/Reveal";
type MOCK_TRAFFIC_DAILY = any;
const MOCK_TRAFFIC_DAILY: any = [];
type MOCK_TRAFFIC_WEEKLY = any;
const MOCK_TRAFFIC_WEEKLY: any = [];
type MOCK_TRAFFIC_MONTHLY = any;
const MOCK_TRAFFIC_MONTHLY: any = [];
type MOCK_DEVICE_DISTRIBUTION = any;
const MOCK_DEVICE_DISTRIBUTION: any = [];
type MOCK_TOP_PAGES = any;
const MOCK_TOP_PAGES: any = [];
import { cn } from "@/lib/utils";

const KPI_CARDS = [
  {
    key: "traffic",
    title: "Total Traffic",
    value: "2.4M",
    trend: "+12.5%",
    trendDirection: "up" as const,
    icon: Users,
    trendLabel: "vs last period",
  },
  {
    key: "bounce",
    title: "Bounce Rate",
    value: "42.5%",
    trend: "-2.1%",
    trendDirection: "down" as const,
    icon: Flag,
    trendLabel: "vs last period",
    downIsGood: true,
  },
  {
    key: "session",
    title: "Avg. Session",
    value: "3m 12s",
    trend: "+0.15",
    trendDirection: "up" as const,
    icon: Clock,
    trendLabel: "vs last period",
  },
  {
    key: "conversion",
    title: "Conversion Goal",
    value: "8.2%",
    trend: "+1.4%",
    trendDirection: "up" as const,
    icon: Flag,
    trendLabel: "vs last period",
  },
];

const DEVICE_COLORS = ["#2170e4", "#4edea3", "#c6c6cd"];

type TrafficPeriod = "Daily" | "Weekly" | "Monthly";

function formatYAxis(value: number): string {
  if (value >= 1000) return `${(value / 1000).toFixed(0)}k`;
  return `${value}`;
}

export default function AnalyticsPage() {
  const t = useTranslations();
  const [period, setPeriod] = useState<TrafficPeriod>("Weekly");
  const [channelFilter, setChannelFilter] = useState("All Channels");
  const [regionFilter, setRegionFilter] = useState("All Regions");
  const [segmentFilter, setSegmentFilter] = useState("All Segments");

  const trafficData = useMemo(() => {
    if (period === "Daily") return MOCK_TRAFFIC_DAILY;
    if (period === "Monthly") return MOCK_TRAFFIC_MONTHLY;
    return MOCK_TRAFFIC_WEEKLY;
  }, [period]);

  const xKey = useMemo(() => {
    if (period === "Daily") return "day";
    if (period === "Monthly") return "month";
    return "week";
  }, [period]);

  const deviceData = (Array.isArray(MOCK_DEVICE_DISTRIBUTION) ? MOCK_DEVICE_DISTRIBUTION : []) as {
    name: string;
    value: number;
  }[];

  const topPages = (Array.isArray(MOCK_TOP_PAGES) ? MOCK_TOP_PAGES : []) as {
    path: string;
    pageviews: number;
    avgTime: string;
    changePct: number;
  }[];

  const hasActiveFilters =
    channelFilter !== "All Channels" ||
    regionFilter !== "All Regions" ||
    segmentFilter !== "All Segments";

  function clearFilters() {
    setChannelFilter("All Channels");
    setRegionFilter("All Regions");
    setSegmentFilter("All Segments");
  }

  const desktopPct = deviceData.find((d) => d.name === "Desktop")?.value ?? 58;

  return (
    <div className="min-h-screen bg-[var(--color-surface)] p-6 space-y-6">
      {/* Header */}
      <Reveal>
        <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
          <div>
            <h1 className="text-[28px] font-semibold leading-[36px] tracking-[-0.01em] text-[var(--color-on-surface)] font-display">
              {t("analytics.title")}
            </h1>
            <p className="mt-1 text-sm text-[var(--color-on-surface-variant)] font-body">
              {t("analytics.subtitle")}
            </p>
          </div>
          <div className="flex items-center gap-3 flex-shrink-0">
            <button className="flex items-center gap-2 rounded-lg border border-[var(--color-outline-variant)] bg-white px-4 py-2 text-sm font-medium text-[var(--color-on-surface)] shadow-[0_1px_2px_rgba(0,0,0,0.04)] hover:bg-[var(--color-surface-container-low)] transition-colors">
              <Calendar className="h-4 w-4 text-[var(--color-on-surface-variant)]" aria-hidden="true" />
              {t("analytics.dateRange")}
              <ChevronDown className="h-4 w-4 text-[var(--color-on-surface-variant)]" aria-hidden="true" />
            </button>
            <button className="flex items-center gap-2 rounded-lg bg-[var(--color-secondary)] px-4 py-2 text-sm font-semibold text-white shadow-[0_1px_2px_rgba(0,0,0,0.08)] hover:bg-[var(--color-secondary-container)] transition-colors">
              <Download className="h-4 w-4" aria-hidden="true" />
              {t("analytics.export")}
            </button>
          </div>
        </div>
      </Reveal>

      {/* Filters Bar */}
      <Reveal delay={0.05}>
        <div className="flex flex-wrap items-center gap-3 rounded-xl border border-[var(--color-outline-variant)] bg-white px-4 py-3 shadow-[0_1px_2px_rgba(0,0,0,0.04)]">
          <div className="flex items-center gap-2 text-sm font-semibold text-[var(--color-on-surface-variant)] uppercase tracking-[0.05em]">
            <Filter className="h-4 w-4" aria-hidden="true" />
            {t("analytics.filters.label")}
          </div>
          {[
            { value: channelFilter, setter: setChannelFilter, options: ["All Channels", "Direct", "Organic", "Referral"] },
            { value: regionFilter, setter: setRegionFilter, options: ["All Regions", "North America", "Europe", "Asia Pacific", "Other"] },
            { value: segmentFilter, setter: setSegmentFilter, options: ["All Segments", "New Users", "Returning Users", "Enterprise", "SMB"] },
          ].map((filter) => (
            <div key={filter.value} className="relative">
              <select
                value={filter.value}
                onChange={(e) => filter.setter(e.target.value)}
                className="appearance-none cursor-pointer rounded-full border border-[var(--color-outline-variant)] bg-[var(--color-surface-container-low)] pl-3 pr-8 py-1.5 text-sm font-medium text-[var(--color-on-surface)] hover:bg-[var(--color-surface-container)] transition-colors focus:outline-none focus:ring-2 focus:ring-[var(--color-secondary)]"
              >
                {filter.options.map((opt) => (
                  <option key={opt} value={opt}>{opt}</option>
                ))}
              </select>
              <ChevronDown className="pointer-events-none absolute right-2.5 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-[var(--color-on-surface-variant)]" aria-hidden="true" />
            </div>
          ))}
          {hasActiveFilters && (
            <button
              onClick={clearFilters}
              className="ml-auto text-sm font-medium text-[var(--color-secondary)] hover:underline transition-colors"
            >
              {t("analytics.filters.clear")}
            </button>
          )}
          {!hasActiveFilters && (
            <span className="ml-auto text-sm font-medium text-[var(--color-on-surface-variant)] opacity-50 cursor-default select-none">
              {t("analytics.filters.clear")}
            </span>
          )}
        </div>
      </Reveal>

      {/* KPI Cards */}
      <Reveal delay={0.08}>
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
          {KPI_CARDS.map((card, i) => {
            const Icon = card.icon;
            const isUp = card.trendDirection === "up";
            const isGood = card.downIsGood ? !isUp : isUp;
            return (
              <motion.div
                key={card.key}
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.07, duration: 0.4, ease: "easeOut" }}
                className="rounded-xl border border-[var(--color-outline-variant)] bg-white p-6 shadow-[0_1px_2px_rgba(0,0,0,0.04),0_4px_12px_-4px_rgba(0,0,0,0.06)] hover:shadow-[0_2px_8px_rgba(0,0,0,0.06),0_8px_24px_-8px_rgba(0,0,0,0.1)] transition-shadow"
              >
                <div className="flex items-start justify-between">
                  <p className="text-sm font-medium text-[var(--color-on-surface-variant)]">{card.title}</p>
                  <div className="rounded-lg bg-[var(--color-surface-container-low)] p-2">
                    <Icon className="h-5 w-5 text-[var(--color-secondary)]" aria-hidden="true" />
                  </div>
                </div>
                <p className="mt-3 text-[36px] font-bold leading-[44px] tracking-[-0.02em] text-[var(--color-on-surface)]">
                  {card.value}
                </p>
                <div className="mt-2 flex items-center gap-1.5">
                  <span
                    className={cn(
                      "inline-flex items-center gap-0.5 rounded-full px-2 py-0.5 text-xs font-semibold",
                      isGood
                        ? "bg-emerald-50 text-emerald-700"
                        : "bg-red-50 text-red-600"
                    )}
                  >
                    {isUp ? (
                      <ArrowUpRight className="h-3 w-3" aria-hidden="true" />
                    ) : (
                      <ArrowDownRight className="h-3 w-3" aria-hidden="true" />
                    )}
                    {card.trend}
                  </span>
                  <span className="text-xs text-[var(--color-on-surface-variant)]">{card.trendLabel}</span>
                </div>
              </motion.div>
            );
          })}
        </div>
      </Reveal>

      {/* Traffic Sources Chart */}
      <Reveal delay={0.1}>
        <div className="rounded-xl border border-[var(--color-outline-variant)] bg-white shadow-[0_1px_2px_rgba(0,0,0,0.04),0_4px_12px_-4px_rgba(0,0,0,0.06)] overflow-hidden">
          <div className="flex flex-col gap-3 border-b border-[var(--color-outline-variant)] px-6 py-4 sm:flex-row sm:items-center sm:justify-between">
            <h2 className="text-base font-semibold text-[var(--color-on-surface)]">
              {t("analytics.trafficSources.title")}
            </h2>
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-3 text-xs text-[var(--color-on-surface-variant)]">
                <span className="flex items-center gap-1.5">
                  <span className="inline-block h-2.5 w-2.5 rounded-full bg-[#2170e4]" />
                  {t("analytics.trafficSources.direct")}
                </span>
                <span className="flex items-center gap-1.5">
                  <span className="inline-block h-2.5 w-2.5 rounded-full bg-[#4edea3]" />
                  {t("analytics.trafficSources.organic")}
                </span>
                <span className="flex items-center gap-1.5">
                  <span className="inline-block h-2.5 w-2.5 rounded-full bg-[#131b2e]" />
                  {t("analytics.trafficSources.referral")}
                </span>
              </div>
              <div className="flex rounded-lg border border-[var(--color-outline-variant)] overflow-hidden">
                {(["Daily", "Weekly", "Monthly"] as TrafficPeriod[]).map((p) => (
                  <button
                    key={p}
                    onClick={() => setPeriod(p)}
                    className={cn(
                      "px-3 py-1.5 text-xs font-medium transition-colors",
                      period === p
                        ? "bg-[var(--color-secondary)] text-white"
                        : "bg-white text-[var(--color-on-surface-variant)] hover:bg-[var(--color-surface-container-low)]"
                    )}
                  >
                    {p}
                  </button>
                ))}
              </div>
            </div>
          </div>
          <div className="px-2 py-4" style={{ height: 320 }}>
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={trafficData} margin={{ top: 8, right: 16, left: 0, bottom: 0 }} barCategoryGap="30%">
                <CartesianGrid strokeDasharray="3 3" stroke="#e5eeff" vertical={false} />
                <XAxis
                  dataKey={xKey}
                  tick={{ fontSize: 12, fill: "#45464d", fontFamily: "Inter" }}
                  axisLine={false}
                  tickLine={false}
                />
                <YAxis
                  tickFormatter={formatYAxis}
                  tick={{ fontSize: 12, fill: "#45464d", fontFamily: "Inter" }}
                  axisLine={false}
                  tickLine={false}
                  width={40}
                />
                <Tooltip
                  contentStyle={{
                    borderRadius: "8px",
                    border: "1px solid #c6c6cd",
                    boxShadow: "0 4px 12px rgba(0,0,0,0.08)",
                    fontSize: "12px",
                    fontFamily: "Inter",
                  }}
                  formatter={(value: number, name: string) => [value.toLocaleString("en-US"), name]}
                />
                <Bar dataKey="direct" name="Direct" fill="#2170e4" radius={[4, 4, 0, 0]} />
                <Bar dataKey="organic" name="Organic" fill="#4edea3" radius={[4, 4, 0, 0]} />
                <Bar dataKey="referral" name="Referral" fill="#131b2e" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </Reveal>

      {/* Bottom Row: Device Distribution + Top Pages */}
      <Reveal delay={0.12}>
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-5">
          {/* Device Distribution */}
          <div className="lg:col-span-2 rounded-xl border border-[var(--color-outline-variant)] bg-white shadow-[0_1px_2px_rgba(0,0,0,0.04),0_4px_12px_-4px_rgba(0,0,0,0.06)]">
            <div className="flex items-center justify-between border-b border-[var(--color-outline-variant)] px-6 py-4">
              <h2 className="text-base font-semibold text-[var(--color-on-surface)]">
                {t("analytics.deviceDistribution.title")}
              </h2>
              <button className="rounded-md p-1 hover:bg-[var(--color-surface-container-low)] transition-colors" aria-label="More options">
                <MoreHorizontal className="h-4 w-4 text-[var(--color-on-surface-variant)]" aria-hidden="true" />
              </button>
            </div>
            <div className="flex flex-col items-center px-6 py-6">
              <div className="relative" style={{ width: 200, height: 200 }}>
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={deviceData.length > 0 ? deviceData : [{ name: "Desktop", value: 58 }, { name: "Mobile", value: 32 }, { name: "Tablet", value: 10 }]}
                      cx="50%"
                      cy="50%"
                      innerRadius={65}
                      outerRadius={90}
                      startAngle={90}
                      endAngle={-270}
                      dataKey="value"
                      strokeWidth={2}
                      stroke="#ffffff"
                    >
                      {DEVICE_COLORS.map((color, index) => (
                        <Cell key={`cell-${index}`} fill={color} />
                      ))}
                    </Pie>
                  </PieChart>
                </ResponsiveContainer>
                <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
                  <span className="text-[28px] font-bold leading-tight text-[var(--color-on-surface)]">
                    {desktopPct}%
                  </span>
                  <span className="text-xs text-[var(--color-on-surface-variant)]">
                    {t("analytics.deviceDistribution.desktop")}
                  </span>
                </div>
              </div>
              <div className="mt-4 flex items-center justify-center gap-6">
                {[
                  { label: t("analytics.deviceDistribution.desktop"), pct: "58%", color: "#2170e4" },
                  { label: t("analytics.deviceDistribution.mobile"), pct: "32%", color: "#4edea3" },
                  { label: t("analytics.deviceDistribution.tablet"), pct: "10%", color: "#c6c6cd" },
                ].map((item) => (
                  <div key={item.label} className="flex flex-col items-center gap-1">
                    <span className="flex items-center gap-1.5 text-xs text-[var(--color-on-surface-variant)]">
                      <span className="inline-block h-2 w-2 rounded-full" style={{ backgroundColor: item.color }} />
                      {item.label}
                    </span>
                    <span className="text-sm font-semibold text-[var(--color-on-surface)]">{item.pct}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Top Pages */}
          <div className="lg:col-span-3 rounded-xl border border-[var(--color-outline-variant)] bg-white shadow-[0_1px_2px_rgba(0,0,0,0.04),0_4px_12px_-4px_rgba(0,0,0,0.06)]">
            <div className="flex items-center justify-between border-b border-[var(--color-outline-variant)] px-6 py-4">
              <h2 className="text-base font-semibold text-[var(--color-on-surface)]">
                {t("analytics.topPages.title")}
              </h2>
              <button className="text-sm font-medium text-[var(--color-secondary)] hover:underline transition-colors">
                {t("analytics.topPages.viewAll")}
              </button>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-[var(--color-outline-variant)]">
                    <th className="px-6 py-3 text-left text-xs font-semibold uppercase tracking-[0.05em] text-[var(--color-on-surface-variant)]">
                      {t("analytics.topPages.colPath")}
                    </th>
                    <th className="px-4 py-3 text-right text-xs font-semibold uppercase tracking-[0.05em] text-[var(--color-on-surface-variant)]">
                      {t("analytics.topPages.colPageviews")}
                    </th>
                    <th className="px-4 py-3 text-right text-xs font-semibold uppercase tracking-[0.05em] text-[var(--color-on-surface-variant)]">
                      {t("analytics.topPages.colAvgTime")}
                    </th>
                    <th className="px-6 py-3 text-right text-xs font-semibold uppercase tracking-[0.05em] text-[var(--color-on-surface-variant)]">
                      {t("analytics.topPages.colChange")}
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {topPages.map((page, i) => (
                    <tr
                      key={page.path}
                      className={cn(
                        "border-b border-[var(--color-outline-variant)] last:border-0 hover:bg-[var(--color-surface-container-low)] transition-colors",
                        i % 2 === 1 ? "bg-[var(--color-surface-container-lowest)]" : ""
                      )}
                    >
                      <td className="px-6 py-3.5">
                        <span className="flex items-center gap-1.5 text-[var(--color-secondary)] font-medium hover:underline cursor-pointer">
                          {page.path}
                          <ExternalLink className="h-3 w-3 opacity-60" aria-hidden="true" />
                        </span>
                      </td>
                      <td className="px-4 py-3.5 text-right font-mono text-[var(--color-on-surface)]">
                        {page.pageviews.toLocaleString("en-US")}
                      </td>
                      <td className="px-4 py-3.5 text-right font-mono text-[var(--color-on-surface)]">
                        {page.avgTime}
                      </td>
                      <td className="px-6 py-3.5 text-right">
                        <span
                          className={cn(
                            "inline-flex items-center gap-0.5 rounded-full px-2 py-0.5 text-xs font-semibold",
                            page.changePct > 0
                              ? "bg-emerald-50 text-emerald-700"
                              : page.changePct < 0
                              ? "bg-red-50 text-red-600"
                              : "bg-gray-100 text-gray-500"
                          )}
                        >
                          {page.changePct > 0 ? (
                            <ArrowUpRight className="h-3 w-3" aria-hidden="true" />
                          ) : page.changePct < 0 ? (
                            <ArrowDownRight className="h-3 w-3" aria-hidden="true" />
                          ) : null}
                          {page.changePct === 0 ? "0.0%" : `${Math.abs(page.changePct)}%`}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </Reveal>
    </div>
  );
}