import {
  Home as HomeIcon,
  Building2,
  Landmark,
  Truck,
  Camera,
  Bell,
  Cpu,
  Key,
  Wrench,
  Award,
  Sparkles,
  PlaySquare,
  Bot,
} from "lucide-react";
import { Header } from "./components/header";
import { Hero } from "./components/hero";
import { InfoCard } from "./components/info-card";
import { Footer } from "./components/footer";

const AUDIENCIAS = [
  {
    icon: HomeIcon,
    title: "Residências",
    description:
      "Proteção completa para sua família com sistemas discretos e eficientes.",
  },
  {
    icon: Building2,
    title: "Empresas",
    description:
      "Monitoramento e controle para garantir a continuidade do seu negócio.",
  },
  {
    icon: Landmark,
    title: "Instituições",
    description:
      "Portarias inteligentes, controle de acesso e monitoramento 24h.",
  },
  {
    icon: Truck,
    title: "Transportadoras",
    description:
      "Sistemas robustos para grandes áreas, perímetros e ativos críticos.",
  },
];

const SERVICOS = [
  {
    icon: Camera,
    title: "Câmeras de segurança",
    description:
      "Monitoramento em alta definição, com acesso remoto pelo celular.",
    link: { label: "Saiba mais", href: "#" },
  },
  {
    icon: Bell,
    title: "Alarmes",
    description:
      "Sistemas inteligentes com sensores, sirenes e notificação imediata.",
    link: { label: "Saiba mais", href: "#" },
  },
  {
    icon: Cpu,
    title: "Automação com IA",
    description:
      "Detecção inteligente, alertas em tempo real e integrações smart.",
    link: { label: "Saiba mais", href: "#" },
  },
  {
    icon: Key,
    title: "Controle de acesso",
    description:
      "Fechaduras, catracas e leitores biométricos para entradas seguras.",
    link: { label: "Saiba mais", href: "#" },
  },
  {
    icon: Wrench,
    title: "Manutenção",
    description: "Suporte preventivo e corretivo com atendimento ágil.",
    link: { label: "Saiba mais", href: "#" },
  },
];

const DIFERENCIAIS = [
  { icon: Award, title: "Suporte técnico especializado" },
  { icon: Sparkles, title: "Soluções personalizadas" },
  { icon: PlaySquare, title: "Automação residencial e corporativa" },
  { icon: Bot, title: "Soluções com inteligência artificial" },
];

export default function Home() {
  return (
    <main className="flex flex-col">
      <Header />

      <Hero
        eyebrow="Segurança eletrônica de ponta"
        title={
          <>
            Soluções completas em segurança para sua{" "}
            <span className="text-green">casa</span> e sua{" "}
            <span className="text-green">empresa</span>.
          </>
        }
        description="Instalação profissional de câmeras, alarmes, controle de acesso e automações inteligentes com IA. Proteção total, suporte sempre."
        primaryCta={{ label: "Solicitar orçamento", href: "#orcamento" }}
        secondaryCta={{ label: "Ver serviços", href: "#servicos" }}
      />

      <section className="px-6 py-20">
        <div className="max-w-6xl mx-auto">
          <p className="text-sm font-semibold tracking-widest text-green uppercase mb-3">
            Para todos os perfis
          </p>
          <h2 className="text-3xl md:text-4xl font-bold text-black mb-3">
            Quem atendemos
          </h2>
          <p className="text-gray max-w-xl mb-10">
            Projetos personalizados para cada tipo de cliente, com a tecnologia
            certa para cada necessidade.
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {AUDIENCIAS.map((item) => (
              <InfoCard
                key={item.title}
                icon={item.icon}
                title={item.title}
                description={item.description}
              />
            ))}
          </div>
        </div>
      </section>

      <section id="servicos" className="bg-light-gray px-6 py-20">
        <div className="max-w-6xl mx-auto">
          <p className="text-sm font-semibold tracking-widest text-green uppercase mb-3">
            Nossos serviços
          </p>
          <h2 className="text-3xl md:text-4xl font-bold text-black mb-10">
            Tecnologia que protege 24 horas por dia
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {SERVICOS.map((item) => (
              <InfoCard
                key={item.title}
                icon={item.icon}
                title={item.title}
                description={item.description}
                link={item.link}
              />
            ))}
          </div>
        </div>
      </section>

      <section className="px-6 py-20">
        <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-[1fr_1.5fr] gap-10 items-center">
          <div>
            <p className="text-sm font-semibold tracking-widest text-green uppercase mb-3">
              Por que nos escolher
            </p>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-black">
              Diferenciais da TechPro
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {DIFERENCIAIS.map((item) => (
              <InfoCard
                key={item.title}
                icon={item.icon}
                title={item.title}
                description=""
                variant="horizontal"
              />
            ))}
          </div>
        </div>
      </section>

      <section
        id="orcamento"
        className="bg-background-dark px-6 pt-16 pb-0 overflow-hidden"
      >
        <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 items-center gap-8">
          <div>
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
              Pronto para proteger o que mais importa?
            </h2>
            <p className="text-white/70 mb-6">
              Solicite um orçamento gratuito. Resposta em até 1 hora útil.
            </p>
            <button className="rounded-lg bg-green px-6 py-3 font-semibold text-black transition hover:brightness-95 cursor-pointer">
              Faça seu orçamento
            </button>
          </div>

          {/* Imagem do mascote */}
          <div className="hidden md:flex items-end justify-center h-64">
            <div className="hidden w-40 h-40 rounded-full bg-white/5 border border-white/10" />
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
