"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";
import { motion } from "framer-motion";
import { Check, Download, Sun, Moon, Edit } from 'lucide-react';
import { Reveal } from "@/components/Reveal";
import { cn } from "@/lib/utils";

const TABS = [
  { key: "general", label: "General" },
  { key: "profile", label: "Profile" },
  { key: "notifications", label: "Notifications" },
  { key: "security", label: "Security" },
  { key: "billing", label: "Billing" },
] as const;

type TabKey = (typeof TABS)[number]["key"];

const TIME_ZONES = [
  "UTC-08:00 Pacific Time",
  "UTC-07:00 Mountain Time",
  "UTC-06:00 Central Time",
  "UTC-05:00 Eastern Time",
  "UTC+00:00 Greenwich Mean Time",
  "UTC+01:00 Central European Time",
  "UTC+05:30 India Standard Time",
  "UTC+08:00 China Standard Time",
  "UTC+09:00 Japan Standard Time",
];

export default function SettingsPage() {
  const t = useTranslations();
  const [activeTab, setActiveTab] = useState<TabKey>("general");

  // Account Information state
  const [fullName, setFullName] = useState("Admin User");
  const [email, setEmail] = useState("admin@analytix.pro");
  const [organization, setOrganization] = useState("Acme Corp");

  // Workspace Settings state
  const [workspaceName, setWorkspaceName] = useState("Analytix Pro");
  const [workspaceSlug, setWorkspaceSlug] = useState("acme");
  const [timeZone, setTimeZone] = useState("UTC-05:00 Eastern Time");

  // Appearance state
  const [theme, setTheme] = useState<"light" | "dark">("light");

  // Profile tab state
  const [jobTitle, setJobTitle] = useState("Analytics Manager");
  const [phone, setPhone] = useState("+1 (555) 000-0000");
  const [bio, setBio] = useState("Passionate about data-driven decision making.");

  // Notifications tab state
  const [emailDigest, setEmailDigest] = useState(true);
  const [reportReady, setReportReady] = useState(true);
  const [teamActivity, setTeamActivity] = useState(false);
  const [securityAlerts, setSecurityAlerts] = useState(true);
  const [productUpdates, setProductUpdates] = useState(false);

  // Security tab state
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [twoFactor, setTwoFactor] = useState(false);

  return (
    <div className="min-h-screen bg-[var(--color-surface)] px-6 py-8">
      {/* Page Header */}
      <Reveal>
        <div className="mb-6">
          <h1 className="text-[28px] font-semibold leading-9 tracking-[-0.01em] text-[var(--color-on-surface)] font-display">
            {t("settings.title")}
          </h1>
          <p className="mt-1 text-sm text-[var(--color-on-surface-variant)] font-body">
            {t("settings.subtitle")}
          </p>
        </div>
      </Reveal>

      {/* Tabs */}
      <Reveal delay={0.05}>
        <div className="mb-6 border-b border-[var(--color-outline-variant)]">
          <nav className="flex gap-0" aria-label={t("settings.tabsAriaLabel")}>
            {TABS.map((tab) => (
              <button
                key={tab.key}
                onClick={() => setActiveTab(tab.key)}
                className={cn(
                  "relative px-4 py-3 text-sm font-medium transition-colors duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-secondary)]",
                  activeTab === tab.key
                    ? "text-[var(--color-secondary)]"
                    : "text-[var(--color-on-surface-variant)] hover:text-[var(--color-on-surface)]"
                )}
              >
                {tab.label}
                {activeTab === tab.key && (
                  <motion.div
                    layoutId="tab-underline"
                    className="absolute bottom-0 left-0 right-0 h-0.5 bg-[var(--color-secondary)]"
                    transition={{ type: "spring", stiffness: 400, damping: 30 }}
                  />
                )}
              </button>
            ))}
          </nav>
        </div>
      </Reveal>

      {/* Tab Content */}
      {activeTab === "general" && (
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
          {/* Left Column */}
          <div className="lg:col-span-2 flex flex-col gap-6">
            {/* Account Information Card */}
            <Reveal delay={0.08}>
              <div className="rounded-lg border border-[var(--color-outline-variant)] bg-[var(--color-surface-container-lowest)] shadow-[0_4px_12px_rgba(0,0,0,0.04)]">
                <div className="px-6 pt-6 pb-4">
                  <h2 className="text-base font-semibold text-[var(--color-on-surface)] font-display">
                    {t("settings.accountInfo.title")}
                  </h2>
                  <p className="mt-0.5 text-sm text-[var(--color-on-surface-variant)]">
                    {t("settings.accountInfo.subtitle")}
                  </p>
                </div>
                <div className="h-px bg-[var(--color-outline-variant)]" />
                <div className="px-6 py-5 space-y-4">
                  {/* Full Name + Email side by side */}
                  <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                    <div>
                      <label className="block text-xs font-semibold text-[var(--color-on-surface)] mb-1.5 tracking-wide uppercase font-body">
                        {t("settings.accountInfo.fullName")}
                      </label>
                      <input
                        type="text"
                        value={fullName}
                        onChange={(e) => setFullName(e.target.value)}
                        className="w-full rounded-lg border border-[var(--color-outline-variant)] bg-[var(--color-surface-container-lowest)] px-3 py-2.5 text-sm text-[var(--color-on-surface)] placeholder:text-[var(--color-on-surface-variant)] focus:border-[var(--color-secondary)] focus:outline-none focus:ring-2 focus:ring-[var(--color-secondary)]/20 transition-all duration-200"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-semibold text-[var(--color-on-surface)] mb-1.5 tracking-wide uppercase font-body">
                        {t("settings.accountInfo.emailAddress")}
                      </label>
                      <input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="w-full rounded-lg border border-[var(--color-outline-variant)] bg-[var(--color-surface-container-lowest)] px-3 py-2.5 text-sm text-[var(--color-on-surface)] placeholder:text-[var(--color-on-surface-variant)] focus:border-[var(--color-secondary)] focus:outline-none focus:ring-2 focus:ring-[var(--color-secondary)]/20 transition-all duration-200"
                      />
                    </div>
                  </div>
                  {/* Organization */}
                  <div>
                    <label className="block text-xs font-semibold text-[var(--color-on-surface)] mb-1.5 tracking-wide uppercase font-body">
                      {t("settings.accountInfo.organization")}
                    </label>
                    <input
                      type="text"
                      value={organization}
                      onChange={(e) => setOrganization(e.target.value)}
                      className="w-full rounded-lg border border-[var(--color-outline-variant)] bg-[var(--color-surface-container-lowest)] px-3 py-2.5 text-sm text-[var(--color-on-surface)] placeholder:text-[var(--color-on-surface-variant)] focus:border-[var(--color-secondary)] focus:outline-none focus:ring-2 focus:ring-[var(--color-secondary)]/20 transition-all duration-200"
                    />
                  </div>
                  {/* Save Button */}
                  <div className="flex justify-end pt-1">
                    <button className="rounded-lg bg-[var(--color-secondary)] px-5 py-2.5 text-sm font-semibold text-white hover:bg-[var(--color-secondary-container)] transition-colors duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-secondary)]">
                      {t("settings.accountInfo.saveChanges")}
                    </button>
                  </div>
                </div>
              </div>
            </Reveal>

            {/* Workspace Settings Card */}
            <Reveal delay={0.12}>
              <div className="rounded-lg border border-[var(--color-outline-variant)] bg-[var(--color-surface-container-lowest)] shadow-[0_4px_12px_rgba(0,0,0,0.04)]">
                <div className="px-6 pt-6 pb-4">
                  <h2 className="text-base font-semibold text-[var(--color-on-surface)] font-display">
                    {t("settings.workspace.title")}
                  </h2>
                  <p className="mt-0.5 text-sm text-[var(--color-on-surface-variant)]">
                    {t("settings.workspace.subtitle")}
                  </p>
                </div>
                <div className="h-px bg-[var(--color-outline-variant)]" />
                <div className="px-6 py-5 space-y-4">
                  {/* Workspace Name */}
                  <div>
                    <label className="block text-xs font-semibold text-[var(--color-on-surface)] mb-1.5 tracking-wide uppercase font-body">
                      {t("settings.workspace.workspaceName")}
                    </label>
                    <input
                      type="text"
                      value={workspaceName}
                      onChange={(e) => setWorkspaceName(e.target.value)}
                      className="w-full rounded-lg border border-[var(--color-outline-variant)] bg-[var(--color-surface-container-lowest)] px-3 py-2.5 text-sm text-[var(--color-on-surface)] focus:border-[var(--color-secondary)] focus:outline-none focus:ring-2 focus:ring-[var(--color-secondary)]/20 transition-all duration-200"
                    />
                  </div>
                  {/* Workspace URL */}
                  <div>
                    <label className="block text-xs font-semibold text-[var(--color-on-surface)] mb-1.5 tracking-wide uppercase font-body">
                      {t("settings.workspace.workspaceUrl")}
                    </label>
                    <div className="flex rounded-lg border border-[var(--color-outline-variant)] overflow-hidden focus-within:border-[var(--color-secondary)] focus-within:ring-2 focus-within:ring-[var(--color-secondary)]/20 transition-all duration-200">
                      <span className="flex items-center px-3 py-2.5 bg-[var(--color-surface-container-low)] text-sm text-[var(--color-on-surface-variant)] border-r border-[var(--color-outline-variant)] whitespace-nowrap select-none">
                        analytix.pro/
                      </span>
                      <input
                        type="text"
                        value={workspaceSlug}
                        onChange={(e) => setWorkspaceSlug(e.target.value)}
                        className="flex-1 px-3 py-2.5 text-sm text-[var(--color-on-surface)] bg-[var(--color-surface-container-lowest)] focus:outline-none"
                      />
                    </div>
                  </div>
                  {/* Time Zone */}
                  <div>
                    <label className="block text-xs font-semibold text-[var(--color-on-surface)] mb-1.5 tracking-wide uppercase font-body">
                      {t("settings.workspace.timeZone")}
                    </label>
                    <select
                      value={timeZone}
                      onChange={(e) => setTimeZone(e.target.value)}
                      className="w-full rounded-lg border border-[var(--color-outline-variant)] bg-[var(--color-surface-container-lowest)] px-3 py-2.5 text-sm text-[var(--color-on-surface)] focus:border-[var(--color-secondary)] focus:outline-none focus:ring-2 focus:ring-[var(--color-secondary)]/20 transition-all duration-200 cursor-pointer"
                    >
                      {TIME_ZONES.map((tz) => (
                        <option key={tz} value={tz}>
                          {tz}
                        </option>
                      ))}
                    </select>
                  </div>
                  <div className="flex justify-end pt-1">
                    <button className="rounded-lg bg-[var(--color-secondary)] px-5 py-2.5 text-sm font-semibold text-white hover:bg-[var(--color-secondary-container)] transition-colors duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-secondary)]">
                      {t("settings.workspace.saveChanges")}
                    </button>
                  </div>
                </div>
              </div>
            </Reveal>
          </div>

          {/* Right Column */}
          <div className="flex flex-col gap-6">
            {/* Appearance Card */}
            <Reveal delay={0.1}>
              <div className="rounded-lg border border-[var(--color-outline-variant)] bg-[var(--color-surface-container-lowest)] shadow-[0_4px_12px_rgba(0,0,0,0.04)]">
                <div className="px-6 pt-6 pb-4">
                  <h2 className="text-base font-semibold text-[var(--color-on-surface)] font-display">
                    {t("settings.appearance.title")}
                  </h2>
                </div>
                <div className="h-px bg-[var(--color-outline-variant)]" />
                <div className="px-6 py-5">
                  <p className="text-xs font-semibold text-[var(--color-on-surface)] mb-3 tracking-wide uppercase">
                    {t("settings.appearance.theme")}
                  </p>
                  <div className="flex gap-3">
                    {/* Light Theme Tile */}
                    <button
                      onClick={() => setTheme("light")}
                      className={cn(
                        "relative flex-1 rounded-lg border-2 p-3 transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-secondary)]",
                        theme === "light"
                          ? "border-[var(--color-secondary)]"
                          : "border-[var(--color-outline-variant)] hover:border-[var(--color-outline)]"
                      )}
                      aria-label={t("settings.appearance.lightTheme")}
                    >
                      {/* Light theme preview */}
                      <div className="rounded-md bg-white border border-gray-200 p-2 mb-2">
                        <div className="flex items-center gap-1 mb-1.5">
                          <div className="w-2 h-2 rounded-full bg-[var(--color-secondary)]" />
                          <div className="h-1.5 w-8 rounded-full bg-gray-200" />
                        </div>
                        <div className="h-1.5 w-full rounded-full bg-gray-100 mb-1" />
                        <div className="h-1.5 w-3/4 rounded-full bg-gray-100" />
                      </div>
                      <span className="text-xs font-medium text-[var(--color-on-surface)]">
                        {t("settings.appearance.light")}
                      </span>
                      {theme === "light" && (
                        <div className="absolute top-2 right-2 w-4 h-4 rounded-full bg-[var(--color-secondary)] flex items-center justify-center">
                          <Check className="w-2.5 h-2.5 text-white" />
                        </div>
                      )}
                    </button>

                    {/* Dark Theme Tile */}
                    <button
                      onClick={() => setTheme("dark")}
                      className={cn(
                        "relative flex-1 rounded-lg border-2 p-3 transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-secondary)]",
                        theme === "dark"
                          ? "border-[var(--color-secondary)]"
                          : "border-[var(--color-outline-variant)] hover:border-[var(--color-outline)]"
                      )}
                      aria-label={t("settings.appearance.darkTheme")}
                    >
                      {/* Dark theme preview */}
                      <div className="rounded-md bg-[#1e293b] border border-[#334155] p-2 mb-2">
                        <div className="flex items-center gap-1 mb-1.5">
                          <div className="w-2 h-2 rounded-full bg-[var(--color-secondary)]" />
                          <div className="h-1.5 w-8 rounded-full bg-[#334155]" />
                        </div>
                        <div className="h-1.5 w-full rounded-full bg-[#334155] mb-1" />
                        <div className="h-1.5 w-3/4 rounded-full bg-[#334155]" />
                      </div>
                      <span className="text-xs font-medium text-[var(--color-on-surface)]">
                        {t("settings.appearance.dark")}
                      </span>
                      {theme === "dark" && (
                        <div className="absolute top-2 right-2 w-4 h-4 rounded-full bg-[var(--color-secondary)] flex items-center justify-center">
                          <Check className="w-2.5 h-2.5 text-white" />
                        </div>
                      )}
                    </button>
                  </div>
                </div>
              </div>
            </Reveal>

            {/* Data Management Card */}
            <Reveal delay={0.14}>
              <div className="rounded-lg border border-[var(--color-outline-variant)] bg-[var(--color-surface-container-lowest)] shadow-[0_4px_12px_rgba(0,0,0,0.04)]">
                <div className="px-6 pt-6 pb-4">
                  <h2 className="text-base font-semibold text-[var(--color-on-surface)] font-display">
                    {t("settings.dataManagement.title")}
                  </h2>
                </div>
                <div className="h-px bg-[var(--color-outline-variant)]" />
                <div className="px-6 py-5 space-y-0 divide-y divide-[var(--color-outline-variant)]">
                  {/* Data Retention Row */}
                  <div className="flex items-center justify-between py-4">
                    <div>
                      <p className="text-sm font-semibold text-[var(--color-on-surface)]">
                        {t("settings.dataManagement.dataRetention")}
                      </p>
                      <p className="text-xs text-[var(--color-on-surface-variant)] mt-0.5">
                        {t("settings.dataManagement.dataRetentionDesc")}
                      </p>
                    </div>
                    <button className="text-sm font-semibold text-[var(--color-secondary)] hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-secondary)] rounded px-1">
                      {t("settings.dataManagement.edit")}
                    </button>
                  </div>
                  {/* Export Data Row */}
                  <div className="flex items-center justify-between py-4">
                    <div>
                      <p className="text-sm font-semibold text-[var(--color-on-surface)]">
                        {t("settings.dataManagement.exportData")}
                      </p>
                      <p className="text-xs text-[var(--color-on-surface-variant)] mt-0.5">
                        {t("settings.dataManagement.exportDataDesc")}
                      </p>
                    </div>
                    <button className="flex items-center gap-1.5 rounded-lg border border-[var(--color-outline-variant)] bg-[var(--color-surface-container-lowest)] px-3 py-1.5 text-xs font-semibold text-[var(--color-on-surface)] hover:bg-[var(--color-surface-container-low)] transition-colors duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-secondary)]">
                      <Download className="w-3.5 h-3.5" aria-hidden="true" />
                      {t("settings.dataManagement.export")}
                    </button>
                  </div>
                </div>
              </div>
            </Reveal>
          </div>
        </div>
      )}

      {/* Profile Tab */}
      {activeTab === "profile" && (
        <div className="max-w-2xl">
          <Reveal delay={0.08}>
            <div className="rounded-lg border border-[var(--color-outline-variant)] bg-[var(--color-surface-container-lowest)] shadow-[0_4px_12px_rgba(0,0,0,0.04)]">
              <div className="px-6 pt-6 pb-4">
                <h2 className="text-base font-semibold text-[var(--color-on-surface)] font-display">
                  {t("settings.profile.title")}
                </h2>
                <p className="mt-0.5 text-sm text-[var(--color-on-surface-variant)]">
                  {t("settings.profile.subtitle")}
                </p>
              </div>
              <div className="h-px bg-[var(--color-outline-variant)]" />
              <div className="px-6 py-5 space-y-4">
                {/* Avatar */}
                <div className="flex items-center gap-4">
                  <div className="w-16 h-16 rounded-full bg-[var(--color-secondary)] flex items-center justify-center text-white text-xl font-bold select-none">
                    AU
                  </div>
                  <div>
                    <button className="text-sm font-semibold text-[var(--color-secondary)] hover:underline">
                      {t("settings.profile.changePhoto")}
                    </button>
                    <p className="text-xs text-[var(--color-on-surface-variant)] mt-0.5">
                      {t("settings.profile.photoHint")}
                    </p>
                  </div>
                </div>
                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                  <div>
                    <label className="block text-xs font-semibold text-[var(--color-on-surface)] mb-1.5 tracking-wide uppercase">
                      {t("settings.profile.fullName")}
                    </label>
                    <input
                      type="text"
                      value={fullName}
                      onChange={(e) => setFullName(e.target.value)}
                      className="w-full rounded-lg border border-[var(--color-outline-variant)] bg-[var(--color-surface-container-lowest)] px-3 py-2.5 text-sm text-[var(--color-on-surface)] focus:border-[var(--color-secondary)] focus:outline-none focus:ring-2 focus:ring-[var(--color-secondary)]/20 transition-all duration-200"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-[var(--color-on-surface)] mb-1.5 tracking-wide uppercase">
                      {t("settings.profile.jobTitle")}
                    </label>
                    <input
                      type="text"
                      value={jobTitle}
                      onChange={(e) => setJobTitle(e.target.value)}
                      className="w-full rounded-lg border border-[var(--color-outline-variant)] bg-[var(--color-surface-container-lowest)] px-3 py-2.5 text-sm text-[var(--color-on-surface)] focus:border-[var(--color-secondary)] focus:outline-none focus:ring-2 focus:ring-[var(--color-secondary)]/20 transition-all duration-200"
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-xs font-semibold text-[var(--color-on-surface)] mb-1.5 tracking-wide uppercase">
                    {t("settings.profile.phone")}
                  </label>
                  <input
                    type="tel"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    className="w-full rounded-lg border border-[var(--color-outline-variant)] bg-[var(--color-surface-container-lowest)] px-3 py-2.5 text-sm text-[var(--color-on-surface)] focus:border-[var(--color-secondary)] focus:outline-none focus:ring-2 focus:ring-[var(--color-secondary)]/20 transition-all duration-200"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-[var(--color-on-surface)] mb-1.5 tracking-wide uppercase">
                    {t("settings.profile.bio")}
                  </label>
                  <textarea
                    value={bio}
                    onChange={(e) => setBio(e.target.value)}
                    rows={3}
                    className="w-full rounded-lg border border-[var(--color-outline-variant)] bg-[var(--color-surface-container-lowest)] px-3 py-2.5 text-sm text-[var(--color-on-surface)] focus:border-[var(--color-secondary)] focus:outline-none focus:ring-2 focus:ring-[var(--color-secondary)]/20 transition-all duration-200 resize-none"
                  />
                </div>
                <div className="flex justify-end pt-1">
                  <button className="rounded-lg bg-[var(--color-secondary)] px-5 py-2.5 text-sm font-semibold text-white hover:bg-[var(--color-secondary-container)] transition-colors duration-200">
                    {t("settings.profile.saveChanges")}
                  </button>
                </div>
              </div>
            </div>
          </Reveal>
        </div>
      )}

      {/* Notifications Tab */}
      {activeTab === "notifications" && (
        <div className="max-w-2xl">
          <Reveal delay={0.08}>
            <div className="rounded-lg border border-[var(--color-outline-variant)] bg-[var(--color-surface-container-lowest)] shadow-[0_4px_12px_rgba(0,0,0,0.04)]">
              <div className="px-6 pt-6 pb-4">
                <h2 className="text-base font-semibold text-[var(--color-on-surface)] font-display">
                  {t("settings.notifications.title")}
                </h2>
                <p className="mt-0.5 text-sm text-[var(--color-on-surface-variant)]">
                  {t("settings.notifications.subtitle")}
                </p>
              </div>
              <div className="h-px bg-[var(--color-outline-variant)]" />
              <div className="divide-y divide-[var(--color-outline-variant)]">
                {[
                  { key: "emailDigest", label: t("settings.notifications.emailDigest"), desc: t("settings.notifications.emailDigestDesc"), value: emailDigest, setter: setEmailDigest },
                  { key: "reportReady", label: t("settings.notifications.reportReady"), desc: t("settings.notifications.reportReadyDesc"), value: reportReady, setter: setReportReady },
                  { key: "teamActivity", label: t("settings.notifications.teamActivity"), desc: t("settings.notifications.teamActivityDesc"), value: teamActivity, setter: setTeamActivity },
                  { key: "securityAlerts", label: t("settings.notifications.securityAlerts"), desc: t("settings.notifications.securityAlertsDesc"), value: securityAlerts, setter: setSecurityAlerts },
                  { key: "productUpdates", label: t("settings.notifications.productUpdates"), desc: t("settings.notifications.productUpdatesDesc"), value: productUpdates, setter: setProductUpdates },
                ].map((item) => (
                  <div key={item.key} className="flex items-center justify-between px-6 py-4">
                    <div>
                      <p className="text-sm font-semibold text-[var(--color-on-surface)]">{item.label}</p>
                      <p className="text-xs text-[var(--color-on-surface-variant)] mt-0.5">{item.desc}</p>
                    </div>
                    <button
                      role="switch"
                      aria-checked={item.value}
                      onClick={() => item.setter(!item.value)}
                      className={cn(
                        "relative inline-flex h-6 w-11 items-center rounded-full transition-colors duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-secondary)]",
                        item.value ? "bg-[var(--color-secondary)]" : "bg-[var(--color-outline-variant)]"
                      )}
                    >
                      <span
                        className={cn(
                          "inline-block h-4 w-4 transform rounded-full bg-white shadow transition-transform duration-200",
                          item.value ? "translate-x-6" : "translate-x-1"
                        )}
                      />
                    </button>
                  </div>
                ))}
              </div>
            </div>
          </Reveal>
        </div>
      )}

      {/* Security Tab */}
      {activeTab === "security" && (
        <div className="max-w-2xl flex flex-col gap-6">
          <Reveal delay={0.08}>
            <div className="rounded-lg border border-[var(--color-outline-variant)] bg-[var(--color-surface-container-lowest)] shadow-[0_4px_12px_rgba(0,0,0,0.04)]">
              <div className="px-6 pt-6 pb-4">
                <h2 className="text-base font-semibold text-[var(--color-on-surface)] font-display">
                  {t("settings.security.changePassword")}
                </h2>
                <p className="mt-0.5 text-sm text-[var(--color-on-surface-variant)]">
                  {t("settings.security.changePasswordDesc")}
                </p>
              </div>
              <div className="h-px bg-[var(--color-outline-variant)]" />
              <div className="px-6 py-5 space-y-4">
                <div>
                  <label className="block text-xs font-semibold text-[var(--color-on-surface)] mb-1.5 tracking-wide uppercase">
                    {t("settings.security.currentPassword")}
                  </label>
                  <input
                    type="password"
                    value={currentPassword}
                    onChange={(e) => setCurrentPassword(e.target.value)}
                    placeholder="••••••••"
                    className="w-full rounded-lg border border-[var(--color-outline-variant)] bg-[var(--color-surface-container-lowest)] px-3 py-2.5 text-sm text-[var(--color-on-surface)] focus:border-[var(--color-secondary)] focus:outline-none focus:ring-2 focus:ring-[var(--color-secondary)]/20 transition-all duration-200"
                  />
                </div>
                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                  <div>
                    <label className="block text-xs font-semibold text-[var(--color-on-surface)] mb-1.5 tracking-wide uppercase">
                      {t("settings.security.newPassword")}
                    </label>
                    <input
                      type="password"
                      value={newPassword}
                      onChange={(e) => setNewPassword(e.target.value)}
                      placeholder="••••••••"
                      className="w-full rounded-lg border border-[var(--color-outline-variant)] bg-[var(--color-surface-container-lowest)] px-3 py-2.5 text-sm text-[var(--color-on-surface)] focus:border-[var(--color-secondary)] focus:outline-none focus:ring-2 focus:ring-[var(--color-secondary)]/20 transition-all duration-200"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-[var(--color-on-surface)] mb-1.5 tracking-wide uppercase">
                      {t("settings.security.confirmPassword")}
                    </label>
                    <input
                      type="password"
                      value={confirmPassword}
                      onChange={(e) => setConfirmPassword(e.target.value)}
                      placeholder="••••••••"
                      className="w-full rounded-lg border border-[var(--color-outline-variant)] bg-[var(--color-surface-container-lowest)] px-3 py-2.5 text-sm text-[var(--color-on-surface)] focus:border-[var(--color-secondary)] focus:outline-none focus:ring-2 focus:ring-[var(--color-secondary)]/20 transition-all duration-200"
                    />
                  </div>
                </div>
                <div className="flex justify-end pt-1">
                  <button className="rounded-lg bg-[var(--color-secondary)] px-5 py-2.5 text-sm font-semibold text-white hover:bg-[var(--color-secondary-container)] transition-colors duration-200">
                    {t("settings.security.updatePassword")}
                  </button>
                </div>
              </div>
            </div>
          </Reveal>

          <Reveal delay={0.12}>
            <div className="rounded-lg border border-[var(--color-outline-variant)] bg-[var(--color-surface-container-lowest)] shadow-[0_4px_12px_rgba(0,0,0,0.04)]">
              <div className="px-6 pt-6 pb-4">
                <h2 className="text-base font-semibold text-[var(--color-on-surface)] font-display">
                  {t("settings.security.twoFactor")}
                </h2>
                <p className="mt-0.5 text-sm text-[var(--color-on-surface-variant)]">
                  {t("settings.security.twoFactorDesc")}
                </p>
              </div>
              <div className="h-px bg-[var(--color-outline-variant)]" />
              <div className="px-6 py-5 flex items-center justify-between">
                <div>
                  <p className="text-sm font-semibold text-[var(--color-on-surface)]">
                    {t("settings.security.twoFactorLabel")}
                  </p>
                  <p className="text-xs text-[var(--color-on-surface-variant)] mt-0.5">
                    {twoFactor ? t("settings.security.twoFactorEnabled") : t("settings.security.twoFactorDisabled")}
                  </p>
                </div>
                <button
                  role="switch"
                  aria-checked={twoFactor}
                  onClick={() => setTwoFactor(!twoFactor)}
                  className={cn(
                    "relative inline-flex h-6 w-11 items-center rounded-full transition-colors duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-secondary)]",
                    twoFactor ? "bg-[var(--color-secondary)]" : "bg-[var(--color-outline-variant)]"
                  )}
                >
                  <span
                    className={cn(
                      "inline-block h-4 w-4 transform rounded-full bg-white shadow transition-transform duration-200",
                      twoFactor ? "translate-x-6" : "translate-x-1"
                    )}
                  />
                </button>
              </div>
            </div>
          </Reveal>
        </div>
      )}

      {/* Billing Tab */}
      {activeTab === "billing" && (
        <div className="max-w-2xl flex flex-col gap-6">
          <Reveal delay={0.08}>
            <div className="rounded-lg border border-[var(--color-outline-variant)] bg-[var(--color-surface-container-lowest)] shadow-[0_4px_12px_rgba(0,0,0,0.04)]">
              <div className="px-6 pt-6 pb-4">
                <h2 className="text-base font-semibold text-[var(--color-on-surface)] font-display">
                  {t("settings.billing.currentPlan")}
                </h2>
                <p className="mt-0.5 text-sm text-[var(--color-on-surface-variant)]">
                  {t("settings.billing.currentPlanDesc")}
                </p>
              </div>
              <div className="h-px bg-[var(--color-outline-variant)]" />
              <div className="px-6 py-5">
                <div className="flex items-center justify-between">
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="text-lg font-bold text-[var(--color-on-surface)]">
                        {t("settings.billing.planName")}
                      </span>
                      <span className="rounded-full bg-[var(--color-secondary)]/10 px-2.5 py-0.5 text-xs font-semibold text-[var(--color-secondary)]">
                        {t("settings.billing.planBadge")}
                      </span>
                    </div>
                    <p className="text-sm text-[var(--color-on-surface-variant)] mt-1">
                      {t("settings.billing.planPrice")}
                    </p>
                  </div>
                  <button className="rounded-lg border border-[var(--color-outline-variant)] px-4 py-2 text-sm font-semibold text-[var(--color-on-surface)] hover:bg-[var(--color-surface-container-low)] transition-colors duration-200">
                    {t("settings.billing.upgradePlan")}
                  </button>
                </div>
                <div className="mt-4 grid grid-cols-3 gap-3">
                  {[
                    { label: t("settings.billing.seats"), value: "12 / 20" },
                    { label: t("settings.billing.storage"), value: "4.2 / 10 GB" },
                    { label: t("settings.billing.apiCalls"), value: "84K / 500K" },
                  ].map((item) => (
                    <div key={item.label} className="rounded-lg bg-[var(--color-surface-container-low)] p-3">
                      <p className="text-xs text-[var(--color-on-surface-variant)]">{item.label}</p>
                      <p className="text-sm font-semibold text-[var(--color-on-surface)] mt-0.5">{item.value}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </Reveal>

          <Reveal delay={0.12}>
            <div className="rounded-lg border border-[var(--color-outline-variant)] bg-[var(--color-surface-container-lowest)] shadow-[0_4px_12px_rgba(0,0,0,0.04)]">
              <div className="px-6 pt-6 pb-4">
                <h2 className="text-base font-semibold text-[var(--color-on-surface)] font-display">
                  {t("settings.billing.paymentMethod")}
                </h2>
                <p className="mt-0.5 text-sm text-[var(--color-on-surface-variant)]">
                  {t("settings.billing.paymentMethodDesc")}
                </p>
              </div>
              <div className="h-px bg-[var(--color-outline-variant)]" />
              <div className="px-6 py-5 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-7 rounded bg-[var(--color-surface-container)] flex items-center justify-center">
                    <span className="text-xs font-bold text-[var(--color-secondary)]">VISA</span>
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-[var(--color-on-surface)]">
                      {t("settings.billing.cardEnding")}
                    </p>
                    <p className="text-xs text-[var(--color-on-surface-variant)]">
                      {t("settings.billing.cardExpiry")}
                    </p>
                  </div>
                </div>
                <button className="text-sm font-semibold text-[var(--color-secondary)] hover:underline">
                  {t("settings.billing.updateCard")}
                </button>
              </div>
            </div>
          </Reveal>

          <Reveal delay={0.16}>
            <div className="rounded-lg border border-[var(--color-outline-variant)] bg-[var(--color-surface-container-lowest)] shadow-[0_4px_12px_rgba(0,0,0,0.04)]">
              <div className="px-6 pt-6 pb-4">
                <h2 className="text-base font-semibold text-[var(--color-on-surface)] font-display">
                  {t("settings.billing.invoices")}
                </h2>
              </div>
              <div className="h-px bg-[var(--color-outline-variant)]" />
              <div className="divide-y divide-[var(--color-outline-variant)]">
                {[
                  { date: "Aug 1, 2024", amount: "$299.00", status: "Paid" },
                  { date: "Jul 1, 2024", amount: "$299.00", status: "Paid" },
                  { date: "Jun 1, 2024", amount: "$299.00", status: "Paid" },
                ].map((inv) => (
                  <div key={inv.date} className="flex items-center justify-between px-6 py-3.5">
                    <div className="flex items-center gap-4">
                      <span className="text-sm text-[var(--color-on-surface)]">{inv.date}</span>
                      <span className="rounded-full bg-emerald-50 px-2 py-0.5 text-xs font-semibold text-emerald-700">
                        {inv.status}
                      </span>
                    </div>
                    <div className="flex items-center gap-3">
                      <span className="text-sm font-semibold text-[var(--color-on-surface)]">{inv.amount}</span>
                      <button className="flex items-center gap-1 text-xs text-[var(--color-secondary)] hover:underline">
                        <Download className="w-3.5 h-3.5" aria-hidden="true" />
                        {t("settings.billing.download")}
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </Reveal>
        </div>
      )}
    </div>
  );
}