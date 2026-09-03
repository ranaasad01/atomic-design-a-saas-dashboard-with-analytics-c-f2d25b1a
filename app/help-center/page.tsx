"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { useTranslations } from "next-intl";
import { Search, Rocket, Users, Shield, Code, ChevronRight, BookOpen, MessageCircle, FileText, Clock, ArrowRight, Star, CheckCircle, AlertCircle, HelpCircle, Zap, BarChart2, Settings } from 'lucide-react';
import { Reveal } from "@/components/Reveal";
import { APP_BRAND } from "@/lib/data";

const TOPICS = [
  {
    id: "getting-started",
    icon: Rocket,
    title: "Getting Started",
    description: "Quick start guides, platform overview, and initial workspace setup.",
    articleCount: 24,
    color: "bg-blue-50 text-blue-600",
  },
  {
    id: "account-billing",
    icon: Users,
    title: "Account & Billing",
    description: "Manage team access, roles, subscription plans, and invoices.",
    articleCount: 18,
    color: "bg-indigo-50 text-indigo-600",
  },
  {
    id: "data-security",
    icon: Shield,
    title: "Data Security",
    description: "Compliance documentation, SSO setup, and data retention policies.",
    articleCount: 15,
    color: "bg-emerald-50 text-emerald-600",
  },
  {
    id: "api-reference",
    icon: Code,
    title: "API Reference",
    description: "Endpoints, authentication, webhooks, and rate limiting details.",
    articleCount: 32,
    color: "bg-purple-50 text-purple-600",
  },
  {
    id: "analytics",
    icon: BarChart2,
    title: "Analytics & Reports",
    description: "Understanding dashboards, building custom reports, and exporting data.",
    articleCount: 21,
    color: "bg-amber-50 text-amber-600",
  },
  {
    id: "integrations",
    icon: Zap,
    title: "Integrations",
    description: "Connect third-party tools, configure webhooks, and manage data pipelines.",
    articleCount: 27,
    color: "bg-rose-50 text-rose-600",
  },
  {
    id: "workspace",
    icon: Settings,
    title: "Workspace Settings",
    description: "Configure your workspace, manage permissions, and customize notifications.",
    articleCount: 13,
    color: "bg-cyan-50 text-cyan-600",
  },
  {
    id: "troubleshooting",
    icon: AlertCircle,
    title: "Troubleshooting",
    description: "Common issues, error codes, and step-by-step resolution guides.",
    articleCount: 19,
    color: "bg-orange-50 text-orange-600",
  },
];

const POPULAR_ARTICLES = [
  {
    id: "1",
    title: "How to connect your first data source",
    category: "Getting Started",
    readTime: "5 min read",
    views: "12.4k views",
    helpful: 98,
  },
  {
    id: "2",
    title: "Setting up SSO with Okta or Azure AD",
    category: "Data Security",
    readTime: "8 min read",
    views: "8.1k views",
    helpful: 96,
  },
  {
    id: "3",
    title: "Understanding the Revenue Attribution model",
    category: "Analytics & Reports",
    readTime: "6 min read",
    views: "7.3k views",
    helpful: 94,
  },
  {
    id: "4",
    title: "API authentication and token management",
    category: "API Reference",
    readTime: "10 min read",
    views: "6.8k views",
    helpful: 97,
  },
  {
    id: "5",
    title: "Inviting team members and managing roles",
    category: "Account & Billing",
    readTime: "4 min read",
    views: "5.9k views",
    helpful: 99,
  },
  {
    id: "6",
    title: "Exporting reports as CSV or PDF",
    category: "Analytics & Reports",
    readTime: "3 min read",
    views: "5.2k views",
    helpful: 95,
  },
];

const RECENT_UPDATES = [
  {
    id: "u1",
    title: "New: Cohort Analysis feature now available",
    date: "Aug 1, 2024",
    type: "New Feature",
    typeColor: "bg-emerald-100 text-emerald-700",
  },
  {
    id: "u2",
    title: "Updated API rate limits for Enterprise plans",
    date: "Jul 28, 2024",
    type: "Update",
    typeColor: "bg-blue-100 text-blue-700",
  },
  {
    id: "u3",
    title: "Resolved: Dashboard loading delay on large datasets",
    date: "Jul 25, 2024",
    type: "Bug Fix",
    typeColor: "bg-amber-100 text-amber-700",
  },
  {
    id: "u4",
    title: "New Slack integration for report notifications",
    date: "Jul 22, 2024",
    type: "New Feature",
    typeColor: "bg-emerald-100 text-emerald-700",
  },
];

const SUPPORT_OPTIONS = [
  {
    id: "chat",
    icon: MessageCircle,
    title: "Live Chat",
    description: "Chat with our support team in real time. Available Monday to Friday, 9am to 6pm EST.",
    cta: "Start Chat",
    badge: "Online",
    badgeColor: "bg-emerald-100 text-emerald-700",
  },
  {
    id: "docs",
    icon: BookOpen,
    title: "Documentation",
    description: "Browse our full technical documentation, including API specs and SDK guides.",
    cta: "View Docs",
    badge: null,
    badgeColor: "",
  },
  {
    id: "ticket",
    icon: FileText,
    title: "Submit a Ticket",
    description: "Create a support ticket and our team will respond within 24 hours.",
    cta: "Open Ticket",
    badge: "24h response",
    badgeColor: "bg-blue-100 text-blue-700",
  },
];

export default function HelpCenterPage() {
  const t = useTranslations();
  const [searchQuery, setSearchQuery] = useState("");

  return (
    <div className="min-h-screen bg-[var(--color-surface)] p-6 space-y-6">

      {/* Hero Search Banner */}
      <Reveal>
        <div className="rounded-2xl border border-[var(--color-outline-variant)] bg-gradient-to-br from-[var(--color-surface-container-low)] to-[var(--color-surface-container)] p-10 text-center">
          <h1 className="text-3xl font-bold tracking-tight text-[var(--color-on-surface)] mb-3">
            How can we help?
          </h1>
          <p className="text-[var(--color-on-surface-variant)] text-base mb-8 max-w-xl mx-auto leading-relaxed">
            Search our knowledge base for guides, API documentation, and best practices for leveraging {APP_BRAND}.
          </p>
          <div className="flex items-center gap-3 max-w-2xl mx-auto">
            <div className="relative flex-1">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-[var(--color-on-surface-variant)]" aria-hidden="true" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search for articles, API endpoints, or troubleshooting guides..."
                className="w-full pl-11 pr-4 py-3 rounded-lg border border-[var(--color-outline-variant)] bg-white text-sm text-[var(--color-on-surface)] placeholder:text-[var(--color-on-surface-variant)] focus:outline-none focus:ring-2 focus:ring-[var(--color-secondary)] focus:border-[var(--color-secondary)] transition-all"
              />
            </div>
            <button className="px-6 py-3 rounded-lg bg-[var(--color-secondary)] text-white text-sm font-semibold hover:bg-[var(--color-secondary-container)] transition-colors whitespace-nowrap">
              Search
            </button>
          </div>
          <div className="flex items-center justify-center gap-6 mt-5 text-xs text-[var(--color-on-surface-variant)]">
            <span className="flex items-center gap-1.5"><CheckCircle className="h-3.5 w-3.5 text-emerald-500" aria-hidden="true" />169 articles</span>
            <span className="flex items-center gap-1.5"><CheckCircle className="h-3.5 w-3.5 text-emerald-500" aria-hidden="true" />Updated weekly</span>
            <span className="flex items-center gap-1.5"><CheckCircle className="h-3.5 w-3.5 text-emerald-500" aria-hidden="true" />API docs included</span>
          </div>
        </div>
      </Reveal>

      {/* Browse by Topic */}
      <Reveal>
        <div>
          <h2 className="text-lg font-semibold text-[var(--color-on-surface)] mb-4">Browse by Topic</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {TOPICS.map((topic, i) => {
              const Icon = topic.icon;
              return (
                <motion.div
                  key={topic.id}
                  whileHover={{ y: -2, boxShadow: "0 4px 20px rgba(0,0,0,0.08)" }}
                  transition={{ duration: 0.2 }}
                  className="rounded-xl border border-[var(--color-outline-variant)] bg-white p-5 cursor-pointer group"
                >
                  <div className={`inline-flex items-center justify-center w-10 h-10 rounded-lg mb-3 ${topic.color}`}>
                    <Icon className="h-5 w-5" aria-hidden="true" />
                  </div>
                  <h3 className="text-sm font-semibold text-[var(--color-on-surface)] mb-1 group-hover:text-[var(--color-secondary)] transition-colors">
                    {topic.title}
                  </h3>
                  <p className="text-xs text-[var(--color-on-surface-variant)] leading-relaxed mb-3 line-clamp-2">
                    {topic.description}
                  </p>
                  <span className="text-xs text-[var(--color-secondary)] font-medium flex items-center gap-1">
                    {topic.articleCount} articles <ChevronRight className="h-3 w-3" aria-hidden="true" />
                  </span>
                </motion.div>
              );
            })}
          </div>
        </div>
      </Reveal>

      {/* Popular Articles + Recent Updates */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">

        {/* Popular Articles */}
        <Reveal className="lg:col-span-2">
          <div className="rounded-xl border border-[var(--color-outline-variant)] bg-white overflow-hidden h-full">
            <div className="flex items-center justify-between px-6 py-4 border-b border-[var(--color-outline-variant)]">
              <div className="flex items-center gap-2">
                <Star className="h-4 w-4 text-amber-500" aria-hidden="true" />
                <h2 className="text-sm font-semibold text-[var(--color-on-surface)]">Popular Articles</h2>
              </div>
              <button className="text-xs text-[var(--color-secondary)] font-medium hover:underline flex items-center gap-1">
                View All <ArrowRight className="h-3 w-3" aria-hidden="true" />
              </button>
            </div>
            <div className="divide-y divide-[var(--color-outline-variant)]">
              {POPULAR_ARTICLES.map((article) => (
                <motion.div
                  key={article.id}
                  whileHover={{ backgroundColor: "rgba(241,245,249,0.6)" }}
                  className="flex items-start gap-4 px-6 py-4 cursor-pointer group"
                >
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-[var(--color-on-surface)] group-hover:text-[var(--color-secondary)] transition-colors truncate">
                      {article.title}
                    </p>
                    <div className="flex items-center gap-3 mt-1">
                      <span className="text-xs text-[var(--color-secondary)] font-medium">{article.category}</span>
                      <span className="text-xs text-[var(--color-on-surface-variant)] flex items-center gap-1">
                        <Clock className="h-3 w-3" aria-hidden="true" />{article.readTime}
                      </span>
                      <span className="text-xs text-[var(--color-on-surface-variant)]">{article.views}</span>
                    </div>
                  </div>
                  <div className="flex items-center gap-1 shrink-0">
                    <CheckCircle className="h-3.5 w-3.5 text-emerald-500" aria-hidden="true" />
                    <span className="text-xs text-emerald-600 font-medium">{article.helpful}%</span>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </Reveal>

        {/* Recent Updates */}
        <Reveal>
          <div className="rounded-xl border border-[var(--color-outline-variant)] bg-white overflow-hidden h-full">
            <div className="flex items-center gap-2 px-6 py-4 border-b border-[var(--color-outline-variant)]">
              <HelpCircle className="h-4 w-4 text-[var(--color-secondary)]" aria-hidden="true" />
              <h2 className="text-sm font-semibold text-[var(--color-on-surface)]">Recent Updates</h2>
            </div>
            <div className="divide-y divide-[var(--color-outline-variant)]">
              {RECENT_UPDATES.map((update) => (
                <div key={update.id} className="px-6 py-4">
                  <div className="flex items-start gap-2 mb-2">
                    <span className={`text-xs font-semibold px-2 py-0.5 rounded-full shrink-0 ${update.typeColor}`}>
                      {update.type}
                    </span>
                  </div>
                  <p className="text-sm text-[var(--color-on-surface)] font-medium leading-snug mb-1">
                    {update.title}
                  </p>
                  <p className="text-xs text-[var(--color-on-surface-variant)]">{update.date}</p>
                </div>
              ))}
            </div>
            <div className="px-6 py-4 border-t border-[var(--color-outline-variant)]">
              <button className="text-xs text-[var(--color-secondary)] font-medium hover:underline flex items-center gap-1">
                View changelog <ArrowRight className="h-3 w-3" aria-hidden="true" />
              </button>
            </div>
          </div>
        </Reveal>
      </div>

      {/* Contact Support Options */}
      <Reveal>
        <div>
          <h2 className="text-lg font-semibold text-[var(--color-on-surface)] mb-4">Still need help?</h2>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {SUPPORT_OPTIONS.map((option) => {
              const Icon = option.icon;
              return (
                <motion.div
                  key={option.id}
                  whileHover={{ y: -2 }}
                  transition={{ duration: 0.2 }}
                  className="rounded-xl border border-[var(--color-outline-variant)] bg-white p-6 flex flex-col gap-3"
                >
                  <div className="flex items-center justify-between">
                    <div className="inline-flex items-center justify-center w-10 h-10 rounded-lg bg-[var(--color-surface-container-low)]">
                      <Icon className="h-5 w-5 text-[var(--color-secondary)]" aria-hidden="true" />
                    </div>
                    {option.badge && (
                      <span className={`text-xs font-semibold px-2 py-0.5 rounded-full ${option.badgeColor}`}>
                        {option.badge}
                      </span>
                    )}
                  </div>
                  <div>
                    <h3 className="text-sm font-semibold text-[var(--color-on-surface)] mb-1">{option.title}</h3>
                    <p className="text-xs text-[var(--color-on-surface-variant)] leading-relaxed">{option.description}</p>
                  </div>
                  <button className="mt-auto text-sm font-semibold text-[var(--color-secondary)] flex items-center gap-1 hover:gap-2 transition-all">
                    {option.cta} <ArrowRight className="h-4 w-4" aria-hidden="true" />
                  </button>
                </motion.div>
              );
            })}
          </div>
        </div>
      </Reveal>

    </div>
  );
}