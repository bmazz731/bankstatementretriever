/**
 * Simple authentication helper for Supabase
 */
import { createClient } from "@supabase/supabase-js";
import type { Env } from "../types/env";

export function createSupabaseClient(env: Env) {
  return createClient(env.SUPABASE_URL, env.SUPABASE_SERVICE_ROLE_KEY, {
    auth: {
      persistSession: false,
      autoRefreshToken: false,
    },
  });
}

export async function authenticateSupabaseUser(c: any) {
  try {
    const authHeader = c.req.header("Authorization");

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return { error: "No authorization token provided", user: null };
    }

    const token = authHeader.substring(7); // Remove 'Bearer ' prefix
    const supabase = createSupabaseClient(c.env);

    const {
      data: { user },
      error,
    } = await supabase.auth.getUser(token);

    if (error || !user) {
      console.error("Supabase auth error:", error);
      return { error: "Invalid token", user: null };
    }

    // For MVP, use user.id as org_id if org_id is not present
    // This provides backward compatibility and ensures queries work
    const userWithOrgId = {
      ...user,
      org_id: (user as any).org_id || user.id,
    };

    return { error: null, user: userWithOrgId };
  } catch (error) {
    console.error("Supabase authentication error:", error);
    return { error: "Authentication service unavailable", user: null };
  }
}
