import { createServerClient } from "@supabase/ssr";
import { cookies } from "next/headers";

// Cliente Supabase pra Server Components/Server Actions — lê a sessão dos
// cookies da requisição. `setAll` pode falhar quando chamado de dentro de um
// Server Component puro (não dá pra escrever cookie fora de uma Server
// Action/Route Handler); nesse caso o proxy.ts já cuida de renovar a sessão.
export async function createClient() {
  const cookieStore = await cookies();

  return createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll() {
          return cookieStore.getAll();
        },
        setAll(cookiesToSet) {
          try {
            cookiesToSet.forEach(({ name, value, options }) =>
              cookieStore.set(name, value, options)
            );
          } catch {
            // chamado de um Server Component — sem problema, ver comentário acima.
          }
        },
      },
    }
  );
}
