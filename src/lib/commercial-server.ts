import { NextRequest,NextResponse } from "next/server";
export const sessionCookie="edward_session";
export function sameOrigin(req:NextRequest){const origin=req.headers.get("origin");const host=req.headers.get("host");return origin===req.nextUrl.origin||origin==="https://"+host;}
export function reply(body:unknown,status=200){return NextResponse.json(body,{status,headers:{"Cache-Control":"no-store"}});}
function settings(){const url=process.env.SUPABASE_URL,key=process.env.SUPABASE_ANON_KEY;if(!url||!key)throw Error("not_configured");return {url:url.replace(/\/$/,""),key};}
export async function request(path:string,init:RequestInit={},token?:string){const {url,key}=settings();const headers=new Headers(init.headers);headers.set("apikey",key);headers.set("Content-Type","application/json");if(token)headers.set("Authorization","Bearer "+token);return fetch(url+path,{...init,headers,cache:"no-store",signal:AbortSignal.timeout(10000)});}
export async function data(path:string,token:string,init:RequestInit={}){const res=await request("/rest/v1/"+path,init,token);if(!res.ok)throw Error("database_error");return res.status===204?null:res.json();}
export async function identity(req:NextRequest){const token=req.cookies.get(sessionCookie)?.value;if(!token)return null;const r=await request("/auth/v1/user",{},token);if(!r.ok)return null;const u=await r.json();if(!u.id||!u.email||!u.email_confirmed_at)return null;return {id:String(u.id),email:String(u.email),token};}
export async function isAdmin(token:string){const rows=await data("commercial_admins?select=email",token);return Array.isArray(rows)&&rows.length>0;}
export function setSession(res:NextResponse,token:string,seconds:number){res.cookies.set(sessionCookie,token,{httpOnly:true,secure:process.env.NODE_ENV==="production",sameSite:"strict",path:"/",maxAge:Math.max(0,Math.min(seconds||3600,3600))});return res;}
export function clean(v:unknown,max:number){return typeof v==="string"?v.trim().slice(0,max):"";}
