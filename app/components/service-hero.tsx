import { SecurityPattern } from "../resources/security-pattern";

export function ServiceHero() {
  return (
    <section className="relative isolate overflow-hidden bg-dark-blue px-6 py-16 md:py-20">
      <div className="absolute inset-0 -z-10 bg-gradient-to-r from-dark-blue via-dark-blue/95 to-blue/70" />
      <SecurityPattern color="text-white/[0.035]" />

      <div className="relative mx-auto max-w-6xl">
        <p className="mb-4 text-xs font-semibold uppercase tracking-[0.24em] text-green">
          Serviços
        </p>
        <h1 className="max-w-3xl text-3xl font-bold leading-tight text-white sm:text-4xl md:text-5xl">
          Soluções completas em
          <br className="hidden sm:block" /> segurança eletrônica
        </h1>
        <p className="mt-5 max-w-2xl text-sm leading-relaxed text-white/65 sm:text-base">
          Projetamos, instalamos e damos suporte a sistemas modernos para
          proteger pessoas, patrimônio e operações.
        </p>
      </div>
    </section>
  );
}
