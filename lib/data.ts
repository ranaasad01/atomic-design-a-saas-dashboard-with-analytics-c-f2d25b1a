import { LayoutDashboard, BarChart2, FileText, Users, Settings, HelpCircle } from 'lucide-react';
import type { LucideIcon } from "lucide-react";

export const APP_NAME = "Analytix Pro";
export const APP_TAGLINE = "Enterprise Plan";
export const APP_BRAND = "Lumina Analytics";

export interface NavLink {
  key: string;
  label: string;
  href: string;
  icon: LucideIcon;
}

export const navLinks: NavLink[] = [
  { key: "dashboard", label: "Dashboard", href: "/", icon: LayoutDashboard },
  { key: "analytics", label: "Analytics", href: "/analytics", icon: BarChart2 },
  { key: "reports", label: "Reports", href: "/reports", icon: FileText },
  { key: "team", label: "Team", href: "/team", icon: Users },
  { key: "settings", label: "Settings", href: "/settings", icon: Settings },
  { key: "help", label: "Help Center", href: "/help", icon: HelpCircle },
];

export interface KPICard {
  key: string;
  title: string;
  value: string;
  trend: string;
  trendDirection: "up" | "down";
  trendLabel: string;
  icon: string;
}

export interface Transaction {
  id: string;
  ref: string;
  date: string;
  amount: string;
  status: "Completed" | "Pending" | "Failed";
}

export interface TeamMember {
  id: string;
  name: string;
  email: string;
  role: "Owner" | "Admin" | "Editor" | "Viewer";
  status: "active" | "pending";
  lastSeen: string;
  joinedAt: string;
  avatarInitials: string;
  avatarColor?: string;
}

export const mockTransactions: Transaction[] = [
  { id: "1", ref: "TXN-00841", date: "Aug 14, 2024", amount: "$1,200.00", status: "Completed" },
  { id: "2", ref: "TXN-00840", date: "Aug 13, 2024", amount: "$349.00", status: "Completed" },
  { id: "3", ref: "TXN-00839", date: "Aug 13, 2024", amount: "$89.00", status: "Pending" },
  { id: "4", ref: "TXN-00838", date: "Aug 12, 2024", amount: "$2,750.00", status: "Completed" },
  { id: "5", ref: "TXN-00837", date: "Aug 11, 2024", amount: "$540.00", status: "Failed" },
  { id: "6", ref: "TXN-00836", date: "Aug 10, 2024", amount: "$199.00", status: "Completed" },
];

export const mockTeamMembers: TeamMember[] = [
  { id: "1", name: "Jordan Ellis", email: "jordan.ellis@company.com", role: "Owner", status: "active", lastSeen: "2 hours ago", joinedAt: "Jan 12, 2024", avatarInitials: "JE", avatarColor: "#2563eb" },
  { id: "2", name: "Priya Nair", email: "priya.nair@company.com", role: "Admin", status: "active", lastSeen: "Yesterday", joinedAt: "Feb 3, 2024", avatarInitials: "PN", avatarColor: "#6366f1" },
  { id: "3", name: "Marcus Webb", email: "marcus.webb@company.com", role: "Editor", status: "active", lastSeen: "3 days ago", joinedAt: "Mar 18, 2024", avatarInitials: "MW", avatarColor: "#10b981" },
  { id: "4", name: "Sofia Reyes", email: "sofia.reyes@company.com", role: "Viewer", status: "active", lastSeen: "1 week ago", joinedAt: "Apr 7, 2024", avatarInitials: "SR", avatarColor: "#f59e0b" },
  { id: "5", name: "Daniel Cho", email: "daniel.cho@company.com", role: "Editor", status: "active", lastSeen: "Today", joinedAt: "Apr 22, 2024", avatarInitials: "DC", avatarColor: "#ef4444" },
  { id: "6", name: "alex.morgan@agency.io", email: "alex.morgan@agency.io", role: "Viewer", status: "pending", lastSeen: "Pending", joinedAt: "May 14, 2024", avatarInitials: "AM", avatarColor: "#64748b" },
  { id: "7", name: "team-lead@partnerco.com", email: "team-lead@partnerco.com", role: "Admin", status: "pending", lastSeen: "Pending", joinedAt: "May 20, 2024", avatarInitials: "TL", avatarColor: "#64748b" },
];

export const revenueChartData = [
  { month: "Jan", revenue: 52400, target: 55000 },
  { month: "Feb", revenue: 58900, target: 60000 },
  { month: "Mar", revenue: 61200, target: 63000 },
  { month: "Apr", revenue: 67800, target: 68000 },
  { month: "May", revenue: 71500, target: 72000 },
  { month: "Jun", revenue: 75100, target: 75000 },
  { month: "Jul", revenue: 79300, target: 80000 },
  { month: "Aug", revenue: 84320, target: 85000 },
];

export const trafficWeeklyData = [
  { week: "Jul 1", direct: 3800, organic: 6100, referral: 2200 },
  { week: "Jul 8", direct: 4100, organic: 6500, referral: 2350 },
  { week: "Jul 15", direct: 3950, organic: 6200, referral: 2100 },
  { week: "Jul 22", direct: 4400, organic: 7100, referral: 2600 },
  { week: "Jul 29", direct: 5100, organic: 8240, referral: 3010 },
];

export const trafficDailyData = [
  { day: "Aug 7", direct: 580, organic: 920, referral: 340 },
  { day: "Aug 8", direct: 620, organic: 980, referral: 360 },
  { day: "Aug 9", direct: 540, organic: 870, referral: 310 },
  { day: "Aug 10", direct: 700, organic: 1100, referral: 420 },
  { day: "Aug 11", direct: 660, organic: 1050, referral: 390 },
  { day: "Aug 12", direct: 590, organic: 940, referral: 350 },
  { day: "Aug 13", direct: 730, organic: 1180, referral: 450 },
];

export const trafficMonthlyData = [
  { month: "Mar", direct: 16200, organic: 26400, referral: 9600 },
  { month: "Apr", direct: 17800, organic: 28100, referral: 10200 },
  { month: "May", direct: 18400, organic: 29500, referral: 10800 },
  { month: "Jun", direct: 19100, organic: 31200, referral: 11400 },
  { month: "Jul", direct: 21050, organic: 34040, referral: 12460 },
  { month: "Aug", direct: 22800, organic: 37200, referral: 13500 },
];

export const userDistributionData = [
  { name: "New Users", value: 38, count: 5399, color: "#2563eb" },
  { name: "Returning", value: 47, count: 6678, color: "#6366f1" },
  { name: "Churned", value: 15, count: 2131, color: "#ef4444" },
];

export const deviceDistributionData = [
  { name: "Desktop", value: 54, sessions: 7672, color: "#2563eb" },
  { name: "Mobile", value: 33, sessions: 4689, color: "#10b981" },
  { name: "Tablet", value: 13, sessions: 1847, color: "#f59e0b" },
];

export const topPagesData = [
  { path: "/dashboard", pageviews: 24810, avgTime: "3m 42s", changePct: 8.4 },
  { path: "/pricing", pageviews: 18340, avgTime: "2m 15s", changePct: 21.7 },
  { path: "/features", pageviews: 14920, avgTime: "4m 03s", changePct: 5.2 },
  { path: "/blog/analytics-best-practices", pageviews: 11650, avgTime: "6m 28s", changePct: 33.1 },
  { path: "/signup", pageviews: 9480, avgTime: "1m 54s", changePct: -3.6 },
  { path: "/docs/getting-started", pageviews: 7210, avgTime: "5m 11s", changePct: 14.9 },
  { path: "/integrations", pageviews: 5870, avgTime: "3m 07s", changePct: 2.0 },
  { path: "/changelog", pageviews: 3340, avgTime: "2m 49s", changePct: -1.2 },
];

export const mockReports = [
  { id: "1", name: "Monthly Revenue Summary", type: "Financial", status: "Completed", date: "Jun 30, 2024", size: "412 KB", isScheduled: false },
  { id: "2", name: "Weekly Traffic Breakdown", type: "Analytics", status: "Scheduled", date: "Jul 1, 2024", size: "198 KB", isScheduled: true, schedule: "Every Monday 08:00 UTC" },
  { id: "3", name: "Q2 Conversion Funnel Report", type: "Marketing", status: "Completed", date: "Jun 28, 2024", size: "874 KB", isScheduled: false },
  { id: "4", name: "Daily Active Users Digest", type: "Analytics", status: "Scheduled", date: "Jul 3, 2024", size: "95 KB", isScheduled: true, schedule: "Every day 07:00 UTC" },
  { id: "5", name: "Device & Channel Attribution", type: "Analytics", status: "Completed", date: "Jun 25, 2024", size: "560 KB", isScheduled: false },
  { id: "6", name: "Top Pages Performance", type: "SEO", status: "Completed", date: "Jun 22, 2024", size: "231 KB", isScheduled: false },
  { id: "7", name: "Churn Risk Segment Analysis", type: "Customer Success", status: "Draft", date: "Jul 2, 2024", size: "—", isScheduled: false },
  { id: "8", name: "Billing & Subscription Summary", type: "Financial", status: "Scheduled", date: "Jul 1, 2024", size: "318 KB", isScheduled: true, schedule: "1st of each month" },
];
