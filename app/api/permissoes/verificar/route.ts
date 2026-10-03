import { NextRequest, NextResponse } from "next/server";
import { verificarPermissao } from "@/app/lib/autorizacao";
import type { NivelPermissao } from "@/app/lib/permissoes";

export async function GET(request: NextRequest) {
  const sigla = request.nextUrl.searchParams.get("sigla");
  const nivelParam = request.nextUrl.searchParams.get("nivel");

  if (!sigla) {
    return NextResponse.json(
      { message: "Sigla não informada." },
      { status: 400 }
    );
  }

  const nivelSolicitado: NivelPermissao = nivelParam === "2" ? 2 : 1;
  const acesso = await verificarPermissao(
    request,
    sigla,
    nivelSolicitado
  );

  if (!acesso.autorizado) {
    return acesso.response;
  }

  return NextResponse.json({
    autorizado: true,
    nivel: acesso.nivel,
  });
}
