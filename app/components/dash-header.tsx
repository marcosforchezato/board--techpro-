"use client";

import { Bell, ChevronDown, LogOut, Plus, Search, User } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";

export default function DashHeader() {
  const router = useRouter();
  const [aberto, setAberto] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  const [conta, setConta] = useState({
    nome: "",
    perfil: "",
  });

  useEffect(() => {
    const usuario =
      sessionStorage.getItem("usuario") ?? localStorage.getItem("usuario");

    if (usuario) {
      try {
        setConta(JSON.parse(usuario));
      } catch {
        sessionStorage.removeItem("usuario");
        localStorage.removeItem("usuario");
      }
    }

    if (usuario) {
      try {
        setConta(JSON.parse(usuario));
      } catch {
        sessionStorage.removeItem("usuario");
      }
    }
  }, []);

  useEffect(() => {
    const fechar = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setAberto(false);
      }
    };

    document.addEventListener("mousedown", fechar);
    return () => document.removeEventListener("mousedown", fechar);
  }, []);

  const sair = () => {
    if (typeof window !== "undefined") {
      window.localStorage.clear();
      window.sessionStorage.clear();
    }

    router.replace("/login");
  };

  const iniciais =
    conta.nome
      .split(" ")
      .filter(Boolean)
      .slice(0, 2)
      .map((parte) => parte[0])
      .join("")
      .toUpperCase() || "U";

  return (
    <header className="fixed left-0 right-0 top-0 z-30 h-[69px] border-b border-white/10 bg-[#07131b]/95 px-4 backdrop-blur-md lg:left-56 lg:px-6">
      <div className="flex h-full items-center gap-3">
        <div className="min-w-0">
          <h1 className="text-lg font-extrabold tracking-tight text-white">
            Visão geral
          </h1>
          <p className="mt-0.5 hidden text-[11px] text-gray sm:block">
            Setembro de 2026 · atualizado há 4 minutos
          </p>
        </div>

        <div className="ml-auto flex items-center gap-2.5">
          <div className="hidden h-9 w-52 items-center gap-2 rounded-lg border border-white/10 bg-white/5 px-2.5 md:flex">
            <Search className="shrink-0 text-gray" size={15} />
            <label htmlFor="busca" className="sr-only">
              Buscar cliente ou OS
            </label>
            <input
              id="busca"
              type="search"
              placeholder="Buscar cliente, OS…"
              className="min-w-0 flex-1 bg-transparent text-xs text-white placeholder:text-gray focus:outline-none"
            />
          </div>

          <button
            type="button"
            aria-label="Notificações"
            className="relative flex h-9 w-9 cursor-pointer items-center justify-center rounded-lg border border-white/10 bg-white/5 text-gray transition-colors hover:text-white"
          >
            <Bell size={16} />
            <span className="absolute right-2 top-2 h-1.5 w-1.5 rounded-full bg-amber-400" />
          </button>

          <button
            type="button"
            onClick={() => router.push("/orcamentos/novo")}
            className="flex h-9 cursor-pointer items-center gap-1.5 rounded-lg bg-green px-3 text-xs font-bold text-dark-blue transition-opacity hover:opacity-90"
          >
            <Plus size={14} strokeWidth={2.6} />
            <span className="hidden sm:inline">Novo orçamento</span>
          </button>

          <div ref={menuRef} className="relative">
            <button
              type="button"
              aria-expanded={aberto}
              aria-haspopup="menu"
              onClick={() => setAberto((valor) => !valor)}
              className="flex h-9 cursor-pointer items-center gap-2 rounded-lg border border-white/10 bg-white/5 px-2 transition-colors hover:bg-white/10"
            >
              <span className="flex h-7 w-7 items-center justify-center rounded-full bg-green/15 text-[10px] font-bold text-green">
                {iniciais}
              </span>
              <span className="hidden max-w-28 text-left sm:block">
                <span className="block truncate text-[11px] font-bold text-white">
                  {conta.nome}
                </span>
                <span className="block truncate text-[9px] text-gray">
                  {conta.perfil}
                </span>
              </span>
              <ChevronDown
                size={14}
                className={`text-gray transition-transform ${
                  aberto ? "rotate-180" : ""
                }`}
              />
            </button>

            {aberto && (
              <div
                role="menu"
                className="absolute right-0 top-11 w-64 overflow-hidden rounded-xl border border-white/10 bg-[#0b1a23] p-1.5 shadow-2xl"
              >
                <div className="border-b border-white/10 px-3 py-2.5">
                  <p className="truncate text-xs font-bold text-white">
                    {conta.nome}
                  </p>
                </div>

                <button
                  type="button"
                  role="menuitem"
                  onClick={() => setAberto(false)}
                  className="flex w-full cursor-pointer items-center gap-2 rounded-lg px-3 py-2.5 text-xs font-medium text-gray transition-colors hover:bg-white/5 hover:text-white"
                >
                  <User size={15} />
                  Minha conta
                </button>

                <button
                  type="button"
                  role="menuitem"
                  onClick={() => router.push("/configuracoes")}
                  className="flex w-full cursor-pointer items-center gap-2 rounded-lg px-3 py-2.5 text-xs font-medium text-gray transition-colors hover:bg-white/5 hover:text-white"
                >
                  <span className="text-sm">⚙</span>
                  Configurações
                </button>

                <button
                  type="button"
                  role="menuitem"
                  onClick={sair}
                  className="flex w-full cursor-pointer items-center gap-2 rounded-lg px-3 py-2.5 text-xs font-semibold text-red-300 transition-colors hover:bg-red-400/10"
                >
                  <LogOut size={15} />
                  Sair
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  );
}
