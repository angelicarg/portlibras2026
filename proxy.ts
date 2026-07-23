import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { createServerClient } from "@supabase/ssr";

// Renova a sessão do Supabase a cada request e protege as rotas autenticadas
// — mesmo princípio do beforeLoad+useEffect duplo do site principal
// (aruana-digital-novo), só que aqui centralizado num único proxy.ts em vez
// de duas checagens espalhadas, já que o Next App Router permite isso.
const ROTAS_PROTEGIDAS = ["/home", "/jornadas", "/professor", "/admin"];
const PAGINAS_DE_AUTH = ["/login", "/cadastro"];

export async function proxy(request: NextRequest) {
  let response = NextResponse.next({ request });

  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll() {
          return request.cookies.getAll();
        },
        setAll(cookiesToSet) {
          cookiesToSet.forEach(({ name, value }) => request.cookies.set(name, value));
          response = NextResponse.next({ request });
          cookiesToSet.forEach(({ name, value, options }) =>
            response.cookies.set(name, value, options)
          );
        },
      },
    }
  );

  const {
    data: { user },
  } = await supabase.auth.getUser();

  const { pathname } = request.nextUrl;
  const protegida = ROTAS_PROTEGIDAS.some((rota) => pathname.startsWith(rota));
  const paginaDeAuth = PAGINAS_DE_AUTH.some((rota) => pathname.startsWith(rota));

  if (!user && protegida) {
    return NextResponse.redirect(new URL("/login", request.url));
  }
  if (user && paginaDeAuth) {
    return NextResponse.redirect(new URL("/home", request.url));
  }

  return response;
}

export const config = {
  matcher: ["/((?!_next/static|_next/image|favicon.ico|.*\\.png$).*)"],
};
