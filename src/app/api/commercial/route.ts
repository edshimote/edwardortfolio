import { NextRequest, NextResponse } from "next/server";
import { allowedEmail, authRequest, db } from "@/lib/commercial-server";

const cookie = "commercial_session";
const statuses = ["new","contacted","proposal","accepted","in_progress","delivered","lost"];
function reply(body: unknown, status=200) { return NextResponse.json(body,{status,headers:{"Cache-Control":"no-store"}}); }
function sameOrigin(req: NextRequest) { const origin=req.headers.get("origin"); return origin===req.nextUrl.origin || origin==="https://"+req.headers.get("host"); }
async function authorized(req: NextRequest) {
 const token=req.cookies.get(cookie)?.value;
 if (!token) return false;
 const res=await authRequest("/user",{headers:{Authorization:"Bearer "+token}});
 if(!res.ok) return false;
 return allowedEmail((await res.json()).email);
}
export async function POST(req: NextRequest) {
 if(!sameOrigin(req)) return reply({error:"forbidden"},403);
 try {
  const body=await req.json();
  if(typeof body.email!=="string" || typeof body.password!=="string" || !allowedEmail(body.email) || body.password.length>256) return reply({error:"invalid_login"},401);
  const res=await authRequest("/token?grant_type=password",{method:"POST",body:JSON.stringify({email:body.email,password:body.password})});
  if(!res.ok) return reply({error:"invalid_login"},401);
  const session=await res.json();
  if(!session.access_token || !allowedEmail(session.user?.email)) return reply({error:"invalid_login"},401);
  const response=reply({ok:true});
  response.cookies.set(cookie,session.access_token,{httpOnly:true,secure:process.env.NODE_ENV==="production",sameSite:"strict",path:"/api/commercial",maxAge:Math.min(Number(session.expires_in)||3600,3600)});
  return response;
 } catch { return reply({error:"unavailable"},503); }
}
export async function GET(req: NextRequest) {
 try {
  if(!await authorized(req)) return reply({error:"unauthorized"},401);
  return reply({leads:await db("?select=*&order=created_at.desc&limit=500")});
 } catch { return reply({error:"unavailable"},503); }
}
export async function PATCH(req: NextRequest) {
 if(!sameOrigin(req)) return reply({error:"forbidden"},403);
 try {
  if(!await authorized(req)) return reply({error:"unauthorized"},401);
  const b=await req.json();
  if(typeof b.id!=="string" || !/^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i.test(b.id)) return reply({error:"invalid_id"},400);
  const change:Record<string,unknown>={};
  if(statuses.includes(b.status)) change.status=b.status;
  for(const k of ["quoted_cents","received_cents","expenses_cents"]) if(Number.isInteger(b[k]) && b[k]>=0 && b[k]<=1000000000) change[k]=b[k];
  if(typeof b.notes==="string") change.notes=b.notes.slice(0,5000);
  if(b.due_date===null || (typeof b.due_date==="string" && /^\d{4}-\d{2}-\d{2}$/.test(b.due_date))) change.due_date=b.due_date;
  if(!Object.keys(change).length) return reply({error:"invalid_change"},400);
  const rows=await db("?id=eq."+b.id,{method:"PATCH",headers:{Prefer:"return=representation"},body:JSON.stringify(change)});
  return rows.length ? reply({lead:rows[0]}) : reply({error:"not_found"},404);
 } catch { return reply({error:"unavailable"},503); }
}
export async function DELETE(req: NextRequest) {
 if(!sameOrigin(req)) return reply({error:"forbidden"},403);
 const response=reply({ok:true});
 response.cookies.set(cookie,"",{httpOnly:true,secure:process.env.NODE_ENV==="production",sameSite:"strict",path:"/api/commercial",maxAge:0});
 return response;
}
