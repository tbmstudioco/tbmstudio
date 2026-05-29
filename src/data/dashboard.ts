export type ProjectStatus = "assigned" | "in-progress" | "under-review" | "completed";

export type DashboardRole = "manager" | "editor" | "client";

export type DashboardProject = {
  id: number;
  title: string;
  owner: string;
  assignee: string;
  status: ProjectStatus;
  progress: number;
  dueLabel: string;
  overdue?: boolean;
  clientReview?: boolean;
  flagged?: boolean;
};

export type DashboardStats = {
  totalOngoing: number;
  assigned: number;
  inProgress: number;
  underReview: number;
  completed: number;
  editsCompleted: number;
  editsCompletedTrend: string;
  avgTimePerEdit: string;
  avgTimeTrend: string;
  avgRevisions: number;
  avgRevisionsTrend: string;
};

export type DashboardUser = {
  name: string;
  role: DashboardRole;
  roleLabel: string;
  notifications: number;
};

export const dashboardUsers: Record<DashboardRole, DashboardUser> = {
  manager: {
    name: "Shubham",
    role: "manager",
    roleLabel: "Manager",
    notifications: 3,
  },
  editor: {
    name: "Shubham",
    role: "editor",
    roleLabel: "Editor",
    notifications: 1,
  },
  client: {
    name: "Shubham",
    role: "client",
    roleLabel: "Client",
    notifications: 2,
  },
};

export const managerProjects: DashboardProject[] = [
  {
    id: 1,
    title: "can india build coachella",
    owner: "Shubham",
    assignee: "Lavanya",
    status: "under-review",
    progress: 72,
    dueLabel: "Due in 2 days",
    overdue: true,
    clientReview: true,
    flagged: true,
  },
  {
    id: 2,
    title: "Brand Launch Reel — StyleByPriya",
    owner: "Priya Kapoor",
    assignee: "Arjun",
    status: "in-progress",
    progress: 45,
    dueLabel: "Due in 4 days",
  },
  {
    id: 3,
    title: "YouTube Retention Pack Vol. 3",
    owner: "Arjun Sharma",
    assignee: "Zara",
    status: "assigned",
    progress: 10,
    dueLabel: "Due in 6 days",
  },
  {
    id: 4,
    title: "Meta Ads — Mehta Digital",
    owner: "Vikram Mehta",
    assignee: "Lavanya",
    status: "under-review",
    progress: 88,
    dueLabel: "Due tomorrow",
    clientReview: true,
  },
  {
    id: 5,
    title: "Podcast Snippets — Funtasia",
    owner: "Elisa",
    assignee: "Arjun",
    status: "completed",
    progress: 100,
    dueLabel: "Delivered",
  },
  {
    id: 6,
    title: "Motion Graphics — Product Demo",
    owner: "Anise Health",
    assignee: "Zara",
    status: "under-review",
    progress: 65,
    dueLabel: "Overdue",
    overdue: true,
    flagged: true,
  },
];

export const editorProjects: DashboardProject[] = [
  {
    id: 1,
    title: "can india build coachella",
    owner: "Shubham",
    assignee: "You",
    status: "under-review",
    progress: 72,
    dueLabel: "Due in 2 days",
    overdue: true,
    clientReview: true,
    flagged: true,
  },
  {
    id: 2,
    title: "Meta Ads — Mehta Digital",
    owner: "Vikram Mehta",
    assignee: "You",
    status: "under-review",
    progress: 88,
    dueLabel: "Due tomorrow",
    clientReview: true,
  },
  {
    id: 3,
    title: "Motion Graphics — Product Demo",
    owner: "Anise Health",
    assignee: "You",
    status: "under-review",
    progress: 65,
    dueLabel: "Overdue",
    overdue: true,
  },
  {
    id: 4,
    title: "YouTube Retention Pack Vol. 3",
    owner: "Arjun Sharma",
    assignee: "You",
    status: "in-progress",
    progress: 45,
    dueLabel: "Due in 4 days",
  },
  {
    id: 5,
    title: "Reels Batch — StyleByPriya",
    owner: "Priya Kapoor",
    assignee: "You",
    status: "assigned",
    progress: 5,
    dueLabel: "Due in 6 days",
  },
  {
    id: 6,
    title: "Talking Head — Invisify",
    owner: "Avi",
    assignee: "You",
    status: "completed",
    progress: 100,
    dueLabel: "Delivered",
  },
];

export const clientProjects: DashboardProject[] = [
  {
    id: 1,
    title: "Brand Launch Reel — Your Brand",
    owner: "You",
    assignee: "TBM Team",
    status: "under-review",
    progress: 72,
    dueLabel: "Review requested",
    clientReview: true,
  },
  {
    id: 2,
    title: "Social Media Pack — March",
    owner: "You",
    assignee: "TBM Team",
    status: "in-progress",
    progress: 40,
    dueLabel: "First cut in 48hrs",
  },
  {
    id: 3,
    title: "YouTube Episode Edit",
    owner: "You",
    assignee: "TBM Team",
    status: "assigned",
    progress: 0,
    dueLabel: "Brief submitted",
  },
  {
    id: 4,
    title: "Commercial — Summer Campaign",
    owner: "You",
    assignee: "TBM Team",
    status: "completed",
    progress: 100,
    dueLabel: "Approved & delivered",
  },
];

export function getStatsForRole(role: DashboardRole, projects: DashboardProject[]): DashboardStats {
  const assigned = projects.filter((p) => p.status === "assigned").length;
  const inProgress = projects.filter((p) => p.status === "in-progress").length;
  const underReview = projects.filter((p) => p.status === "under-review").length;
  const completed = projects.filter((p) => p.status === "completed").length;

  const base = {
    totalOngoing: assigned + inProgress + underReview,
    assigned,
    inProgress,
    underReview,
    completed,
  };

  if (role === "manager") {
    return {
      ...base,
      editsCompleted: 12,
      editsCompletedTrend: "+24%",
      avgTimePerEdit: "42h",
      avgTimeTrend: "-12%",
      avgRevisions: 2.1,
      avgRevisionsTrend: "-8%",
    };
  }

  if (role === "editor") {
    return {
      ...base,
      editsCompleted: 0,
      editsCompletedTrend: "+100%",
      avgTimePerEdit: "465h",
      avgTimeTrend: "-18%",
      avgRevisions: 4,
      avgRevisionsTrend: "+30%",
    };
  }

  return {
    ...base,
    editsCompleted: 4,
    editsCompletedTrend: "+50%",
    avgTimePerEdit: "48h",
    avgTimeTrend: "-5%",
    avgRevisions: 1.5,
    avgRevisionsTrend: "-20%",
  };
}

export function getWelcomeMessage(role: DashboardRole, total: number) {
  if (role === "manager") {
    return `Welcome back! You have ${total} active projects across the team.`;
  }
  if (role === "editor") {
    return `Welcome back! take a deep breath, you have ${total} projects to work on.`;
  }
  return `Welcome back! You have ${total} projects in progress with TBM STUDIOZ.`;
}

export function getProjectsForRole(role: DashboardRole) {
  if (role === "manager") return managerProjects;
  if (role === "editor") return editorProjects;
  return clientProjects;
}
