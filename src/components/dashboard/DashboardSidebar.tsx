"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  FolderKanban,
  Bell,
  RefreshCw,
  LogOut,
  Settings,
  Users,
  Clapperboard,
} from "lucide-react";
import type { DashboardRole, DashboardUser } from "@/data/dashboard";
import { cn } from "@/lib/utils";

const roleLinks: { role: DashboardRole; label: string; href: string; icon: typeof LayoutDashboard }[] = [
  { role: "manager", label: "Manager", href: "/dashboard/manager", icon: Users },
  { role: "editor", label: "Editor", href: "/dashboard/editor", icon: Clapperboard },
  { role: "client", label: "Client", href: "/dashboard/client", icon: FolderKanban },
];

export default function DashboardSidebar({ user }: { user: DashboardUser }) {
  const pathname = usePathname();

  return (
    <aside className="flex h-screen w-[260px] shrink-0 flex-col border-r border-white/10 bg-[#14122a] px-5 py-6">
      <div className="mb-8 flex items-center justify-between">
        <Link href="/" className="text-lg font-semibold tracking-tight text-white">
          TBM<span className="font-light text-white/60">OS</span>
        </Link>
        <button type="button" className="text-white/50 hover:text-white" aria-label="Settings">
          <Settings size={16} />
        </button>
      </div>

      <div className="mb-8 flex items-center gap-3 rounded-2xl border border-white/10 bg-[#1c1a35] p-4">
        <div className="flex h-10 w-10 items-center justify-center rounded-full bg-[#6d5cff]/30 text-sm font-medium text-white">
          {user.name.charAt(0)}
        </div>
        <div>
          <span className="inline-block rounded-full bg-[#6d5cff]/20 px-2 py-0.5 text-[10px] font-medium uppercase tracking-wider text-[#b8aeff]">
            {user.roleLabel}
          </span>
          <p className="mt-1 text-sm font-medium text-white">{user.name}</p>
        </div>
      </div>

      <nav className="flex-1 space-y-1">
        <Link
          href={`/dashboard/${user.role}`}
          className={cn(
            "flex items-center gap-3 rounded-xl px-4 py-3 text-sm font-medium transition-colors",
            pathname === `/dashboard/${user.role}`
              ? "bg-[#6d5cff] text-white"
              : "text-white/60 hover:bg-white/5 hover:text-white"
          )}
        >
          <LayoutDashboard size={18} />
          Dashboard
        </Link>
        <Link
          href="#"
          className="flex items-center gap-3 rounded-xl px-4 py-3 text-sm font-medium text-white/60 hover:bg-white/5 hover:text-white"
        >
          <FolderKanban size={18} />
          My Projects
        </Link>
        <Link
          href="#"
          className="flex items-center justify-between rounded-xl px-4 py-3 text-sm font-medium text-white/60 hover:bg-white/5 hover:text-white"
        >
          <span className="flex items-center gap-3">
            <Bell size={18} />
            Notifications
          </span>
          {user.notifications > 0 ? (
            <span className="rounded-full bg-[#ff5c5c] px-2 py-0.5 text-[10px] font-medium text-white">
              {user.notifications}
            </span>
          ) : null}
        </Link>
      </nav>

      <div className="space-y-3 border-t border-white/10 pt-6">
        <p className="px-2 text-[10px] font-medium uppercase tracking-[0.2em] text-white/40">
          Switch Role
        </p>
        {roleLinks.map(({ role, label, href, icon: Icon }) => (
          <Link
            key={role}
            href={href}
            className={cn(
              "flex items-center gap-3 rounded-xl px-4 py-2.5 text-sm transition-colors",
              user.role === role
                ? "bg-white/10 text-white"
                : "text-white/45 hover:bg-white/5 hover:text-white/60"
            )}
          >
            <Icon size={16} />
            {label}
          </Link>
        ))}
      </div>

      <div className="mt-6 space-y-1 border-t border-white/10 pt-4">
        <button
          type="button"
          className="flex w-full items-center gap-3 rounded-xl px-4 py-2.5 text-sm text-white/60 hover:bg-white/5 hover:text-white"
        >
          <RefreshCw size={16} />
          Refresh
        </button>
        <Link
          href="/"
          className="flex items-center gap-3 rounded-xl px-4 py-2.5 text-sm text-white/60 hover:bg-white/5 hover:text-white"
        >
          <LogOut size={16} />
          Back to site
        </Link>
      </div>
    </aside>
  );
}
