import DashboardSidebar from "@/components/dashboard/DashboardSidebar";
import DashboardView from "@/components/dashboard/DashboardView";
import {
  dashboardUsers,
  getProjectsForRole,
  getStatsForRole,
} from "@/data/dashboard";

export default function EditorDashboardPage() {
  const user = dashboardUsers.editor;
  const projects = getProjectsForRole("editor");
  const stats = getStatsForRole("editor", projects);

  return (
    <div className="flex min-h-screen bg-[#0f0e1a]">
      <DashboardSidebar user={user} />
      <DashboardView role="editor" projects={projects} stats={stats} />
    </div>
  );
}
