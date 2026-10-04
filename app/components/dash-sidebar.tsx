"use client";

import {
  CalendarDays,
  FileText,
  LayoutDashboard,
  LifeBuoy,
  Settings,
  ShieldCheck,
  TrendingUp,
  Users,
  Wrench,
} from "lucide-react";
import { usePathname, useRouter } from "next/navigation";

const MENU = [
  { rotulo: "Visão geral", icon: LayoutDashboard, rota: "/" },
  {
    rotulo: "Orçamentos",
    icon: FileText,
    contador: 8,
    rota: "/dashboard/orcamentos",
  },
  { rotulo: "Clientes", icon: Users, rota: "/dashboard/clientes" },
  {
    rotulo: "Ordens de serviço",
    icon: Wrench,
    contador: 3,
    alerta: true,
    rota: "/ordens-servico",
  },
  { rotulo: "Agenda", icon: CalendarDays, rota: "/dashboard/agenda" },
  { rotulo: "Manutenções", icon: Wrench, rota: "/dashboard/manutencoes" },
];

const GESTAO = [
  { rotulo: "Relatórios", icon: TrendingUp, rota: "/dashboard/relatorios" },
  { rotulo: "Configurações", icon: Settings, rota: "/dashboard/configuracoes" },
];

export default function DashSidebar() {
  const pathname = usePathname();
  const router = useRouter();

  return (
    <nav
      aria-label="Menu principal"
      className="fixed inset-y-0 left-0 z-40 hidden w-56 flex-col border-r border-white/10 bg-[#07131b] px-3 py-3 lg:flex"
    >
      <div className="flex items-center gap-2 px-2 pb-6 pt-1">
        <div className="flex h-8 w-8 items-center justify-center rounded-[9px] bg-green">
          <ShieldCheck className="text-dark-blue" size={18} strokeWidth={2.4} />
        </div>
        <div>
          <p className="text-base font-extrabold leading-tight text-white">
            TechPro
          </p>
          <p className="text-[9px] font-semibold uppercase tracking-widest text-gray">
            Gestão
          </p>
        </div>
      </div>

      <p className="px-2.5 pb-2 text-[9px] font-bold uppercase tracking-widest text-gray">
        Operação
      </p>
      <ul className="flex flex-col gap-0.5">
        {MENU.map((item) => {
          const ativo =
            item.rota === "/"
              ? pathname === "/"
              : pathname === item.rota || pathname.startsWith(`${item.rota}/`);

          return (
            <li key={item.rotulo}>
              <button
                type="button"
                onClick={() => router.push(item.rota)}
                className={`flex w-full cursor-pointer items-center gap-2.5 rounded-lg px-2.5 py-2 text-xs transition-colors ${
                  ativo
                    ? "bg-green/15 font-bold text-white"
                    : "font-medium text-gray hover:bg-white/5 hover:text-white"
                }`}
              >
                <item.icon
                  size={16}
                  strokeWidth={2}
                  className={ativo ? "text-green" : ""}
                />
                <span className="truncate">{item.rotulo}</span>
                {item.contador && (
                  <span
                    className={`ml-auto rounded-full px-1.5 py-0.5 text-[10px] font-bold text-dark-blue ${
                      item.alerta ? "bg-amber-400" : "bg-green"
                    }`}
                  >
                    {item.contador}
                  </span>
                )}
              </button>
            </li>
          );
        })}
      </ul>

      <p className="px-2.5 pb-2 pt-5 text-[9px] font-bold uppercase tracking-widest text-gray">
        Gestão
      </p>
      <ul className="flex flex-col gap-0.5">
        {GESTAO.map((item) => (
          <li key={item.rotulo}>
            <button
              type="button"
              onClick={() => router.push(item.rota)}
              className="flex w-full cursor-pointer items-center gap-2.5 rounded-lg px-2.5 py-2 text-xs font-medium text-gray transition-colors hover:bg-white/5 hover:text-white"
            >
              <item.icon size={16} strokeWidth={2} />
              {item.rotulo}
            </button>
          </li>
        ))}
      </ul>

      <div className="mt-auto rounded-lg border border-white/10 bg-white/5 p-3">
        <p className="mb-1 flex items-center gap-2 text-[11px] font-bold text-white">
          <LifeBuoy className="text-green" size={14} strokeWidth={2.2} />
          Central 24h
        </p>
        <p className="text-[10px] leading-relaxed text-gray">
          Monitoramento ativo em 128 pontos.
        </p>
      </div>
    </nav>
  );
}
