export type NivelPermissao = 0 | 1 | 2;

export const NIVEIS: {
  valor: NivelPermissao;
  descricao: string;
}[] = [
  { valor: 0, descricao: "Sem acesso" },
  { valor: 1, descricao: "Consulta" },
  { valor: 2, descricao: "Acesso total" },
];

export type Permissao = {
  sigla: string;
  descricao: string;
};

export const PERMISSOES: Permissao[] = [
  { sigla: "AGD", descricao: "Agendamento" },
  { sigla: "ORC", descricao: "Orçamento" },
  { sigla: "CLI", descricao: "Clientes" },
  { sigla: "SOL", descricao: "Solicitações" },
  { sigla: "OS", descricao: "Ordens de serviço" },
  { sigla: "VIS", descricao: "Visitas" },
  { sigla: "EQP", descricao: "Equipamentos" },
  { sigla: "GAR", descricao: "Garantias" },
  { sigla: "HIS", descricao: "Histórico" },
  { sigla: "USR", descricao: "Usuários" },
  { sigla: "PER", descricao: "Perfis" },
  { sigla: "CAN", descricao: "Canais de comunicação" },
];

export function lerPermissoes(permissoes: string) {
  const resultado: Record<string, NivelPermissao> = {};

  if (!permissoes || permissoes.trim() === "T") {
    return resultado;
  }

  permissoes.split(";").forEach((item) => {
    const [sigla, valor] = item.split("=");

    if (sigla && (valor === "0" || valor === "1" || valor === "2")) {
      resultado[sigla] = Number(valor) as NivelPermissao;
    }
  });

  return resultado;
}

export function obterNivelPermissao(
  permissoes: string,
  sigla: string
): NivelPermissao {
  if (permissoes.trim() === "T") {
    return 2;
  }

  return lerPermissoes(permissoes)[sigla] ?? 0;
}

export function temPermissao(
  permissoes: string,
  sigla: string,
  nivel: NivelPermissao = 1
) {
  return obterNivelPermissao(permissoes, sigla) >= nivel;
}

export function permissoesParaTabela(valor?: string) {
  const resultado: Record<string, NivelPermissao> = {};

  PERMISSOES.forEach((permissao) => {
    resultado[permissao.sigla] = 0;
  });

  if (valor?.trim() === "T") {
    PERMISSOES.forEach((permissao) => {
      resultado[permissao.sigla] = 2;
    });

    return resultado;
  }

  if (valor) {
    valor.split(";").forEach((item) => {
      const [sigla, nivel] = item.split("=");

      if (
        sigla &&
        resultado[sigla] !== undefined &&
        (nivel === "0" || nivel === "1" || nivel === "2")
      ) {
        resultado[sigla] = Number(nivel) as NivelPermissao;
      }
    });
  }

  return resultado;
}

export function tabelaParaPermissoes(permissoes: Record<string, NivelPermissao>) {
  const total = PERMISSOES.every(
    (permissao) => permissoes[permissao.sigla] === 2
  );

  if (total) {
    return "T";
  }

  return PERMISSOES.map(
    (permissao) => `${permissao.sigla}=${permissoes[permissao.sigla] ?? 0}`
  ).join(";");
}
