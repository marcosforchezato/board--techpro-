import Link from "next/link";
import type { LucideIcon } from "lucide-react";
import { Check } from "lucide-react";

export interface ServiceItem {
  icon: LucideIcon;
  title: string;
  description: string;
  benefits: string[];
  applications: string[];
}

interface ServiceListProps {
  services: ServiceItem[];
}

function FeatureCard({
  title,
  items,
}: {
  title: string;
  items: string[];
}) {
  return (
    <div className="rounded-xl border border-black/10 bg-white p-4 shadow-sm sm:p-5">
      <h3 className="mb-3 text-sm font-semibold text-black">{title}</h3>
      <ul className="space-y-2">
        {items.map((item) => (
          <li
            key={item}
            className="flex items-start gap-2 text-xs leading-relaxed text-dark-gray"
          >
            <Check
              aria-hidden="true"
              className="mt-0.5 shrink-0 text-green"
              size={13}
              strokeWidth={2.5}
            />
            <span>{item}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}

export function ServiceList({ services }: ServiceListProps) {
  return (
    <section aria-label="Nossos serviços" className="px-6 py-12 sm:py-16">
      <div className="mx-auto max-w-6xl divide-y divide-black/5">
        {services.map((service, index) => {
          const Icon = service.icon;

          return (
            <article
              key={service.title}
              className="grid grid-cols-1 gap-6 py-7 sm:py-9 md:grid-cols-[0.9fr_1.5fr] md:items-center md:gap-10"
            >
              <div>
                <div className="mb-3 flex h-11 w-11 items-center justify-center rounded-xl bg-green text-white">
                  <Icon aria-hidden="true" size={23} strokeWidth={2} />
                </div>
                <h2 className="text-lg font-semibold text-black">
                  {service.title}
                </h2>
                <p className="mt-2 max-w-sm text-sm leading-relaxed text-gray">
                  {service.description}
                </p>
              </div>

              <div>
                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                  <FeatureCard title="Benefícios" items={service.benefits} />
                  <FeatureCard
                    title="Aplicações"
                    items={service.applications}
                  />
                </div>
                {index === 0 && (
                  <div className="mt-5 flex justify-center sm:justify-end">
                    <Link
                      href="#orcamento"
                      className="rounded-lg bg-gradient-to-r from-blue to-cyan px-6 py-3 text-sm font-semibold text-white shadow-sm transition hover:brightness-105 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-cyan"
                    >
                      Solicitar manutenção
                    </Link>
                  </div>
                )}
              </div>
            </article>
          );
        })}
      </div>
    </section>
  );
}
