"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { useTranslations } from "next-intl";
import { Search, Rocket, Users, Shield, FileCode, ChevronRight, BookOpen, MessageCircle, Mail, Clock, CheckCircle, ArrowRight, Star, Zap, BarChart2, Settings, AlertCircle } from 'lucide-react';
import { Reveal } from "@/components/Reveal";
import { APP_BRAND } from "@/lib/data";

const HELP_TOPICS = [
  {
    id: "getting-started",
    icon: Rocket,
    title: "Getting Started",
    description:
      "Quick start guides, platform overview, and initial workspace setup.",
    articles: 24,
    color: "bg-[var(--help-blue-bg)] text-[var(--help-blue-icon)]",
  },
  {
    id: "account-billing",
    icon: Users,
    title: "Account & Billing",
    description:
      "Manage team access, roles, subscription plans, and invoices.",
    articles: 18,
    color: "bg-[var(--help-blue-bg)] text-[var(--help-blue-icon)]",
  },
  {
    id: "data-security",
    icon: Shield,
    title: "Data Security",
    description:
      "Compliance documentation, SSO setup, and data retention policies.",
    articles: 15,
    color: "bg-[var(--help-blue-bg)] text-[var(--help-blue-icon)]",
  },
  {
    id: "api-reference",
    icon: FileCode,
    title: "API Reference",
    description:
      "Endpoints, authentication, webhooks, and rate limit documentation.",
    articles: 42,
    color: "bg-[var(--help-blue-bg)] text-[var(--help-blue-icon)]",
  },
];

const POPULAR_ARTICLES = [
  {
    id: "1",
    category: "Getting Started",
    title: "How to connect your first data source",
    readTime: "5 min read",
    views: "12.4k views",
  },
  {
    id: "2",
    category: "API Reference",
    title: "Authentication and API key management",
    readTime: "8 min read",
    views: "9.1k views",
  },
  {
    id: "3",
    category: "Account & Billing",
    title: "Upgrading your subscription plan",
    readTime: "3 min read",
    views: "7.8k views",
  },
  {
    id: "4",
    category: "Data Security",
    title: "Setting up SSO with your identity provider",
    readTime: "12 min read",
    views: "6.2k views",
  },
  {
    id: "5",
    category: "Getting Started",
    title: "Creating your first analytics dashboard",
    readTime: "6 min read",
    views: "5.9k views",
  },
  {
    id: "6",
    category: "API Reference",
    title: "Webhook configuration and event types",
    readTime: "10 min read",
    views: "4.7k views",
  },
];

const QUICK_LINKS = [
  { icon: BarChart2, label: "Dashboard Guide", href: "#" },
  { icon: FileCode, label: "API Docs", href: "#" },
  { icon: Settings, label: "Workspace Setup", href: "#" },
  { icon: AlertCircle, label: "Troubleshooting", href: "#" },
];

const SUPPORT_OPTIONS = [
  {
    icon: MessageCircle,
    title: "Live Chat",
    description: "Chat with our support team in real time.",
    availability: "Available 9am – 6pm EST",
    action: "Start Chat",
    highlight: true,
  },
  {
    icon: Mail,
    title: "Email Support",
    description: "Send us a detailed message and we will respond within 24 hours.",
    availability: "Response within 24 hours",
    action: "Send Email",
    highlight: false,
  },
  {
    icon: BookOpen,
    title: "Community Forum",
    description: "Browse answers from the Lumina Analytics community.",
    availability: "Always available",
    action: "Visit Forum",
    highlight: false,
  },
];

const STATUS_ITEMS = [
  { label: "API Gateway", status: "operational" },
  { label: "Dashboard", status: "operational" },
  { label: "Data Ingestion", status: "operational" },
  { label: "Report Generation", status: "degraded" },
];

export default function HelpPage() {
  const t = useTranslations();
  const [searchQuery, setSearchQuery] = useState("");

  return (
    <div className="min-h-screen bg-[var(--surface)] p-6 space-y-6">
      {/* Hero Search */}
      <Reveal>
        <div className="rounded-2xl border border-[var(--outline-variant)] bg-gradient-to-br from-[var(--surface-container-low)] to-[var(--surface-container)] p-10 text-center">
          <h1 className="text-[var(--on-surface)] font-bold text-3xl tracking-tight mb-3">
            {t("help.hero.title")}
          </h1>
          <p className="text-[var(--on-surface-variant)] text-base mb-8 max-w-xl mx-auto leading-relaxed">
            {t("help.hero.subtitle")}
          </p>
          <div className="flex items-center gap-3 max-w-2xl mx-auto">
            <div className="relative flex-1">
              <Search
                className="absolute left-4 top-1/2 -translate-y-1/2 text-[var(--outline)] h-4 w-4"
                aria-hidden="true"
              />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder={t("help.hero.searchPlaceholder")}
                className="w-full pl-11 pr-4 py-3 rounded-lg border border-[var(--outline-variant)] bg-[var(--surface-container-lowest)] text-[var(--on-surface)] text-sm placeholder:text-[var(--outline)] focus:outline-none focus:border-[var(--secondary)] focus:ring-2 focus:ring-[var(--secondary)]/20 transition-all"
              />
            </div>
            <button className="px-6 py-3 rounded-lg bg-[var(--secondary)] text-[var(--on-secondary)] text-sm font-semibold hover:bg-[var(--secondary-container)] transition-colors whitespace-nowrap">
              {t("help.hero.searchButton")}
            </button>
          </div>
          <div className="flex items-center justify-center gap-6 mt-6">
            {(Array.isArray(t.raw("help.quickLinks")) ? t.raw("help.quickLinks") : []).map(
              (link: { label: string }, i: number) => {
                const Icon = QUICK_LINKS[i]?.icon;
                return (
                  <a
                    key={i}
                    href="#"
                    className="flex items-center gap-1.5 text-xs text-[var(--secondary)] hover:underline font-medium"
                  >
                    {Icon && <Icon className="h-3.5 w-3.5" aria-hidden="true" />}
                    {link.label}
                  </a>
                );
              }
            )}
          </div>
        </div>
      </Reveal>

      {/* Browse by Topic */}
      <Reveal>
        <div>
          <h2 className="text-[var(--on-surface)] font-semibold text-lg mb-4">
            {t("help.topics.heading")}
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {HELP_TOPICS.map((topic, i) => {
              const Icon = topic.icon;
              return (
                <motion.a
                  key={topic.id}
                  href="#"
                  whileHover={{ y: -2, boxShadow: "0 8px 24px -8px rgba(0,0,0,0.12)" }}
                  transition={{ duration: 0.2 }}
                  className="block rounded-xl border border-[var(--outline-variant)] bg-[var(--surface-container-lowest)] p-6 cursor-pointer group"
                >
                  <div
                    className={`inline-flex items-center justify-center w-11 h-11 rounded-xl mb-4 ${topic.color}`}
                  >
                    <Icon className="h-5 w-5" aria-hidden="true" />
                  </div>
                  <h3 className="text-[var(--on-surface)] font-semibold text-sm mb-1.5 group-hover:text-[var(--secondary)] transition-colors">
                    {topic.title}
                  </h3>
                  <p className="text-[var(--on-surface-variant)] text-xs leading-relaxed mb-3">
                    {topic.description}
                  </p>
                  <span className="text-xs text-[var(--outline)] font-medium">
                    {topic.articles} articles
                  </span>
                </motion.a>
              );
            })}
          </div>
        </div>
      </Reveal>

      {/* Popular Articles + System Status */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Popular Articles */}
        <Reveal className="lg:col-span-2">
          <div className="rounded-xl border border-[var(--outline-variant)] bg-[var(--surface-container-lowest)] overflow-hidden">
            <div className="flex items-center justify-between px-6 py-4 border-b border-[var(--outline-variant)]">
              <div className="flex items-center gap-2">
                <Star className="h-4 w-4 text-[var(--secondary)]" aria-hidden="true" />
                <h2 className="text-[var(--on-surface)] font-semibold text-sm">
                  {t("help.popular.heading")}
                </h2>
              </div>
              <a
                href="#"
                className="text-xs text-[var(--secondary)] font-medium hover:underline flex items-center gap-1"
              >
                {t("help.popular.viewAll")}
                <ArrowRight className="h-3 w-3" aria-hidden="true" />
              </a>
            </div>
            <div className="divide-y divide-[var(--outline-variant)]">
              {POPULAR_ARTICLES.map((article) => (
                <motion.a
                  key={article.id}
                  href="#"
                  whileHover={{ backgroundColor: "var(--surface-container-low)" }}
                  className="flex items-start justify-between px-6 py-4 group transition-colors"
                >
                  <div className="flex-1 min-w-0">
                    <span className="inline-block text-xs font-semibold text-[var(--secondary)] bg-[var(--help-blue-bg)] px-2 py-0.5 rounded-full mb-1.5">
                      {article.category}
                    </span>
                    <p className="text-[var(--on-surface)] text-sm font-medium group-hover:text-[var(--secondary)] transition-colors leading-snug">
                      {article.title}
                    </p>
                    <div className="flex items-center gap-3 mt-1.5">
                      <span className="flex items-center gap-1 text-xs text-[var(--outline)]">
                        <Clock className="h-3 w-3" aria-hidden="true" />
                        {article.readTime}
                      </span>
                      <span className="text-xs text-[var(--outline)]">{article.views}</span>
                    </div>
                  </div>
                  <ChevronRight className="h-4 w-4 text-[var(--outline)] group-hover:text-[var(--secondary)] transition-colors mt-1 ml-4 flex-shrink-0" aria-hidden="true" />
                </motion.a>
              ))}
            </div>
          </div>
        </Reveal>

        {/* System Status */}
        <Reveal>
          <div className="rounded-xl border border-[var(--outline-variant)] bg-[var(--surface-container-lowest)] overflow-hidden">
            <div className="flex items-center justify-between px-6 py-4 border-b border-[var(--outline-variant)]">
              <div className="flex items-center gap-2">
                <Zap className="h-4 w-4 text-[var(--secondary)]" aria-hidden="true" />
                <h2 className="text-[var(--on-surface)] font-semibold text-sm">
                  {t("help.status.heading")}
                </h2>
              </div>
              <span className="text-xs font-semibold text-[var(--help-green-text)] bg-[var(--help-green-bg)] px-2 py-0.5 rounded-full">
                {t("help.status.badge")}
              </span>
            </div>
            <div className="px-6 py-4 space-y-3">
              {STATUS_ITEMS.map((item) => (
                <div key={item.label} className="flex items-center justify-between">
                  <span className="text-sm text-[var(--on-surface-variant)]">{item.label}</span>
                  {item.status === "operational" ? (
                    <span className="flex items-center gap-1.5 text-xs font-semibold text-[var(--help-green-text)]">
                      <CheckCircle className="h-3.5 w-3.5" aria-hidden="true" />
                      Operational
                    </span>
                  ) : (
                    <span className="flex items-center gap-1.5 text-xs font-semibold text-amber-600">
                      <AlertCircle className="h-3.5 w-3.5" aria-hidden="true" />
                      Degraded
                    </span>
                  )}
                </div>
              ))}
            </div>
            <div className="px-6 pb-4">
              <div className="rounded-lg bg-[var(--surface-container-low)] border border-[var(--outline-variant)] p-3">
                <p className="text-xs text-[var(--on-surface-variant)] leading-relaxed">
                  {t("help.status.note")}
                </p>
                <a
                  href="#"
                  className="text-xs text-[var(--secondary)] font-medium hover:underline mt-1 inline-block"
                >
                  {t("help.status.historyLink")}
                </a>
              </div>
            </div>
          </div>
        </Reveal>
      </div>

      {/* Contact Support */}
      <Reveal>
        <div>
          <h2 className="text-[var(--on-surface)] font-semibold text-lg mb-4">
            {t("help.support.heading")}
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {SUPPORT_OPTIONS.map((option) => {
              const Icon = option.icon;
              return (
                <motion.div
                  key={option.title}
                  whileHover={{ y: -2 }}
                  transition={{ duration: 0.2 }}
                  className={`rounded-xl border p-6 ${
                    option.highlight
                      ? "border-[var(--secondary)] bg-[var(--secondary-container)] text-[var(--on-secondary-container)]"
                      : "border-[var(--outline-variant)] bg-[var(--surface-container-lowest)]"
                  }`}
                >
                  <div
                    className={`inline-flex items-center justify-center w-10 h-10 rounded-xl mb-4 ${
                      option.highlight
                        ? "bg-white/20 text-white"
                        : "bg-[var(--help-blue-bg)] text-[var(--help-blue-icon)]"
                    }`}
                  >
                    <Icon className="h-5 w-5" aria-hidden="true" />
                  </div>
                  <h3
                    className={`font-semibold text-sm mb-1 ${
                      option.highlight ? "text-[var(--on-secondary-container)]" : "text-[var(--on-surface)]"
                    }`}
                  >
                    {option.title}
                  </h3>
                  <p
                    className={`text-xs leading-relaxed mb-3 ${
                      option.highlight ? "text-[var(--on-secondary-container)]/80" : "text-[var(--on-surface-variant)]"
                    }`}
                  >
                    {option.description}
                  </p>
                  <p
                    className={`text-xs mb-4 font-medium ${
                      option.highlight ? "text-[var(--on-secondary-container)]/70" : "text-[var(--outline)]"
                    }`}
                  >
                    {option.availability}
                  </p>
                  <button
                    className={`w-full py-2 rounded-lg text-xs font-semibold transition-colors ${
                      option.highlight
                        ? "bg-white text-[var(--secondary)] hover:bg-white/90"
                        : "border border-[var(--outline-variant)] text-[var(--on-surface)] hover:bg-[var(--surface-container-low)]"
                    }`}
                  >
                    {option.action}
                  </button>
                </motion.div>
              );
            })}
          </div>
        </div>
      </Reveal>

      {/* FAQ Section */}
      <Reveal>
        <div className="rounded-xl border border-[var(--outline-variant)] bg-[var(--surface-container-lowest)] overflow-hidden">
          <div className="px-6 py-4 border-b border-[var(--outline-variant)]">
            <h2 className="text-[var(--on-surface)] font-semibold text-sm">
              {t("help.faq.heading")}
            </h2>
            <p className="text-xs text-[var(--on-surface-variant)] mt-0.5">
              {t("help.faq.subtitle")}
            </p>
          </div>
          <div className="divide-y divide-[var(--outline-variant)]">
            {(Array.isArray(t.raw("help.faq.items")) ? t.raw("help.faq.items") : []).map(
              (item: { q: string; a: string }, i: number) => (
                <FAQItem key={i} question={item.q} answer={item.a} />
              )
            )}
          </div>
        </div>
      </Reveal>
    </div>
  );
}

function FAQItem({ question, answer }: { question: string; answer: string }) {
  const [open, setOpen] = useState(false);
  return (
    <div className="px-6 py-4">
      <button
        onClick={() => setOpen((o) => !o)}
        className="w-full flex items-center justify-between text-left gap-4 group"
        aria-expanded={open}
      >
        <span className="text-sm font-medium text-[var(--on-surface)] group-hover:text-[var(--secondary)] transition-colors">
          {question}
        </span>
        <ChevronRight
          className={`h-4 w-4 text-[var(--outline)] flex-shrink-0 transition-transform duration-200 ${open ? "rotate-90" : ""}`}
          aria-hidden="true"
        />
      </button>
      {open && (
        <motion.p
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: "auto" }}
          exit={{ opacity: 0, height: 0 }}
          transition={{ duration: 0.2 }}
          className="text-xs text-[var(--on-surface-variant)] leading-relaxed mt-3 pr-8"
        >
          {answer}
        </motion.p>
      )}
    </div>
  );
}