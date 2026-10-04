import { NextRequest, NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { pool } from "@/app/lib/db";

export async function POST(req: NextRequest) {
  try {
    const { username, password } = await req.json();

    if (!username) {
      return NextResponse.json(
        { message: "Informe o nome de usuário." },
        { status: 400 }
      );
    }

    if (!password) {
      return NextResponse.json(
        { message: "Informe a senha." },
        { status: 400 }
      );
    }

    const result = await pool.query(
      `SELECT USUARIO.ID, USUARIO.NOME, USUARIO.NOMEUSUARIO, USUARIO.EMAIL, USUARIO.SENHA, PERFIL.ID AS PERFILID,
        PERFIL.DESCRICAO AS PERFIL
       FROM USUARIO
       INNER JOIN PERFIL ON PERFIL.ID = USUARIO.PERFILID
       WHERE USUARIO.NOMEUSUARIO = $1
         AND USUARIO.STATUS = 'A'
         AND PERFIL.STATUS = 'A'`,
      [username]
    );

    const usuario = result.rows[0];

    if (!usuario) {
      return NextResponse.json(
        { message: "Usuário ou senha inválidos." },
        { status: 401 }
      );
    }

    const senhaValida = await bcrypt.compare(password, usuario.senha);

    if (!senhaValida) {
      return NextResponse.json(
        { message: "Usuário ou senha inválidos." },
        { status: 401 }
      );
    }

    const token = jwt.sign(
      { sub: String(usuario.id), perfil: usuario.perfilid },
      process.env.JWT_SECRET!,
      { expiresIn: "8h" }
    );

    return NextResponse.json({
      token,
      usuario: {
        id: usuario.id,
        nome: usuario.nome,
        perfil: usuario.perfil,
        perfilId: usuario.perfilid,
      },
    });
  } catch (err) {
    console.error(err);
    return NextResponse.json({ message: "Erro interno" }, { status: 500 });
  }
}
