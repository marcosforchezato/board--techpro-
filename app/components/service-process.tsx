import Link from "next/link";
import {
  ClipboardCheck,
  HardHat,
  Headphones,
  Phone,
  ScrollText,
} from "lucide-react";
import type { LucideIcon } from "lucide-react";

const PROCESS_STEPS: {
  icon: LucideIcon;
  title: string;
  description: string;
}[] = [
  {
    icon: Phone,
    title: "Contato",
    description: "Você nos conta sua necessidade e tiramos suas dúvidas.",
  },
  {
    icon: ScrollText,
    title: "Proposta",
    description: "Preparamos um orçamento detalhado para o seu projeto.",
  },
  {
    icon: Headphones,
    title: "Consultoria",
    description: "Acompanhamos cada etapa e encontramos a melhor solução.",
  },
  {
    icon: ClipboardCheck,
    title: "Visita técnica",
    description: "Avaliamos o local e definimos os detalhes da instalação.",
  },
  {
    icon: HardHat,
    title: "Instalação",
    description: "Nossa equipe instala e configura tudo com cuidado.",
  },
];

export function ServiceProcess() {
  return (
    <section id="orcamento" className="bg-light-gray px-6 py-12 sm:py-16">
      <div className="mx-auto max-w-6xl">
        <p className="mb-2 text-xs font-semibold uppercase tracking-[0.2em] text-green">
          Processo
        </p>
        <h2 className="text-2xl font-bold text-black sm:text-3xl">
          Como funciona o atendimento
        </h2>

        <ol className="mt-8 grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-5">
          {PROCESS_STEPS.map(({ icon: Icon, title, description }, index) => (
            <li
              key={title}
              className="rounded-xl border border-black/5 bg-white p-4 shadow-sm"
            >
              <div className="mb-3 flex items-center gap-2 text-green">
                <Icon aria-hidden="true" size={22} strokeWidth={1.8} />
                <span className="text-xs font-semibold text-gray">
                  0{index + 1}
                </span>
              </div>
              <h3 className="text-sm font-semibold text-black">{title}</h3>
              <p className="mt-1.5 text-xs leading-relaxed text-gray">
                {description}
              </p>
            </li>
          ))}
        </ol>

        <div className="mt-8 flex justify-center">
          <Link
            href="/#orcamento"
            className="rounded-lg bg-green px-6 py-3 text-sm font-semibold text-white transition hover:brightness-95 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-green"
          >
            Solicitar orçamento
          </Link>
        </div>
      </div>
    </section>
  );
}
