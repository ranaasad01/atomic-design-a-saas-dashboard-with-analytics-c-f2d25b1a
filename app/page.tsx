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
      <div className="flex items-center justify-between">
        <span className="text-sm font-medium text-[#64748b]">{card.title}</span>
        <span className="w-9 h-9 rounded-lg bg-[#eff6ff] flex items-center justify-center text-[#2563eb]">
          {ICON_MAP[card.icon] ?? <Activity className="h-5 w-5" />}
        </span>
      </div>
      <div className="flex items-end justify-between gap-2">
        <span className="text-2xl font-bold text-[#1e293b] font-jakarta tracking-tight">
          {card.value}
        </span>
        <span
          className={`inline-flex items-center gap-1 text-xs font-semibold px-2 py-0.5 rounded-full ${
            isUp
              ? 'bg-emerald-50 text-emerald-700'
              : 'bg-red-50 text-red-600'
          }`}
        >
          {isUp ? (
            <ArrowUpRight className="w-3 h-3" />
          ) : (
            <ArrowDownRight className="w-3 h-3" />
          )}
          {card.trend}
        </span>
      </div>
      <p className="text-xs text-[#94a3b8]">{card.trendLabel}</p>
    </motion.div>
  );
}

function RevenueChart({ data }: { data: typeof MOCK_REVENUE_DATA }) {
  const safeData = data ?? [];
  return (
    <ResponsiveContainer width="100%" height={260}>
      <AreaChart data={safeData} margin={{ top: 8, right: 8, left: 0, bottom: 0 }}>
        <defs>
          <linearGradient id="revenueGrad" x1="0" y1="0" x2="0" y2="1">
            <stop offset="5%" stopColor="#2563eb" stopOpacity={0.18} />
            <stop offset="95%" stopColor="#2563eb" stopOpacity={0} />
          </linearGradient>
          <linearGradient id="targetGrad" x1="0" y1="0" x2="0" y2="1">
            <stop offset="5%" stopColor="#94a3b8" stopOpacity={0.1} />
            <stop offset="95%" stopColor="#94a3b8" stopOpacity={0} />
          </linearGradient>
        </defs>
        <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" vertical={false} />
        <XAxis
          dataKey="month"
          tick={{ fontSize: 12, fill: '#94a3b8' }}
          axisLine={false}
          tickLine={false}
        />
        <YAxis
          tick={{ fontSize: 12, fill: '#94a3b8' }}
          axisLine={false}
          tickLine={false}
          tickFormatter={(v: number) => {
            try {
              return `$${(v / 1000).toLocaleString('en-US', { maximumFractionDigits: 0 })}k`;
            } catch {
              return `$${v}`;
            }
          }}
        />
        <Tooltip
          contentStyle={{
            background: '#fff',
            border: '1px solid #e2e8f0',
            borderRadius: 8,
            fontSize: 13,
          }}
          formatter={(value: number) => {
            try {
              return [`$${value?.toLocaleString?.('en-US') ?? String(value)}`, ''];
            } catch {
              return [`$${value}`, ''];
            }
          }}
        />
        <Area
          type="monotone"
          dataKey="target"
          stroke="#cbd5e1"
          strokeWidth={1.5}
          strokeDasharray="4 4"
          fill="url(#targetGrad)"
          dot={false}
        />
        <Area
          type="monotone"
          dataKey="revenue"
          stroke="#2563eb"
          strokeWidth={2}
          fill="url(#revenueGrad)"
          dot={false}
          activeDot={{ r: 5, fill: '#2563eb' }}
        />
      </AreaChart>
    </ResponsiveContainer>
  );
}

function UserDistributionChart({ data }: { data: typeof MOCK_USER_DISTRIBUTION }) {
  const safeData = data ?? [];
  const total = safeData.reduce((sum, d) => sum + (d?.value ?? 0), 0);
  return (
    <div className="flex items-center gap-6">
      <div className="relative flex-shrink-0">
        <PieChart width={160} height={160}>
          <Pie
            data={safeData}
            cx={75}
            cy={75}
            innerRadius={52}
            outerRadius={72}
            paddingAngle={2}
            dataKey="value"
          >
            {safeData.map((entry, index) => (
              <Cell
                key={`cell-${entry?.name ?? index}`}
                fill={PIE_COLORS[index % PIE_COLORS.length]}
              />
            ))}
          </Pie>
        </PieChart>
        <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
          <span className="text-xl font-bold text-[#1e293b] font-jakarta">
            {(() => {
              try {
                return total?.toLocaleString?.('en-US') ?? String(total);
              } catch {
                return String(total);
              }
            })()}
          </span>
          <span className="text-xs text-[#94a3b8]">users</span>
        </div>
      </div>
      <ul className="flex flex-col gap-2 flex-1">
        {safeData.map((entry, index) => (
          <li key={entry?.name ?? index} className="flex items-center gap-2 text-sm">
            <span
              className="w-2.5 h-2.5 rounded-full flex-shrink-0"
              style={{ background: PIE_COLORS[index % PIE_COLORS.length] }}
            />
            <span className="text-[#64748b] flex-1">{entry?.name ?? ''}</span>
            <span className="font-semibold text-[#1e293b]">{entry?.value ?? 0}%</span>
          </li>
        ))}
      </ul>
    </div>
  );
}

function TransactionsTable({ transactions }: { transactions: Transaction[] }) {
  const safeTransactions = transactions ?? [];
  return (
    <div className="overflow-x-auto">
      <table className="w-full text-sm">
        <thead>
          <tr className="border-b border-[#f1f5f9]">
            <th className="text-left py-3 px-4 text-xs font-semibold text-[#94a3b8] uppercase tracking-wide">
              Transaction ID
            </th>
            <th className="text-left py-3 px-4 text-xs font-semibold text-[#94a3b8] uppercase tracking-wide">
              Date
            </th>
            <th className="text-right py-3 px-4 text-xs font-semibold text-[#94a3b8] uppercase tracking-wide">
              Amount
            </th>
            <th className="text-center py-3 px-4 text-xs font-semibold text-[#94a3b8] uppercase tracking-wide">
              Status
            </th>
          </tr>
        </thead>
        <tbody>
          {safeTransactions.map((tx) => (
            <tr
              key={tx?.id ?? tx?.ref}
              className="border-b border-[#f8fafc] hover:bg-[#f8fafc] transition-colors duration-150"
            >
              <td className="py-3 px-4 font-mono text-xs text-[#2563eb] font-medium">
                {tx?.ref ?? ''}
              </td>
              <td className="py-3 px-4 text-[#64748b]">{tx?.date ?? ''}</td>
              <td className="py-3 px-4 text-right font-semibold text-[#1e293b]">
                {tx?.amount ?? ''}
              </td>
              <td className="py-3 px-4 text-center">
                <span
                  className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                    STATUS_STYLES[tx?.status ?? ''] ??
                    'bg-gray-50 text-gray-600 border border-gray-200'
                  }`}
                >
                  {tx?.status ?? ''}
                </span>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

// ---------------------------------------------------------------------------
// Main page
// ---------------------------------------------------------------------------
export default function DashboardPage() {
  const [period, setPeriod] = useState<string>('30d');

  const safeKpiCards = MOCK_KPI_CARDS ?? [];
  const safeRevenueData = MOCK_REVENUE_DATA ?? [];
  const safeUserDistribution = MOCK_USER_DISTRIBUTION ?? [];
  const safeTransactions = mockTransactions ?? [];

  const selectedPeriodLabel =
    PERIOD_OPTIONS.find((o) => o.value === period)?.label ?? 'Last 30 Days';

  return (
    <div className="flex flex-col min-h-full">
      <DashboardHeader title="Dashboard" subtitle="Welcome back, Alex">
        {/* Period selector */}
        <div className="relative">
          <button
            className="inline-flex items-center gap-2 px-3 py-1.5 text-sm font-medium text-[#64748b] bg-white border border-[#e2e8f0] rounded-lg hover:border-[#2563eb] hover:text-[#2563eb] transition-all duration-200"
            onClick={() => {
              // cycle through options for simplicity
              const idx = PERIOD_OPTIONS.findIndex((o) => o.value === period);
              const next = PERIOD_OPTIONS[(idx + 1) % PERIOD_OPTIONS.length];
              setPeriod(next?.value ?? '30d');
            }}
          >
            <Calendar className="w-4 h-4" />
            {selectedPeriodLabel}
            <ChevronDown className="w-3.5 h-3.5" />
          </button>
        </div>
      </DashboardHeader>

      <div className="flex-1 p-6 space-y-6">
        {/* Page heading */}
        <Reveal>
          <div>
            <h1 className="text-2xl font-bold text-[#1e293b] font-jakarta tracking-tight">
              Dashboard
            </h1>
            <p className="text-sm text-[#64748b] mt-0.5">
              Welcome back, Alex. Here&apos;s what&apos;s happening today.
            </p>
          </div>
        </Reveal>

        {/* KPI Cards */}
        <Reveal>
          <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4">
            {safeKpiCards.map((card) => (
              <KPICardTile key={card.key} card={card} />
            ))}
          </div>
        </Reveal>

        {/* Revenue Chart + User Distribution */}
        <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
          {/* Revenue Growth Chart */}
          <Reveal className="xl:col-span-2">
            <div
              className="rounded-xl border border-[#e2e8f0] bg-white p-6"
              style={{
                boxShadow:
                  '0 1px 3px rgba(0,0,0,0.04), 0 4px 12px -4px rgba(0,0,0,0.08)',
              }}
            >
              <div className="flex items-center justify-between mb-5">
                <div>
                  <h2 className="text-base font-semibold text-[#1e293b] font-jakarta">
                    Revenue Growth
                  </h2>
                  <p className="text-xs text-[#94a3b8] mt-0.5">
                    Monthly revenue vs target
                  </p>
                </div>
                <div className="flex items-center gap-4 text-xs text-[#64748b]">
                  <span className="flex items-center gap-1.5">
                    <span className="w-3 h-0.5 bg-[#2563eb] rounded-full inline-block" />
                    Revenue
                  </span>
                  <span className="flex items-center gap-1.5">
                    <span
                      className="w-3 h-0.5 inline-block rounded-full"
                      style={{
                        background: '#cbd5e1',
                        backgroundImage:
                          'repeating-linear-gradient(90deg,#cbd5e1 0,#cbd5e1 4px,transparent 4px,transparent 8px)',
                      }}
                    />
                    Target
                  </span>
                </div>
              </div>
              <RevenueChart data={safeRevenueData} />
            </div>
          </Reveal>

          {/* User Distribution */}
          <Reveal>
            <div
              className="rounded-xl border border-[#e2e8f0] bg-white p-6 h-full"
              style={{
                boxShadow:
                  '0 1px 3px rgba(0,0,0,0.04), 0 4px 12px -4px rgba(0,0,0,0.08)',
              }}
            >
              <h2 className="text-base font-semibold text-[#1e293b] font-jakarta mb-1">
                User Distribution
              </h2>
              <p className="text-xs text-[#94a3b8] mb-5">Segment breakdown</p>
              <UserDistributionChart data={safeUserDistribution} />
            </div>
          </Reveal>
        </div>

        {/* Recent Transactions */}
        <Reveal>
          <div
            className="rounded-xl border border-[#e2e8f0] bg-white"
            style={{
              boxShadow:
                '0 1px 3px rgba(0,0,0,0.04), 0 4px 12px -4px rgba(0,0,0,0.08)',
            }}
          >
            <div className="flex items-center justify-between px-6 py-4 border-b border-[#f1f5f9]">
              <div>
                <h2 className="text-base font-semibold text-[#1e293b] font-jakarta">
                  Recent Transactions
                </h2>
                <p className="text-xs text-[#94a3b8] mt-0.5">
                  Latest payment activity
                </p>
              </div>
              <button className="text-xs font-semibold text-[#2563eb] hover:text-[#1d4ed8] transition-colors duration-200">
                View All
              </button>
            </div>
            <TransactionsTable transactions={safeTransactions} />
          </div>
        </Reveal>
      </div>
    </div>
  );
}
