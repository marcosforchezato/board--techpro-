import { NextRequest, NextResponse } from "next/server";
import bcrypt from "bcrypt";
import { pool } from "@/app/lib/db";

export async function POST(req: NextRequest) {
  try {
    const { nome, nomeUsuario, perfilId, email, telefone, senha } =
      await req.json();

    if (!nome || !nomeUsuario || !perfilId || !senha) {
      return NextResponse.json(
        { message: "Nome, usuário, perfil e senha são obrigatórios" },
        { status: 400 }
      );
    }

    if (nomeUsuario.length > 20) {
      return NextResponse.json(
        { message: "Usuário deve ter no máximo 20 caracteres" },
        { status: 400 }
      );
    }

    if (senha.length < 8) {
      return NextResponse.json(
        { message: "A senha deve ter no mínimo 8 caracteres" },
        { status: 400 }
      );
    }

    const existente = await pool.query(
      `SELECT ID FROM USUARIO WHERE NOMEUSUARIO = $1`,
      [nomeUsuario]
    );

    if (existente.rows.length > 0) {
      return NextResponse.json(
        { message: "Este nome de usuário já está em uso" },
        { status: 409 }
      );
    }

    const senhaHash = await bcrypt.hash(senha, 10);

    const result = await pool.query(
      `INSERT INTO USUARIO (NOME, PERFILID, NOMEUSUARIO, EMAIL, TELEFONE, SENHA)
       VALUES ($1, $2, $3, $4, $5, $6)
       RETURNING ID, NOME, NOMEUSUARIO, PERFILID`,
      [nome, perfilId, nomeUsuario, email ?? null, telefone ?? null, senhaHash]
    );

    const usuario = result.rows[0];

    return NextResponse.json(
      {
        usuario: {
          id: usuario.id,
          nome: usuario.nome,
          nomeUsuario: usuario.nomeusuario,
          perfilId: usuario.perfilid,
        },
      },
      { status: 201 }
    );
  } catch (err) {
    console.error(err);
    return NextResponse.json({ message: "Erro interno" }, { status: 500 });
  }
}
