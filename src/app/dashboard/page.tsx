import Link from "next/link";
import { Users, Clapperboard, FolderKanban, ArrowRight } from "lucide-react";

const portals = [
  {
    role: "Manager",
    href: "/dashboard/manager",
    description: "Overview of all team projects, stats, and workflow.",
    icon: Users,
    color: "from-violet-600/20 to-purple-900/20 border-violet-500/20",
  },
  {
    role: "Editor",
    href: "/dashboard/editor",
    description: "Your assigned edits, progress tracking, and reviews.",
    icon: Clapperboard,
    color: "from-indigo-600/20 to-blue-900/20 border-indigo-500/20",
  },
  {
    role: "Client",
    href: "/dashboard/client",
    description: "Track your projects, review cuts, and approve deliverables.",
    icon: FolderKanban,
    color: "from-fuchsia-600/20 to-pink-900/20 border-fuchsia-500/20",
  },
];

export default function DashboardHomePage() {
  return (
    <main className="min-h-screen bg-[#0f0e1a] px-6 py-20">
      <div className="mx-auto max-w-5xl">
        <Link href="/" className="text-sm text-white/50 hover:text-white">
          ← Back to site
        </Link>
        <h1 className="mt-8 text-4xl font-semibold text-white md:text-5xl">
          TBM<span className="font-light text-white/60">OS</span> Dashboard
        </h1>
        <p className="mt-4 max-w-xl text-white/45">
          Choose your portal to manage projects, edits, and client reviews.
        </p>

        <div className="mt-14 grid grid-cols-1 gap-6 md:grid-cols-3">
          {portals.map(({ role, href, description, icon: Icon, color }) => (
            <Link
              key={role}
              href={href}
              className={`group rounded-2xl border bg-gradient-to-br p-8 transition-transform hover:scale-[1.02] ${color}`}
            >
              <Icon size={28} className="text-[#b8aeff]" />
              <h2 className="mt-6 text-xl font-semibold text-white">{role}</h2>
              <p className="mt-3 text-sm leading-relaxed text-white/45">{description}</p>
              <span className="mt-6 inline-flex items-center gap-2 text-xs font-medium uppercase tracking-wider text-[#b8aeff]">
                Open portal
                <ArrowRight size={14} className="transition-transform group-hover:translate-x-1" />
              </span>
            </Link>
          ))}
        </div>
      </div>
    </main>
  );
}
