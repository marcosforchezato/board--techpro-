import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Dashboard | TechPro",
  description: "Painel interno de gestão TechPro",
};

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <div className="min-h-full bg-background-dark">{children}</div>;
}
