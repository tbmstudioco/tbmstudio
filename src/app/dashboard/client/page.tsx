import DashboardSidebar from "@/components/dashboard/DashboardSidebar";
import DashboardView from "@/components/dashboard/DashboardView";
import {
  dashboardUsers,
  getProjectsForRole,
  getStatsForRole,
} from "@/data/dashboard";

export default function ClientDashboardPage() {
  const user = dashboardUsers.client;
  const projects = getProjectsForRole("client");
  const stats = getStatsForRole("client", projects);

  return (
    <div className="flex min-h-screen bg-[#0f0e1a]">
      <DashboardSidebar user={user} />
      <DashboardView role="client" projects={projects} stats={stats} />
    </div>
  );
}
