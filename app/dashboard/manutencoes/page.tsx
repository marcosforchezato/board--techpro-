"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import {
  Building2,
  Check,
  Globe,
  Headphones,
  Mail,
  MapPin,
  MessageCircle,
  Phone,
  Send,
  Smartphone,
} from "lucide-react";

import { Button } from "@/app/components/button";
import { apiFetch } from "@/app/lib/api";
import {
  NIVEIS,
  PERMISSOES,
  permissoesParaTabela,
  tabelaParaPermissoes,
  type NivelPermissao,
} from "@/app/lib/permissoes";

type TipoManutencao = "perfil" | "canal";

type Registro = {
  id: string;
  descricao: string;
  permissoes?: string;
  icone?: string;
  cor?: string;
};

const ICONES = [
  { nome: "Globe", descricao: "Site", componente: Globe },
  { nome: "MessageCircle", descricao: "Mensagem", componente: MessageCircle },
  { nome: "Phone", descricao: "Telefone", componente: Phone },
  { nome: "MapPin", descricao: "Local", componente: MapPin },
  { nome: "Mail", descricao: "E-mail", componente: Mail },
  { nome: "Smartphone", descricao: "Celular", componente: Smartphone },
  { nome: "Headphones", descricao: "Atendimento", componente: Headphones },
  { nome: "Send", descricao: "Envio", componente: Send },
  { nome: "Building2", descricao: "Presencial", componente: Building2 },
];

function IconeCanal({
  nome,
  className,
}: {
  nome?: string;
  className?: string;
}) {
  const item = ICONES.find((icone) => icone.nome === nome) ?? ICONES[0];
  const Icone = item.componente;
  return <Icone className={className} />;
}

export default function ManutencaoPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [tipo, setTipo] = useState<TipoManutencao>(
    searchParams.get("tipo") === "canal" ? "canal" : "perfil"
  );
  const ehPerfil = tipo === "perfil";
  const titulo = ehPerfil ? "Perfis" : "Canais de comunicação";
  const descricao = ehPerfil
    ? "Gerencie os perfis e suas permissões de acesso."
    : "Gerencie os canais utilizados nos contatos e históricos.";

  const [registros, setRegistros] = useState<Registro[]>([]);
  const [registroSelecionado, setRegistroSelecionado] =
    useState<Registro | null>(null);
  const [id, setId] = useState("");
  const [descricaoInput, setDescricaoInput] = useState("");
  const [icone, setIcone] = useState("Globe");
  const [cor, setCor] = useState("#0F8BFF");
  const [permissoes, setPermissoes] = useState<Record<string, NivelPermissao>>(
    permissoesParaTabela()
  );
  const [nivelAcesso, setNivelAcesso] = useState<NivelPermissao>(0);
  const [carregando, setCarregando] = useState(true);
  const [salvando, setSalvando] = useState(false);
  const [excluindo, setExcluindo] = useState(false);
  const [erro, setErro] = useState("");
  const [sucesso, setSucesso] = useState("");
  const carregandoTipoRef = useRef<TipoManutencao | null>(null);

  const editando = registroSelecionado !== null;
  const podeAlterar = nivelAcesso === 2;
  const tituloFormulario = useMemo(
    () =>
      editando
        ? `Editar ${ehPerfil ? "perfil" : "canal"}`
        : `Novo ${ehPerfil ? "perfil" : "canal"}`,
    [editando, ehPerfil]
  );

  useEffect(() => {
    if (carregandoTipoRef.current === tipo) {
      return;
    }

    carregandoTipoRef.current = tipo;

    let ativo = true;

    async function inicializar() {
      setCarregando(true);
      setErro("");
      setSucesso("");
      setRegistroSelecionado(null);
      setId("");
      setDescricaoInput("");
      setIcone("Globe");
      setCor("#0F8BFF");
      setPermissoes(permissoesParaTabela());
      setNivelAcesso(0);

      try {
        const response = await apiFetch(`/api/manutencoes?tipo=${tipo}`, {
          cache: "no-store",
        });

        const data = await response.json().catch(() => ({}));

        if (!ativo) return;

        if (response.status === 401) {
          router.replace("/login");
          return;
        }

        if (response.status === 403) {
          router.replace("/dashboard");
          return;
        }

        if (!response.ok) {
          throw new Error(data.message ?? "Erro ao carregar registros.");
        }

        setNivelAcesso((data.nivel ?? 0) as NivelPermissao);
        setRegistros(data.registros ?? []);
      } catch (error) {
        if (ativo) {
          setErro(
            error instanceof Error
              ? error.message
              : "Erro ao carregar registros."
          );
        }
      } finally {
        if (ativo) {
          setCarregando(false);
        }

        if (carregandoTipoRef.current === tipo) {
          carregandoTipoRef.current = null;
        }
      }
    }

    inicializar();

    return () => {
      ativo = false;
    };
  }, [router, tipo]);

  function limparFormulario(mensagem = "") {
    setRegistroSelecionado(null);
    setId("");
    setDescricaoInput("");
    setIcone("Globe");
    setCor("#0F8BFF");
    setPermissoes(permissoesParaTabela());
    setErro("");
    setSucesso(mensagem);
  }

  function selecionarRegistro(registro: Registro) {
    setRegistroSelecionado(registro);
    setId(registro.id);
    setDescricaoInput(registro.descricao);
    setIcone(registro.icone ?? "Globe");
    setCor(registro.cor ?? "#0F8BFF");
    setPermissoes(permissoesParaTabela(registro.permissoes));
    setErro("");
    setSucesso("");
  }

  function alterarPermissao(sigla: string, valor: NivelPermissao) {
    setPermissoes((atual) => ({ ...atual, [sigla]: valor }));
  }

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    if (!podeAlterar || salvando || excluindo) return;

    setErro("");
    setSucesso("");

    const idNormalizado = id.trim().toUpperCase();
    const descricaoNormalizada = descricaoInput.trim();

    if (!idNormalizado) {
      setErro("Informe o código.");
      return;
    }

    if (!descricaoNormalizada) {
      setErro("Informe a descrição.");
      return;
    }

    if (idNormalizado.length > 2) {
      setErro("O código deve possuir no máximo 2 caracteres.");
      return;
    }

    if (!ehPerfil && !icone) {
      setErro("Selecione um ícone.");
      return;
    }

    if (!ehPerfil && !/^#[0-9A-Fa-f]{6}$/.test(cor)) {
      setErro("Informe uma cor válida.");
      return;
    }

    setSalvando(true);

    try {
      const response = await apiFetch("/api/manutencoes", {
        method: editando ? "PUT" : "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          tipo,
          id: idNormalizado,
          descricao: descricaoNormalizada,
          permissoes: ehPerfil ? tabelaParaPermissoes(permissoes) : undefined,
          icone: ehPerfil ? undefined : icone,
          cor: ehPerfil ? undefined : cor,
          idOriginal: registroSelecionado?.id,
        }),
      });

      const data = await response.json().catch(() => ({}));

      if (!response.ok) {
        throw new Error(data.message ?? "Erro ao salvar registro.");
      }

      const registro = data.registro as Registro;

      setRegistros((atuais) => {
        const filtrados = atuais.filter(
          (item) =>
            item.id !== registroSelecionado?.id && item.id !== registro.id
        );

        return [...filtrados, registro].sort((a, b) =>
          a.descricao.localeCompare(b.descricao)
        );
      });

      if (editando) {
        setRegistroSelecionado(registro);
        setId(registro.id);
        setDescricaoInput(registro.descricao);
        setIcone(registro.icone ?? "Globe");
        setCor(registro.cor ?? "#0F8BFF");
        setPermissoes(permissoesParaTabela(registro.permissoes));
        setSucesso("Registro atualizado com sucesso.");
      } else {
        limparFormulario("Registro cadastrado com sucesso.");
      }
    } catch (error) {
      setErro(
        error instanceof Error ? error.message : "Erro ao salvar registro."
      );
    } finally {
      setSalvando(false);
    }
  }

  async function handleExcluir() {
    if (!registroSelecionado || !podeAlterar || salvando || excluindo) return;

    if (
      !window.confirm(
        `Deseja realmente excluir "${registroSelecionado.descricao}"?`
      )
    ) {
      return;
    }

    setErro("");
    setSucesso("");
    setExcluindo(true);

    try {
      const response = await apiFetch(
        `/api/manutencoes?tipo=${tipo}&id=${encodeURIComponent(
          registroSelecionado.id
        )}`,
        { method: "DELETE" }
      );

      const data = await response.json().catch(() => ({}));

      if (!response.ok) {
        throw new Error(data.message ?? "Erro ao excluir registro.");
      }

      setRegistros((atuais) =>
        atuais.filter((item) => item.id !== registroSelecionado.id)
      );

      limparFormulario("Registro excluído com sucesso.");
    } catch (error) {
      setErro(
        error instanceof Error ? error.message : "Erro ao excluir registro."
      );
    } finally {
      setExcluindo(false);
    }
  }

  function trocarTipo(novoTipo: TipoManutencao) {
    if (novoTipo === tipo) return;

    setTipo(novoTipo);
    router.replace(`/dashboard/manutencoes?tipo=${novoTipo}`);
  }

  return (
    <main className="min-h-full min-w-0 overflow-x-hidden bg-background-dark px-4 py-5 sm:px-5 lg:px-6">
      <div className="w-full min-w-0">
        <div className="mb-5 flex shrink-0 flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
          <div>
            <p className="mb-1 text-sm text-cyan">Manutenção</p>
            <h1 className="text-2xl font-semibold text-white">{titulo}</h1>
            <p className="mt-1 text-sm text-gray">{descricao}</p>
          </div>

          <div className="flex rounded-lg border border-white/10 bg-white/[0.03] p-1">
            <button
              type="button"
              onClick={() => trocarTipo("perfil")}
              className={`cursor-pointer rounded-md px-4 py-2 text-sm transition ${
                ehPerfil
                  ? "bg-cyan text-background-dark"
                  : "text-white/70 hover:bg-white/5 hover:text-white"
              }`}
            >
              Perfis
            </button>

            <button
              type="button"
              onClick={() => trocarTipo("canal")}
              className={`cursor-pointer rounded-md px-4 py-2 text-sm transition ${
                !ehPerfil
                  ? "bg-cyan text-background-dark"
                  : "text-white/70 hover:bg-white/5 hover:text-white"
              }`}
            >
              Canais de comunicação
            </button>
          </div>
        </div>

        <div className="grid min-w-0 gap-6 lg:grid-cols-[320px_minmax(0,1fr)]">
          <section className="min-w-0 rounded-xl border border-white/10 bg-white/[0.03]">
            <div className="flex items-center justify-between border-b border-white/10 px-5 py-4">
              <div>
                <h2 className="font-medium text-white">{titulo}</h2>
                <p className="text-xs text-gray">
                  {registros.length} registro(s)
                </p>
              </div>

              {podeAlterar && (
                <button
                  type="button"
                  onClick={() => limparFormulario()}
                  className="cursor-pointer text-sm text-cyan hover:underline"
                >
                  Novo
                </button>
              )}
            </div>

            <div className="min-h-0 flex-1 overflow-y-auto">
              {carregando ? (
                <div className="px-5 py-8 text-center text-sm text-gray">
                  Carregando...
                </div>
              ) : registros.length === 0 ? (
                <div className="px-5 py-8 text-center text-sm text-gray">
                  Nenhum registro encontrado.
                </div>
              ) : (
                registros.map((registro) => (
                  <button
                    key={registro.id}
                    type="button"
                    onClick={() => selecionarRegistro(registro)}
                    className={`w-full cursor-pointer border-b border-white/5 px-5 py-4 text-left transition last:border-0 hover:bg-white/[0.04] ${
                      registroSelecionado?.id === registro.id
                        ? "bg-white/[0.06]"
                        : ""
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      {ehPerfil ? (
                        <span className="flex h-8 w-12 shrink-0 items-center justify-center rounded-md bg-cyan/10 px-2 text-xs font-semibold text-cyan">
                          {registro.id}
                        </span>
                      ) : (
                        <span
                          className="flex h-8 w-12 shrink-0 items-center justify-center rounded-md"
                          style={{
                            backgroundColor: `${registro.cor ?? "#0F8BFF"}22`,
                            color: registro.cor ?? "#0F8BFF",
                          }}
                        >
                          <IconeCanal
                            nome={registro.icone}
                            className="h-4 w-4"
                          />
                        </span>
                      )}

                      <span className="truncate text-sm text-white">
                        {registro.descricao}
                      </span>
                    </div>
                  </button>
                ))
              )}
            </div>
          </section>

          <section className="min-w-0 rounded-xl border border-white/10 bg-white/[0.03]">
            <form
              onSubmit={handleSubmit}
              className="flex min-h-0 flex-1 flex-col"
            >
              <div className="flex flex-col gap-4 border-b border-white/10 px-6 py-5 xl:flex-row xl:items-center xl:justify-between">
                <div>
                  <h2 className="font-medium text-white">{tituloFormulario}</h2>
                  <p className="mt-1 text-sm text-gray">
                    {podeAlterar
                      ? editando
                        ? "Altere os dados do registro selecionado."
                        : "Preencha os dados para cadastrar um novo registro."
                      : "Você possui apenas permissão de consulta."}
                  </p>
                </div>

                {podeAlterar && (
                  <div className="flex flex-wrap gap-2">
                    {editando && (
                      <button
                        type="button"
                        onClick={handleExcluir}
                        disabled={salvando || excluindo}
                        className="cursor-pointer rounded-lg border border-red-500/20 px-4 py-2.5 text-sm text-red-400 transition hover:bg-red-500/10 disabled:cursor-not-allowed disabled:opacity-50"
                      >
                        {excluindo ? "Excluindo..." : "Excluir"}
                      </button>
                    )}

                    {editando && (
                      <button
                        type="button"
                        onClick={() => limparFormulario()}
                        disabled={salvando || excluindo}
                        className="cursor-pointer rounded-lg border border-white/10 px-4 py-2.5 text-sm text-white/70 transition hover:bg-white/5 hover:text-white disabled:cursor-not-allowed disabled:opacity-50"
                      >
                        Novo
                      </button>
                    )}

                    <Button
                      type="submit"
                      loading={salvando}
                      disabled={salvando || excluindo}
                      className="px-4 py-2.5"
                    >
                      {salvando
                        ? "Salvando..."
                        : editando
                        ? "Salvar alterações"
                        : "Cadastrar"}
                    </Button>
                  </div>
                )}
              </div>

              <div className="min-h-0 flex-1 space-y-5 overflow-hidden p-6">
                <div
                  className={`grid gap-5 ${
                    ehPerfil
                      ? "sm:grid-cols-[120px_1fr]"
                      : "sm:grid-cols-[120px_1fr_180px]"
                  }`}
                >
                  <div className="flex flex-col gap-1.5">
                    <label htmlFor="id" className="text-sm text-white/80">
                      Código
                    </label>

                    <input
                      id="id"
                      value={id}
                      maxLength={2}
                      disabled={
                        editando || !podeAlterar || salvando || excluindo
                      }
                      onChange={(event) =>
                        setId(event.target.value.toUpperCase())
                      }
                      className="rounded-lg border border-white/10 bg-white/5 px-4 py-2.5 text-white outline-none transition focus:border-transparent focus:ring-2 focus:ring-cyan disabled:cursor-not-allowed disabled:opacity-50"
                      required
                    />
                  </div>

                  <div className="flex flex-col gap-1.5">
                    <label
                      htmlFor="descricao"
                      className="text-sm text-white/80"
                    >
                      Descrição
                    </label>

                    <input
                      id="descricao"
                      value={descricaoInput}
                      maxLength={50}
                      disabled={!podeAlterar || salvando || excluindo}
                      onChange={(event) =>
                        setDescricaoInput(event.target.value)
                      }
                      className="rounded-lg border border-white/10 bg-white/5 px-4 py-2.5 text-white outline-none transition focus:border-transparent focus:ring-2 focus:ring-cyan disabled:cursor-not-allowed disabled:opacity-50"
                      required
                    />
                  </div>

                  {!ehPerfil && (
                    <div className="flex flex-col gap-1.5">
                      <label htmlFor="cor" className="text-sm text-white/80">
                        Cor
                      </label>

                      <div className="flex h-[42px] items-center gap-3 rounded-lg border border-white/10 bg-white/5 px-3">
                        <input
                          id="cor"
                          type="color"
                          value={cor}
                          disabled={!podeAlterar || salvando || excluindo}
                          onChange={(event) =>
                            setCor(event.target.value.toUpperCase())
                          }
                          className="h-7 w-9 cursor-pointer border-0 bg-transparent p-0 disabled:cursor-not-allowed"
                        />

                        <span className="text-xs text-gray">{cor}</span>
                      </div>
                    </div>
                  )}
                </div>

                {!ehPerfil && (
                  <div className="flex flex-col gap-1.5">
                    <label htmlFor="icone" className="text-sm text-white/80">
                      Ícone
                    </label>

                    <div className="grid grid-cols-3 gap-2 sm:grid-cols-5 lg:grid-cols-9">
                      {ICONES.map((item) => {
                        const Icone = item.componente;
                        const selecionado = icone === item.nome;

                        return (
                          <button
                            key={item.nome}
                            type="button"
                            onClick={() => setIcone(item.nome)}
                            disabled={!podeAlterar || salvando || excluindo}
                            title={item.descricao}
                            className={`flex h-12 cursor-pointer items-center justify-center rounded-lg border transition disabled:cursor-not-allowed disabled:opacity-50 ${
                              selecionado
                                ? "border-green bg-green/10 text-green"
                                : "border-white/10 bg-white/5 text-gray hover:bg-white/10 hover:text-white"
                            }`}
                          >
                            <Icone className="h-5 w-5" />
                          </button>
                        );
                      })}
                    </div>
                  </div>
                )}

                {ehPerfil && (
                  <div>
                    <div className="mb-3">
                      <h3 className="text-sm font-medium text-white">
                        Permissões de acesso
                      </h3>

                      <p className="mt-1 text-xs text-gray">
                        Selecione um nível de acesso para cada tela.
                      </p>
                    </div>

                    <div className="overflow-hidden rounded-lg border border-white/10">
                      <div className="permissions-scroll max-h-[min(300px,35vh)] overflow-y-auto">
                        <table className="w-full table-fixed">
                          <thead className="sticky top-0 z-10 bg-background-dark">
                            <tr className="border-b border-white/10">
                              <th className="w-[15%] px-3 py-3 text-left text-[11px] font-semibold text-gray">
                                Código
                              </th>
                              <th className="w-[35%] px-3 py-3 text-left text-[11px] font-semibold text-gray">
                                Tela
                              </th>
                              <th className="w-[16.66%] px-2 py-3 text-center text-[11px] font-semibold text-gray">
                                Sem acesso
                              </th>
                              <th className="w-[16.66%] px-2 py-3 text-center text-[11px] font-semibold text-gray">
                                Consulta
                              </th>
                              <th className="w-[16.66%] px-2 py-3 text-center text-[11px] font-semibold text-gray">
                                Acesso
                              </th>
                            </tr>
                          </thead>

                          <tbody>
                            {PERMISSOES.map((permissao) => (
                              <tr
                                key={permissao.sigla}
                                className="border-b border-white/5 last:border-0"
                              >
                                <td className="w-24 px-2 py-3">
                                  <span className="inline-flex h-6 w-12 items-center justify-center rounded bg-white/5 px-2 py-1 text-[10px] font-semibold text-cyan">
                                    {permissao.sigla}
                                  </span>
                                </td>

                                <td className="px-2 py-3 text-sm text-white/80">
                                  {permissao.descricao}
                                </td>

                                {NIVEIS.map((nivel) => {
                                  const marcado =
                                    permissoes[permissao.sigla] === nivel.valor;

                                  return (
                                    <td
                                      key={nivel.valor}
                                      className="px-3 py-3 text-center"
                                    >
                                      <label className="inline-flex cursor-pointer items-center justify-center">
                                        <input
                                          type="checkbox"
                                          checked={marcado}
                                          disabled={
                                            !podeAlterar ||
                                            salvando ||
                                            excluindo
                                          }
                                          onChange={() =>
                                            alterarPermissao(
                                              permissao.sigla,
                                              nivel.valor
                                            )
                                          }
                                          className="peer sr-only"
                                        />

                                        <span className="flex h-5 w-5 items-center justify-center rounded border border-white/20 bg-white/5 text-transparent transition peer-checked:border-green peer-checked:bg-green peer-checked:text-dark-blue peer-disabled:cursor-not-allowed peer-disabled:opacity-50">
                                          <Check
                                            className="h-3.5 w-3.5"
                                            strokeWidth={3}
                                          />
                                        </span>
                                      </label>
                                    </td>
                                  );
                                })}
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>
                    </div>
                  </div>
                )}

                {(erro || sucesso) && (
                  <div
                    className={`rounded-lg border px-4 py-3 text-sm ${
                      erro
                        ? "border-red-500/20 bg-red-500/10 text-red-400"
                        : "border-green-500/20 bg-green-500/10 text-green-400"
                    }`}
                  >
                    {erro || sucesso}
                  </div>
                )}
              </div>
            </form>
          </section>
        </div>
      </div>
    </main>
  );
}
