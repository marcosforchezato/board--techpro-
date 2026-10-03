import { NextRequest, NextResponse } from "next/server";
import { pool } from "@/app/lib/db";
import { verificarPermissao } from "@/app/lib/autorizacao";

type TipoManutencao = "perfil" | "canal";

function validarTipo(tipo: string | null): tipo is TipoManutencao {
  return tipo === "perfil" || tipo === "canal";
}

function normalizarId(valor: unknown) {
  return typeof valor === "string" ? valor.trim().toUpperCase() : "";
}

function normalizarTexto(valor: unknown) {
  return typeof valor === "string" ? valor.trim() : "";
}

function normalizarCor(valor: unknown) {
  const cor = normalizarTexto(valor);
  return /^#[0-9A-Fa-f]{6}$/.test(cor) ? cor.toUpperCase() : "";
}

function obterSigla(tipo: TipoManutencao) {
  return tipo === "perfil" ? "PER" : "CAN";
}

function mensagemErroBanco(error: unknown) {
  if (
    typeof error === "object" &&
    error !== null &&
    "code" in error &&
    error.code === "23503"
  ) {
    return "Este registro está sendo utilizado pelo sistema e não pode ser excluído.";
  }

  if (
    typeof error === "object" &&
    error !== null &&
    "code" in error &&
    error.code === "23505"
  ) {
    return "Já existe um registro com os mesmos dados.";
  }

  return "Erro ao acessar o banco de dados.";
}

export async function GET(request: NextRequest) {
  try {
    const tipo = request.nextUrl.searchParams.get("tipo");

    if (!validarTipo(tipo)) {
      return NextResponse.json(
        { message: "Tipo de manutenção inválido." },
        { status: 400 }
      );
    }

    const acesso = await verificarPermissao(request, obterSigla(tipo), 1);

    if (!acesso.autorizado) {
      return acesso.response;
    }

    const result =
      tipo === "perfil"
        ? await pool.query(
            `SELECT ID, DESCRICAO, PERMISSOES
             FROM PERFIL
             WHERE STATUS = 'A'
             ORDER BY DESCRICAO`
          )
        : await pool.query(
            `SELECT ID, DESCRICAO, ICONE, COR
             FROM CANAL
             WHERE STATUS = 'A'
             ORDER BY DESCRICAO`
          );

    return NextResponse.json({
      registros: result.rows,
      nivel: acesso.nivel,
    });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { message: "Erro ao consultar os registros." },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const tipo = body.tipo;

    if (!validarTipo(tipo)) {
      return NextResponse.json(
        { message: "Tipo de manutenção inválido." },
        { status: 400 }
      );
    }

    const acesso = await verificarPermissao(request, obterSigla(tipo), 2);

    if (!acesso.autorizado) {
      return acesso.response;
    }

    const id = normalizarId(body.id);
    const descricao = normalizarTexto(body.descricao);

    if (!id || !descricao) {
      return NextResponse.json(
        { message: "Código e descrição são obrigatórios." },
        { status: 400 }
      );
    }

    if (id.length > 2) {
      return NextResponse.json(
        { message: "O código deve possuir no máximo 2 caracteres." },
        { status: 400 }
      );
    }

    const existente = await pool.query(
      `SELECT ID, DESCRICAO
       FROM ${tipo === "perfil" ? "PERFIL" : "CANAL"}
       WHERE STATUS = 'A'
         AND (ID = $1 OR LOWER(DESCRICAO) = LOWER($2))
       LIMIT 1`,
      [id, descricao]
    );

    if (existente.rows.length > 0) {
      const registro = existente.rows[0];
      return NextResponse.json(
        {
          message:
            registro.id === id
              ? "Já existe um registro com esse código."
              : "Já existe um registro com essa descrição.",
        },
        { status: 409 }
      );
    }

    if (tipo === "perfil") {
      const permissoes = typeof body.permissoes === "string" ? body.permissoes : "";
      const result = await pool.query(
        `INSERT INTO PERFIL (ID, DESCRICAO, PERMISSOES, STATUS)
         VALUES ($1, $2, $3, 'A')
         RETURNING ID, DESCRICAO, PERMISSOES, STATUS`,
        [id, descricao, permissoes]
      );

      return NextResponse.json({ registro: result.rows[0] }, { status: 201 });
    }

    const icone = normalizarTexto(body.icone);
    const cor = normalizarCor(body.cor);

    if (!icone || !cor) {
      return NextResponse.json(
        { message: "Ícone e cor são obrigatórios." },
        { status: 400 }
      );
    }

    const result = await pool.query(
      `INSERT INTO CANAL (ID, DESCRICAO, ICONE, COR, STATUS)
       VALUES ($1, $2, $3, $4, 'A')
       RETURNING ID, DESCRICAO, ICONE, COR, STATUS`,
      [id, descricao, icone, cor]
    );

    return NextResponse.json({ registro: result.rows[0] }, { status: 201 });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { message: mensagemErroBanco(error) },
      { status: 500 }
    );
  }
}

export async function PUT(request: NextRequest) {
  try {
    const body = await request.json();
    const tipo = body.tipo;

    if (!validarTipo(tipo)) {
      return NextResponse.json(
        { message: "Tipo de manutenção inválido." },
        { status: 400 }
      );
    }

    const acesso = await verificarPermissao(request, obterSigla(tipo), 2);

    if (!acesso.autorizado) {
      return acesso.response;
    }

    const id = normalizarId(body.id);
    const idOriginal = normalizarId(body.idOriginal);
    const descricao = normalizarTexto(body.descricao);

    if (!id || !idOriginal || !descricao) {
      return NextResponse.json(
        { message: "Código e descrição são obrigatórios." },
        { status: 400 }
      );
    }

    if (id.length > 2) {
      return NextResponse.json(
        { message: "O código deve possuir no máximo 2 caracteres." },
        { status: 400 }
      );
    }

    const tabela = tipo === "perfil" ? "PERFIL" : "CANAL";
    const existente = await pool.query(
      `SELECT ID, DESCRICAO
       FROM ${tabela}
       WHERE STATUS = 'A'
         AND ID <> $1
         AND (ID = $2 OR LOWER(DESCRICAO) = LOWER($3))
       LIMIT 1`,
      [idOriginal, id, descricao]
    );

    if (existente.rows.length > 0) {
      const registro = existente.rows[0];
      return NextResponse.json(
        {
          message:
            registro.id === id
              ? "Já existe um registro com esse código."
              : "Já existe um registro com essa descrição.",
        },
        { status: 409 }
      );
    }

    if (tipo === "perfil") {
      const permissoes = typeof body.permissoes === "string" ? body.permissoes : "";
      const result = await pool.query(
        `UPDATE PERFIL
         SET ID = $1, DESCRICAO = $2, PERMISSOES = $3
         WHERE ID = $4 AND STATUS = 'A'
         RETURNING ID, DESCRICAO, PERMISSOES, STATUS`,
        [id, descricao, permissoes, idOriginal]
      );

      if (result.rows.length === 0) {
        return NextResponse.json(
          { message: "Registro não encontrado." },
          { status: 404 }
        );
      }

      return NextResponse.json({ registro: result.rows[0] });
    }

    const icone = normalizarTexto(body.icone);
    const cor = normalizarCor(body.cor);

    if (!icone || !cor) {
      return NextResponse.json(
        { message: "Ícone e cor são obrigatórios." },
        { status: 400 }
      );
    }

    const result = await pool.query(
      `UPDATE CANAL
       SET ID = $1, DESCRICAO = $2, ICONE = $3, COR = $4
       WHERE ID = $5 AND STATUS = 'A'
       RETURNING ID, DESCRICAO, ICONE, COR, STATUS`,
      [id, descricao, icone, cor, idOriginal]
    );

    if (result.rows.length === 0) {
      return NextResponse.json(
        { message: "Registro não encontrado." },
        { status: 404 }
      );
    }

    return NextResponse.json({ registro: result.rows[0] });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { message: mensagemErroBanco(error) },
      { status: 500 }
    );
  }
}

export async function DELETE(request: NextRequest) {
  try {
    const tipo = request.nextUrl.searchParams.get("tipo");
    const id = normalizarId(request.nextUrl.searchParams.get("id"));

    if (!validarTipo(tipo) || !id) {
      return NextResponse.json(
        { message: "Dados inválidos para exclusão." },
        { status: 400 }
      );
    }

    const acesso = await verificarPermissao(request, obterSigla(tipo), 2);

    if (!acesso.autorizado) {
      return acesso.response;
    }

    const tabela = tipo === "perfil" ? "PERFIL" : "CANAL";

    if (tipo === "perfil") {
      const usuarios = await pool.query(
        `SELECT COUNT(*) AS TOTAL
         FROM USUARIO
         WHERE PERFILID = $1
           AND STATUS = 'A'`,
        [id]
      );

      if (Number(usuarios.rows[0]?.total ?? 0) > 0) {
        return NextResponse.json(
          { message: "Este perfil possui usuários ativos e não pode ser excluído." },
          { status: 409 }
        );
      }
    }

    const result = await pool.query(
      `UPDATE ${tabela}
       SET STATUS = 'I'
       WHERE ID = $1 AND STATUS = 'A'`,
      [id]
    );

    if (result.rowCount === 0) {
      return NextResponse.json(
        { message: "Registro não encontrado." },
        { status: 404 }
      );
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { message: mensagemErroBanco(error) },
      { status: 500 }
    );
  }
}
