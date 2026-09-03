import { Mail } from "lucide-react";

export function Newsletter() {
  return (
    <div className="flex flex-col sm:flex-row items-start sm:items-end gap-3 py-10 border-b border-white/10">
      <div className="bg-green rounded-lg w-11 h-11 flex items-center justify-center shrink-0 sm:self-end">
        <Mail className="text-white" size={26} strokeWidth={2} />
      </div>

      <div className="flex flex-col gap-3 flex-1 w-full">
        <h3 className="text-xl font-semibold text-white">
          Receba nossas ofertas e novidades
        </h3>
        <form className="flex flex-col sm:flex-row gap-3">
          <input
            type="text"
            name="name"
            placeholder="Seu nome"
            className="rounded-lg bg-white px-4 py-2.5 text-black placeholder:text-gray flex-1"
          />
          <input
            type="email"
            name="email"
            placeholder="Seu e-mail"
            className="rounded-lg bg-white px-4 py-2.5 text-black placeholder:text-gray flex-1"
          />
          <button
            type="submit"
            className="rounded-lg bg-cyan px-6 py-2.5 font-semibold text-white transition hover:brightness-95 cursor-pointer whitespace-nowrap"
          >
            Cadastrar
          </button>
        </form>
      </div>
    </div>
  );
}
