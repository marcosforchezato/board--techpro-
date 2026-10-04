import { NextResponse } from "next/server";
import { obterUsuario } from "@/app/lib/auth";
import { obterNivelPermissao, type NivelPermissao } from "@/app/lib/permissoes";

export async function verificarPermissao(
  request: Request,
  sigla: string,
  nivel: NivelPermissao = 1
) {
  const usuario = await obterUsuario(request);

  if (!usuario) {
    return {
      autorizado: false,
      nivel: 0 as NivelPermissao,
      usuario: null,
      response: NextResponse.json(
        { message: "Não autenticado." },
        { status: 401 }
      ),
    };
  }

  const nivelUsuario = obterNivelPermissao(usuario.permissoes ?? "", sigla);

  if (nivelUsuario < nivel) {
    return {
      autorizado: false,
      nivel: nivelUsuario,
      usuario,
      response: NextResponse.json(
        {
          message: "Você não possui permissão para acessar este recurso.",
          nivel: nivelUsuario,
        },
        { status: 403 }
      ),
    };
  }

  return {
    autorizado: true,
    nivel: nivelUsuario,
    usuario,
    response: null,
  };
}
