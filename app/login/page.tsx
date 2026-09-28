"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { Checkbox } from "../components/checkbox";
import { Button } from "../components/button";
import { PasswordField } from "../components/password-field";

export default function LoginPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setError(null);
    setLoading(true);

    const formData = new FormData(e.currentTarget);
    const username = formData.get("username") as string;
    const password = formData.get("password") as string;
    const remember = formData.get("remember") === "on";

    try {
      const response = await fetch("/api/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password }),
      });

      if (!response.ok) {
        const data = await response.json().catch(() => ({}));
        throw new Error(data.message ?? "Usuário ou senha inválidos");
      }

      const { token } = await response.json();

      if (remember) {
        localStorage.setItem("token", token);
      } else {
        sessionStorage.setItem("token", token);
      }

      router.push("/dashboard");
    } catch (err) {
      setError(err instanceof Error ? err.message : "Erro ao fazer login");
    } finally {
      setLoading(false);
    }
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

          <p
            className={`text-sm text-red-400 text-center transition-opacity ${
              error ? "opacity-100" : "opacity-0"
            }`}
            aria-live="polite"
          >
            {error || "\u00A0"}
          </p>

          <Button type="submit" loading={loading} className="mt-12">
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
