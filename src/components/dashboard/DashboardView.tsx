"use client";

import { useMemo, useState } from "react";
import { Clock, Flag, Info, Search } from "lucide-react";
import type { DashboardProject, DashboardRole, DashboardStats } from "@/data/dashboard";
import { getWelcomeMessage } from "@/data/dashboard";

function StatTrend({ value, positive }: { value: string; positive?: boolean }) {
  return (
    <span
      className={`rounded-full px-2 py-0.5 text-[10px] font-medium ${
        positive ? "bg-emerald-500/15 text-emerald-400" : "bg-red-500/15 text-red-400"
      }`}
    >
      {value}
    </span>
  );
}

function OverviewCard({ stats }: { stats: DashboardStats }) {
  const total = stats.assigned + stats.inProgress + stats.underReview || 1;
  const assignedPct = (stats.assigned / total) * 100;
  const inProgressPct = (stats.inProgress / total) * 100;
  const reviewPct = (stats.underReview / total) * 100;

  return (
    <div className="rounded-2xl border border-white/10 bg-[#1c1a35] p-6">
      <div className="mb-6 flex items-start justify-between">
        <div>
          <h3 className="text-lg font-semibold text-white">Overview</h3>
          <p className="mt-1 text-sm text-white/45">
            Total ongoing edits: <span className="text-white">{stats.totalOngoing}</span>
          </p>
        </div>
        <span className="rounded-full bg-emerald-500/15 px-3 py-1 text-xs font-medium text-emerald-400">
          {stats.completed} Completed in total
        </span>
      </div>

      <div className="mb-4 flex h-3 overflow-hidden rounded-full bg-white/5">
        <div className="bg-blue-500" style={{ width: `${assignedPct}%` }} />
        <div className="bg-amber-400" style={{ width: `${inProgressPct}%` }} />
        <div className="bg-orange-500" style={{ width: `${reviewPct}%` }} />
      </div>

      <div className="flex flex-wrap gap-6 text-sm">
        <span className="flex items-center gap-2 text-white/60">
          <span className="h-2.5 w-2.5 rounded-full bg-blue-500" />
          Assigned ({stats.assigned})
        </span>
        <span className="flex items-center gap-2 text-white/60">
          <span className="h-2.5 w-2.5 rounded-full bg-amber-400" />
          In-progress ({stats.inProgress})
        </span>
        <span className="flex items-center gap-2 text-white/60">
          <span className="h-2.5 w-2.5 rounded-full bg-orange-500" />
          Under review ({stats.underReview})
        </span>
      </div>
    </div>
  );
}

function StatisticsCard({ stats }: { stats: DashboardStats }) {
  const [period, setPeriod] = useState<"week" | "month">("week");

  return (
    <div className="rounded-2xl border border-white/10 bg-[#1c1a35] p-6">
      <div className="mb-6 flex items-center justify-between">
        <h3 className="text-lg font-semibold text-white">Statistics</h3>
        <div className="flex rounded-lg bg-white/5 p-1">
          {(["week", "month"] as const).map((p) => (
            <button
              key={p}
              type="button"
              onClick={() => setPeriod(p)}
              className={`rounded-md px-3 py-1 text-xs font-medium capitalize transition-colors ${
                period === p ? "bg-[#6d5cff] text-white" : "text-white/45 hover:text-white"
              }`}
            >
              {p}
            </button>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 gap-6 sm:grid-cols-3">
        <div>
          <p className="text-sm text-white/45">Edits completed</p>
          <div className="mt-2 flex items-center gap-2">
            <span className="text-3xl font-semibold text-white">{stats.editsCompleted}</span>
            <StatTrend value={stats.editsCompletedTrend} positive={stats.editsCompletedTrend.startsWith("+")} />
          </div>
          <p className="mt-1 text-xs text-white/40">vs last {period}</p>
        </div>
        <div>
          <p className="text-sm text-white/45">Avg time per edit</p>
          <div className="mt-2 flex items-center gap-2">
            <span className="text-3xl font-semibold text-white">{stats.avgTimePerEdit}</span>
            <StatTrend value={stats.avgTimeTrend} positive={stats.avgTimeTrend.startsWith("-")} />
          </div>
          <p className="mt-1 text-xs text-white/40">vs last {period}</p>
        </div>
        <div>
          <p className="text-sm text-white/45">Avg revisions per edit</p>
          <div className="mt-2 flex items-center gap-2">
            <span className="text-3xl font-semibold text-white">{stats.avgRevisions}</span>
            <StatTrend value={stats.avgRevisionsTrend} positive={stats.avgRevisionsTrend.startsWith("-")} />
          </div>
          <p className="mt-1 text-xs text-white/40">vs last {period}</p>
        </div>
      </div>
    </div>
  );
}

function ProjectCard({ project, role }: { project: DashboardProject; role: DashboardRole }) {
  const statusLabel =
    project.clientReview && role !== "client"
      ? "Under client-review"
      : project.status === "under-review"
        ? "Under review"
        : project.status === "in-progress"
          ? "In progress"
          : project.status === "assigned"
            ? "Assigned"
            : "Completed";

  return (
    <article className="rounded-2xl border border-white/10 bg-[#232140] p-5">
      <div className="mb-4 flex items-start justify-between gap-3">
        <span className="rounded-lg bg-[#6d5cff]/20 px-2.5 py-1 text-xs font-medium text-[#b8aeff]">
          #{project.id}
        </span>
        <div className="flex gap-2">
          {project.flagged ? <Flag size={14} className="text-amber-400" /> : null}
          <Info size={14} className="text-blue-400" />
        </div>
      </div>

      <h4 className="text-base font-semibold leading-snug text-white">{project.title}</h4>
      <p className="mt-2 text-xs text-white/50">
        {role === "client" ? "TBM STUDIOZ" : project.owner} ·{" "}
        <button type="button" className="text-[#b8aeff] hover:underline">
          project details
        </button>
      </p>

      {project.overdue ? (
        <span className="mt-3 inline-flex items-center gap-1.5 rounded-full bg-red-500/15 px-2.5 py-1 text-[10px] font-medium text-red-400">
          <Clock size={12} />
          Overdue
        </span>
      ) : (
        <span className="mt-3 inline-block text-xs text-white/45">{project.dueLabel}</span>
      )}

      <div className="mt-4">
        <div className="mb-2 flex items-center justify-between text-xs">
          <span className="text-white/50">Progress</span>
          <button type="button" className="text-[#b8aeff] hover:underline">
            Update Progress
          </button>
        </div>
        <div className="h-2 overflow-hidden rounded-full bg-white/5">
          <div
            className="h-full rounded-full bg-orange-500 transition-all"
            style={{ width: `${project.progress}%` }}
          />
        </div>
      </div>

      <div className="mt-5 flex items-center justify-between gap-3">
        <div className="flex items-center gap-2">
          <div className="flex h-7 w-7 items-center justify-center rounded-full bg-white/10 text-[10px] font-medium text-white">
            {project.assignee.charAt(0)}
          </div>
          <span className="text-xs text-white/60">{project.assignee}</span>
        </div>
        <span className="rounded-xl bg-orange-500/15 px-3 py-1.5 text-[10px] font-medium text-orange-300">
          {statusLabel}
        </span>
      </div>
    </article>
  );
}

function KanbanColumn({
  title,
  count,
  projects,
  role,
  emptyLabel,
}: {
  title: string;
  count: number;
  projects: DashboardProject[];
  role: DashboardRole;
  emptyLabel: string;
}) {
  return (
    <div className="flex min-h-[420px] flex-col rounded-2xl border border-white/10 bg-[#1c1a35]/60 p-4">
      <div className="mb-4 flex items-center justify-between">
        <h3 className="text-sm font-semibold text-white">{title}</h3>
        <span className="rounded-full bg-white/10 px-2.5 py-0.5 text-xs text-white/60">{count}</span>
      </div>
      <div className="flex flex-1 flex-col gap-4 overflow-y-auto">
        {projects.length ? (
          projects.map((project) => (
            <ProjectCard key={project.id} project={project} role={role} />
          ))
        ) : (
          <div className="flex flex-1 items-center justify-center rounded-xl border border-dashed border-white/10 p-8 text-center text-sm text-white/40">
            {emptyLabel}
          </div>
        )}
      </div>
    </div>
  );
}

export default function DashboardView({
  role,
  projects,
  stats,
}: {
  role: DashboardRole;
  projects: DashboardProject[];
  stats: DashboardStats;
}) {
  const [activeFilter, setActiveFilter] = useState<"all" | DashboardProject["status"]>("all");
  const [search, setSearch] = useState("");

  const filtered = useMemo(() => {
    return projects.filter((project) => {
      const matchesFilter = activeFilter === "all" || project.status === activeFilter;
      const matchesSearch =
        !search.trim() ||
        project.title.toLowerCase().includes(search.toLowerCase()) ||
        project.owner.toLowerCase().includes(search.toLowerCase());
      return matchesFilter && matchesSearch;
    });
  }, [projects, activeFilter, search]);

  const columns = useMemo(
    () => ({
      assigned: filtered.filter((p) => p.status === "assigned"),
      inProgress: filtered.filter((p) => p.status === "in-progress"),
      underReview: filtered.filter((p) => p.status === "under-review"),
    }),
    [filtered]
  );

  const filters = [
    { key: "assigned" as const, label: "Assigned", count: stats.assigned },
    { key: "in-progress" as const, label: "In-progress", count: stats.inProgress },
    { key: "under-review" as const, label: "Under review", count: stats.underReview },
    { key: "completed" as const, label: "Completed", count: stats.completed },
  ];

  return (
    <div className="flex-1 overflow-y-auto bg-[#0f0e1a] p-8">
      <div className="mb-8">
        <h1 className="text-3xl font-semibold text-white">Dashboard</h1>
        <p className="mt-2 text-sm text-white/45">{getWelcomeMessage(role, stats.totalOngoing)}</p>
      </div>

      <div className="mb-8 grid grid-cols-1 gap-6 xl:grid-cols-2">
        <OverviewCard stats={stats} />
        <StatisticsCard stats={stats} />
      </div>

      <div className="mb-6 flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
        <div className="flex flex-wrap gap-2">
          <button
            type="button"
            onClick={() => setActiveFilter("all")}
            className={`rounded-full px-4 py-2 text-xs font-medium transition-colors ${
              activeFilter === "all" ? "bg-[#6d5cff] text-white" : "bg-white/5 text-white/60 hover:text-white"
            }`}
          >
            All
          </button>
          {filters.map((filter) => (
            <button
              key={filter.key}
              type="button"
              onClick={() => setActiveFilter(filter.key)}
              className={`rounded-full px-4 py-2 text-xs font-medium transition-colors ${
                activeFilter === filter.key
                  ? "bg-[#6d5cff] text-white"
                  : "bg-white/5 text-white/60 hover:text-white"
              }`}
            >
              {filter.label} ({filter.count})
            </button>
          ))}
        </div>

        <div className="relative w-full max-w-xs">
          <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-white/40" />
          <input
            type="search"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search Projects..."
            className="w-full rounded-xl border border-white/10 bg-[#1c1a35] py-2.5 pl-10 pr-4 text-sm text-white placeholder:text-white/45 outline-none focus:border-[#6d5cff]/50"
          />
        </div>
      </div>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
        <KanbanColumn
          title="Assigned"
          count={columns.assigned.length}
          projects={columns.assigned}
          role={role}
          emptyLabel="No assigned projects"
        />
        <KanbanColumn
          title="In Progress"
          count={columns.inProgress.length}
          projects={columns.inProgress}
          role={role}
          emptyLabel="No in progress projects"
        />
        <KanbanColumn
          title="Under Review"
          count={columns.underReview.length}
          projects={columns.underReview}
          role={role}
          emptyLabel="No projects under review"
        />
      </div>
    </div>
  );
}
