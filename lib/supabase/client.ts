import { createBrowserClient } from "@supabase/ssr";

// Cliente Supabase pra Client Components ("use client") — sessão fica em
// cookies (não localStorage), pra o servidor conseguir ler a mesma sessão
// via lib/supabase/server.ts.
export function createClient() {
  return createBrowserClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  );
}
