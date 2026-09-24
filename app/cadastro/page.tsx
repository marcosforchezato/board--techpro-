"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Button } from "@/app/components/button";
import { PasswordField } from "@/app/components/password-field";

export default function CadastroPage() {
  const [submitting, setSubmitting] = useState(false);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setSubmitting(true);

    // TODO: substituir pela chamada real de cadastro (POST /api/usuarios)
    await new Promise((resolve) => setTimeout(resolve, 1500));

    setSubmitting(false);
  }

  return (
    <div className="w-full max-w-md">
      <div className="rounded-2xl border border-white/10 bg-white/[0.03] backdrop-blur-sm p-8 shadow-xl">
        <div className="flex flex-col items-center mb-8">
          <Image
            src="/logo-techpro.svg"
            alt="TechPro"
            width={140}
            height={48}
            priority
          />
        </div>

        <h1 className="text-xl font-semibold text-white mb-1 text-center">
          Criar conta
        </h1>
        <p className="text-sm text-gray mb-6 text-center">
          Preencha os dados para acessar o sistema
        </p>

        <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
          <div className="flex flex-col gap-1.5">
            <label htmlFor="nome" className="text-sm text-white/80">
              Nome
            </label>
            <input
              id="nome"
              name="nome"
              type="text"
              autoComplete="name"
              required
              maxLength={150}
              className="rounded-lg bg-white/5 border border-white/10 px-4 py-2.5 text-white placeholder:text-gray focus:outline-none focus:ring-2 focus:ring-cyan focus:border-transparent transition"
              placeholder="Digite seu nome completo"
            />
          </div>

          <input type="hidden" name="perfilId" value="V" />
          <div className="flex flex-col gap-1.5">
            <label htmlFor="email" className="text-sm text-white/80">
              E-mail
            </label>
            <input
              id="email"
              name="email"
              type="email"
              autoComplete="email"
              maxLength={150}
              className="rounded-lg bg-white/5 border border-white/10 px-4 py-2.5 text-white placeholder:text-gray focus:outline-none focus:ring-2 focus:ring-cyan focus:border-transparent transition"
              placeholder="seu@email.com"
            />
          </div>

          <div className="flex flex-col gap-1.5">
            <label htmlFor="telefone" className="text-sm text-white/80">
              Telefone
            </label>
            <input
              id="telefone"
              name="telefone"
              type="tel"
              autoComplete="tel"
              maxLength={30}
              className="rounded-lg bg-white/5 border border-white/10 px-4 py-2.5 text-white placeholder:text-gray focus:outline-none focus:ring-2 focus:ring-cyan focus:border-transparent transition"
              placeholder="(00) 00000-0000"
            />
          </div>

          <div className="flex flex-col gap-1.5">
            <label htmlFor="senha" className="text-sm text-white/80">
              Senha
            </label>
            <PasswordField
              id="senha"
              name="senha"
              autoComplete="new-password"
              required
              placeholder="••••••••"
            />
          </div>

          <div className="flex flex-col gap-1.5">
            <label htmlFor="confirmarSenha" className="text-sm text-white/80">
              Confirmar senha
            </label>
            <PasswordField
              id="confirmarSenha"
              name="confirmarSenha"
              autoComplete="new-password"
              required
              placeholder="••••••••"
            />
          </div>

          <Button type="submit" loading={submitting} className="mt-2">
            {submitting ? "Criando conta..." : "Criar conta"}
          </Button>

          <Link
            href="/login"
            className="inline-flex items-center justify-center rounded-lg px-4 py-2.5 font-medium bg-white/5 text-white border border-white/10 hover:bg-white/10 transition cursor-pointer"
          >
            Já tenho conta
          </Link>
        </form>
      </div>

      <p className="text-center text-xs text-gray mt-6">
        TechPro - Sistema de gestão
      </p>
    </div>
  );
}
