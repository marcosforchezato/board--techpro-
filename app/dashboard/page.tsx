import {
  Bell, CalendarDays, CheckCircle2, Clock, FileText, LayoutDashboard,
  LifeBuoy, Plus, Search, Settings, ShieldCheck, TrendingUp, Users, Wrench,
} from "lucide-react";

// ---------- dados fictícios ----------
const MENU = [
  { rotulo: "Visão geral", icon: LayoutDashboard, ativo: true },
  { rotulo: "Orçamentos", icon: FileText, contador: 8 },
  { rotulo: "Clientes", icon: Users },
  { rotulo: "Ordens de serviço", icon: Wrench, contador: 3, alerta: true },
  { rotulo: "Agenda", icon: CalendarDays },
];

const INDICADORES = [
  { rotulo: "Orçamentos no mês", valor: "34", icon: FileText, cor: "text-green", fundo: "bg-green/15", nota: "18% vs. mês anterior", notaCor: "text-green" },
  { rotulo: "Clientes ativos", valor: "127", icon: Users, cor: "text-cyan", fundo: "bg-cyan/15", nota: "6 novos este mês", notaCor: "text-gray" },
  { rotulo: "OS em aberto", valor: "11", icon: Clock, cor: "text-amber-300", fundo: "bg-amber-400/15", nota: "3 atrasadas · 4 hoje", notaCor: "text-amber-300" },
  { rotulo: "Contratos fechados", valor: "R$ 48.750", icon: CheckCircle2, cor: "text-green", fundo: "bg-green/15", nota: "19 de 34 orçamentos", notaCor: "text-gray" },
];

const SERIE = [
  { mes: "Out", total: 14, fechados: 6 }, { mes: "Nov", total: 13, fechados: 8 },
  { mes: "Dez", total: 17, fechados: 9 }, { mes: "Jan", total: 14, fechados: 10 },
  { mes: "Fev", total: 17, fechados: 11 }, { mes: "Mar", total: 19, fechados: 14 },
  { mes: "Abr", total: 22, fechados: 15 }, { mes: "Mai", total: 21, fechados: 17 },
  { mes: "Jun", total: 24, fechados: 18 }, { mes: "Jul", total: 25, fechados: 21 },
  { mes: "Ago", total: 29, fechados: 22 }, { mes: "Set", total: 34, fechados: 27 },
];

const ORDENS = [
  { descricao: "Concluídas", total: 42, cor: "#2AAE7E" },
  { descricao: "Em execução", total: 8, cor: "#0F8BFF" },
  { descricao: "Aguardando peça", total: 5, cor: "#F5B544" },
  { descricao: "Atrasadas", total: 3, cor: "#FF8F6B" },
];

const ORCAMENTOS = [
  { cliente: "Condomínio Vale Verde", perfil: "Instituição", servico: "Portaria + CFTV", valor: "R$ 18.400", status: "Aprovado", cor: "bg-green/15 text-green" },
  { cliente: "Transportadora Rota Sul", perfil: "Transportadora", servico: "Perímetro com IA", valor: "R$ 12.900", status: "Em análise", cor: "bg-amber-400/15 text-amber-300" },
  { cliente: "Padaria Dom Pedro", perfil: "Empresa", servico: "Alarme + 4 câmeras", valor: "R$ 4.250", status: "Novo", cor: "bg-cyan/15 text-cyan" },
  { cliente: "Residência Silveira", perfil: "Residência", servico: "Automação + cerca", valor: "R$ 7.600", status: "Aprovado", cor: "bg-green/15 text-green" },
  { cliente: "Escola Monte Alto", perfil: "Instituição", servico: "Controle de acesso", valor: "R$ 9.800", status: "Aguardando", cor: "bg-white/10 text-light-gray" },
];

const VISITAS = [
  { dia: "Ter", num: "06", cliente: "Condomínio Vale Verde", detalhe: "08h30 · CFTV · Equipe A", hoje: true },
  { dia: "Qua", num: "07", cliente: "Padaria Dom Pedro", detalhe: "14h00 · Alarme · Equipe B" },
  { dia: "Qui", num: "08", cliente: "Escola Monte Alto", detalhe: "09h00 · Manutenção · Equipe A" },
  { dia: "Sex", num: "09", cliente: "Transportadora Rota Sul", detalhe: "07h30 · Perímetro · Equipe C" },
];

const ALTURA = 190;

export default function Dashboard() {
  const maior = Math.max(...SERIE.map((p) => p.total));
  const maiorOrdem = Math.max(...ORDENS.map((o) => o.total));

  return (
    <div className="flex min-h-screen bg-background-dark">
      {/* ---------- menu lateral ---------- */}
      <nav aria-label="Menu principal" className="hidden w-60 shrink-0 flex-col border-r border-white/10 bg-black/20 p-4 lg:flex">
        <div className="flex items-center gap-2.5 px-2 pb-7 pt-1">
          <div className="flex h-9 w-9 items-center justify-center rounded-[10px] bg-green">
            <ShieldCheck className="text-dark-blue" size={20} strokeWidth={2.4} />
          </div>
          <div>
            <p className="text-[17px] font-extrabold leading-tight text-white">TechPro</p>
            <p className="text-[10px] font-semibold uppercase tracking-widest text-gray">Gestão</p>
          </div>
        </div>

        <p className="px-3 pb-2.5 text-[10px] font-bold uppercase tracking-widest text-gray">Operação</p>
        <ul className="flex flex-col gap-1">
          {MENU.map((item) => (
            <li key={item.rotulo}>
              <button
                type="button"
                className={`flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-sm ${
                  item.ativo ? "bg-green/15 font-bold text-white" : "font-medium text-gray hover:bg-white/5"
                }`}
              >
                <item.icon size={18} strokeWidth={2} className={item.ativo ? "text-green" : ""} />
                <span className="truncate">{item.rotulo}</span>
                {item.contador && (
                  <span className={`ml-auto rounded-full px-2 py-0.5 text-xs font-bold text-dark-blue ${item.alerta ? "bg-amber-400" : "bg-green"}`}>
                    {item.contador}
                  </span>
                )}
              </button>
            </li>
          ))}
        </ul>

        <p className="px-3 pb-2.5 pt-6 text-[10px] font-bold uppercase tracking-widest text-gray">Gestão</p>
        <ul className="flex flex-col gap-1">
          {[{ rotulo: "Relatórios", icon: TrendingUp }, { rotulo: "Configurações", icon: Settings }].map((item) => (
            <li key={item.rotulo}>
              <button type="button" className="flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium text-gray hover:bg-white/5">
                <item.icon size={18} strokeWidth={2} />
                {item.rotulo}
              </button>
            </li>
          ))}
        </ul>

        <div className="mt-auto rounded-xl border border-white/10 bg-white/5 p-3.5">
          <p className="mb-1.5 flex items-center gap-2 text-xs font-bold text-white">
            <LifeBuoy className="text-green" size={15} strokeWidth={2.2} /> Central 24h
          </p>
          <p className="text-xs leading-relaxed text-gray">Monitoramento ativo em 128 pontos.</p>
        </div>
      </nav>

      {/* ---------- conteúdo ---------- */}
      <main className="min-w-0 flex-1">
        <header className="flex flex-wrap items-center gap-4 border-b border-white/10 bg-black/20 px-6 py-5">
          <div>
            <h1 className="text-xl font-extrabold tracking-tight text-white">Visão geral</h1>
            <p className="mt-0.5 text-sm text-gray">Setembro de 2026 · atualizado há 4 minutos</p>
          </div>

          <div className="ml-auto flex items-center gap-3">
            <div className="hidden h-10 w-64 items-center gap-2 rounded-lg border border-white/10 bg-white/5 px-3 md:flex">
              <Search className="shrink-0 text-gray" size={16} />
              <label htmlFor="busca" className="sr-only">Buscar cliente ou OS</label>
              <input id="busca" type="search" placeholder="Buscar cliente, OS…"
                className="min-w-0 flex-1 bg-transparent text-sm text-white placeholder:text-gray focus:outline-none" />
            </div>
            <button type="button" aria-label="Notificações"
              className="relative flex h-10 w-10 items-center justify-center rounded-lg border border-white/10 bg-white/5 text-gray hover:text-white">
              <Bell size={18} />
              <span className="absolute right-2.5 top-2.5 h-1.5 w-1.5 rounded-full bg-amber-400" />
            </button>
            <button type="button"
              className="flex h-10 items-center gap-2 rounded-lg bg-green px-4 text-sm font-bold text-dark-blue hover:opacity-90">
              <Plus size={16} strokeWidth={2.6} />
              <span className="hidden sm:inline">Novo orçamento</span>
            </button>
          </div>
        </header>

        <div className="flex flex-col gap-6 px-6 py-7">
          {/* indicadores */}
          <section aria-label="Indicadores do mês" className="grid grid-cols-1 gap-5 sm:grid-cols-2 xl:grid-cols-4">
            {INDICADORES.map((kpi) => (
              <article key={kpi.rotulo} className="rounded-xl border border-white/10 bg-white/5 p-5">
                <div className="mb-4 flex items-center justify-between gap-3">
                  <span className="text-sm font-semibold text-gray">{kpi.rotulo}</span>
                  <div className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-lg ${kpi.fundo}`}>
                    <kpi.icon className={kpi.cor} size={18} strokeWidth={2} />
                  </div>
                </div>
                <p className="text-3xl font-bold leading-none tracking-tight text-white">{kpi.valor}</p>
                <p className={`mt-3 text-xs font-semibold ${kpi.notaCor}`}>{kpi.nota}</p>
              </article>
            ))}
          </section>

          {/* gráfico + distribuição */}
          <section className="grid grid-cols-1 gap-5 xl:grid-cols-3">
            <article className="rounded-xl border border-white/10 bg-white/5 p-6 xl:col-span-2">
              <div className="mb-6 flex flex-wrap items-start justify-between gap-4">
                <div>
                  <h2 className="text-base font-extrabold tracking-tight text-white">Orçamentos solicitados</h2>
                  <p className="mt-1 text-sm text-gray">Últimos 12 meses · origem: formulário do site</p>
                </div>
                <div className="flex shrink-0 gap-4 text-xs text-light-gray">
                  <span className="inline-flex items-center gap-2"><span className="h-2.5 w-2.5 rounded-sm bg-green" />Fechados</span>
                  <span className="inline-flex items-center gap-2"><span className="h-2.5 w-2.5 rounded-sm bg-white/15" />Em aberto</span>
                </div>
              </div>

              <div className="flex items-end gap-3 border-b border-white/10" style={{ height: ALTURA }}>
                {SERIE.map((p, i) => (
                  <div key={p.mes} className="flex h-full flex-1 flex-col justify-end gap-[3px]"
                    title={`${p.mes}: ${p.fechados} fechados de ${p.total}`}>
                    <div className="rounded-t-[5px] bg-white/15"
                      style={{ height: ((p.total - p.fechados) / maior) * ALTURA }} />
                    <div className={`rounded-b-[5px] ${i === SERIE.length - 1 ? "bg-green" : "bg-green/80"}`}
                      style={{ height: (p.fechados / maior) * ALTURA }} />
                  </div>
                ))}
              </div>
              <div className="mt-2.5 flex gap-3">
                {SERIE.map((p, i) => (
                  <span key={p.mes} className={`flex-1 text-center text-xs ${i === SERIE.length - 1 ? "font-bold text-white" : "text-gray"}`}>
                    {p.mes}
                  </span>
                ))}
              </div>
            </article>

            <article className="flex flex-col rounded-xl border border-white/10 bg-white/5 p-6">
              <h2 className="text-base font-extrabold tracking-tight text-white">Ordens de serviço</h2>
              <p className="mb-6 mt-1 text-sm text-gray">Distribuição atual</p>

              <ul className="flex flex-col gap-4">
                {ORDENS.map((o) => (
                  <li key={o.descricao}>
                    <div className="mb-2 flex items-baseline justify-between gap-3">
                      <span className="text-sm font-semibold text-light-gray">{o.descricao}</span>
                      <span className="text-sm font-bold text-white">{o.total}</span>
                    </div>
                    <div className="h-2 overflow-hidden rounded-full bg-white/10">
                      <div className="h-full rounded-full"
                        style={{ width: `${(o.total / maiorOrdem) * 100}%`, backgroundColor: o.cor }} />
                    </div>
                  </li>
                ))}
              </ul>

              <div className="mt-auto pt-6">
                <div className="rounded-xl border border-white/10 bg-black/20 p-4">
                  <p className="text-xs text-gray">Tempo médio de atendimento</p>
                  <p className="mt-1 text-xl font-extrabold tracking-tight text-white">2h 14min</p>
                </div>
              </div>
            </article>
          </section>

          {/* tabela + agenda */}
          <section className="grid grid-cols-1 gap-5 xl:grid-cols-3">
            <article className="overflow-hidden rounded-xl border border-white/10 bg-white/5 xl:col-span-2">
              <div className="p-6 pb-5">
                <h2 className="text-base font-extrabold tracking-tight text-white">Orçamentos recentes</h2>
                <p className="mt-1 text-sm text-gray">Solicitações recebidas pelo site</p>
              </div>

              <div className="overflow-x-auto">
                <table className="w-full border-collapse text-left">
                  <thead>
                    <tr className="border-y border-white/10 text-[11px] uppercase tracking-wider text-gray">
                      <th scope="col" className="px-6 py-2.5 font-bold">Cliente</th>
                      <th scope="col" className="px-3 py-2.5 font-bold">Perfil</th>
                      <th scope="col" className="px-3 py-2.5 font-bold">Serviço</th>
                      <th scope="col" className="px-3 py-2.5 font-bold">Valor</th>
                      <th scope="col" className="px-6 py-2.5 font-bold">Status</th>
                    </tr>
                  </thead>
                  <tbody>
                    {ORCAMENTOS.map((o) => (
                      <tr key={o.cliente} className="border-b border-white/5 last:border-0">
                        <td className="px-6 py-4 text-sm font-bold text-white">{o.cliente}</td>
                        <td className="px-3 py-4 text-sm text-light-gray">{o.perfil}</td>
                        <td className="px-3 py-4 text-sm text-light-gray">{o.servico}</td>
                        <td className="whitespace-nowrap px-3 py-4 text-sm font-bold text-white">{o.valor}</td>
                        <td className="px-6 py-4">
                          <span className={`inline-block rounded-full px-2.5 py-1 text-xs font-bold ${o.cor}`}>{o.status}</span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </article>

            <article className="rounded-xl border border-white/10 bg-white/5 p-6">
              <h2 className="text-base font-extrabold tracking-tight text-white">Próximas instalações</h2>
              <p className="mb-5 mt-1 text-sm text-gray">Esta semana</p>

              <ul className="flex flex-col gap-3">
                {VISITAS.map((v) => (
                  <li key={v.num} className="flex gap-3.5 rounded-xl border border-white/10 bg-black/20 p-3.5">
                    <div className="w-11 shrink-0 text-center">
                      <p className={`text-[10px] font-bold uppercase tracking-wide ${v.hoje ? "text-green" : "text-gray"}`}>{v.dia}</p>
                      <p className="text-xl font-extrabold leading-tight text-white">{v.num}</p>
                    </div>
                    <div className="min-w-0">
                      <p className="truncate text-sm font-bold text-white">{v.cliente}</p>
                      <p className="mt-0.5 text-xs text-gray">{v.detalhe}</p>
                    </div>
                  </li>
                ))}
              </ul>
            </article>
          </section>
        </div>
      </main>
    </div>
  );
}