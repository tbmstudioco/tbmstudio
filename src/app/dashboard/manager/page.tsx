import DashboardSidebar from "@/components/dashboard/DashboardSidebar";
import DashboardView from "@/components/dashboard/DashboardView";
import {
  dashboardUsers,
  getProjectsForRole,
  getStatsForRole,
  type DashboardRole,
} from "@/data/dashboard";

function DashboardPage({ role }: { role: DashboardRole }) {
  const user = dashboardUsers[role];
  const projects = getProjectsForRole(role);
  const stats = getStatsForRole(role, projects);

  return (
    <div className="flex min-h-screen bg-[#0f0e1a]">
      <DashboardSidebar user={user} />
      <DashboardView role={role} projects={projects} stats={stats} />
    </div>
  );
}

export default function ManagerDashboardPage() {
  return <DashboardPage role="manager" />;
}
