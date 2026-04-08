import { createClient } from "@supabase/supabase-js";

// Must be set before any HTTPS call — bypasses corporate self-signed cert proxy
process.env.NODE_TLS_REJECT_UNAUTHORIZED = "0";

export const supabaseServer = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
);

export const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);
