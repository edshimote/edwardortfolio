import { NextRequest,NextResponse } from "next/server";
export function middleware(req:NextRequest){const path=req.nextUrl.pathname;if(process.env.APP_MODE==="admin"){if(path==="/"){const url=req.nextUrl.clone();url.pathname="/comercial";return NextResponse.rewrite(url);}if(path==="/comercial"||path==="/api/session"||path==="/api/portal"||path.startsWith("/_next/")||path==="/favicon.ico")return NextResponse.next();return new NextResponse("Not found",{status:404});}return NextResponse.next();}
export const config={matcher:["/((?!_next/static|_next/image|favicon.ico).*)"]};
