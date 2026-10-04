import type { Metadata } from "next";

import DashHeader from "@/app/components/dash-header";
import DashSidebar from "@/app/components/dash-sidebar";

export const metadata: Metadata = {
  title: "Dashboard | TechPro",
  description: "Painel interno de gestão TechPro",
};

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-background-dark">
      <DashSidebar />
      <DashHeader />
      <main className="min-h-screen min-w-0 pt-[69px] lg:pl-56">
        {children}
      </main>
    </div>
  );
}
