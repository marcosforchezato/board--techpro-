export function obterToken() {
  return localStorage.getItem("token") ?? sessionStorage.getItem("token");
}

export async function apiFetch(
  input: RequestInfo | URL,
  init: RequestInit = {}
) {
  const token = obterToken();
  const headers = new Headers(init.headers);

  if (token) {
    headers.set("Authorization", `Bearer ${token}`);
  }

  return fetch(input, {
    ...init,
    headers,
  });
}

export async function verificarAcesso(
  sigla: string,
  nivel: 1 | 2 = 1
) {
  const response = await apiFetch(
    `/api/permissoes/verificar?sigla=${encodeURIComponent(
      sigla
    )}&nivel=${nivel}`,
    {
      cache: "no-store",
    }
  );

  if (!response.ok) {
    return {
      autorizado: false,
      nivel: 0,
    };
  }

  const data = await response.json();

  return {
    autorizado: true,
    nivel: data.nivel ?? 0,
  };
}
