"use client";

import { useState } from "react";
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
import { useTranslations } from "next-intl";
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
import { staggerContainer, fadeInUp } from "@/lib/motion";

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

function KPITile({ card }: { card: KPICard }) {
  const isUp = card.trendDirection === "up";
  return (
    <motion.div
      whileHover={{ y: -2, boxShadow: "0 8px 24px -8px rgba(0,0,0,0.12)" }}
      transition={{ duration: 0.2 }}
      className="rounded-xl border border-[#e2e8f0] bg-white p-6 shadow-[0_1px_2px_rgba(0,0,0,0.04),0_4px_12px_-4px_rgba(0,0,0,0.06)]"
    >
      <div className="flex items-start justify-between">
        <p className="text-xs font-semibold uppercase tracking-widest text-[#45464d]">
          {card.title}
        </p>
        <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-[#eff4ff] text-[#2170e4]">
          {ICON_MAP[card.icon] ?? <Activity className="h-5 w-5" />}
        </span>
      </div>
      <p className="mt-3 text-[2rem] font-bold leading-none tracking-tight text-[#0b1c30]">
        {card.value}
      </p>
      <div className="mt-3 flex items-center gap-1.5">
        <span
          className={`inline-flex items-center gap-0.5 rounded-full px-2 py-0.5 text-xs font-semibold ${
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
        <span className="text-xs text-[#76777d]">vs last month</span>
      </div>
    </motion.div>
  );
}

function RevenueChart() {
  const t = useTranslations();
  return (
    <div className="rounded-xl border border-[#e2e8f0] bg-white p-6 shadow-[0_1px_2px_rgba(0,0,0,0.04),0_4px_12px_-4px_rgba(0,0,0,0.06)]">
      <div className="mb-5 flex items-center justify-between">
        <div>
          <h2 className="text-base font-semibold text-[#0b1c30]">
            {t("dashboard.revenueChart.title")}
          </h2>
          <p className="mt-0.5 text-xs text-[#76777d]">
            {t("dashboard.revenueChart.subtitle")}
          </p>
        </div>
        <button className="flex h-8 w-8 items-center justify-center rounded-lg text-[#76777d] hover:bg-[#eff4ff] transition-colors">
          <MoreHorizontal className="h-4 w-4" />
        </button>
      </div>
      <div className="h-64">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={MOCK_REVENUE_DATA} margin={{ top: 4, right: 4, left: -20, bottom: 0 }}>
            <defs>
              <linearGradient id="revenueGrad" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#2170e4" stopOpacity={0.18} />
                <stop offset="95%" stopColor="#2170e4" stopOpacity={0} />
              </linearGradient>
              <linearGradient id="targetGrad" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#4edea3" stopOpacity={0.12} />
                <stop offset="95%" stopColor="#4edea3" stopOpacity={0} />
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" stroke="#e5eeff" vertical={false} />
            <XAxis
              dataKey="month"
              tick={{ fontSize: 11, fill: "#76777d" }}
              axisLine={false}
              tickLine={false}
            />
            <YAxis
              tick={{ fontSize: 11, fill: "#76777d" }}
              axisLine={false}
              tickLine={false}
              tickFormatter={(v) => `$${(v / 1000).toFixed(0)}k`}
            />
            <Tooltip
              contentStyle={{
                borderRadius: "8px",
                border: "1px solid #e2e8f0",
                boxShadow: "0 4px 12px rgba(0,0,0,0.08)",
                fontSize: "12px",
              }}
              formatter={(value: number, name: string) => [
                `$${value.toLocaleString("en-US")}`,
                name === "revenue" ? "Revenue" : "Target",
              ]}
            />
            <Area
              type="monotone"
              dataKey="target"
              stroke="#4edea3"
              strokeWidth={2}
              fill="url(#targetGrad)"
              strokeDasharray="4 4"
              dot={false}
            />
            <Area
              type="monotone"
              dataKey="revenue"
              stroke="#2170e4"
              strokeWidth={2.5}
              fill="url(#revenueGrad)"
              dot={false}
              activeDot={{ r: 5, fill: "#2170e4", strokeWidth: 0 }}
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
      <div className="mt-4 flex items-center gap-5">
        <span className="flex items-center gap-1.5 text-xs text-[#45464d]">
          <span className="inline-block h-2.5 w-5 rounded-full bg-[#2170e4]" />
          Revenue
        </span>
        <span className="flex items-center gap-1.5 text-xs text-[#45464d]">
          <span className="inline-block h-0.5 w-5 border-t-2 border-dashed border-[#4edea3]" />
          Target
        </span>
      </div>
    </div>
  );
}

function TransactionsTable() {
  const t = useTranslations();
  const transactions: Transaction[] = Array.isArray(MOCK_TRANSACTIONS) ? MOCK_TRANSACTIONS : [];
  return (
    <div className="rounded-xl border border-[#e2e8f0] bg-white shadow-[0_1px_2px_rgba(0,0,0,0.04),0_4px_12px_-4px_rgba(0,0,0,0.06)]">
      <div className="flex items-center justify-between px-6 py-4">
        <h2 className="text-base font-semibold text-[#0b1c30]">
          {t("dashboard.transactions.title")}
        </h2>
        <button className="text-xs font-semibold text-[#2170e4] hover:underline transition-colors">
          {t("dashboard.transactions.viewAll")}
        </button>
      </div>
      <div className="border-t border-[#e5eeff]" />
      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-[#e5eeff]">
              <th className="px-6 py-3 text-left text-[10px] font-semibold uppercase tracking-widest text-[#76777d]">
                {t("dashboard.transactions.colId")}
              </th>
              <th className="px-6 py-3 text-left text-[10px] font-semibold uppercase tracking-widest text-[#76777d]">
                {t("dashboard.transactions.colDate")}
              </th>
              <th className="px-6 py-3 text-left text-[10px] font-semibold uppercase tracking-widest text-[#76777d]">
                {t("dashboard.transactions.colAmount")}
              </th>
              <th className="px-6 py-3 text-left text-[10px] font-semibold uppercase tracking-widest text-[#76777d]">
                {t("dashboard.transactions.colStatus")}
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-[#e5eeff]">
            {transactions.slice(0, 6).map((tx) => (
              <tr key={tx.id} className="hover:bg-[#f8f9ff] transition-colors">
                <td className="px-6 py-3.5 font-mono text-xs text-[#0b1c30]">
                  {tx.ref}
                </td>
                <td className="px-6 py-3.5 text-xs text-[#45464d]">{tx.date}</td>
                <td className="px-6 py-3.5 text-xs font-semibold text-[#0b1c30]">
                  {tx.amount}
                </td>
                <td className="px-6 py-3.5">
                  <span
                    className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-[11px] font-semibold ${
                      STATUS_STYLES[tx.status] ?? "bg-gray-100 text-gray-600"
                    }`}
                  >
                    {tx.status}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

function UserDistributionChart() {
  const t = useTranslations();
  const distribution = Array.isArray(MOCK_USER_DISTRIBUTION)
    ? MOCK_USER_DISTRIBUTION
    : [];
  const total = distribution.reduce(
    (sum: number, d: { value?: number }) => sum + (d.value ?? 0),
    0
  );

  return (
    <div className="rounded-xl border border-[#e2e8f0] bg-white p-6 shadow-[0_1px_2px_rgba(0,0,0,0.04),0_4px_12px_-4px_rgba(0,0,0,0.06)]">
      <div className="mb-4 flex items-center justify-between">
        <h2 className="text-base font-semibold text-[#0b1c30]">
          {t("dashboard.userDist.title")}
        </h2>
        <button className="flex h-8 w-8 items-center justify-center rounded-lg text-[#76777d] hover:bg-[#eff4ff] transition-colors">
          <MoreHorizontal className="h-4 w-4" />
        </button>
      </div>
      <div className="relative flex items-center justify-center">
        <PieChart width={180} height={180}>
          <Pie
            data={distribution}
            cx={85}
            cy={85}
            innerRadius={58}
            outerRadius={82}
            paddingAngle={3}
            dataKey="value"
            startAngle={90}
            endAngle={-270}
          >
            {distribution.map((_: unknown, index: number) => (
              <Cell
                key={`cell-${index}`}
                fill={PIE_COLORS[index % PIE_COLORS.length]}
              />
            ))}
          </Pie>
        </PieChart>
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <span className="text-xl font-bold text-[#0b1c30]">
            {total >= 1000 ? `${(total / 1000).toFixed(1)}k` : total}
          </span>
          <span className="text-[10px] text-[#76777d]">Total</span>
        </div>
      </div>
      <div className="mt-4 space-y-2">
        {distribution.map(
          (d: { name?: string; value?: number }, i: number) => (
            <div key={i} className="flex items-center justify-between text-xs">
              <span className="flex items-center gap-2 text-[#45464d]">
                <span
                  className="inline-block h-2.5 w-2.5 rounded-full"
                  style={{ background: PIE_COLORS[i % PIE_COLORS.length] }}
                />
                {d.name ?? ""}
              </span>
              <span className="font-semibold text-[#0b1c30]">
                {total > 0
                  ? `${(((d.value ?? 0) / total) * 100).toFixed(0)}%`
                  : "0%"}
              </span>
            </div>
          )
        )}
      </div>
    </div>
  );
}

export default function DashboardPage() {
  const t = useTranslations();
  const [dateRange] = useState("Oct 1 - Oct 31, 2023");
  const kpiCards = Array.isArray(MOCK_KPI_CARDS) ? MOCK_KPI_CARDS : [];

  return (
    <div className="min-h-screen bg-[#f8f9ff] p-6 md:p-8">
      {/* Page header */}
      <Reveal>
        <div className="mb-7 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h1 className="text-[1.75rem] font-bold leading-tight tracking-tight text-[#0b1c30]">
              {t("dashboard.header.greeting")}
            </h1>
            <p className="mt-1 text-sm text-[#45464d]">
              {t("dashboard.header.subtitle")}
            </p>
          </div>
          <button className="inline-flex items-center gap-2 rounded-lg border border-[#e2e8f0] bg-white px-4 py-2 text-sm font-medium text-[#0b1c30] shadow-sm hover:bg-[#eff4ff] transition-colors">
            <Calendar className="h-4 w-4 text-[#2170e4]" />
            {dateRange}
            <ChevronDown className="h-4 w-4 text-[#76777d]" />
          </button>
        </div>
      </Reveal>

      {/* KPI Cards */}
      <Reveal>
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          animate="visible"
          className="mb-6 grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4"
        >
          {kpiCards.map((card, i) => (
            <motion.div key={card.key} variants={fadeInUp} custom={i}>
              <KPITile card={card} />
            </motion.div>
          ))}
        </motion.div>
      </Reveal>

      {/* Revenue Chart */}
      <Reveal className="mb-6">
        <RevenueChart />
      </Reveal>

      {/* Bottom row: Transactions + User Distribution */}
      <Reveal>
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
          <div className="lg:col-span-2">
            <TransactionsTable />
          </div>
          <div className="lg:col-span-1">
            <UserDistributionChart />
          </div>
        </div>
      </Reveal>
    </div>
  );
}