import Link from "next/link";
import Image from "next/image";
import { features } from "../config/features";

const NAV_LINKS = [
  { label: "Home", href: "/" },
  { label: "Serviços", href: "#servicos" },
  { label: "Clientes", href: "#clientes" },
  { label: "Institucional", href: "#institucional" },
  { label: "Contato", href: "#contato" },
];

export function Header() {
  return (
    <header className="flex items-center justify-between px-6 py-4 bg-white border-b border-black/5">
      <Link href="/" className="flex items-center gap-2 shrink-0">
        <Image
          src="/logo-techpro.svg"
          alt="TechPro"
          width={140}
          height={40}
          priority
        />
      </Link>

      <nav className="hidden md:flex items-center gap-8">
        {NAV_LINKS.map((link) => (
          <Link
            key={link.label}
            href={link.href}
            className="font-semibold text-black hover:text-green transition"
          >
            {link.label}
          </Link>
        ))}
      </nav>

      <div className="flex items-center gap-3 shrink-0">
        {features.sistemaGestao && (
          <Link
            href="/login"
            className="rounded-lg px-3 py-2.5 font-semibold text-black transition hover:text-blue hover:bg-blue-100"
          >
            Entrar
          </Link>
        )}

        <Link
          href="#orcamento"
          className="rounded-lg bg-green px-5 py-2.5 font-semibold text-white transition hover:brightness-95"
        >
          Solicitar orçamento
        </Link>
      </div>
    </header>
  );
}
