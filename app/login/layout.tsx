import type { Metadata } from "next";
import { SecurityPattern } from "@/resources/security-pattern";

export const metadata: Metadata = {
  title: "Login | TechPro",
  description: "Acesso ao sistema de gestão TechPro",
};

export default function LoginLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="relative min-h-full flex flex-1 items-center justify-center bg-background-dark px-6 py-12 overflow-hidden">
      <SecurityPattern color="text-cyan/10" />
      <div className="relative z-10 w-full flex justify-center">{children}</div>
    </div>
  );
}
