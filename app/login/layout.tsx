import type { Metadata } from "next";
import { redirect } from "next/navigation";
import { features } from "../config/features";

export const metadata: Metadata = {
  title: "Login | TechPro",
  description: "Acesso ao sistema de gestão TechPro",
};

export default function LoginLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  if (!features.sistemaGestao) {
    redirect("/");
  }

  return (
    <div className="min-h-full flex flex-1 items-center justify-center bg-background-dark px-6 py-12">
      {children}
    </div>
  );
}
