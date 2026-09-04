import { createClient } from "@supabase/supabase-js";

// SERVER-ONLY. This uses the service role key, which bypasses row-level
// security entirely. Only ever import this file from route handlers
// (app/api/**/route.js) or other server-only code — never from a
// component marked "use client", or the key will end up in the browser
// bundle.

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

export const isSupabaseAdminConfigured = Boolean(supabaseUrl && serviceRoleKey);

export const supabaseAdmin = isSupabaseAdminConfigured
  ? createClient(supabaseUrl, serviceRoleKey)
  : null;
