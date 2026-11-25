// Previous experimental endpoint retired. Use /api/portal and /api/session.
import { NextResponse } from "next/server";
export function GET(){return NextResponse.json({error:"gone"},{status:410});}
