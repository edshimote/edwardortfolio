import { NextRequest,NextResponse } from "next/server";
export function middleware(req:NextRequest){const path=req.nextUrl.pathname;if(process.env.APP_MODE==="admin"){if(path==="/"){const url=req.nextUrl.clone();url.pathname="/comercial";return NextResponse.rewrite(url);}if(path==="/comercial"||path==="/api/session"||path==="/api/portal"||path.startsWith("/_next/")||path==="/favicon.ico"||path==="/icon"||path==="/nexworthy/inter.woff2")return NextResponse.next();return new NextResponse("Not found",{status:404});}
 if(path==="/"){
   const url=req.nextUrl.clone();
   const saved=req.cookies.get("edward-market")?.value;
   const country=req.headers.get("x-vercel-ip-country");
   const english=saved==="en"||(!saved&&country&&country!=="BR");
   url.pathname=english&&!url.searchParams.has("proposta")?"/catalogo":"/nexworthy/index.html";
   return NextResponse.rewrite(url);
 }
 return NextResponse.next();}
export const config={matcher:["/((?!_next/static|_next/image|favicon.ico).*)"]};
