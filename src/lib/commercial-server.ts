import "server-only";

function settings() {
  const url = process.env.SUPABASE_URL;
  const key = process.env.SUPABASE_SERVICE_ROLE_KEY;
  if (!url || !key) throw new Error("database_not_configured");
  return { url: url.replace(/\/$/, ""), key };
}
export function databaseConfigured() {
  return Boolean(process.env.SUPABASE_URL && process.env.SUPABASE_SERVICE_ROLE_KEY);
}
export async function db(path: string, init: RequestInit = {}) {
  const { url, key } = settings();
  const headers = new Headers(init.headers);
  headers.set("apikey", key);
  headers.set("Authorization", "Bearer " + key);
  headers.set("Content-Type", "application/json");
  const res = await fetch(url + "/rest/v1/commercial_leads" + path, { ...init, headers, cache: "no-store", signal: AbortSignal.timeout(10000) });
  if (!res.ok) throw new Error("database_error");
  return res.status === 204 ? null : res.json();
}
export async function authRequest(path: string, init: RequestInit = {}) {
  const url = process.env.SUPABASE_URL;
  const key = process.env.SUPABASE_ANON_KEY;
  if (!url || !key) throw new Error("auth_not_configured");
  const headers = new Headers(init.headers);
  headers.set("apikey", key);
  headers.set("Content-Type", "application/json");
  return fetch(url.replace(/\/$/, "") + "/auth/v1" + path, { ...init, headers, cache: "no-store", signal: AbortSignal.timeout(10000) });
}
export function allowedEmail(email: unknown) {
  return typeof email === "string" && (process.env.COMMERCIAL_ADMIN_EMAILS || "").split(",").map(s => s.trim().toLowerCase()).filter(Boolean).includes(email.toLowerCase());
}
