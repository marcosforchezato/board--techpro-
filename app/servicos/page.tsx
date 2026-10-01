import type { Metadata } from "next";
import {
  AlarmClock,
  Camera,
  Cpu,
  KeyRound,
  Wrench,
} from "lucide-react";
import { Footer } from "../components/footer";
import { Header } from "../components/header";
import { ServiceHero } from "../components/service-hero";
import { ServiceList, type ServiceItem } from "../components/service-list";
import { ServiceProcess } from "../components/service-process";

export const metadata: Metadata = {
  title: "Serviços | TechPro",
  description:
    "Conheça as soluções TechPro em manutenção, alarmes, automação com IA, controle de acesso e câmeras de segurança.",
};

const SERVICES: ServiceItem[] = [
  {
    icon: Wrench,
    title: "Manutenção e suporte",
    description:
      "Mantenha seus sistemas funcionando com suporte técnico especializado e atendimento ágil.",
    benefits: [
      "Atendimento rápido e especializado",
      "Manutenção preventiva e corretiva",
      "Equipe técnica qualificada",
      "Mais vida útil para seus equipamentos",
    ],
    applications: [
      "Sistemas de segurança instalados",
      "Câmeras de monitoramento",
      "Alarmes e sensores",
      "Controle de acesso",
    ],
  },
  {
    icon: AlarmClock,
    title: "Sistemas de alarme",
    description:
      "Proteção inteligente com sensores e alertas para agir rápido sempre que necessário.",
    benefits: [
      "Monitoramento de áreas e acessos",
      "Sensores de presença e abertura",
      "Notificações em tempo real",
      "Proteção contra invasões",
    ],
    applications: [
      "Casas, empresas e condomínios",
      "Ambientes internos e externos",
      "Perímetros e áreas restritas",
      "Integração com monitoramento",
    ],
  },
  {
    icon: Cpu,
    title: "Automações com IA",
    description:
      "Tecnologia inteligente que identifica situações importantes e simplifica sua rotina.",
    benefits: [
      "Detecção inteligente de eventos",
      "Alertas relevantes em tempo real",
      "Menos alarmes falsos",
      "Integração entre dispositivos",
    ],
    applications: [
      "Análise de vídeo e imagens",
      "Rotinas automatizadas",
      "Monitoramento proativo",
      "Residências e empresas",
    ],
  },
  {
    icon: KeyRound,
    title: "Controle de acesso",
    description:
      "Gerencie entradas e saídas com praticidade, segurança e diferentes níveis de acesso.",
    benefits: [
      "Acesso por senha ou biometria",
      "Gestão de usuários e permissões",
      "Registro de acessos",
      "Mais controle para sua equipe",
    ],
    applications: [
      "Portas e portões eletrônicos",
      "Condomínios e empresas",
      "Áreas de acesso restrito",
      "Leitores e fechaduras digitais",
    ],
  },
  {
    icon: Camera,
    title: "Câmeras de segurança",
    description:
      "Acompanhe seus espaços em alta definição, dentro ou fora de casa, de onde estiver.",
    benefits: [
      "Imagens em alta resolução",
      "Acesso remoto pelo celular",
      "Gravação e consulta de imagens",
      "Mais tranquilidade 24 horas",
    ],
    applications: [
      "Ambientes internos e externos",
      "Residências e comércios",
      "Estacionamentos e perímetros",
      "Monitoramento local ou remoto",
    ],
  },
];

export default function ServicesPage() {
  return (
    <main className="flex flex-col">
      <Header />
      <ServiceHero />
      <ServiceList services={SERVICES} />
      <ServiceProcess />
      <Footer />
    </main>
  );
}
