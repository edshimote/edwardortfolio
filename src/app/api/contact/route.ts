import { NextRequest, NextResponse } from "next/server";
import { CONTACT, SERVICE_IDS } from "@/lib/contact";
import { db, databaseConfigured } from "@/lib/commercial-server";

// In-memory rate limit: 1 submission per IP per 30s window. Resets on redeploy/cold start —
// acceptable as a lightweight first line of defense; not a durable store, no persistence intended.
const lastSubmission = new Map<string, number>();
const WINDOW_MS = 30_000;
const MAX_LEN = { name: 120, email: 160, company: 160, budget: 60, message: 4000 };

function sanitize(v: unknown, max: number): string {
  if (typeof v !== "string") return "";
  return v.trim().replace(/[\u0000-\u001f\u007f]/g, "").slice(0, max);
}

function isValidEmail(v: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v) && v.length <= MAX_LEN.email;
}

export async function POST(req: NextRequest) {
  let body: Record<string, unknown>;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ ok: false, error: "invalid_body" }, { status: 400 });
  }

  if (!body || typeof body !== "object" || Array.isArray(body)) return NextResponse.json({ok:false,error:"invalid_body"}, {status:400});

  // Honeypot: a hidden field real visitors never fill. Any value here = bot.
  if (typeof body.company_website === "string" && body.company_website.trim() !== "") {
    return NextResponse.json({ ok: true }); // pretend success to the bot, do nothing
  }

  const ip = req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ?? "unknown";
  const now = Date.now();
  const last = lastSubmission.get(ip);
  if (last && now - last < WINDOW_MS) {
    return NextResponse.json({ ok: false, error: "rate_limited" }, { status: 429 });
  }

  const name = sanitize(body.name, MAX_LEN.name);
  const email = sanitize(body.email, MAX_LEN.email);
  const company = sanitize(body.company, MAX_LEN.company);
  const phone = sanitize(body.phone, 40);
  const service = sanitize(body.service, 40);
  const budget = sanitize(body.budget, MAX_LEN.budget);
  const message = sanitize(body.message, MAX_LEN.message);
  const estimatorSummary = sanitize(body.estimatorSummary, 2000);

  if (!name || !email || !message) {
    return NextResponse.json({ ok: false, error: "missing_fields" }, { status: 400 });
  }
  if (!isValidEmail(email)) {
    return NextResponse.json({ ok: false, error: "invalid_email" }, { status: 400 });
  }
  if (service && !SERVICE_IDS.includes(service as (typeof SERVICE_IDS)[number])) {
    return NextResponse.json({ ok: false, error: "invalid_service" }, { status: 400 });
  }

  if (!databaseConfigured()) return NextResponse.json({ok:false,error:"not_configured"}, {status:503});
  const lead = {name,email,company:company||null,phone:phone||null,service:service||null,budget:budget||null,message:estimatorSummary ? (message+"\n"+estimatorSummary).slice(0,4000) : message};
  let id: string;
  try {
    const rows = await db("?select=id", { method:"POST", headers:{Prefer:"return=representation"}, body:JSON.stringify(lead) });
    id = rows[0].id;
  } catch {
    return NextResponse.json({ok:false,error:"database_error"}, {status:502});
  }
  lastSubmission.set(ip, now);
  if (lastSubmission.size > 10000) for (const [key, ts] of lastSubmission) if (now-ts >= WINDOW_MS) lastSubmission.delete(key);
  const webhookUrl = process.env.CONTACT_FORM_WEBHOOK_URL;
  const webhookToken = process.env.CONTACT_FORM_WEBHOOK_TOKEN;
  if (webhookUrl && webhookToken) {
    try {
      const res = await fetch(webhookUrl, {method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({...lead,id,webhookToken,ownerEmail:CONTACT.email}),signal:AbortSignal.timeout(10000)});
      const result = await res.json();
      if (res.ok && result.ok === true) await db("?id=eq."+encodeURIComponent(id),{method:"PATCH",body:JSON.stringify({notified:true})});
    } catch { /* Lead is safely persisted; notification may be retried from admin. */ }
  }
  return NextResponse.json({ok:true,id});
}
