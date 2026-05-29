import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Dashboard | TBM STUDIOZ",
  description: "TBM OS — project management for managers, editors, and clients.",
};

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
