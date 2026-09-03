"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { UserPlus, Users, CheckCircle, Clock, ChevronDown, Trash2, Mail, Shield, Eye, Edit3 } from 'lucide-react';
import { useTranslations } from "next-intl";
import { Reveal } from "@/components/Reveal";
import { TeamMember } from "@/lib/data";
type MOCK_TEAM_MEMBERS = any;
const MOCK_TEAM_MEMBERS: any = [];
import { staggerContainer, fadeInUp } from "@/lib/motion";

const ROLE_COLORS: Record<TeamMember["role"], string> = {
  Owner: "bg-[#131b2e] text-white",
  Admin: "bg-[#dce9ff] text-[#0058be]",
  Editor: "bg-[#e5eeff] text-[#3f465c]",
  Viewer: "bg-[#eff4ff] text-[#45464d]",
};

const ROLE_ICONS: Record<TeamMember["role"], React.ReactNode> = {
  Owner: <Shield className="h-3 w-3" />,
  Admin: <Shield className="h-3 w-3" />,
  Editor: <Edit3 className="h-3 w-3" />,
  Viewer: <Eye className="h-3 w-3" />,
};

const ALL_ROLES: TeamMember["role"][] = ["Owner", "Admin", "Editor", "Viewer"];

function RoleBadge({ role }: { role: TeamMember["role"] }) {
  return (
    <span className={`inline-flex items-center gap-1 rounded-full px-2.5 py-0.5 text-xs font-semibold ${ROLE_COLORS[role]}`}>
      {ROLE_ICONS[role]}
      {role}
    </span>
  );
}

function StatusBadge({ status }: { status: TeamMember["status"] }) {
  if (status === "active") {
    return (
      <span className="inline-flex items-center gap-1.5 rounded-full bg-[#e6f9f2] px-2.5 py-0.5 text-xs font-semibold text-[#009668]">
        <CheckCircle className="h-3 w-3" />
        Active
      </span>
    );
  }
  return (
    <span className="inline-flex items-center gap-1.5 rounded-full bg-[#fff8e6] px-2.5 py-0.5 text-xs font-semibold text-[#b45309]">
      <Clock className="h-3 w-3" />
      Pending
    </span>
  );
}

function AvatarCircle({ initials, name }: { initials: string; name: string }) {
  const colors = [
    "bg-[#dce9ff] text-[#0058be]",
    "bg-[#e5eeff] text-[#3f465c]",
    "bg-[#e6f9f2] text-[#005236]",
    "bg-[#fde8e8] text-[#93000a]",
    "bg-[#f0eeff] text-[#4338ca]",
  ];
  const idx = name.charCodeAt(0) % colors.length;
  return (
    <div className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-full text-sm font-bold ${colors[idx]}`}>
      {initials}
    </div>
  );
}

function RoleDropdown({
  current,
  onChange,
  disabled,
}: {
  current: TeamMember["role"];
  onChange: (r: TeamMember["role"]) => void;
  disabled?: boolean;
}) {
  const [open, setOpen] = useState(false);
  return (
    <div className="relative">
      <button
        onClick={() => !disabled && setOpen((o) => !o)}
        disabled={disabled}
        className="flex items-center gap-1.5 rounded-lg border border-[#c6c6cd] bg-white px-3 py-1.5 text-xs font-medium text-[#0b1c30] transition-colors hover:border-[#0058be] hover:bg-[#eff4ff] disabled:cursor-not-allowed disabled:opacity-50"
      >
        {current}
        <ChevronDown className="h-3 w-3 text-[#45464d]" />
      </button>
      {open && (
        <>
          <div className="fixed inset-0 z-10" onClick={() => setOpen(false)} />
          <div className="absolute right-0 top-full z-20 mt-1 w-32 overflow-hidden rounded-xl border border-[#c6c6cd] bg-white shadow-[0_4px_24px_-4px_rgba(0,0,0,0.12)]">
            {ALL_ROLES.map((role) => (
              <button
                key={role}
                onClick={() => { onChange(role); setOpen(false); }}
                className={`flex w-full items-center gap-2 px-3 py-2 text-xs font-medium transition-colors hover:bg-[#eff4ff] ${current === role ? "text-[#0058be]" : "text-[#0b1c30]"}`}
              >
                {ROLE_ICONS[role]}
                {role}
              </button>
            ))}
          </div>
        </>
      )}
    </div>
  );
}

export default function TeamPage() {
  const t = useTranslations();
  const [members, setMembers] = useState<TeamMember[]>(MOCK_TEAM_MEMBERS ?? []);
  const [showInviteModal, setShowInviteModal] = useState(false);
  const [inviteEmail, setInviteEmail] = useState("");
  const [inviteRole, setInviteRole] = useState<TeamMember["role"]>("Viewer");
  const [filterRole, setFilterRole] = useState<"All" | TeamMember["role"]>("All");
  const [filterStatus, setFilterStatus] = useState<"All" | TeamMember["status"]>("All");

  const totalMembers = members.length;
  const activeCount = members.filter((m) => m.status === "active").length;
  const pendingCount = members.filter((m) => m.status === "pending").length;

  const filtered = members.filter((m) => {
    const roleOk = filterRole === "All" || m.role === filterRole;
    const statusOk = filterStatus === "All" || m.status === filterStatus;
    return roleOk && statusOk;
  });

  function handleRoleChange(id: string, role: TeamMember["role"]) {
    setMembers((prev) => prev.map((m) => (m.id === id ? { ...m, role } : m)));
  }

  function handleRemove(id: string) {
    setMembers((prev) => prev.filter((m) => m.id !== id));
  }

  function handleInvite() {
    if (!inviteEmail.trim()) return;
    const newMember: TeamMember = {
      id: `m-${Date.now()}`,
      name: inviteEmail.split("@")[0] ?? "New User",
      email: inviteEmail,
      role: inviteRole,
      status: "pending",
      lastSeen: "Never",
      joinedAt: new Date().toISOString().split("T")[0] ?? "",
      avatarInitials: (inviteEmail[0] ?? "U").toUpperCase(),
    };
    setMembers((prev) => [...prev, newMember]);
    setInviteEmail("");
    setInviteRole("Viewer");
    setShowInviteModal(false);
  }

  return (
    <div className="min-h-screen bg-[#f8f9ff] p-6 font-[Inter,sans-serif]">
      {/* Page Header */}
      <Reveal>
        <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h1 className="text-[28px] font-semibold leading-[36px] tracking-[-0.01em] text-[#0b1c30]">
              {t("team.title")}
            </h1>
            <p className="mt-1 text-sm text-[#45464d]">{t("team.subtitle")}</p>
          </div>
          <button
            onClick={() => setShowInviteModal(true)}
            className="inline-flex items-center gap-2 rounded-lg bg-[#0058be] px-4 py-2.5 text-sm font-semibold text-white shadow-[0_1px_2px_rgba(0,88,190,0.2)] transition-all duration-200 hover:bg-[#2170e4] hover:shadow-[0_4px_12px_rgba(0,88,190,0.3)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#0058be] focus-visible:ring-offset-2"
          >
            <UserPlus className="h-4 w-4" />
            {t("team.inviteButton")}
          </button>
        </div>
      </Reveal>

      {/* Summary Row */}
      <Reveal delay={0.05}>
        <div className="mb-6 grid grid-cols-3 gap-4">
          <div className="rounded-xl border border-[#c6c6cd] bg-white p-5 shadow-[0_1px_2px_rgba(0,0,0,0.04),0_4px_12px_-4px_rgba(0,0,0,0.08)]">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-[#eff4ff]">
                <Users className="h-5 w-5 text-[#0058be]" />
              </div>
              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.05em] text-[#45464d]">{t("team.stats.total")}</p>
                <p className="text-2xl font-bold text-[#0b1c30]">{totalMembers}</p>
              </div>
            </div>
          </div>
          <div className="rounded-xl border border-[#c6c6cd] bg-white p-5 shadow-[0_1px_2px_rgba(0,0,0,0.04),0_4px_12px_-4px_rgba(0,0,0,0.08)]">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-[#e6f9f2]">
                <CheckCircle className="h-5 w-5 text-[#009668]" />
              </div>
              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.05em] text-[#45464d]">{t("team.stats.active")}</p>
                <p className="text-2xl font-bold text-[#0b1c30]">{activeCount}</p>
              </div>
            </div>
          </div>
          <div className="rounded-xl border border-[#c6c6cd] bg-white p-5 shadow-[0_1px_2px_rgba(0,0,0,0.04),0_4px_12px_-4px_rgba(0,0,0,0.08)]">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-[#fff8e6]">
                <Clock className="h-5 w-5 text-[#b45309]" />
              </div>
              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.05em] text-[#45464d]">{t("team.stats.pending")}</p>
                <p className="text-2xl font-bold text-[#0b1c30]">{pendingCount}</p>
              </div>
            </div>
          </div>
        </div>
      </Reveal>

      {/* Filters */}
      <Reveal delay={0.08}>
        <div className="mb-4 flex flex-wrap items-center gap-3">
          <span className="text-xs font-semibold uppercase tracking-[0.05em] text-[#45464d]">{t("team.filter.label")}</span>
          <div className="flex items-center gap-2">
            {(["All", "Owner", "Admin", "Editor", "Viewer"] as const).map((r) => (
              <button
                key={r}
                onClick={() => setFilterRole(r)}
                className={`rounded-full px-3 py-1 text-xs font-semibold transition-colors ${
                  filterRole === r
                    ? "bg-[#0058be] text-white"
                    : "bg-white border border-[#c6c6cd] text-[#45464d] hover:border-[#0058be] hover:text-[#0058be]"
                }`}
              >
                {r}
              </button>
            ))}
          </div>
          <div className="ml-auto flex items-center gap-2">
            {(["All", "active", "pending"] as const).map((s) => (
              <button
                key={s}
                onClick={() => setFilterStatus(s)}
                className={`rounded-full px-3 py-1 text-xs font-semibold capitalize transition-colors ${
                  filterStatus === s
                    ? "bg-[#0b1c30] text-white"
                    : "bg-white border border-[#c6c6cd] text-[#45464d] hover:border-[#0b1c30] hover:text-[#0b1c30]"
                }`}
              >
                {s === "All" ? t("team.filter.allStatus") : s === "active" ? t("team.filter.active") : t("team.filter.pending")}
              </button>
            ))}
          </div>
        </div>
      </Reveal>

      {/* Team Members Table Card */}
      <Reveal delay={0.1}>
        <div className="overflow-hidden rounded-xl border border-[#c6c6cd] bg-white shadow-[0_1px_2px_rgba(0,0,0,0.04),0_8px_24px_-8px_rgba(0,0,0,0.08)]">
          <div className="border-b border-[#e5eeff] px-6 py-4">
            <h2 className="text-base font-semibold text-[#0b1c30]">{t("team.table.heading")}</h2>
            <p className="mt-0.5 text-xs text-[#45464d]">
              {t("team.table.subheading", { count: filtered.length })}
            </p>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead className="border-b border-[#e5eeff] bg-[#f8f9ff]">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-semibold uppercase tracking-[0.05em] text-[#45464d]">
                    {t("team.table.member")}
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-[0.05em] text-[#45464d]">
                    {t("team.table.role")}
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-[0.05em] text-[#45464d]">
                    {t("team.table.status")}
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-[0.05em] text-[#45464d]">
                    {t("team.table.joined")}
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-[0.05em] text-[#45464d]">
                    {t("team.table.lastSeen")}
                  </th>
                  <th className="px-4 py-3 text-right text-xs font-semibold uppercase tracking-[0.05em] text-[#45464d]">
                    {t("team.table.actions")}
                  </th>
                </tr>
              </thead>
              <motion.tbody
                variants={staggerContainer}
                initial="hidden"
                animate="visible"
                className="divide-y divide-[#e5eeff]"
              >
                {filtered.map((member) => (
                  <motion.tr
                    key={member.id}
                    variants={fadeInUp}
                    className="group transition-colors hover:bg-[#f8f9ff]"
                  >
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        <AvatarCircle initials={member.avatarInitials} name={member.name} />
                        <div>
                          <p className="font-semibold text-[#0b1c30]">{member.name}</p>
                          <p className="flex items-center gap-1 text-xs text-[#45464d]">
                            <Mail className="h-3 w-3" />
                            {member.email}
                          </p>
                        </div>
                      </div>
                    </td>
                    <td className="px-4 py-4">
                      <RoleBadge role={member.role} />
                    </td>
                    <td className="px-4 py-4">
                      <StatusBadge status={member.status} />
                    </td>
                    <td className="px-4 py-4 text-xs text-[#45464d]">{member.joinedAt}</td>
                    <td className="px-4 py-4 text-xs text-[#45464d]">{member.lastSeen}</td>
                    <td className="px-4 py-4">
                      <div className="flex items-center justify-end gap-2">
                        <RoleDropdown
                          current={member.role}
                          onChange={(r) => handleRoleChange(member.id, r)}
                          disabled={member.role === "Owner"}
                        />
                        <motion.button
                          whileHover={{ scale: 1.1 }}
                          whileTap={{ scale: 0.95 }}
                          onClick={() => handleRemove(member.id)}
                          disabled={member.role === "Owner"}
                          aria-label={`Remove ${member.name}`}
                          className="flex h-8 w-8 items-center justify-center rounded-lg border border-transparent text-[#45464d] transition-colors hover:border-[#ffdad6] hover:bg-[#ffdad6] hover:text-[#ba1a1a] disabled:cursor-not-allowed disabled:opacity-30"
                        >
                          <Trash2 className="h-4 w-4" />
                        </motion.button>
                      </div>
                    </td>
                  </motion.tr>
                ))}
                {filtered.length === 0 && (
                  <tr>
                    <td colSpan={6} className="px-6 py-12 text-center text-sm text-[#45464d]">
                      {t("team.table.empty")}
                    </td>
                  </tr>
                )}
              </motion.tbody>
            </table>
          </div>
        </div>
      </Reveal>

      {/* Invite Modal */}
      {showInviteModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/30 backdrop-blur-sm">
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 16 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 16 }}
            transition={{ duration: 0.2, ease: "easeOut" }}
            className="w-full max-w-md rounded-2xl border border-[#c6c6cd] bg-white p-6 shadow-[0_8px_40px_-8px_rgba(0,0,0,0.2)]"
          >
            <h2 className="text-lg font-semibold text-[#0b1c30]">{t("team.modal.title")}</h2>
            <p className="mt-1 text-sm text-[#45464d]">{t("team.modal.subtitle")}</p>

            <div className="mt-5 space-y-4">
              <div>
                <label className="mb-1.5 block text-xs font-semibold text-[#0b1c30]" htmlFor="invite-email">
                  {t("team.modal.emailLabel")}
                </label>
                <input
                  id="invite-email"
                  type="email"
                  value={inviteEmail}
                  onChange={(e) => setInviteEmail(e.target.value)}
                  placeholder={t("team.modal.emailPlaceholder")}
                  className="w-full rounded-lg border border-[#c6c6cd] bg-white px-3 py-2.5 text-sm text-[#0b1c30] placeholder-[#76777d] outline-none transition-all focus:border-[#0058be] focus:ring-2 focus:ring-[#0058be]/20"
                />
              </div>
              <div>
                <label className="mb-1.5 block text-xs font-semibold text-[#0b1c30]" htmlFor="invite-role">
                  {t("team.modal.roleLabel")}
                </label>
                <select
                  id="invite-role"
                  value={inviteRole}
                  onChange={(e) => setInviteRole(e.target.value as TeamMember["role"])}
                  className="w-full rounded-lg border border-[#c6c6cd] bg-white px-3 py-2.5 text-sm text-[#0b1c30] outline-none transition-all focus:border-[#0058be] focus:ring-2 focus:ring-[#0058be]/20"
                >
                  {ALL_ROLES.filter((r) => r !== "Owner").map((r) => (
                    <option key={r} value={r}>{r}</option>
                  ))}
                </select>
              </div>
            </div>

            <div className="mt-6 flex justify-end gap-3">
              <button
                onClick={() => setShowInviteModal(false)}
                className="rounded-lg border border-[#c6c6cd] px-4 py-2 text-sm font-semibold text-[#0b1c30] transition-colors hover:bg-[#f8f9ff]"
              >
                {t("team.modal.cancel")}
              </button>
              <button
                onClick={handleInvite}
                className="rounded-lg bg-[#0058be] px-4 py-2 text-sm font-semibold text-white transition-colors hover:bg-[#2170e4]"
              >
                {t("team.modal.send")}
              </button>
            </div>
          </motion.div>
        </div>
      )}
    </div>
  );
}