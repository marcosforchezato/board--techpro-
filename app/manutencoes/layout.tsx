import type { Metadata } from "next";
import { redirect } from "next/navigation";
import { features } from "@/app/config/features";

export const metadata: Metadata = {
  title: "Manutenções | TechPro",
  description: "Manutenção de cadastros do sistema",
};

export default function ManutencoesLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  if (!features.sistemaGestao) {
    redirect("/");
  }

  return (
    <div className="min-h-screen w-full" style={{ backgroundColor: "#0A1429" }}>
      {children}
    </div>
  );
}
