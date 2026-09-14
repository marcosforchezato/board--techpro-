"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Checkbox } from "../components/checkbox";
import { Button } from "../components/button";
import { PasswordField } from "../components/password-field";

export default function LoginPage() {
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setLoading(true);

    // TODO: substituir pela chamada real de autenticação
    await new Promise((resolve) => setTimeout(resolve, 1500));

    setLoading(false);
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
          Acessar sistema
        </h1>
        <p className="text-sm text-gray mb-6 text-center">
          Entre com suas credenciais para continuar
        </p>

        <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
          <div className="flex flex-col gap-1.5">
            <label htmlFor="username" className="text-sm text-white/80">
              Usuário
            </label>
            <input
              id="username"
              name="username"
              type="text"
              autoComplete="username"
              required
              className="rounded-lg bg-white/5 border border-white/10 px-4 py-2.5 text-white placeholder:text-gray focus:outline-none focus:ring-2 focus:ring-cyan focus:border-transparent transition"
              placeholder="Digite seu usuário"
            />
          </div>

          <div className="flex flex-col gap-1.5">
            <label htmlFor="password" className="text-sm text-white/80">
              Senha
            </label>
            <PasswordField
              id="password"
              name="password"
              autoComplete="current-password"
              required
              placeholder="Digite sua senha"
            />
          </div>

          <div className="flex items-center justify-between text-sm">
            <Checkbox id="remember" name="remember" label="Lembrar de mim" />

            <Link
              href="/login/recuperar-senha"
              className="text-cyan hover:underline"
            >
              Esqueci minha senha
            </Link>
          </div>

          <Button type="submit" loading={loading} className="mt-2">
            {loading ? "Entrando..." : "Entrar"}
          </Button>
        </form>
      </div>

      <p className="text-center text-xs text-gray mt-6">
        TechPro - Sistema de gestão
      </p>
    </div>
  );
}
