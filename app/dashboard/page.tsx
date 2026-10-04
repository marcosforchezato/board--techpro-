import { CheckCircle2, Clock, FileText, Users } from "lucide-react";

const INDICADORES = [
  {
    rotulo: "Orçamentos no mês",
    valor: "34",
    icon: FileText,
    cor: "text-green",
    fundo: "bg-green/15",
    nota: "18% vs. mês anterior",
    notaCor: "text-green",
  },
  {
    rotulo: "Clientes ativos",
    valor: "127",
    icon: Users,
    cor: "text-cyan",
    fundo: "bg-cyan/15",
    nota: "6 novos este mês",
    notaCor: "text-gray",
  },
  {
    rotulo: "OS em aberto",
    valor: "11",
    icon: Clock,
    cor: "text-amber-300",
    fundo: "bg-amber-400/15",
    nota: "3 atrasadas · 4 hoje",
    notaCor: "text-amber-300",
  },
  {
    rotulo: "Contratos fechados",
    valor: "R$ 48.750",
    icon: CheckCircle2,
    cor: "text-green",
    fundo: "bg-green/15",
    nota: "19 de 34 orçamentos",
    notaCor: "text-gray",
  },
];

const SERIE = [
  { mes: "Out", total: 14, fechados: 6 },
  { mes: "Nov", total: 13, fechados: 8 },
  { mes: "Dez", total: 17, fechados: 9 },
  { mes: "Jan", total: 14, fechados: 10 },
  { mes: "Fev", total: 17, fechados: 11 },
  { mes: "Mar", total: 19, fechados: 14 },
  { mes: "Abr", total: 22, fechados: 15 },
  { mes: "Mai", total: 21, fechados: 17 },
  { mes: "Jun", total: 24, fechados: 18 },
  { mes: "Jul", total: 25, fechados: 21 },
  { mes: "Ago", total: 29, fechados: 22 },
  { mes: "Set", total: 34, fechados: 27 },
];

const ORDENS = [
  { descricao: "Concluídas", total: 42, cor: "#2AAE7E" },
  { descricao: "Em execução", total: 8, cor: "#0F8BFF" },
  { descricao: "Aguardando peça", total: 5, cor: "#F5B544" },
  { descricao: "Atrasadas", total: 3, cor: "#FF8F6B" },
];

const ORCAMENTOS = [
  {
    cliente: "Condomínio Vale Verde",
    perfil: "Instituição",
    servico: "Portaria + CFTV",
    valor: "R$ 18.400",
    status: "Aprovado",
    cor: "bg-green/15 text-green",
  },
  {
    cliente: "Transportadora Rota Sul",
    perfil: "Transportadora",
    servico: "Perímetro com IA",
    valor: "R$ 12.900",
    status: "Em análise",
    cor: "bg-amber-400/15 text-amber-300",
  },
  {
    cliente: "Padaria Dom Pedro",
    perfil: "Empresa",
    servico: "Alarme + 4 câmeras",
    valor: "R$ 4.250",
    status: "Novo",
    cor: "bg-cyan/15 text-cyan",
  },
  {
    cliente: "Residência Silveira",
    perfil: "Residência",
    servico: "Automação + cerca",
    valor: "R$ 7.600",
    status: "Aprovado",
    cor: "bg-green/15 text-green",
  },
  {
    cliente: "Escola Monte Alto",
    perfil: "Instituição",
    servico: "Controle de acesso",
    valor: "R$ 9.800",
    status: "Aguardando",
    cor: "bg-white/10 text-light-gray",
  },
];

const VISITAS = [
  {
    dia: "Ter",
    num: "06",
    cliente: "Condomínio Vale Verde",
    detalhe: "08h30 · CFTV · Equipe A",
    hoje: true,
  },
  {
    dia: "Qua",
    num: "07",
    cliente: "Padaria Dom Pedro",
    detalhe: "14h00 · Alarme · Equipe B",
  },
  {
    dia: "Qui",
    num: "08",
    cliente: "Escola Monte Alto",
    detalhe: "09h00 · Manutenção · Equipe A",
  },
  {
    dia: "Sex",
    num: "09",
    cliente: "Transportadora Rota Sul",
    detalhe: "07h30 · Perímetro · Equipe C",
  },
];

export default function Dashboard() {
  const maior = Math.max(...SERIE.map((p) => p.total));
  const maiorOrdem = Math.max(...ORDENS.map((o) => o.total));

  return (
    <div className="min-h-full min-w-0 bg-background-dark">
      <div className="flex min-w-0 flex-col gap-4 px-4 py-5 sm:px-5 lg:px-6">
        <section
          aria-label="Indicadores do mês"
          className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4"
        >
          {INDICADORES.map((kpi) => (
            <article
              key={kpi.rotulo}
              className="rounded-lg border border-white/10 bg-white/5 p-4"
            >
              <div className="mb-3 flex items-center justify-between gap-3">
                <span className="text-xs font-semibold text-gray">
                  {kpi.rotulo}
                </span>
                <div
                  className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-lg ${kpi.fundo}`}
                >
                  <kpi.icon className={kpi.cor} size={16} strokeWidth={2} />
                </div>
              </div>
              <p className="text-2xl font-bold leading-none tracking-tight text-white">
                {kpi.valor}
              </p>
              <p className={`mt-2 text-[11px] font-semibold ${kpi.notaCor}`}>
                {kpi.nota}
              </p>
            </article>
          ))}
        </section>

        <section className="grid grid-cols-1 gap-4 xl:grid-cols-3">
          <article className="rounded-lg border border-white/10 bg-white/5 p-5 xl:col-span-2">
            <div className="mb-5 flex flex-wrap items-start justify-between gap-3">
              <div>
                <h2 className="text-sm font-extrabold tracking-tight text-white">
                  Orçamentos solicitados
                </h2>
                <p className="mt-1 text-xs text-gray">
                  Últimos 12 meses · origem: formulário do site
                </p>
              </div>
              <div className="flex shrink-0 gap-3 text-[11px] text-light-gray">
                <span className="inline-flex items-center gap-1.5">
                  <span className="h-2 w-2 rounded-sm bg-green" />
                  Fechados
                </span>
                <span className="inline-flex items-center gap-1.5">
                  <span className="h-2 w-2 rounded-sm bg-white/15" />
                  Em aberto
                </span>
              </div>
            </div>

            <div
              className="flex items-end gap-2 border-b border-white/10"
              style={{ height: 160 }}
            >
              {SERIE.map((p, i) => (
                <div
                  key={p.mes}
                  className="flex h-full flex-1 flex-col justify-end gap-[2px]"
                  title={`${p.mes}: ${p.fechados} fechados de ${p.total}`}
                >
                  <div
                    className="rounded-t-[4px] bg-white/15"
                    style={{
                      height: ((p.total - p.fechados) / maior) * 160,
                    }}
                  />
                  <div
                    className={`rounded-b-[4px] ${
                      i === SERIE.length - 1 ? "bg-green" : "bg-green/80"
                    }`}
                    style={{ height: (p.fechados / maior) * 160 }}
                  />
                </div>
              ))}
            </div>
            <div className="mt-2 flex gap-2">
              {SERIE.map((p, i) => (
                <span
                  key={p.mes}
                  className={`flex-1 text-center text-[10px] ${
                    i === SERIE.length - 1
                      ? "font-bold text-white"
                      : "text-gray"
                  }`}
                >
                  {p.mes}
                </span>
              ))}
            </div>
          </article>

          <article className="flex flex-col rounded-lg border border-white/10 bg-white/5 p-5">
            <h2 className="text-sm font-extrabold tracking-tight text-white">
              Ordens de serviço
            </h2>
            <p className="mb-5 mt-1 text-xs text-gray">Distribuição atual</p>

            <ul className="flex flex-col gap-3">
              {ORDENS.map((o) => (
                <li key={o.descricao}>
                  <div className="mb-1.5 flex items-baseline justify-between gap-3">
                    <span className="text-xs font-semibold text-light-gray">
                      {o.descricao}
                    </span>
                    <span className="text-xs font-bold text-white">
                      {o.total}
                    </span>
                  </div>
                  <div className="h-1.5 overflow-hidden rounded-full bg-white/10">
                    <div
                      className="h-full rounded-full"
                      style={{
                        width: `${(o.total / maiorOrdem) * 100}%`,
                        backgroundColor: o.cor,
                      }}
                    />
                  </div>
                </li>
              ))}
            </ul>

            <div className="mt-auto pt-5">
              <div className="rounded-lg border border-white/10 bg-black/20 p-3">
                <p className="text-[11px] text-gray">
                  Tempo médio de atendimento
                </p>
                <p className="mt-1 text-lg font-extrabold tracking-tight text-white">
                  2h 14min
                </p>
              </div>
            </div>
          </article>
        </section>

        <section className="grid grid-cols-1 gap-4 xl:grid-cols-3">
          <article className="overflow-hidden rounded-lg border border-white/10 bg-white/5 xl:col-span-2">
            <div className="p-5 pb-4">
              <h2 className="text-sm font-extrabold tracking-tight text-white">
                Orçamentos recentes
              </h2>
              <p className="mt-1 text-xs text-gray">
                Solicitações recebidas pelo site
              </p>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full border-collapse text-left">
                <thead>
                  <tr className="border-y border-white/10 text-[10px] uppercase tracking-wider text-gray">
                    <th scope="col" className="px-5 py-2 font-bold">
                      Cliente
                    </th>
                    <th scope="col" className="px-2.5 py-2 font-bold">
                      Perfil
                    </th>
                    <th scope="col" className="px-2.5 py-2 font-bold">
                      Serviço
                    </th>
                    <th scope="col" className="px-2.5 py-2 font-bold">
                      Valor
                    </th>
                    <th scope="col" className="px-5 py-2 font-bold">
                      Status
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {ORCAMENTOS.map((o) => (
                    <tr
                      key={o.cliente}
                      className="border-b border-white/5 last:border-0"
                    >
                      <td className="px-5 py-3 text-xs font-bold text-white">
                        {o.cliente}
                      </td>
                      <td className="px-2.5 py-3 text-xs text-light-gray">
                        {o.perfil}
                      </td>
                      <td className="px-2.5 py-3 text-xs text-light-gray">
                        {o.servico}
                      </td>
                      <td className="whitespace-nowrap px-2.5 py-3 text-xs font-bold text-white">
                        {o.valor}
                      </td>
                      <td className="px-5 py-3">
                        <span
                          className={`inline-block rounded-full px-2 py-0.5 text-[10px] font-bold ${o.cor}`}
                        >
                          {o.status}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </article>

          <article className="rounded-lg border border-white/10 bg-white/5 p-5">
            <h2 className="text-sm font-extrabold tracking-tight text-white">
              Próximas instalações
            </h2>
            <p className="mb-4 mt-1 text-xs text-gray">Esta semana</p>

            <ul className="flex flex-col gap-2.5">
              {VISITAS.map((v) => (
                <li
                  key={v.num}
                  className="flex gap-3 rounded-lg border border-white/10 bg-black/20 p-3"
                >
                  <div className="w-9 shrink-0 text-center">
                    <p
                      className={`text-[9px] font-bold uppercase tracking-wide ${
                        v.hoje ? "text-green" : "text-gray"
                      }`}
                    >
                      {v.dia}
                    </p>
                    <p className="text-lg font-extrabold leading-tight text-white">
                      {v.num}
                    </p>
                  </div>
                  <div className="min-w-0">
                    <p className="truncate text-xs font-bold text-white">
                      {v.cliente}
                    </p>
                    <p className="mt-0.5 text-[10px] text-gray">{v.detalhe}</p>
                  </div>
                </li>
              ))}
            </ul>
          </article>
        </section>
      </div>
    </div>
  );
}
