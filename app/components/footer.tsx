import { Newsletter } from "./newsletter";

const COLUNAS = [
  {
    heading: "Institucional",
    links: [
      { label: "Sobre a Techpro", href: "#" },
      { label: "Quem somos", href: "#" },
      { label: "História", href: "#" },
    ],
  },
  {
    heading: "Atendimento",
    links: [
      { label: "E-mail", href: "#" },
      { label: "+55 51 99394-8340", href: "#" },
      { label: "Segunda a sexta das 08:15 as 18:00", href: "#" },
      { label: "Sabado das 08:30 as 12:00", href: "#" },
    ],
  },
  {
    heading: "Politicas de uso",
    links: [
      { label: "Termos de uso", href: "#" },
      { label: "Politica de entrega", href: "#" },
      { label: "Politica de trocas e devoluções", href: "#" },
      { label: "Politicas de pagamento", href: "#" },
    ],
  },
  {
    heading: "Canais de comunicação",
    links: [
      { label: "Youtube - Welk Spilier | TechPro", href: "#" },
      { label: "Linkedin - Welk Spilier", href: "#" },
      { label: "Instagram - @techprors", href: "#" },
      {
        label: "Facebook - TechPro - Segurança Eletrônica e Automação",
        href: "#",
      },
    ],
  },
];

export function Footer() {
  return (
    <footer className="bg-background-dark px-6 pt-6 pb-12">
      <div className="max-w-6xl mx-auto">
        <Newsletter />

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 text-sm pt-10">
          {COLUNAS.map((column) => (
            <div key={column.heading}>
              <h4 className="text-white font-semibold mb-3">
                {column.heading}
              </h4>
              <ul className="flex flex-col gap-2 text-white/60">
                {column.links.map((link) => (
                  <li key={link.label}>
                    <a href={link.href} className="hover:text-white transition">
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </footer>
  );
}
