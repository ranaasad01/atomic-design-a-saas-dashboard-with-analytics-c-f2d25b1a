"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";
import { motion } from "framer-motion";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
} from "recharts";
import { DollarSign, Users, Activity, TrendingUp, ArrowUpRight, ArrowDownRight, MoreHorizontal, Calendar, ChevronDown } from 'lucide-react';
import { Reveal } from "@/components/Reveal";
import { KPICard, Transaction } from "@/lib/data";
type MOCK_KPI_CARDS = any;
const MOCK_KPI_CARDS: any = [];
type MOCK_REVENUE_DATA = any;
const MOCK_REVENUE_DATA: any = [];
type MOCK_TRANSACTIONS = any;
const MOCK_TRANSACTIONS: any = [];
type MOCK_USER_DISTRIBUTION = any;
const MOCK_USER_DISTRIBUTION: any = [];

const ICON_MAP: Record<string, React.ReactNode> = {
  DollarSign: <DollarSign className="h-5 w-5" />,
  Users: <Users className="h-5 w-5" />,
  Activity: <Activity className="h-5 w-5" />,
  TrendingUp: <TrendingUp className="h-5 w-5" />,
};

const STATUS_STYLES: Record<string, string> = {
  Completed: "bg-emerald-50 text-emerald-700 border border-emerald-200",
  Pending: "bg-amber-50 text-amber-700 border border-amber-200",
  Failed: "bg-red-50 text-red-700 border border-red-200",
};

const PIE_COLORS = ["#2170e4", "#4edea3", "#adc6ff"];

function KPICardTile({ card }: { card: KPICard }) {
  const isUp = card.trendDirection === "up";
  return (
    <motion.div
      whileHover={{ y: -2, boxShadow: "0 8px 24px -8px rgba(0,0,0,0.12)" }}
      transition={{ duration: 0.2 }}
      className="rounded-lg border border-[#e2e8f0] bg-white p-6 flex flex-col gap-3"
      style={{ boxShadow: "0 4px 12px rgba(0,0,0,0.04)" }}
    >
      <div className="flex items-start justify-between">
        <p className="text-xs font-semibold tracking-widest text-[#45464d] uppercase">
          {card.title}
        </p>
        <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-[#eff4ff] text-[#2170e4]">
          {ICON_MAP[card.icon] ?? <Activity className="h-5 w-5" />}
        </span>
      </div>
      <p className="text-4xl font-bold tracking-tight text-[#0b1c30]" style={{ fontFamily: "Plus Jakarta Sans, sans-serif" }}>
        {card.value}
      </p>
      <div className="flex items-center gap-2">
        <span
          className={`inline-flex items-center gap-1 rounded-full px-2 py-0.5 text-xs font-semibold ${
            isUp
              ? "bg-emerald-50 text-emerald-700"
              : "bg-red-50 text-red-600"
          }`}
        >
          {isUp ? (
            <ArrowUpRight className="h-3 w-3" />
          ) : (
            <ArrowDownRight className="h-3 w-3" />
          )}
          {card.trend}
        </span>
        <span className="text-xs text-[#45464d]">vs last month</span>
      </div>
    </motion.div>
  );
}

function TransactionRow({ tx }: { tx: Transaction }) {
  return (
    <tr className="border-b border-[#f1f5f9] last:border-0 hover:bg-[#f8f9ff] transition-colors">
      <td className="py-3 px-4 text-sm font-medium text-[#2170e4]">{tx.ref}</td>
      <td className="py-3 px-4 text-sm text-[#45464d]">{tx.date}</td>
      <td className="py-3 px-4 text-sm font-medium text-[#0b1c30]">{tx.amount}</td>
      <td className="py-3 px-4">
        <span
          className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-semibold ${
            STATUS_STYLES[tx.status] ?? "bg-gray-100 text-gray-600"
          }`}
        >
          {tx.status}
        </span>
      </td>
    </tr>
  );
}

export default function DashboardPage() {
  const t = useTranslations();
  const [dateRange] = useState("Oct 1 - Oct 31, 2023");

  const safeKpi = Array.isArray(MOCK_KPI_CARDS) ? MOCK_KPI_CARDS : [];
  const safeRevenue = Array.isArray(MOCK_REVENUE_DATA) ? MOCK_REVENUE_DATA : [];
  const safeTransactions = Array.isArray(MOCK_TRANSACTIONS) ? MOCK_TRANSACTIONS : [];
  const safeUserDist = Array.isArray(MOCK_USER_DISTRIBUTION) ? MOCK_USER_DISTRIBUTION : [];

  const totalUsers = safeUserDist.reduce((acc, d) => acc + (d?.value ?? 0), 0);

  return (
    <div className="min-h-screen bg-[#f8f9ff] p-6 space-y-6">
      {/* Page Header */}
      <Reveal>
        <div className="flex flex-col gap-1 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h1
              className="text-3xl font-bold tracking-tight text-[#0b1c30]"
              style={{ fontFamily: "Plus Jakarta Sans, sans-serif" }}
            >
              {t("dashboard.welcome")}
            </h1>
            <p className="mt-1 text-sm text-[#45464d]">{t("dashboard.subtitle")}</p>
          </div>
          <button className="inline-flex items-center gap-2 rounded-lg border border-[#e2e8f0] bg-white px-4 py-2 text-sm font-medium text-[#0b1c30] shadow-sm hover:bg-[#f8f9ff] transition-colors">
            <Calendar className="h-4 w-4 text-[#45464d]" />
            {dateRange}
            <ChevronDown className="h-4 w-4 text-[#45464d]" />
          </button>
        </div>
      </Reveal>

      {/* KPI Cards */}
      <Reveal>
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
          {safeKpi.map((card, i) => (
            <motion.div
              key={card.key}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.08, duration: 0.4, ease: "easeOut" }}
            >
              <KPICardTile card={card} />
            </motion.div>
          ))}
        </div>
      </Reveal>

      {/* Revenue Growth Chart */}
      <Reveal>
        <div
          className="rounded-lg border border-[#e2e8f0] bg-white p-6"
          style={{ boxShadow: "0 4px 12px rgba(0,0,0,0.04)" }}
        >
          <div className="flex items-center justify-between mb-6">
            <div>
              <h2
                className="text-lg font-semibold text-[#0b1c30]"
                style={{ fontFamily: "Plus Jakarta Sans, sans-serif" }}
              >
                {t("dashboard.revenueGrowth")}
              </h2>
              <p className="text-xs text-[#45464d] mt-0.5">{t("dashboard.revenueSubtitle")}</p>
            </div>
            <button className="flex items-center justify-center rounded-lg p-2 hover:bg-[#f8f9ff] transition-colors text-[#45464d]">
              <MoreHorizontal className="h-5 w-5" />
            </button>
          </div>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={safeRevenue} margin={{ top: 4, right: 4, left: 0, bottom: 0 }}>
                <defs>
                  <linearGradient id="revenueGrad" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#2170e4" stopOpacity={0.18} />
                    <stop offset="95%" stopColor="#2170e4" stopOpacity={0} />
                  </linearGradient>
                  <linearGradient id="targetGrad" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#adc6ff" stopOpacity={0.12} />
                    <stop offset="95%" stopColor="#adc6ff" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" vertical={false} />
                <XAxis
                  dataKey="month"
                  tick={{ fontSize: 12, fill: "#45464d", fontFamily: "Inter, sans-serif" }}
                  axisLine={false}
                  tickLine={false}
                />
                <YAxis
                  tick={{ fontSize: 12, fill: "#45464d", fontFamily: "Inter, sans-serif" }}
                  axisLine={false}
                  tickLine={false}
                  tickFormatter={(v) => `$${(v / 1000).toFixed(0)}k`}
                />
                <Tooltip
                  contentStyle={{
                    borderRadius: "8px",
                    border: "1px solid #e2e8f0",
                    boxShadow: "0 4px 12px rgba(0,0,0,0.08)",
                    fontFamily: "Inter, sans-serif",
                    fontSize: "13px",
                  }}
                  formatter={(value: number) => [`$${value.toLocaleString("en-US")}`, undefined]}
                />
                <Area
                  type="monotone"
                  dataKey="target"
                  stroke="#adc6ff"
                  strokeWidth={2}
                  fill="url(#targetGrad)"
                  dot={false}
                  name="Target"
                />
                <Area
                  type="monotone"
                  dataKey="revenue"
                  stroke="#2170e4"
                  strokeWidth={2.5}
                  fill="url(#revenueGrad)"
                  dot={false}
                  name="Revenue"
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
          <div className="flex items-center gap-6 mt-4">
            <span className="flex items-center gap-2 text-xs text-[#45464d]">
              <span className="h-2.5 w-2.5 rounded-full bg-[#2170e4]" />
              {t("dashboard.legendRevenue")}
            </span>
            <span className="flex items-center gap-2 text-xs text-[#45464d]">
              <span className="h-2.5 w-2.5 rounded-full bg-[#adc6ff]" />
              {t("dashboard.legendTarget")}
            </span>
          </div>
        </div>
      </Reveal>

      {/* Bottom Row: Transactions + User Distribution */}
      <Reveal>
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
          {/* Recent Transactions */}
          <div
            className="lg:col-span-2 rounded-lg border border-[#e2e8f0] bg-white"
            style={{ boxShadow: "0 4px 12px rgba(0,0,0,0.04)" }}
          >
            <div className="flex items-center justify-between px-6 py-4 border-b border-[#f1f5f9]">
              <h2
                className="text-base font-semibold text-[#0b1c30]"
                style={{ fontFamily: "Plus Jakarta Sans, sans-serif" }}
              >
                {t("dashboard.recentTransactions")}
              </h2>
              <button className="text-sm font-medium text-[#2170e4] hover:underline transition-colors">
                {t("dashboard.viewAll")}
              </button>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-[#f1f5f9]">
                    <th className="py-3 px-4 text-left text-xs font-semibold tracking-wider text-[#45464d] uppercase">
                      {t("dashboard.table.txId")}
                    </th>
                    <th className="py-3 px-4 text-left text-xs font-semibold tracking-wider text-[#45464d] uppercase">
                      {t("dashboard.table.date")}
                    </th>
                    <th className="py-3 px-4 text-left text-xs font-semibold tracking-wider text-[#45464d] uppercase">
                      {t("dashboard.table.amount")}
                    </th>
                    <th className="py-3 px-4 text-left text-xs font-semibold tracking-wider text-[#45464d] uppercase">
                      {t("dashboard.table.status")}
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {safeTransactions.slice(0, 6).map((tx) => (
                    <TransactionRow key={tx.id} tx={tx} />
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* User Distribution */}
          <div
            className="rounded-lg border border-[#e2e8f0] bg-white p-6"
            style={{ boxShadow: "0 4px 12px rgba(0,0,0,0.04)" }}
          >
            <div className="flex items-center justify-between mb-4">
              <h2
                className="text-base font-semibold text-[#0b1c30]"
                style={{ fontFamily: "Plus Jakarta Sans, sans-serif" }}
              >
                {t("dashboard.userDistribution")}
              </h2>
              <button className="flex items-center justify-center rounded-lg p-1.5 hover:bg-[#f8f9ff] transition-colors text-[#45464d]">
                <MoreHorizontal className="h-4 w-4" />
              </button>
            </div>
            <div className="relative flex items-center justify-center h-48">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={safeUserDist}
                    cx="50%"
                    cy="50%"
                    innerRadius={60}
                    outerRadius={80}
                    paddingAngle={3}
                    dataKey="value"
                    startAngle={90}
                    endAngle={-270}
                  >
                    {safeUserDist.map((_, index) => (
                      <Cell
                        key={`cell-${index}`}
                        fill={PIE_COLORS[index % PIE_COLORS.length]}
                      />
                    ))}
                  </Pie>
                </PieChart>
              </ResponsiveContainer>
              <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
                <span className="text-2xl font-bold text-[#0b1c30]" style={{ fontFamily: "Plus Jakarta Sans, sans-serif" }}>
                  {totalUsers >= 1000
                    ? `${(totalUsers / 1000).toFixed(1)}k`
                    : totalUsers.toLocaleString("en-US")}
                </span>
                <span className="text-xs text-[#45464d]">{t("dashboard.totalUsers")}</span>
              </div>
            </div>
            <div className="mt-4 space-y-2">
              {safeUserDist.map((item, i) => (
                <div key={item.name ?? i} className="flex items-center justify-between text-sm">
                  <span className="flex items-center gap-2 text-[#45464d]">
                    <span
                      className="h-2.5 w-2.5 rounded-full flex-shrink-0"
                      style={{ backgroundColor: PIE_COLORS[i % PIE_COLORS.length] }}
                    />
                    {item.name}
                  </span>
                  <span className="font-medium text-[#0b1c30]">
                    {totalUsers > 0
                      ? `${((item.value / totalUsers) * 100).toFixed(0)}%`
                      : "0%"}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </Reveal>
    </div>
  );
}