import jwt from "jsonwebtoken";
import { pool } from "@/app/lib/db";

type TokenPayload = {
  sub?: string | number;
};

export async function obterUsuario(request: Request) {
  const authorization = request.headers.get("authorization");

  if (!authorization?.startsWith("Bearer ")) {
    return null;
  }

  const token = authorization.substring(7);

  try {
    const payload = jwt.verify(
      token,
      process.env.JWT_SECRET!
    ) as TokenPayload;

    const id = Number(payload.sub);

    if (!Number.isInteger(id) || id <= 0) {
      return null;
    }

    const result = await pool.query(
      `SELECT
        USUARIO.ID,
        USUARIO.NOME,
        USUARIO.NOMEUSUARIO,
        USUARIO.EMAIL,
        USUARIO.PERFILID,
        PERFIL.DESCRICAO AS PERFIL,
        PERFIL.PERMISSOES
       FROM USUARIO
       INNER JOIN PERFIL ON PERFIL.ID = USUARIO.PERFILID
       WHERE USUARIO.ID = $1
         AND USUARIO.STATUS = 'A'
         AND PERFIL.STATUS = 'A'`,
      [id]
    );

    return result.rows[0] ?? null;
  } catch {
    return null;
  }
}
