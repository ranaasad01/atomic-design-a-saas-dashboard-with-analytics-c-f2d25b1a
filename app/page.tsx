'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
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
} from 'recharts';
import { DollarSign, Users, Activity, TrendingUp, ArrowUpRight, ArrowDownRight, Calendar, ChevronDown } from 'lucide-react';
import { Reveal } from '@/components/Reveal';
import DashboardHeader from '@/components/DashboardHeader';
import { mockTransactions } from '@/lib/data';
import type { Transaction } from '@/lib/data';

// ---------------------------------------------------------------------------
// Local types
// ---------------------------------------------------------------------------
interface KPICardData {
  key: string;
  title: string;
  value: string;
  trend: string;
  trendDirection: 'up' | 'down';
  trendLabel: string;
  icon: string;
}

// ---------------------------------------------------------------------------
// Module-level constants — guaranteed non-empty, no translation dependency
// ---------------------------------------------------------------------------
const MOCK_KPI_CARDS: KPICardData[] = [
  {
    key: 'revenue',
    title: 'Total Revenue',
    value: '$84,320',
    trend: '+12.4%',
    trendDirection: 'up',
    trendLabel: 'vs last period',
    icon: 'DollarSign',
  },
  {
    key: 'users',
    title: 'Active Users',
    value: '14,208',
    trend: '+8.1%',
    trendDirection: 'up',
    trendLabel: 'vs last period',
    icon: 'Users',
  },
  {
    key: 'sessions',
    title: 'Total Sessions',
    value: '39,540',
    trend: '-2.7%',
    trendDirection: 'down',
    trendLabel: 'vs last period',
    icon: 'Activity',
  },
  {
    key: 'conversion',
    title: 'Conversion Rate',
    value: '3.86%',
    trend: '+0.5 pp',
    trendDirection: 'up',
    trendLabel: 'vs last period',
    icon: 'TrendingUp',
  },
];

const MOCK_REVENUE_DATA = [
  { month: 'Jan', revenue: 52400, target: 55000 },
  { month: 'Feb', revenue: 58900, target: 60000 },
  { month: 'Mar', revenue: 61200, target: 63000 },
  { month: 'Apr', revenue: 67800, target: 68000 },
  { month: 'May', revenue: 71500, target: 72000 },
  { month: 'Jun', revenue: 75100, target: 75000 },
  { month: 'Jul', revenue: 79300, target: 80000 },
  { month: 'Aug', revenue: 84320, target: 85000 },
];

const MOCK_USER_DISTRIBUTION = [
  { name: 'New Users', value: 58 },
  { name: 'Returning', value: 32 },
  { name: 'Churned', value: 10 },
];

// ---------------------------------------------------------------------------
// Static maps
// ---------------------------------------------------------------------------
const ICON_MAP: Record<string, React.ReactNode> = {
  DollarSign: <DollarSign className="h-5 w-5" />,
  Users: <Users className="h-5 w-5" />,
  Activity: <Activity className="h-5 w-5" />,
  TrendingUp: <TrendingUp className="h-5 w-5" />,
};

const STATUS_STYLES: Record<string, string> = {
  Completed: 'bg-emerald-50 text-emerald-700 border border-emerald-200',
  Pending: 'bg-amber-50 text-amber-700 border border-amber-200',
  Failed: 'bg-red-50 text-red-700 border border-red-200',
};

const PIE_COLORS = ['#2170e4', '#4edea3', '#adc6ff'];

const PERIOD_OPTIONS: { value: string; label: string }[] = [
  { value: '7d', label: 'Last 7 Days' },
  { value: '30d', label: 'Last 30 Days' },
  { value: '90d', label: 'Last 90 Days' },
];

// ---------------------------------------------------------------------------
// Sub-components
// ---------------------------------------------------------------------------
function KPICardTile({ card }: { card: KPICardData }) {
  const isUp = card.trendDirection === 'up';
  return (
    <motion.div
      whileHover={{ y: -2, boxShadow: '0 8px 24px -8px rgba(0,0,0,0.12)' }}
      transition={{ duration: 0.2 }}
      className="rounded-xl border border-[#e2e8f0] bg-white p-6 flex flex-col gap-3"
      style={{ boxShadow: '0 1px 3px rgba(0,0,0,0.04), 0 4px 12px -4px rgba(0,0,0,0.08)' }}
    >
      <div className="flex items-start justify-between">
        <p className="text-xs font-semibold tracking-widest text-[#45464d] uppercase">
          {card.title}
        </p>
        <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-[#eff4ff] text-[#2170e4]">
          {ICON_MAP[card.icon] ?? <Activity className="h-5 w-5" />}
        </span>
      </div>
      <p
        className="text-4xl font-bold tracking-tight text-[#0b1c30]"
        style={{ fontFamily: 'Plus Jakarta Sans, sans-serif' }}
      >
        {card.value}
      </p>
      <div className="flex items-center gap-2">
        <span
          className={`inline-flex items-center gap-1 rounded-full px-2 py-0.5 text-xs font-semibold ${
            isUp ? 'bg-emerald-50 text-emerald-700' : 'bg-red-50 text-red-600'
          }`}
        >
          {isUp ? (
            <ArrowUpRight className="h-3 w-3" />
          ) : (
            <ArrowDownRight className="h-3 w-3" />
          )}
          {card.trend}
        </span>
        <span className="text-xs text-[#45464d]">{card.trendLabel}</span>
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
            STATUS_STYLES[tx.status] ?? 'bg-gray-100 text-gray-600'
          }`}
        >
          {tx.status}
        </span>
      </td>
    </tr>
  );
}

// ---------------------------------------------------------------------------
// Custom tooltip for revenue chart
// ---------------------------------------------------------------------------
function RevenueTooltip({
  active,
  payload,
  label,
}: {
  active?: boolean;
  payload?: Array<{ value: number; name: string }>;
  label?: string;
}) {
  if (!active || !payload || payload.length === 0) return null;
  return (
    <div className="rounded-lg border border-[#e2e8f0] bg-white px-4 py-3 shadow-lg text-sm">
      <p className="font-semibold text-[#0b1c30] mb-1">{label}</p>
      {payload.map((entry) => (
        <p key={entry.name} className="text-[#45464d]">
          <span className="font-medium text-[#2170e4]">
            ${entry.value.toLocaleString('en-US')}
          </span>{' '}
          {entry.name}
        </p>
      ))}
    </div>
  );
}

// ---------------------------------------------------------------------------
// Page
// ---------------------------------------------------------------------------
export default function DashboardPage() {
  const [period, setPeriod] = useState('30d');

  return (
    <div className="flex flex-col h-full">
      <DashboardHeader title="Dashboard" subtitle="Welcome back, Alex" />

      {/* Scrollable content */}
      <div className="flex-1 overflow-y-auto scrollbar-thin">
        <div className="px-6 py-6 space-y-6 max-w-[1600px] mx-auto">

          {/* Top bar */}
          <div className="flex items-center justify-between">
            <div>
              <h1
                className="text-2xl font-bold tracking-tight text-[#0b1c30]"
                style={{ fontFamily: 'Plus Jakarta Sans, sans-serif' }}
              >
                Overview
              </h1>
              <p className="text-sm text-[#45464d] mt-0.5">Track your key metrics at a glance.</p>
            </div>

            {/* Period selector */}
            <div className="relative flex items-center gap-2 rounded-lg border border-[#e2e8f0] bg-white px-3 py-2 shadow-sm">
              <Calendar className="h-4 w-4 text-[#45464d]" aria-hidden="true" />
              <select
                value={period}
                onChange={(e) => setPeriod(e.target.value)}
                className="appearance-none bg-transparent text-sm font-medium text-[#0b1c30] pr-6 focus:outline-none cursor-pointer"
                aria-label="Select time period"
              >
                {PERIOD_OPTIONS.map((opt) => (
                  <option key={opt.value} value={opt.value}>
                    {opt.label}
                  </option>
                ))}
              </select>
              <ChevronDown className="pointer-events-none absolute right-3 h-4 w-4 text-[#45464d]" aria-hidden="true" />
            </div>
          </div>

          {/* KPI Cards */}
          <Reveal>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {MOCK_KPI_CARDS.map((card) => (
                <KPICardTile key={card.key} card={card} />
              ))}
            </div>
          </Reveal>

          {/* Revenue Growth Chart */}
          <Reveal delay={0.05}>
            <div
              className="rounded-xl border border-[#e2e8f0] bg-white p-6"
              style={{ boxShadow: '0 1px 3px rgba(0,0,0,0.04), 0 4px 12px -4px rgba(0,0,0,0.08)' }}
            >
              <div className="flex items-center justify-between mb-6">
                <div>
                  <h2
                    className="text-base font-semibold text-[#0b1c30]"
                    style={{ fontFamily: 'Plus Jakarta Sans, sans-serif' }}
                  >
                    Revenue Growth
                  </h2>
                  <p className="text-xs text-[#45464d] mt-0.5">Jan 2024 – Aug 2024</p>
                </div>
                <div className="flex items-center gap-4 text-xs text-[#45464d]">
                  <span className="flex items-center gap-1.5">
                    <span className="inline-block w-3 h-3 rounded-sm bg-[#2170e4]" />
                    Revenue
                  </span>
                  <span className="flex items-center gap-1.5">
                    <span className="inline-block w-3 h-3 rounded-sm bg-[#adc6ff]" />
                    Target
                  </span>
                </div>
              </div>
              <ResponsiveContainer width="100%" height={260}>
                <AreaChart data={MOCK_REVENUE_DATA} margin={{ top: 4, right: 4, left: 0, bottom: 0 }}>
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
                    tick={{ fontSize: 12, fill: '#64748b' }}
                    axisLine={false}
                    tickLine={false}
                  />
                  <YAxis
                    tick={{ fontSize: 12, fill: '#64748b' }}
                    axisLine={false}
                    tickLine={false}
                    tickFormatter={(v: number) => `$${(v / 1000).toFixed(0)}k`}
                    width={48}
                  />
                  <Tooltip content={<RevenueTooltip />} />
                  <Area
                    type="monotone"
                    dataKey="target"
                    name="Target"
                    stroke="#adc6ff"
                    strokeWidth={2}
                    strokeDasharray="4 4"
                    fill="url(#targetGrad)"
                    dot={false}
                  />
                  <Area
                    type="monotone"
                    dataKey="revenue"
                    name="Revenue"
                    stroke="#2170e4"
                    strokeWidth={2.5}
                    fill="url(#revenueGrad)"
                    dot={false}
                    activeDot={{ r: 5, fill: '#2170e4', strokeWidth: 0 }}
                  />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </Reveal>

          {/* Bottom row: Transactions + User Distribution */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">

            {/* Recent Transactions */}
            <Reveal className="lg:col-span-2" delay={0.08}>
              <div
                className="rounded-xl border border-[#e2e8f0] bg-white h-full"
                style={{ boxShadow: '0 1px 3px rgba(0,0,0,0.04), 0 4px 12px -4px rgba(0,0,0,0.08)' }}
              >
                <div className="flex items-center justify-between px-6 py-4 border-b border-[#f1f5f9]">
                  <h2
                    className="text-base font-semibold text-[#0b1c30]"
                    style={{ fontFamily: 'Plus Jakarta Sans, sans-serif' }}
                  >
                    Recent Transactions
                  </h2>
                  <button className="text-xs font-medium text-[#2170e4] hover:underline transition-colors">
                    View All
                  </button>
                </div>
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr className="border-b border-[#f1f5f9]">
                        <th className="py-3 px-4 text-left text-xs font-semibold text-[#45464d] uppercase tracking-wider">
                          Transaction ID
                        </th>
                        <th className="py-3 px-4 text-left text-xs font-semibold text-[#45464d] uppercase tracking-wider">
                          Date
                        </th>
                        <th className="py-3 px-4 text-left text-xs font-semibold text-[#45464d] uppercase tracking-wider">
                          Amount
                        </th>
                        <th className="py-3 px-4 text-left text-xs font-semibold text-[#45464d] uppercase tracking-wider">
                          Status
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      {mockTransactions.map((tx) => (
                        <TransactionRow key={tx.id} tx={tx} />
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </Reveal>

            {/* User Distribution Donut */}
            <Reveal delay={0.1}>
              <div
                className="rounded-xl border border-[#e2e8f0] bg-white p-6 h-full flex flex-col"
                style={{ boxShadow: '0 1px 3px rgba(0,0,0,0.04), 0 4px 12px -4px rgba(0,0,0,0.08)' }}
              >
                <h2
                  className="text-base font-semibold text-[#0b1c30] mb-4"
                  style={{ fontFamily: 'Plus Jakarta Sans, sans-serif' }}
                >
                  User Distribution
                </h2>

                <div className="flex-1 flex items-center justify-center">
                  <div className="relative">
                    <ResponsiveContainer width={180} height={180}>
                      <PieChart>
                        <Pie
                          data={MOCK_USER_DISTRIBUTION}
                          cx="50%"
                          cy="50%"
                          innerRadius={55}
                          outerRadius={80}
                          paddingAngle={3}
                          dataKey="value"
                          startAngle={90}
                          endAngle={-270}
                        >
                          {MOCK_USER_DISTRIBUTION.map((entry, index) => (
                            <Cell
                              key={entry.name}
                              fill={PIE_COLORS[index % PIE_COLORS.length]}
                            />
                          ))}
                        </Pie>
                      </PieChart>
                    </ResponsiveContainer>
                    {/* Center label */}
                    <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
                      <span
                        className="text-2xl font-bold text-[#0b1c30]"
                        style={{ fontFamily: 'Plus Jakarta Sans, sans-serif' }}
                      >
                        14,208
                      </span>
                      <span className="text-xs text-[#45464d]">Total Users</span>
                    </div>
                  </div>
                </div>

                {/* Legend */}
                <ul className="mt-4 space-y-2">
                  {MOCK_USER_DISTRIBUTION.map((entry, index) => (
                    <li key={entry.name} className="flex items-center justify-between text-sm">
                      <span className="flex items-center gap-2">
                        <span
                          className="inline-block w-2.5 h-2.5 rounded-full"
                          style={{ backgroundColor: PIE_COLORS[index % PIE_COLORS.length] }}
                        />
                        <span className="text-[#45464d]">{entry.name}</span>
                      </span>
                      <span className="font-semibold text-[#0b1c30]">{entry.value}%</span>
                    </li>
                  ))}
                </ul>
              </div>
            </Reveal>
          </div>
        </div>
      </div>
    </div>
  );
}
